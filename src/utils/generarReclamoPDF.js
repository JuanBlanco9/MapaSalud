export function formatDNI(dni) {
  const nums = (dni || "").replace(/\D/g, "");
  if (nums.length <= 2) return nums;
  return nums.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function generarReclamoPDF({ documento, datos, firmaDataUrl, osNombre }) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const M = 20;
  const W = 170;
  const PAGE_H = 297;
  const FOOTER_Y = PAGE_H - 15;
  const MAX_Y = FOOTER_Y - 10;
  const fecha = new Date().toLocaleDateString("es-AR", {
    day: "2-digit", month: "long", year: "numeric",
  });

  function addFooter(doc) {
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
    addFooter(doc);
    return 30;
  }

  function checkY(doc, y, needed = 8) {
    if (y + needed > MAX_Y) return newPage(doc);
    return y;
  }

  // ── Header (page 1 only) ──────────────────────────────────
  pdf.setFillColor(239, 246, 255);
  pdf.rect(M, 10, W, 18, "F");
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(27, 79, 114);
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
  addFooter(pdf);

  // ── Parse markdown and render ─────────────────────────────
  const rawLines = documento.split("\n");
  let y = 36;

  for (const rawLine of rawLines) {
    if (!rawLine.trim()) {
      y += 3;
      continue;
    }

    const segments = [];
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

    const allBold = segments.every((s) => s.bold || !s.text.trim());
    const fontSize = allBold && segments.some((s) => s.bold) ? 11 : 10;

    const plainText = segments.map((s) => s.text).join("");
    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", "normal");
    const wrapped = pdf.splitTextToSize(plainText, W);

    for (const wLine of wrapped) {
      y = checkY(pdf, y, 5);
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
  pdf.save(`MapaSalud_reclamo_${osNombre.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}
