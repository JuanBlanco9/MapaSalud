import { ArrowRight } from "lucide-react";
import { obrasSociales } from "../../data/obrasSociales";

export default function Paso1Cobertura({ onSelect }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-azul-700 mb-3">
          Cual es tu cobertura?
        </h2>
        <p className="text-gris-600">
          Selecciona tu obra social, prepaga, o si te atendes en hospital publico.
        </p>
      </div>
      <div className="space-y-3">
        {obrasSociales.map((os) => (
          <button key={os.id} onClick={() => onSelect(os)}
            className="w-full flex items-center justify-between bg-white border border-gris-200 rounded-xl p-5 hover:border-azul-500 hover:shadow-md transition-all text-left cursor-pointer group">
            <div>
              <p className="font-semibold text-gris-900 text-lg group-hover:text-azul-700 transition-colors">{os.nombre}</p>
              <p className="text-sm text-gris-500">{os.tipo}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
