import { ClipboardCheck, Eye, ShieldCheck } from "lucide-react";

const principles = [
  { icon: ClipboardCheck, title: "Ruang lingkup jelas", description: "Kami jelaskan apa yang diperiksa, apa yang belum tersedia, dan pekerjaan apa yang termasuk dalam rekomendasi." },
  { icon: Eye, title: "Temuan bisa ditinjau", description: "Kami membedakan data yang diberikan pemilik bisnis, observasi, dan hipotesis yang masih perlu diverifikasi." },
  { icon: ShieldCheck, title: "Tanpa klaim berlebihan", description: "Kami tidak menjanjikan posisi pertama Google atau menampilkan angka performa dan testimoni tanpa bukti serta izin." },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-blue-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Cara kami bekerja</p>
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">Kepercayaan dibangun dari proses yang transparan.</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">Kami memilih menjelaskan proses dan batasan layanan secara terbuka, bukan mengisi halaman dengan testimoni atau angka yang belum dapat dibuktikan.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5" /></div>
              <p className="mt-5 text-xs font-bold tracking-widest text-blue-600">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">Testimoni dan studi kasus pelanggan akan ditambahkan setelah sumber data dikonfirmasi dan izin publikasi diperoleh.</p>
      </div>
    </section>
  );
}