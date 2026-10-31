export type PublicBusinessCandidate = {
  name: string;
  osmType: string;
  osmId: number;
  osmUrl: string;
  category: string | null;
  address: string | null;
  website: string | null;
  phone: string | null;
  openingHours: string | null;
  cuisine: string | null;
  coordinates: { latitude: number; longitude: number } | null;
  matchType: "exact_name" | "possible_name";
};

export type PublicBusinessLookup = {
  provider: "OpenStreetMap";
  status: "matched" | "no_match" | "ambiguous_match" | "provider_error";
  checkedAt: string;
  candidates: PublicBusinessCandidate[];
  attribution: "© OpenStreetMap contributors";
  message: string;
};

type OverpassElement = {
  type?: string;
  id?: number;
  lat?: number;
  lon?: number;
  center?: { lat?: number; lon?: number };
  tags?: Record<string, string>;
};

const cache = new Map<string, { expiresAt: number; value: PublicBusinessLookup }>();
const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;
let lastRequestAt = 0;
let requestQueue: Promise<void> = Promise.resolve();

function normalize(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("id-ID").replace(/[^\\p{L}\\p{N}]+/gu, " ").trim();
}

function overpassRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function firstTag(tags: Record<string, string>, keys: string[]): string | null {
  for (const key of keys) {
    const value = tags[key]?.trim();
    if (value) return value.slice(0, 300);
  }
  return null;
}

function toCandidate(element: OverpassElement, businessName: string): PublicBusinessCandidate | null {
  if (!element.type || typeof element.id !== "number" || !element.tags?.name) return null;
  const tags = element.tags;
  const category = firstTag(tags, ["amenity", "shop", "tourism", "leisure", "office", "craft", "healthcare"]);
  if (!category) return null;

  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;
  const addressParts = [
    tags["addr:street"], tags["addr:housenumber"], tags["addr:suburb"],
    tags["addr:city"], tags["addr:postcode"],
  ].filter(Boolean);
  const exactName = normalize(tags.name) === normalize(businessName);

  return {
    name: tags.name.slice(0, 160),
    osmType: element.type,
    osmId: element.id,
    osmUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    category,
    address: addressParts.length ? addressParts.join(", ").slice(0, 300) : null,
    website: safeWebsite(firstTag(tags, ["website", "contact:website"])),
    phone: firstTag(tags, ["phone", "contact:phone"]),
    openingHours: firstTag(tags, ["opening_hours"]),
    cuisine: firstTag(tags, ["cuisine"]),
    coordinates: typeof lat === "number" && typeof lon === "number"
      ? { latitude: lat, longitude: lon } : null,
    matchType: exactName ? "exact_name" : "possible_name",
  };
}

function safeWebsite(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch { return null; }
}

async function waitForSharedInstanceThrottle(): Promise<void> {
  const task = requestQueue.then(async () => {
    const waitMs = Math.max(0, 1100 - (Date.now() - lastRequestAt));
    if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
    lastRequestAt = Date.now();
  });
  requestQueue = task.then(() => undefined, () => undefined);
  await task;
}

export async function lookupPublicBusiness(
  businessName: string,
  location: string,
  options: { timeoutMs?: number } = {},
): Promise<PublicBusinessLookup> {
  const cacheKey = `${normalize(businessName)}|${normalize(location)}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  if (cached) cache.delete(cacheKey);

  const checkedAt = new Date().toISOString();
  const base = process.env.OSM_OVERPASS_URL;
  if (!base) {
    return {
      provider: "OpenStreetMap", status: "provider_error", checkedAt, candidates: [],
      attribution: "© OpenStreetMap contributors",
      message: "Sumber OpenStreetMap belum dikonfigurasi. Tidak ada permintaan eksternal yang dikirim.",
    };
  }

  const timeoutMs = Math.max(1, options.timeoutMs ?? 18000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const namePattern = overpassRegex(businessName.trim());
  const locationPattern = overpassRegex(location.trim());
  const query = [
    "[out:json][timeout:15];",
    `area["name"~${JSON.stringify(locationPattern)},i]["boundary"="administrative"]->.searchArea;`,
    `(nwr(area.searchArea)["name"~${JSON.stringify(namePattern)},i];);`,
    "out center tags 30;",
  ].join("\n");

  try {
    await waitForSharedInstanceThrottle();
    if (controller.signal.aborted) throw new Error("OpenStreetMap lookup timed out");
    const response = await fetch(base, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "KetemuTerusAudit/1.0 (+https://ketemuterus.biz.id)",
        "Accept": "application/json",
      },
      body: new URLSearchParams({ data: query }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`OpenStreetMap provider returned HTTP ${response.status}`);

    const payload: unknown = await response.json();
    if (typeof payload !== "object" || payload === null || !("elements" in payload) ||
        !Array.isArray((payload as { elements?: unknown }).elements)) {
      throw new Error("OpenStreetMap provider returned an invalid response");
    }

    const candidates = ((payload as { elements: OverpassElement[] }).elements)
      .map((element) => toCandidate(element, businessName))
      .filter((candidate): candidate is PublicBusinessCandidate => candidate !== null)
      .sort((a, b) => Number(b.matchType === "exact_name") - Number(a.matchType === "exact_name"))
      .slice(0, 5);
    const exactCandidates = candidates.filter((candidate) => candidate.matchType === "exact_name");
    const status: PublicBusinessLookup["status"] = exactCandidates.length === 1
      ? "matched" : exactCandidates.length > 1 || candidates.length > 0 ? "ambiguous_match" : "no_match";
    const result: PublicBusinessLookup = {
      provider: "OpenStreetMap", status, checkedAt, candidates,
      attribution: "© OpenStreetMap contributors",
      message: status === "matched"
        ? "Satu entri dengan nama persis ditemukan di data OpenStreetMap. Entri komunitas ini belum membuktikan bahwa bisnis masih aktif atau bahwa data Google Business Profile sama."
        : status === "ambiguous_match"
          ? "Ada beberapa kandidat atau nama yang mirip. Sistem tidak memilih salah satunya secara otomatis."
          : "Tidak ditemukan entri yang cocok di OpenStreetMap. Ini bukan bukti bahwa bisnis tidak ada; cakupan data dapat tidak lengkap.",
    };
    cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, value: result });
    if (cache.size > CACHE_MAX_ENTRIES) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) cache.delete(oldestKey);
    }
    return result;
  } catch (error) {
    console.warn("OpenStreetMap public business lookup failed:", error);
    return {
      provider: "OpenStreetMap", status: "provider_error", checkedAt, candidates: [],
      attribution: "© OpenStreetMap contributors",
      message: "Sumber data publik melewati batas waktu atau sedang tidak tersedia. Hasil audit dilanjutkan tanpa data bisnis eksternal.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
