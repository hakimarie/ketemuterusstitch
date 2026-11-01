import { lookupPublicBusiness } from "./publicBusinessLookup.js";
import { getChecklistForCategory } from "./checklists/index.js";
import type { AuditDiagnosis, AuditMetric } from "../types.js";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const auditRateLimits = new Map<string, { count: number; resetAt: number }>();

function getClientKey(req: any): string {
  const forwarded = req.headers?.["x-forwarded-for"];
  const candidate = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  const ip = typeof candidate === "string" ? candidate.trim().slice(0, 100) : "";
  return ip || req.socket?.remoteAddress || "unknown";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const current = auditRateLimits.get(key);
  if (!current || current.resetAt <= now) {
    auditRateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  } else {
    current.count += 1;
  }
  if (auditRateLimits.size > 2000) {
    for (const [entryKey, entry] of auditRateLimits) {
      if (entry.resetAt <= now) auditRateLimits.delete(entryKey);
    }
    while (auditRateLimits.size > 2000) {
      const oldestKey = auditRateLimits.keys().next().value;
      if (!oldestKey) break;
      auditRateLimits.delete(oldestKey);
    }
  }
  return true;
}

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

type NextStepItem = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  action: string;
  estimatedTime: string;
};

function deriveNextSteps(items: ReturnType<typeof getChecklistForCategory>["items"], businessName: string) {
  const priorityOrder = { high: 0, medium: 1, low: 2 } as const;
  const ordered = [...items].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const steps: NextStepItem[] = ordered.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    priority: item.priority,
    action: item.whatToCheck,
    estimatedTime: item.estimatedTime,
  }));
  const topPriority = steps[0] ?? null;

  return {
    topPriority,
    items: steps,
    whatsappCta: topPriority
      ? {
          intent: "consultation" as const,
          label: "Konsultasikan prioritas utama",
          context: `Saya ingin membahas langkah “${topPriority.title}” untuk bisnis ${businessName}. Langkah awal yang disarankan: ${topPriority.action}`,
        }
      : null,
  };
}

function deriveOptionalDataPrompt(evidence: {
  mapsProfileUrl: string | null;
  observedRating: number | null;
  observedReviewCount: number | null;
  websiteUrl: string | null;
  recentReviews30d: number | null;
}) {
  const fields = [
    {
      key: "mapsProfileUrl",
      label: "Tautan profil Google Maps",
      reason: "Membantu mengidentifikasi profil yang perlu diperiksa secara manual.",
      provided: Boolean(evidence.mapsProfileUrl),
    },
    {
      key: "observedRating",
      label: "Rating yang terlihat di Google Maps",
      reason: "Memberi konteks rating yang Anda amati sendiri; belum diverifikasi sistem.",
      provided: evidence.observedRating !== null,
    },
    {
      key: "observedReviewCount",
      label: "Jumlah ulasan yang terlihat",
      reason: "Memberi konteks jumlah ulasan yang Anda amati sendiri; belum diverifikasi sistem.",
      provided: evidence.observedReviewCount !== null,
    },
    {
      key: "recentReviews30d",
      label: "Jumlah ulasan dalam 30 hari terakhir",
      reason: "Membantu menilai aktivitas ulasan berdasarkan pengamatan manual.",
      provided: evidence.recentReviews30d !== null,
    },
    {
      key: "websiteUrl",
      label: "Website resmi bisnis",
      reason: "Memungkinkan pemeriksaan lanjutan terhadap konsistensi informasi bisnis.",
      provided: Boolean(evidence.websiteUrl),
    },
  ];
  const missingFields = fields
    .filter((field) => !field.provided)
    .map(({ key, label, reason }) => ({ key, label, reason }));

  if (missingFields.length === 0) return null;

  return {
    title: "Lengkapi data opsional untuk pemeriksaan lanjutan",
    message: "Jika tersedia, tambahkan informasi berikut. Semua data tetap dianggap sebagai input pengguna dan belum diverifikasi secara independen.",
    fields: missingFields,
  };
}

export default async function handleAudit(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode permintaan tidak didukung." });
  }

  if (!checkRateLimit(getClientKey(req))) {
    res.setHeader("Retry-After", "900");
    return res.status(429).json({ error: "Batas permintaan audit tercapai. Silakan coba lagi dalam 15 menit." });
  }

  const body = req.body;
  if (!isRecord(body)) {
    return res.status(400).json({ error: "Format data permintaan tidak valid." });
  }
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
  };

  // Basic audit is deterministic and does not depend on Gemini or a paid Google API.
  const checklist = getChecklistForCategory(category);
  const selfCheckItems = checklist.items;
  const quickWins = selfCheckItems.filter((item) => item.priority === "high").slice(0, 3)
    .map((item) => ({ id: item.id, title: item.title, description: item.whatToCheck, priority: item.priority, estimatedTime: item.estimatedTime }));

  // OSM is supplemental only. A slow/unavailable provider must never block the basic checklist.
  let publicBusinessLookup: Awaited<ReturnType<typeof lookupPublicBusiness>>;
  if (process.env.ENABLE_PUBLIC_BUSINESS_LOOKUP !== "true") {
    publicBusinessLookup = {
      provider: "OpenStreetMap", status: "disabled", checkedAt: new Date().toISOString(), candidates: [],
      attribution: "© OpenStreetMap contributors",
      message: "Pencarian direktori publik belum diaktifkan. Checklist tetap dibuat tanpa data eksternal.",
    };
  } else {
    try {
      publicBusinessLookup = await lookupPublicBusiness(businessName.trim(), location.trim(), { timeoutMs: 6500 });
    } catch (error) {
      console.warn("OpenStreetMap lookup skipped; template audit continues:", error);
      publicBusinessLookup = {
        provider: "OpenStreetMap", status: "provider_error", checkedAt: new Date().toISOString(), candidates: [],
        attribution: "© OpenStreetMap contributors",
        message: "Sumber data publik sedang tidak tersedia. Checklist tetap dibuat tanpa data eksternal.",
      };
    }
  }

  const hasSubmittedEvidence = Boolean(
    submittedEvidence.mapsProfileUrl || submittedEvidence.observedRating !== null ||
    submittedEvidence.observedReviewCount !== null || submittedEvidence.websiteUrl ||
    submittedEvidence.recentReviews30d !== null
  );

  const legacyFieldsEnabled = process.env.INCLUDE_LEGACY_FIELDS === "true";
  const legacyFields = legacyFieldsEnabled ? {
    overallScore: null,
    auditMetrics: createLegacyMetrics(selfCheckItems),
    diagnoses: createLegacyDiagnoses(selfCheckItems),
    quickWins: selfCheckItems.filter((item) => item.priority === "high").slice(0, 3)
      .map((item) => `${item.title}: ${item.whatToCheck}`),
  } : {};

  return res.status(200).json({
    businessName: businessName.trim(),
    category,
    location: location.trim(),
    statusGoogleMaps: "Profil Google Business Profile belum diverifikasi oleh sistem.",
    statusGoogleSearch: "Ranking Google Search belum diukur.",
    quickWins,
    ...legacyFields,
    selfCheckItems,
    nextSteps: deriveNextSteps(selfCheckItems, businessName.trim()),
    optionalDataPrompt: deriveOptionalDataPrompt(submittedEvidence),
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
