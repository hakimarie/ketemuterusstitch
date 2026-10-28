import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10kb" }));

  // Lightweight per-process rate limit. Use a shared store for multi-instance production deployments.
  const auditRequests = new Map<string, { count: number; resetAt: number }>();
  app.use("/api/audit", (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const current = auditRequests.get(key);
    if (!current || current.resetAt <= now) {
      auditRequests.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
      return next();
    }
    if (current.count >= 10) {
      return res.status(429).json({ error: "Batas permintaan audit tercapai. Silakan coba lagi dalam beberapa menit." });
    }
    current.count += 1;
    return next();
  });

  // API Route for Audit
  app.post("/api/audit", async (req, res) => {
    try {
      const { businessName, category, location } = req.body ?? {};
      const validString = (value: unknown, maxLength: number): value is string =>
        typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
      const allowedCategories = [
        "Cafe / Kedai Kopi", "Restoran", "Salon Kecantikan", "Klinik Medis / Gigi",
        "Gym / Pusat Kebugaran", "Laundry / Binatu", "Bengkel Otomotif",
        "Hotel / Penginapan", "UMKM / Toko Retail"
      ];
      if (!validString(businessName, 120) || !validString(location, 120) ||
          typeof category !== "string" || !allowedCategories.includes(category)) {
        return res.status(400).json({ error: "Periksa kembali nama bisnis, kategori, dan lokasi. Nama bisnis serta lokasi maksimal 120 karakter." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API Key Gemini belum dikonfigurasi di secrets." });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Analyze the local digital marketing and maps visibility profile of the following business:
Business Name: ${businessName.trim()}
Category: ${category}
Location: ${location.trim()}

IMPORTANT LIMITATION: You do not have live web access, Google Maps access, Google Business Profile data, review data, ranking data, website access, or analytics for this business. Do not claim you checked, found, observed, or verified any specific facts about it. Do not invent ratings, review counts, rankings, website performance, profile completeness, or competitors. Produce a preliminary educational assessment based only on the business name, category, and location supplied. Clearly state that actual status is unverified and recommend concrete checks the owner can perform. Scores, if supplied, must be described as heuristic estimates rather than measured results. Avoid guaranteed outcomes, exact percentage lifts, and promises of ranking or results within a timeframe. Use Indonesian and format JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a careful Local SEO educator for KetemuTerus. You have no live access to Google, Maps, websites, analytics, or customer reviews in this request. Never present assumptions as verified findings. Respond in Indonesian, label the output as a preliminary AI assessment, distinguish unknown facts from recommendations, and do not promise rankings, growth percentages, or time-bound outcomes.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              category: { type: Type.STRING },
              location: { type: Type.STRING },
              overallScore: { type: Type.INTEGER, description: "Perkiraan heuristik awal 0-100, bukan hasil pengukuran atau pemeriksaan langsung; nyatakan keterbatasan ini dalam laporan" },
              statusGoogleMaps: { type: Type.STRING, description: "Penjelasan ringkas status di Google Maps" },
              statusGoogleSearch: { type: Type.STRING, description: "Penjelasan ringkas status di Google Search" },
              auditMetrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Misalnya: 'Google Business Profile', 'Google Maps Ranking', 'Review Management', 'Local SEO Content', 'Website Performance'" },
                    score: { type: Type.INTEGER, description: "Skor 0-100" },
                    status: { type: Type.STRING, description: "'Sangat Kurang', 'Perlu Optimalisasi', 'Optimal'" },
                    details: { type: Type.STRING, description: "Penjelasan awal; jangan klaim sebagai temuan lapangan yang telah diverifikasi" }
                  },
                  required: ["name", "score", "status", "details"]
                }
              },
              quickWins: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 langkah perbaikan cepat yang berdampak besar"
              },
              strategicAdvice: {
                type: Type.STRING,
                description: "Saran strategis menyeluruh dari tim ahli KetemuTerus"
              }
            },
            required: ["businessName", "category", "location", "overallScore", "statusGoogleMaps", "statusGoogleSearch", "auditMetrics", "quickWins", "strategicAdvice"]
          }
        }
      });

      const textResult = response.text?.trim() || "{}";
      const auditData = JSON.parse(textResult);
      res.json(auditData);
    } catch (error: any) {
      console.error("Audit error:", error);
      res.status(500).json({ error: "Layanan audit sedang mengalami kendala. Silakan coba lagi nanti." });
    }
  });

  // Setup Vite middleware in Dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
