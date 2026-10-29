import { Compass, Code, Search, MessageSquare, ArrowRight } from "lucide-react";

export default function Services() {
  const servicesList = [
    {
      title: "Google Business Profile",
      description: "Kami bantu menyiapkan dan merapikan profil bisnis di Google, mulai dari kategori, jam operasional, foto, hingga informasi kontak.",
      icon: Compass,
      bullets: ["Penyiapan dan kelengkapan profil", "Kategori dan informasi bisnis", "Foto dan pembaruan profil"],
    },
    {
      title: "Google Maps & Local SEO",
      description: "Bantu pelanggan menemukan bisnis Anda saat mencari layanan di area sekitar, dengan informasi dan konten lokal yang relevan.",
      icon: Search,
      bullets: ["Evaluasi kata kunci lokal", "Perbaikan informasi bisnis", "Pemeriksaan konsistensi data"],
    },
    {
      title: "Website untuk Bisnis",
      description: "Website yang mudah dibuka di ponsel, menjelaskan layanan dengan jelas, dan memudahkan calon pelanggan menghubungi Anda.",
      icon: Code,
      bullets: ["Tampilan mobile-friendly", "Informasi layanan yang jelas", "Tombol kontak dan WhatsApp"],
    },
    {
      title: "Ulasan & Promosi Digital",
      description: "Bantu mengelola respons ulasan dan menjangkau pelanggan melalui kanal digital yang sesuai dengan kebutuhan bisnis.",
      icon: MessageSquare,
      bullets: ["Panduan membalas ulasan", "Pengelolaan reputasi online", "Dukungan promosi digital"],
    },
  ];

  const handleScrollToAuditor = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="services" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl text-left">
            <p className="mb-3 text-sm font-semibold text-brand-primary">Layanan</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand-text sm:text-4xl">
              Bantuan digital untuk bisnis lokal
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Pilih bagian yang paling dibutuhkan bisnis Anda. Kami mulai dari kondisi saat ini, lalu menyusun langkah perbaikan yang masuk akal.
            </p>
          </div>
          <button onClick={handleScrollToAuditor} className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 md:self-auto">
            Audit Gratis <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
