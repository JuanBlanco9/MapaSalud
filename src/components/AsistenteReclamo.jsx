import { useState } from "react";
import {
  FileText,
  Copy,
  Download,
  Check,
  Loader2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { getTextosParaCarta } from "../data/textosLegales";
import { generarTemplateFallback } from "../data/templatesCarta";

const PREGUNTAS_RESPUESTA = [
  { id: "sin_respuesta", label: "No me respondieron (mas de 5 dias habiles)" },
  { id: "negativa_verbal", label: "Me lo negaron verbalmente" },
  { id: "negativa_escrita", label: "Me lo negaron por escrito" },
  { id: "aprobado_no_entregan", label: "Me lo aprobaron pero no me lo entregan" },
];

function determinarTipoDocumento(respuestaOS) {
  switch (respuestaOS) {
    case "sin_respuesta":
      return "seguimiento";
    case "negativa_verbal":
      return "pedir_negativa";
    case "negativa_escrita":
      return "carta_documento";
    case "aprobado_no_entregan":
      return "intimacion_entrega";
    default:
      return "carta_documento";
  }
}

const TIPO_LABELS = {
  seguimiento: "Email de seguimiento formal",
  pedir_negativa: "Email solicitando negativa por escrito",
  carta_documento: "Carta documento de intimacion",
  intimacion_entrega: "Carta documento por falta de entrega",
};

export default function AsistenteReclamo({
  os,
  plan,
  cancer,
  subtipo,
  tratamiento,
  nivelCobertura,
  patologiaId,
  onBack,
}) {
  const [step, setStep] = useState("preguntas"); // preguntas | generando | resultado
  const [yaSolicito, setYaSolicito] = useState(null);
  const [respuestaOS, setRespuestaOS] = useState(null);
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [documento, setDocumento] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [usandoFallback, setUsandoFallback] = useState(false);

  const tipoDocumento = determinarTipoDocumento(respuestaOS);
  const puedeGenerar = yaSolicito !== null && (yaSolicito === false || respuestaOS !== null);

  async function generar() {
    setStep("generando");
    const textos = getTextosParaCarta(patologiaId, nivelCobertura);

    const payload = {
      obraSocial: os.nombre,
      plan: plan?.nombre || null,
      diagnostico: cancer.nombre,
      subtipo: subtipo.nombre,
      tratamiento,
      nivelCobertura,
      tipoDocumento: yaSolicito === false ? "carta_documento" : tipoDocumento,
      fechaSolicitud: fechaSolicitud || null,
      textosLegales: textos,
      patologiaId,
    };

    try {
      const res = await fetch("/api/generar-carta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.useFallback) throw new Error("Fallback requested");
      setDocumento(data.texto);
      setUsandoFallback(false);
    } catch {
      // Fallback a template estático
      const fallback = generarTemplateFallback({
        obraSocial: os.nombre,
        plan: plan?.nombre || null,
        diagnostico: cancer.nombre,
        subtipo: subtipo.nombre,
        tratamiento,
        fechaSolicitud: fechaSolicitud || null,
        tipoDocumento: yaSolicito === false ? "carta_documento" : tipoDocumento,
        patologiaId,
      });
      setDocumento(fallback);
      setUsandoFallback(true);
    }
    setStep("resultado");
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

  // ── Pantalla de preguntas ───────────────────────────────────
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

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gris-900 mb-2">
            Asistente de reclamo
          </h2>
          <p className="text-gris-600">
            Te ayudamos a redactar la comunicacion formal para reclamar la
            cobertura de <strong>{tratamiento}</strong>.
          </p>
        </div>

        <div className="space-y-6">
          {/* Pregunta 1 */}
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
                  onClick={() => {
                    setYaSolicito(opt.val);
                    if (!opt.val) setRespuestaOS(null);
                  }}
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

          {/* Pregunta 2 — solo si ya solicitó */}
          {yaSolicito === true && (
            <div className="bg-white border border-gris-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-3">
                ¿Que te respondieron?
              </p>
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

          {/* Pregunta 3 — fecha */}
          {yaSolicito === true && respuestaOS && (
            <div className="bg-white border border-gris-200 rounded-xl p-5">
              <p className="font-semibold text-gris-800 mb-3">
                ¿Cuando hiciste la solicitud?
              </p>
              <input
                type="date"
                value={fechaSolicitud}
                onChange={(e) => setFechaSolicitud(e.target.value)}
                className="w-full py-3 px-4 border border-gris-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azul-500 min-h-[44px]"
              />
              <p className="text-xs text-gris-400 mt-2">
                Si no recordas la fecha exacta, dejalo vacio y completalo despues en el documento.
              </p>
            </div>
          )}

          {/* Resumen + botón generar */}
          {puedeGenerar && (
            <div className="bg-azul-50 border border-azul-100 rounded-xl p-5">
              <p className="text-sm text-azul-700 mb-3">
                <strong>Vamos a generar:</strong>{" "}
                {yaSolicito === false
                  ? TIPO_LABELS.carta_documento
                  : TIPO_LABELS[tipoDocumento]}
              </p>
              <button
                onClick={generar}
                className="w-full bg-azul-700 hover:bg-azul-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
              >
                Generar documento
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Pantalla de carga ───────────────────────────────────────
  if (step === "generando") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <Loader2 className="w-10 h-10 text-azul-500 animate-spin mx-auto mb-4" />
        <p className="text-gris-600 text-lg">
          Generando tu documento...
        </p>
        <p className="text-gris-400 text-sm mt-2">
          Esto puede tardar unos segundos.
        </p>
      </div>
    );
  }

  // ── Pantalla de resultado ───────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => setStep("preguntas")}
        className="flex items-center gap-1.5 text-azul-600 hover:text-azul-700 mb-6 text-sm cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Cambiar respuestas
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gris-900 mb-2">
          Tu documento esta listo
        </h2>
        <p className="text-sm text-gris-600">
          {yaSolicito === false
            ? TIPO_LABELS.carta_documento
            : TIPO_LABELS[tipoDocumento]}{" "}
          para {os.nombre}
        </p>
      </div>

      {usandoFallback && (
        <div className="bg-naranja-50 border border-naranja-500/30 rounded-lg p-4 mb-4 text-sm text-naranja-600">
          <strong>Nota:</strong> Se uso un modelo predefinido. Completa los
          campos marcados [COMPLETAR] con tus datos.
        </div>
      )}

      {/* Documento editable */}
      <textarea
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        className="w-full h-96 p-4 border border-gris-200 rounded-xl text-sm font-mono leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-azul-500"
      />

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={copiar}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-azul-700 hover:bg-azul-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          {copiado ? (
            <>
              <Check className="w-4 h-4" /> Copiado
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copiar texto
            </>
          )}
        </button>
        <button
          onClick={descargar}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gris-100 hover:bg-gris-200 text-gris-700 font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm border-none min-h-[44px]"
        >
          <Download className="w-4 h-4" /> Descargar .txt
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-naranja-50 border border-naranja-500/30 rounded-lg p-4 mt-6 text-sm text-gris-700">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-naranja-500 shrink-0 mt-0.5" />
          <p>
            <strong>Revisa este documento con un abogado o la Defensoria del
            Pueblo antes de enviarlo.</strong> MapaSalud no es un estudio
            juridico. Este documento es orientativo y no constituye
            asesoramiento legal profesional.
          </p>
        </div>
      </div>

      {/* Accion siguiente */}
      <div className="mt-6 bg-verde-50 border border-verde-200 rounded-xl p-5">
        <p className="font-semibold text-verde-800 mb-2">
          Proximo paso
        </p>
        <p className="text-sm text-verde-700">
          {tipoDocumento === "pedir_negativa"
            ? "Envia este email a la auditoria medica de tu obra social. Si no responden en 48 horas, el siguiente paso es la carta documento."
            : tipoDocumento === "seguimiento"
            ? "Envia este email a la auditoria medica. Si no responden, el siguiente paso es una carta documento formal."
            : tipoDocumento === "intimacion_entrega"
            ? "Envia esta carta documento por correo postal certificado. Guarda el comprobante de envio — lo vas a necesitar si inicias un amparo."
            : "Envia esta carta documento por correo postal certificado. Si no responden en 48 horas, el siguiente paso es el amparo judicial. Contacta a la Defensoria del Pueblo (gratis) o a un abogado."}
        </p>
        {os.auditoria?.telefono && (
          <p className="text-sm text-verde-600 mt-2">
            Auditoria medica de {os.nombre}: <strong>{os.auditoria.telefono}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
