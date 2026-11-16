import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, BarChart3, Bot, CheckCircle2, CircleDollarSign,
  Facebook, Gauge, GitBranch, LineChart, Mail, Megaphone, MessageCircle,
  MousePointerClick, Search, Settings2, ShieldCheck, Smartphone, Sparkles,
  Target, Workflow, Menu, X, Zap
} from "lucide-react";

type Item = { icon: typeof Megaphone; title: string; description: string };
type PageConfig = {
  eyebrow: string; title: string; intro: string; focus: string;
  benefits: Item[]; scope: Item[]; steps: [string,string,string][];
  audiences: string[]; faqs: [string,string][]; related: {href:string;label:string;description:string};
  ctaTitle: string; ctaText: string; waMessage: string;
};

const advertising: PageConfig = {
  eyebrow: "DIGITAL ADVERTISING",
  title: "Jasa Google Ads & Meta Ads untuk Menjangkau Pelanggan yang Tepat",
  intro: "KetemuTerus membantu UMKM dan bisnis lokal merencanakan, menjalankan, serta mengoptimalkan iklan digital. Strategi dimulai dari tujuan bisnis, target pelanggan, kesiapan aset, dan kemampuan anggaran—bukan sekadar mengejar klik atau tayangan.",
  focus: "Iklan digital harus terhubung dengan tujuan bisnis dan pengukuran yang masuk akal.",
  benefits: [
    {icon:Target,title:"Tujuan kampanye jelas",description:"Tentukan apakah prioritasnya menjangkau pencari aktif, memperkenalkan penawaran, menghasilkan leads, atau mendorong tindakan lokal."},
    {icon:CircleDollarSign,title:"Anggaran lebih terarah",description:"Alokasi media dan biaya pengelolaan dibedakan agar pemilik bisnis memahami penggunaan anggaran."},
    {icon:LineChart,title:"Optimasi berbasis data",description:"Evaluasi performa berdasarkan metrik yang relevan, kualitas leads, dan sinyal konversi yang tersedia."},
    {icon:ShieldCheck,title:"Ekspektasi transparan",description:"Tidak menjanjikan omzet atau hasil tertentu. Risiko, asumsi, dan keterbatasan pengukuran dibahas sejak awal."}
  ],
  scope: [
    {icon:Search,title:"Google Ads Search",description:"Menjangkau orang yang sedang mencari produk atau layanan melalui kata kunci dan intent pencarian yang relevan."},
    {icon:Sparkles,title:"Performance Max",description:"Kampanye Google Ads berbasis tujuan yang dapat memanfaatkan berbagai inventori Google sesuai aset, sinyal, dan kelayakan akun."},
    {icon:Megaphone,title:"Meta Ads",description:"Kampanye Facebook dan Instagram untuk awareness, engagement, traffic, leads, atau tujuan lain yang sesuai."},
    {icon:Gauge,title:"Campaign optimization",description:"Pemantauan search terms, materi iklan, targeting, bidding, budget pacing, dan kualitas hasil sesuai ruang lingkup."},
    {icon:MousePointerClick,title:"Landing page & conversion",description:"Pemeriksaan kesesuaian pesan iklan dengan halaman tujuan, CTA, formulir, dan jalur kontak pelanggan."},
    {icon:BarChart3,title:"Tracking & reporting",description:"Penyiapan atau evaluasi event, conversion tracking, UTM, dan laporan agar keputusan tidak hanya bergantung pada metrik platform."}
  ],
  steps: [
    ["01","Pahami target bisnis","Diskusikan produk, area layanan, pelanggan, margin, kapasitas operasional, dan hasil yang ingin dicapai."],
    ["02","Audit kesiapan kampanye","Tinjau akun iklan, aset kreatif, landing page, tracking, kompetisi, serta anggaran yang tersedia."],
    ["03","Rancang dan jalankan","Pilih kanal, objective, struktur kampanye, pesan, dan pengukuran sesuai strategi yang disepakati."],
    ["04","Evaluasi dan optimasi","Analisis data secara berkala, dokumentasikan perubahan, dan susun prioritas optimasi berikutnya."]
  ],
  audiences:["Restoran, coffee shop, dan bisnis F&B","Retail dan toko lokal","Barbershop, salon, dan jasa lokal","Bisnis yang ingin menguji penawaran atau area baru"],
  faqs:[
    ["Apakah KetemuTerus mengelola Google Ads dan Meta Ads?","Ya. Ruang lingkup dapat mencakup perencanaan, setup, pengelolaan, optimasi, dan pelaporan kampanye sesuai kebutuhan bisnis."],
    ["Apakah Performance Max merupakan layanan terpisah?","Tidak. Performance Max adalah jenis kampanye di dalam Google Ads. Pemilihannya bergantung pada tujuan, aset, data, dan kelayakan akun."],
    ["Apakah bisnis harus memiliki website?","Tidak selalu. Opsi tujuan kampanye dapat dievaluasi berdasarkan kebutuhan dan kebijakan platform. Website atau landing page dapat membantu ketika dibutuhkan informasi lebih lengkap dan jalur konversi yang terukur."],
    ["Apakah biaya iklan termasuk biaya jasa?","Tidak. Biaya media dibayarkan ke platform dan terpisah dari biaya jasa pengelolaan. Keduanya dijelaskan sebelum kampanye berjalan."],
    ["Apakah KetemuTerus menjamin penjualan atau ROAS?","Tidak. Hasil dipengaruhi penawaran, harga, persaingan, pengalaman pelanggan, anggaran, kualitas aset, dan faktor lain. Kami berfokus pada proses yang transparan dan evaluasi berbasis data."],
    ["Berapa budget minimal untuk mulai beriklan?","Tidak ada angka yang tepat untuk semua bisnis. Anggaran dibahas berdasarkan area target, persaingan, nilai transaksi, kapasitas, dan periode pengujian."]
  ],
  related:{href:"/layanan/website-umkm/",label:"Website & Conversion",description:"Landing page dan website dapat menjadi tujuan kampanye sekaligus membantu pelanggan memahami penawaran."},
  ctaTitle:"Siapkan kampanye yang punya arah dan ukuran keberhasilan.",
  ctaText:"Diskusikan tujuan, kanal iklan, kesiapan aset, dan anggaran bisnis Anda bersama KetemuTerus.",
  waMessage:"Halo KetemuTerus, saya ingin konsultasi Google Ads atau Meta Ads untuk bisnis saya."
};

