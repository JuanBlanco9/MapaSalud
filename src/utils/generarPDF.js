import { getNivelDroga } from "../data/coberturas";
import { NIVEL_COBERTURA } from "../constants";

const MARGIN = 20;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;

function addPage(doc) {
  doc.addPage();
  return 30;
}

function checkPage(doc, y, needed = 20) {
  if (y + needed > 275) return addPage(doc);
  return y;
}

function nivelText(nombre) {
  const n = getNivelDroga(nombre);
  if (!n) return "[?]";
  if (n === NIVEL_COBERTURA.NACIONAL) return "[CUBIERTO - Res. 3377/2022]";
  if (n === NIVEL_COBERTURA.PBA) return "[CUBIERTO PBA - IPC]";
  return "[REQUIERE GESTION]";
}

export async function generarMapaPDF({ os, plan, cancer, subtipo }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const fecha = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let y = 20;

  // ── Header ──────────────────────────────────────────────────
  doc.setFillColor(27, 79, 114); // azul-700
  doc.rect(0, 0, PAGE_W, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("MapaSalud", MARGIN, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Tu mapa personalizado de cobertura oncologica", MARGIN, 27);
  doc.setFontSize(9);
  doc.text(`Generado el ${fecha}`, MARGIN, 35);
  doc.text("mapasalud.vercel.app", PAGE_W - MARGIN, 35, { align: "right" });

  y = 55;

  // ── Resumen ─────────────────────────────────────────────────
  doc.setTextColor(27, 79, 114);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tu situacion", MARGIN, y);
  y += 8;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const resumen = [
    `Cobertura: ${os.nombre}${plan ? ` - ${plan.nombre}` : ""}`,
    `Diagnostico: ${cancer.nombre}`,
    `Subtipo: ${subtipo.nombre}`,
  ];
  resumen.forEach((line) => {
    doc.text(line, MARGIN, y);
    y += 6;
  });
  y += 4;

  // ── Base legal ──────────────────────────────────────────────
  doc.setFillColor(234, 250, 241); // verde-50
  doc.roundedRect(MARGIN, y, CONTENT_W, 18, 2, 2, "F");
  doc.setTextColor(30, 132, 73);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("BASE LEGAL", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const legalLines = doc.splitTextToSize(
    "PMO Art. 7.3: medicamentos oncologicos segun protocolos ANMAT, cobertura 100%. El PMO es un piso minimo, no un techo. Res. 1926/2024: oncologia exenta de coseguros. Res. 3377/2022: Listado Complementario de Medicamentos Oncologicos vigente.",
    CONTENT_W - 8
  );
  doc.text(legalLines, MARGIN + 4, y + 10);
  y += 24;

  // ── Tratamientos de primera linea ───────────────────────────
  y = checkPage(doc, y, 30);
  doc.setTextColor(27, 79, 114);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tratamientos de primera linea", MARGIN, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  subtipo.primeraLinea.forEach((t) => {
    y = checkPage(doc, y, 8);
    doc.setFont("helvetica", "normal");
    doc.text(`• ${t}`, MARGIN + 2, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(nivelText(t), MARGIN + CONTENT_W - 2, y, { align: "right" });
    doc.setFontSize(9);
    y += 6;
  });
  y += 4;

  // ── Terapias dirigidas ──────────────────────────────────────
  y = checkPage(doc, y, 30);
  doc.setTextColor(27, 79, 114);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Terapias dirigidas", MARGIN, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  subtipo.terapiasDirigidas.forEach((t) => {
    y = checkPage(doc, y, 8);
    doc.setFont("helvetica", "normal");
    doc.text(`• ${t}`, MARGIN + 2, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(nivelText(t), MARGIN + CONTENT_W - 2, y, { align: "right" });
    doc.setFontSize(9);
    y += 6;
  });
  y += 4;

  // ── Opciones nuevas (si hay) ────────────────────────────────
  if (subtipo.opcionesNuevas.length > 0) {
    y = checkPage(doc, y, 30);
    doc.setTextColor(230, 126, 34);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Opciones nuevas — requieren gestion", MARGIN, y);
    y += 8;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    subtipo.opcionesNuevas.forEach((t) => {
      y = checkPage(doc, y, 8);
      doc.setFont("helvetica", "normal");
      doc.text(`• ${t}`, MARGIN + 2, y);
      y += 6;
    });
    y += 4;
  }

  // ── Estudios a pedir ────────────────────────────────────────
  y = checkPage(doc, y, 30);
  doc.setTextColor(27, 79, 114);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Estudios a pedirle a tu medico", MARGIN, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  subtipo.estudios.forEach((e) => {
    y = checkPage(doc, y, 8);
    doc.text(`• ${e}`, MARGIN + 2, y);
    y += 6;
  });
  y += 6;

  // ── Leyenda de niveles ──────────────────────────────────────
  y = checkPage(doc, y, 30);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(MARGIN, y, CONTENT_W, 24, 2, 2, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);
  doc.text("NIVELES DE COBERTURA", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(30, 132, 73);
  doc.text("[CUBIERTO - Res. 3377/2022] = Listado oficial de medicamentos, exigible en cualquier OS del pais", MARGIN + 4, y + 11);
  doc.setTextColor(230, 126, 34);
  doc.text("[CUBIERTO PBA - IPC] = Listado provincial Buenos Aires. Otras provincias: consultar listado local", MARGIN + 4, y + 16);
  doc.setTextColor(200, 50, 50);
  doc.text("[REQUIERE GESTION] = No en listado oficial. Necesita reclamo SSS o amparo judicial", MARGIN + 4, y + 21);
  y += 30;

  // ── Que hacer si te dicen que no ────────────────────────────
  y = checkPage(doc, y, 50);
  doc.setTextColor(27, 79, 114);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Si te dicen que NO", MARGIN, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const pasos = [
    "1. Pedi la negativa por escrito. Es tu derecho. Si no te la dan, manda un email pidiendo formalmente.",
    "2. Reclama a la Superintendencia de Servicios de Salud: 0800-222-72583 o sssalud.gob.ar",
    "3. Inicia un amparo de salud. Mas del 80% de los amparos de salud se han resuelto favorablemente segun registros publicos.",
  ];
  pasos.forEach((p) => {
    y = checkPage(doc, y, 12);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(p, CONTENT_W - 4);
    doc.text(lines, MARGIN + 2, y);
    y += lines.length * 5 + 3;
  });
  y += 4;

  // ── Contactos utiles ────────────────────────────────────────
  y = checkPage(doc, y, 40);
  doc.setTextColor(27, 79, 114);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Contactos utiles", MARGIN, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const contactos = [
    "Superintendencia de Servicios de Salud — 0800-222-72583 — sssalud.gob.ar",
    "LALCEC (asesoria gratuita oncologia) — 0800-222-1166 — lalcec.org.ar",
    "FUCA (Fundacion Cancer) — (011) 4783-5762 — fuca.org.ar",
    "AstraZeneca Alcanzar (programa pacientes) — 0800-999-0575 — alcanzar.com.ar",
    "Roche Cerca Tuyo (programa pacientes) — rochecercatuyo.com.ar",
  ];
  if (os.auditoria && os.auditoria.telefono) {
    contactos.unshift(
      `Auditoria medica ${os.nombre} — ${os.auditoria.telefono}`
    );
  }
  doc.setFont("helvetica", "normal");
  contactos.forEach((c) => {
    y = checkPage(doc, y, 7);
    doc.text(`• ${c}`, MARGIN + 2, y);
    y += 6;
  });

  // ── Disclaimer ──────────────────────────────────────────────
  y = checkPage(doc, y, 25);
  y += 6;
  doc.setDrawColor(200, 200, 200);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 5;
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  const disclaimer = doc.splitTextToSize(
    "MapaSalud es una herramienta informativa gratuita. La informacion es orientativa y no reemplaza el asesoramiento legal o medico profesional. Siempre consulta con tu medico y un abogado para tu caso especifico. No almacenamos datos personales. Precios y coberturas sujetos a cambios.",
    CONTENT_W
  );
  doc.text(disclaimer, MARGIN, y);

  // ── Guardar ─────────────────────────────────────────────────
  const filename = `MapaSalud_${os.nombre.replace(/[^a-zA-Z0-9]/g, "_")}_${cancer.nombre.replace(/[^a-zA-Z0-9]/g, "_")}_${subtipo.nombre.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
  doc.save(filename);
}
