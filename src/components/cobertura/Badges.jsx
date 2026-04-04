import { useState } from "react";
import { Check, Clock, AlertTriangle, Info, ChevronDown } from "lucide-react";
import { nivelStyles, dificultadStyles } from "./estilos";
import { getDificultadAcceso, dificultadInfo, getFundamentacion } from "../../data/dificultadAcceso";
import { getExplicacion } from "../../data/explicacionesDrogas";

// ── Semaforo de cobertura legal ─────────────────────────────────

export function NivelBadge({ nivel, niveles }) {
  const info = niveles && niveles[nivel];
  if (!nivel || !info) return null;
  const colors = {
    nacional: "text-verde-700", ley: "text-verde-700", pmo: "text-verde-700",
    pba: "text-naranja-600",
    gestion: "text-red-600",
  };
  const dots = {
    nacional: "bg-verde-500", ley: "bg-verde-500", pmo: "bg-verde-500",
    pba: "bg-naranja-500",
    gestion: "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${colors[nivel] || colors.gestion}`}>
      <span className={`w-2 h-2 rounded-full ${dots[nivel] || dots.gestion}`} />
      {info.label}
    </span>
  );
}

// ── Advertencia de dificultad real ──────────────────────────────

export function DificultadBadge({ nombre }) {
  const dif = getDificultadAcceso(nombre);
  if (!dif || !dificultadInfo[dif]) return null;
  const info = dificultadInfo[dif];
  const configs = {
    directo: { icon: Check, style: "text-verde-600" },
    tramite: { icon: Clock, style: "text-naranja-500" },
    dificil: { icon: AlertTriangle, style: "text-red-500" },
  };
  const c = configs[dif];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${c.style}`}>
      <Icon className="w-3 h-3" />
      {info.label}
    </span>
  );
}

// ── Panel de evidencia (expandible con (i)) ─────────────────────

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

// ── Droga con semaforo + advertencia + (i) ──────────────────────

export function DrogaConNivel({ nombre, getNivel, niveles }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showExplicacion, setShowExplicacion] = useState(false);
  const nivel = getNivel ? getNivel(nombre) : null;
  const style = nivel && nivelStyles[nivel] ? nivelStyles[nivel] : nivelStyles.gestion;
  const fund = getFundamentacion(nombre);
  const expl = getExplicacion(nombre);

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg overflow-hidden`}>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => { if (expl) { setShowExplicacion(!showExplicacion); setShowInfo(false); } }}
              className={`text-sm font-medium text-left bg-transparent border-none p-0 ${expl ? "text-azul-700 hover:text-azul-800 cursor-pointer underline decoration-dotted underline-offset-2" : "text-gris-800 cursor-default"}`}>
              {nombre}
            </button>
            {fund && (
              <button onClick={() => { setShowInfo(!showInfo); setShowExplicacion(false); }}
                className="text-gris-400 hover:text-azul-600 cursor-pointer bg-transparent border-none p-0 shrink-0"
                aria-label="Ver cobertura y dificultad de acceso">
                <Info className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
          <NivelBadge nivel={nivel || "gestion"} niveles={niveles} />
          <DificultadBadge nombre={nombre} />
        </div>
      </div>
      {showExplicacion && expl && (
        <div className="px-3 pb-3 border-t border-gris-200/50">
          <p className="text-xs font-semibold text-gris-700 mt-2">{expl.nombre}</p>
          <p className="text-xs text-gris-600 mt-1">{expl.queEs}</p>
          <p className="text-xs text-gris-500 mt-1"><strong>Administracion:</strong> {expl.administracion}</p>
          {expl.precio && (
            <div className="mt-1.5 bg-gris-50 rounded p-2">
              <p className="text-xs font-semibold text-gris-700">Precio particular: {expl.precio.rango}</p>
              {expl.precio.nota && <p className="text-xs text-gris-500">{expl.precio.nota}</p>}
              <p className="text-xs text-gris-400">Precio aproximado a {expl.precio.fecha}. Fuente: preciosdemedicamentos.com.ar / alfabeta.net</p>
            </div>
          )}
          {expl.links && expl.links.length > 0 && (
            <div className="mt-1.5">
              <p className="text-xs font-semibold text-gris-600">Mas informacion:</p>
              {expl.links.map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="block text-xs text-azul-600 hover:underline no-underline mt-0.5">
                  {l.titulo}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      {showInfo && <EvidenciaPanel fund={fund} />}
    </div>
  );
}

// ── Item de PMO con semaforo + advertencia ──────────────────────

export function PmoTratamientoItem({ t }) {
  const [showInfo, setShowInfo] = useState(false);
  const dif = getDificultadAcceso(t.tipo);
  const fund = getFundamentacion(t.tipo);

  return (
    <div className="border-b border-gris-100 last:border-0 pb-2.5 last:pb-0">
      <div className="flex items-start gap-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          t.cobertura === "100%" ? "bg-verde-100" : "bg-naranja-100"
        }`}>
          {t.cobertura === "100%" ? <Check className="w-3 h-3 text-verde-600" /> : <AlertTriangle className="w-3 h-3 text-naranja-500" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-medium text-gris-800">{t.tipo}</span>
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              t.cobertura === "100%" ? "bg-verde-50 text-verde-600" : "bg-naranja-50 text-naranja-500"
            }`}>{t.cobertura}</span>
            {dif && <DificultadBadge nombre={t.tipo} />}
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

// ── Leyenda expandible (link al final) ──────────────────────────

export function LeyendaExpandible({ nivelesInfo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-gris-400 hover:text-gris-600 cursor-pointer bg-transparent border-none">
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
        Que significan los colores?
      </button>
      {open && (
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          <div className="bg-verde-50 rounded-lg p-2.5">
            <p className="text-xs font-bold text-verde-700 mb-0.5">🟢 Cubierto por ley</p>
            <p className="text-xs text-verde-600">La ley obliga a cubrirlo al 100%.</p>
          </div>
          <div className="bg-naranja-50 rounded-lg p-2.5">
            <p className="text-xs font-bold text-naranja-600 mb-0.5">🟡 Cobertura parcial / provincial</p>
            <p className="text-xs text-naranja-500">Puede depender de jurisdiccion o requiere justificacion.</p>
          </div>
          <div className="bg-red-50 rounded-lg p-2.5">
            <p className="text-xs font-bold text-red-600 mb-0.5">🔴 Requiere gestion</p>
            <p className="text-xs text-red-500">No esta en listados oficiales. Necesita reclamo o amparo.</p>
          </div>
          <div className="bg-gris-50 rounded-lg p-2.5">
            <p className="text-xs font-bold text-gris-700 mb-0.5">✓ ⏱ ⚠ Dificultad de acceso</p>
            <p className="text-xs text-gris-500">Indica que tan facil es conseguirlo en la practica, independientemente del derecho legal.</p>
          </div>
        </div>
      )}
    </div>
  );
}
