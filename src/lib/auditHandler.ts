import { GoogleGenAI, Type } from "@google/genai";

const allowedCategories = [
  "Cafe / Kedai Kopi", "Restoran", "Salon Kecantikan", "Klinik Medis / Gigi",
  "Gym / Pusat Kebugaran", "Laundry / Binatu", "Bengkel Otomotif",
  "Hotel / Penginapan", "UMKM / Toko Retail",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
const isScore = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100;

function isValidAuditResult(value: unknown): boolean {
  if (!isRecord(value) || !isText(value.businessName, 120) ||
      !isText(value.category, 80) || !isText(value.location, 120) ||
      !isScore(value.overallScore) || !isText(value.statusGoogleMaps, 1200) ||
      !isText(value.statusGoogleSearch, 1200) || !isText(value.strategicAdvice, 3000) ||
      !Array.isArray(value.auditMetrics) || value.auditMetrics.length < 1 ||
      value.auditMetrics.length > 12 || !Array.isArray(value.quickWins) ||
      value.quickWins.length < 1 || value.quickWins.length > 8) return false;
  return value.auditMetrics.every((metric) => isRecord(metric) &&
    isText(metric.name, 100) && isScore(metric.score) &&
    isText(metric.status, 60) && isText(metric.details, 1200)) &&
    value.quickWins.every((item) => isText(item, 500));
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

type PublicPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  googleMapsUri?: string;
  primaryTypeDisplayName?: { text?: string };
  businessStatus?: string;
};

async function lookupPublicPlace(businessName: string, location: string, apiKey: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.websiteUri,places.googleMapsUri,places.primaryTypeDisplayName,places.businessStatus",
    },
    body: JSON.stringify({ textQuery: `${businessName} ${location}`, maxResultCount: 5 }),
  });
  if (!response.ok) {
    const providerStatus = response.status;
    console.error("Google Places lookup failed with status:", providerStatus);
    return { place: null as PublicPlace | null, status: providerStatus === 401 || providerStatus === 403 ? "configuration_error" : "provider_error" };
  }
  const payload: unknown = await response.json();
  if (!isRecord(payload) || !Array.isArray(payload.places)) return { place: null, status: "no_match" };
  const wantedName = normalize(businessName);
  const locationTokens = normalize(location).split(" ").filter((token) => token.length > 2);
  const exactCandidates = (payload.places as PublicPlace[]).filter((place) =>
    normalize(place.displayName?.text ?? "") === wantedName &&
    Boolean(place.formattedAddress) &&
    locationTokens.every((token) => normalize(place.formattedAddress ?? "").includes(token))
  );
  if (exactCandidates.length !== 1) return { place: null, status: exactCandidates.length > 1 ? "ambiguous_match" : "no_match" };
  return { place: exactCandidates[0], status: "matched" };
}

