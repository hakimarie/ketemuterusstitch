import React, { useState } from "react";
import { Search, MapPin, Sparkles, CheckCircle2, ArrowRight, MessageCircle, RefreshCw, Trophy, Target, Zap, Compass, AlertCircle, ClipboardCheck, PhoneCall, TrendingUp } from "lucide-react";
import { AuditReport } from "../types";

export default function AIAuditor() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [mapsProfileUrl, setMapsProfileUrl] = useState("");
  const [observedRating, setObservedRating] = useState("");
  const [observedReviewCount, setObservedReviewCount] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [recentReviews30d, setRecentReviews30d] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [showForm, setShowForm] = useState(false);

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

  const loadingMessages = ["Menyusun rekomendasi dari informasi yang Anda berikan..."];

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
        body: JSON.stringify({
          businessName: cleanBusinessName, category, location: cleanLocation,
          mapsProfileUrl: mapsProfileUrl.trim(),
          observedRating: observedRating === "" ? null : Number(observedRating),
          observedReviewCount: observedReviewCount === "" ? null : Number(observedReviewCount),
          websiteUrl: websiteUrl.trim(),
          recentReviews30d: recentReviews30d === "" ? null : Number(recentReviews30d),
        })
      });
      const responseText = await response.text();
      let payload: unknown = null;
      try {
        payload = responseText ? JSON.parse(responseText) : null;
      } catch {
        // A deployment/proxy error may return HTML or an empty body instead of the API's JSON contract.
      }

      if (!response.ok) {
        const apiError =
          typeof payload === "object" && payload !== null &&
          "error" in payload && typeof payload.error === "string"
            ? payload.error
            : null;
        if (apiError) throw new Error(apiError);

        const contentType = response.headers.get("content-type") || "unknown";
        throw new Error(
          `Endpoint audit gagal (HTTP ${response.status}; respons ${contentType}). Periksa deployment fungsi /api/audit lalu coba lagi.`
        );
      }
      if (!payload || typeof payload !== "object") {
        throw new Error("Layanan audit mengirim respons yang tidak valid. Periksa log fungsi /api/audit.");
      }
      const data = payload as AuditReport;
      setReport(data);
      setShowForm(false);
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

  const getWhatsAppMessage = (intent: "consultation" | "roadmap" = "consultation") => {
    if (!report) return "";
    const priorityCount = report.diagnoses.filter((item) => item.severity === "high").length;
    const text = `Halo KetemuTerus, saya ingin ${intent === "roadmap" ? "meminta roadmap optimasi 30 hari" : "berkonsultasi tentang hasil audit"} untuk bisnis saya.
Nama Bisnis: ${report.businessName}
Kategori: ${report.category}
Lokasi: ${report.location}
Estimasi AI (bukan hasil pengukuran): ${report.overallScore}/100
Diagnosis prioritas tinggi: ${priorityCount}

Mohon bantu jelaskan langkah yang paling berdampak dan opsi pendampingan yang sesuai. Saya memahami hasil ini merupakan estimasi AI yang perlu diverifikasi.`;
    return encodeURIComponent(text);
  };

  return (
    <section id="ai-auditor" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            AI Visibility Auditor
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Cek kondisi bisnis Anda di Google
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Jawab beberapa pertanyaan singkat untuk mendapatkan rekomendasi awal. Sistem ini tidak memeriksa profil Google Maps atau website secara langsung, jadi hasilnya perlu dicocokkan dengan kondisi bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Audit entry point */}
          {!showForm && !report && (
            <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-7 text-left shadow-sm">
              <h3 className="font-display text-xl font-semibold text-slate-900">Mulai dari informasi dasar</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Cukup masukkan nama bisnis, kategori, dan lokasi. Anda bisa menambahkan informasi lain jika tersedia.</p>
              <button type="button" onClick={() => setShowForm(true)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Mulai Audit Gratis <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-xs leading-5 text-slate-500">Hasil berupa rekomendasi awal, bukan pengukuran resmi posisi Google.</p>
            </div>
          )}

          {/* Form appears only after the visitor chooses to start */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="audit-form-title" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
              <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 id="audit-form-title" className="font-display text-xl font-semibold text-slate-900">Cek kondisi bisnis Anda</h3>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Tutup formulir audit" className="rounded-lg px-3 py-2 text-xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-900">×</button>
            </div>
            
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

              <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer text-sm font-bold text-slate-700">Tambahkan bukti manual (opsional)</summary>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">Salin data yang kamu lihat sendiri di Google Maps. Sistem tidak membuka atau memverifikasi tautan ini. Jangan masukkan informasi sensitif.</p>
                <div className="mt-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Tautan profil Google Maps</label>
                    <input type="url" maxLength={500} value={mapsProfileUrl} onChange={e=>setMapsProfileUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Rating yang terlihat (0–5)</label>
                      <input type="number" min="0" max="5" step="0.1" value={observedRating} onChange={e=>setObservedRating(e.target.value)} placeholder="4.7" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Jumlah ulasan</label>
                      <input type="number" min="0" max="100000000" step="1" value={observedReviewCount} onChange={e=>setObservedReviewCount(e.target.value)} placeholder="125" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Website bisnis (jika ada)</label>
                    <input type="url" maxLength={500} value={websiteUrl} onChange={e=>setWebsiteUrl(e.target.value)} placeholder="https://bisnisanda.id" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Ulasan baru dalam 30 hari terakhir (opsional)</label>
                    <input type="number" min="0" max="1000000" step="1" value={recentReviews30d} onChange={e=>setRecentReviews30d(e.target.value)} placeholder="Misalnya 8" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:border-blue-500" />
                  </div>
                </div>
              </details>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Menyusun rekomendasi...</span>
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
              <div role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
                <a
                  href={`https://wa.me/6281584229797?text=${encodeURIComponent(`Halo KetemuTerus, layanan audit otomatis sedang tidak tersedia. Saya ingin meminta audit manual dalam 1 hari kerja. Nama bisnis: ${businessName.trim() || "[isi nama bisnis]"}. Lokasi: ${location.trim() || "[isi lokasi]"}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 font-bold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Minta Audit Manual via WhatsApp
                </a>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Hasil merupakan analisis awal berbasis AI, bukan pemeriksaan langsung atau verifikasi resmi Google. Hindari memasukkan data sensitif.
              </p>
            </div>
              </div>
            </div>
          )}

          {/* Right Panel: Audit Report Result Dashboard */}
          <div className="lg:col-span-8">
            
            {loading && (
              <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-brand-primary mb-8 animate-pulse-subtle">
                  <Sparkles className="w-10 h-10 animate-spin-slow text-brand-primary" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2 font-display">Menyiapkan rekomendasi...</h4>
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
              <div className="bg-white border border-dashed border-slate-200 rounded-xl p-10 text-center min-h-[360px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-6">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-700 font-display">Siap membantu mengecek bisnis Anda</h4>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                  Mulai audit untuk melihat ringkasan kondisi bisnis dan beberapa langkah awal yang bisa ditinjau.
                </p>
              </div>
            )}

            {!loading && report && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-7 animate-in fade-in duration-300">
                
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
                  <div className="md:col-span-3 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-blue-800">
                          <ClipboardCheck className="h-5 w-5" />
                          <h4 className="font-bold text-base">Ringkasan untuk pengambilan keputusan</h4>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">Mulai dari prioritas yang paling penting. Skor ini adalah estimasi AI, bukan pengukuran posisi Google atau jaminan hasil bisnis.</p>
                      </div>
                      <a href={`https://wa.me/6281584229797?text=${getWhatsAppMessage("consultation")}`} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700">
                        <MessageCircle className="h-4 w-4" /> Bahas hasil audit <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-white bg-white/90 p-4">
                        <span className="block text-xs font-medium text-slate-500">Estimasi visibilitas</span>
                        <strong className="mt-1 block text-2xl font-extrabold text-slate-900">{report.overallScore}<span className="text-sm font-semibold text-slate-400">/100</span></strong>
                        <span className="mt-1 block text-[11px] text-slate-500">Skor indikatif AI</span>
                      </div>
                      <div className="rounded-xl border border-white bg-white/90 p-4">
                        <span className="block text-xs font-medium text-slate-500">Prioritas tinggi</span>
                        <strong className="mt-1 block text-2xl font-extrabold text-rose-600">{report.diagnoses.filter((item) => item.severity === "high").length}</strong>
                        <span className="mt-1 block text-[11px] text-slate-500">Diagnosis yang perlu ditinjau</span>
                      </div>
                      <div className="rounded-xl border border-white bg-white/90 p-4">
                        <span className="block text-xs font-medium text-slate-500">Langkah awal</span>
                        <strong className="mt-1 block text-2xl font-extrabold text-slate-900">{report.quickWins.length}</strong>
                        <span className="mt-1 block text-[11px] text-slate-500">Rekomendasi quick wins</span>
                      </div>
                    </div>
                  </div>
                </div>

                {report.submittedEvidence && (report.submittedEvidence.mapsProfileUrl || report.submittedEvidence.observedRating !== null || report.submittedEvidence.observedReviewCount !== null || report.submittedEvidence.websiteUrl || report.submittedEvidence.recentReviews30d !== null) && (
                  <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5 text-left space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-800">Bukti yang dimasukkan pengguna</h4>
                      <span className="rounded-full border border-violet-200 bg-white px-2.5 py-1 text-[11px] font-bold text-violet-700">Belum diverifikasi otomatis</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">Diagnosis di bawah menggunakan informasi yang kamu masukkan sebagai konteks, bukan data yang diambil langsung dari Google. Cocokkan lagi dengan profil aktual.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Rating input</span><strong className="text-lg text-slate-800">{report.submittedEvidence.observedRating ?? "—"}{report.submittedEvidence.observedRating !== null ? "/5" : ""}</strong></div>
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Jumlah ulasan input</span><strong className="text-lg text-slate-800">{report.submittedEvidence.observedReviewCount ?? "—"}</strong></div>
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Ulasan 30 hari</span><strong className="text-lg text-slate-800">{report.submittedEvidence.recentReviews30d ?? "—"}</strong></div>
                      <div className="rounded-xl bg-white p-3"><span className="block text-[11px] text-slate-500">Website input</span><strong className="text-sm text-slate-800">{report.submittedEvidence.websiteUrl ? "Dimasukkan" : "Belum diisi"}</strong></div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs font-bold">
                      {report.submittedEvidence.mapsProfileUrl && <a href={report.submittedEvidence.mapsProfileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Buka tautan Maps yang dimasukkan</a>}
                      {report.submittedEvidence.websiteUrl && <a href={report.submittedEvidence.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Buka website yang dimasukkan</a>}
                    </div>
                  </div>
                )}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
                  <h4 className="text-sm font-bold text-amber-900">Data Google Maps belum diverifikasi otomatis</h4>
                  <p className="mt-1 text-xs leading-relaxed text-amber-800">Untuk menghindari billing Google Maps API, sistem tidak mengambil data profil secara otomatis. Tautan dan angka yang dimasukkan di formulir hanya menjadi bukti yang dilaporkan pengguna, bukan verifikasi independen. Buka profil Maps dan periksa kembali sebelum mengambil keputusan.</p>
                </div>
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

                {/* Evidence-grounded diagnoses */}
                <div className="space-y-4 text-left">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Diagnosis berbasis bukti</h4>
                    <p className="mt-1 text-xs text-slate-500">Pisahkan input, hipotesis, dan langkah verifikasi. Tingkat keyakinan dibatasi karena data belum diverifikasi otomatis.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {report.diagnoses.map((diagnosis, idx) => (
                      <article key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-slate-800">{diagnosis.title}</h5>
                          <div className="flex flex-wrap gap-1.5">
                            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${diagnosis.evidenceStatus === "input_available" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                              {diagnosis.evidenceStatus === "input_available" ? "Ada input pengguna" : "Bukti belum tersedia"}
                            </span>
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                              Keyakinan {diagnosis.confidence === "medium" ? "menengah" : "rendah"}
                            </span>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${diagnosis.severity === "high" ? "bg-rose-50 text-rose-700" : diagnosis.severity === "medium" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                              Prioritas {diagnosis.severity === "high" ? "tinggi" : diagnosis.severity === "medium" ? "sedang" : "rendah"}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Interpretasi saat ini</p>
                          <p className="text-xs leading-relaxed text-slate-600">{diagnosis.finding}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Rekomendasi</p>
                          <p className="text-xs leading-relaxed text-slate-700">{diagnosis.recommendation}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3 space-y-1">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Cara verifikasi</p>
                          <p className="text-xs leading-relaxed text-slate-600">{diagnosis.validationStep}</p>
                        </div>
                      </article>
                    ))}
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

                {/* Lead conversion: explicit next steps, with audit context prefilled */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 text-left text-slate-900">
                  <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary">Langkah berikutnya</p>
                    <h4 className="mt-2 text-xl sm:text-2xl font-extrabold">Ubah temuan audit menjadi rencana aksi.</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">Kalau ingin membahas hasilnya, kirim ringkasan audit ini lewat WhatsApp agar percakapan bisa langsung fokus pada kebutuhan bisnis Anda.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      id="audit-whatsapp-cta"
                      data-cta-intent="consultation"
                      href={`https://wa.me/6281584229797?text=${getWhatsAppMessage("consultation")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-lg bg-emerald-600 p-4 text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    >
                      <span className="flex items-center gap-2 text-sm font-extrabold"><PhoneCall className="h-5 w-5" /> Konsultasi hasil audit</span>
                      <span className="mt-2 block text-xs leading-relaxed text-emerald-50">Diskusikan masalah utama dan opsi optimasi yang cocok untuk bisnis Anda.</span>
                      <span className="mt-4 flex items-center gap-2 text-xs font-bold">Mulai chat WhatsApp <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </a>
                    <a
                      id="audit-roadmap-cta"
                      data-cta-intent="roadmap"
                      href={`https://wa.me/6281584229797?text=${getWhatsAppMessage("roadmap")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-lg border border-slate-300 bg-white p-4 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <span className="flex items-center gap-2 text-sm font-extrabold"><TrendingUp className="h-5 w-5" /> Minta roadmap 30 hari</span>
                      <span className="mt-2 block text-xs leading-relaxed text-slate-600">Minta urutan langkah awal untuk mulai membenahi visibilitas lokal.</span>
                      <span className="mt-4 flex items-center gap-2 text-xs font-bold">Minta rekomendasi <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </a>
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-slate-500">WhatsApp hanya terbuka jika Anda memilih tombol di atas.</p>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
