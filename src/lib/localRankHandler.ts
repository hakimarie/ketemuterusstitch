const isRecord = (value: unknown): value is Record<string, any> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const cleanText = (value: unknown, max: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
const finiteRange = (value: unknown, min: number, max: number): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

type GridPoint = { row: number; col: number; latitude: number; longitude: number };
function createGrid(latitude: number, longitude: number, spacingMeters: number): GridPoint[] {
  const points: GridPoint[] = [];
  for (let row = -1; row <= 1; row += 1) {
    for (let col = -1; col <= 1; col += 1) {
      points.push({
        row: row + 2,
        col: col + 2,
        latitude: Number((latitude + row * spacingMeters / 111320).toFixed(6)),
        longitude: Number((longitude + col * spacingMeters / (111320 * Math.cos(latitude * Math.PI / 180))).toFixed(6)),
      });
    }
  }
  return points;
}

async function measurePoint(point: GridPoint, keyword: string, businessName: string, login: string, password: string) {
  const auth = Buffer.from(`${login}:${password}`).toString("base64");
  const response = await fetch("https://api.dataforseo.com/v3/serp/google/maps/live/advanced", {
    method: "POST",
    headers: { "Authorization": `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify([{
      keyword,
      location_coordinate: `${point.latitude},${point.longitude},17z`,
      language_code: "id",
      depth: 20,
      device: "mobile",
      search_this_area: true,
      search_places: false,
    }]),
  });
  if (!response.ok) throw new Error(`Rank provider HTTP ${response.status}`);
  const payload: unknown = await response.json();
  if (!isRecord(payload) || !Array.isArray(payload.tasks) || !isRecord(payload.tasks[0])) {
    throw new Error("Rank provider returned an invalid response.");
  }
  const task = payload.tasks[0];
  if (task.status_code !== 20000 || !Array.isArray(task.result) || !isRecord(task.result[0])) {
    throw new Error("Rank provider did not return a successful result.");
  }
  const items = Array.isArray(task.result[0].items) ? task.result[0].items : [];
  const target = normalize(businessName);
  const candidates = items.filter((item: unknown) => isRecord(item) &&
    item.type === "maps_search" && typeof item.title === "string" &&
    normalize(item.title) === target);
  const match = candidates.length === 1 ? candidates[0] : null;
  return {
    row: point.row, col: point.col, latitude: point.latitude, longitude: point.longitude,
    rank: match && Number.isInteger(match.rank_absolute) ? match.rank_absolute as number : null,
    title: match?.title ?? null,
    resultsScanned: items.filter((item: unknown) => isRecord(item) && item.type === "maps_search").length,
    status: candidates.length > 1 ? "ambiguous_match" : match ? "measured" : "not_found_in_top_20",
  };
}

export default async function handleLocalRank(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metode permintaan tidak didukung." });
  }
  const { businessName, keyword, latitude, longitude, spacingMeters, confirmPaidLookup } = req.body ?? {};
  if (!cleanText(businessName, 120) || !cleanText(keyword, 180) ||
      !finiteRange(latitude, -90, 90) || !finiteRange(longitude, -180, 180) ||
      !finiteRange(spacingMeters, 100, 2000) || confirmPaidLookup !== true) {
    return res.status(400).json({ error: "Isi nama bisnis, keyword, koordinat valid, jarak 100–2.000 meter, dan konfirmasi biaya provider." });
  }
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    return res.status(503).json({
      error: "Pengukuran ranking belum aktif. Tim perlu mengatur DATAFORSEO_LOGIN dan DATAFORSEO_PASSWORD di environment server terlebih dahulu.",
      code: "RANK_PROVIDER_NOT_CONFIGURED",
    });
  }
  const points = createGrid(latitude, longitude, spacingMeters);
  try {
    // A 3x3 grid runs nine provider requests; the provider may charge per request.
    // Limit concurrency to reduce bursts while keeping response time manageable.
    const results: any[] = [];
    for (let start = 0; start < points.length; start += 3) {
      const batch = points.slice(start, start + 3);
      const batchResults = await Promise.all(batch.map(point => measurePoint(point, keyword.trim(), businessName.trim(), login, password)));
      results.push(...batchResults);
    }
    const ranks = results.map(point => point.rank).filter((rank): rank is number => typeof rank === "number");
    return res.status(200).json({
      status: "measured",
      provider: "DataForSEO Google Maps SERP live",
      measuredAt: new Date().toISOString(),
      keyword: keyword.trim(),
      businessName: businessName.trim(),
      gridSize: "3x3",
      spacingMeters,
      results,
      summary: {
        pointsChecked: results.length,
        pointsFound: ranks.length,
        averageRank: ranks.length ? Number((ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length).toFixed(1)) : null,
        bestRank: ranks.length ? Math.min(...ranks) : null,
        worstRank: ranks.length ? Math.max(...ranks) : null,
        notFoundMeans: "Tidak ditemukan pada hasil Maps yang dikembalikan hingga kedalaman 20; bukan bukti bisnis tidak ada di Google Maps.",
      },
      disclaimer: "Snapshot ranking berdasarkan keyword, koordinat, perangkat mobile, dan waktu pengukuran ini. Hasil dapat berubah menurut lokasi, waktu, perangkat, dan konfigurasi pencarian. Provider dapat menagih biaya untuk setiap titik.",
    });
  } catch (error) {
    console.error("Local rank measurement failed:", error);
    return res.status(502).json({ error: "Pengukuran ranking gagal. Tidak ada hasil ranking yang ditampilkan; periksa status provider lalu coba lagi." });
  }
}
