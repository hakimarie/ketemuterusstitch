import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Globe2,
  MapPin,
  LayoutTemplate,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Search,
  ShieldCheck,
  Store,
  Menu,
  X,
} from "lucide-react";

const WA = "https://wa.me/6281584229797?text=";
const consultationLink = WA + encodeURIComponent("Halo KetemuTerus, saya ingin konsultasi pembuatan website untuk bisnis saya.");

const deliverables = [
  {
    icon: LayoutTemplate,
    title: "Website profil bisnis",
    description: "Halaman yang menjelaskan identitas, produk atau layanan, keunggulan, lokasi, jam operasional, dan cara menghubungi bisnis.",
  },
  {
    icon: MonitorSmartphone,
    title: "Tampilan responsif",
    description: "Struktur dan tampilan yang dirancang agar tetap mudah digunakan melalui ponsel, tablet, maupun desktop.",
  },
  {
    icon: Search,
    title: "Fondasi SEO teknis",
    description: "Struktur heading, metadata, URL, sitemap, canonical, dan data terstruktur yang relevan dengan isi halaman.",
  },
  {
    icon: MousePointerClick,
    title: "Jalur konversi",
    description: "CTA WhatsApp, tombol telepon, tautan lokasi, atau tindakan lain yang sesuai dengan perjalanan pelanggan bisnis.",
  },
  {
    icon: Code2,
    title: "Pengembangan sesuai kebutuhan",
    description: "Ruang lingkup teknis ditentukan dari kebutuhan nyata—mulai dari website informatif hingga landing page kampanye.",
  },
  {
    icon: ShieldCheck,
    title: "Pengukuran dan kesiapan",
    description: "Pembahasan elemen analitik, performa, keamanan dasar, serta kebutuhan pemeliharaan sesuai kesepakatan proyek.",
  },
];

const process = [
  ["01", "Diskusi tujuan bisnis", "Kami memahami model bisnis, target pelanggan, layanan utama, dan tindakan yang ingin dilakukan pengunjung website."],
  ["02", "Susun struktur dan konten", "Halaman, navigasi, pesan utama, dan kebutuhan aset disusun agar pengunjung dapat menemukan informasi penting dengan mudah."],
  ["03", "Desain dan pengembangan", "Website dibangun dengan mempertimbangkan identitas brand, pengalaman mobile, kecepatan, dan kebutuhan fungsional."],
  ["04", "Pemeriksaan dan publikasi", "Sebelum rilis, elemen penting seperti tautan, tampilan responsif, metadata, dan fungsi CTA diperiksa bersama."],
];

