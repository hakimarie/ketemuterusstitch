import { Search, Settings, TrendingUp, ArrowRight, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: "01",
      title: "Audit Visibilitas Lokal",
      subtitle: "Diagnosis Awal Komprehensif",
      description: "Kami menganalisis ulasan, keselarasan nama-alamat-telepon (NAP), akurasi kategori bisnis, serta peringkat pencarian Google Maps kompetitor terdekat Anda secara mendetail.",
      icon: Search,
      badgeText: "Langkah 1",
      colorClass: "from-blue-500 to-blue-600 shadow-blue-500/20",
    },
    {
      stepNumber: "02",
      title: "Optimalisasi Google Profile",
      subtitle: "Penyusunan & Perbaikan Mutu",
      description: "Tim ahli kami mendaftarkan, memverifikasi, dan merestrukturisasi 100% informasi profil bisnis lokal Anda. Kami optimalkan foto premium, jam libur, ulasan otomatis, dan integrasi WhatsApp.",
      icon: Settings,
      badgeText: "Langkah 2",
      colorClass: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
    },
    {
      stepNumber: "03",
      title: "Pertumbuhan & Dominasi",
      subtitle: "Peningkatan Konversi & Pelanggan",
      description: "Melalui dorongan ulasan berkala, pengelolaan postingan GBP, serta kampanye iklan berbayar (Meta Ads) bertarget lokal, kami dorong bisnis Anda ke puncak radar 3-Pack Maps Google secara berkelanjutan.",
      icon: TrendingUp,
      badgeText: "Langkah 3",
      colorClass: "from-amber-500 to-amber-600 shadow-amber-500/20",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Mesh background vectors */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-emerald-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Metodologi Kami</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Bagaimana Cara Kami Membantu Bisnis Anda <span className="text-brand-primary">Tumbuh?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Proses kerja yang transparan, terstruktur, dan terukur untuk mengubah kehadiran online Anda menjadi mesin penarik konsumen yang tak terbendung.
          </p>
        </div>

        {/* Timeline Style Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[48px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 to-amber-200 -z-10"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative space-y-6"
              >
                {/* Step Number Badge */}
                <div className="absolute top-6 right-8 text-5xl font-black font-display text-slate-100 tracking-tight select-none">
                  {step.stepNumber}
                </div>

                {/* Icon Container with gradient shadow */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.colorClass} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase block">
                    {step.badgeText}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-800 tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <span className="block text-xs font-semibold text-slate-400">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                  {step.description}
                </p>

                {/* Footer status/arrow */}
                <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-semibold text-brand-primary">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

              </div>
            );
          })}
        </div>

        {/* Final Call to Action Link */}
        <div className="mt-16 text-center">
          <a
            href="https://wa.me/6281234567890?text=Halo%20KetemuTerus,%20saya%20ingin%20memulai%20langkah%20audit%20awal%20dan%20optimasi%20Google%20Maps%20bisnis%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-blue-700 hover:underline transition-all"
          >
            <span>Konsultasikan Langkah Pertama Bisnis Anda</span>
            <MessageCircle className="w-4.5 h-4.5 fill-current" />
          </a>
        </div>

      </div>
    </section>
  );
}
