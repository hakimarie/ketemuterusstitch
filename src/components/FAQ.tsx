import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { FAQItem } from "../types";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("1");

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "Apa itu Google Business Profile (GBP) dan mengapa bisnis saya membutuhkannya?",
      answer: "Google Business Profile (sebelumnya Google My Business) adalah alat gratis dari Google yang memungkinkan Anda mengelola kehadiran bisnis lokal Anda di Google Search dan Google Maps. Memiliki profil yang teroptimasi sangat krusial karena membantu pelanggan lokal menemukan rute toko, membaca ulasan tepercaya, melihat foto produk, dan langsung menghubungi Anda via WhatsApp.",
    },
    {
      id: "2",
      question: "Berapa lama waktu yang dibutuhkan untuk melihat hasil optimasi Google Maps?",
      answer: "Biasanya, perbaikan profil dasar (seperti kelengkapan data, pembenahan koordinat, dan jam operasional) dapat terlihat perubahannya di Google Maps dalam 3-5 hari kerja. Namun, untuk melihat peningkatan peringkat penelusuran kata kunci utama Anda masuk ke dalam radar Top 3-Pack lokal secara konsisten, dibutuhkan waktu penguatan sekitar 15-30 hari.",
    },
    {
      id: "3",
      question: "Apakah optimasi ini aman dan mematuhi kebijakan Google?",
      answer: "Ya, 100% aman. Tim KetemuTerus selalu mengikuti pedoman resmi (Official Guidelines) dari Google Business Profile. Kami tidak menggunakan teknik 'Black-Hat' maupun manipulasi ulasan palsu, melainkan mengandalkan optimasi struktur data, sitasi lokal berkualitas, serta sistem pengumpulan ulasan asli dari pelanggan loyal Anda.",
    },
    {
      id: "4",
      question: "Bagaimana cara kerja sistem pengumpul ulasan otomatis (Review Management)?",
      answer: "Kami merancang QR-Code khusus yang ditempatkan secara elegan di meja kasir atau diintegrasikan ke sistem struk digital bisnis Anda. Ketika pelanggan memindai QR tersebut, mereka diarahkan ke halaman penyaringan ulasan pintar. Pelanggan yang puas akan dipandu langsung untuk memberikan ulasan bintang 5 secara mudah di Google Maps Anda.",
    },
    {
      id: "5",
      question: "Apakah saya harus memiliki website sendiri untuk memulai layanan ini?",
      answer: "Tidak harus, namun sangat direkomendasikan. Jika Anda belum memiliki website, kami menyediakan paket pembuatan Website khusus yang super cepat, responsif di HP, dan dilengkapi struktur integrasi tombol konversi WhatsApp. Website yang dioptimasi dengan baik akan meningkatkan skor relevansi GBP Anda di mata Google.",
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Pertanyaan Populer</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-text tracking-tight">
            Punya Pertanyaan Mengenai <span className="text-brand-primary">Layanan Kami?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Berikut adalah jawaban dari beberapa pertanyaan yang paling sering diajukan oleh calon mitra bisnis lokal kami.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen ? "bg-slate-50/50 border-brand-primary/20 shadow-md" : "bg-white border-slate-100 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? "text-brand-primary" : "text-slate-400"}`} />
                    <span className="font-display font-bold text-sm sm:text-base text-slate-800 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-primary" : ""}`} />
                </button>
                
                {/* Expandable Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <div className="p-6 text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky footer for more queries */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-slate-800 text-sm sm:text-base font-display">Masih memiliki pertanyaan lain?</h4>
            <p className="text-xs text-slate-500 font-sans">Hubungi langsung tim ahli kami untuk mendapatkan penjelasan detail.</p>
          </div>
          <a
            id="faq-whatsapp-cta"
            href="https://wa.me/6281584229797?text=Halo%20KetemuTerus,%20saya%20memiliki%20pertanyaan%20mengenai%20layanan%20optimasi%20digital%20lokal."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-brand-primary text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4.5 h-4.5 fill-current" />
            Tanya via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
