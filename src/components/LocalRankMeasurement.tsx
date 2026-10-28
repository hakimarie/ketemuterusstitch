import React, { useMemo, useState } from "react";
import { MapPinned, ExternalLink, ClipboardCheck, RotateCcw } from "lucide-react";

type GridPoint = { row: number; col: number; latitude: number; longitude: number };
function buildGrid(latitude: number, longitude: number, spacingMeters: number): GridPoint[] {
  const points: GridPoint[] = [];
  for (let row = -1; row <= 1; row += 1) for (let col = -1; col <= 1; col += 1) {
    points.push({
      row: row + 2, col: col + 2,
      latitude: Number((latitude + row * spacingMeters / 111320).toFixed(6)),
      longitude: Number((longitude + col * spacingMeters / (111320 * Math.cos(latitude * Math.PI / 180))).toFixed(6)),
    });
  }
  return points;
}
function mapsSearchUrl(keyword: string, latitude: number, longitude: number) {
  return `https://www.google.com/maps/search/${encodeURIComponent(keyword.trim())}/@${latitude},${longitude},15z`;
}
function csvTextCell(value: string) {
  // Prevent spreadsheet formula execution when a user-controlled text field starts with a formula marker.
  const safeValue = /^[\\t\\r ]*[=+\\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replace(/"/g, '""')}"`;
}
export default function LocalRankMeasurement() {
  const [businessName, setBusinessName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [spacingMeters, setSpacingMeters] = useState("500");
  const [run, setRun] = useState(false);
  const [ranks, setRanks] = useState<Record<string, string>>({});
  const validCoordinates = latitude.trim() !== "" && longitude.trim() !== "" &&
    Number.isFinite(Number(latitude)) && Number(latitude) >= -90 && Number(latitude) <= 90 &&
    Number.isFinite(Number(longitude)) && Number(longitude) >= -180 && Number(longitude) <= 180;
  const points = useMemo(() => validCoordinates
    ? buildGrid(Number(latitude), Number(longitude), Number(spacingMeters)) : [],
    [latitude, longitude, spacingMeters, validCoordinates]);
  const filled = points.map(p => ranks[`${p.row}-${p.col}`]).filter(Boolean);
  const numeric = filled.map(Number).filter(n => Number.isInteger(n) && n >= 1 && n <= 20);
  const average = numeric.length ? (numeric.reduce((sum, n) => sum + n, 0) / numeric.length).toFixed(1) : "—";
  function startGrid(event: React.FormEvent) { event.preventDefault(); setRanks({}); setRun(true); }
  function exportCsv() {
    const lines = [["Nama bisnis","Keyword","Titik","Latitude","Longitude","Posisi manual","Waktu ekspor"].join(","),
      ...points.map(p => [csvTextCell(businessName),csvTextCell(keyword),`${p.row}-${p.col}`,p.latitude,p.longitude,
        csvTextCell(ranks[`${p.row}-${p.col}`] || "Belum dicek"),JSON.stringify(new Date().toISOString())].join(","))];
    const url = URL.createObjectURL(new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "ketemuterus-local-rank-manual.csv";
    anchor.click(); URL.revokeObjectURL(url);
  }
  return <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
    <div className="flex items-start gap-3"><div className="rounded-xl bg-blue-50 p-3 text-blue-700"><MapPinned className="h-5 w-5" /></div><div>
      <h3 className="text-lg font-bold text-slate-800">Local Rank Grid — mode gratis/manual</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">Buat sembilan titik, buka pencarian Google Maps, lalu catat posisi bisnis yang terlihat. Tidak ada Google Maps API, scraping hasil, atau provider ranking berbayar yang dipanggil.</p>
    </div></div>
    <form onSubmit={startGrid} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="space-y-1.5 text-xs font-semibold text-slate-600">Nama bisnis persis<input required maxLength={120} value={businessName} onChange={e=>setBusinessName(e.target.value)} placeholder="Nama yang tampil di Maps" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" /></label>
      <label className="space-y-1.5 text-xs font-semibold text-slate-600">Keyword pencarian<input required maxLength={180} value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="contoh: cafe di Depok" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" /></label>
      <label className="space-y-1.5 text-xs font-semibold text-slate-600">Latitude titik tengah<input required type="number" step="any" min="-90" max="90" value={latitude} onChange={e=>setLatitude(e.target.value)} placeholder="-6.200000" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" /></label>
      <label className="space-y-1.5 text-xs font-semibold text-slate-600">Longitude titik tengah<input required type="number" step="any" min="-180" max="180" value={longitude} onChange={e=>setLongitude(e.target.value)} placeholder="106.816666" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" /></label>
      <label className="space-y-1.5 text-xs font-semibold text-slate-600 sm:col-span-2">Jarak antar titik<select value={spacingMeters} onChange={e=>setSpacingMeters(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500"><option value="250">250 meter</option><option value="500">500 meter</option><option value="1000">1.000 meter</option><option value="1500">1.500 meter</option><option value="2000">2.000 meter</option></select></label>
      <button type="submit" className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800"><MapPinned className="h-4 w-4" /> Buat grid manual 3×3</button>
    </form>
    {run && points.length === 9 && <div className="space-y-4 border-t border-slate-100 pt-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Titik dibuat</span><strong className="text-xl text-slate-800">9</strong></div>
        <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Posisi dicatat</span><strong className="text-xl text-slate-800">{filled.length}/9</strong></div>
        <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Rata-rata posisi ditemukan</span><strong className="text-xl text-slate-800">{average}</strong></div>
        <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Mode</span><strong className="text-sm text-slate-800">Manual</strong></div>
      </div>
      <div className="grid grid-cols-3 gap-2">{points.map(p => {
        const key = `${p.row}-${p.col}`; const rank = ranks[key] || "";
        return <div key={key} className={`rounded-xl border p-3 text-center ${rank && rank !== "not-found" ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
          <span className="block text-[10px] text-slate-500">Titik {p.row}-{p.col}</span><span className="my-1 block text-lg font-bold text-slate-800">{rank === "not-found" ? "N/A" : rank ? `#${rank}` : "—"}</span>
          <a href={mapsSearchUrl(keyword,p.latitude,p.longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-blue-700 underline"><ExternalLink className="h-3 w-3" /> Buka Maps</a>
          <label className="mt-2 block text-left text-[10px] font-semibold text-slate-500">Posisi yang terlihat<select value={rank} onChange={e=>setRanks(cur=>({...cur,[key]:e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700"><option value="">Belum dicek</option>{Array.from({length:20},(_,i)=><option key={i+1} value={String(i+1)}>Posisi {i+1}</option>)}<option value="not-found">Tidak terlihat di 20 hasil</option></select></label>
          <span className="mt-2 block break-all text-[9px] text-slate-400">{p.latitude}, {p.longitude}</span>
        </div>;
      })}</div>
      <div className="flex flex-wrap gap-2"><button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"><ClipboardCheck className="h-4 w-4" /> Ekspor CSV</button><button type="button" onClick={()=>{setRanks({});setRun(false);}} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"><RotateCcw className="h-4 w-4" /> Reset grid</button></div>
      <p className="text-xs leading-relaxed text-slate-600">Ini adalah lembar observasi manual, bukan pengukuran otomatis. Hasil bisa berbeda menurut lokasi aktual, akun, perangkat, personalisasi, dan waktu. “Tidak terlihat di 20 hasil” hanya catatan saat pemeriksaan, bukan bukti bisnis tidak ada di Google Maps.</p>
    </div>}
  </section>;
}
