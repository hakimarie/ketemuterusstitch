import { CheckCircle2, TrendingUp, Users, Search, Star, Camera, Landmark } from "lucide-react";
import luxuryCafeImage from "../assets/images/luxury_cafe_atmosphere_1784623343636.jpg";

export default function GbpImportance() {
  const checklist = [
    {
      title: "Google Maps Presence",
      description: "Memungkinkan bisnis Anda terdaftar secara fisik di peta navigasi Google, memudahkan calon pembeli menemukan rute perjalanan tercepat ke lokasi Anda.",
      icon: Search,
    },
    {
      title: "Google Search Visibility",
      description: "Muncul secara otomatis di halaman pencarian utama Google ketika konsumen mencari kata kunci yang relevan dengan bisnis Anda.",
      icon: TrendingUp,
    },
    {
      title: "Review Management",
      description: "Menjadi wadah ulasan (feedback) bintang 5 yang terpercaya untuk membangun reputasi sosial (social proof) yang sangat kuat bagi calon konsumen baru.",
      icon: Star,
    },
    {
      title: "Photos & Visuals Portfolio",
      description: "Menampilkan foto interior mewah, produk terlaris, daftar harga, dan suasana toko fisik Anda secara langsung di hasil pencarian teratas.",
      icon: Camera,
    },
    {
      title: "Business Information Transparency",
      description: "Menyediakan jam operasional libur, nomor WhatsApp aktif, tautan reservasi, dan alamat fisik terlengkap untuk mengantisipasi hilangnya calon pembeli.",
      icon: Landmark,
    },
  ];

  const handleScrollToAuditor = () => {
    const element = document.getElementById("ai-auditor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="gbp-importance" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Large Premium Image + Floating trust cards */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-[32px] rotate-2 scale-[1.02] -z-10 opacity-60"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-square sm:aspect-[4/3] lg:aspect-square">
              <img
                src={luxuryCafeImage}
                alt="Luxury Coffee Shop Atmosphere"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                <span className="text-[10px] bg-brand-secondary text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  Aura Premium
                </span>
                <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                  "Desain suasana yang tepat memicu peningkatan kunjungan fisik hingga 80%."
                </h4>
              </div>
            </div>

            {/* Floating Badge on top left of image */}
            <div className="absolute -top-6 -left-6 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 z-20 max-w-xs animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-brand-secondary flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-extrabold text-slate-800 font-display">4x Lipat</span>
                <span className="text-[10px] text-slate-500 font-sans block">Kunjungan Rute Terbukti</span>
              </div>
            </div>

            {/* Floating rating badge bottom right of image */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3 z-20 animate-float-slow" style={{ animationDelay: "1.5s" }}>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-accent">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-extrabold font-display">92% Konsumen</span>
                <span className="text-[10px] text-slate-400 font-sans block">Memilih bisnis dengan GBP lengkap</span>
              </div>
            </div>
          </div>

          {/* Right Side: Key Checklist Explanation */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Strategi Inti Lokal</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-text tracking-tight">
                Mengapa <span className="text-brand-primary">Google Business Profile</span> Sangat Menentukan Omzet Anda?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Di era digital sekarang, Google Business Profile adalah pintu gerbang utama fisik toko Anda. Lebih dari **84% penelusuran konsumen** adalah pencarian menemukan bisnis terdekat yang siap dikunjungi hari itu juga.
              </p>
            </div>

            {/* Structured Checklist Grid */}
            <div className="space-y-6">
              {checklist.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-primary flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base font-display">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={handleScrollToAuditor}
                className="bg-brand-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/15 hover:shadow-xl hover:scale-[1.02] active:scale-95 text-sm"
              >
                Analisis Google Profile Anda Sekarang
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
