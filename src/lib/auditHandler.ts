import { lookupPublicBusiness } from "./publicBusinessLookup.js";
import { getChecklistForCategory } from "./checklists/index.js";
import type { AuditDiagnosis, AuditMetric } from "../types.js";

const allowedCategories = [
  "Cafe / Kedai Kopi", "Restoran", "Salon Kecantikan", "Klinik Medis / Gigi",
  "Gym / Pusat Kebugaran", "Laundry / Binatu", "Bengkel Otomotif",
  "Hotel / Penginapan", "UMKM / Toko Retail",
];

const isText = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
const isOptionalText = (value: unknown, maxLength: number): value is string | undefined =>
  value === undefined || value === null || value === "" ||
  (typeof value === "string" && value.trim().length <= maxLength);

function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim() || value.length > 500) return null;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function isMapsProfileUrl(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return true;
  const safe = safeHttpUrl(value);
  if (!safe) return false;
  const parsed = new URL(safe);
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  const path = parsed.pathname.toLowerCase();
  if (host === "maps.app.goo.gl" || host === "goo.gl" || host === "maps.google.com") return true;
  if (host === "google.com" && (path === "/maps" || path.startsWith("/maps/"))) return true;
  return host === "g.page" || host === "share.google";
}

function createLegacyDiagnoses(items: ReturnType<typeof getChecklistForCategory>["items"]): AuditDiagnosis[] {
  return items.map((item) => ({
    title: item.title,
    evidenceStatus: "missing",
    confidence: "low",
    severity: item.priority,
    finding: "Poin ini belum diperiksa menggunakan data profil bisnis yang terverifikasi. Anggap sebagai checklist pemeriksaan, bukan temuan bahwa bisnis memiliki masalah.",
    recommendation: item.whatToCheck,
    validationStep: item.howToFix,
  }));
}

function createLegacyMetrics(items: ReturnType<typeof getChecklistForCategory>["items"]): AuditMetric[] {
  return items.map((item) => ({
    name: item.title,
    score: null,
    status: "Belum diukur",
    details: item.why,
  }));
}

