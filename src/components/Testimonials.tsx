import { MessageSquare, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-blue-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <MessageSquare className="mx-auto mb-5 h-8 w-8 text-blue-300" />
        <h2 className="text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">Kepercayaan dibangun dari hasil yang bisa diperiksa.</h2>
        <div className="mx-auto mt-7 max-w-3xl rounded-2xl border border-blue-100 bg-white p-6 text-left sm:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Kami tidak membuat-buat cerita pelanggan.</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">Testimoni, foto proyek, dan angka performa akan ditampilkan setelah sumbernya dikonfirmasi dan izin publikasi tersedia. Sementara itu, kami menjelaskan ruang lingkup pekerjaan secara terbuka.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}