import React, { useState } from "react";
import { MapPinned, LoaderCircle, AlertCircle, CheckCircle2 } from "lucide-react";

type RankPoint = {
  row: number; col: number; latitude: number; longitude: number;
  rank: number | null; title: string | null; resultsScanned: number;
  status: "measured" | "not_found_in_top_20" | "ambiguous_match";
};
type RankResponse = {
  status: string; provider: string; measuredAt: string; keyword: string; businessName: string;
  gridSize: string; spacingMeters: number; results: RankPoint[];
  summary: { pointsChecked: number; pointsFound: number; averageRank: number | null; bestRank: number | null; worstRank: number | null; notFoundMeans: string };
  disclaimer: string;
};

export default function LocalRankMeasurement() {
  const [businessName, setBusinessName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [spacingMeters, setSpacingMeters] = useState("500");
  const [confirmPaidLookup, setConfirmPaidLookup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RankResponse | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    if (!confirmPaidLookup) {
      setError("Centang konfirmasi biaya sebelum menjalankan sembilan permintaan ranking.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/local-rank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(), keyword: keyword.trim(),
          latitude: Number(latitude), longitude: Number(longitude),
          spacingMeters: Number(spacingMeters), confirmPaidLookup,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Pengukuran ranking belum berhasil.");
      setResult(data as RankResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengukur ranking.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-700"><MapPinned className="h-5 w-5" /></div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Ukur ranking Google Maps lokal</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Cek hasil untuk satu keyword dari 9 titik koordinat di sekitar lokasi bisnis. Ini pengukuran snapshot melalui provider, bukan ranking universal.</p>
        </div>
      </div>
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="space-y-1.5 text-xs font-semibold text-slate-600">Nama bisnis persis
          <input required maxLength={120} value={businessName} onChange={e=>setBusinessName(e.target.value)} placeholder="Nama yang tampil di Maps" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-1.5 text-xs font-semibold text-slate-600">Keyword pencarian
          <input required maxLength={180} value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="contoh: cafe dekat sini" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-1.5 text-xs font-semibold text-slate-600">Latitude titik tengah
          <input required type="number" step="any" min="-90" max="90" value={latitude} onChange={e=>setLatitude(e.target.value)} placeholder="-6.200000" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-1.5 text-xs font-semibold text-slate-600">Longitude titik tengah
          <input required type="number" step="any" min="-180" max="180" value={longitude} onChange={e=>setLongitude(e.target.value)} placeholder="106.816666" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
        </label>
        <label className="space-y-1.5 text-xs font-semibold text-slate-600 sm:col-span-2">Jarak antar titik (meter)
          <select value={spacingMeters} onChange={e=>setSpacingMeters(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500">
            <option value="250">250 meter</option><option value="500">500 meter</option><option value="1000">1.000 meter</option><option value="1500">1.500 meter</option><option value="2000">2.000 meter</option>
          </select>
        </label>
        <label className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
          <input type="checkbox" checked={confirmPaidLookup} onChange={e=>setConfirmPaidLookup(e.target.checked)} className="mt-0.5" />
          <span>Saya memahami bahwa tombol ini menjalankan 9 permintaan ke provider ranking pihak ketiga yang dapat menimbulkan biaya pada akun provider KetemuTerus. Pengukuran hanya dijalankan jika kredensial provider telah dikonfigurasi.</span>
        </label>
        <button disabled={loading} type="submit" className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Mengukur 9 titik...</> : <><MapPinned className="h-4 w-4" /> Jalankan pengukuran ranking</>}
        </button>
      </form>
      {error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
      {result && (
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Pengukuran berhasil diterima dari {result.provider}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Titik ditemukan</span><strong className="text-xl text-slate-800">{result.summary.pointsFound}/9</strong></div>
            <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Rata-rata rank</span><strong className="text-xl text-slate-800">{result.summary.averageRank ?? "—"}</strong></div>
            <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Rank terbaik</span><strong className="text-xl text-slate-800">{result.summary.bestRank ?? "—"}</strong></div>
            <div className="rounded-xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Rank terendah</span><strong className="text-xl text-slate-800">{result.summary.worstRank ?? "—"}</strong></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {result.results.map(point => <div key={point.row + "-" + point.col} className={`rounded-xl border p-3 text-center ${point.rank !== null ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
              <span className="block text-[10px] text-slate-500">Titik {point.row}-{point.col}</span>
              <strong className="text-xl text-slate-800">{point.rank !== null ? `#${point.rank}` : "—"}</strong>
              <span className="block text-[10px] text-slate-500">{point.rank !== null ? "Ditemukan" : "Tidak di top 20"}</span>
            </div>)}
          </div>
          <p className="text-xs leading-relaxed text-slate-600">{result.disclaimer} {result.summary.notFoundMeans}</p>
          <p className="text-[11px] text-slate-400">Diukur: {new Date(result.measuredAt).toLocaleString("id-ID")}</p>
        </div>
      )}
    </section>
  );
}
