import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTA() {
  const handleScrollToAuditor = () => {
    document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-left sm:px-10 sm:py-12">
          <p className="text-sm font-semibold text-brand-primary">Langkah berikutnya</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Ingin tahu apa yang perlu dibenahi dari bisnis Anda?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Mulai dari audit awal, atau ceritakan kebutuhan bisnis Anda lewat WhatsApp. Kami bantu menentukan langkah yang relevan.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleScrollToAuditor} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              Audit Gratis Sekarang <ArrowRight className="h-4 w-4" />
            </button>
            <a href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20berdiskusi%20tentang%20kebutuhan%20digital%20bisnis%20saya." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              <MessageCircle className="h-4 w-4" /> Tanya via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
