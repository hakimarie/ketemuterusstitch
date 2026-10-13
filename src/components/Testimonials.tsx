export default function Testimonials() {
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



        <div className="max-w-2xl mx-auto mt-10 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <p className="font-semibold text-slate-800">Studi kasus terverifikasi sedang disiapkan.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Untuk saat ini, kami tidak menampilkan angka performa atau kutipan pelanggan yang belum dapat diverifikasi secara publik.</p>
        </div>

      </div>
    </section>
  );
}
