import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Download,
  Clock,
  Check,
  Shield,
  AlertTriangle,
  FileText,
  Phone,
  Stethoscope,
  ChevronDown,
  Ribbon,
  Wind,
  Activity,
  User,
  Heart,
  Droplet,
  Cpu,
  Package,
  Syringe,
} from "lucide-react";
import { obrasSociales } from "../data/coberturas";
import { cargarPatologia } from "../data/patologias";
import { generarMapaPDF } from "../utils/generarPDF";
import AsistenteReclamo from "../components/AsistenteReclamo";

// ── Helper: mostrar TODO como "en verificacion" ─────────────────

function Verificando({ texto }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-naranja-500 text-sm">
      <Clock className="w-3.5 h-3.5" />
      <span>{texto || "Informacion en verificacion"}</span>
    </span>
  );
}

function mostrarDato(valor, fallback) {
  if (!valor || valor === "TODO" || (typeof valor === "string" && valor.startsWith("TODO"))) {
    return <Verificando texto={fallback} />;
  }
  return valor;
}

// ── Badge de nivel de cobertura ─────────────────────────────────

const nivelStyles = {
  nacional: {
    bg: "bg-verde-50",
    border: "border-verde-200",
    text: "text-verde-700",
    badge: "bg-verde-100 text-verde-700",
    dot: "bg-verde-500",
  },
  pba: {
    bg: "bg-naranja-50",
    border: "border-naranja-200",
    text: "text-naranja-600",
    badge: "bg-naranja-100 text-naranja-600",
    dot: "bg-naranja-500",
  },
  gestion: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    badge: "bg-red-100 text-red-600",
    dot: "bg-red-500",
  },
};

function NivelBadge({ nivel, niveles }) {
  const info = niveles && niveles[nivel];
  if (!nivel || !info) return null;
  const style = nivelStyles[nivel] || nivelStyles.gestion;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {info.label}
    </span>
  );
}

