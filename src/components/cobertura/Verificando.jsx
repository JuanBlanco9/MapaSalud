import { Clock } from "lucide-react";

export function Verificando({ texto }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-naranja-600 text-sm">
      <Clock className="w-3.5 h-3.5" />
      <span>{texto || "Informacion en verificacion"}</span>
    </span>
  );
}

export function mostrarDato(valor, fallback) {
  if (!valor || valor === "TODO" || (typeof valor === "string" && valor.startsWith("TODO"))) {
    return <Verificando texto={fallback} />;
  }
  return valor;
}
