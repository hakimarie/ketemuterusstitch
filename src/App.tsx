import { useState, createElement } from "react";
import {
  ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, Compass,
  Globe2, MapPin, Megaphone, Menu, MessageCircle, Search, ShieldCheck,
  Store, Target, TrendingUp, Utensils, Workflow, X, Zap, Instagram, Music2
} from "lucide-react";

const WA = "https://wa.me/6281584229797?text=";
const waLink = (message: string) => WA + encodeURIComponent(message);

const services = [
  {
    number: "01",
    icon: MapPin,
    title: "Local Business Visibility",
    intro: "Bantu calon pelanggan menemukan bisnis Anda saat mereka mencari produk atau layanan di sekitar mereka.",
    items: ["Google Business Profile", "Google Maps Optimization", "Local SEO", "Review Management"],
    outcome: "Lebih mudah ditemukan dan dipercaya."
  },
  {
    number: "02",
    icon: Globe2,
    title: "Website & Conversion",
    intro: "Bangun fondasi digital yang menjelaskan keunggulan bisnis dan memudahkan calon pelanggan mengambil tindakan.",
    items: ["Business Website", "Landing Page", "Website Optimization", "Analytics & Conversion Tracking"],
    outcome: "Pengunjung punya jalur yang jelas untuk menghubungi Anda."
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Digital Advertising",
    intro: "Jangkau calon pelanggan melalui platform iklan yang sesuai dengan tujuan, aset, dan kesiapan bisnis.",
    items: ["Google Ads — Search & Performance Max", "Meta Ads — Facebook & Instagram", "Campaign Strategy", "Optimization & Reporting"],
    outcome: "Anggaran iklan dikelola dengan tujuan dan pengukuran yang jelas."
  },
  {
    number: "04",
    icon: Workflow,
    title: "Growth & Automation",
    intro: "Rapikan aktivitas pemasaran dan proses kerja agar bisnis dapat berkembang dengan lebih efisien.",
    items: ["Social Media Management", "Marketing Automation", "AI Workflow", "Growth Strategy & Consultation"],
    outcome: "Aktivitas pemasaran lebih terarah dan efisien."
  }
];

const challenges = [
  { icon: Search, title: "Sulit ditemukan", text: "Calon pelanggan mencari produk atau layanan di Google, tetapi bisnis Anda belum tampil dengan informasi yang kuat." },
  { icon: ShieldCheck, title: "Belum cukup meyakinkan", text: "Informasi, foto, ulasan, atau kehadiran digital belum membantu calon pelanggan merasa yakin untuk memilih." },
  { icon: TrendingUp, title: "Promosi belum terukur", text: "Sudah melakukan promosi, tetapi belum jelas kanal mana yang membantu menghasilkan pertanyaan, kunjungan, atau penjualan." }
];

const process = [
  ["01", "Understand", "Memahami model bisnis, target pelanggan, kondisi, dan tujuan pertumbuhan."],
  ["02", "Diagnose", "Mengidentifikasi hambatan dan peluang dari fondasi digital serta aktivitas pemasaran."],
  ["03", "Prioritize", "Menentukan strategi dan urutan pekerjaan berdasarkan dampak, kebutuhan, dan kesiapan."],
  ["04", "Implement", "Menjalankan solusi yang disepakati—mulai dari visibilitas, website, hingga advertising."],
  ["05", "Optimize", "Memantau hasil, mengevaluasi data, dan memperbaiki strategi secara berkala."]
];

