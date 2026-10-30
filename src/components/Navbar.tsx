import { useState } from "react";
import { MapPin, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const openAudit = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
    window.setTimeout(() => window.dispatchEvent(new Event("ketemuterus:open-audit")), 350);
  };

  const navItems = [
    { label: "Layanan", id: "services" },
    { label: "How To", id: "how-it-works" },
    { label: "Solusi", id: "portfolio" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <header id="top-navbar" className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
        <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2.5 text-left" aria-label="KetemuTerus - ke bagian atas">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><MapPin className="h-5 w-5" /></span>
          <span className="text-xl font-bold tracking-tight text-gray-900">KetemuTerus</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-sm font-medium text-gray-600 transition hover:text-blue-600">{item.label}</button>)}
        </nav>

        <button type="button" onClick={openAudit} className="hidden min-h-11 items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 md:inline-flex">Audit Gratis <ArrowRight className="h-4 w-4" /></button>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden" aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => <button key={item.id} onClick={() => scrollToSection(item.id)} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50">{item.label}</button>)}
          </nav>
          <button type="button" onClick={openAudit} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"><ArrowRight className="h-4 w-4" /> Audit Gratis Sekarang</button>
        </div>
      )}
      <button type="button" onClick={openAudit} className="fixed inset-x-4 bottom-4 z-40 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-orange-900/20 ring-1 ring-white/70 transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 md:hidden" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        Audit Gratis Sekarang <ArrowRight className="h-5 w-5" />
      </button>
    </header>
  );
}