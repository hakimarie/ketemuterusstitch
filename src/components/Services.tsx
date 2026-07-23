import { Compass, Code, Search, MapPin, Target, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export default function Services() {
  const servicesList = [
    {
      title: "Google Business Profile Optimization",
      description: "Maksimalkan klaim dan kelengkapan informasi profil bisnis Anda di Google. Kami kelola foto, produk, jam operasional, dan info penting agar selalu up-to-date.",
      icon: Compass,
      colorClass: "text-blue-500 bg-blue-50 border-blue-100",
      bullets: ["Setup & Verifikasi GBP", "Atribut Detail Lengkap", "Postingan Berkala GBP"],
    },
    {
      title: "Google Maps Ranking",
      description: "Dominasi persaingan lokal dengan menempatkan posisi bisnis Anda di peringkat 3 teratas (Local 3-Pack) Google Maps untuk menarik perhatian pencari terdekat.",
      icon: MapPin,
      colorClass: "text-emerald-500 bg-emerald-50 border-emerald-100",
      bullets: ["Kategori Utama Akurat", "Optimasi Koordinat Titik", "Pembersihan Duplikat"],
    },
    {
      title: "Website Development",
      description: "Pembuatan website modern yang sangat cepat (ultra-fast load time) dan mobile-friendly. Dilengkapi struktur SEO lokal untuk meningkatkan konversi kunjungan menjadi penjualan.",
      icon: Code,
      colorClass: "text-amber-500 bg-amber-50 border-amber-100",
      bullets: ["Mobile First Design", "Optimasi Kecepatan Core Web Vitals", "Tombol Konversi WhatsApp"],
    },
    {
      title: "Local SEO",
      description: "Optimalkan konten digital dan sitasi bisnis lokal agar muncul dalam pencarian Google Search lokal berdasarkan nama wilayah, kota, maupun daerah terdekat Anda.",
      icon: Search,
      colorClass: "text-indigo-500 bg-indigo-50 border-indigo-100",
      bullets: ["Riset Kata Kunci Lokal", "Pembangunan Sitasi Lokal", "Penyelarasan Nama-Alamat-Telepon (NAP)"],
    },
    {
      title: "Review Management",
      description: "Tingkatkan kredibilitas bisnis Anda dengan ulasan positif bintang 5 dari pelanggan asli secara konsisten. Kelola tanggapan ulasan secara profesional untuk memicu algoritma.",
      icon: MessageSquare,
      colorClass: "text-rose-500 bg-rose-50 border-rose-100",
      bullets: ["Sistem Pengumpul Ulasan Otomatis", "Manajemen Ulasan Negatif", "Templat Balasan Ulasan Profesional"],
    },
    {
      title: "Meta Ads (Facebook & Instagram)",
      description: "Iklankan promo kuliner, salon, atau produk lokal Anda kepada ribuan target konsumen potensial di wilayah sekitar radius lokasi bisnis Anda secara presisi.",
      icon: Target,
      colorClass: "text-cyan-500 bg-cyan-50 border-cyan-100",
      bullets: ["Radius Geografis Presisi", "Konten Kreatif Menarik", "Instalasi Pixel & Pelacakan"],
    },
    {
      title: "AI Marketing integration",
      description: "Manfaatkan kecerdasan buatan (AI) untuk melakukan riset kompetitor lokal, penulisan konten otomatis di sosial media, serta analisis sentimen ulasan secara cerdas.",
      icon: Sparkles,
      colorClass: "text-purple-500 bg-purple-50 border-purple-100",
      bullets: ["Riset Kompetitor Berbasis AI", "Post Penulisan Konten Otomatis", "Analisis Tren Kunjungan"],
    },
  ];

  const handleScrollToAuditor = () => {
    const element = document.getElementById("ai-auditor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Layanan Kami</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-text tracking-tight">
              Solusi Terlengkap untuk Menguasai <span className="text-brand-primary">Pencarian Lokal</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Kami merancang setiap strategi secara khusus untuk memastikan bisnis lokal Anda selalu berada di baris terdepan ketika calon pelanggan mencari produk Anda.
            </p>
          </div>
          <button
            onClick={handleScrollToAuditor}
            className="flex-shrink-0 bg-white border border-slate-200 hover:border-brand-primary text-slate-700 hover:text-brand-primary font-semibold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm active:scale-95"
          >
            Mulai Analisis Bisnis Anda <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${service.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-slate-800 tracking-tight leading-snug group-hover:text-brand-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bullets/Checklist */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <ul className="space-y-2.5">
                    {service.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-600 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
