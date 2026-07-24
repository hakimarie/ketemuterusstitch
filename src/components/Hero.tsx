import { MapPin, Search, Star, Phone, CheckCircle2, MessageCircle, ArrowRight, Share2, Compass, ShieldCheck } from "lucide-react";

export default function Hero() {
  const scrollToAuditor = () => {
    const element = document.getElementById("ai-auditor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden flex items-center">
      {/* Decorative Grid and Gradients (Linear/Framer Inspired) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0"></div>
      
      {/* Soft gradient meshes */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-3xl -translate-x-1/2 z-0"></div>
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-100/30 blur-3xl translate-x-1/2 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand-primary text-xs font-semibold tracking-wide uppercase">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
              </span>
              Layanan Google Maps & Local SEO Terpercaya
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-text tracking-tight leading-[1.1] text-balance">
                Lebih Mudah <span className="text-brand-primary relative inline-block">Ditemukan.<span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-brand-primary/10 -z-10 rounded-full"></span></span><br />
                <span className="text-brand-secondary relative inline-block">Lebih Banyak<span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-brand-secondary/10 -z-10 rounded-full"></span></span> Pelanggan.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
                KetemuTerus membantu bisnis lokal Anda muncul di peringkat teratas **Google Maps** dan **Google Search**. Dapatkan ulasan positif, bangun reputasi terpercaya, dan datangkan pembeli baru setiap hari.
              </p>
            </div>

            {/* Target Audience Quick Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">☕ Cafe</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">🍔 Restaurant</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">💇 Salon</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">🏥 Clinic</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">🏋️ Gym</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">🧺 Laundry</span>
              <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">📦 UMKM</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                id="hero-cta-whatsapp"
                href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%20-%20Saya%20ingin%20konsultasi%20gratis%20untuk%20mengoptimalkan%20Google%20Business%20Profile%20bisnis%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary text-white text-center font-bold px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 text-base active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Konsultasi Gratis
              </a>
              <button
                id="hero-cta-audit"
                onClick={scrollToAuditor}
                className="bg-white border border-[#E2E8F0] text-[#0F172A] text-center font-bold px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-base active:scale-[0.98]"
              >
                ⚡ Audit Visibilitas Gratis
              </button>
            </div>

            {/* Trust and Rating Summary */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-bold text-slate-800">4.9 / 5.0</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              <p className="text-xs text-slate-500 font-sans">
                Telah dipercaya oleh <span className="font-semibold text-slate-700">500+ bisnis lokal</span> di seluruh Indonesia.
              </p>
            </div>
          </div>

          {/* Right Side: Maps Mockup and Floating Cards */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            
            {/* Google Maps Realistic HTML Mockup */}
            <div className="w-full max-w-2xl bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl relative z-10">
              
              {/* Google Maps Search Bar Header */}
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-4 flex items-center gap-3">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2.5 shadow-sm">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Google Maps..."
                    defaultValue="Coffee Shop Terdekat"
                    disabled
                    className="w-full text-xs text-slate-700 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 font-sans border border-white shadow-sm flex-shrink-0">
                  KT
                </div>
              </div>

              <div className="relative aspect-[16/10] bg-[#e3eae4] overflow-hidden flex items-center justify-center">
                {/* SVG Mockup background representing streets, roads, and landscape */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  {/* Land background colors */}
                  <rect width="100%" height="100%" fill="#f4f3f0" />
                  {/* Park areas */}
                  <path d="M 50,50 Q 150,120 200,80 T 400,180 L 350,300 L 100,250 Z" fill="#d9e9d6" />
                  <path d="M 450,20 Q 550,60 620,10 L 650,150 L 400,100 Z" fill="#d9e9d6" />
                  {/* River or water body */}
                  <path d="M -20,280 Q 200,260 300,340 T 700,360 L 700,450 L -20,450 Z" fill="#c3ecfa" />
                  
                  {/* Roads network */}
                  <path d="M -10,120 L 700,180" stroke="#ffffff" strokeWidth="20" fill="none" />
                  <path d="M -10,120 L 700,180" stroke="#fcfaf2" strokeWidth="16" fill="none" />

                  <path d="M 120,-10 L 180,450" stroke="#ffffff" strokeWidth="24" fill="none" strokeLinecap="round" />
                  <path d="M 120,-10 L 180,450" stroke="#fcfaf2" strokeWidth="18" fill="none" strokeLinecap="round" />

                  <path d="M 400,-10 Q 320,150 480,260 T 400,450" stroke="#ffffff" strokeWidth="20" fill="none" strokeLinecap="round" />
                  <path d="M 400,-10 Q 320,150 480,260 T 400,450" stroke="#fcfaf2" strokeWidth="14" fill="none" strokeLinecap="round" />

                  {/* Secondary small roads */}
                  <path d="M 160,140 L 420,140" stroke="#ffffff" strokeWidth="10" fill="none" />
                  <path d="M 450,200 L 600,280" stroke="#ffffff" strokeWidth="10" fill="none" />
                </svg>

                {/* Google Map Pin 1 - The Main Highlight */}
                <div className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2 group z-20">
                  <div className="relative cursor-pointer">
                    {/* Ring Pulse effect */}
                    <div className="absolute -inset-2.5 rounded-full bg-brand-primary/20 animate-ping"></div>
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white border-2 border-white shadow-lg relative z-10">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Mini floating card on pin */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-12 bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-semibold tracking-wide whitespace-nowrap shadow-xl z-30">
                    Kopi Ketemu Terus ☕
                  </div>
                </div>

                {/* Secondary standard pins */}
                <div className="absolute top-[60%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white border-2 border-white shadow-md cursor-pointer">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white border-2 border-white shadow-md cursor-pointer">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                {/* Floating Navigation Card Mockup inside Google Maps */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 max-w-xs text-left animate-float-slow z-20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary">
                      <Compass className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Navigasi Rute Aktif</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Selalu Berada di Peringkat #1 Teratas</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-[9px] font-bold bg-blue-100 text-brand-primary px-1.5 py-0.5 rounded">Tiba dalam 3 Mins</span>
                        <span className="text-[9px] text-slate-400">1.2 km</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Business Profile Mockup Sidebar/Card inside Google Maps */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 w-52 text-left z-20">
                  <div className="space-y-2.5">
                    <div className="aspect-[16/9] w-full bg-slate-100 rounded-lg overflow-hidden relative">
                      <img
                        src="/src/assets/images/luxury_cafe_atmosphere_1784623343636.jpg"
                        alt="Coffee Shop"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Sponsor
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        Kopi Ketemu Terus
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary fill-current text-white" />
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <Star className="w-2.5 h-2.5 fill-current" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600">4.9 (1.2k)</span>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">Kedai Kopi Premium · Jakarta</p>
                      <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                        <button className="flex-1 bg-brand-primary text-white py-1 rounded-md text-[8px] font-bold hover:bg-blue-600 flex items-center justify-center gap-0.5">
                          <Compass className="w-2 h-2" /> Rute
                        </button>
                        <button className="flex-1 bg-slate-100 text-slate-700 py-1 rounded-md text-[8px] font-bold hover:bg-slate-200 flex items-center justify-center gap-0.5">
                          <Phone className="w-2.5 h-2.5" /> Telepon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* FLOATING ANALYTICS CARDS (Required by Prompt) */}
            
            {/* Card 1: +180% Google Search Visibility */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 z-20 max-w-xs animate-float-slow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary flex-shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-2xl font-extrabold text-brand-primary tracking-tight font-display">+180%</span>
                <span className="text-xs font-medium text-slate-600 font-sans block">Google Search Visibility</span>
              </div>
            </div>

            {/* Card 2: ★★★★★ 4.9, 1,250 Reviews */}
            <div className="absolute -top-6 -left-6 bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl flex items-center gap-3 z-20 animate-float-slow" style={{ animationDelay: "1s" }}>
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-brand-accent flex-shrink-0">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-slate-800">★★★★★ 4.9</span>
                </div>
                <span className="text-xs font-medium text-slate-500 font-sans block">1,250 Reviews Aktif</span>
              </div>
            </div>

            {/* Card 3: Website Online, Google Business Verified */}
            <div className="absolute -bottom-6 right-6 bg-white border border-slate-100 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 z-20 animate-float-slow" style={{ animationDelay: "2s" }}>
              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary fill-current text-white" />
                  <span className="text-xs font-semibold text-slate-700">Website Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-primary fill-current text-white" />
                  <span className="text-xs font-semibold text-slate-700">Google Business Verified</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
