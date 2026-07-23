import { useState, useEffect } from "react";
import { Search, MapPin, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <MapPin className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-brand-text">
              Ketemu<span className="text-brand-primary">Terus</span>
            </span>
            <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1">
              Local Visibility
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            Layanan
          </button>
          <button
            onClick={() => scrollToSection("stats")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            Statistik
          </button>
          <button
            onClick={() => scrollToSection("gbp-importance")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            Mengapa GBP?
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            Testimoni
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-cta-audit"
            onClick={() => scrollToSection("ai-auditor")}
            className="text-sm font-semibold text-brand-primary hover:text-blue-700 px-4 py-2 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            Coba Audit Gratis <ArrowRight className="w-4 h-4" />
          </button>
          <a
            id="nav-cta-whatsapp"
            href="https://wa.me/6281234567890?text=Halo%20KetemuTerus%20-%20Saya%20tertarik%20dengan%20layanan%20optimasi%20bisnis%20saya%20agar%20lebih%20mudah%20ditemukan."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 hover:shadow-xl active:scale-[0.98]"
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Hamburguer */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <button
            onClick={() => scrollToSection("services")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Layanan
          </button>
          <button
            onClick={() => scrollToSection("stats")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Statistik
          </button>
          <button
            onClick={() => scrollToSection("gbp-importance")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Mengapa GBP?
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Testimoni
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-left py-2 font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            FAQ
          </button>
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("ai-auditor")}
              className="w-full text-center py-3 bg-slate-50 hover:bg-slate-100 text-brand-primary font-semibold rounded-full transition-all active:scale-[0.98]"
            >
              Coba Audit Gratis ⚡
            </button>
            <a
              href="https://wa.me/6281234567890?text=Halo%20KetemuTerus%20-%20Saya%20tertarik%20dengan%20layanan%20optimasi%20bisnis%20saya%20agar%20lebih%20mudah%20ditemukan."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-brand-primary hover:bg-blue-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
            >
              Konsultasi Gratis via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
