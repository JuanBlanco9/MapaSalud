import { useState } from "react";
import { ArrowRight, ArrowLeft, Shield, ChevronDown, Ribbon, Wind, Activity, User, Heart, Droplet, Cpu, Package, Syringe } from "lucide-react";

const iconMap = { ribbon: Ribbon, wind: Wind, activity: Activity, user: User, heart: Heart, droplet: Droplet, cpu: Cpu, package: Package, syringe: Syringe };

export default function Paso2Diagnostico({ os, plan, tipos, config, onSelectSubtipo, onBack }) {
  const [expandido, setExpandido] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none">
        <ArrowLeft className="w-4 h-4" /> Cambiar cobertura
      </button>

      <div className="bg-azul-50 border border-azul-100 rounded-xl p-4 mb-8 flex items-center gap-3">
        <Shield className="w-5 h-5 text-azul-600 shrink-0" />
        <p className="text-sm text-azul-700">
          <strong>{os.nombre}</strong>{plan ? ` — ${plan.nombre}` : ""}
        </p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-azul-700 mb-3">{config.selectorTipoLabel}</h2>
        <p className="text-gris-600">{config.selectorTipoDesc}</p>
      </div>

      <div className="space-y-4">
        {tipos.map((cancer) => {
          const Icono = iconMap[cancer.icono] || Activity;
          const isExpanded = expandido === cancer.id;
          return (
            <div key={cancer.id} className="bg-white border border-gris-200 rounded-xl overflow-hidden">
              <button onClick={() => setExpandido(isExpanded ? null : cancer.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-gris-50 transition-colors bg-transparent border-none">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azul-50 rounded-full flex items-center justify-center">
                    <Icono className="w-5 h-5 text-azul-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gris-900 text-lg">{cancer.nombre}</p>
                    <p className="text-sm text-gris-500">{cancer.subtipos.length} subtipo{cancer.subtipos.length > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gris-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
              {isExpanded && (
                <div className="border-t border-gris-100 p-4 space-y-2">
                  {cancer.subtipos.map((sub) => (
                    <button key={sub.id} onClick={() => onSelectSubtipo(cancer, sub)}
                      className="w-full flex items-center justify-between bg-gris-50 rounded-lg p-4 hover:bg-azul-50 hover:border-azul-200 border border-transparent transition-all text-left cursor-pointer">
                      <div>
                        <p className="font-medium text-gris-800">{sub.nombre}</p>
                        {sub.biomarcadores.length > 0 && (
                          <p className="text-xs text-gris-500 mt-0.5">{sub.biomarcadores.join(" · ")}</p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gris-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