const growth: PageConfig = {
  eyebrow:"GROWTH & AUTOMATION",
  title:"Strategi Growth dan AI Automation untuk Operasional Bisnis yang Lebih Efisien",
  intro:"KetemuTerus membantu bisnis lokal merapikan aktivitas pemasaran dan alur kerja melalui strategi pertumbuhan, pengelolaan leads, otomasi proses, dan pemanfaatan AI secara terukur. Teknologi dipilih untuk menyelesaikan hambatan nyata—bukan sekadar mengikuti tren.",
  focus:"Pertumbuhan yang sehat membutuhkan proses yang konsisten, data yang berguna, dan pekerjaan berulang yang lebih efisien.",
  benefits:[
    {icon:Workflow,title:"Proses lebih rapi",description:"Petakan perjalanan pelanggan dan alur kerja agar aktivitas penting tidak tercecer di banyak kanal."},
    {icon:Zap,title:"Kurangi pekerjaan berulang",description:"Identifikasi tugas rutin yang layak diotomasi tanpa menghilangkan kontrol manusia pada keputusan penting."},
    {icon:Target,title:"Follow-up lebih konsisten",description:"Bantu tim mengelola pertanyaan, prospek, dan tindak lanjut berdasarkan prioritas yang jelas."},
    {icon:ShieldCheck,title:"Kontrol tetap di tangan bisnis",description:"Akses, persetujuan, privasi data, dan batas otomasi dirancang sesuai kebutuhan operasional."}
  ],
  scope:[
    {icon:Sparkles,title:"AI workflow & automation",description:"Rancang alur berbantuan AI untuk merangkum informasi, mengelompokkan permintaan, menyiapkan draft, dan mendukung pekerjaan rutin."},
    {icon:GitBranch,title:"Lead management",description:"Susun alur pencatatan, klasifikasi, distribusi, dan tindak lanjut prospek dari kanal pemasaran."},
    {icon:MessageCircle,title:"Customer communication",description:"Bantu menata respons awal, template komunikasi, dan pengalihan ke staf ketika membutuhkan penanganan manusia."},
    {icon:Star,title:"Review management",description:"Bangun proses permintaan ulasan yang etis, pemantauan masukan, dan respons yang konsisten tanpa ulasan palsu."},
    {icon:Smartphone,title:"Social media operations",description:"Perencanaan konten, kalender publikasi, alur persetujuan, dan pengelolaan aktivitas media sosial."},
    {icon:BarChart3,title:"Growth strategy & analytics",description:"Tentukan prioritas eksperimen dan indikator kinerja dari visibilitas, leads, konversi, hingga retensi."}
  ],
  steps:[
    ["01","Petakan proses saat ini","Pahami bagaimana leads masuk, siapa yang menangani, tools yang digunakan, dan titik proses yang sering terhambat."],
    ["02","Pilih peluang berdampak","Prioritaskan otomasi berdasarkan frekuensi, waktu yang dihemat, risiko kesalahan, dan kemudahan implementasi."],
    ["03","Rancang dan uji workflow","Buat alur, aturan, integrasi, dan titik persetujuan. Uji dengan skenario nyata sebelum digunakan lebih luas."],
    ["04","Pantau dan perbaiki","Evaluasi keandalan, kualitas output, adopsi tim, dan dampak operasional. Perbaiki alur saat kebutuhan berubah."]
  ],
  audiences:["UMKM dengan volume pertanyaan pelanggan yang rutin","Bisnis F&B yang mengelola ulasan dan komunikasi","Tim pemasaran yang menangani banyak kanal","Bisnis yang ingin menata proses sebelum menambah kapasitas"],
  faqs:[
    ["Apa yang dimaksud Growth & Automation?","Gabungan strategi pertumbuhan dan perbaikan proses menggunakan workflow, integrasi, serta otomasi yang relevan dengan aktivitas bisnis."],
    ["Apakah semua proses harus menggunakan AI?","Tidak. Proses sederhana sering lebih baik diselesaikan dengan aturan atau integrasi biasa. AI digunakan ketika kemampuan memahami atau mengolah informasi memberi manfaat nyata."],
    ["Bisakah otomasi menangani semua chat pelanggan?","Tidak disarankan untuk semua situasi. Alur dapat membantu respons awal dan klasifikasi, tetapi kasus sensitif, komplain kompleks, atau keputusan penting perlu dialihkan ke manusia."],
    ["Apakah KetemuTerus membuat chatbot?","Kebutuhan komunikasi otomatis dapat dievaluasi, tetapi solusi tidak selalu berupa chatbot. Pilihan bisa berupa notifikasi, integrasi, routing leads, atau workflow internal."],
    ["Apakah data bisnis aman ketika menggunakan AI?","Pemilihan tools, jenis data, hak akses, dan kebijakan penyimpanan harus ditinjau sebelum implementasi. Data sensitif tidak boleh dikirim ke layanan tanpa dasar dan kontrol yang sesuai."],
    ["Bagaimana mengukur keberhasilan otomasi?","Indikator dapat mencakup waktu proses, jumlah tugas manual, kecepatan tindak lanjut, tingkat kesalahan, dan konsistensi layanan."]
  ],
  related:{href:"/layanan/digital-advertising/",label:"Digital Advertising",description:"Hubungkan aktivitas iklan dengan proses penerimaan leads, tindak lanjut, dan evaluasi hasil."},
  ctaTitle:"Cari tahu proses mana yang paling layak dirapikan lebih dulu.",
  ctaText:"Diskusikan hambatan operasional, aktivitas pemasaran, dan peluang otomasi bisnis Anda.",
  waMessage:"Halo KetemuTerus, saya ingin konsultasi Growth & Automation untuk bisnis saya."
};