function DrogaConNivel({ nombre, getNivel, niveles }) {
  const nivel = getNivel ? getNivel(nombre) : null;
  const style = nivel && nivelStyles[nivel] ? nivelStyles[nivel] : nivelStyles.gestion;
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 ${style.bg} border ${style.border} rounded-lg p-3`}
    >
      <span className="text-sm text-gris-800">{nombre}</span>
      <NivelBadge nivel={nivel || "gestion"} niveles={niveles} />
    </div>
  );
}

// ── Iconos por tipo de cancer ───────────────────────────────────

const iconMap = {
  ribbon: Ribbon,
  wind: Wind,
  activity: Activity,
  user: User,
  heart: Heart,
  droplet: Droplet,
  cpu: Cpu,
  package: Package,
  syringe: Syringe,
};

// ── Barra de progreso ───────────────────────────────────────────

function BarraProgreso({ paso }) {
  const pasos = [
    { n: 1, label: "Tu cobertura" },
    { n: 2, label: "Tu diagnostico" },
    { n: 3, label: "Tu mapa" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 py-6 px-4">
      {pasos.map((p, i) => (
        <div key={p.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                paso > p.n
                  ? "bg-verde-500 text-white"
                  : paso === p.n
                  ? "bg-azul-700 text-white"
                  : "bg-gris-200 text-gris-500"
              }`}
            >
              {paso > p.n ? <Check className="w-5 h-5" /> : p.n}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium ${
                paso >= p.n ? "text-azul-700" : "text-gris-400"
              }`}
            >
              {p.label}
            </span>
          </div>
          {i < pasos.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mb-5 mx-1 transition-colors ${
                paso > p.n ? "bg-verde-500" : "bg-gris-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── PASO 1: Seleccion de cobertura ──────────────────────────────

function Paso1({ onSelect }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-azul-700 mb-3">
          Cual es tu cobertura?
        </h2>
        <p className="text-gris-600">
          Selecciona tu obra social, prepaga, o si te atendes en hospital
          publico.
        </p>
      </div>

      <div className="space-y-3">
        {obrasSociales.map((os) => (
          <button
            key={os.id}
            onClick={() => onSelect(os)}
            className="w-full flex items-center justify-between bg-white border border-gris-200 rounded-xl p-5 hover:border-azul-500 hover:shadow-md transition-all text-left cursor-pointer group"
          >
            <div>
              <p className="font-semibold text-gris-900 text-lg group-hover:text-azul-700 transition-colors">
                {os.nombre}
              </p>
              <p className="text-sm text-gris-500">{os.tipo}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── PASO 1b: Seleccion de plan (si la OS tiene planes) ──────────

function Paso1Plan({ os, onSelectPlan, onBack }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Cambiar obra social
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-azul-700 mb-3">
          Que plan de {os.nombre} tenes?
        </h2>
        <p className="text-gris-600">
          Si no sabes tu plan exacto, elegilo igualmente — la informacion base
          del PMO es la misma para todos.
        </p>
      </div>

      <div className="space-y-3">
        {os.planes.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onSelectPlan(plan)}
            className="w-full flex items-center justify-between bg-white border border-gris-200 rounded-xl p-5 hover:border-azul-500 hover:shadow-md transition-all text-left cursor-pointer group"
          >
            <div>
              <p className="font-semibold text-gris-900 group-hover:text-azul-700 transition-colors">
                {plan.nombre}
              </p>
              <p className="text-sm text-gris-500">{plan.detalle}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors" />
          </button>
        ))}
        <button
          onClick={() => onSelectPlan(null)}
          className="w-full flex items-center justify-between bg-gris-50 border border-gris-200 rounded-xl p-5 hover:border-azul-500 hover:shadow-md transition-all text-left cursor-pointer group"
        >
          <div>
            <p className="font-semibold text-gris-700 group-hover:text-azul-700 transition-colors">
              No se cual es mi plan
            </p>
            <p className="text-sm text-gris-500">
              Te mostramos la informacion general del PMO que aplica a todos
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gris-300 group-hover:text-azul-500 transition-colors" />
        </button>
      </div>
    </div>
  );
}

// ── PASO 2: Seleccion de diagnostico ────────────────────────────

function Paso2({ os, plan, tipos, config, onSelectSubtipo, onBack }) {
  const [cancerExpandido, setCancerExpandido] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Cambiar cobertura
      </button>

      <div className="bg-azul-50 border border-azul-100 rounded-xl p-4 mb-8 flex items-center gap-3">
        <Shield className="w-5 h-5 text-azul-600 shrink-0" />
        <p className="text-sm text-azul-700">
          <strong>{os.nombre}</strong>
          {plan ? ` — ${plan.nombre}` : ""}
        </p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-azul-700 mb-3">
          {config.selectorTipoLabel}
        </h2>
        <p className="text-gris-600">
          {config.selectorTipoDesc}
        </p>
      </div>

      <div className="space-y-4">
        {tipos.map((cancer) => {
          const Icono = iconMap[cancer.icono] || Activity;
          const expandido = cancerExpandido === cancer.id;

          return (
            <div key={cancer.id} className="bg-white border border-gris-200 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setCancerExpandido(expandido ? null : cancer.id)
                }
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-gris-50 transition-colors bg-transparent border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azul-50 rounded-full flex items-center justify-center">
                    <Icono className="w-5 h-5 text-azul-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gris-900 text-lg">
                      {cancer.nombre}
                    </p>
                    <p className="text-sm text-gris-500">
                      {cancer.subtipos.length} subtipo
                      {cancer.subtipos.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gris-400 transition-transform ${
                    expandido ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandido && (
                <div className="border-t border-gris-100 p-4 space-y-2">
                  {cancer.subtipos.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onSelectSubtipo(cancer, sub)}
                      className="w-full flex items-center justify-between bg-gris-50 rounded-lg p-4 hover:bg-azul-50 hover:border-azul-200 border border-transparent transition-all text-left cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-gris-800">
                          {sub.nombre}
                        </p>
                        {sub.biomarcadores.length > 0 && (
                          <p className="text-xs text-gris-500 mt-0.5">
                            {sub.biomarcadores.join(" · ")}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gris-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PASO 3: Mapa personalizado ──────────────────────────────────

function Paso3({ os, plan, cancer, subtipo, pmo, getNivelDroga, nivelesInfo, config, onBack, onReset, onIniciarReclamo }) {
  const esPublico = os.id === "hospital_publico";

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Cambiar diagnostico
      </button>

      {/* Resumen de seleccion */}
      <div className="bg-azul-700 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Tu mapa personalizado</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-1">
              Cobertura
            </p>
            <p className="font-semibold">
              {os.nombre}
              {plan ? ` — ${plan.nombre}` : ""}
            </p>
          </div>
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-1">
              Diagnostico
            </p>
            <p className="font-semibold">{cancer.nombre}</p>
          </div>
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-1">
              Subtipo
            </p>
            <p className="font-semibold">{subtipo.nombre}</p>
          </div>
        </div>
      </div>

      {/* Seccion A: Lo que te corresponde por PMO */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Lo que te corresponde por ley (PMO)
        </h3>
        <div className="bg-verde-50 border border-verde-200 rounded-lg p-4 mb-4 text-sm text-verde-800">
          <p className="font-semibold mb-1">
            {pmo.baseLegal}
          </p>
          <p className="text-verde-700">{pmo.coseguros}</p>
        </div>
        <p className="text-gris-600 text-sm mb-4">
          El Programa Medico Obligatorio establece un piso minimo de cobertura.{" "}
          <strong>
            Todas las obras sociales y prepagas estan obligadas a cubrirlo.
          </strong>
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <h4 className="font-semibold text-gris-800 mb-3">
              Tratamientos cubiertos por PMO
            </h4>
            <div className="space-y-2.5">
              {pmo.tratamientos.map((t) => (
                <div key={t.tipo} className="flex items-start gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      t.cobertura === "100%"
                        ? "bg-verde-50"
                        : "bg-naranja-50"
                    }`}
                  >
                    {t.cobertura === "100%" ? (
                      <Check className="w-3 h-3 text-verde-600" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-naranja-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gris-800">
                      {t.tipo}{" "}
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                          t.cobertura === "100%"
                            ? "bg-verde-50 text-verde-600"
                            : "bg-naranja-50 text-naranja-500"
                        }`}
                      >
                        {t.cobertura}
                      </span>
                    </p>
                    <p className="text-xs text-gris-500">{t.nota}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <h4 className="font-semibold text-gris-800 mb-3">
              Estudios diagnosticos relevantes
            </h4>
            <div className="space-y-2.5">
              {pmo.estudios
                .filter((e) => {
                  const estudiosDelSubtipo = subtipo.estudios.map((s) =>
                    s.toLowerCase()
                  );
                  const nombreLower = e.nombre.toLowerCase();
                  // Show studies relevant to this subtype + always show biopsia and anatomia
                  return (
                    nombreLower.includes("biopsia") ||
                    nombreLower.includes("anatomia") ||
                    estudiosDelSubtipo.some(
                      (es) =>
                        nombreLower.includes(es.split(" ")[0].toLowerCase()) ||
                        es.includes(nombreLower.split(" ")[0].toLowerCase()) ||
                        es.includes(
                          e.nombre.split("(")[0].trim().toLowerCase()
                        )
                    ) ||
                    // Always show PET, panel genomico, biopsia liquida
                    nombreLower.includes("pet") ||
                    nombreLower.includes("panel genomico") ||
                    nombreLower.includes("biopsia liquida")
                  );
                })
                .map((e) => (
                  <div key={e.nombre} className="flex items-start gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        e.cobertura === "100%"
                          ? "bg-verde-50"
                          : e.cobertura.includes("No incluida")
                          ? "bg-gris-100"
                          : "bg-naranja-50"
                      }`}
                    >
                      {e.cobertura === "100%" ? (
                        <Check className="w-3 h-3 text-verde-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-naranja-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gris-800">
                        {e.nombre}{" "}
                        <span
                          className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                            e.cobertura === "100%"
                              ? "bg-verde-50 text-verde-600"
                              : e.cobertura.includes("No incluida")
                              ? "bg-gris-100 text-gris-500"
                              : "bg-naranja-50 text-naranja-500"
                          }`}
                        >
                          {e.cobertura}
                        </span>
                      </p>
                      {e.nota && (
                        <p className="text-xs text-gris-500">{e.nota}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seccion B: Tu obra social especificamente */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          {os.nombre} — cobertura especifica
        </h3>

        {/* Alertas (si existen) */}
        {os.alertas && os.alertas.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="font-semibold text-red-700 text-sm">
                Alertas reportadas
              </p>
            </div>
            {os.alertas.map((alerta, i) => (
              <p key={i} className="text-sm text-red-600 ml-6">
                {alerta}
              </p>
            ))}
          </div>
        )}

        <div className="bg-white border border-gris-200 rounded-xl p-5">
          <div className="space-y-4">
            {/* Cobertura oncologica */}
            <div>
              <p className="font-semibold text-gris-800 mb-1">
                Cobertura oncologica
              </p>
              <p className="text-sm text-gris-600">
                {mostrarDato(os.coberturaOncologica, "Informacion en verificacion")}
              </p>
              {plan && plan.detalle && (
                <p className="text-sm text-azul-600 mt-1 font-medium">
                  Tu plan: {plan.detalle}
                </p>
              )}
            </div>

            {/* Proceso de autorizacion */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">
                  Como autorizar
                </p>
                <p className="text-sm text-gris-600">
                  {mostrarDato(os.procesoAutorizacion.canal, "Informacion en verificacion")}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">
                  Tiempo tipico de respuesta
                </p>
                <p className="text-sm text-gris-600">
                  {mostrarDato(os.procesoAutorizacion.tiempoTipico, "Informacion en verificacion")}
                </p>
              </div>
            </div>

            {/* Auditoria medica */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">
                  Telefono auditoria medica
                </p>
                {os.auditoria.telefono ? (
                  <p className="text-sm text-azul-600 font-medium">
                    {os.auditoria.telefono}
                  </p>
                ) : (
                  <Verificando />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-1">
                  Email auditoria medica
                </p>
                {os.auditoria.email ? (
                  <a
                    href={`mailto:${os.auditoria.email}`}
                    className="text-sm text-azul-600 font-medium no-underline hover:underline"
                  >
                    {os.auditoria.email}
                  </a>
                ) : (
                  <Verificando />
                )}
              </div>
            </div>

            {/* Que aprueban / niegan */}
            {os.queAprueban.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-2">
                  Suelen aprobar sin problemas
                </p>
                <div className="flex flex-wrap gap-2">
                  {os.queAprueban.map((item) => (
                    <span
                      key={item}
                      className="bg-verde-50 text-verde-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {os.queNiegan.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gris-700 mb-2">
                  Suelen negar o demorar
                </p>
                <div className="flex flex-wrap gap-2">
                  {os.queNiegan.map((item) => (
                    <span
                      key={item}
                      className="bg-naranja-50 text-naranja-500 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Programa oncologico */}
            {os.programaOncologico && (
              <div className="bg-azul-50 border border-azul-100 rounded-lg p-3 text-sm text-azul-700">
                <strong>Programa oncologico:</strong> {os.programaOncologico}
              </div>
            )}

            {/* Hospital publico extras */}
            {esPublico && os.bancoDeDrogas && (
              <div className="bg-gris-50 border border-gris-200 rounded-lg p-3 text-sm text-gris-700">
                <strong>Banco Nacional de Drogas:</strong> {os.bancoDeDrogas}
              </div>
            )}

            {esPublico && os.limitaciones && (
              <div className="bg-naranja-50 border border-naranja-100 rounded-lg p-3 text-sm text-naranja-600">
                <strong>Limitaciones:</strong> {os.limitaciones}
              </div>
            )}

            {esPublico && os.provincialBuenosAires && (
              <div className="bg-azul-50 border border-azul-100 rounded-lg p-3 text-sm text-azul-700">
                <strong>PBA — Drogas Oncologicas:</strong>{" "}
                {os.provincialBuenosAires.telefono} — {os.provincialBuenosAires.direccion} ({os.provincialBuenosAires.horario})
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seccion C: Tratamientos para tu diagnostico */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Tratamientos para {cancer.nombre} — {subtipo.nombre}
        </h3>

        {/* Leyenda de colores */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {Object.entries(nivelesInfo).map(([key, info]) => {
            const style = nivelStyles[key];
            return (
              <div
                key={key}
                className={`${style.bg} border ${style.border} rounded-lg p-3`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${style.dot}`}
                  />
                  <span className={`text-xs font-bold ${style.text}`}>
                    {info.label}
                  </span>
                </div>
                <p className={`text-xs ${style.text} opacity-80`}>
                  {info.descripcion}
                </p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          {/* Primera linea */}
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-gris-800">
                Tratamiento de primera linea
              </h4>
              <span className="bg-gris-100 text-gris-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                Estandar NCCN/ESMO
              </span>
            </div>
            <p className="text-xs text-gris-500 mb-3">
              Tratamientos recomendados como primera opcion segun guias
              internacionales. El nivel de cobertura puede variar por droga.
            </p>
            <div className="space-y-2">
              {subtipo.primeraLinea.map((t) => (
                <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />
              ))}
            </div>
          </div>

          {/* Terapias dirigidas */}
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-gris-800">
                Terapias dirigidas
              </h4>
            </div>
            <p className="text-xs text-gris-500 mb-3">
              Segun los biomarcadores de tu tumor. Consulta con tu oncologo
              cuales aplican a tu caso.
            </p>
            <div className="space-y-2">
              {subtipo.terapiasDirigidas.map((t) => (
                <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />
              ))}
            </div>
          </div>

          {/* Estudios a pedir */}
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-semibold text-gris-800">
                Estudios que podes pedirle a tu medico
              </h4>
            </div>
            <p className="text-xs text-gris-500 mb-3">
              Estos estudios ayudan a definir el mejor tratamiento para tu caso
              especifico.
            </p>
            <div className="space-y-2">
              {subtipo.estudios.map((e) => (
                <div
                  key={e}
                  className="flex items-start gap-2 bg-gris-50 rounded-lg p-3"
                >
                  <Stethoscope className="w-4 h-4 text-azul-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gris-700">{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Opciones nuevas — siempre "gestion" */}
          {subtipo.opcionesNuevas.length > 0 && (
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h4 className="font-semibold text-gris-800">
                  Opciones nuevas — requieren gestion
                </h4>
              </div>
              <p className="text-xs text-gris-500 mb-3">
                Estos tratamientos existen pero no estan en el vademecum
                nacional ni provincial. Si tu medico los recomienda, vas a
                necesitar una autorizacion especial, carta documento, reclamo
                ante la SSS, o amparo.
              </p>
              <div className="space-y-2">
                {subtipo.opcionesNuevas.map((t) => (
                  <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer provincial */}
        <div className="mt-4 bg-naranja-50 border border-naranja-200 rounded-lg p-4 text-sm text-naranja-600">
          <p className="font-semibold mb-1">
            Sobre la cobertura provincial (PBA)
          </p>
          <p>
            Los medicamentos marcados como "Cubierto en PBA" estan incluidos en
            el Listado del Instituto Provincial del Cancer de Buenos Aires (IPC
            PBA, octubre 2024) pero no en el vademecum nacional (Res. 3377/2022).
            Si estas en Provincia de Buenos Aires, podes solicitarlos con esa
            base legal. Si estas en otra provincia, el acceso depende del
            listado provincial vigente — consulta con tu oncologo o inicia una
            gestion ante la Superintendencia de Servicios de Salud
            (0800-222-72583).
          </p>
        </div>
      </section>

      {/* CTA: Me dijeron que NO — con asistente de reclamo */}
      <div className="mb-8 bg-red-500 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-3 text-white">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-bold text-lg">Mi obra social me dijo que NO</p>
            <p className="text-red-100 text-sm">
              Te ayudamos a redactar el reclamo formal o te guiamos paso a paso
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Selector de tratamiento para reclamo */}
          <select
            id="tratamiento-reclamo-select"
            defaultValue=""
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                const nivel = getNivelDroga ? getNivelDroga(val) : "gestion";
                onIniciarReclamo(val, nivel);
              }
            }}
            className="flex-1 bg-white text-gris-800 rounded-lg px-4 py-3 text-sm border-none cursor-pointer min-h-[44px]"
          >
            <option value="" disabled>
              Elegir tratamiento para reclamar...
            </option>
            {[...subtipo.primeraLinea, ...subtipo.terapiasDirigidas, ...subtipo.opcionesNuevas].map(
              (t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              )
            )}
          </select>
          <Link
            to="/amparo#paso-a-paso"
            className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-3 rounded-lg text-sm no-underline min-h-[44px] whitespace-nowrap"
          >
            Ver guia de amparos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Seccion D: Que hacer si te dicen que no */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Si te dicen que no
        </h3>

        <div className="bg-verde-50 border border-verde-200 rounded-xl p-6">
          <p className="text-verde-800 font-semibold text-lg mb-4">
            Tenes derecho a reclamar. No aceptes un "no" como respuesta final.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-verde-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-gris-800">
                  Pedi la negativa por escrito
                </p>
                <p className="text-sm text-gris-600">
                  Es tu derecho. Si no te la dan, manda un email o nota
                  pidiendo formalmente. Guarda todo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-verde-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-gris-800">
                  Reclama a la Superintendencia de Servicios de Salud
                </p>
                <p className="text-sm text-gris-600">
                  Llama al 0800-222-72583 o ingresa al sitio web de la SSS.
                  Es gratis y a veces resuelve sin necesidad de ir a la
                  Justicia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-verde-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-gris-800">
                  Inicia un amparo de salud
                </p>
                <p className="text-sm text-gris-600">
                  Si no se resuelve, podes hacer un amparo. En oncologia los
                  jueces suelen fallar a favor del paciente en 24-72 horas.
                </p>
                <Link
                  to="/amparo"
                  className="inline-flex items-center gap-1.5 text-verde-700 font-semibold text-sm mt-2 hover:text-verde-800 no-underline"
                >
                  Ver guia completa de amparos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion E: Contactos utiles */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-azul-700 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Contactos utiles
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <p className="font-semibold text-gris-800 mb-1">
              Superintendencia de Servicios de Salud
            </p>
            <p className="text-sm text-gris-600 mb-2">
              Reclamos contra obras sociales
            </p>
            <a
              href="tel:08002227258"
              className="text-azul-600 font-medium text-sm no-underline"
            >
              0800-222-72583
            </a>
          </div>
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <p className="font-semibold text-gris-800 mb-1">LALCEC</p>
            <p className="text-sm text-gris-600 mb-2">
              Asesoramiento oncologico gratuito
            </p>
            <a
              href="tel:08002221166"
              className="text-azul-600 font-medium text-sm no-underline"
            >
              0800-222-1166
            </a>
          </div>

          {!esPublico && (
            <>
              <div className="bg-white border border-gris-200 rounded-xl p-5">
                <p className="font-semibold text-gris-800 mb-1">
                  Auditoria medica de {os.nombre}
                </p>
                <p className="text-sm text-gris-600 mb-1">Telefono</p>
                {os.auditoria.telefono ? (
                  <a
                    href={`tel:${os.auditoria.telefono.replace(/[^0-9+]/g, "")}`}
                    className="text-azul-600 font-medium text-sm no-underline"
                  >
                    {os.auditoria.telefono}
                  </a>
                ) : (
                  <Verificando />
                )}
              </div>
              <div className="bg-white border border-gris-200 rounded-xl p-5">
                <p className="font-semibold text-gris-800 mb-1">
                  Auditoria medica de {os.nombre}
                </p>
                <p className="text-sm text-gris-600 mb-1">Email</p>
                {os.auditoria.email ? (
                  <a
                    href={`mailto:${os.auditoria.email}`}
                    className="text-azul-600 font-medium text-sm no-underline"
                  >
                    {os.auditoria.email}
                  </a>
                ) : (
                  <Verificando />
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* PDF + empezar de nuevo */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-6 border-t border-gris-200">
        <button
          onClick={() =>
            generarMapaPDF({ os, plan, cancer, subtipo, pmo })
          }
          className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          <Download className="w-4 h-4" />
          Descargar mi mapa (PDF)
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-gris-100 hover:bg-gris-200 text-gris-700 font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Consultar otra cobertura o diagnostico
        </button>
      </div>
    </div>
  );
}

// ── Pagina principal ────────────────────────────────────────────

export default function Cobertura() {
  const { patologiaId } = useParams();
  const [patologia, setPatologia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paso, setPaso] = useState(1);
  const [os, setOs] = useState(null);
  const [plan, setPlan] = useState(null);
  const [showPlanSelect, setShowPlanSelect] = useState(false);
  const [cancer, setCancer] = useState(null);
  const [subtipo, setSubtipo] = useState(null);
  const [tratamientoReclamo, setTratamientoReclamo] = useState(null);
  const [nivelReclamo, setNivelReclamo] = useState(null);

  useEffect(() => {
    setLoading(true);
    cargarPatologia(patologiaId).then((data) => {
      setPatologia(data);
      setLoading(false);
    });
    // Reset state when pathology changes
    setPaso(1);
    setOs(null);
    setPlan(null);
    setShowPlanSelect(false);
    setCancer(null);
    setSubtipo(null);
  }, [patologiaId]);

  const handleSelectOs = (selectedOs) => {
    setOs(selectedOs);
    if (selectedOs.planes.length > 0) {
      setShowPlanSelect(true);
    } else {
      setPlan(null);
      setShowPlanSelect(false);
      setPaso(2);
    }
  };

  const handleSelectPlan = (selectedPlan) => {
    setPlan(selectedPlan);
    setShowPlanSelect(false);
    setPaso(2);
  };

  const handleSelectSubtipo = (selectedCancer, selectedSubtipo) => {
    setCancer(selectedCancer);
    setSubtipo(selectedSubtipo);
    setPaso(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPaso1 = () => {
    setPaso(1);
    setOs(null);
    setPlan(null);
    setShowPlanSelect(false);
  };

  const handleBackToPaso2 = () => {
    setPaso(2);
    setCancer(null);
    setSubtipo(null);
  };

  const handleIniciarReclamo = (tratamiento, nivel) => {
    setTratamientoReclamo(tratamiento);
    setNivelReclamo(nivel);
    setPaso(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPaso3 = () => {
    setPaso(3);
    setTratamientoReclamo(null);
    setNivelReclamo(null);
  };

  const handleReset = () => {
    setPaso(1);
    setOs(null);
    setPlan(null);
    setShowPlanSelect(false);
    setCancer(null);
    setSubtipo(null);
    setTratamientoReclamo(null);
    setNivelReclamo(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-gris-500">Cargando...</div>
    );
  }

  if (!patologia) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl text-gris-600 mb-4">Patologia no encontrada</p>
        <Link
          to="/cobertura"
          className="text-azul-600 no-underline hover:underline"
        >
          Volver a seleccion
        </Link>
      </div>
    );
  }

  const { config, tipos, getNivelDroga: getNivel, nivelesInfo: niveles, pmo: pmoData } = patologia;
  const pasoActual = showPlanSelect ? 1 : paso;

  return (
    <div>
      {/* Hero */}
      <section className="bg-azul-700 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Tu cobertura — {config.nombre}
          </h1>
          <p className="text-azul-100 text-lg">
            Contanos tu situacion y te mostramos que te corresponde, como
            pedirlo, y que hacer si te dicen que no.
          </p>
        </div>
      </section>

      <BarraProgreso paso={pasoActual} />

      {paso === 1 && !showPlanSelect && <Paso1 onSelect={handleSelectOs} />}

      {paso === 1 && showPlanSelect && os && (
        <Paso1Plan
          os={os}
          onSelectPlan={handleSelectPlan}
          onBack={() => {
            setShowPlanSelect(false);
            setOs(null);
          }}
        />
      )}

      {paso === 2 && os && (
        <Paso2
          os={os}
          plan={plan}
          tipos={tipos}
          config={config}
          onSelectSubtipo={handleSelectSubtipo}
          onBack={handleBackToPaso1}
        />
      )}

      {paso === 3 && os && cancer && subtipo && (
        <Paso3
          os={os}
          plan={plan}
          cancer={cancer}
          subtipo={subtipo}
          pmo={pmoData}
          getNivelDroga={getNivel}
          nivelesInfo={niveles}
          config={config}
          onBack={handleBackToPaso2}
          onReset={handleReset}
          onIniciarReclamo={handleIniciarReclamo}
        />
      )}

      {paso === 4 && os && cancer && subtipo && tratamientoReclamo && (
        <AsistenteReclamo
          os={os}
          plan={plan}
          cancer={cancer}
          subtipo={subtipo}
          tratamiento={tratamientoReclamo}
          nivelCobertura={nivelReclamo}
          patologiaId={patologiaId}
          onBack={handleBackToPaso3}
        />
      )}
    </div>
  );
}
