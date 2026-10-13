import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "10kb" }));

  // Lightweight per-process throttle; use a shared store for multi-instance deployments.
  const requestWindows = new Map<string, { count: number; resetAt: number }>();
  const WINDOW_MS = 15 * 60 * 1000;
  const MAX_REQUESTS = 10;

  app.post("/api/audit", async (req, res) => {
    const now = Date.now();
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const window = requestWindows.get(ip);
    if (!window || window.resetAt <= now) {
      requestWindows.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else if (window.count >= MAX_REQUESTS) {
      return res.status(429).json({ error: "Terlalu banyak permintaan audit. Silakan coba lagi setelah beberapa saat." });
    } else {
      window.count += 1;
    }

    const businessName = typeof req.body?.businessName === "string" ? req.body.businessName.trim() : "";
    const category = typeof req.body?.category === "string" ? req.body.category.trim() : "";
    const location = typeof req.body?.location === "string" ? req.body.location.trim() : "";
    if (!businessName || !category || !location) {
      return res.status(400).json({ error: "Nama bisnis, kategori, dan lokasi wajib diisi." });
    }
    if (businessName.length > 120 || category.length > 100 || location.length > 120) {
      return res.status(400).json({ error: "Panjang input melebihi batas yang diizinkan." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: "Layanan audit belum dikonfigurasi. Silakan hubungi KetemuTerus untuk audit manual." });
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
          systemInstruction: "Anda membantu KetemuTerus menyusun diagnosis awal Local SEO yang jujur. Bedakan hipotesis umum dari temuan terverifikasi. Tidak ada akses data live. Jangan menjanjikan ranking, hasil, atau pertumbuhan tertentu.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              category: { type: Type.STRING },
              location: { type: Type.STRING },
              overallScore: { type: Type.INTEGER, description: "Skor indikatif checklist edukatif 0-100, bukan skor resmi Google." },
              statusGoogleMaps: { type: Type.STRING, description: "Diagnosis umum dan hal yang harus diverifikasi; bukan temuan live." },
              statusGoogleSearch: { type: Type.STRING, description: "Diagnosis umum dan hal yang harus diverifikasi; bukan temuan live." },
              auditMetrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.INTEGER, description: "Skor indikatif checklist edukatif 0-100, bukan pengukuran live." },
                    status: { type: Type.STRING },
                    details: { type: Type.STRING, description: "Checklist atau hipotesis yang harus diverifikasi, bukan fakta tentang bisnis." }
                  },
                  required: ["name", "score", "status", "details"]
                }
              },
              quickWins: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tindakan yang dapat diverifikasi, tanpa klaim dampak numerik." },
              strategicAdvice: { type: Type.STRING, description: "Saran umum dengan penjelasan bahwa pemeriksaan manual diperlukan." }
            },
            required: ["businessName", "category", "location", "overallScore", "statusGoogleMaps", "statusGoogleSearch", "auditMetrics", "quickWins", "strategicAdvice"]
          }
        }
      });

      const textResult = response.text?.trim();
      if (!textResult) return res.status(502).json({ error: "Layanan audit tidak memberikan hasil valid. Silakan coba lagi." });
      const auditData = JSON.parse(textResult);
      auditData.businessName = businessName;
      auditData.category = category;
      auditData.location = location;
      auditData.overallScore = Math.max(0, Math.min(100, Number(auditData.overallScore) || 0));
      if (Array.isArray(auditData.auditMetrics)) {
        auditData.auditMetrics = auditData.auditMetrics.map((metric: any) => ({
          ...metric,
          score: Math.max(0, Math.min(100, Number(metric.score) || 0)),
        }));
      }
      res.json(auditData);
    } catch (error) {
      console.error("Audit request failed:", error);
      res.status(500).json({ error: "Audit gagal diproses. Silakan coba lagi atau hubungi KetemuTerus untuk audit manual." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
