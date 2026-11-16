import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
} from "lucide-react";

const WA = "https://wa.me/6281584229797?text=";
const consultationLink = WA + encodeURIComponent("Halo KetemuTerus, saya ingin konsultasi tentang Local SEO dan optimasi Google Maps untuk bisnis saya.");

const serviceAreas = [
  {
    icon: Store,
    title: "Google Business Profile",
    description: "Rapikan informasi bisnis, kategori, jam operasional, layanan, foto, dan elemen profil lain agar calon pelanggan memperoleh informasi yang jelas.",
  },
  {
    icon: MapPin,
    title: "Optimasi Google Maps",
    description: "Perkuat relevansi dan kelengkapan profil bisnis untuk membantu pelanggan memahami lokasi, penawaran, dan cara mengunjungi bisnis Anda.",
  },
  {
    icon: Search,
    title: "Local SEO",
    description: "Bangun fondasi pencarian lokal melalui konsistensi informasi, konten yang relevan, struktur website, dan hubungan ant kanal digital.",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "Susun proses pengelolaan ulasan pelanggan secara etis: memudahkan pelanggan memberi masukan dan membantu bisnis merespons dengan tepat.",
  },
];

const process = [
  ["01", "Pahami bisnis dan area layanan", "Kami mulai dengan memahami jenis bisnis, pelanggan yang ingin dijangkau, lokasi operasional, dan layanan yang paling penting."],
  ["02", "Audit fondasi visibilitas lokal", "Kami meninjau informasi Google Business Profile, website, konsistensi data bisnis, konten, dan faktor relevansi lokal yang dapat diperiksa."],
  ["03", "Susun prioritas optimasi", "Temuan diterjemahkan menjadi daftar tindakan yang realistis berdasarkan dampak, kesiapan aset, dan kebutuhan bisnis."],
  ["04", "Implementasi dan evaluasi", "Perbaikan dilakukan sesuai ruang lingkup yang disepakati. Perkembangan dievaluasi menggunakan indikator yang tersedia dan dapat diverifikasi."],
];

