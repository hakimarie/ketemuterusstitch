import { useState } from "react";
import { ArrowUpRight, Compass, Star, TrendingUp, Laptop, CheckCircle2, Phone, MapPin } from "lucide-react";
import { PortfolioItem } from "../types";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"all" | "maps" | "reviews" | "websites">("all");

  const items: PortfolioItem[] = [
    {
      id: "1",
      businessName: "Optimasi Google Business Profile",
      category: "Visibilitas Lokal",
      metric: "Profil Bisnis",
      beforeValue: "Audit data & kelengkapan profil",
      afterValue: "Profil lebih lengkap dan konsisten",
      description: "Pemeriksaan kategori, jam operasional, layanan, foto, deskripsi, dan tautan profil. Dampak terhadap peringkat harus diukur setelah implementasi.",
      tags: ["Maps Ranking", "Cafe"],
    },
    {
      id: "2",
      businessName: "Pengelolaan Ulasan Pelanggan",
      category: "Reputasi Digital",
      metric: "Review Management",
      beforeValue: "Alur permintaan ulasan belum terstruktur",
      afterValue: "Permintaan ulasan yang netral dan konsisten",
      description: "Menyusun alur permintaan ulasan yang memudahkan semua pelanggan berbagi pengalaman secara jujur, tanpa menyaring hanya pelanggan yang diperkirakan memberi rating positif.",
      tags: ["Reviews", "Salon"],
    },
    {
      id: "3",
      businessName: "Website & Jalur Konversi",
      category: "Website Bisnis",
      metric: "Website Conversion",
      beforeValue: "Alur pengunjung perlu dievaluasi",
      afterValue: "CTA dan jalur kontak lebih jelas",
      description: "Mengevaluasi tampilan mobile, kejelasan layanan, kecepatan, formulir, dan tombol WhatsApp. Hasil diukur menggunakan analitik setelah implementasi.",
      tags: ["Web Dev", "Clinic"],
    },
    {
      id: "4",
      businessName: "Strategi Konten Lokal",
      category: "Konten & SEO Lokal",
      metric: "Local SEO",
      beforeValue: "Kebutuhan pencarian lokal dipetakan",
      afterValue: "Rencana konten dan pengukuran disusun",
      description: "Memetakan layanan, area layanan, pertanyaan calon pelanggan, dan konten yang relevan. Hindari menambahkan kata kunci secara tidak wajar ke nama bisnis.",
      tags: ["Maps Ranking", "Laundry"],
    }
  ];

  const filteredItems = activeTab === "all"
    ? items
    : items.filter(item => {
        if (activeTab === "maps") return item.tags.includes("Maps Ranking");
        if (activeTab === "reviews") return item.tags.includes("Reviews");
        if (activeTab === "websites") return item.tags.includes("Web Dev");
        return true;
      });

  return (
    <section id="portfolio" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Ruang Lingkup Layanan</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Area Optimasi yang Kami <span className="text-brand-primary">Buktikan</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Berikut contoh area pekerjaan yang dapat disesuaikan dengan kondisi bisnis. Hasil spesifik perlu diukur dan didukung data proyek yang terverifikasi.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "all" ? "bg-brand-primary text-white shadow-md shadow-blue-500/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua Proyek
          </button>
          <button
            onClick={() => setActiveTab("maps")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "maps" ? "bg-brand-primary text-white shadow-md shadow-blue-500/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Google Maps & Ranking
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "reviews" ? "bg-brand-primary text-white shadow-md shadow-blue-500/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Ulasan & Rating
          </button>
          <button
            onClick={() => setActiveTab("websites")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "websites" ? "bg-brand-primary text-white shadow-md shadow-blue-500/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Website & Konversi
          </button>
        </div>

        {/* Portfolio Bento/Card Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-800 tracking-tight">{item.businessName}</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-brand-primary px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.metric}
                  </span>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Before vs After Visual Panel */}
                <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-inner">
                  {/* Before */}
                  <div className="text-left space-y-1.5 border-r border-slate-100 pr-4">
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wider">Sebelum</span>
                    <div className="text-sm font-bold text-slate-400 line-through truncate font-sans">
                      {item.beforeValue}
                    </div>
                  </div>
                  {/* After */}
                  <div className="text-left space-y-1.5 pl-2">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 w-max">
                      Output yang ditargetkan
                    </span>
                    <div className="text-sm font-black text-emerald-600 truncate font-display">
                      {item.afterValue}
                    </div>
                  </div>
                </div>

              </div>

              {/* Tags & Action Link */}
              <div className="mt-8 pt-6 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-1.5">
                  {item.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2.5 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://wa.me/6281584229797?text=Halo%20KetemuTerus,%20saya%20melihat%20portfolio%20${encodeURIComponent(item.businessName)}%20dan%20tertarik%20menerapkan%20strategi%20serupa%20untuk%20bisnis%20saya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-blue-700 transition-colors group-hover:underline"
                >
                  Konsultasikan Kebutuhan <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
