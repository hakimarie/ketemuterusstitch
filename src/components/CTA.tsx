import { MessageCircle, ArrowRight, ShieldCheck, Zap, Compass } from "lucide-react";

export default function CTA() {
  const handleScrollToAuditor = () => {
    const element = document.getElementById("ai-auditor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-brand-primary to-blue-800 rounded-[32px] sm:rounded-[40px] p-8 sm:p-16 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
          
          {/* Decorative mesh background inside CTA card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl -ml-36 -mb-36 pointer-events-none"></div>

          <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
            
            {/* Quick trust pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-brand-accent fill-current" />
              Mulai Langkah Sukses Anda Hari Ini
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] text-balance">
              Siap Mendapatkan Lebih Banyak Pelanggan Baru?
            </h2>
            
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Jangan biarkan kompetitor Anda menguasai peringkat teratas Google Maps. Ambil tindakan sekarang, optimalkan visibilitas online Anda, dan lihat pelanggan berbondong-bondong datang.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                id="cta-whatsapp-primary"
                href="https://wa.me/6281584229797?text=Halo%20KetemuTerus,%20saya%20siap%20mengoptimalkan%20bisnis%20saya%20agar%20mendapatkan%20lebih%20banyak%20pelanggan%20baru."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-brand-secondary hover:bg-emerald-600 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98] flex items-center justify-center gap-2.5 text-base cursor-pointer"
              >
                <MessageCircle className="w-5.5 h-5.5 fill-current" />
                Hubungi via WhatsApp
              </a>
              <button
                id="cta-audit-secondary"
                onClick={handleScrollToAuditor}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 font-bold px-8 py-4.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-base active:scale-[0.98] cursor-pointer"
              >
                ⚡ Coba Audit Gratis
              </button>
            </div>

            {/* Fast Benefit checklist */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-6 border-t border-white/10 max-w-lg mx-auto">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100">
                <ShieldCheck className="w-4 h-4 text-brand-secondary fill-current text-blue-800" />
                <span>Tanpa Kontrak Mengikat</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100">
                <ShieldCheck className="w-4 h-4 text-brand-secondary fill-current text-blue-800" />
                <span>Dukungan CS 24/7</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100">
                <ShieldCheck className="w-4 h-4 text-brand-secondary fill-current text-blue-800" />
                <span>Garansi Akurasi 100%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
