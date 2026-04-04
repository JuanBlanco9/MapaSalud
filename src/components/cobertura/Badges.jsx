import { useState } from "react";
import { Check, Clock, AlertTriangle, Info } from "lucide-react";
import { nivelStyles, dificultadStyles } from "./estilos";
import { getDificultadAcceso, dificultadInfo, getFundamentacion } from "../../data/dificultadAcceso";

export function NivelBadge({ nivel, niveles }) {
  const info = niveles && niveles[nivel];
  if (!nivel || !info) return null;
  const style = nivelStyles[nivel] || nivelStyles.gestion;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {info.label}
    </span>
  );
}

export function DificultadBadge({ nombre }) {
  const dif = getDificultadAcceso(nombre);
  if (!dif || !dificultadInfo[dif]) return null;
  const info = dificultadInfo[dif];
  const style = dificultadStyles[dif];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${style}`}>
      {dif === "directo" && <Check className="w-3 h-3" />}
      {dif === "tramite" && <Clock className="w-3 h-3" />}
      {dif === "dificil" && <AlertTriangle className="w-3 h-3" />}
      {info.label}
    </span>
  );
}

export function EvidenciaPanel({ fund }) {
  if (!fund) return null;
  return (
    <div className="px-3 pb-3 border-t border-gris-200/50">
      <p className="text-xs text-gris-600 mt-2">{fund.porque}</p>
      {fund.datosLitigiosidad && (
        <p className="text-xs text-gris-500 mt-1">{fund.datosLitigiosidad}</p>
      )}
      {fund.fallos && fund.fallos.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold text-gris-600 mb-1">
            Fallos judiciales ({fund.fallos.length}):
          </p>
          {fund.fallos.map((f, i) => (
            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
              className="block text-xs text-azul-600 hover:text-azul-700 no-underline hover:underline mt-0.5">
              {f.titulo} — {f.tribunal}
            </a>
          ))}
        </div>
      )}
      {fund.normativa && fund.normativa.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold text-gris-600 mb-1">Normativa:</p>
          {fund.normativa.map((n, i) => (
            <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
              className="block text-xs text-azul-600 hover:text-azul-700 no-underline hover:underline mt-0.5">
              {n.titulo}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function DrogaConNivel({ nombre, getNivel, niveles }) {
  const [showInfo, setShowInfo] = useState(false);
  const nivel = getNivel ? getNivel(nombre) : null;
  const style = nivel && nivelStyles[nivel] ? nivelStyles[nivel] : nivelStyles.gestion;
  const fund = getFundamentacion(nombre);

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg overflow-hidden`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 p-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gris-800">{nombre}</span>
          {fund && (
            <button onClick={() => setShowInfo(!showInfo)}
              className="text-gris-400 hover:text-azul-600 cursor-pointer bg-transparent border-none p-0 shrink-0"
              aria-label="Ver informacion sobre dificultad de acceso">
              <Info className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <NivelBadge nivel={nivel || "gestion"} niveles={niveles} />
          <DificultadBadge nombre={nombre} />
        </div>
      </div>
      {showInfo && <EvidenciaPanel fund={fund} />}
    </div>
  );
}

export function PmoTratamientoItem({ t }) {
  const [showInfo, setShowInfo] = useState(false);
  const dif = getDificultadAcceso(t.tipo);
  const fund = getFundamentacion(t.tipo);

  return (
    <div className="border-b border-gris-100 last:border-0 pb-2 last:pb-0">
      <div className="flex items-start gap-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          t.cobertura === "100%" ? "bg-verde-50" : "bg-naranja-50"
        }`}>
          {t.cobertura === "100%" ? (
            <Check className="w-3 h-3 text-verde-600" />
          ) : (
            <AlertTriangle className="w-3 h-3 text-naranja-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-medium text-gris-800">{t.tipo}</span>
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              t.cobertura === "100%" ? "bg-verde-50 text-verde-600" : "bg-naranja-50 text-naranja-500"
            }`}>{t.cobertura}</span>
            {dif && (
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full ${dificultadStyles[dif]}`}>
                {dif === "directo" && <Check className="w-3 h-3" />}
                {dif === "tramite" && <Clock className="w-3 h-3" />}
                {dif === "dificil" && <AlertTriangle className="w-3 h-3" />}
                {dificultadInfo[dif].label}
              </span>
            )}
            {fund && (
              <button onClick={() => setShowInfo(!showInfo)}
                className="text-gris-400 hover:text-azul-600 cursor-pointer bg-transparent border-none p-0"
                aria-label="Ver informacion">
                <Info className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-xs text-gris-500 mt-0.5">{t.nota}</p>
          {showInfo && fund && <EvidenciaPanel fund={fund} />}
        </div>
      </div>
    </div>
  );
}
