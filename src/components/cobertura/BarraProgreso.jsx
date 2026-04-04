import { Check } from "lucide-react";

export default function BarraProgreso({ paso }) {
  const pasos = [
    { n: 1, label: "Tu cobertura" },
    { n: 2, label: "Tu diagnostico" },
    { n: 3, label: "Tu mapa" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 py-6 px-4">
      {pasos.map((p, i) => (
        <div key={p.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              paso > p.n ? "bg-verde-500 text-white" : paso === p.n ? "bg-azul-700 text-white" : "bg-gris-200 text-gris-500"
            }`}>
              {paso > p.n ? <Check className="w-5 h-5" /> : p.n}
            </div>
            <span className={`text-xs mt-1.5 font-medium ${paso >= p.n ? "text-azul-700" : "text-gris-400"}`}>
              {p.label}
            </span>
          </div>
          {i < pasos.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mb-5 mx-1 transition-colors ${paso > p.n ? "bg-verde-500" : "bg-gris-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
