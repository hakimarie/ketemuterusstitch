import { Star, MessageSquare, Quote, CheckCircle } from "lucide-react";
import { TestimonialItem } from "../types";

export default function Testimonials() {
  const reviews: TestimonialItem[] = [
    {
      id: "1",
      name: "Budi Santoso",
      role: "Pemilik Selasih Cafe & Eatery",
      businessName: "Selasih Coffee",
      stars: 5,
      image: "BS",
      quote: "Sangat bersyukur mempercayakan Google Maps kami ke KetemuTerus. Sebelum dibantu, kedai kami sepi dan sulit dicari di Maps. Sekarang, setiap akhir pekan kedai kami selalu penuh oleh pelanggan baru yang menemukan rute kami lewat Google Maps. Visibilitas naik drastis!",
    },
    {
      id: "2",
      name: "Dewi Lestari",
      role: "Founder Glow Hair & Beauty Salon",
      businessName: "Glow Salon",
      stars: 5,
      image: "DL",
      quote: "Sistem pengumpul ulasan otomatis dari KetemuTerus bener-bener keren banget! Pelanggan salon kami sekarang dengan senang hati memberikan ulasan bintang 5 saat pembayaran di kasir. Peringkat Maps kami naik ke nomor 1 untuk area kota kami.",
    },
    {
      id: "3",
      name: "drg. Anton Wijaya",
      role: "Kepala Klinik Sehat Dental",
      businessName: "Sehat Dental Clinic",
      stars: 5,
      image: "AW",
      quote: "Website baru kami sangat cepat diakses dan struktur konversinya sangat matang. Pasien baru yang mendaftar via WhatsApp naik hampir 10 kali lipat dibanding website lama yang lemot dan membingungkan. Sangat direkomendasikan!",
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background visual dots */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-blue-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Ulasan Mitra</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Apa Kata Para <span className="text-brand-primary">Pemilik Bisnis?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Dengarkan langsung cerita sukses dari rekan bisnis lokal yang berhasil meningkatkan kunjungan dan omzet bersama KetemuTerus.
          </p>
        </div>

        {/* Large Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-slate-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-slate-100 font-sans select-none">
                <Quote className="w-10 h-10 text-slate-50 opacity-80" />
              </div>

              <div className="space-y-6">
                {/* Rating Stars */}
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans italic relative z-10">
                  "{review.quote}"
                </p>
              </div>

              {/* Owner Bio */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-display font-bold text-sm tracking-wider shadow-md shadow-blue-500/10">
                  {review.image}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base font-display flex items-center gap-1">
                    {review.name}
                    <CheckCircle className="w-4 h-4 text-brand-primary fill-current text-white flex-shrink-0" />
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-sans mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google Reviews Badge Mockup */}
        <div className="mt-16 bg-white border border-slate-100 p-6 rounded-2xl shadow-md max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-red-500 font-display font-extrabold text-xl">
              G
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base font-display">Rating Agensi KetemuTerus</h4>
              <p className="text-xs text-slate-500 font-sans">Ulasan Resmi Google Business Profile</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex text-amber-500 justify-end gap-0.5">
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
              </div>
              <p className="text-[10px] text-slate-500 font-sans mt-1">Berdasarkan 120+ ulasan agensi</p>
            </div>
            <div className="text-3xl font-extrabold text-slate-800 font-display">4.9</div>
          </div>
        </div>

      </div>
    </section>
  );
}
