import PropTypes from "prop-types";
import { Check } from "lucide-react";

const PASOS = ["Situacion", "Tus datos", "Carta lista"];

export default function ProgresoCarta({ paso }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {PASOS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                paso > i + 1
                  ? "bg-verde-500 text-white"
                  : paso === i + 1
                  ? "bg-azul-700 text-white"
                  : "bg-gris-200 text-gris-500"
              }`}
            >
              {paso > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1 ${paso >= i + 1 ? "text-azul-700 font-medium" : "text-gris-400"}`}>
              {label}
            </span>
          </div>
          {i < PASOS.length - 1 && (
            <div className={`w-10 sm:w-16 h-0.5 mb-5 mx-1 ${paso > i + 1 ? "bg-verde-500" : "bg-gris-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

ProgresoCarta.propTypes = {
  paso: PropTypes.number.isRequired,
};
