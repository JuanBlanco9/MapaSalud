import { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText,
  Copy,
  Download,
  Check,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Eraser,
  PenTool,
} from "lucide-react";
import { getTextosParaCarta } from "../data/textosLegales";
import { generarTemplateFallback } from "../data/templatesCarta";
import {
  getJurisprudenciaRelevante,
  formatCitaJurisprudencial,
  filtrarFallosPorAplicabilidad,
  getContextoFallo,
} from "../data/jurisprudencia";

const PREGUNTAS_RESPUESTA = [
  { id: "sin_respuesta", label: "No me respondieron (mas de 5 dias habiles)" },
  { id: "negativa_verbal", label: "Me lo negaron verbalmente" },
  { id: "negativa_escrita", label: "Me lo negaron por escrito" },
  { id: "aprobado_no_entregan", label: "Me lo aprobaron pero no me lo entregan" },
];

const OPCIONES_NEGATIVA_ESCRITA = [
  { id: "carta_documento", label: "Carta documento (enviar por correo a la OS)", desc: "Intima a la OS a responder. Paso previo al amparo." },
  { id: "promesa", label: "PROMESA — mediacion prejudicial (mas rapido)", desc: "Mediacion oficial via TAD. La OS no puede negarse. Primera audiencia en 5 dias. Requiere abogado." },
];

function determinarTipoDocumento(respuestaOS, opcionEscrita) {
  if (respuestaOS === "negativa_escrita" && opcionEscrita) return opcionEscrita;
  switch (respuestaOS) {
    case "sin_respuesta": return "seguimiento";
    case "negativa_verbal": return "pedir_negativa";
    case "negativa_escrita": return "carta_documento";
    case "aprobado_no_entregan": return "intimacion_entrega";
    default: return "carta_documento";
  }
}

const TIPO_LABELS = {
  seguimiento: "Email de seguimiento formal",
  pedir_negativa: "Email solicitando negativa por escrito",
  carta_documento: "Carta documento",
  intimacion_entrega: "Carta documento por falta de entrega",
  promesa: "Solicitud de mediacion PROMESA",
};

// ── Barra de progreso del asistente ─────────────────────────────

