import { MapPin, Mail, Phone, MessageCircle, ArrowRight, Star, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-[#F8FAFC] text-[#64748B] border-t border-[#E2E8F0] pt-20 pb-10 relative overflow-hidden z-10">
      
      {/* Decorative linear grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Intro */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection("hero")}>
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-[#0F172A]">
                  Ketemu<span className="text-brand-primary">Terus</span>
                </span>
                <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1">
                  Local Visibility
                </span>
              </div>
            </div>
            
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed max-w-sm">
              KetemuTerus adalah mitra agensi pemasaran lokal premium yang berdedikasi membantu UMKM, restoran, cafe, salon, dan klinik di Indonesia mendominasi peringkat penelusuran peta digital.
            </p>

            <div className="flex items-center gap-1.5 pt-2">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-[#0F172A]">4.9 Ratings</span>
            </div>
          </div>

          {/* Quick Navigation links */}
          <div className="md:col-span-3 text-left space-y-5">
            <h4 className="font-display font-bold text-sm text-[#0F172A] uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  <span>Layanan Optimasi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("stats")}
                  className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  <span>Statistik Hasil</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  <span>Metodologi Kerja</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  <span>Portfolio Sukses</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  <span>Tanya Jawab FAQ</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 text-left space-y-5">
            <h4 className="font-display font-bold text-sm text-[#0F172A] uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-sans">
                  Jl Swadaya Ujung No 23, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <a href="tel:+6281584229797" className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors font-sans">
                  +62 815-8422-9797
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <a href="mailto:babehdigital2025@gmail.com" className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors font-sans">
                  babehdigital2025@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Base */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-400 font-sans">
            &copy; {currentYear} KetemuTerus. All rights reserved. Made in Indonesia for Local Businesses.
          </p>
          
         <div className="flex gap-4">
  
    href="https://wa.me/6281584229797"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] hover:bg-brand-primary hover:text-white text-slate-500 flex items-center justify-center transition-all shadow"
    aria-label="WhatsApp Link"
  >
    <MessageCircle className="w-4.5 h-4.5 fill-current" />
  </a>

  
    href="https://www.instagram.com/babehdigital"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] hover:bg-brand-primary hover:text-white text-slate-500 flex items-center justify-center transition-all shadow"
    aria-label="Instagram Link"
  >
    <Instagram className="w-4.5 h-4.5" />
  </a>

  
    href="https://www.tiktok.com/@ketemuterus.biz.id"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] hover:bg-brand-primary hover:text-white text-slate-500 flex items-center justify-center transition-all shadow"
    aria-label="TikTok Link"
  >
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.62h-3.15v13.7c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.32 0 .63.05.92.15V9.9a6.1 6.1 0 0 0-.92-.07A6.07 6.07 0 0 0 3.1 15.9 6.07 6.07 0 0 0 9.17 22a6.07 6.07 0 0 0 6.07-6.1V9.4a9.1 9.1 0 0 0 5.34 1.71V7.96a5.6 5.6 0 0 1-3.98-2.14Z"/>
    </svg>
  </a>
</div>
        </div>

      </div>
    </footer>
  );
}
