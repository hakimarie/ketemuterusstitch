import { MapPin, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <footer className="border-t border-gray-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <button onClick={() => scrollTo("hero")} className="inline-flex items-center gap-2 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"><MapPin className="h-5 w-5" /></span>
              <span className="text-lg font-bold text-gray-900">KetemuTerus</span>
            </button>
            <p className="mt-3 text-sm leading-6 text-gray-500">Bantuan Google Maps, profil bisnis, dan SEO lokal untuk usaha yang ingin lebih mudah ditemukan.</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500"><MapPin className="h-4 w-4" /> Jakarta, Indonesia</p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex flex-wrap gap-5 text-sm text-gray-600">
              <button onClick={() => scrollTo("services")} className="hover:text-blue-600">Layanan</button>
              <button onClick={() => scrollTo("portfolio")} className="hover:text-blue-600">Contoh Pekerjaan</button>
              <button onClick={() => scrollTo("faq")} className="hover:text-blue-600">FAQ</button>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/6281584229797" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-emerald-600"><MessageCircle className="h-4 w-4" /></a>
              <a href="https://www.instagram.com/babehdigital" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-blue-600"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-5 text-xs text-gray-400">© {year} KetemuTerus. Hak cipta dilindungi.</div>
      </div>
    </footer>
  );
}