export default async function handleAudit(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode permintaan tidak didukung." });
  }

  const body = req.body ?? {};
  const { businessName, category, location } = body;
  const mapsProfileUrl = body.mapsProfileUrl ?? "";
  const observedRating = body.observedRating === "" || body.observedRating === undefined || body.observedRating === null ? null : Number(body.observedRating);
  const observedReviewCount = body.observedReviewCount === "" || body.observedReviewCount === undefined || body.observedReviewCount === null ? null : Number(body.observedReviewCount);
  const recentReviews30d = body.recentReviews30d === "" || body.recentReviews30d === undefined || body.recentReviews30d === null ? null : Number(body.recentReviews30d);
  const websiteUrl = body.websiteUrl ?? "";
  const safeWebsiteUrl = websiteUrl ? safeHttpUrl(websiteUrl) : null;

  if (!isOptionalText(mapsProfileUrl, 500) || !isMapsProfileUrl(mapsProfileUrl) ||
      !isOptionalText(websiteUrl, 500) || (websiteUrl && !safeWebsiteUrl) ||
      (observedRating !== null && (!Number.isFinite(observedRating) || observedRating < 0 || observedRating > 5)) ||
      (observedReviewCount !== null && (!Number.isInteger(observedReviewCount) || observedReviewCount < 0 || observedReviewCount > 100000000)) ||
      (recentReviews30d !== null && (!Number.isInteger(recentReviews30d) || recentReviews30d < 0 || recentReviews30d > 1000000))) {
    return res.status(400).json({ error: "Data bukti manual belum valid. Tautan profil harus berupa URL Google Maps, tautan website harus diawali http:// atau https://, rating harus 0–5, dan jumlah ulasan harus bilangan bulat tidak negatif." });
  }

  if (!isText(businessName, 120) || !isText(location, 120) ||
      typeof category !== "string" || !allowedCategories.includes(category)) {
    return res.status(400).json({ error: "Periksa kembali nama bisnis, kategori, dan lokasi. Nama bisnis serta lokasi maksimal 120 karakter." });
  }

  const submittedEvidence = {
    mapsProfileUrl: mapsProfileUrl ? safeHttpUrl(mapsProfileUrl) : null,
    observedRating,
    observedReviewCount,
    websiteUrl: safeWebsiteUrl,
    recentReviews30d,
    verificationStatus: "user_submitted_unverified" as const,
  };

  // Basic audit is deterministic and does not depend on Gemini or a paid Google API.
  const checklist = getChecklistForCategory(category);
  const selfCheckItems = checklist.items;
  const diagnoses = createLegacyDiagnoses(selfCheckItems);
  const auditMetrics = createLegacyMetrics(selfCheckItems);
  const quickWins = selfCheckItems.filter((item) => item.priority === "high").slice(0, 3)
    .map((item) => `${item.title}: ${item.whatToCheck}`);

  // OSM is supplemental only. A slow/unavailable provider must never block the basic checklist.
  const emptyLookup = {
    provider: "OpenStreetMap" as const,
    status: "provider_error" as const,
    checkedAt: new Date().toISOString(),
    candidates: [],
    attribution: "© OpenStreetMap contributors" as const,
    message: "Pencarian OpenStreetMap melewati batas waktu 3 detik atau sedang tidak tersedia. Checklist tetap dibuat tanpa data eksternal.",
  };
  let publicBusinessLookup: Awaited<ReturnType<typeof lookupPublicBusiness>> = emptyLookup;
  try {
    publicBusinessLookup = await lookupPublicBusiness(businessName.trim(), location.trim(), { timeoutMs: 3000 });
  } catch (error) {
    console.warn("OpenStreetMap lookup skipped; template audit continues:", error);
  }

  const hasSubmittedEvidence = Boolean(
    submittedEvidence.mapsProfileUrl || submittedEvidence.observedRating !== null ||
    submittedEvidence.observedReviewCount !== null || submittedEvidence.websiteUrl ||
    submittedEvidence.recentReviews30d !== null
  );

  return res.status(200).json({
    businessName: businessName.trim(),
    category,
    location: location.trim(),
    overallScore: null,
    statusGoogleMaps: "Profil Google Business Profile belum diverifikasi oleh sistem.",
    statusGoogleSearch: "Ranking Google Search belum diukur.",
    auditMetrics,
    quickWins,
    diagnoses,
    selfCheckItems,
    strategicAdvice: hasSubmittedEvidence
      ? "Gunakan data yang Anda masukkan sebagai petunjuk awal untuk pemeriksaan manual. Data tersebut belum diverifikasi independen; cocokkan langsung dengan profil dan kanal resmi bisnis sebelum mengambil keputusan."
      : "Mulai dari checklist pemeriksaan di bawah. Setiap poin adalah hal yang perlu dicek, bukan klaim bahwa profil bisnis Anda bermasalah. Audit lebih mendalam memerlukan data profil dan bukti yang dapat diverifikasi.",
    dataMode: "template_only",
    scoreType: "not_measured",
    modelUsed: null,
    dataSources: publicBusinessLookup.candidates.length > 0 ? ["OpenStreetMap"] : [],
    publicBusinessLookup,
    placesLookupStatus: publicBusinessLookup.status,
    publicData: null,
    submittedEvidence,
    auditReadiness: {
      status: hasSubmittedEvidence ? "user_evidence_unverified" : "checklist_only",
      message: hasSubmittedEvidence
        ? "Ada data yang dimasukkan pengguna, tetapi belum diverifikasi independen."
        : "Hasil ini merupakan checklist awal berbasis kategori; belum ada data profil bisnis yang diverifikasi.",
    },
    rankingMeasurement: {
      status: "not_measured",
      message: "Ranking Google Maps belum diukur. Laporan ini tidak menerbitkan skor atau posisi ranking dan tidak memanggil Google Maps API berbayar.",
    },
    ownerDataStatus: "not_connected",
  });
}
