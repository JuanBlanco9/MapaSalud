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
        <div className="bg-white border border-gris-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-azul-600 shrink-0" />
            <p className="text-sm font-medium text-gris-700">
              Encontraste un dato incorrecto o queres sugerir algo?
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="mailto:mapasalud.contacto@gmail.com?subject=MapaSalud%20-%20Feedback&body=Hola%2C%20quiero%20reportar%3A%0A%0A"
              className="inline-flex items-center gap-1.5 text-sm text-azul-600 font-medium no-underline hover:underline"
            >
              Enviar email
            </a>
            <span className="text-gris-300 hidden sm:inline">|</span>
            <a
              href="https://github.com/JuanBlanco9/MapaSalud/issues/new?template=dato-incorrecto.md&title=Dato+incorrecto:+"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gris-500 no-underline hover:underline"
            >
              Reportar en GitHub (developers)
            </a>
          </div>
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
