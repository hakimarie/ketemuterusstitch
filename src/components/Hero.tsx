import { MapPin, Search, MessageCircle, ArrowRight, Star, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Hero() {
  const openAudit = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.dispatchEvent(new Event("ketemuterus:open-audit")), 350);
  };
  return <section id="hero" className="relative overflow-hidden bg-[#F7F9FC] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
    <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
    <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />
    <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
      <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 text-sm font-semibold text-blue-700 shadow-sm"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Google Maps & SEO Lokal</p>
        <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-[3.65rem]">Biar pelanggan <span className="text-blue-600">lebih gampang</span> menemukan bisnismu.</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg lg:mx-0">Kami bantu merapikan profil Google, informasi lokasi, dan website supaya calon pelanggan lebih mudah menemukan dan menghubungi bisnismu.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <button id="hero-cta-audit" onClick={openAudit} className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700">Cek Bisnismu <ArrowRight className="h-4 w-4" /></button>
          <a href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20bertanya%20tentang%20Google%20Maps%20dan%20SEO%20lokal." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50"><MessageCircle className="h-4 w-4" /> Tanya via WhatsApp</a>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-gray-500 lg:justify-start"><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Fokus bisnis lokal</span><span className="hidden h-4 w-px bg-gray-300 sm:block" /><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Langkah kerja transparan</span></div>
      </div>
      <div className="relative mx-auto w-full max-w-2xl pb-8 sm:pb-10">
        <div className="absolute -right-2 top-8 h-28 w-28 rounded-full border-[18px] border-blue-100/80 sm:-right-4 sm:h-36 sm:w-36" /><div className="absolute -bottom-1 left-2 h-24 w-24 rounded-full bg-amber-100/80 sm:left-5 sm:h-32 sm:w-32" />
        <div className="relative grid grid-cols-[1.05fr_0.95fr] items-center gap-3 sm:gap-4">
          <div className="relative z-10 overflow-hidden rounded-[1.7rem] border-4 border-white bg-white shadow-2xl shadow-slate-300/50 transition duration-500 hover:-translate-y-1">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85" alt="Suasana cafe lokal yang nyaman" className="h-64 w-full object-cover sm:h-80 lg:h-[390px]" fetchPriority="high" />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-lg backdrop-blur sm:inset-x-4 sm:bottom-4 sm:p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600 sm:text-xs">Bisnis lokal</p><p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">Pengalaman pelanggan dimulai dari pencarian.</p></div>
          </div>
          <div className="relative z-10 -ml-2 space-y-3 sm:-ml-4 sm:space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white bg-white p-3 shadow-xl shadow-slate-300/40 sm:rounded-3xl sm:p-4"><div className="mb-3 flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><MapPin className="h-5 w-5" /></span><div><p className="text-xs font-bold text-gray-900 sm:text-sm">Profil Bisnis</p><p className="text-[10px] text-gray-500 sm:text-xs">Contoh tampilan</p></div></div>
              <div className="rounded-xl bg-[#F2F6FC] p-3 sm:p-4"><div className="flex items-center gap-1.5 text-[10px] text-gray-500 sm:text-xs"><Search className="h-3.5 w-3.5" /> Nama bisnis Anda</div><div className="mt-3 flex items-center gap-2"><div className="h-9 w-9 rounded-lg bg-blue-100" /><div className="min-w-0 flex-1"><div className="h-2 w-4/5 rounded bg-gray-300" /><div className="mt-2 h-2 w-3/5 rounded bg-gray-200" /></div></div><div className="mt-3 flex gap-1.5"><span className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold text-blue-700 sm:text-[10px]">Petunjuk arah</span><span className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold text-blue-700 sm:text-[10px]">Jam buka</span></div></div><p className="mt-2 text-[9px] leading-4 text-gray-400 sm:text-[10px]">Mockup ilustratif, bukan screenshot Google.</p></div>
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-slate-300/40 sm:rounded-3xl sm:p-4"><div className="flex items-center justify-between gap-2"><div><p className="text-xs font-bold text-gray-900 sm:text-sm">Pemeriksaan awal</p><p className="mt-1 text-[10px] text-gray-500 sm:text-xs">Contoh area yang ditinjau</p></div><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><TrendingUp className="h-5 w-5" /></span></div><div className="mt-3 space-y-2.5">{["Informasi bisnis", "Kelengkapan profil", "Jalur kontak"].map((label, i) => <div key={label} className="flex items-center gap-2"><span className={i === 1 ? "h-2 w-2 rounded-full bg-amber-400" : "h-2 w-2 rounded-full bg-emerald-500"} /><span className="flex-1 text-[10px] text-gray-600 sm:text-xs">{label}</span><span className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-100 sm:w-16"><span className={i === 1 ? "block h-full w-1/2 rounded-full bg-amber-400" : "block h-full w-4/5 rounded-full bg-emerald-500"} /></span></div>)}</div></div>
            <div className="hidden items-center gap-2 rounded-2xl border border-white bg-white/95 px-3 py-2.5 text-xs font-semibold text-gray-700 shadow-lg sm:flex"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Informasi jelas, pelanggan lebih yakin</div>
          </div>
        </div><p className="relative mt-4 text-center text-[10px] text-gray-400">Foto ilustrasi bisnis lokal · Panel UI merupakan mockup konsep.</p>
      </div>
    </div>
  </section>;
}