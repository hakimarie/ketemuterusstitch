import React, { useMemo, useState } from "react";
import { Grid3X3, MapPin, ExternalLink, Info, Target } from "lucide-react";

type GridPoint = {
  id: number;
  row: number;
  col: number;
  lat: number;
  lng: number;
  distanceKm: number;
};

function parseMapsInput(value: string) {
  const trimmed = value.trim();
  const placeIdMatch =
    trimmed.match(/(?:query_place_id=|place_id=|!1s)(ChI[A-Za-z0-9_-]+)/i) ||
    ( /^ChI[A-Za-z0-9_-]{10,}$/.test(trimmed) ? [trimmed, trimmed] : null );
  const atCoordinates = trimmed.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
  const dataCoordinates = trimmed.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  const coords = atCoordinates || dataCoordinates;
  return {
    placeId: placeIdMatch?.[1] || "",
    lat: coords?.[1] || "",
    lng: coords?.[2] || "",
  };
}

export default function LocalRankGrid() {
  const [businessName, setBusinessName] = useState("");
  const [mapsInput, setMapsInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radiusKm, setRadiusKm] = useState("1");
  const [gridSize, setGridSize] = useState("3");
  const [points, setPoints] = useState<GridPoint[]>([]);
  const [message, setMessage] = useState("");

  const parsed = useMemo(() => parseMapsInput(mapsInput), [mapsInput]);
  const effectiveLat = latitude || parsed.lat;
  const effectiveLng = longitude || parsed.lng;

  const handleMapsInput = (value: string) => {
    setMapsInput(value);
    const parsedValue = parseMapsInput(value);
    if (parsedValue.lat) setLatitude(parsedValue.lat);
    if (parsedValue.lng) setLongitude(parsedValue.lng);
  };

  const generateGrid = (event: React.FormEvent) => {
    event.preventDefault();
    const lat = Number(effectiveLat);
    const lng = Number(effectiveLng);
    const radius = Number(radiusKm);
    const size = Number(gridSize);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      setMessage("Masukkan koordinat latitude dan longitude yang valid. Place ID saja tidak cukup untuk menghitung titik grid tanpa lookup API.");
      setPoints([]);
      return;
    }
    if (!keyword.trim()) {
      setMessage("Masukkan kata kunci yang ingin dipantau, misalnya: barbershop Depok.");
      setPoints([]);
      return;
    }
    if (!Number.isFinite(radius) || radius <= 0 || radius > 20) {
      setMessage("Radius harus lebih dari 0 km dan maksimal 20 km.");
      setPoints([]);
      return;
    }

    const nextPoints: GridPoint[] = [];
    const step = size > 1 ? (radius * 2) / (size - 1) : 0;
    let id = 1;
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const northOffset = radius - row * step;
        const eastOffset = -radius + col * step;
        const pointLat = lat + northOffset / 111.32;
        const longitudeScale = Math.max(0.2, Math.cos((lat * Math.PI) / 180));
        const pointLng = lng + eastOffset / (111.32 * longitudeScale);
        nextPoints.push({
          id: id++,
          row,
          col,
          lat: Number(pointLat.toFixed(6)),
          lng: Number(pointLng.toFixed(6)),
          distanceKm: Number(Math.sqrt(northOffset ** 2 + eastOffset ** 2).toFixed(2)),
        });
      }
    }
    setPoints(nextPoints);
    setMessage("");
  };

  return (
    <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Grid3X3 className="w-5 h-5" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-full px-3 py-1 mb-2">
            <Target className="w-3.5 h-3.5" /> LOCAL SEO GRID PLANNER
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Rencanakan titik pemantauan Google Maps</h3>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Buat grid koordinat di sekitar lokasi bisnis untuk persiapan pengukuran ranking lokal. MVP ini tidak mengambil atau mengklaim ranking Google Maps aktual.
          </p>
        </div>
      </div>

      <form onSubmit={generateGrid} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block text-sm font-semibold text-slate-700">
          Nama bisnis
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Contoh: Barbershop ABC" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Kata kunci target
          <input required value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Contoh: barbershop Depok" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>
        <label className="block md:col-span-2 text-sm font-semibold text-slate-700">
          URL Google Maps atau Place ID
          <input value={mapsInput} onChange={(e) => handleMapsInput(e.target.value)} placeholder="Tempel URL Google Maps atau Place ID (ChIJ...)" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          {parsed.placeId && <span className="mt-1 block text-xs text-emerald-700">Place ID terbaca dari input. Identitas ini belum diverifikasi melalui Google API.</span>}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Latitude
          <input required type="number" step="any" value={effectiveLat} onChange={(e) => setLatitude(e.target.value)} placeholder="-6.200000" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Longitude
          <input required type="number" step="any" value={effectiveLng} onChange={(e) => setLongitude(e.target.value)} placeholder="106.816666" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Radius dari titik tengah
          <select value={radiusKm} onChange={(e) => setRadiusKm(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="0.5">0,5 km</option>
            <option value="1">1 km</option>
            <option value="2">2 km</option>
            <option value="3">3 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Resolusi grid
          <select value={gridSize} onChange={(e) => setGridSize(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option value="3">3 × 3 (9 titik)</option>
            <option value="5">5 × 5 (25 titik)</option>
          </select>
        </label>
        <div className="md:col-span-2">
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 transition-colors">
            <Grid3X3 className="w-4 h-4" /> Generate Grid
          </button>
        </div>
      </form>

      {message && <div role="alert" className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</div>}

      {points.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <h4 className="font-bold text-slate-900">{businessName.trim() || "Lokasi bisnis"} — {points.length} titik grid</h4>
              <p className="text-sm text-slate-600 mt-1">Kata kunci: <strong>{keyword.trim()}</strong> · Radius: {radiusKm} km</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-full">
              <Info className="w-3.5 h-3.5" /> Status ranking: belum diukur
            </span>
          </div>

          <div className="grid gap-2 max-w-xl mx-auto" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
            {points.map((point) => (
              <a key={point.id} href={`https://www.google.com/maps/search/?api=1&query=${point.lat}%2C${point.lng}`} target="_blank" rel="noopener noreferrer" title={`Buka titik ${point.id} di Google Maps`} className="min-h-20 sm:min-h-24 rounded-xl border border-slate-200 bg-slate-100 hover:bg-blue-50 hover:border-blue-300 p-2 flex flex-col items-center justify-center text-center transition-colors">
                <span className="text-sm sm:text-base font-extrabold text-slate-700">#{point.id}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-1">Belum diukur</span>
                <ExternalLink className="w-3 h-3 text-slate-400 mt-1" />
              </a>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <p>Setiap kotak adalah koordinat yang bisa dibuka di Google Maps. Warna netral berarti ranking belum diukur — bukan berarti bisnis tidak ditemukan. Place ID yang ditempel di atas hanya disimpan sebagai referensi pada sesi ini dan belum divalidasi ke Google.</p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="py-3 pr-3">Titik</th><th className="py-3 pr-3">Latitude</th><th className="py-3 pr-3">Longitude</th><th className="py-3 pr-3">Jarak perkiraan</th><th className="py-3">Peta</th></tr></thead>
              <tbody>{points.map((point) => (
                <tr key={point.id} className="border-b border-slate-100">
                  <td className="py-2.5 pr-3 font-semibold">{point.id}</td>
                  <td className="py-2.5 pr-3 tabular-nums">{point.lat}</td>
                  <td className="py-2.5 pr-3 tabular-nums">{point.lng}</td>
                  <td className="py-2.5 pr-3">{point.distanceKm} km</td>
                  <td className="py-2.5"><a className="text-blue-700 hover:underline inline-flex items-center gap-1" href={`https://www.google.com/maps/search/?api=1&query=${point.lat}%2C${point.lng}`} target="_blank" rel="noopener noreferrer">Buka <ExternalLink className="w-3 h-3" /></a></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
