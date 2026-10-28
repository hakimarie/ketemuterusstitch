import { GoogleGenAI, Type } from "@google/genai";

const allowedCategories = [
  "Cafe / Kedai Kopi",
  "Restoran",
  "Salon Kecantikan",
  "Klinik Medis / Gigi",
  "Gym / Pusat Kebugaran",
  "Laundry / Binatu",
  "Bengkel Otomotif",
  "Hotel / Penginapan",
  "UMKM / Toko Retail",
];

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    businessName: { type: Type.STRING },
    category: { type: Type.STRING },
    location: { type: Type.STRING },
    overallScore: { type: Type.INTEGER, description: "Perkiraan heuristik awal 0-100, bukan hasil pengukuran langsung." },
    statusGoogleMaps: { type: Type.STRING },
    statusGoogleSearch: { type: Type.STRING },
    auditMetrics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          score: { type: Type.INTEGER },
          status: { type: Type.STRING },
          details: { type: Type.STRING },
        },
        required: ["name", "score", "status", "details"],
      },
    },
    quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
    strategicAdvice: { type: Type.STRING },
  },
  required: [
    "businessName",
    "category",
    "location",
    "overallScore",
    "statusGoogleMaps",
    "statusGoogleSearch",
    "auditMetrics",
    "quickWins",
    "strategicAdvice",
  ],
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isText = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

const isScore = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100;

function isValidAuditResult(value: unknown): boolean {
  if (!isRecord(value)) return false;

  if (
    !isText(value.businessName, 120) ||
    !isText(value.category, 80) ||
    !isText(value.location, 120) ||
    !isScore(value.overallScore) ||
    !isText(value.statusGoogleMaps, 1200) ||
    !isText(value.statusGoogleSearch, 1200) ||
    !isText(value.strategicAdvice, 3000) ||
    !Array.isArray(value.auditMetrics) ||
    value.auditMetrics.length < 1 ||
    value.auditMetrics.length > 12 ||
    !Array.isArray(value.quickWins) ||
    value.quickWins.length < 1 ||
    value.quickWins.length > 8
  ) {
    return false;
  }

  const metricsValid = value.auditMetrics.every((metric) => {
    if (!isRecord(metric)) return false;
    return (
      isText(metric.name, 100) &&
      isScore(metric.score) &&
      isText(metric.status, 60) &&
      isText(metric.details, 1200)
    );
  });

  const quickWinsValid = value.quickWins.every((item) => isText(item, 500));

  return metricsValid && quickWinsValid;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode permintaan tidak didukung." });
  }

  const body = req.body ?? {};
  const { businessName, category, location } = body;

  if (
    !isText(businessName, 120) ||
    !isText(location, 120) ||
    typeof category !== "string" ||
    !allowedCategories.includes(category)
  ) {
    return res.status(400).json({
      error: "Periksa kembali nama bisnis, kategori, dan lokasi. Nama bisnis serta lokasi maksimal 120 karakter.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured for the audit function.");
    return res.status(500).json({
      error: "Layanan audit belum dikonfigurasi dengan benar. Silakan hubungi tim KetemuTerus.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Buat evaluasi awal visibilitas pemasaran digital lokal untuk bisnis berikut:
Nama bisnis: ${businessName.trim()}
Kategori: ${category}
Lokasi: ${location.trim()}

Batasan penting: Anda tidak memiliki akses langsung ke Google Maps, Google Business Profile, ulasan, website, ranking, atau analytics bisnis ini. Jangan mengklaim telah memeriksa atau memverifikasi fakta spesifik. Jangan mengarang rating, jumlah ulasan, ranking, kelengkapan profil, performa website, atau kompetitor. Buat penilaian edukatif awal hanya berdasarkan nama bisnis, kategori, dan lokasi yang diberikan. Jelaskan bahwa status aktual belum diverifikasi dan berikan pemeriksaan konkret yang bisa dilakukan pemilik bisnis. Semua skor adalah estimasi heuristik, bukan hasil pengukuran. Skor harus berupa bilangan bulat 0-100. Berikan 3-6 indikator audit dan 3-5 quick wins. Hindari jaminan hasil atau klaim peningkatan persentase. Gunakan bahasa Indonesia dan keluarkan JSON sesuai skema.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Anda adalah edukator Local SEO yang berhati-hati untuk KetemuTerus. Anda tidak memiliki akses langsung ke Google, Maps, website, analytics, atau ulasan pelanggan. Jangan menyajikan asumsi sebagai temuan terverifikasi. Beri label sebagai evaluasi awal AI, bedakan fakta yang belum diketahui dari rekomendasi, dan jangan menjanjikan ranking atau hasil dalam jangka waktu tertentu.",
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const result = response.text?.trim();
    if (!result) {
      console.error("Gemini returned an empty audit response.");
      return res.status(502).json({
        error: "AI belum menghasilkan laporan audit. Silakan coba lagi sebentar.",
      });
    }

    const auditData: unknown = JSON.parse(result);
    if (!isValidAuditResult(auditData)) {
      console.error("Gemini returned an audit response that failed output validation.");
      return res.status(502).json({
        error: "Format laporan audit belum sesuai. Silakan coba lagi sebentar.",
      });
    }

    return res.status(200).json(auditData);
  } catch (error) {
    console.error("Vercel audit function failed:", error);
    return res.status(500).json({
      error: "Layanan audit sedang mengalami kendala. Silakan coba lagi nanti.",
    });
  }
}
