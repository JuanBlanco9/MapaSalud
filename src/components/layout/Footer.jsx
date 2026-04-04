import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gris-100 border-t border-gris-200 no-print">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-naranja-50 border border-naranja-500/30 rounded-lg p-4 mb-6 text-sm text-gris-700">
          MapaSalud es una herramienta informativa gratuita. La informacion que
          encontras aqui es orientativa y no reemplaza el asesoramiento legal o
          medico profesional. Siempre consulta con tu medico y un abogado para
          tu caso especifico.
        </div>

        {/* Feedback */}
        <div className="bg-white border border-gris-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-azul-600 shrink-0" />
            <p className="text-sm text-gris-600">
              Encontraste un dato incorrecto o un telefono que no funciona?
            </p>
          </div>
          <a
            href="https://github.com/JuanBlanco9/MapaSalud/issues/new?template=dato-incorrecto.md&title=Dato+incorrecto:+"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-azul-600 font-medium no-underline hover:underline whitespace-nowrap"
          >
            Reportar dato incorrecto
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gris-500">
          <p>MapaSalud — Informacion sobre cobertura de salud en Argentina</p>
          <div className="flex gap-4">
            <a href="https://github.com/JuanBlanco9/MapaSalud" target="_blank" rel="noopener noreferrer"
              className="text-gris-500 hover:text-gris-700 no-underline">GitHub</a>
            <p>No almacenamos datos personales</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
