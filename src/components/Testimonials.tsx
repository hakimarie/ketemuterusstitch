import { ClipboardCheck, Eye, ShieldCheck, MessageCircle } from "lucide-react";

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
          <p className="mt-4 text-base leading-relaxed text-gray-600">Belum ada testimoni yang kami tampilkan. Untuk sekarang, Anda bisa menilai cara kerja, ruang lingkup, dan bukti yang digunakan sebelum memutuskan bekerja sama.</p>
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
        <div className="mt-6 grid gap-4 rounded-2xl border border-blue-200 bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Program studi kasus awal</p>
            <h3 className="mt-2 text-xl font-extrabold text-gray-900">Jadilah salah satu studi kasus pertama KetemuTerus.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">Punya screenshot Google Business Profile, dashboard, atau foto outlet? Ceritakan kondisi bisnis Anda. Kita diskusikan audit mendalam awal tanpa biaya sebagai calon studi kasus—publikasi hanya dilakukan dengan persetujuan Anda.</p>
          </div>
          <a href="https://wa.me/6281584229797?text=Halo%20KetemuTerus%2C%20saya%20tertarik%20menjadi%20studi%20kasus%20awal.%20Saya%20ingin%20diskusi%20tentang%20audit%20mendalam%20untuk%20bisnis%20saya." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"><MessageCircle className="h-4 w-4" /> Ajukan via WhatsApp</a>
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">Logo mitra, ulasan, testimoni, dan angka hasil hanya akan ditampilkan setelah sumber data serta izin publikasinya dikonfirmasi.</p>
      </div>
    </section>
  );
}
