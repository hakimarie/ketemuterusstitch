import { Users, Heart, Calendar, ShieldCheck } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      value: "500+",
      label: "Mitra Bisnis",
      description: "Bisnis lokal yang berhasil kami bantu tumbuh",
      icon: Users,
      colorClass: "text-blue-500 bg-blue-50",
    },
    {
      value: "95%",
      label: "Happy Clients",
      description: "Tingkat kepuasan layanan dan pencapaian target",
      icon: Heart,
      colorClass: "text-emerald-500 bg-emerald-50",
    },
    {
      value: "10+",
      label: "Years Experience",
      description: "Pengalaman di bidang pemasaran digital lokal",
      icon: Calendar,
      colorClass: "text-amber-500 bg-amber-50",
    },
    {
      value: "24/7",
      label: "Support",
      description: "Konsultasi dan pendampingan tanpa henti",
      icon: ShieldCheck,
      colorClass: "text-indigo-500 bg-indigo-50",
    },
  ];

  return (
    <section id="stats" className="py-20 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-left space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.colorClass} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="block text-4xl font-extrabold font-display tracking-tight text-slate-800">
                    {stat.value}
                  </span>
                  <span className="block text-sm font-bold text-slate-700 font-sans">
                    {stat.label}
                  </span>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
