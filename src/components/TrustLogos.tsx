import { Coffee, Utensils, Scissors, Dumbbell, Shirt, Store } from "lucide-react";

export default function TrustLogos() {
  const businessTypes = [
    { name: "Cafe", icon: Coffee }, { name: "Restoran", icon: Utensils },
    { name: "Salon", icon: Scissors }, { name: "Gym", icon: Dumbbell },
    { name: "Laundry", icon: Shirt }, { name: "Toko lokal", icon: Store },
  ];
  return (
    <section className="border-y border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <p className="mb-5 text-center text-sm text-gray-500">Mendukung kebutuhan berbagai jenis usaha lokal</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {businessTypes.map(({ name, icon: Icon }) => <span key={name} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500"><Icon className="h-5 w-5 text-gray-400" />{name}</span>)}
        </div>
      </div>
    </section>
  );
}