import { Coffee, Utensils, Scissors, Dumbbell, Shirt, ShieldCheck } from "lucide-react";

export default function TrustLogos() {
  const logos = [
    { name: "Selasih Cafe", icon: Coffee },
    { name: "Pandan Resto", icon: Utensils },
    { name: "Glow Salon", icon: Scissors },
    { name: "Apex Gym", icon: Dumbbell },
    { name: "Rapi Laundry", icon: Shirt },
    { name: "Sehat Clinic", icon: ShieldCheck },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Telah Dipercaya oleh Berbagai Bisnis Lokal Terkemuka
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, idx) => {
            const Icon = logo.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-default group"
              >
                <Icon className="w-5 h-5 opacity-75 group-hover:opacity-100 transition-opacity" />
                <span className="font-display font-semibold text-sm tracking-tight">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
