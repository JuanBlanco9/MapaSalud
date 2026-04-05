import { useState } from "react";
import PropTypes from "prop-types";
import {
  FileText,
  Copy,
  Download,
  Check,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { generarTemplateFallback } from "../data/templatesCarta";
import {
  getJurisprudenciaRelevante,
  formatCitaJurisprudencial,
  filtrarFallosPorAplicabilidad,
} from "../data/jurisprudencia";
import { OS_ID, TIPO_DOCUMENTO } from "../constants";
import { useCobertura } from "../context/CoberturaContext";
import ProgresoCarta from "./reclamo/ProgresoCarta";
import PanelFirma from "./reclamo/PanelFirma";
import { generarReclamoPDF } from "../utils/generarReclamoPDF";

const PREGUNTAS_RESPUESTA = [
  { id: "sin_respuesta", label: "No me respondieron (mas de 5 dias habiles)" },
  { id: "negativa_verbal", label: "Me lo negaron verbalmente" },
  { id: "negativa_escrita", label: "Me lo negaron por escrito" },
  { id: "aprobado_no_entregan", label: "Me lo aprobaron pero no me lo entregan" },
];

const OPCIONES_NEGATIVA_ESCRITA = [
  { id: TIPO_DOCUMENTO.CARTA_DOCUMENTO, label: "Carta documento (enviar por correo a la OS)", desc: "Intima a la OS a responder. Paso previo al amparo." },
  { id: TIPO_DOCUMENTO.PROMESA, label: "PROMESA — mediacion prejudicial (mas rapido)", desc: "Mediacion oficial (DNU 379/2025). La OS no puede negarse. Primera audiencia en 5 dias. Requiere abogado — te armamos el resumen del caso." },
];

function determinarTipoDocumento(respuestaOS, opcionEscrita) {
  if (respuestaOS === "negativa_escrita" && opcionEscrita) return opcionEscrita;
  switch (respuestaOS) {
    case "sin_respuesta": return TIPO_DOCUMENTO.SEGUIMIENTO;
    case "negativa_verbal": return TIPO_DOCUMENTO.PEDIR_NEGATIVA;
    case "negativa_escrita": return TIPO_DOCUMENTO.CARTA_DOCUMENTO;
    case "aprobado_no_entregan": return TIPO_DOCUMENTO.INTIMACION_ENTREGA;
    default: return TIPO_DOCUMENTO.CARTA_DOCUMENTO;
  }
}

const TIPO_LABELS = {
  [TIPO_DOCUMENTO.SEGUIMIENTO]: "Email de seguimiento formal",
  [TIPO_DOCUMENTO.PEDIR_NEGATIVA]: "Email solicitando negativa por escrito",
  [TIPO_DOCUMENTO.CARTA_DOCUMENTO]: "Carta documento",
  [TIPO_DOCUMENTO.INTIMACION_ENTREGA]: "Carta documento por falta de entrega",
  [TIPO_DOCUMENTO.PROMESA]: "Resumen del caso para tu abogado (PROMESA)",
  [TIPO_DOCUMENTO.RECLAMO_PUBLICO]: "Nota al Director del hospital",
};

// ── Componente principal ────────────────────────────────────────

export default function AsistenteReclamo({
  tratamiento,
  nivelCobertura,
  onBack,
}) {
  const { os, plan, cancer, subtipo, patologiaId } = useCobertura();
  const [step, setStep] = useState("preguntas");
  const [yaSolicito, setYaSolicito] = useState(null);
  const [respuestaOS, setRespuestaOS] = useState(null);
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [documento, setDocumento] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [usandoFallback, setUsandoFallback] = useState(false);
  const [firmaDataUrl, setFirmaDataUrl] = useState(null);
  const [opcionEscrita, setOpcionEscrita] = useState(null);

  const [datos, setDatos] = useState({
    nombre: "",
    dni: "",
    domicilio: "",
    telefono: "",
    email: "",
    medico: "",
    matricula: "",
  });

  const tipoDocumento = determinarTipoDocumento(respuestaOS, opcionEscrita);
  const necesitaElegirOpcion = respuestaOS === "negativa_escrita" && !opcionEscrita;
  const puedeIrADatos = yaSolicito !== null && (yaSolicito === false || (respuestaOS !== null && !necesitaElegirOpcion));
  const datosCompletos =
    datos.nombre.trim() &&
    datos.dni.trim() &&
    datos.domicilio.trim() &&
    datos.medico.trim() &&
    datos.matricula.trim();

  function handleDato(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  function generar() {
    setStep("generando");
    const esPublicoOS = os.id === OS_ID.HOSPITAL_PUBLICO;
    const tipoDoc = esPublicoOS ? TIPO_DOCUMENTO.RECLAMO_PUBLICO : (yaSolicito === false ? TIPO_DOCUMENTO.CARTA_DOCUMENTO : tipoDocumento);

    let carta = generarTemplateFallback({
      obraSocial: os.nombre,
      plan: plan?.nombre || null,
      diagnostico: cancer.nombre,
      subtipo: subtipo.nombre,
      tratamiento,
      fechaSolicitud: fechaSolicitud || null,
      tipoDocumento: tipoDoc,
      patologiaId,
      nivelCobertura,
    });

    carta = reemplazarDatos(carta, datos);

    const jurisp = getJurisprudenciaRelevante(patologiaId, subtipo?.id);
    let fallosAplicables = filtrarFallosPorAplicabilidad(jurisp.especificos, "alto");

    if (esPublicoOS) {
      const fallosEstado = [...jurisp.principios, ...fallosAplicables].filter((f) => {
        const car = (f.caratula || "").toLowerCase();
        return car.includes("estado") || car.includes("ministerio") || car.includes("provincia") || car.includes("pami") || car.includes("incluir salud");
      });
      if (fallosEstado.length > 0) fallosAplicables = fallosEstado;
    }

    if (fallosAplicables.length > 0) {
      const citas = fallosAplicables
        .slice(0, 3)
        .map(formatCitaJurisprudencial)
        .join(";\n");
      const cierre = carta.includes("Sin otro particular, saludo a Uds.")
        ? "Sin otro particular, saludo a Uds. atentamente."
        : "Sin otro particular, saludo a Ud. atentamente.";
      carta = carta.replace(
        cierre,
        `La jurisprudencia ha resuelto en casos analogos la obligatoriedad de esta cobertura, entre otros:\n${citas}.\n\n${cierre}`
      );
    }

    setDocumento(carta);
    setUsandoFallback(false);
    setTimeout(() => setStep("resultado"), 400);
  }

  function reemplazarDatos(texto, d) {
    return texto
      .replace(/\[COMPLETAR NOMBRE COMPLETO\]|\[COMPLETAR NOMBRE\]/g, d.nombre || "[COMPLETAR NOMBRE]")
      .replace(/\[COMPLETAR\] *\n *DNI/g, `${d.dni}\nDNI`)
      .replace(/DNI:? \[COMPLETAR\]/g, `DNI: ${d.dni || "[COMPLETAR DNI]"}`)
      .replace(/\[COMPLETAR DOMICILIO\]/g, d.domicilio || "[COMPLETAR DOMICILIO]")
      .replace(/Email: \[COMPLETAR\]/g, `Email: ${d.email || "[COMPLETAR]"}`)
      .replace(/Telefono: \[COMPLETAR\]/g, `Telefono: ${d.telefono || "[COMPLETAR]"}`)
      .replace(/\[COMPLETAR NOMBRE DEL MEDICO\]/g, d.medico || "[COMPLETAR MEDICO]")
      .replace(/\[COMPLETAR MATRICULA\]/g, d.matricula || "[COMPLETAR MATRICULA]");
  }

  function copiar() {
    navigator.clipboard.writeText(documento);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function descargar() {
    const blob = new Blob([documento], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MapaSalud_reclamo_${os.nombre.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── PASO 1: Preguntas ─────────────────────────────────────────
  if (step === "preguntas") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a mi mapa
        </button>

        <ProgresoCarta paso={1} />

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-2">
            Asistente de reclamo
          </h2>
          <p className="text-gris-600">
            {os.id === OS_ID.HOSPITAL_PUBLICO
              ? <>Te ayudamos a redactar una nota formal al hospital para solicitar <strong>{tratamiento}</strong>.</>
              : <>Te ayudamos a redactar la comunicacion formal para reclamar la cobertura de <strong>{tratamiento}</strong>.</>}
          </p>
        </div>

        {/* Hospital publico: ir directo a datos */}
        {os.id === OS_ID.HOSPITAL_PUBLICO && (
          <div className="space-y-6">
            <div className="bg-azul-50 border border-azul-100 rounded-lg p-4 text-sm text-azul-700">
              <p>Vamos a generar una <strong>nota formal al Director del hospital</strong> solicitando la provision del tratamiento, con cita de la normativa y jurisprudencia que respalda tu derecho.</p>
            </div>
            <button
              onClick={() => { setStep("datos"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full flex items-center justify-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]">
              Siguiente: tus datos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* OS/Prepaga: preguntas normales */}
        {os.id !== OS_ID.HOSPITAL_PUBLICO && <div className="space-y-6">
          <div className="bg-white border border-gris-200 rounded-xl p-5">
            <p className="font-semibold text-gris-800 mb-3">
              ¿Ya pediste este tratamiento formalmente a {os.nombre}?
            </p>
            <div className="flex gap-3">
              {[
                { val: true, label: "Si, ya lo pedi" },
                { val: false, label: "No, todavia no" },
              ].map((opt) => (
                <button
                  key={String(opt.val)}
                  onClick={() => { setYaSolicito(opt.val); if (!opt.val) setRespuestaOS(null); }}
                  className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium cursor-pointer transition-colors min-h-[44px] ${
                    yaSolicito === opt.val
                      ? "bg-azul-700 text-white border-azul-700"
                      : "bg-white text-gris-700 border-gris-200 hover:border-azul-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {yaSolicito === true && (
            <div className="bg-white border border-gris-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-3">¿Que te respondieron?</p>
              <div className="space-y-2">
                {PREGUNTAS_RESPUESTA.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setRespuestaOS(opt.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg border text-sm cursor-pointer transition-colors min-h-[44px] ${
                      respuestaOS === opt.id
                        ? "bg-azul-700 text-white border-azul-700"
                        : "bg-white text-gris-700 border-gris-200 hover:border-azul-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {respuestaOS === "negativa_escrita" && (
            <div className="bg-white border border-gris-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-3">¿Como queres reclamar?</p>
              <div className="space-y-2">
                {OPCIONES_NEGATIVA_ESCRITA.map((opt) => (
                  <button key={opt.id} onClick={() => setOpcionEscrita(opt.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg border text-sm cursor-pointer transition-colors min-h-[44px] ${
                      opcionEscrita === opt.id
                        ? "bg-azul-700 text-white border-azul-700"
                        : "bg-white text-gris-700 border-gris-200 hover:border-azul-200"
                    }`}>
                    <p className="font-medium">{opt.label}</p>
                    <p className={`text-xs mt-0.5 ${opcionEscrita === opt.id ? "text-azul-100" : "text-gris-500"}`}>{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {yaSolicito === true && respuestaOS && !necesitaElegirOpcion && (
            <div className="bg-white border border-gris-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-3">¿Cuando hiciste la solicitud?</p>
              <input
                type="date"
                value={fechaSolicitud}
                onChange={(e) => setFechaSolicitud(e.target.value)}
                className="w-full py-3 px-4 border border-gris-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-500 min-h-[44px]"
              />
            </div>
          )}

          {puedeIrADatos && (
            <button
              onClick={() => { setStep("datos"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full flex items-center justify-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
            >
              Siguiente: tus datos
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>}
      </div>
    );
  }

  // ── PASO 2: Datos personales + firma ──────────────────────────
  if (step === "datos") {
    const campos = [
      { id: "nombre", label: "Nombre completo", required: true, type: "text", placeholder: "Juan Carlos Lopez" },
      { id: "dni", label: "DNI", required: true, type: "text", placeholder: "28.456.789" },
      { id: "domicilio", label: "Domicilio", required: true, type: "text", placeholder: "Av. Corrientes 1234, CABA" },
      { id: "telefono", label: "Telefono", required: false, type: "tel", placeholder: "+54 11 1234-5678" },
      { id: "email", label: "Email", required: false, type: "email", placeholder: "juan@email.com" },
      { id: "medico", label: "Nombre del medico tratante", required: true, type: "text", placeholder: "Dra. Maria Garcia" },
      { id: "matricula", label: "Matricula del medico", required: true, type: "text", placeholder: "MP 12345" },
    ];

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => setStep("preguntas")}
          className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la situacion
        </button>

        <ProgresoCarta paso={2} />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gris-900 mb-2">
            Tus datos para la carta
          </h2>
          <p className="text-gris-500 text-sm">
            Estos datos se usan solo para generar el documento. No se almacenan en ningun servidor.
          </p>
        </div>

        <div className="bg-azul-50 border border-azul-100 rounded-lg p-3 mb-6 text-sm text-azul-700">
          <strong>Vamos a generar:</strong>{" "}
          {yaSolicito === false ? TIPO_LABELS[TIPO_DOCUMENTO.CARTA_DOCUMENTO] : TIPO_LABELS[tipoDocumento]}
          {" "}para {os.nombre}
        </div>

        <div className="space-y-4">
          {campos.map((c) => (
            <div key={c.id}>
              <label className="block text-sm font-medium text-gris-700 mb-1">
                {c.label} {c.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={c.type}
                value={datos[c.id]}
                onChange={(e) => handleDato(c.id, e.target.value)}
                placeholder={c.placeholder}
                className="w-full py-3 px-4 border border-gris-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-500 min-h-[44px]"
              />
            </div>
          ))}

          <div className="pt-4 border-t border-gris-200">
            <PanelFirma onFirmaChange={setFirmaDataUrl} />
          </div>

          <button
            onClick={generar}
            disabled={!datosCompletos}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px] ${
              datosCompletos
                ? "bg-azul-700 hover:bg-azul-800 text-white"
                : "bg-gris-200 text-gris-400 cursor-not-allowed"
            }`}
          >
            Generar documento
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Pantalla de carga ─────────────────────────────────────────
  if (step === "generando") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ProgresoCarta paso={3} />
        <Loader2 className="w-10 h-10 text-azul-500 animate-spin mx-auto mb-4" />
        <p className="text-gris-600 text-lg">Generando tu documento...</p>
        <p className="text-gris-400 text-sm mt-2">Esto puede tardar unos segundos.</p>
      </div>
    );
  }

  // ── PASO 3: Resultado ─────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => setStep("datos")}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Modificar datos
      </button>

      <ProgresoCarta paso={3} />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gris-900 mb-2">
          Tu documento esta listo
        </h2>
        <p className="text-sm text-gris-600">
          {yaSolicito === false ? TIPO_LABELS[TIPO_DOCUMENTO.CARTA_DOCUMENTO] : TIPO_LABELS[tipoDocumento]}
          {" "}para {os.nombre}
        </p>
      </div>

      {usandoFallback && (
        <div className="bg-naranja-50 border border-naranja-500/30 rounded-lg p-4 mb-4 text-sm text-naranja-600">
          <strong>Nota:</strong> Se uso un modelo predefinido. Verifica que todos los datos esten correctos.
        </div>
      )}

      <textarea
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        className="w-full h-96 p-4 border border-gris-200 rounded-xl text-sm font-mono leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-azul-500"
      />

      {firmaDataUrl && (
        <div className="mt-3 p-3 bg-gris-50 rounded-lg">
          <p className="text-xs text-gris-500 mb-2">Firma (se incluye en el PDF):</p>
          <img src={firmaDataUrl} alt="Firma" className="h-12 object-contain" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={copiar}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          {copiado ? (<><Check className="w-4 h-4" /> Copiado</>) : (<><Copy className="w-4 h-4" /> Copiar texto</>)}
        </button>
        <button
          onClick={descargar}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gris-100 hover:bg-gris-200 text-gris-700 font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          <Download className="w-4 h-4" /> Descargar .txt
        </button>
        <button
          onClick={() => generarReclamoPDF({ documento, datos, firmaDataUrl, osNombre: os.nombre })}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-verde-500 hover:bg-verde-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          <Download className="w-4 h-4" /> PDF {firmaDataUrl ? "con firma" : ""}
        </button>
      </div>

      {/* Personalizar con IA — en desarrollo */}
      <div className="mt-4 bg-gris-50 border border-gris-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gris-500">Personalizar con IA</p>
          <p className="text-xs text-gris-400">Adaptar la carta a circunstancias especificas de tu caso</p>
        </div>
        <span className="text-xs bg-gris-200 text-gris-500 px-3 py-1 rounded-full font-medium">
          Proximamente
        </span>
      </div>

      <div className="bg-naranja-50 border border-naranja-500/30 rounded-lg p-4 mt-4 text-sm text-gris-700">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-naranja-600 shrink-0 mt-0.5" />
          <div>
            <p>
              <strong>Revisa este documento con un abogado o la Defensoria del
              Pueblo antes de enviarlo.</strong> MapaSalud no es un estudio
              juridico. Este documento es orientativo y no constituye
              asesoramiento legal profesional.
            </p>
            <p className="mt-2 text-xs text-gris-500">
              Un abogado puede evaluar si la demora o negativa tiene justificacion medica o regulatoria, y adaptar el reclamo a las circunstancias de tu caso.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-verde-50 border border-verde-200 rounded-xl p-5">
        <p className="font-semibold text-verde-800 mb-2">Proximo paso</p>
        {(tipoDocumento === TIPO_DOCUMENTO.PEDIR_NEGATIVA || tipoDocumento === TIPO_DOCUMENTO.SEGUIMIENTO) ? (
          <div className="text-sm text-verde-700 space-y-2">
            <p className="font-medium">1. Envia este email a la auditoria medica de tu obra social:</p>
            {os.auditoria?.email && <p>Email: <strong>{os.auditoria.email}</strong></p>}
            {os.auditoria?.telefono && <p>Telefono: <strong>{os.auditoria.telefono}</strong></p>}
            <p className="font-medium mt-3">2. Si no responden en 10 dias habiles:</p>
            <p className="text-xs text-verde-600">Podes enviar una carta documento (tiene efecto legal) o reclamar ante la SSS (0800-222-72583, gratuito, sin abogado).</p>
            <p className="font-medium mt-3">3. Si siguen sin resolver:</p>
            <p className="text-xs text-verde-600">Podes iniciar PROMESA (mediacion prejudicial, requiere abogado) o un amparo judicial.</p>
          </div>
        ) : tipoDocumento === TIPO_DOCUMENTO.PROMESA ? (
          <div className="text-sm text-verde-700 space-y-2">
            <p className="font-medium">Como usar este documento:</p>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Lleva este resumen a un abogado — es un brief de tu caso</li>
              <li>Tu abogado redactara la solicitud formal de mediacion PROMESA</li>
              <li>Un mediador sera asignado por sorteo. Primera audiencia en 5 dias</li>
              <li>La OS esta obligada a participar — no puede negarse</li>
              <li>Si hay acuerdo, tiene fuerza legal. Si no, podes ir al amparo</li>
            </ol>
            <p className="text-xs text-verde-600 mt-2">Si no tenes abogado: Defensoria del Pueblo de tu provincia (patrocinio gratuito) o Ministerio Publico de la Defensa (mpd.gov.ar).</p>
            <p className="text-xs text-verde-500">Consultas: consultasmediacion@jus.gob.ar</p>
          </div>
        ) : (
          <div className="text-sm text-verde-700 space-y-2">
            <p className="font-medium">Como enviar la carta documento:</p>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Imprimi el documento o copialo en una hoja</li>
              <li>Anda a una sucursal de <strong>Correo Argentino</strong></li>
              <li>Pedi enviar una <strong>carta documento</strong> (no carta simple ni email)</li>
              <li>Lleva el domicilio de la obra social (figura en el documento)</li>
              <li>Guarda el <strong>comprobante de envio</strong> — lo vas a necesitar si inicias amparo</li>
              <li>La carta documento tiene efecto legal desde que la OS la recibe</li>
            </ol>
            <p className="text-xs text-verde-600 mt-2">La OS tiene 10 dias habiles para responder. Si no responde:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-xs text-verde-600">
              <li>Reclamo a la SSS: 0800-222-72583 (gratuito, sin abogado)</li>
              <li>PROMESA: mediacion prejudicial (requiere abogado)</li>
              <li>Amparo judicial (requiere abogado)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

AsistenteReclamo.propTypes = {
  tratamiento: PropTypes.string.isRequired,
  nivelCobertura: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};
