import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock, Scale, Wallet, CheckSquare, ChevronDown, ChevronUp,
  Download, Phone, Globe, AlertTriangle, ArrowRight, Search,
  Shield, FileText, Users, Gavel, Info, ExternalLink,
} from "lucide-react";
import {
  queEsUnAmparo, cuandoIniciar, pasoAPaso,
  documentacionNecesaria, formasDeHacerlo, preguntasFrecuentes,
} from "../data/amparos";
import { organizaciones, defensoresDelPueblo } from "../data/organizaciones";
import { cartaDocumento } from "../data/modelos";
import { principiosGenerales, falloPMOPiso } from "../data/jurisprudencia";

const TABS = [
  { id: "promesa", label: "PROMESA", icon: Gavel },
  { id: "como", label: "Como reclamar", icon: FileText },
  { id: "ayuda", label: "Quien te ayuda", icon: Users },
  { id: "fallos", label: "Jurisprudencia", icon: Scale },
];

export default function Amparo() {
  const [tab, setTab] = useState("promesa");

  return (
    <div>
      {/* Hero */}
      <section className="bg-azul-700 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Amparos de salud en Argentina
          </h1>
          <p className="text-azul-100 text-lg">
            Como reclamar tu derecho al tratamiento. Paso a paso, en lenguaje simple.
          </p>
        </div>
      </section>

      {/* Contexto — parrafo + leer mas */}
      <ContextoAmparos />

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gris-200 rounded-t-xl sticky top-0 z-20">
          <div className="flex">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent min-h-[48px] ${
                    active ? "border-azul-700 text-azul-700 bg-azul-50" : "border-transparent text-gris-500 hover:text-gris-700 hover:bg-gris-50"
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden text-xs">{t.label.split(" ").pop()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border-x border-b border-gris-200 rounded-b-xl p-5 mb-8">
          {tab === "promesa" && <TabPromesa />}
          {tab === "como" && <TabComoReclamar />}
          {tab === "ayuda" && <TabQuienTeAyuda />}
          {tab === "fallos" && <TabJurisprudencia />}
        </div>
      </div>
    </div>
  );
}

// ── Contexto con "leer mas" ─────────────────────────────────────

function ContextoAmparos() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-azul-50 border border-azul-100 rounded-xl p-5">
        <p className="text-sm text-azul-800">
          En 2024 se iniciaron <strong>10.072 amparos de salud</strong> en Argentina, un crecimiento del 471% respecto a 2023.
          Mas del 80% se resolvieron favorablemente para el paciente.
          Desde septiembre 2025 existe <strong>PROMESA</strong>, una via de mediacion que puede resolver el conflicto sin ir a la justicia.
        </p>
        <p className="text-xs text-azul-600 mt-1">
          Fuentes: Decreto 379/2025 (Boletin Oficial), OLEGISAR
        </p>

        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-azul-700 font-medium mt-3 cursor-pointer bg-transparent border-none hover:text-azul-800">
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Cerrar" : "Leer mas sobre amparos en Argentina"}
        </button>

        {expanded && (
          <div className="mt-4 space-y-3 text-xs text-azul-700 border-t border-azul-200 pt-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="font-semibold">Tendencia historica</p>
                <p>2011: 1.130 amparos → 2018: 5.474 → 2024: 10.072</p>
                <p>Los amparos de salud representaron el 45% de la carga judicial federal en 2019.</p>
              </div>
              <div>
                <p className="font-semibold">Tiempos (estudio SciELO, 405 casos)</p>
                <p>Mediana desde solicitud hasta recibir medicacion: 150 dias</p>
                <p>Mediana del proceso judicial: 37 dias</p>
                <p>80% de los amparos son por denegacion de cobertura</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Medicamentos mas litigados (SciELO 2017-2020, muestra de 405 amparos)</p>
              <p>Oncologia: Palbociclib (ca. mama) 5.9%, Nivolumab 3%, Pembrolizumab 2.5%, Trastuzumab 1.5%</p>
              <p>Enf. poco frecuentes: Nusinersen (AME) 21.7%, Agalsidasa-alfa (Fabry) 4.7%</p>
              <p>Diabetes: sensores de glucosa continuo y bombas de insulina son los principales motivos de amparo en diabetes (fuente: fallos Cam. Fed. Salta 2025, CNACCF Sala I 2019, Sala II 2018)</p>
              <p className="mt-1">69.4% de las drogas litigadas tenian aprobacion ANMAT. 87.1% de evaluaciones CONETEC fueron negativas.</p>
            </div>
            <p className="text-xs text-azul-500">
              Fuentes: Decreto 379/2025, SciELO (Medicina Buenos Aires, 2024, S0025-76802024000500445), OLEGISAR
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB 1: PROMESA ──────────────────────────────────────────────

function TabPromesa() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-2">
          PROMESA — Mediacion prejudicial en salud
        </h3>
        <p className="text-sm text-gris-600 mb-4">
          Desde septiembre 2025, existe una via para resolver conflictos con tu obra social
          o prepaga <strong>sin ir a la justicia</strong>. Se llama PROMESA (Decreto 379/2025).
        </p>
      </div>

      <div className="bg-verde-50 border border-verde-200 rounded-lg p-4">
        <p className="font-semibold text-verde-800 mb-3">Como funciona</p>
        <div className="space-y-3">
          {[
            { n: 1, t: "Inicialo por TAD", d: "Entra a tramitesadistancia.gob.ar y busca 'Mediacion prejudicial en materia de salud (PROMESA)'. Completa el formulario." },
            { n: 2, t: "Se sortea un mediador", d: "El Ministerio de Justicia asigna un mediador especializado en salud." },
            { n: 3, t: "Primera audiencia en 5 dias", d: "El mediador fija la audiencia. Tu OS esta obligada a participar — no puede negarse." },
            { n: 4, t: "Si hay acuerdo, tiene fuerza legal", d: "Se firma un acta con validez legal. La OS debe cumplir." },
            { n: 5, t: "Si no hay acuerdo, podes ir al amparo", d: "PROMESA no te quita el derecho al amparo. Si la mediacion no resuelve, la via judicial sigue abierta." },
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
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gris-50 rounded-lg p-4">
          <p className="font-semibold text-gris-800 text-sm mb-2">Requisitos</p>
          <ul className="text-xs text-gris-600 space-y-1">
            <li>• Abogado patrocinante (se puede pedir patrocinio gratuito)</li>
            <li>• Identificar la OS/prepaga demandada</li>
            <li>• Describir el motivo del reclamo</li>
            <li>• Pago de arancel al Ministerio de Justicia</li>
          </ul>
        </div>
        <div className="bg-gris-50 rounded-lg p-4">
          <p className="font-semibold text-gris-800 text-sm mb-2">Aplica a</p>
          <ul className="text-xs text-gris-600 space-y-1">
            <li>• Obras sociales nacionales (Ley 23.660)</li>
            <li>• Prepagas (Ley 26.682)</li>
            <li>• Seguro Nacional de Salud (Ley 23.661)</li>
          </ul>
          <p className="text-xs text-naranja-500 mt-2 font-medium">No aplica a: sistema publico ni obras sociales provinciales</p>
        </div>
      </div>

      <div className="bg-azul-50 border border-azul-100 rounded-lg p-4 text-sm">
        <p className="font-semibold text-azul-700 mb-1">Contacto</p>
        <p className="text-azul-600">consultasmediacion@jus.gob.ar</p>
        <p className="text-azul-600">SSS: 0800-222-72583</p>
        <p className="text-xs text-azul-500 mt-2">Fuente: Decreto 379/2025, Res. Conjunta 1/2025, guia FADEPOF julio 2025</p>
      </div>

      {/* Link al asistente de reclamo */}
      <div className="mt-6 pt-4 border-t border-gris-200">
        <p className="text-sm text-gris-600 mb-3">Si ya sabes que tratamiento te negaron, MapaSalud te genera la solicitud PROMESA con tus datos y la base legal correspondiente.</p>
        <Link to="/cobertura" className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-medium px-5 py-3 rounded-lg text-sm transition-colors no-underline">
          Generar solicitud PROMESA <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// ── TAB 2: Como reclamar ────────────────────────────────────────

function TabComoReclamar() {
  const [checked, setChecked] = useState(new Array(documentacionNecesaria.length).fill(false));
  const toggle = (i) => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  const [showCarta, setShowCarta] = useState(false);

  return (
    <div className="space-y-6">
      {/* Que es un amparo */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-2">Que es un amparo de salud</h3>
        <p className="text-sm text-gris-600">{queEsUnAmparo.descripcion}</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {queEsUnAmparo.destacados.map((d) => (
            <div key={d.icono} className="bg-azul-50 border border-azul-100 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-azul-700">{d.titulo}</p>
              <p className="text-xs text-gris-600 mt-1">{d.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cuando iniciar */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-2">Cuando tiene sentido iniciar un amparo</h3>
        <div className="space-y-2">
          {cuandoIniciar.map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-gris-50 p-3 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-naranja-500 shrink-0 mt-0.5" />
              <span className="text-sm text-gris-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Paso a paso */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3" id="paso-a-paso">Paso a paso</h3>
        <p className="text-xs text-gris-500 mb-3">
          Recomendamos intentar PROMESA primero (tab anterior). Si no resuelve, estos son los pasos del amparo judicial:
        </p>
        <div className="space-y-4">
          {pasoAPaso.map((paso) => (
            <div key={paso.numero} className="flex gap-4">
              <div className="w-10 h-10 bg-azul-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{paso.numero}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gris-900 text-sm">{paso.titulo}</h4>
                <p className="text-xs text-gris-600 mt-1">{paso.descripcion}</p>
                <div className="bg-verde-50 border border-verde-200 rounded-lg p-2 text-xs text-verde-700 mt-2">
                  <strong>Tip:</strong> {paso.tip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentacion */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-2">Documentacion necesaria</h3>
        <p className="text-xs text-gris-500 mb-3">Marca lo que ya tenes:</p>
        <div className="space-y-2">
          {documentacionNecesaria.map((doc, i) => (
            <button key={i} onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 bg-white p-3 rounded-lg border border-gris-200 text-left cursor-pointer min-h-[44px] hover:border-azul-200 transition-colors">
              <CheckSquare className={`w-5 h-5 shrink-0 mt-0.5 ${checked[i] ? "text-verde-500" : "text-gris-300"}`} />
              <div>
                <span className={`text-sm font-medium ${checked[i] ? "text-verde-600 line-through" : "text-gris-800"}`}>{doc.item}</span>
                <p className="text-xs text-gris-500 mt-0.5">{doc.detalle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tres formas */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3">Tres formas de hacer el amparo</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {formasDeHacerlo.map((f) => (
            <div key={f.opcion} className="bg-white border border-gris-200 rounded-xl overflow-hidden flex flex-col">
              <div className={`px-4 py-3 ${f.costo === "GRATIS" ? "bg-verde-500 text-white" : "bg-azul-700 text-white"}`}>
                <p className="text-xs opacity-80">Opcion {f.opcion}</p>
                <p className="font-bold">{f.titulo}</p>
                <p className="text-xs font-semibold mt-1">{f.costo}</p>
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2 text-xs">
                {f.costoDetalle && <p className="text-gris-500">{f.costoDetalle}</p>}
                <p><strong>Quien:</strong> {f.quien}</p>
                <p><strong>Cuando:</strong> {f.cuandoConviene}</p>
                <div className="mt-auto pt-3 border-t border-gris-100">
                  <p className="text-verde-600"><strong>Ventaja:</strong> {f.ventaja}</p>
                  <p className="text-gris-500 mt-1"><strong>Desventaja:</strong> {f.desventaja}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carta documento */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-2">Modelo de carta documento</h3>
        <p className="text-sm text-gris-600 mb-3">{cartaDocumento.descripcion}</p>
        <button onClick={() => setShowCarta(!showCarta)}
          className="flex items-center gap-1.5 text-sm text-azul-600 font-medium cursor-pointer bg-transparent border-none hover:text-azul-700">
          <ChevronDown className={`w-4 h-4 transition-transform ${showCarta ? "rotate-180" : ""}`} />
          {showCarta ? "Ocultar modelo" : "Ver modelo de carta documento"}
        </button>
        {showCarta && (
          <pre className="bg-gris-50 border border-gris-200 rounded-lg p-4 text-xs text-gris-700 overflow-x-auto whitespace-pre-wrap font-[inherit] leading-relaxed mt-3">
            {cartaDocumento.texto}
          </pre>
        )}
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3">Preguntas frecuentes</h3>
        <FAQ />
      </div>
    </div>
  );
}

// ── TAB 3: Quien te ayuda ───────────────────────────────────────

function TabQuienTeAyuda() {
  const [filtro, setFiltro] = useState("");
  const filtrados = filtro
    ? defensoresDelPueblo.filter((d) => d.provincia.toLowerCase().includes(filtro.toLowerCase()))
    : defensoresDelPueblo;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3">Organizaciones</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {organizaciones.map((org) => (
            <div key={org.nombre} className="bg-gris-50 border border-gris-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm text-gris-900">{org.nombre}</h4>
                {org.gratuito && <span className="bg-verde-50 text-verde-600 text-xs font-semibold px-2 py-0.5 rounded-full">GRATIS</span>}
              </div>
              {org.nombreCompleto && <p className="text-xs text-gris-500 mb-1">{org.nombreCompleto}</p>}
              <p className="text-xs text-gris-600 mb-2">{org.queHacen}</p>
              {org.nota && <p className="text-xs text-naranja-500 font-medium mb-2">{org.nota}</p>}
              <div className="space-y-1 text-xs">
                {org.telefono && <a href={`tel:${org.telefono.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-1 text-azul-600 no-underline"><Phone className="w-3 h-3" />{org.telefono}</a>}
                {org.web && <a href={org.web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-azul-600 no-underline"><Globe className="w-3 h-3" />{org.web.replace("https://www.", "")}</a>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-3">Defensores del Pueblo por provincia</h3>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-400" />
          <input type="text" placeholder="Buscar provincia..." value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gris-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-500 min-h-[44px]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gris-200 rounded-lg overflow-hidden text-xs">
            <thead><tr className="bg-azul-700 text-white">
              <th className="px-3 py-2 text-left">Provincia</th>
              <th className="px-3 py-2 text-left">Telefono</th>
              <th className="px-3 py-2 text-left">Web</th>
            </tr></thead>
            <tbody>
              {filtrados.map((d) => (
                <tr key={d.provincia} className="border-t border-gris-100 hover:bg-gris-50">
                  <td className="px-3 py-2 font-medium text-gris-800">{d.provincia}</td>
                  <td className="px-3 py-2">{d.telefono ? <a href={`tel:${d.telefono.replace(/[^0-9+]/g, "")}`} className="text-azul-600 no-underline">{d.telefono}</a> : <span className="text-gris-400">Por confirmar</span>}</td>
                  <td className="px-3 py-2">{d.web ? <a href={d.web} target="_blank" rel="noopener noreferrer" className="text-azul-600 no-underline">Ver sitio</a> : <span className="text-gris-400">Por confirmar</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TAB 4: Jurisprudencia ───────────────────────────────────────

function TabJurisprudencia() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-azul-700 mb-2">Principios establecidos por la CSJN</h3>
        <p className="text-xs text-gris-500 mb-3">Fallos de la Corte Suprema que establecieron los principios fundamentales del derecho a la salud en Argentina.</p>
        <div className="space-y-3">
          {principiosGenerales.map((fallo) => (
            <FalloCard key={fallo.cita} fallo={fallo} />
          ))}
          <FalloCard fallo={falloPMOPiso} />
        </div>
      </div>

      <div className="bg-gris-50 rounded-lg p-4 text-xs text-gris-600">
        <p className="font-semibold text-gris-700 mb-1">Sobre esta jurisprudencia</p>
        <p>MapaSalud tiene 40 fallos verificados con caratula, tribunal, y fecha, organizados por tipo de reclamo y provincia. Los fallos especificos para cada droga/insumo se muestran en la seccion de cobertura, con links a las fuentes.</p>
        <p className="mt-1">Archivo de respaldo: <a href="https://github.com/JuanBlanco9/mapasalud-fallos" target="_blank" rel="noopener noreferrer" className="text-azul-600 no-underline">github.com/JuanBlanco9/mapasalud-fallos</a> (CC0)</p>
      </div>
    </div>
  );
}

function FalloCard({ fallo }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-gris-200 rounded-lg p-4">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between text-left cursor-pointer bg-transparent border-none gap-2">
        <div>
          <p className="font-semibold text-sm text-gris-900">{fallo.caratula}</p>
          <p className="text-xs text-gris-500 mt-0.5">{fallo.tribunal} — {fallo.fecha}</p>
          {fallo.cita && <p className="text-xs text-azul-600 mt-0.5">{fallo.cita}</p>}
        </div>
        <ChevronDown className={`w-4 h-4 text-gris-400 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gris-100">
          <p className="text-xs text-gris-600">{fallo.ordeno}</p>
          {fallo.principio && <p className="text-xs text-azul-700 font-medium mt-2">Principio: {fallo.principio}</p>}
          {fallo.fuente && <p className="text-xs text-gris-400 mt-1">Fuente: {fallo.fuente}</p>}
        </div>
      )}
    </div>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────

function FAQ() {
  const [abierto, setAbierto] = useState(null);
  return (
    <div className="space-y-2">
      {preguntasFrecuentes.map((faq, i) => (
        <div key={i} className="bg-white border border-gris-200 rounded-lg overflow-hidden">
          <button onClick={() => setAbierto(abierto === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gris-50 transition-colors cursor-pointer bg-transparent border-none min-h-[44px]">
            <span className="font-semibold text-sm text-gris-800 pr-4">{faq.pregunta}</span>
            {abierto === i ? <ChevronUp className="w-4 h-4 text-gris-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gris-400 shrink-0" />}
          </button>
          {abierto === i && <div className="px-4 pb-3 text-xs text-gris-600 leading-relaxed">{faq.respuesta}</div>}
        </div>
      ))}
    </div>
  );
}