function ProgresoCarta({ paso }) {
  const pasos = ["Situacion", "Tus datos", "Carta lista"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {pasos.map((label, i) => (
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
          {i < pasos.length - 1 && (
            <div className={`w-10 sm:w-16 h-0.5 mb-5 mx-1 ${paso > i + 1 ? "bg-verde-500" : "bg-gris-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Panel de firma ──────────────────────────────────────────────

function PanelFirma({ onFirmaChange }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasFirma, setHasFirma] = useState(false);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
  }, [getPos]);

  const draw = useCallback((e) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [drawing, getPos]);

  const endDraw = useCallback(() => {
    if (!drawing) return;
    setDrawing(false);
    setHasFirma(true);
    onFirmaChange(canvasRef.current.toDataURL("image/png"));
  }, [drawing, onFirmaChange]);

  const limpiar = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasFirma(false);
    onFirmaChange(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gris-700 flex items-center gap-1.5">
          <PenTool className="w-4 h-4" />
          Firma (opcional)
        </label>
        {hasFirma && (
          <span className="text-xs text-verde-600 font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> Firma agregada
          </span>
        )}
      </div>
      <div className="relative border border-gris-200 rounded-lg bg-white overflow-hidden">
        {!hasFirma && !drawing && (
          <p className="absolute inset-0 flex items-center justify-center text-gris-300 text-sm pointer-events-none select-none">
            Firma aqui
          </p>
        )}
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-[150px] touch-none cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
      {hasFirma && (
        <button
          type="button"
          onClick={limpiar}
          className="flex items-center gap-1.5 text-gris-500 hover:text-gris-700 text-xs mt-2 cursor-pointer bg-transparent border-none"
        >
          <Eraser className="w-3 h-3" /> Borrar firma
        </button>
      )}
      <p className="text-xs text-gris-400 mt-1">
        Tu firma se usa unicamente para generar el documento. No se almacena en ningun servidor.
      </p>
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────

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
  const [step, setStep] = useState("preguntas"); // preguntas | datos | generando | resultado
  const [yaSolicito, setYaSolicito] = useState(null);
  const [respuestaOS, setRespuestaOS] = useState(null);
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [documento, setDocumento] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [usandoFallback, setUsandoFallback] = useState(false);
  const [firmaDataUrl, setFirmaDataUrl] = useState(null);
  const [opcionEscrita, setOpcionEscrita] = useState(null);

  // Datos del paciente
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
    const tipoDoc = yaSolicito === false ? "carta_documento" : tipoDocumento;

    // Generar desde template pre-armado (sin API)
    let carta = generarTemplateFallback({
      obraSocial: os.nombre,
      plan: plan?.nombre || null,
      diagnostico: cancer.nombre,
      subtipo: subtipo.nombre,
      tratamiento,
      fechaSolicitud: fechaSolicitud || null,
      tipoDocumento: tipoDoc,
      patologiaId,
    });

    // Reemplazar placeholders con datos reales del formulario
    carta = reemplazarDatos(carta, datos);

    // Agregar jurisprudencia relevante al pie
    const jurisp = getJurisprudenciaRelevante(patologiaId, subtipo?.id);
    const fallosAplicables = filtrarFallosPorAplicabilidad(jurisp.especificos, "alto");
    if (fallosAplicables.length > 0) {
      const citas = fallosAplicables
        .slice(0, 3)
        .map(formatCitaJurisprudencial)
        .join(";\n");
      // Insertar antes del cierre "Sin otro particular"
      carta = carta.replace(
        "Sin otro particular, saludo a Uds. atentamente.",
        `La jurisprudencia ha resuelto en casos analogos la obligatoriedad de esta cobertura, entre otros:\n${citas}.\n\nSin otro particular, saludo a Uds. atentamente.`
      );
    }

    setDocumento(carta);
    setUsandoFallback(false);

    // Simular breve delay para UX (no instantaneo = mas confianza)
    setTimeout(() => setStep("resultado"), 400);
  }

  function reemplazarDatos(texto, d) {
    return texto
      .replace(/\[COMPLETAR NOMBRE COMPLETO\]|\[COMPLETAR NOMBRE\]/g, d.nombre || "[COMPLETAR NOMBRE]")
      .replace(/\[COMPLETAR\] *\n *DNI/g, `${d.dni}\nDNI`)
      .replace(/DNI \[COMPLETAR\]/g, `DNI ${d.dni || "[COMPLETAR DNI]"}`)
      .replace(/\[COMPLETAR DOMICILIO\]/g, d.domicilio || "[COMPLETAR DOMICILIO]")
      .replace(/\[COMPLETAR NOMBRE DEL MEDICO\]/g, d.medico || "[COMPLETAR MEDICO]")
      .replace(/\[COMPLETAR MATRICULA\]/g, d.matricula || "[COMPLETAR MATRICULA]")
      .replace(/\[COMPLETAR NUMERO DE AFILIADO\]/g, "[COMPLETAR NUMERO DE AFILIADO]");
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

  function formatDNI(dni) {
    const nums = (dni || "").replace(/\D/g, "");
    if (nums.length <= 2) return nums;
    return nums.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  async function descargarPDF() {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const M = 20; // margin
    const W = 170; // content width
    const PAGE_H = 297;
    const FOOTER_Y = PAGE_H - 15;
    const MAX_Y = FOOTER_Y - 10;
    const fecha = new Date().toLocaleDateString("es-AR", {
      day: "2-digit", month: "long", year: "numeric",
    });

    function addFooter(doc, pageNum) {
      doc.setDrawColor(200, 200, 200);
      doc.line(M, FOOTER_Y - 3, M + W, FOOTER_Y - 3);
      doc.setFontSize(7);
      doc.setTextColor(160, 160, 160);
      doc.setFont("helvetica", "normal");
      doc.text(
        "MapaSalud — mapa-salud.vercel.app | Documento orientativo. No reemplaza asesoramiento legal profesional.",
        M + W / 2, FOOTER_Y, { align: "center" }
      );
    }

    function newPage(doc) {
      doc.addPage();
      addFooter(doc, doc.getNumberOfPages());
      return 30;
    }

    function checkY(doc, y, needed = 8) {
      if (y + needed > MAX_Y) return newPage(doc);
      return y;
    }

    // ── Header (page 1 only) ──────────────────────────────────
    pdf.setFillColor(239, 246, 255); // azul muy claro
    pdf.rect(M, 10, W, 18, "F");
    pdf.setFontSize(13);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(27, 79, 114); // azul-700
    pdf.text("MapaSalud", M + 4, 19);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(130, 130, 130);
    pdf.text("mapa-salud.vercel.app", M + 4, 24);
    pdf.text(`Generado el ${fecha}`, M + W - 4, 19, { align: "right" });
    if (datos.nombre) {
      pdf.text(`Documento generado para: ${datos.nombre}`, M + W - 4, 24, { align: "right" });
    }
    pdf.setDrawColor(27, 79, 114);
    pdf.setLineWidth(0.5);
    pdf.line(M, 29, M + W, 29);
    addFooter(pdf, 1);

    // ── Parse markdown and render ─────────────────────────────
    // Strip markdown bold markers and track which segments are bold
    const rawLines = documento.split("\n");
    let y = 36;

    for (const rawLine of rawLines) {
      // Empty line = paragraph spacing
      if (!rawLine.trim()) {
        y += 3;
        continue;
      }

      // Process bold segments: **text** or __text__
      const segments = [];
      let remaining = rawLine;
      const boldRe = /\*\*(.+?)\*\*|__(.+?)__/g;
      let lastIdx = 0;
      let match;
      while ((match = boldRe.exec(rawLine)) !== null) {
        if (match.index > lastIdx) {
          segments.push({ text: rawLine.slice(lastIdx, match.index), bold: false });
        }
        segments.push({ text: match[1] || match[2], bold: true });
        lastIdx = match.index + match[0].length;
      }
      if (lastIdx < rawLine.length) {
        segments.push({ text: rawLine.slice(lastIdx), bold: false });
      }
      if (segments.length === 0) {
        segments.push({ text: rawLine, bold: false });
      }

      // Check if entire line is bold (heading-like)
      const allBold = segments.every((s) => s.bold || !s.text.trim());
      const fontSize = allBold && segments.some((s) => s.bold) ? 11 : 10;

      // Wrap the plain text version to get line count
      const plainText = segments.map((s) => s.text).join("");
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", "normal");
      const wrapped = pdf.splitTextToSize(plainText, W);

      for (const wLine of wrapped) {
        y = checkY(pdf, y, 5);
        // Determine if this wrapped line has bold parts
        // Simple approach: render the whole line as bold if allBold, otherwise normal
        if (allBold) {
          pdf.setFont("helvetica", "bold");
        } else {
          pdf.setFont("helvetica", "normal");
        }
        pdf.setFontSize(fontSize);
        pdf.setTextColor(30, 30, 30);
        pdf.text(wLine, M, y);
        y += fontSize === 11 ? 5.5 : 4.5;
      }

      // Extra spacing after bold headings
      if (allBold && segments.some((s) => s.bold)) {
        y += 1;
      }
    }

    // ── Firma ─────────────────────────────────────────────────
    const firmaNeeded = firmaDataUrl ? 40 : 15;
    if (y + firmaNeeded > MAX_Y) {
      y = newPage(pdf);
    }

    y += 8;
    if (firmaDataUrl) {
      pdf.addImage(firmaDataUrl, "PNG", M, y, 55, 20);
      y += 23;
    } else {
      // Signature line
      pdf.setDrawColor(180, 180, 180);
      pdf.line(M, y + 10, M + 60, y + 10);
      y += 14;
    }

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(30, 30, 30);
    if (datos.nombre) {
      pdf.text(datos.nombre, M, y);
      y += 4.5;
    }
    if (datos.dni) {
      pdf.setFont("helvetica", "normal");
      pdf.text(`DNI: ${formatDNI(datos.dni)}`, M, y);
    }

    // ── Save ──────────────────────────────────────────────────
    pdf.save(`MapaSalud_reclamo_${os.nombre.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
  }

  const pasoNum = step === "preguntas" ? 1 : step === "datos" ? 2 : 3;

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
            Te ayudamos a redactar la comunicacion formal para reclamar la
            cobertura de <strong>{tratamiento}</strong>.
          </p>
        </div>

        <div className="space-y-6">
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

          {/* Elegir entre carta documento y PROMESA cuando hay negativa escrita */}
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
        </div>
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
          {yaSolicito === false ? TIPO_LABELS.carta_documento : TIPO_LABELS[tipoDocumento]}
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

          {/* Panel de firma */}
          <div className="pt-4 border-t border-gris-200">
            <PanelFirma onFirmaChange={setFirmaDataUrl} />
          </div>

          {/* Botón generar */}
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
          {yaSolicito === false ? TIPO_LABELS.carta_documento : TIPO_LABELS[tipoDocumento]}
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
          onClick={descargarPDF}
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
          <AlertTriangle className="w-4 h-4 text-naranja-500 shrink-0 mt-0.5" />
          <p>
            <strong>Revisa este documento con un abogado o la Defensoria del
            Pueblo antes de enviarlo.</strong> MapaSalud no es un estudio
            juridico. Este documento es orientativo y no constituye
            asesoramiento legal profesional.
          </p>
        </div>
      </div>

      <div className="mt-6 bg-verde-50 border border-verde-200 rounded-xl p-5">
        <p className="font-semibold text-verde-800 mb-2">Proximo paso</p>
        <p className="text-sm text-verde-700">
          {tipoDocumento === "pedir_negativa"
            ? "Envia este email a la auditoria medica de tu obra social. Si no responden en 48 horas, el siguiente paso es la carta documento."
            : tipoDocumento === "seguimiento"
            ? "Envia este email a la auditoria medica. Si no responden, el siguiente paso es una carta documento formal."
            : tipoDocumento === "intimacion_entrega"
            ? "Envia esta carta documento por correo postal certificado. Guarda el comprobante de envio."
            : "Envia esta carta documento por correo postal certificado. Si no responden en 48 horas, contacta a la Defensoria del Pueblo (gratis) o a un abogado para iniciar el amparo."}
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
