import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Audit
  app.post("/api/audit", async (req, res) => {
    try {
      const { businessName, category, location } = req.body;
      if (!businessName || !category || !location) {
        return res.status(400).json({ error: "Silakan isi semua bidang: nama bisnis, kategori, dan lokasi." });
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
Business Name: ${businessName}
Category: ${category}
Location: ${location}

Provide a realistic, highly professional local visibility audit report. Evaluate their potential Google Business Profile, Google Maps Ranking, Website presence, Review Status, and Local Search Optimization based on industry standards for their specific category and region. Be constructive and provide extremely valuable insights as a digital agency. Format the response as JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert Local SEO & Google Maps optimization auditor from the KetemuTerus agency. You provide highly realistic, professional, and actionable business visibility audits in Indonesian language (Bahasa Indonesia). Make sure the score and evaluations reflect the typical gaps of such local businesses (e.g., poor local listings, incomplete profile, lack of reviews, slow mobile website, missing Meta Ads pixels).",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              category: { type: Type.STRING },
              location: { type: Type.STRING },
              overallScore: { type: Type.INTEGER, description: "Nilai visibilitas online dari 0-100 (misalnya 45-65 untuk bisnis yang perlu perbaikan)" },
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
                    details: { type: Type.STRING, description: "Penjelasan detail dan temuan di lapangan" }
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
      res.status(500).json({ error: "Gagal memproses audit visibilitas: " + error.message });
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