const faqs = [
  {
    question: "Apa perbedaan Google Business Profile, Google Maps, dan Local SEO?",
    answer: "Google Business Profile adalah profil bisnis yang dikelola pemilik atau pengelola bisnis. Informasi profil tersebut dapat tampil di Google Search dan Google Maps. Local SEO merupakan upaya yang lebih luas untuk membantu bisnis relevan pada pencarian berdasarkan lokasi, termasuk optimasi profil, website, konsistensi informasi, dan konten.",
  },
  {
    question: "Apakah bisnis harus memiliki website untuk optimasi Google Maps?",
    answer: "Tidak selalu. Google Business Profile dapat digunakan tanpa website. Namun, website yang relevan dan informatif dapat menjadi aset pendukung untuk menjelaskan layanan, area operasional, dan informasi bisnis secara lebih lengkap.",
  },
  {
    question: "Apakah KetemuTerus menjamin bisnis masuk peringkat pertama Google Maps?",
    answer: "Tidak. Posisi hasil lokal dipengaruhi berbagai faktor dan dapat berbeda menurut konteks pencarian, lokasi, serta waktu. KetemuTerus berfokus pada praktik optimasi yang relevan dan evaluasi yang transparan, bukan menjanjikan peringkat tertentu.",
  },
  {
    question: "Apakah ulasan Google bisa dibeli atau dibuatkan?",
    answer: "Kami tidak menganjurkan ulasan palsu, ulasan berbayar, atau manipulasi rating. Pengelolaan ulasan sebaiknya membantu pelanggan nyata menyampaikan pengalaman mereka secara sukarela dan sesuai kebijakan platform.",
  },
  {
    question: "Berapa lama hasil Local SEO dapat terlihat?",
    answer: "Tidak ada waktu hasil yang berlaku untuk semua bisnis. Kondisi awal profil, persaingan, lokasi, kategori, kualitas informasi, dan perubahan algoritma dapat memengaruhi perkembangan. Karena itu, prioritas dan indikator evaluasi perlu ditetapkan berdasarkan kondisi bisnis.",
  },
  {
    question: "Apakah layanan ini hanya untuk restoran dan coffee shop?",
    answer: "F&B merupakan salah satu fokus KetemuTerus, tetapi pendekatan visibilitas lokal juga relevan untuk berbagai bisnis lokal seperti barbershop, salon, retail, dan penyedia jasa. Strateginya disesuaikan dengan karakter masing-masing bisnis.",
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

export default function LocalSeoGoogleMapsPage() {
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
          <a href={consultationLink} target="_blank" rel="noreferrer" className="ml-auto hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 lg:inline-flex">
            Konsultasi Bisnis <ArrowUpRight className="h-4 w-4" />
          </a>
          <button className="rounded-xl border border-slate-200 p-2.5 text-slate-700 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
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
            <li className="font-semibold text-slate-700" aria-current="page">Local SEO & Google Maps</li>
          </ol>
        </nav>

        <section className="relative isolate mt-4 overflow-hidden bg-[#F5F8FF] py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -right-40 -top-28 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-44 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-100/70 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> LOCAL BUSINESS VISIBILITY
              </div>
              <h1 className="text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.65rem]">
                Jasa Local SEO & Optimasi Google Maps untuk Bisnis Lokal
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Bantu calon pelanggan menemukan dan memahami bisnis Anda saat mencari produk atau layanan di sekitar mereka. KetemuTerus membantu UMKM membangun visibilitas lokal melalui Google Business Profile, Google Maps, Local SEO, dan pengelolaan ulasan.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={consultationLink} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                  <MessageCircle className="h-5 w-5" /> Konsultasi via WhatsApp
                </a>
                <a href="#cakupan-layanan" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                  Lihat cakupan layanan <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-5 text-xs leading-6 text-slate-500">Tidak ada janji peringkat tertentu. Strategi ditentukan berdasarkan kondisi dan kebutuhan bisnis.</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <SectionHeading eyebrow="Mengapa visibilitas lokal penting" title="Hadir ketika pelanggan mencari, bukan sekadar punya profil." description="Pencarian lokal sering menjadi langkah awal sebelum seseorang menghubungi atau mengunjungi bisnis. Informasi yang lengkap dan konsisten membantu calon pelanggan menilai apakah bisnis Anda sesuai dengan kebutuhan mereka." />
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <Search className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Mudah dipahami</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Nama, kategori, layanan, jam operasional, dan informasi penting tersaji dengan jelas.</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Lebih meyakinkan</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Foto, ulasan pelanggan, dan respons bisnis membantu membangun kepercayaan secara autentik.</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Informasi lokasi jelas</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Pelanggan dapat memahami lokasi, area layanan, dan cara menghubungi bisnis.</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">Dapat dievaluasi</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Indikator yang tersedia membantu bisnis memahami aktivitas dan menentukan perbaikan berikutnya.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="cakupan-layanan" className="scroll-mt-8 bg-[#F7F9FC] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Cakupan layanan" title="Optimasi yang saling mendukung." description="Local SEO bukan satu tombol atau satu perubahan. Kami melihat elemen yang relevan dengan cara pelanggan menemukan, menilai, dan menghubungi bisnis." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {serviceAreas.map(({ icon: Icon, title, description }, index) => (
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
            <SectionHeading eyebrow="Cara kerja" title="Mulai dari kondisi bisnis, lalu tentukan prioritas." description="Setiap bisnis memiliki kategori, area persaingan, dan kesiapan digital yang berbeda. Karena itu, urutan optimasi tidak dibuat seragam." />
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
              <SectionHeading eyebrow="Untuk siapa layanan ini" title="Dibangun untuk kebutuhan bisnis lokal." description="Pendekatan visibilitas lokal dapat disesuaikan untuk restoran, coffee shop, barbershop, salon, retail, dan penyedia jasa. Fokusnya bukan sekadar mengejar tayangan, tetapi memastikan informasi bisnis membantu calon pelanggan mengambil langkah berikutnya." />
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Restoran dan usaha F&B", "Coffee shop dan kedai kopi", "Barbershop dan salon", "Retail dan toko lokal", "Penyedia jasa profesional", "Bisnis dengan lokasi fisik"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>
                ))}
              </ul>
            </div>
            <aside className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5">
              <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
              <h3 className="mt-4 text-xl font-extrabold text-slate-950">Ulasan pelanggan harus tetap autentik.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Kami mendorong proses yang memudahkan pelanggan nyata memberikan ulasan secara sukarela. Tidak menggunakan ulasan palsu, pembelian rating, atau janji manipulasi reputasi.</p>
              <a href="/#case-studies" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800">Lihat studi kasus KetemuTerus <ArrowRight className="h-4 w-4" /></a>
            </aside>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-7 lg:px-8">
            <SectionHeading eyebrow="Pertanyaan umum" title="FAQ Local SEO dan Google Maps" description="Jawaban singkat untuk membantu Anda memahami ruang lingkup dan ekspektasi optimasi visibilitas lokal." />
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
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Ingin bisnis lebih mudah ditemukan pelanggan lokal?</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">Diskusikan kondisi Google Business Profile, Google Maps, dan fondasi digital bisnis Anda bersama KetemuTerus.</p>
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
