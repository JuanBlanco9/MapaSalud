import { Link } from "react-router-dom";
import { ArrowRight, Ribbon, Droplet } from "lucide-react";
import { patologias } from "../data/patologias";

const iconMap = { ribbon: Ribbon, droplet: Droplet };

export default function SeleccionPatologia() {
  return (
    <div>
      <section className="bg-azul-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Consulta tu cobertura
          </h1>
          <p className="text-azul-100 text-lg">
            Selecciona tu situacion y te mostramos que te corresponde, como
            pedirlo, y que hacer si te dicen que no.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {patologias.map((p) => {
            const Icono = iconMap[p.icono] || Ribbon;
            return (
              <Link
                key={p.id}
                to={p.ruta}
                className="flex items-center justify-between bg-white border border-gris-200 rounded-xl p-6 hover:border-azul-500 hover:shadow-md transition-all no-underline group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-azul-50 rounded-full flex items-center justify-center">
                    <Icono className="w-6 h-6 text-azul-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gris-900 group-hover:text-azul-700 transition-colors">
                      {p.nombre}
                    </p>
                    <p className="text-sm text-gris-500">{p.descripcion}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>

        <p className="text-center text-gris-400 text-sm mt-8">
          Mas patologias proximamente: enfermedades poco frecuentes,
          reumatologicas, VIH/hepatitis.
        </p>
      </div>
    </div>
  );
}
