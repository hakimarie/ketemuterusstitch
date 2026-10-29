import { MapPin, Search, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  const scrollToAuditor = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="bg-white pb-20 pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl text-left">
          <p className="mb-5 text-sm font-semibold text-brand-primary">Google Maps & Local SEO untuk bisnis lokal</p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
            Biar bisnis Anda lebih mudah ditemukan.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Kami bantu merapikan profil Google Business, meningkatkan visibilitas di pencarian lokal, dan membuat calon pelanggan lebih mudah menemukan bisnis Anda.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              id="hero-cta-audit"
              onClick={scrollToAuditor}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Audit Gratis Sekarang <ArrowRight className="h-4 w-4" />
            </button>
            <a
              id="hero-cta-whatsapp"
              href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20bertanya%20tentang%20Google%20Business%20Profile%20dan%20Local%20SEO."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4" /> Tanya via WhatsApp
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Untuk UMKM dan bisnis lokal</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Rekomendasi yang mudah dipahami</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700"><MapPin className="h-5 w-5" /></div>
              <div>
                <p className="font-semibold text-slate-900">Profil bisnis di Google</p>
                <p className="text-sm text-slate-500">Hal yang dilihat calon pelanggan</p>
              </div>
            </div>
            <div className="space-y-5 p-5 sm:p-7">
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <Search className="h-5 w-5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Nama dan kategori bisnis</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Pastikan informasi utama jelas dan sesuai dengan layanan Anda.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Jam buka, foto, dan kontak</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Informasi lengkap membantu pelanggan mengambil keputusan.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
                <MessageCircle className="h-5 w-5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Ulasan dan respons pelanggan</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Tanggapi ulasan dengan baik dan jaga informasi tetap terbaru.</p>
                </div>
              </div>
              <p className="border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400">
                Ilustrasi informasi profil, bukan hasil audit atau data performa bisnis tertentu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
