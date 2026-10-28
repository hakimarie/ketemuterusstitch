import { MessageSquare, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block mb-4">
          Transparansi & Kepercayaan
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
          Cerita Mitra, <span className="text-brand-primary">Dengan Izin Mereka</span>
        </h2>
        <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-left shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-lg">Kami hanya menampilkan testimoni yang dapat diverifikasi.</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Testimoni pelanggan dan rating publik akan ditampilkan setelah sumbernya diverifikasi dan izin publikasi diperoleh. Kami tidak menggunakan kutipan, nama pelanggan, atau angka ulasan yang belum dapat dikonfirmasi.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ingin mengetahui apakah layanan KetemuTerus sesuai untuk bisnis Anda? Hubungi tim kami untuk membahas kebutuhan, ruang lingkup pekerjaan, dan cara mengukur hasilnya.
              </p>
              <a
                href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20ingin%20berkonsultasi%20tentang%20layanan%20digital%20marketing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Konsultasi dengan Tim
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
