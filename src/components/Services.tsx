import { Map, Star, Smartphone, ArrowRight } from "lucide-react";

export default function Services() {
  const servicesList = [
    { title: "Google Maps & Profil Bisnis", description: "Rapikan kategori, jam buka, alamat, foto, dan informasi kontak agar pelanggan mendapat informasi yang jelas.", icon: Map },
    { title: "Ulasan & Reputasi Online", description: "Bangun kebiasaan meminta ulasan secara wajar dan tanggapi masukan pelanggan dengan profesional.", icon: Star },
    { title: "Website Bisnis yang Praktis", description: "Tampilkan layanan, lokasi, dan cara menghubungi bisnis dalam website yang nyaman dibuka lewat ponsel.", icon: Smartphone },
  ];
  const openAudit = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.dispatchEvent(new Event("ketemuterus:open-audit")), 350);
  };

  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-blue-600">Layanan</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Apa yang bisa kami bantu?</h2>
          <p className="mt-4 text-base leading-7 text-gray-600">Fokus pada hal-hal yang membantu calon pelanggan menemukan dan menghubungi bisnis Anda.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return <article key={service.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-blue-100 hover:shadow-md sm:p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Icon className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
            </article>;
          })}
        </div>
        <div className="mt-9 text-center">
          <button onClick={openAudit} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">Cek kondisi bisnismu <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}