function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {
  return <div className="max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p><h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">{title}</h2><p className="mt-4 text-base leading-7 text-slate-600">{description}</p></div>;
}

function ServiceLandingPage({config}:{config:PageConfig}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const consultationLink="https://wa.me/6281584229797?text="+encodeURIComponent(config.waMessage);
  const nav=[["Layanan","/#services"],["Klien","/#clients"],["Cara Kerja","/#process"],["Studi Kasus","/#case-studies"],["FAQ","/#faq"]];
  return <div className="min-h-screen overflow-x-clip bg-white font-sans text-slate-800 antialiased">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-7 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="KetemuTerus beranda"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Target className="h-5 w-5"/></span><span className="text-xl font-extrabold tracking-tight text-slate-950">KetemuTerus</span></a>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navigasi utama">{nav.map(([label,href])=><a key={href} href={href} className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600">{label}</a>)}</nav>
        <a href={consultationLink} target="_blank" rel="noreferrer" className="ml-auto hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700 xl:inline-flex">Konsultasi Bisnis <ArrowUpRight className="h-4 w-4"/></a>
        <button className="rounded-xl border border-slate-200 p-2.5 text-slate-700 xl:hidden" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?"Tutup menu":"Buka menu"} aria-expanded={menuOpen}>{menuOpen?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}</button>
      </div>
      {menuOpen&&<div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg xl:hidden"><nav className="mx-auto flex max-w-7xl flex-col gap-1">{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{label}</a>)}<a href={consultationLink} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white">Konsultasi Bisnis <ArrowUpRight className="h-4 w-4"/></a></nav></div>}
    </header>
    <main className="pt-[72px]">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-xs text-slate-500 sm:px-7 lg:px-8"><ol className="flex flex-wrap items-center gap-2"><li><a href="/" className="hover:text-blue-600">Beranda</a></li><li aria-hidden="true">/</li><li><a href="/#services" className="hover:text-blue-600">Layanan</a></li><li aria-hidden="true">/</li><li className="font-semibold text-slate-700" aria-current="page">{config.eyebrow}</li></ol></nav>
      <section className="relative isolate mt-4 overflow-hidden bg-[#F5F8FF] py-16 sm:py-20 lg:py-24"><div className="pointer-events-none absolute -right-40 -top-28 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl"/><div className="pointer-events-none absolute -bottom-44 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-100/70 blur-3xl"/><div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-8"><div className="max-w-4xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm"><span className="h-2 w-2 rounded-full bg-emerald-500"/>{config.eyebrow}</div><h1 className="text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.65rem]">{config.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{config.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={consultationLink} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"><MessageCircle className="h-5 w-5"/>Konsultasi via WhatsApp</a><a href="#cakupan-layanan" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">Lihat cakupan layanan <ArrowRight className="h-4 w-4"/></a></div><p className="mt-5 text-xs leading-6 text-slate-500">Strategi dan hasil disesuaikan dengan kondisi bisnis. Tidak ada jaminan penjualan atau hasil tertentu.</p></div></div></section>
      <section className="bg-white py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8"><SectionHeading eyebrow="Pendekatan KetemuTerus" title={config.focus} description="Kami melihat kebutuhan bisnis secara menyeluruh agar kanal pemasaran, pengalaman pelanggan, dan proses operasional saling mendukung."/><div className="grid gap-4 sm:grid-cols-2">{config.benefits.map(({icon:Icon,title,description})=><article key={title} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6"><Icon className="h-6 w-6 text-blue-600"/><h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
      <section id="cakupan-layanan" className="scroll-mt-8 bg-[#F7F9FC] py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8"><SectionHeading eyebrow="Cakupan layanan" title="Solusi yang disusun berdasarkan kebutuhan." description="Ruang lingkup dapat berdiri sendiri atau dikombinasikan dengan pilar layanan KetemuTerus yang lain sesuai prioritas bisnis."/><div className="mt-10 grid gap-5 md:grid-cols-2">{config.scope.map(({icon:Icon,title,description},i)=><article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/40"><div className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5"/></span><div><p className="text-xs font-bold tracking-[0.15em] text-blue-600">0{i+1}</p><h3 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h3></div></div><p className="mt-5 text-sm leading-7 text-slate-600">{description}</p></article>)}</div></div></section>
      <section className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8"><SectionHeading eyebrow="Cara kerja" title="Mulai dari diagnosis, bukan langsung memilih tools." description="Setiap bisnis memiliki prioritas dan kesiapan yang berbeda. Implementasi dilakukan bertahap berdasarkan manfaat dan risiko."/><ol className="mt-10 grid gap-5 md:grid-cols-2">{config.steps.map(([n,t,d])=><li key={n} className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white">{n}</span><div><h3 className="text-lg font-bold text-slate-950">{t}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{d}</p></div></li>)}</ol></div></section>
      <section className="bg-[#F7F9FC] py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-7 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8"><div><SectionHeading eyebrow="Untuk siapa layanan ini" title="Dapat disesuaikan dengan skala dan kesiapan bisnis." description="Kami mengutamakan solusi yang realistis untuk bisnis lokal dan UMKM. Tidak semua proses perlu diiklankan atau diotomasi sekaligus."/><ul className="mt-7 grid gap-3 sm:grid-cols-2">{config.audiences.map(item=><li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"/>{item}</li>)}</ul></div><aside className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5"><Workflow className="h-7 w-7 text-blue-600"/><h3 className="mt-4 text-xl font-extrabold text-slate-950">Terhubung dengan pilar layanan lain.</h3><p className="mt-3 text-sm leading-7 text-slate-600">{config.related.description}</p><a href={config.related.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800">Pelajari {config.related.label}<ArrowRight className="h-4 w-4"/></a></aside></div></section>
      <section className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-4xl px-5 sm:px-7 lg:px-8"><SectionHeading eyebrow="Pertanyaan umum" title={"FAQ "+config.eyebrow} description="Jawaban untuk membantu Anda memahami ruang lingkup, proses, dan ekspektasi layanan."/><div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">{config.faqs.map(([q,a])=><article key={q} className="py-6"><h3 className="text-base font-bold text-slate-950">{q}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{a}</p></article>)}</div></div></section>
      <section className="bg-slate-950 py-16 text-white sm:py-20"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Mulai dari kebutuhan bisnis</p><h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{config.ctaTitle}</h2><p className="mt-4 text-base leading-7 text-slate-300">{config.ctaText}</p></div><a href={consultationLink} target="_blank" rel="noreferrer" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-500"><MessageCircle className="h-5 w-5"/>Konsultasi via WhatsApp <ArrowUpRight className="h-4 w-4"/></a></div></section>
    </main>
    <footer className="border-t border-slate-200 bg-white py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-8"><a href="/" className="font-extrabold text-slate-900">KetemuTerus</a><p>Lebih Mudah Ditemukan. Lebih Banyak Pelanggan.</p><a href="/" className="font-semibold text-blue-700 hover:text-blue-800">Kembali ke beranda</a></div></footer>
  </div>;
}

export function DigitalAdvertisingPage(){return <ServiceLandingPage config={advertising}/>;}
export function GrowthAutomationPage(){return <ServiceLandingPage config={growth}/>;}
