import { useState } from "react";
import {
  Clock,
  Scale,
  Wallet,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Download,
  Phone,
  Globe,
  AlertTriangle,
  ArrowRight,
  Search,
} from "lucide-react";
import {
  queEsUnAmparo,
  cuandoIniciar,
  pasoAPaso,
  documentacionNecesaria,
  formasDeHacerlo,
  preguntasFrecuentes,
} from "../data/amparos";
import { organizaciones, defensoresDelPueblo } from "../data/organizaciones";
import { cartaDocumento, jurisprudencia } from "../data/modelos";

const iconMap = { clock: Clock, scale: Scale, wallet: Wallet };

function SectionTitle({ id, children }) {
  return (
    <h2
      id={id}
      className="text-2xl md:text-3xl font-bold text-azul-700 mb-6 scroll-mt-24"
    >
      {children}
    </h2>
  );
}

/* ── Seccion 1: Que es ───────────────────────────────────────── */
function QueEs() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="que-es">Que es un amparo de salud</SectionTitle>
        <p className="text-lg text-gris-700 mb-8 leading-relaxed">
          {queEsUnAmparo.descripcion}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {queEsUnAmparo.destacados.map((d) => {
            const Icon = iconMap[d.icono];
            return (
              <div
                key={d.icono}
                className="bg-azul-50 border border-azul-100 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-azul-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-azul-700 mb-1">
                  {d.titulo}
                </p>
                <p className="text-sm text-gris-600">{d.texto}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 2: Cuando iniciar ───────────────────────────────── */
function CuandoIniciar() {
  return (
    <section className="py-12 px-4 bg-gris-50">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="cuando">Cuando iniciar un amparo</SectionTitle>
        <p className="text-gris-600 mb-6">
          Podes iniciar un amparo si te pasa alguna de estas situaciones:
        </p>
        <div className="space-y-3">
          {cuandoIniciar.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gris-200"
            >
              <AlertTriangle className="w-5 h-5 text-naranja-500 shrink-0 mt-0.5" />
              <span className="text-gris-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 3: Paso a paso ──────────────────────────────────── */
function PasoAPaso() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="paso-a-paso">
          Paso a paso para hacer un amparo
        </SectionTitle>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-azul-200 hidden md:block" />
          <div className="space-y-8">
            {pasoAPaso.map((paso) => (
              <div key={paso.numero} className="flex gap-4 md:gap-6">
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 bg-azul-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {paso.numero}
                  </div>
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="text-xl font-semibold text-gris-900 mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-gris-600 mb-3">{paso.descripcion}</p>
                  <div className="bg-verde-50 border border-verde-500/20 rounded-lg p-3 text-sm text-verde-700">
                    <strong>Tip:</strong> {paso.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 4: Documentacion ────────────────────────────────── */
function Documentacion() {
  const [checked, setChecked] = useState(
    new Array(documentacionNecesaria.length).fill(false)
  );
  const toggle = (i) =>
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <section className="py-12 px-4 bg-gris-50">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="documentacion">
          Documentacion necesaria
        </SectionTitle>
        <p className="text-gris-600 mb-2">
          Lista de todo lo que necesitas reunir. Podes marcar lo que ya tenes:
        </p>
        <p className="text-sm text-gris-400 mb-6">
          Podes imprimir esta pagina para llevar la lista al abogado o defensor.
        </p>
        <div className="space-y-3">
          {documentacionNecesaria.map((doc, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 bg-white p-4 rounded-lg border border-gris-200 text-left hover:border-azul-200 transition-colors cursor-pointer min-h-[44px]"
            >
              <CheckSquare
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  checked[i] ? "text-verde-500" : "text-gris-300"
                }`}
              />
              <div>
                <span
                  className={`font-medium ${
                    checked[i]
                      ? "text-verde-600 line-through"
                      : "text-gris-800"
                  }`}
                >
                  {doc.item}
                </span>
                <p className="text-sm text-gris-500 mt-0.5">{doc.detalle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 5: Tres formas ──────────────────────────────────── */
function TresFormas() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="formas">Tres formas de hacer el amparo</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {formasDeHacerlo.map((f) => (
            <div
              key={f.opcion}
              className="bg-white border border-gris-200 rounded-xl overflow-hidden flex flex-col"
            >
              <div
                className={`px-6 py-4 ${
                  f.costo === "GRATIS"
                    ? "bg-verde-500 text-white"
                    : "bg-azul-700 text-white"
                }`}
              >
                <p className="text-sm opacity-80">Opcion {f.opcion}</p>
                <p className="text-xl font-bold">{f.titulo}</p>
                <p className="text-sm font-semibold mt-1">{f.costo}</p>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4 text-sm">
                {f.costoDetalle && (
                  <p className="text-gris-500">{f.costoDetalle}</p>
                )}
                <div>
                  <p className="font-semibold text-gris-700 mb-1">Quien:</p>
                  <p className="text-gris-600">{f.quien}</p>
                </div>
                <div>
                  <p className="font-semibold text-gris-700 mb-1">
                    Cuando conviene:
                  </p>
                  <p className="text-gris-600">{f.cuandoConviene}</p>
                </div>
                <div>
                  <p className="font-semibold text-gris-700 mb-1">Como:</p>
                  <p className="text-gris-600">{f.como}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gris-100">
                  <p className="text-verde-600">
                    <strong>Ventaja:</strong> {f.ventaja}
                  </p>
                  <p className="text-gris-500 mt-1">
                    <strong>Desventaja:</strong> {f.desventaja}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 6: Carta documento ──────────────────────────────── */
function CartaDocumento() {
  const descargar = () => {
    const blob = new Blob([cartaDocumento.texto], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo_carta_documento_amparo.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-12 px-4 bg-gris-50">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="carta">Modelo de carta documento</SectionTitle>
        <p className="text-gris-600 mb-4">{cartaDocumento.descripcion}</p>
        <div className="bg-white border border-gris-200 rounded-xl p-6 mb-6">
          <p className="text-sm font-semibold text-gris-500 mb-3">
            Campos que tenes que completar:
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {cartaDocumento.campos.map((c) => (
              <span
                key={c}
                className="bg-azul-50 text-azul-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                [{c}]
              </span>
            ))}
          </div>
          <pre className="bg-gris-50 border border-gris-200 rounded-lg p-4 text-sm text-gris-700 overflow-x-auto whitespace-pre-wrap font-[inherit] leading-relaxed">
            {cartaDocumento.texto}
          </pre>
        </div>
        <button
          onClick={descargar}
          className="inline-flex items-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
        >
          <Download className="w-5 h-5" />
          Descargar modelo de carta documento
        </button>
      </div>
    </section>
  );
}

/* ── Seccion 7: Organizaciones ───────────────────────────────── */
function Organizaciones() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="organizaciones">
          Organizaciones que te ayudan
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {organizaciones.map((org) => (
            <div
              key={org.nombre}
              className="bg-white border border-gris-200 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gris-900">
                  {org.nombre}
                </h3>
                {org.gratuito && (
                  <span className="bg-verde-50 text-verde-600 text-xs font-semibold px-2 py-1 rounded-full">
                    GRATIS
                  </span>
                )}
              </div>
              {org.nombreCompleto && (
                <p className="text-sm text-gris-500 mb-2">
                  {org.nombreCompleto}
                </p>
              )}
              <p className="text-gris-600 text-sm mb-4">{org.queHacen}</p>
              {org.nota && (
                <p className="text-naranja-500 text-sm font-medium mb-3">
                  {org.nota}
                </p>
              )}
              <div className="space-y-2 text-sm">
                {org.telefono && (
                  <a
                    href={`tel:${org.telefono.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 text-azul-600 hover:text-azul-700 no-underline"
                  >
                    <Phone className="w-4 h-4" />
                    {org.telefono}
                  </a>
                )}
                {org.web && (
                  <a
                    href={org.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-azul-600 hover:text-azul-700 no-underline"
                  >
                    <Globe className="w-4 h-4" />
                    {org.web.replace("https://www.", "").replace("https://", "")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 8: Defensores del pueblo ────────────────────────── */
function Defensores() {
  const [filtro, setFiltro] = useState("");
  const filtrados = filtro
    ? defensoresDelPueblo.filter((d) =>
        d.provincia.toLowerCase().includes(filtro.toLowerCase())
      )
    : defensoresDelPueblo;

  return (
    <section className="py-12 px-4 bg-gris-50">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="defensores">
          Defensores del Pueblo por provincia
        </SectionTitle>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-400" />
          <input
            type="text"
            placeholder="Buscar provincia..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gris-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-500 focus:border-azul-500 text-base"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gris-200 rounded-xl overflow-hidden text-sm">
            <thead>
              <tr className="bg-azul-700 text-white">
                <th className="px-4 py-3 text-left font-semibold">
                  Provincia
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Defensoria
                </th>
                <th className="px-4 py-3 text-left font-semibold">Telefono</th>
                <th className="px-4 py-3 text-left font-semibold">Web</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((d) => (
                <tr
                  key={d.provincia}
                  className="border-t border-gris-100 hover:bg-gris-50"
                >
                  <td className="px-4 py-3 font-medium text-gris-800">
                    {d.provincia}
                  </td>
                  <td className="px-4 py-3 text-gris-600">{d.nombre}</td>
                  <td className="px-4 py-3">
                    {d.telefono ? (
                      <a
                        href={`tel:${d.telefono.replace(/[^0-9+]/g, "")}`}
                        className="text-azul-600 hover:text-azul-700 no-underline"
                      >
                        {d.telefono}
                      </a>
                    ) : (
                      <span className="text-gris-400">Por confirmar</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {d.web ? (
                      <a
                        href={d.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-azul-600 hover:text-azul-700 no-underline"
                      >
                        Ver sitio
                      </a>
                    ) : (
                      <span className="text-gris-400">Por confirmar</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtrados.length === 0 && (
          <p className="text-center text-gris-500 py-6">
            No se encontro esa provincia. Proba con otro nombre.
          </p>
        )}
      </div>
    </section>
  );
}

/* ── Seccion 9: Jurisprudencia ───────────────────────────────── */
function Jurisprudencia() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="jurisprudencia">
          Casos que ganaron — Jurisprudencia
        </SectionTitle>
        <p className="text-gris-600 mb-6">
          Estos son casos reales donde pacientes oncologicos ganaron amparos en
          Argentina. Otros ganaron, vos tambien podes.
        </p>
        <div className="space-y-6">
          {jurisprudencia.map((caso, i) => (
            <div
              key={i}
              className="bg-white border border-gris-200 rounded-xl p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="font-bold text-gris-900">{caso.titulo}</h3>
                <span className="bg-verde-50 text-verde-600 text-xs font-semibold px-2 py-1 rounded-full">
                  {caso.resultado}
                </span>
              </div>
              <p className="text-sm text-gris-500 mb-3">
                {caso.tribunal} — {caso.provincia}, {caso.anio}
              </p>
              <p className="text-gris-600 leading-relaxed">{caso.resumen}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seccion 10: FAQ ─────────────────────────────────────────── */
function FAQ() {
  const [abierto, setAbierto] = useState(null);

  return (
    <section className="py-12 px-4 bg-gris-50">
      <div className="max-w-4xl mx-auto">
        <SectionTitle id="faq">Preguntas frecuentes</SectionTitle>
        <div className="space-y-3">
          {preguntasFrecuentes.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gris-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setAbierto(abierto === i ? null : i)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-gris-50 transition-colors cursor-pointer min-h-[44px]"
              >
                <span className="font-semibold text-gris-800 pr-4">
                  {faq.pregunta}
                </span>
                {abierto === i ? (
                  <ChevronUp className="w-5 h-5 text-gris-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gris-400 shrink-0" />
                )}
              </button>
              {abierto === i && (
                <div className="px-6 pb-4 text-gris-600 leading-relaxed">
                  {faq.respuesta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Navegacion interna ──────────────────────────────────────── */
function NavInterna() {
  const secciones = [
    { id: "que-es", label: "Que es" },
    { id: "cuando", label: "Cuando iniciar" },
    { id: "paso-a-paso", label: "Paso a paso" },
    { id: "documentacion", label: "Documentacion" },
    { id: "formas", label: "Tres formas" },
    { id: "carta", label: "Carta documento" },
    { id: "organizaciones", label: "Organizaciones" },
    { id: "defensores", label: "Defensores" },
    { id: "jurisprudencia", label: "Jurisprudencia" },
    { id: "faq", label: "Preguntas" },
  ];

  return (
    <nav className="bg-white border-b border-gris-200 sticky top-0 z-20 no-print">
      <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {secciones.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm px-3 py-2 rounded-full border border-gris-200 text-gris-600 hover:bg-azul-50 hover:text-azul-700 hover:border-azul-200 transition-colors no-underline whitespace-nowrap min-h-[36px] flex items-center"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ── Pagina principal ────────────────────────────────────────── */
export default function Amparo() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-azul-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Guia completa de amparos de salud
          </h1>
          <p className="text-lg text-azul-100">
            Todo lo que necesitas saber para defender tu derecho al tratamiento
            oncologico. Paso a paso, en lenguaje simple.
          </p>
        </div>
      </section>

      <NavInterna />
      <QueEs />
      <CuandoIniciar />
      <PasoAPaso />
      <Documentacion />
      <TresFormas />
      <CartaDocumento />
      <Organizaciones />
      <Defensores />
      <Jurisprudencia />
      <FAQ />
    </div>
  );
}
