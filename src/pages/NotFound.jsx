import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 px-4 text-center">
      <h1 className="text-6xl font-bold text-azul-700 mb-4">404</h1>
      <p className="text-xl text-gris-600 mb-8">
        Esta pagina no existe. Puede que la direccion este mal escrita.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors no-underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al inicio
      </Link>
    </div>
  );
}
