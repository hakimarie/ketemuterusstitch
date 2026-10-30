type LookupStatus = "matched" | "no_match" | "provider_error";

export interface PublicBusinessLookup {
  status: LookupStatus;
  source: "OpenStreetMap Nominatim";
  name: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
  attribution: string;
  checkedAt: string;
  message: string;
}

type NominatimResult = {
  display_name?: string;
  lat?: string;
  lon?: string;
  name?: string;
  namedetails?: Record<string, string>;
  type?: string;
  category?: string;
  class?: string;
  address?: Record<string, string>;
};

const normalize = (value: string) =>
  value.toLocaleLowerCase("id").normalize("NFKD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

function addressFromResult(item: NominatimResult): string | null {
  return item.display_name?.trim() || null;
}

/**
 * Looks up a public OpenStreetMap place record. This is deliberately not presented
 * as Google Business Profile data: OSM does not provide Google ratings or reviews.
 * Nominatim usage policy requires an identifying User-Agent and low request volume.
 */
export async function lookupPublicBusiness(
  businessName: string,
  location: string,
): Promise<PublicBusinessLookup> {
  const checkedAt = new Date().toISOString();
  const base = {
    source: "OpenStreetMap Nominatim" as const,
    attribution: "© OpenStreetMap contributors",
    checkedAt,
  };

  try {
    const query = new URLSearchParams({
      q: `${businessName}, ${location}`,
      format: "jsonv2",
      addressdetails: "1",
      namedetails: "1",
      limit: "5",
    });
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${query.toString()}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Accept-Language": "id,en",
        "User-Agent": "KetemuTerusLocalAudit/1.0 (https://ketemuterus.biz.id)",
      },
      signal: AbortSignal.timeout(6500),
    });

    if (!response.ok) {
      return { ...base, status: "provider_error", name: null, address: null, latitude: null, longitude: null, category: null,
        message: `Sumber OpenStreetMap tidak dapat diakses saat ini (HTTP ${response.status}). Data Google Maps tidak diperiksa.` };
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      return { ...base, status: "provider_error", name: null, address: null, latitude: null, longitude: null, category: null,
        message: "Sumber OpenStreetMap mengembalikan format data yang tidak dikenali. Data Google Maps tidak diperiksa." };
    }

    const requested = normalize(businessName);
    const candidates = (payload as NominatimResult[]).map((item) => {
      const candidateName = item.name || item.namedetails?.name || item.display_name?.split(",")[0] || "";
      const candidate = normalize(candidateName);
      const exact = candidate === requested;
      const contains = candidate.length > 2 && (candidate.includes(requested) || requested.includes(candidate));
      return { item, candidateName, score: exact ? 2 : contains ? 1 : 0 };
    }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score);

    const best = candidates[0];
    if (!best) {
      return { ...base, status: "no_match", name: null, address: null, latitude: null, longitude: null, category: null,
        message: "Nama bisnis tidak ditemukan sebagai tempat yang cocok di OpenStreetMap. Ini bukan bukti bahwa profil Google Maps tidak ada." };
    }

    const lat = Number(best.item.lat);
    const lon = Number(best.item.lon);
    return {
      ...base,
      status: "matched",
      name: best.candidateName,
      address: addressFromResult(best.item),
      latitude: Number.isFinite(lat) ? lat : null,
      longitude: Number.isFinite(lon) ? lon : null,
      category: [best.item.category || best.item.class, best.item.type].filter(Boolean).join(" / ") || null,
      message: "Ditemukan kecocokan nama di OpenStreetMap. Kecocokan ini bukan verifikasi Google Business Profile dan tidak mencakup rating atau ulasan Google.",
    };
  } catch (error) {
    const timedOut = error instanceof Error && /timeout|abort/i.test(error.message);
    return { ...base, status: "provider_error", name: null, address: null, latitude: null, longitude: null, category: null,
      message: timedOut
        ? "Pencarian OpenStreetMap melewati batas waktu. Data Google Maps tidak diperiksa."
        : "Pencarian OpenStreetMap gagal. Data Google Maps tidak diperiksa." };
  }
}