const faqs = [
  {
    q: "Apakah bisnis harus punya website untuk bekerja sama dengan KetemuTerus?",
    a: "Tidak. Website bukan prasyarat untuk memulai. Kami akan melihat kondisi bisnis dan memilih strategi yang paling masuk akal. Untuk bisnis yang belum memiliki website, Google Business Profile dan kampanye Google Ads tertentu—termasuk Performance Max jika memenuhi persyaratan dan tujuan kampanye—dapat menjadi opsi."
  },
  {
    q: "Apakah Performance Max merupakan layanan terpisah dari Google Ads?",
    a: "Tidak. Performance Max adalah jenis kampanye di dalam Google Ads. Kami dapat membantu menentukan apakah Search, Performance Max, atau kombinasi strategi Google Ads lain lebih sesuai dengan tujuan bisnis."
  },
  {
    q: "Apakah semua bisnis harus mengambil empat pilar layanan?",
    a: "Tidak. Empat pilar adalah cakupan kemampuan KetemuTerus, bukan paket wajib. Rekomendasi disesuaikan dengan masalah, anggaran, aset, dan kesiapan masing-masing bisnis."
  },
  {
    q: "Apakah KetemuTerus hanya melayani bisnis F&B?",
    a: "F&B menjadi fokus utama kami, tetapi kami juga terbuka membantu bisnis lokal lain seperti barbershop, salon, retail, dan penyedia jasa."
  },
  {
    q: "Apakah KetemuTerus menjamin bisnis masuk peringkat pertama Google?",
    a: "Tidak. Peringkat Google dipengaruhi banyak faktor di luar kendali satu penyedia jasa. Kami berfokus pada praktik optimasi yang relevan, transparan, dan dapat dievaluasi—tanpa menjanjikan posisi tertentu."
  }
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.7rem]">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [averageGuests, setAverageGuests] = useState(2);
  const [averageSpend, setAverageSpend] = useState(100000);

  const closeMenu = () => setMenuOpen(false);
  const nav = [
    ["Layanan", "#services"],
    ["Cara Kerja", "#process"],
    ["Untuk F&B", "#fnb"],
    ["Studi Kasus", "#case-studies"],
    ["Tentang Kami", "#approach"],
    ["FAQ", "#faq"]
  ];

  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-white font-sans text-slate-800 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="KetemuTerus beranda" onClick={closeMenu}>
            <img src="https://i.ibb.co.com/bMx2jVkG/logo-ketemu-terus-Hitamfix.jpg" alt="Logo KetemuTerus" className="h-10 w-auto max-w-[180px] object-contain" />
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-blue-600">{label}</a>)}
          </nav>
          <a href={waLink("Halo KetemuTerus, saya ingin konsultasi tentang strategi digital untuk bisnis saya.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 lg:inline-flex">
            Konsultasi Bisnis <ArrowUpRight className="h-4 w-4" />
          </a>
          <button className="rounded-xl border border-slate-200 p-2.5 text-slate-700 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{label}</a>)}
            <a href={waLink("Halo KetemuTerus, saya ingin konsultasi tentang strategi digital untuk bisnis saya.")} target="_blank" rel="noreferrer" onClick={closeMenu} className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white">Konsultasi Bisnis <ArrowUpRight className="h-4 w-4" /></a>
          </nav>
        </div>}
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-[#F5F8FF] pb-24 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute -right-40 -top-28 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-44 -left-32 h-[30rem] w-[30rem] rounded-full bg-sky-100/70 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-7 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> LOCAL BUSINESS GROWTH PARTNER
              </div>
              <div className="mb-6 flex items-center">
                <img src="https://i.ibb.co.com/bMx2jVkG/logo-ketemu-terus-Hitamfix.jpg" alt="Logo KetemuTerus" className="h-12 w-auto max-w-[220px] object-contain sm:h-14" />
              </div>
              <h1 className="max-w-3xl text-[2.15rem] font-extrabold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.8rem]">
                Bantu Bisnis Lokal <span className="text-blue-600">Tumbuh Lebih Cepat.</span>
              </h1>
              <p className="mt-4 text-lg font-bold leading-snug tracking-tight text-blue-700 sm:mt-5 sm:text-xl">
                Lebih Mudah Ditemukan. Lebih Banyak Pelanggan.
              </p>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
                KetemuTerus membantu bisnis lokal meningkatkan visibilitas, membangun kepercayaan, dan mendapatkan lebih banyak peluang pelanggan melalui strategi digital yang tepat.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <a href={waLink("Halo KetemuTerus, saya ingin konsultasi dan mencari tahu strategi digital yang tepat untuk bisnis saya.")} target="_blank" rel="noreferrer" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto sm:px-7">
                  <MessageCircle className="h-5 w-5" /> Konsultasi via WhatsApp
                </a>
              </div>
              <p className="mt-5 text-xs leading-6 text-slate-500">Strategi disesuaikan dengan kebutuhan dan kesiapan bisnis. Bukan paket layanan yang dipaksakan.</p>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-200/70 via-white to-sky-100/80 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-blue-950/10 sm:p-7">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">OUR GROWTH APPROACH</p><h2 className="mt-1 text-xl font-extrabold text-slate-950">Dari ditemukan, dipercaya, hingga dipilih pelanggan.</h2><p className="mt-2 text-xs leading-5 text-slate-500">Setiap tahap punya tantangan dan membutuhkan strategi yang berbeda.</p></div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><TrendingUp className="h-5 w-5" /></span>
                </div>
                <div className="space-y-3 py-5">
                  {[
                    [MapPin, "Visibility", "Pastikan bisnis Anda hadir ketika calon pelanggan mencari produk atau layanan yang Anda tawarkan.", "bg-blue-50 text-blue-700"],
                    [ShieldCheck, "Credibility", "Bangun kepercayaan melalui informasi bisnis yang jelas, reputasi yang baik, dan kehadiran digital yang profesional.", "bg-emerald-50 text-emerald-700"],
                    [Target, "Conversion", "Permudah calon pelanggan mengambil tindakan, mulai dari bertanya, menghubungi, hingga datang ke lokasi.", "bg-amber-50 text-amber-700"],
                    [BarChart3, "Growth", "Gunakan data dan evaluasi untuk memahami hasil pemasaran serta menentukan langkah pertumbuhan berikutnya.", "bg-violet-50 text-violet-700"]
                  ] .map(([Icon, title, copy, color]) => <div key={title as string} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>{createElement(Icon as typeof MapPin, { className: "h-5 w-5" })}</span>
                    <div><p className="font-bold text-slate-900">{title as string}</p><p className="mt-1 text-xs leading-5 text-slate-500">{copy as string}</p></div>
                    <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-600" />
                  </div>)}
                </div>
                <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
                  <p className="text-sm font-bold">Satu partner. Solusi sesuai kebutuhan bisnis Anda.</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">Mulai dari yang paling dibutuhkan. Berkembang sesuai potensi.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-white py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <p className="mb-4 text-center text-[0.68rem] font-bold uppercase leading-5 tracking-[0.16em] text-slate-400 sm:mb-5 sm:text-xs sm:tracking-[0.18em]">Mendukung berbagai jenis bisnis lokal</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
              {["F&B & Coffee Shop", "Retail Lokal", "Barbershop & Salon", "Jasa Profesional", "Bisnis Lokal"].map((name, i) => <div key={name} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-2.5 py-3 text-center text-[0.78rem] font-semibold leading-5 text-slate-600 sm:min-h-14 sm:px-3 sm:text-sm ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}><Store className="h-4 w-4 shrink-0 text-blue-600" /><span>{name}</span></div>)}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Tantangan bisnis lokal" title="Punya bisnis bagus saja belum cukup." description="Calon pelanggan perlu menemukan bisnis Anda, merasa yakin, lalu tahu langkah berikutnya. Kami membantu menghubungkan ketiga hal tersebut." />
            <div className="mt-11 grid gap-5 md:grid-cols-3">
              {challenges.map(({ icon: Icon, title, text }, i) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5" /></span>
                <p className="mt-6 text-xs font-bold tracking-[0.15em] text-blue-600">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-extrabold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 bg-[#F7F9FC] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Apa yang kami kerjakan" title="Empat pilar untuk mendukung pertumbuhan bisnis." description="Kami menggabungkan fondasi digital, pemasaran, dan optimasi agar setiap langkah punya tujuan yang jelas." />
              <p className="max-w-sm text-sm leading-6 text-slate-500">Tidak harus mengambil semuanya. Kita mulai dari kebutuhan dan prioritas bisnis Anda.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {services.map(({ number, icon: Icon, title, intro, items, outcome }) => <article key={number} className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-7 w-7" /></span>
                  <span className="text-sm font-extrabold tracking-widest text-slate-300">{number}</span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-950">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{intro}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {items.map(item => <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}
                </ul>
                <div className="mt-7 rounded-2xl bg-blue-50/80 px-4 py-3 text-sm font-semibold text-blue-900">{outcome}</div>
              </article>)}
            </div>
          </div>
        </section>

        <section id="fnb" className="scroll-mt-24 overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-7 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">F&B sebagai fokus utama</p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Bisnis kuliner perlu lebih dari sekadar promosi.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">Kami memahami perjalanan pelanggan lokal: mencari tempat makan, membandingkan pilihan, melihat menu dan ulasan, lalu memutuskan untuk datang atau memesan.</p>
              <a href={waLink("Halo KetemuTerus, saya menjalankan bisnis F&B dan ingin mendiskusikan strategi pertumbuhan digital.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50">Diskusikan Bisnis F&B <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Search, "Ditemukan", "Optimasi kehadiran lokal saat pelanggan mencari tempat makan."],
                [Utensils, "Dipertimbangkan", "Tampilkan menu, foto, informasi, dan ulasan yang membantu pelanggan memilih."],
                [MessageCircle, "Dihubungi", "Permudah pelanggan bertanya, memesan, atau membuka petunjuk arah."],
                [BarChart3, "Dikembangkan", "Gunakan iklan dan pengukuran untuk menemukan peluang pertumbuhan."]
              ].map(([Icon, title, copy]) => <div key={title as string} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                {createElement(Icon as typeof Search, { className: "h-6 w-6 text-blue-300" })}
                <h3 className="mt-5 text-lg font-bold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{copy as string}</p>
              </div>)}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-7 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
            <div>
              <SectionHeading eyebrow="Advertising yang fleksibel" title="Belum punya website? Tetap ada opsi untuk beriklan." description="Website bisa menjadi aset penting, tetapi bukan syarat mutlak untuk memulai setiap strategi pemasaran digital." />
              <p className="mt-5 text-sm leading-7 text-slate-600">Kami dapat mengevaluasi pemanfaatan Google Business Profile dan kampanye Google Ads—termasuk Performance Max dengan sasaran lokal—untuk bisnis yang memenuhi persyaratan dan memiliki tujuan kampanye yang sesuai.</p>
              <a href={waLink("Halo KetemuTerus, bisnis saya belum memiliki website. Saya ingin mengetahui opsi Google Ads yang sesuai.")} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800">Tanyakan opsi untuk bisnis Anda <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <div className="rounded-[1.75rem] border border-blue-100 bg-[#F5F8FF] p-7 sm:p-9">
              <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm"><Megaphone className="h-6 w-6" /></span><div><p className="text-xs font-bold uppercase tracking-widest text-blue-700">Google Ads</p><h3 className="text-xl font-extrabold text-slate-950">Strategi sesuai kesiapan bisnis</h3></div></div>
              <div className="mt-7 space-y-4">
                {[
                  ["Search", "Menjangkau orang yang sedang mencari produk atau layanan tertentu."],
                  ["Performance Max", "Salah satu tipe kampanye Google Ads yang dapat menjangkau inventori Google dengan optimasi berbasis tujuan."],
                  ["Local goals", "Tujuan lokal seperti interaksi lokasi atau kunjungan dapat dipertimbangkan jika akun, lokasi, dan pengukuran memenuhi persyaratan Google."]
                ].map(([title, text]) => <div key={title} className="flex gap-3 border-t border-blue-100 pt-4"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><div><h4 className="font-bold text-slate-900">{title}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div></div>)}
              </div>
              <p className="mt-6 text-xs leading-5 text-slate-500">Kelayakan kampanye ditinjau terlebih dahulu. Hasil iklan tidak dijamin dan bergantung pada penawaran, aset, anggaran, persaingan, serta kualitas pengukuran.</p>
            </div>
          </div>
        </section>


        <section id="case-studies" className="scroll-mt-24 bg-[#F7F9FC] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Studi kasus"
                title="Dampak digital yang bisa dilihat dari data."
                description="Dua contoh pekerjaan dengan kebutuhan berbeda: memperkuat visibilitas bisnis lokal dan menjangkau calon pelanggan melalui Google Ads."
              />
              <p className="max-w-sm text-sm leading-6 text-slate-500">Data dashboard dan simulasi bisnis kami pisahkan agar hasilnya mudah dipahami dan tetap transparan.</p>
            </div>

            <div className="mt-11 grid items-stretch gap-6 lg:grid-cols-2">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                <div className="bg-slate-950 px-7 py-7 text-white sm:px-8 sm:py-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-blue-200">Local Business Visibility</span>
                    <span className="text-xs font-medium text-slate-400">Jagakarsa, Jakarta Selatan</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.75rem]">Soto Mie Kang Hendi</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Mendampingi bisnis memperkuat kehadiran lokal sekaligus menghadapi kendala akses kepemilikan Google Business Profile.</p>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="rounded-2xl bg-blue-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Google Business Profile views · 3 bulan</p>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">9.011</p>
                    <p className="mt-1 text-sm text-slate-600">Penayangan profil bisnis selama periode pengukuran.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-100 p-4">
                      <p className="text-2xl font-extrabold text-slate-950">94%</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Dari perangkat mobile</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 p-4">
                      <p className="text-2xl font-extrabold text-slate-950">56%</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Ditemukan melalui Google Maps</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-slate-700">Google Maps</span>
                      <span className="font-bold tabular-nums text-slate-950">5.034 · 56%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: "56%" }} /></div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-slate-700">Google Search</span>
                      <span className="font-bold tabular-nums text-slate-950">3.977 · 44%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-amber-500" style={{ width: "44%" }} /></div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-slate-500">Apa artinya?</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">Mayoritas penayangan profil terjadi di ponsel. Karena itu, informasi bisnis, foto, ulasan, dan jalur untuk menghubungi atau menemukan lokasi perlu mudah diakses dari perangkat mobile.</p>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-slate-400">Sumber: Google Business Profile Performance. Views menunjukkan penayangan profil, bukan jumlah pelanggan atau kunjungan fisik.</p>
                </div>
              </article>

              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                <div className="bg-blue-700 px-7 py-7 text-white sm:px-8 sm:py-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-blue-100">Digital Advertising · Google Ads</span>
                    <span className="text-xs font-medium text-blue-100">Cibubur</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.75rem]">Home Steak x Oemah Kopi</h3>
                  <p className="mt-2 text-sm leading-6 text-blue-100">Optimasi kampanye Performance Max untuk menjangkau calon pelanggan lokal dan mendorong tindakan yang relevan dengan lokasi bisnis.</p>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Hasil campaign · keseluruhan periode pada dashboard</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-2xl font-extrabold tracking-tight text-slate-950">14.032</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Impressions</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-2xl font-extrabold tracking-tight text-slate-950">919</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Clicks</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-2xl font-extrabold tracking-tight text-slate-950">462</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Google Ads conversions</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-2xl font-extrabold tracking-tight text-slate-950">Rp846 rb</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Ad spend · Rp846.167</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                      <p className="text-2xl font-extrabold text-blue-800">6,55%</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">CTR</p>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                      <p className="text-2xl font-extrabold text-blue-800">Rp1.832</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">Cost per conversion</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">Sinyal kunjungan lokasi dari Google</p>
                    <div className="mt-2 flex items-end gap-2">
                      <p className="text-4xl font-extrabold tracking-tight text-slate-950">44</p>
                      <p className="pb-1 text-sm font-semibold text-slate-600">Store Visits</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600">Google melaporkan 44 Store Visits pada pelacakan campaign. Angka ini adalah estimasi/model Google, bukan catatan transaksi POS atau bukti bahwa setiap kunjungan berasal hanya dari iklan.</p>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Simulasi potensi nilai penjualan</p>
                      <h4 className="mt-2 text-lg font-extrabold text-slate-950">Bagaimana jika setiap kunjungan datang berdua?</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Ubah asumsi di bawah untuk melihat estimasi nilai penjualan dan rasio terhadap biaya iklan.</p>
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-3">
                        <label htmlFor="case-guests" className="text-sm font-semibold text-slate-700">Rata-rata orang per kunjungan</label>
                        <output htmlFor="case-guests" className="text-sm font-extrabold tabular-nums text-slate-950">{averageGuests} orang</output>
                      </div>
                      <input id="case-guests" type="range" min="2" max="4" step="1" value={averageGuests} onChange={(event) => setAverageGuests(Number(event.target.value))} className="mt-3 w-full accent-blue-600" />
                      <div className="mt-1 flex justify-between text-xs text-slate-400"><span>2 orang</span><span>4 orang</span></div>
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-3">
                        <label htmlFor="case-spend" className="text-sm font-semibold text-slate-700">Rata-rata belanja per orang</label>
                        <output htmlFor="case-spend" className="text-sm font-extrabold tabular-nums text-slate-950">Rp{averageSpend.toLocaleString("id-ID")}</output>
                      </div>
                      <input id="case-spend" type="range" min="75000" max="125000" step="5000" value={averageSpend} onChange={(event) => setAverageSpend(Number(event.target.value))} className="mt-3 w-full accent-blue-600" />
                      <div className="mt-1 flex justify-between text-xs text-slate-400"><span>Rp75 ribu</span><span>Rp125 ribu</span></div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3" aria-live="polite">
                      <div className="rounded-2xl bg-slate-950 p-4 text-white">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-300">Estimasi revenue</p>
                        <p className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">Rp{(44 * averageGuests * averageSpend).toLocaleString("id-ID")}</p>
                        <p className="mt-1 text-xs text-slate-400">{44 * averageGuests} orang · asumsi</p>
                      </div>
                      <div className="rounded-2xl bg-blue-50 p-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-blue-700">Simulasi ROAS</p>
                        <p className="mt-2 text-2xl font-extrabold tracking-tight text-blue-900">{((44 * averageGuests * averageSpend) / 846167).toFixed(1).replace(".", ",")}x</p>
                        <p className="mt-1 text-xs text-slate-500">Revenue simulasi ÷ ad spend</p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-500">Simulasi, bukan revenue atau ROAS aktual. Mengasumsikan setiap Store Visit setara satu kunjungan, rata-rata jumlah orang sesuai pilihan, dan setiap orang membelanjakan nilai yang dipilih. Kunjungan dan transaksi aktual perlu diverifikasi melalui data outlet/POS.</p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-amber-800">Cara membaca angka</p>
                    <p className="mt-1 text-xs leading-6 text-slate-700">462 adalah total conversions yang tercatat pada dashboard campaign. Store Visits ditampilkan sebagai tindakan kunjungan yang dilaporkan Google dan tidak dijumlahkan lagi di atas angka 462. Conversion Google Ads bukan otomatis transaksi penjualan.</p>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-slate-400">Sumber: dashboard Google Ads untuk campaign Home Steak x Oemah Kopi. Impression, click, conversion, dan biaya adalah metrik campaign; Store Visits merupakan estimasi Google.</p>
                </div>
              </article>
            </div>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:p-7">
              <div>
                <h3 className="font-extrabold text-slate-950">Punya tantangan serupa?</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">Ceritakan kondisi bisnis Anda. Kami bantu petakan langkah yang paling relevan.</p>
              </div>
              <a href={waLink("Halo KetemuTerus, saya ingin berdiskusi tentang tantangan digital bisnis saya.")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:w-auto">Diskusikan Bisnis Anda <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 bg-[#F7F9FC] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Cara kami bekerja" title="Strategi dulu. Eksekusi dengan prioritas." description="Kami mulai dengan memahami bisnis, bukan langsung menawarkan paket. Setiap rekomendasi harus punya alasan dan langkah tindak lanjut." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {process.map(([number, title, text]) => <article key={number} className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-extrabold tracking-[0.18em] text-blue-600">{number}</p>
                <h3 className="mt-4 text-lg font-extrabold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-7 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
            <div>
              <SectionHeading eyebrow="Kenapa KetemuTerus" title="Partner yang memahami kondisi bisnis, bukan sekadar menjual layanan." description="Kebutuhan setiap bisnis berbeda. Kami membantu memilih langkah yang relevan, menjelaskan ruang lingkupnya, lalu mengoptimalkan berdasarkan data yang tersedia." />
              <a href={waLink("Halo KetemuTerus, saya ingin mengenal cara kerja dan layanan KetemuTerus.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-700">Kenali cara kerja kami <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="space-y-4">
              {[
                [Compass, "Strategi berdasarkan kebutuhan", "Tidak memaksakan semua bisnis mengikuti satu paket atau satu kanal pemasaran."],
                [ShieldCheck, "Transparan dan realistis", "Memisahkan data, temuan, asumsi, dan target. Tidak menjanjikan ranking atau hasil yang tidak dapat dikendalikan."],
                [Zap, "Dari rencana ke implementasi", "Membantu menjalankan solusi yang disepakati, bukan berhenti pada laporan rekomendasi."]
              ].map(([Icon, title, text]) => <div key={title as string} className="flex gap-4 rounded-2xl border border-slate-200 p-5 sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{createElement(Icon as typeof Compass, { className: "h-5 w-5" })}</span>
                <div><h3 className="font-extrabold text-slate-950">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p></div>
              </div>)}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 bg-[#F7F9FC] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-7 lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl text-center"><SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" description="Beberapa hal yang perlu diketahui sebelum memulai kerja sama." /></div>
            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => <div key={q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6" aria-expanded={openFaq === i}>
                  <span className="font-bold leading-6 text-slate-900">{q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition ${openFaq === i ? "rotate-180 text-blue-600" : ""}`} />
                </button>
                {openFaq === i && <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-6 sm:pb-6">{a}</div>}
              </div>)}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-7 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-blue-600 px-7 py-12 text-center text-white shadow-2xl shadow-blue-900/15 sm:px-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Mulai dari kebutuhan bisnis Anda</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Mari temukan strategi digital yang tepat untuk bisnis Anda.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">Ceritakan kondisi dan tujuan bisnis Anda. Kita diskusikan langkah yang paling relevan—tanpa harus mengambil semua layanan.</p>
            <a href={waLink("Halo KetemuTerus, saya ingin konsultasi tentang strategi digital untuk bisnis saya.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50">Konsultasi Gratis via WhatsApp <MessageCircle className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white pb-24 pt-12 sm:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-9 px-5 sm:px-7 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="max-w-md">
            <a href="#top" className="inline-flex items-center gap-2.5"><img src="https://i.ibb.co.com/bMx2jVkG/logo-ketemu-terus-Hitamfix.jpg" alt="Logo KetemuTerus" className="h-9 w-auto max-w-[160px] object-contain" /></a>
            <p className="mt-4 text-sm leading-7 text-slate-500">Local Business Growth Partner. Membantu bisnis lokal lebih mudah ditemukan, dipercaya, dan dipilih pelanggan.</p>
            <p className="mt-3 text-sm text-slate-500">Jakarta, Indonesia</p>
          </div>
          <div className="flex items-center gap-3 md:ml-auto md:pt-2" aria-label="Social media KetemuTerus">
            <a href="https://www.tiktok.com/@ketemuterus.biz.id" target="_blank" rel="noreferrer" aria-label="TikTok KetemuTerus" title="TikTok" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-white shadow-sm transition hover:scale-105 hover:bg-black" >
              <Music2 className="h-6 w-6" strokeWidth={2.8} />
            </a>
            <a href="https://www.instagram.com/ketemuterus.biz.id/" target="_blank" rel="noreferrer" aria-label="Instagram KetemuTerus" title="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-white shadow-sm transition hover:scale-105">
              <Instagram className="h-6 w-6" strokeWidth={2.8} />
            </a>
            <a href={waLink("Halo KetemuTerus, saya ingin bertanya tentang layanan Anda.")} target="_blank" rel="noreferrer" aria-label="WhatsApp KetemuTerus" title="WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:scale-105 hover:bg-[#1FB85A]">
              <MessageCircle className="h-6 w-6" strokeWidth={2.8} />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-100 px-5 pt-6 text-xs text-slate-400 sm:px-7 lg:px-8">© {new Date().getFullYear()} KetemuTerus. Lebih Mudah Ditemukan. Lebih Banyak Pelanggan.</div>
      </footer>
    </div>
  );
}
