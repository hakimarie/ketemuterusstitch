import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTA() {
  const openAudit = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => window.dispatchEvent(new Event("ketemuterus:open-audit")), 350);
  };
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-[#FAFAFA] px-6 py-9 sm:px-10 sm:py-11">
          <p className="text-sm font-semibold text-blue-600">Mulai dari langkah sederhana</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">Mau tahu apa yang perlu dibenahi dari bisnismu?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">Cek kondisi awal atau ceritakan kebutuhanmu lewat WhatsApp. Kita bahas langkah yang paling masuk akal untuk bisnismu.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={openAudit} className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700">Cek Bisnismu <ArrowRight className="h-4 w-4" /></button>
            <a href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20diskusi%20tentang%20kebutuhan%20digital%20bisnis%20saya." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"><MessageCircle className="h-4 w-4" /> Tanya via WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}