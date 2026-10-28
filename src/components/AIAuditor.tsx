import React, { useState } from "react";
import { Search, MapPin, Sparkles, CheckCircle2, ArrowRight, MessageCircle, RefreshCw, Trophy, Target, Zap, Compass, AlertCircle } from "lucide-react";
import { AuditReport } from "../types";
import LocalRankMeasurement from "./LocalRankMeasurement";

export default function AIAuditor() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);

  const categories = [
    "Cafe / Kedai Kopi",
    "Restoran",
    "Salon Kecantikan",
    "Klinik Medis / Gigi",
    "Gym / Pusat Kebugaran",
    "Laundry / Binatu",
    "Bengkel Otomotif",
    "Hotel / Penginapan",
    "UMKM / Toko Retail"
  ];

  const loadingMessages = ["Mengirim data bisnis ke layanan analisis AI..."];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBusinessName = businessName.trim();
    const cleanLocation = location.trim();
    if (!cleanBusinessName || !category || !cleanLocation) {
      setError("Silakan isi semua kolom input.");
      return;
    }
    if (cleanBusinessName.length > 120 || cleanLocation.length > 120) {
      setError("Nama bisnis dan lokasi maksimal 120 karakter.");
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStep(0);
    setReport(null);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName: cleanBusinessName, category, location: cleanLocation })
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Audit belum berhasil diproses. Silakan coba lagi.");
      }
      const data: AuditReport = await response.json();
      setReport(data);
    } catch (err: unknown) {
      console.error("Audit request failed:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menjalankan audit. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 stroke-emerald-500 bg-emerald-50 border-emerald-100";
    if (score >= 60) return "text-amber-500 stroke-amber-500 bg-amber-50 border-amber-100";
    return "text-rose-500 stroke-rose-500 bg-rose-50 border-rose-100";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Optimal":
        return <span className="text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">🟢 {status}</span>;
      case "Perlu Optimalisasi":
        return <span className="text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">🟡 {status}</span>;
      default:
        return <span className="text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-1 rounded-full flex items-center gap-1">🔴 {status}</span>;
    }
  };

  const getWhatsAppMessage = () => {
    if (!report) return "";
    const text = `Halo KetemuTerus, saya baru saja melakukan audit visibilitas online untuk bisnis saya:
Nama Bisnis: ${report.businessName}
Kategori: ${report.category}
Lokasi: ${report.location}
Estimasi AI (bukan hasil pengukuran): ${report.overallScore}/100

Saya ingin berkonsultasi mengenai hasil audit ini dan bagaimana cara meningkatkannya agar lebih banyak pelanggan baru berdatangan.`;
    return encodeURIComponent(text);
  };

  return (
    <section id="ai-auditor" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative vector */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-blue-50/50 blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            AI Visibility Auditor
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Audit Visibilitas Online Bisnis Anda Secara <span className="text-brand-primary">Gratis</span>
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Dapatkan evaluasi awal dan rekomendasi optimasi lokal berbasis AI dari informasi bisnis yang Anda masukkan. Data Google Maps, ulasan, dan website tidak diperiksa secara langsung oleh fitur ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Form Input */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-8 shadow-xl">
            <h3 className="font-display font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-accent fill-current" />
              Mulai Audit Instan
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Nama Bisnis Lokal</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Contoh: Kopi Senja, Klinik Gigiku"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Kategori Bisnis</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 px-4 text-sm text-slate-700 transition-all outline-none appearance-none"
                >
                  <option value="" disabled>Pilih kategori utama...</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Lokasi / Kota</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Contoh: Jakarta Selatan, Bandung"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-500/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Memproses Audit AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 fill-current" />
                    <span>Mulai Audit Visibilitas</span>
                  </>
                )}
              </button>
            </form>
            {error && (
              <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Hasil merupakan analisis awal berbasis AI, bukan pemeriksaan langsung atau verifikasi resmi Google. Hindari memasukkan data sensitif.
              </p>
            </div>
          </div>

          {/* Right Panel: Audit Report Result Dashboard */}
          <div className="lg:col-span-8">
            
            {loading && (
              <div className="bg-white border border-slate-100 rounded-3xl p-16 shadow-xl flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-brand-primary mb-8 animate-pulse-subtle">
                  <Sparkles className="w-10 h-10 animate-spin-slow text-brand-primary" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2 font-display">AI Sedang Bekerja...</h4>
                <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-brand-primary rounded-full transition-all duration-500"
                    style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-brand-primary font-mono animate-pulse">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
            )}

            {!loading && !report && (
              <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center min-h-[500px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-6">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-700 font-display">Menunggu Input Bisnis Anda</h4>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                  Isi formulir di samping kiri dengan lengkap dan jalankan audit untuk melihat skor visibilitas online bisnis Anda beserta strategi peningkatannya.
                </p>
              </div>
            )}

            {!loading && report && (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
                
                {/* Result Header Grid */}
                <div className="flex flex-col sm:flex-row items-center gap-8 pb-6 border-b border-slate-100">
                  {/* Radial Progress Score */}
                  <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="54" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        fill="transparent"
                        stroke={report.overallScore >= 80 ? "#10b981" : report.overallScore >= 60 ? "#f59e0b" : "#f43f5e"}
                        strokeWidth="10"
                        strokeDasharray={339.29}
                        strokeDashoffset={339.29 - (339.29 * report.overallScore) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-slate-800 tracking-tight font-display">
                        {report.overallScore}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider -mt-1">
                        Estimasi AI (bukan pengukuran)
                      </span>
                    </div>
                  </div>

                  <div className="text-left flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-2xl font-bold text-slate-800 font-display">{report.businessName}</h4>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                        {report.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{report.location}, Indonesia</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed font-sans">
                      Evaluasi awal berbasis AI; temuan perlu diverifikasi dengan data bisnis aktual.
                    </p>
                  </div>
                </div>

                {report.publicData && (
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 text-left space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-800">Data publik Google Maps</h4>
                      <span className="rounded-full border border-sky-200 bg-white px-2.5 py-1 text-[11px] font-bold text-sky-700">Profil cocok</span>
                    </div>
                    <p className="text-xs text-slate-600">Data berikut berasal dari Google Places API. Ini bukan data performa pemilik dan bukan pengukuran ranking.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Rating publik</span><strong className="text-lg text-slate-800">{report.publicData.rating ?? "Tidak tersedia"}{report.publicData.rating !== null ? "/5" : ""}</strong></div>
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Jumlah ulasan</span><strong className="text-lg text-slate-800">{report.publicData.reviewCount ?? "Tidak tersedia"}</strong></div>
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Status bisnis</span><strong className="text-sm text-slate-800">{report.publicData.businessStatus ?? "Tidak tersedia"}</strong></div>
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Website</span><strong className="text-sm text-slate-800">{report.publicData.website ? "Tercantum" : "Tidak tercantum di data ini"}</strong></div>
                    </div>
                    <p className="text-xs text-slate-600">{report.publicData.address ?? "Alamat tidak tersedia dari sumber ini."}</p>
                    {report.publicData.googleMapsUrl && <a className="text-xs font-bold text-blue-700 underline" href={report.publicData.googleMapsUrl} target="_blank" rel="noopener noreferrer">Buka profil di Google Maps</a>}
                  </div>
                )}
                {!report.publicData && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
                    <h4 className="text-sm font-bold text-amber-900">Data publik belum terverifikasi</h4>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800">
                      {report.placesLookupStatus === "not_configured"
                        ? "Integrasi Google Places belum dikonfigurasi. Laporan saat ini hanya estimasi AI."
                        : report.placesLookupStatus === "ambiguous_match"
                          ? "Ada lebih dari satu kemungkinan profil dengan nama/lokasi serupa. Data tidak dipakai agar profil yang salah tidak terpilih."
                          : report.placesLookupStatus === "configuration_error"
                            ? "Google Places menolak permintaan. Periksa konfigurasi API key, izin API, dan billing."
                            : report.placesLookupStatus === "provider_error"
                              ? "Sumber Google Places sedang gagal diakses. Tidak ada data publik yang diasumsikan."
                              : "Profil belum berhasil dicocokkan dengan yakin. Ini tidak berarti bisnis tidak ada."}
                    </p>
                  </div>
                )}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left space-y-2">
                  <div className="flex items-center gap-2"><Target className="h-4 w-4 text-slate-500" /><h4 className="text-sm font-bold text-slate-800">Pengukuran ranking lokal</h4></div>
                  <p className="text-xs leading-relaxed text-slate-600">{report.rankingMeasurement?.message ?? "Ranking lokal belum diukur. Skor pada laporan ini adalah estimasi AI, bukan posisi hasil Google Maps."}</p>
                  <p className="text-[11px] text-slate-500">Data pemilik Google Business Profile dan Search Console: {report.ownerDataStatus === "not_connected" ? "belum terhubung" : "belum diverifikasi"}.</p>
                </div>

                {/* Search & Maps Diagnosis Panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-brand-primary" /> Panduan Evaluasi Google Maps
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {report.statusGoogleMaps}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-brand-secondary" /> Panduan Evaluasi Google Search
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {report.statusGoogleSearch}
                    </p>
                  </div>
                </div>

                {/* Metrics Table / Grid */}
                <div className="space-y-4 text-left">
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Performa Indikator Utama</h4>
                  <div className="space-y-3.5">
                    {report.auditMetrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 md:max-w-xl">
                          <div className="flex items-center gap-2.5">
                            <h5 className="font-semibold text-slate-800 text-sm font-display">{metric.name}</h5>
                            {getStatusBadge(metric.status)}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-sans">
                            {metric.details}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                          {/* Mini visual indicator */}
                          <div className="text-right">
                            <span className="block font-mono text-sm font-extrabold text-slate-700">
                              {metric.score}/100
                            </span>
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                              <div
                                className={`h-full rounded-full ${
                                  metric.score >= 80 ? "bg-emerald-500" : metric.score >= 60 ? "bg-amber-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${metric.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Wins Accordion/Checklist */}
                <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 text-left space-y-4">
                  <h4 className="text-sm font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-4.5 h-4.5 text-brand-accent fill-current" />
                    Langkah Perbaikan Cepat (Quick Wins)
                  </h4>
                  <ul className="space-y-3">
                    {report.quickWins.map((win, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-sans">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-secondary fill-current text-white flex-shrink-0 mt-0.5" />
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strategic Advice */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-slate-500" />
                    Rekomendasi Ahli KetemuTerus
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
                    "{report.strategicAdvice}"
                  </p>
                </div>

                {/* Interactive Conversion WhatsApp CTA (Required by prompt) */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-slate-100">
                  <div className="text-left space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Langkah Selanjutnya</p>
                    <p className="text-sm font-bold text-slate-800">Mari bantu kami perbaiki & optimalkan bisnis Anda!</p>
                  </div>
                  
                  <a
                    id="audit-whatsapp-cta"
                    href={`https://wa.me/6281584229797?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-brand-secondary text-white font-bold px-6 py-3.5 rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/10 hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    Diskusikan Hasil di WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-16 relative z-10"><LocalRankMeasurement /></div>
    </section>
  );
}
