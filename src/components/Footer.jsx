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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gris-500">
          <p>MapaSalud — Orientacion para pacientes oncologicos en Argentina</p>
          <p>No almacenamos datos personales</p>
        </div>
      </div>
    </footer>
  );
}