const faqs = [
  {
    question: "Apakah website UMKM harus memiliki banyak halaman?",
    answer: "Tidak. Struktur website sebaiknya mengikuti kebutuhan informasi dan perjalanan pelanggan. Untuk sebagian bisnis, website satu halaman yang jelas sudah cukup sebagai tahap awal. Bisnis dengan banyak layanan, produk, atau lokasi mungkin membutuhkan halaman yang lebih terpisah.",
  },
  {
    question: "Apakah website yang dibuat sudah SEO-friendly?",
    answer: "Fondasi SEO teknis dapat disiapkan, seperti struktur heading, metadata, URL yang jelas, canonical, sitemap, dan data terstruktur yang sesuai. Namun, kesiapan teknis bukan jaminan peringkat. Kinerja organik juga bergantung pada kualitas konten, relevansi, persaingan, dan faktor lain.",
  },
  {
    question: "Apakah website bisa langsung terhubung ke WhatsApp?",
    answer: "Bisa. CTA WhatsApp dapat disiapkan agar calon pelanggan lebih mudah memulai percakapan. Tautan telepon, email, peta lokasi, atau kanal lain juga dapat dipertimbangkan sesuai kebutuhan bisnis.",
  },
  {
    question: "Apakah saya harus menyiapkan domain dan hosting sendiri?",
    answer: "Kebutuhan domain, hosting, dan akun terkait dibahas saat penentuan ruang lingkup. Kami dapat membantu menjelaskan opsi yang sesuai, termasuk kepemilikan akun dan akses agar aset digital bisnis tetap berada dalam kendali pemilik usaha.",
  },
  {
    question: "Apakah website bisa dikembangkan lagi setelah selesai?",
    answer: "Bisa, selama kebutuhan dan fondasi teknisnya mendukung. Pengembangan lanjutan dapat mencakup halaman layanan, landing page kampanye, katalog, integrasi, atau fungsi tambahan berdasarkan prioritas bisnis.",
  },
  {
    question: "Berapa biaya dan lama pembuatan website?",
    answer: "Biaya dan waktu pengerjaan bergantung pada jumlah halaman, kebutuhan desain, kesiapan materi, integrasi, serta fitur. KetemuTerus menentukan estimasi setelah memahami ruang lingkup proyek, bukan menggunakan angka yang sama untuk semua bisnis.",
  },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default function WebsiteUmkmPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ["Layanan", "/#services"],
    ["Klien", "/#clients"],
    ["Cara Kerja", "/#process"],
    ["Untuk F&B", "/#fnb"],
    ["Studi Kasus", "/#case-studies"],
    ["Tentang Kami", "/#approach"],
    ["FAQ", "/#faq"],
  ] as const;

  return (
    <div className="min-h-screen overflow-x-clip bg-white font-sans text-slate-800 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-7 lg:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="KetemuTerus beranda" onClick={closeMenu}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><MapPin className="h-5 w-5" /></span>
            <span className="text-xl font-extrabold tracking-tight text-slate-950">KetemuTerus</span>
          </a>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Navigasi utama">
            {navItems.map(([label, href]) => <a key={href} href={href} className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600">{label}</a>)}
          </nav>
          <a href={consultationLink} target="_blank" rel="noreferrer" className="ml-auto hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 xl:inline-flex">
            Konsultasi Bisnis <ArrowUpRight className="h-4 w-4" />
          </a>
          <button className="rounded-xl border border-slate-200 p-2.5 text-slate-700 xl:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Navigasi mobile">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{label}</a>)}
            <a href={consultationLink} onClick={closeMenu} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white">Konsultasi Bisnis <ArrowUpRight className="h-4 w-4" /></a>
          </nav>
        </div>}
      </header>

      <main className="pt-[72px]">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-xs text-slate-500 sm:px-7 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-blue-600">Beranda</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/#services" className="hover:text-blue-600">Layanan</a></li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-slate-700" aria-current="page">Website UMKM</li>
          </ol>
        </nav>

        <section className="relative isolate mt-4 overflow-hidden bg-[#F5F8FF] py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -right-40 -top-28 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-44 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-100/70 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> WEBSITE & CONVERSION
              </div>
              <h1 className="text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.65rem]">
                Jasa Pembuatan Website UMKM untuk Bisnis Lokal
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Bangun pusat informasi digital yang membantu pelanggan mengenal bisnis, memahami produk atau layanan, dan mengambil langkah berikutnya. KetemuTerus membantu UMKM merancang website yang relevan dengan kebutuhan bisnis—bukan sekadar halaman online.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={consultationLink} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                  <MessageCircle className="h-5 w-5" /> Konsultasi via WhatsApp
                </a>
                <a href="#cakupan-website" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                  Lihat cakupan website <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-5 text-xs leading-6 text-slate-500">Struktur, fitur, biaya, dan waktu pengerjaan ditentukan berdasarkan ruang lingkup proyek.</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <SectionHeading eyebrow="Website sebagai aset bisnis" title="Berikan tempat yang jelas bagi pelanggan untuk mengenal bisnis Anda." description="Media sosial membantu bisnis berinteraksi, sementara website dapat menjadi pusat informasi yang lebih terstruktur. Pelanggan bisa memahami penawaran, menemukan informasi penting, dan menghubungi bisnis melalui jalur yang Anda siapkan." />
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <Store className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Identitas lebih utuh</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Jelaskan siapa Anda, apa yang ditawarkan, dan alasan pelanggan perlu mengenal bisnis Anda.</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <Search className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Mudah ditemukan</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Siapkan struktur halaman dan fondasi teknis agar konten dapat dipahami mesin pencari.</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <MousePointerClick className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Arah tindakan jelas</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Bantu pengunjung menghubungi, meminta penawaran, melihat lokasi, atau melakukan tindakan yang relevan.</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Aset yang dimiliki bisnis</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Bangun kanal digital yang dapat dikembangkan seiring perubahan kebutuhan dan layanan bisnis.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="cakupan-website" className="scroll-mt-8 bg-[#F7F9FC] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Cakupan pengembangan" title="Website yang dibangun berdasarkan kebutuhan nyata." description="Tidak semua bisnis membutuhkan fitur yang sama. Ruang lingkup disusun bersama agar investasi website berfokus pada fungsi yang benar-benar dibutuhkan." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {deliverables.map(({ icon: Icon, title, description }, index) => (
                <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/40">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5" /></span>
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] text-blue-600">0{index + 1}</p>
                      <h3 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h3>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Cara kerja" title="Dari kebutuhan bisnis menjadi website yang siap digunakan." description="Proses dimulai dari tujuan dan materi yang tersedia, kemudian diterjemahkan menjadi struktur dan fungsi website yang disepakati." />
            <ol className="mt-10 grid gap-5 md:grid-cols-2">
              {process.map(([number, title, description]) => (
                <li key={number} className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white">{number}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#F7F9FC] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-7 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
            <div>
              <SectionHeading eyebrow="Terhubung dengan strategi digital" title="Website bekerja lebih baik ketika terhubung dengan kanal pemasaran lain." description="Website dapat menjadi tujuan dari Google Ads dan Meta Ads, sekaligus mendukung Local SEO dengan informasi bisnis dan layanan yang lebih lengkap. Peran website ditentukan berdasarkan tujuan kampanye dan perilaku pelanggan." />
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Local SEO dan pencarian organik", "Google Ads dan landing page", "Meta Ads dan kampanye promosi", "Informasi produk dan layanan", "Kontak dan permintaan penawaran", "Pengukuran interaksi pengunjung"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>
                ))}
              </ul>
            </div>
            <aside className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5">
              <Globe2 className="h-7 w-7 text-blue-600" />
              <h3 className="mt-4 text-xl font-extrabold text-slate-950">Belum tentu perlu website yang kompleks.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Jika kebutuhan utama bisnis adalah memperjelas informasi dan mempermudah pelanggan menghubungi Anda, struktur sederhana bisa menjadi awal yang tepat. Fitur tambahan dapat dipertimbangkan ketika kebutuhan bisnis berkembang.</p>
              <a href="/layanan/local-seo-google-maps/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800">Pelajari Local SEO & Google Maps <ArrowRight className="h-4 w-4" /></a>
            </aside>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Pertanyaan umum" title="FAQ jasa pembuatan website UMKM" description="Hal yang perlu dipahami sebelum menentukan struktur, fitur, dan ruang lingkup website bisnis." />
            <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map(({ question, answer }) => (
                <article key={question} className="py-6">
                  <h3 className="text-base font-bold text-slate-950">{question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Mulai dari kebutuhan bisnis</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Siapkan website yang membantu pelanggan mengambil keputusan.</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">Diskusikan tujuan, kebutuhan halaman, dan fungsi website bisnis Anda bersama KetemuTerus.</p>
            </div>
            <a href={consultationLink} target="_blank" rel="noreferrer" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-500">
              <MessageCircle className="h-5 w-5" /> Konsultasi via WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-8">
          <a href="/" className="font-extrabold text-slate-900">KetemuTerus</a>
          <p>Lebih Mudah Ditemukan. Lebih Banyak Pelanggan.</p>
          <a href="/" className="font-semibold text-blue-700 hover:text-blue-800">Kembali ke beranda</a>
        </div>
      </footer>
    </div>
  );
}
