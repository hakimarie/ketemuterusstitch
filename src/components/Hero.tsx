import { MapPin, Search, MessageCircle, ArrowRight, Star, TrendingUp, CheckCircle2, ShieldCheck, Clock3 } from "lucide-react";

export default function Hero() {
  const openAudit = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.dispatchEvent(new Event("ketemuterus:open-audit")), 350);
  };
  return <section id="hero" className="relative min-w-0 overflow-hidden bg-[#F7F9FC] pb-12 pt-24 sm:pb-20 sm:pt-32 lg:pt-36">
    <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
    <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />
    <div className="relative mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
      <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span> Audit Gratis Untuk Bisnis Lokal</p>
        <h1 className="text-[clamp(2rem,8vw,2.5rem)] font-bold leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-[3.65rem]">Bikin Bisnismu Jadi <span className="text-blue-600">Pilihan Pertama</span> di Google Maps.</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg lg:mx-0">Dari profil berantakan jadi siap datengin pelanggan. Kami audit dan beresin profil, review, dan jalur kontak biar yang cari langsung klik Petunjuk Arah ke tempatmu.</p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <button id="hero-cta-audit" onClick={openAudit} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto sm:px-7 sm:text-base">Cek Skor Maps Bisnismu <ArrowRight className="h-4 w-4" /></button>
          <a href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20bertanya%20tentang%20Google%20Maps%20dan%20SEO%20lokal." target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50 sm:w-auto sm:px-7 sm:text-base"><MessageCircle className="h-4 w-4" /> Tanya via WhatsApp</a>
        </div>
        <p className="mt-3 text-xs text-gray-500">Gratis, tanpa perlu kartu kredit.</p><div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-gray-600 lg:justify-start"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Audit awal gratis</span><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Laporan transparan</span></div>
      </div>
      <div className="relative mx-auto w-full min-w-0 max-w-xl py-2 sm:py-8">
        <div className="pointer-events-none absolute -right-8 top-0 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-4 -left-8 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="relative space-y-4">
          <div className="min-w-0 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl shadow-slate-200/70 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><MapPin className="h-5 w-5" /></span><div><p className="text-sm font-bold text-gray-900">Skor Profil Maps</p><p className="mt-1 text-xs text-gray-500">Contoh area yang diaudit</p></div></div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Audit awal</span>
            </div>
            <div className="mt-6 space-y-4">{[{label:"Informasi bisnis",detail:"Nama, kategori, jam buka"},{label:"Profil dan foto",detail:"Kelengkapan dan konsistensi"},{label:"Jalur pelanggan",detail:"Telepon, website, petunjuk arah"}].map((item,i)=><div key={item.label}><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-gray-800">{item.label}</span><span className="text-xs text-gray-500">{i===0?"Identitas":i===1?"Kelengkapan":"Kontak"}</span></div><p className="mt-1 text-xs text-gray-500">{item.detail}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className={i===1?"h-full w-1/2 rounded-full bg-amber-400":"h-full w-4/5 rounded-full bg-blue-500"} /></div></div>)}</div>
            <p className="mt-4 text-[11px] text-gray-400">Ilustrasi tampilan, bukan hasil audit bisnis tertentu.</p>
          </div>
          <div className="min-w-0 rounded-3xl border border-gray-100 bg-white p-4 shadow-lg shadow-slate-200/60 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><TrendingUp className="h-5 w-5" /></span><div><p className="text-sm font-bold text-gray-900">Prioritas Perbaikan</p><p className="mt-1 text-xs text-gray-500">Langkah praktis yang bisa ditindaklanjuti</p></div></div>
            <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-gray-50 p-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><p className="mt-2 text-xs font-semibold text-gray-800">Profil lebih lengkap</p></div><div className="rounded-2xl bg-gray-50 p-3"><Clock3 className="h-4 w-4 text-blue-600" /><p className="mt-2 text-xs font-semibold text-gray-800">Langkah terukur</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}