import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Paso1Plan({ os, onSelectPlan, onBack }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none">
        <ArrowLeft className="w-4 h-4" /> Cambiar obra social
      </button>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-azul-700 mb-3">
          Que plan de {os.nombre} tenes?
        </h2>
        <p className="text-gris-600">
          Si no sabes tu plan exacto, elegilo igualmente — la informacion base del PMO es la misma para todos.
        </p>
      </div>
      <div className="space-y-3">
        {os.planes.map((plan) => (
          <button key={plan.id} onClick={() => onSelectPlan(plan)}
            className="w-full flex items-center justify-between bg-white border border-gris-200 rounded-xl p-5 hover:border-azul-500 hover:shadow-md transition-all text-left cursor-pointer group">
            <div>
              <p className="font-semibold text-gris-900 group-hover:text-azul-700 transition-colors">{plan.nombre}</p>
              <p className="text-sm text-gris-500">{plan.detalle}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors" />
          </button>
        ))}
        <button onClick={() => onSelectPlan(null)}
          className="w-full flex items-center justify-between bg-gris-50 border border-gris-200 rounded-xl p-5 hover:border-azul-500 hover:shadow-md transition-all text-left cursor-pointer group">
          <div>
            <p className="font-semibold text-gris-700 group-hover:text-azul-700 transition-colors">No se cual es mi plan</p>
            <p className="text-sm text-gris-500">Te mostramos la informacion general del PMO que aplica a todos</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors" />
        </button>
      </div>
    </div>
  );
}
