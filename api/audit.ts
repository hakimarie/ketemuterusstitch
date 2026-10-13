import type { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";

// Vercel deploys files in /api as serverless functions. This limit is per warm instance.
const requestWindows = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 10;

function getClientKey(req: Request): string {
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) return realIp.trim();

  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Keep the in-memory map bounded and remove expired windows.
  for (const [storedKey, window] of requestWindows) {
    if (window.resetAt <= now) requestWindows.delete(storedKey);
  }

  const current = requestWindows.get(key);
  if (!current) {
    if (requestWindows.size >= 5000) return true;
    requestWindows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS) return true;
  current.count += 1;
  return false;
}

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode request tidak didukung." });
  }

  const clientKey = getClientKey(req);
  if (isRateLimited(clientKey)) {
    return res.status(429).json({
      error: "Terlalu banyak permintaan audit. Silakan coba lagi setelah beberapa saat.",
    });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  // Match the Express middleware limit used in local development.
  try {
    if (JSON.stringify(body).length > 10 * 1024) {
      return res.status(413).json({ error: "Ukuran data permintaan terlalu besar." });
    }
  } catch {
    return res.status(400).json({ error: "Format data permintaan tidak valid." });
  }
  const businessName = typeof body.businessName === "string" ? body.businessName.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";

  if (!businessName || !category || !location) {
    return res.status(400).json({
      error: "Nama bisnis, kategori, dan lokasi wajib diisi.",
    });
  }

  if (businessName.length > 120 || category.length > 100 || location.length > 120) {
    return res.status(400).json({ error: "Panjang input melebihi batas yang diizinkan." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Layanan audit belum dikonfigurasi. Silakan hubungi KetemuTerus untuk audit manual.",
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "ketemuterus-website" } },
    });

    const prompt = `Buat diagnosis awal edukatif untuk bisnis lokal berikut.
Nama bisnis: ${businessName}
Kategori: ${category}
Lokasi: ${location}

PENTING: Anda TIDAK memiliki akses live ke Google Maps, Google Business Profile, ulasan aktual, ranking aktual, website, traffic, atau analytics bisnis ini. Jangan mengklaim telah memeriksa atau mengetahui fakta-fakta tersebut. Jangan menyatakan profil sudah/belum terdaftar, ranking tertentu, jumlah/rating ulasan, kecepatan website, atau kekurangan spesifik sebagai fakta. Berikan hipotesis umum yang jelas ditandai sebagai hal yang perlu diverifikasi. Jangan mengarang angka performa, kenaikan persentase, atau jaminan ranking. Sarankan langkah audit yang bisa diperiksa oleh pemilik bisnis. Semua teks harus dalam Bahasa Indonesia dan sesuai skema JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Anda membantu KetemuTerus menyusun diagnosis awal Local SEO yang jujur. Bedakan hipotesis umum dari temuan terverifikasi. Tidak ada akses data live. Jangan menjanjikan ranking, hasil, atau pertumbuhan tertentu.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessName: { type: Type.STRING },
            category: { type: Type.STRING },
            location: { type: Type.STRING },
            overallScore: {
              type: Type.INTEGER,
              description: "Skor indikatif checklist edukatif 0-100, bukan skor resmi Google.",
            },
            statusGoogleMaps: {
              type: Type.STRING,
              description: "Diagnosis umum dan hal yang harus diverifikasi; bukan temuan live.",
            },
            statusGoogleSearch: {
              type: Type.STRING,
              description: "Diagnosis umum dan hal yang harus diverifikasi; bukan temuan live.",
            },
            auditMetrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  score: {
                    type: Type.INTEGER,
                    description: "Skor indikatif checklist edukatif 0-100, bukan pengukuran live.",
                  },
                  status: { type: Type.STRING },
                  details: {
                    type: Type.STRING,
                    description: "Checklist atau hipotesis yang harus diverifikasi, bukan fakta tentang bisnis.",
                  },
                },
                required: ["name", "score", "status", "details"],
              },
            },
            quickWins: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Tindakan yang dapat diverifikasi, tanpa klaim dampak numerik.",
            },
            strategicAdvice: {
              type: Type.STRING,
              description: "Saran umum dengan penjelasan bahwa pemeriksaan manual diperlukan.",
            },
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
        },
      },
    });

    const textResult = response.text?.trim();
    if (!textResult) {
      return res.status(502).json({
        error: "Layanan audit tidak memberikan hasil valid. Silakan coba lagi.",
      });
    }

    const auditData = JSON.parse(textResult);
    auditData.businessName = businessName;
    auditData.category = category;
    auditData.location = location;
    auditData.overallScore = Math.max(0, Math.min(100, Number(auditData.overallScore) || 0));

    if (Array.isArray(auditData.auditMetrics)) {
      auditData.auditMetrics = auditData.auditMetrics.map((metric: Record<string, unknown>) => ({
        ...metric,
        score: Math.max(0, Math.min(100, Number(metric.score) || 0)),
      }));
    }

    return res.status(200).json(auditData);
  } catch (error) {
    console.error("Audit request failed:", error);

    // Give the user actionable but non-sensitive guidance; keep provider details in server logs.
    const providerError = error as { status?: number; code?: number | string; message?: string };
    const statusCode = Number(providerError?.status ?? providerError?.code);
    if (statusCode === 401 || statusCode === 403) {
      return res.status(502).json({
        error: "Layanan AI menolak autentikasi. Periksa apakah GEMINI_API_KEY di Vercel valid dan aktif.",
      });
    }
    if (statusCode === 404) {
      return res.status(502).json({
        error: "Model AI tidak ditemukan atau tidak tersedia. Periksa nama model yang dikonfigurasi pada endpoint audit.",
      });
    }
    if (statusCode === 429) {
      return res.status(503).json({
        error: "Kuota atau batas permintaan layanan AI sedang tercapai. Coba lagi nanti atau hubungi KetemuTerus untuk audit manual.",
      });
    }
    return res.status(502).json({
      error: "Layanan AI gagal memproses permintaan. Periksa Vercel Function Logs untuk detail teknis, lalu coba lagi.",
    });
  }
}