export default async function handleAudit(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode permintaan tidak didukung." });
  }
  const body = req.body ?? {};
  const { businessName, category, location } = body;
  if (!isText(businessName, 120) || !isText(location, 120) ||
      typeof category !== "string" || !allowedCategories.includes(category)) {
    return res.status(400).json({ error: "Periksa kembali nama bisnis, kategori, dan lokasi. Nama bisnis serta lokasi maksimal 120 karakter." });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error("GEMINI_API_KEY is not configured for the audit function.");
    return res.status(500).json({ error: "Layanan audit belum dikonfigurasi dengan benar. Silakan hubungi tim KetemuTerus." });
  }

  let publicPlace: PublicPlace | null = null;
  let placesStatus = "not_configured";
  const placesKey = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
  if (placesKey) {
    try {
      const lookup = await lookupPublicPlace(businessName.trim(), location.trim(), placesKey);
      publicPlace = lookup.place;
      placesStatus = lookup.status;
    } catch (error) {
      console.error("Google Places lookup failed:", error);
      placesStatus = "provider_error";
    }
  }

  const publicData = publicPlace ? {
    placeId: publicPlace.id ?? null,
    name: publicPlace.displayName?.text ?? businessName.trim(),
    address: publicPlace.formattedAddress ?? null,
    rating: typeof publicPlace.rating === "number" ? publicPlace.rating : null,
    reviewCount: typeof publicPlace.userRatingCount === "number" ? publicPlace.userRatingCount : null,
    website: publicPlace.websiteUri ?? null,
    googleMapsUrl: publicPlace.googleMapsUri ?? null,
    primaryType: publicPlace.primaryTypeDisplayName?.text ?? null,
    businessStatus: publicPlace.businessStatus ?? null,
    coordinates: publicPlace.location &&
      typeof publicPlace.location.latitude === "number" &&
      typeof publicPlace.location.longitude === "number"
        ? { latitude: publicPlace.location.latitude, longitude: publicPlace.location.longitude }
        : null,
  } : null;

  const prompt = `Buat audit awal visibilitas digital lokal dalam bahasa Indonesia.
Nama bisnis: ${businessName.trim()}
Kategori: ${category}
Lokasi yang dimasukkan pengguna: ${location.trim()}
Data publik Google Places yang berhasil dicocokkan secara ketat: ${JSON.stringify(publicData)}
Status lookup Places: ${placesStatus}

Aturan wajib:
- Jika data publik tersedia, gunakan hanya nilai dalam objek tersebut sebagai fakta dan jangan menambah fakta yang tidak ada.
- Jika data publik null, katakan bahwa profil belum berhasil dicocokkan/diambil; jangan menyimpulkan bisnis tidak ada.
- Anda tidak memiliki akses ke Google Business Profile pemilik, Search Console, analytics, performa website, atau data ranking lokal.
- Ranking Google Maps tidak diukur. Jangan mengarang posisi, kompetitor, rating, jumlah ulasan, kelengkapan profil, atau hasil pencarian.
- overallScore dan seluruh metric score tetap skor estimasi heuristik AI, bukan skor terukur. Jangan beri skor seolah-olah kualitas profil aktual sudah diverifikasi.
- Bedakan fakta dari data publik dengan rekomendasi yang masih harus diperiksa pemilik.
- Berikan 3-6 indikator dan 3-5 quick wins. Hindari jaminan hasil, angka peningkatan, dan janji ranking.`;

  try {
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah edukator Local SEO yang berhati-hati. Data publik yang disediakan boleh dipakai hanya sebagai fakta yang tercantum. Jangan mengklaim memiliki akses owner GBP, Search Console, analytics, website live, atau ranking grid. Semua skor adalah estimasi dan semua klaim yang tidak didukung harus dinyatakan belum diketahui.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessName: { type: Type.STRING }, category: { type: Type.STRING }, location: { type: Type.STRING },
            overallScore: { type: Type.INTEGER, description: "Estimasi heuristik 0-100, bukan hasil pengukuran." },
            statusGoogleMaps: { type: Type.STRING }, statusGoogleSearch: { type: Type.STRING },
            auditMetrics: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: {
              name: { type: Type.STRING }, score: { type: Type.INTEGER }, status: { type: Type.STRING }, details: { type: Type.STRING },
            }, required: ["name", "score", "status", "details"] } },
            quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
            strategicAdvice: { type: Type.STRING },
          },
          required: ["businessName", "category", "location", "overallScore", "statusGoogleMaps", "statusGoogleSearch", "auditMetrics", "quickWins", "strategicAdvice"],
        },
      },
    });
    const result = response.text?.trim();
    if (!result) return res.status(502).json({ error: "AI belum menghasilkan laporan audit. Silakan coba lagi sebentar." });
    const auditData: unknown = JSON.parse(result);
    if (!isValidAuditResult(auditData)) {
      console.error("Gemini returned an audit response that failed output validation.");
      return res.status(502).json({ error: "Format laporan audit belum sesuai. Silakan coba lagi sebentar." });
    }
    return res.status(200).json({
      ...auditData,
      dataMode: publicData ? "google_places" : "ai_estimate",
      scoreType: "heuristic_estimate",
      dataSources: publicData ? ["Google Places API (data publik; profil cocok berdasarkan nama dan lokasi)"] : [],
      placesLookupStatus: placesStatus,
      publicData,
      rankingMeasurement: {
        status: "not_measured",
        message: "Ranking lokal Google Maps belum diukur. Posisi perlu diuji dari beberapa koordinat menggunakan sumber pengukuran ranking yang tervalidasi.",
      },
      ownerDataStatus: "not_connected",
    });
  } catch (error) {
    console.error("Audit function failed:", error);
    return res.status(500).json({ error: "Layanan audit sedang mengalami kendala. Silakan coba lagi nanti." });
  }
}
