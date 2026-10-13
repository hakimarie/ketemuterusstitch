import { Quote } from "lucide-react";

export default function Testimonials() {
  const reviews: TestimonialItem[] = [];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background visual dots */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-blue-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Transparansi Hasil</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Bukti Kerja yang <span className="text-brand-primary">Dapat Diverifikasi</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Kami akan menampilkan testimoni dan studi kasus setelah identitas, hasil, serta izin publikasinya terverifikasi.
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

        <div className="max-w-2xl mx-auto mt-10 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <p className="font-semibold text-slate-800">Studi kasus terverifikasi sedang disiapkan.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Untuk saat ini, kami tidak menampilkan angka performa atau kutipan pelanggan yang belum dapat diverifikasi secara publik.</p>
        </div>

      </div>
    </section>
  );
}
