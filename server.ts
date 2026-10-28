import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import handleAudit from "./src/lib/auditHandler";

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

  // Shared audit handler keeps local and serverless behavior aligned.
  app.post("/api/audit", handleAudit);



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
