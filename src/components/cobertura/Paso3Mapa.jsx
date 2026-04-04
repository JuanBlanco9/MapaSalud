import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Download, Check, Shield, AlertTriangle, FileText, Phone, Stethoscope, Clock, XCircle } from "lucide-react";
import { Verificando, mostrarDato } from "./Verificando";
import { DrogaConNivel, PmoTratamientoItem, LeyendaExpandible } from "./Badges";
import { getOrganizaciones } from "../../data/organizacionesPorPatologia";
import { generarMapaPDF } from "../../utils/generarPDF";

const TABS = [
  { id: "cobertura", label: "Tu cobertura", icon: Shield },
  { id: "tratamiento", label: "Tu tratamiento", icon: FileText },
  { id: "reclamo", label: "Tu reclamo", icon: AlertTriangle },
];

export default function Paso3Mapa({ os, plan, cancer, subtipo, pmo, getNivelDroga, nivelesInfo, config, onBack, onReset, onIniciarReclamo }) {
  const [tab, setTab] = useState("cobertura");
  const esPublico = os.id === "hospital_publico";

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-4 text-sm cursor-pointer bg-transparent border-none">
        <ArrowLeft className="w-4 h-4" /> Cambiar diagnostico
      </button>

      {/* ── Resumen fijo ──────────────────────────────────────── */}
      <div className="bg-azul-700 text-white rounded-t-xl p-5">
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-0.5">Cobertura</p>
            <p className="font-semibold">{os.nombre}{plan ? ` — ${plan.nombre}` : ""}</p>
          </div>
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-0.5">Diagnostico</p>
            <p className="font-semibold">{cancer.nombre}</p>
          </div>
          <div>
            <p className="text-azul-200 text-xs uppercase tracking-wider mb-0.5">Subtipo</p>
            <p className="font-semibold">{subtipo.nombre}</p>
          </div>
        </div>
      </div>

      {/* ── Banner "Me dijeron que NO" ─────────────────────────── */}
      <div className="bg-red-500 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold text-sm">Mi obra social me dijo que NO</p>
            <p className="text-red-100 text-xs">Te ayudamos a redactar el reclamo formal</p>
          </div>
        </div>
        <button onClick={() => setTab("reclamo")}
          className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg text-sm cursor-pointer border-none min-h-[44px] whitespace-nowrap transition-colors">
          Ir a reclamo
        </button>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="bg-white border-x border-b border-gris-200 sticky top-0 z-20">
        <div className="flex">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent min-h-[48px] ${
                  active
                    ? "border-azul-700 text-azul-700"
                    : "border-transparent text-gris-500 hover:text-gris-700 hover:border-gris-300"
                }`}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.replace("Tu ", "")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Contenido de tabs ─────────────────────────────────── */}
      <div className="bg-white border-x border-b border-gris-200 rounded-b-xl p-5">
        {tab === "cobertura" && <TabCobertura os={os} plan={plan} pmo={pmo} esPublico={esPublico} />}
        {tab === "tratamiento" && <TabTratamiento cancer={cancer} subtipo={subtipo} getNivelDroga={getNivelDroga} nivelesInfo={nivelesInfo} />}
        {tab === "reclamo" && <TabReclamo os={os} subtipo={subtipo} config={config} esPublico={esPublico} onIniciarReclamo={onIniciarReclamo} getNivelDroga={getNivelDroga} />}
      </div>

      {/* ── Footer fijo ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-6">
        <button onClick={() => generarMapaPDF({ os, plan, cancer, subtipo, pmo })}
          className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]">
          <Download className="w-4 h-4" /> Descargar mi mapa (PDF)
        </button>
        <button onClick={onReset}
          className="inline-flex items-center gap-2 bg-gris-100 hover:bg-gris-200 text-gris-700 font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]">
          <ArrowLeft className="w-4 h-4" /> Otra consulta
        </button>
      </div>
    </div>
  );
}

// ── TAB 1: Tu cobertura ─────────────────────────────────────────

function TabCobertura({ os, plan, pmo, esPublico }) {
  return (
    <div className="space-y-6">
      {/* PMO */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" /> Lo que te corresponde por ley
        </h3>
        <div className="bg-verde-50 border border-verde-200 rounded-lg p-4 mb-4 text-sm text-verde-800">
          <p className="font-semibold mb-1">{pmo.baseLegal}</p>
          <p className="text-verde-700">{pmo.coseguros}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gris-50 rounded-xl p-4">
            <h4 className="font-semibold text-gris-800 text-sm mb-3">Tratamientos cubiertos</h4>
            <div className="space-y-2.5">
              {pmo.tratamientos.map((t) => <PmoTratamientoItem key={t.tipo} t={t} />)}
            </div>
          </div>
          <div className="bg-gris-50 rounded-xl p-4">
            <h4 className="font-semibold text-gris-800 text-sm mb-3">Estudios diagnosticos</h4>
            <div className="space-y-2">
              {pmo.estudios.map((e) => (
                <div key={e.nombre} className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    e.cobertura === "100%" ? "bg-verde-100" : "bg-naranja-100"
                  }`}>
                    {e.cobertura === "100%" ? <Check className="w-2.5 h-2.5 text-verde-600" /> : <AlertTriangle className="w-2.5 h-2.5 text-naranja-500" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gris-800">{e.nombre} <span className={`font-semibold px-1 py-0.5 rounded ${
                      e.cobertura === "100%" ? "bg-verde-50 text-verde-600" : "bg-naranja-50 text-naranja-500"
                    }`}>{e.cobertura}</span></p>
                    {e.nota && <p className="text-xs text-gris-500">{e.nota}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OS específica */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" /> {os.nombre}
        </h3>

        {os.alertas && os.alertas.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="font-semibold text-red-700 text-xs">Alertas</p>
            </div>
            {os.alertas.map((a, i) => <p key={i} className="text-xs text-red-600 ml-6">{a}</p>)}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-gris-700 mb-1">Cobertura</p>
            <p className="text-sm text-gris-600">{mostrarDato(os.coberturaOncologica)}</p>
            {plan?.detalle && <p className="text-sm text-azul-600 mt-1 font-medium">Tu plan: {plan.detalle}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-gris-700 mb-1">Como autorizar</p>
              <p className="text-xs text-gris-600">{mostrarDato(os.procesoAutorizacion.canal)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gris-700 mb-1">Tiempo tipico</p>
              <p className="text-xs text-gris-600">{mostrarDato(os.procesoAutorizacion.tiempoTipico)}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-gris-700 mb-1">Telefono auditoria</p>
              {os.auditoria.telefono ? <p className="text-xs text-azul-600 font-medium">{os.auditoria.telefono}</p> : <Verificando />}
            </div>
            <div>
              <p className="text-xs font-semibold text-gris-700 mb-1">Email auditoria</p>
              {os.auditoria.email ? <a href={`mailto:${os.auditoria.email}`} className="text-xs text-azul-600 no-underline">{os.auditoria.email}</a> : <Verificando />}
            </div>
          </div>
          {os.queAprueban.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gris-700 mb-1">Suelen aprobar</p>
              <div className="flex flex-wrap gap-1">{os.queAprueban.map((i) => <span key={i} className="bg-verde-50 text-verde-700 text-xs px-2 py-0.5 rounded-full">{i}</span>)}</div>
            </div>
          )}
          {os.queNiegan.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gris-700 mb-1">Suelen negar o demorar</p>
              <div className="flex flex-wrap gap-1">{os.queNiegan.map((i) => <span key={i} className="bg-naranja-50 text-naranja-500 text-xs px-2 py-0.5 rounded-full">{i}</span>)}</div>
            </div>
          )}
          {os.programaOncologico && (
            <div className="bg-azul-50 border border-azul-100 rounded-lg p-3 text-xs text-azul-700">
              <strong>Programa:</strong> {os.programaOncologico}
            </div>
          )}
          {esPublico && os.bancoDeDrogas && (
            <div className="bg-gris-50 rounded-lg p-3 text-xs text-gris-700"><strong>BNDE:</strong> {os.bancoDeDrogas}</div>
          )}
          {esPublico && os.limitaciones && (
            <div className="bg-naranja-50 rounded-lg p-3 text-xs text-naranja-600"><strong>Limitaciones:</strong> {os.limitaciones}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── TAB 2: Tu tratamiento ───────────────────────────────────────

function TabTratamiento({ cancer, subtipo, getNivelDroga, nivelesInfo }) {
  return (
    <div className="space-y-6">
      {/* Primera linea */}
      <div>
        <h4 className="font-semibold text-gris-800 mb-2 flex items-center gap-2">
          Tratamiento de primera linea
          <span className="bg-gris-100 text-gris-600 text-xs font-medium px-2 py-0.5 rounded-full">Estandar</span>
        </h4>
        <div className="space-y-2">
          {subtipo.primeraLinea.map((t) => <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />)}
        </div>
      </div>

      {/* Terapias dirigidas */}
      <div>
        <h4 className="font-semibold text-gris-800 mb-2">Terapias dirigidas</h4>
        <p className="text-xs text-gris-500 mb-2">Segun biomarcadores. Consulta con tu medico cuales aplican.</p>
        <div className="space-y-2">
          {subtipo.terapiasDirigidas.map((t) => <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />)}
        </div>
      </div>

      {/* Estudios */}
      <div>
        <h4 className="font-semibold text-gris-800 mb-2">Estudios a pedirle a tu medico</h4>
        <div className="space-y-1.5">
          {subtipo.estudios.map((e) => (
            <div key={e} className="flex items-start gap-2 bg-gris-50 rounded-lg p-2.5">
              <Stethoscope className="w-3.5 h-3.5 text-azul-500 shrink-0 mt-0.5" />
              <span className="text-xs text-gris-700">{e}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opciones nuevas */}
      {subtipo.opcionesNuevas.length > 0 && (
        <div>
          <h4 className="font-semibold text-gris-800 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Opciones nuevas — requieren gestion
          </h4>
          <p className="text-xs text-gris-500 mb-2">No estan en el vademecum. Necesitan reclamo o amparo.</p>
          <div className="space-y-2">
            {subtipo.opcionesNuevas.map((t) => <DrogaConNivel key={t} nombre={t} getNivel={getNivelDroga} niveles={nivelesInfo} />)}
          </div>
        </div>
      )}

      <LeyendaExpandible nivelesInfo={nivelesInfo} />
    </div>
  );
}

// ── TAB 3: Tu reclamo ───────────────────────────────────────────

function TabReclamo({ os, subtipo, config, esPublico, onIniciarReclamo, getNivelDroga }) {
  return (
    <div className="space-y-6">
      {/* Redactar reclamo */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3">Redactar reclamo</h3>
        <p className="text-sm text-gris-600 mb-3">Selecciona el tratamiento que te negaron y te generamos la carta formal con la base legal correcta.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <select defaultValue="" onChange={(e) => {
            if (e.target.value) {
              const nivel = getNivelDroga ? getNivelDroga(e.target.value) : "gestion";
              onIniciarReclamo(e.target.value, nivel);
            }
          }} className="flex-1 bg-gris-50 text-gris-800 rounded-lg px-4 py-3 text-sm border border-gris-200 cursor-pointer min-h-[44px]">
            <option value="" disabled>Elegir tratamiento...</option>
            {[...subtipo.primeraLinea, ...subtipo.terapiasDirigidas, ...subtipo.opcionesNuevas].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 pasos */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3">Si te dicen que no</h3>
        <div className="bg-verde-50 border border-verde-200 rounded-xl p-5">
          <p className="text-verde-800 font-semibold mb-4">Tenes derecho a reclamar.</p>
          <div className="space-y-4">
            {[
              { n: 1, t: "Pedi la negativa por escrito", d: "Es tu derecho. Si no te la dan, manda un email pidiendo formalmente." },
              { n: 2, t: "Reclama a la SSS", d: "Llama al 0800-222-72583 o ingresa a sssalud.gob.ar. Es gratis." },
              { n: 3, t: "Inicia un amparo de salud", d: "Los jueces suelen fallar a favor del paciente en 24-72 horas." },
            ].map((p) => (
              <div key={p.n} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-verde-500 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">{p.n}</div>
                <div>
                  <p className="font-semibold text-gris-800 text-sm">{p.t}</p>
                  <p className="text-xs text-gris-600">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/amparo" className="inline-flex items-center gap-1.5 text-verde-700 font-semibold text-sm mt-4 hover:text-verde-800 no-underline">
            Ver guia completa de amparos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Contactos */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3 flex items-center gap-2">
          <Phone className="w-5 h-5" /> Contactos utiles
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {!esPublico && os.auditoria?.telefono && (
            <div className="bg-azul-50 border border-azul-100 rounded-lg p-4">
              <p className="font-semibold text-gris-800 text-sm mb-1">Auditoria — {os.nombre}</p>
              <a href={`tel:${os.auditoria.telefono.replace(/[^0-9+]/g, "")}`} className="text-azul-600 font-medium text-sm no-underline">{os.auditoria.telefono}</a>
              {os.auditoria.email && <a href={`mailto:${os.auditoria.email}`} className="block text-azul-600 text-xs no-underline mt-0.5">{os.auditoria.email}</a>}
            </div>
          )}
          {getOrganizaciones(config.id).map((org) => (
            <div key={org.nombre} className="bg-gris-50 border border-gris-200 rounded-lg p-4">
              <p className="font-semibold text-gris-800 text-sm mb-0.5">{org.nombre}</p>
              <p className="text-xs text-gris-600 mb-1.5">{org.descripcion}</p>
              <div className="space-y-0.5">
                {org.telefono && <a href={`tel:${org.telefono.replace(/[^0-9+]/g, "")}`} className="block text-azul-600 text-xs no-underline">{org.telefono}</a>}
                {org.whatsapp && <a href={`https://wa.me/${org.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="block text-verde-600 text-xs no-underline">WhatsApp: {org.whatsapp}</a>}
                {org.email && <a href={`mailto:${org.email}`} className="block text-azul-600 text-xs no-underline">{org.email}</a>}
                {org.web && <a href={`https://${org.web}`} target="_blank" rel="noopener noreferrer" className="block text-gris-500 text-xs no-underline">{org.web}</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
