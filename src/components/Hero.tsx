import { MapPin, Search, MessageCircle, ArrowRight, Star, Navigation, Clock3 } from "lucide-react";

export default function Hero() {
  const openAudit = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.dispatchEvent(new Event("ketemuterus:open-audit")), 350);
  };

  return (
    <section id="hero" className="bg-[#FAFAFA] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
            <MapPin className="h-4 w-4" /> Google Maps & SEO Lokal
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
            Bikin bisnismu <span className="text-blue-600">gampang dicari.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg lg:mx-0">
            Kami bantu merapikan profil Google dan informasi bisnismu supaya calon pelanggan lebih mudah menemukan lokasi, layanan, dan kontakmu.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button id="hero-cta-audit" onClick={openAudit} className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Cek Bisnismu <ArrowRight className="h-4 w-4" />
            </button>
            <a id="hero-cta-whatsapp" href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20bertanya%20tentang%20Google%20Maps%20dan%20SEO%20lokal." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-medium text-gray-700 transition hover:bg-gray-50">
              <MessageCircle className="h-4 w-4" /> Tanya via WhatsApp
            </a>
          </div>
          <div className="mt-9 border-t border-gray-200 pt-6">
            <p className="mb-4 text-sm font-medium text-gray-500">Cocok untuk berbagai bisnis lokal</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-gray-500 lg:justify-start">
              <span>Cafe & restoran</span><span>Salon</span><span>Klinik</span><span>Laundry</span><span>Toko lokal</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-5 flex items-center gap-3 rounded-full bg-gray-100 px-4 py-3">
              <Search className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Contoh tampilan bisnis di Google</span>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 sm:h-20 sm:w-20"><MapPin className="h-8 w-8" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-gray-900">Nama Bisnis Anda</p>
                  <p className="mt-1 text-sm text-gray-500">Kategori bisnis · Area layanan</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600"><Navigation className="h-3.5 w-3.5" /> Petunjuk arah</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600"><Clock3 className="h-3.5 w-3.5" /> Jam buka</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white bg-white p-3"><p className="text-xs text-gray-500">Informasi bisnis</p><p className="mt-1 text-sm font-semibold text-gray-800">Alamat & kontak</p></div>
                <div className="rounded-xl border border-white bg-white p-3"><p className="text-xs text-gray-500">Reputasi online</p><p className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-800"><Star className="h-4 w-4 text-amber-500" /> Ulasan pelanggan</p></div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-gray-400">Ilustrasi konsep, bukan tangkapan layar Google atau data bisnis nyata.</p>
          </div>
        </div>
      </div>
    </section>
  );
}