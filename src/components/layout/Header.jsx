import { Link } from "react-router-dom";
import { Shield, XCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-azul-700 text-white no-print">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 text-white no-underline shrink-0">
          <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">MapaSalud</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden sm:flex gap-4 text-sm">
            <Link
              to="/"
              className="text-azul-100 hover:text-white transition-colors no-underline"
            >
              Inicio
            </Link>
            <Link
              to="/cobertura"
              className="text-azul-100 hover:text-white transition-colors no-underline"
            >
              Cobertura
            </Link>
            <Link
              to="/amparo"
              className="text-azul-100 hover:text-white transition-colors no-underline"
            >
              Amparos
            </Link>
          </nav>
          <Link
            to="/amparo#paso-a-paso"
            className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors no-underline whitespace-nowrap min-h-[44px]"
          >
            <XCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Mi OS me dijo que NO</span>
            <span className="sm:hidden">Me dijeron NO</span>
          </Link>
        </div>
      </div>
      {/* Mobile nav */}
      <nav className="sm:hidden flex justify-center gap-6 pb-2 text-xs">
        <Link to="/" className="text-azul-200 hover:text-white no-underline">Inicio</Link>
        <Link to="/cobertura" className="text-azul-200 hover:text-white no-underline">Cobertura</Link>
        <Link to="/amparo" className="text-azul-200 hover:text-white no-underline">Amparos</Link>
      </nav>
    </header>
  );
}
