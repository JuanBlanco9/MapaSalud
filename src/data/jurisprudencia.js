// ── Jurisprudencia verificada — fallos con caratula, tribunal, fecha ──
// Cada fallo tiene fuente verificable (SAIJ, Microjuris, Global Health Rights DB)
// Verificacion: abril 2026

// ── Principios generales (CSJN) ─────────────────────────────────

export const principiosGenerales = [
  {
    caratula: "Asociacion Benghalensis y otros c/ Estado Nacional",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 323:1339, Causa A.186.XXXIV",
    fecha: "01/06/2000",
    ordeno:
      "Ordeno al Estado cumplir su obligacion de asistencia, tratamiento y provision continua de medicamentos a pacientes con HIV/SIDA. Reconocio legitimacion de ONGs para amparos colectivos en salud. Establecio que la preservacion de la salud tiene 'prioridad indiscutible'.",
    principio: "Derecho a la salud operativo y exigible",
    fuente: "SAIJ / Class Actions Argentina",
    aplicaA: ["oncologia", "diabetes1", "general"],
  },
  {
    caratula:
      "Campodonico de Beviacqua, Ana Carina c/ Ministerio de Salud y Accion Social",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 323:3229",
    fecha: "24/10/2000",
    ordeno:
      "Condeno al Estado Nacional a continuar proveyendo medicacion oncologica a un nino con enfermedad de Kostmann. El Estado no puede evadir obligaciones de derecho internacional ni derivar responsabilidad a provincias u obras sociales cuando estas fallan.",
    principio: "Estado como garante subsidiario del derecho a la salud",
    fuente: "SAIJ",
    aplicaA: ["oncologia", "general"],
  },
  {
    caratula:
      "Etcheverry, Roberto Eduardo c/ Omint Sociedad Anonima y Servicios",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 324:677, Causa E.34.XXXV",
    fecha: "13/03/2001",
    ordeno:
      "Una prepaga no puede dar de baja a un afiliado HIV+ invocando libertad contractual cuando el paciente requiere tratamiento constante. El derecho a la salud prevalece sobre la libertad de contratacion.",
    principio:
      "Prepagas tienen compromiso social que trasciende lo contractual",
    fuente: "SAIJ / Global Health Rights Database",
    aplicaA: ["general"],
  },
  {
    caratula:
      "Hospital Britanico de Buenos Aires c/ Estado Nacional (Ministerio de Salud)",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 324:754",
    fecha: "13/03/2001",
    ordeno:
      "Declaro constitucional la Ley 24.754 que obliga a prepagas a cubrir el PMO. Las prepagas tienen un compromiso social que trasciende lo meramente contractual.",
    principio: "Constitucionalidad de la cobertura obligatoria del PMO",
    fuente: "CSJN / CAM Moron",
    aplicaA: ["general"],
  },
  {
    caratula:
      "Orlando, Susana Beatriz c/ Buenos Aires, Provincia de y otro s/ amparo",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 328:1708",
    fecha: "24/05/2005",
    ordeno:
      "Ordeno medida cautelar en 5 dias para proveer medicacion a paciente con esclerosis multiple. Consolido el principio de que el PMO es un 'piso prestacional', no un techo.",
    principio: "PMO es piso, no techo",
    fuente: "Global Health & Human Rights Database",
    aplicaA: ["oncologia", "diabetes1", "general"],
  },
  {
    caratula:
      "Floreancig, Andrea Cristina y otro c/ Estado Nacional s/ amparo",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 329:2552, Causa F.838.XLI",
    fecha: "11/07/2006",
    ordeno:
      "Padres de nino con fibrosis quistica obtuvieron cobertura del Estado cuando la mutual entro en quiebra. El Estado tiene obligacion ineludible de garantizar el derecho a la salud especialmente para ninos con discapacidad y enfermedades graves.",
    principio:
      "Obligacion estatal ineludible, especialmente poblaciones vulnerables",
    fuente: "MPF - Acceso a la Justicia en Materia de Salud",
    aplicaA: ["general"],
  },
];

// ── PMO como piso (Camaras Federales) ───────────────────────────

export const falloPMOPiso = {
  caratula: "B. J. G. c/ OSPLAD s/ sumarisimo de salud",
  tribunal:
    "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala III",
  cita: "MJ-JU-M-95429-AR",
  fecha: "16/07/2015",
  ordeno:
    "Ratifico que el PMO es un 'piso prestacional' y no un techo. La cobertura no puede limitarse al listado del PMO cuando hacerlo danaria el derecho a la vida y la salud del beneficiario, derechos de jerarquia constitucional.",
  fuente: "Microjuris Argentina",
  aplicaA: ["oncologia", "diabetes1", "general"],
};

// ── Diabetes — Sensor de glucosa ────────────────────────────────

export const jurisprudenciaDiabetesSensor = [
  {
    caratula: "S.I- H. R. c/ Omint S.A. de Servicios s/ amparo de salud",
    tribunal:
      "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala I",
    jueces: "Maria Susana Najurieta y Fernando A. Uriarte",
    cita: "MJ-JU-M-117780-AR",
    fecha: "14/03/2019",
    ordeno:
      "Ordeno a Omint cubrir el sensor FreeStyle Libre segun prescripcion medica. La Ley 23.753 modificada por Ley 26.914 establece cobertura del 100% de medicamentos y reactivos de autocontrol, incluyendo sensores de monitoreo continuo de glucosa. Rechazo el argumento de que el PMO limitaba la cobertura.",
    tipo: "DIABETES_SENSOR",
    fuente: "Microjuris Argentina",
  },
  {
    caratula:
      "V. M. E. c/ Obra Social de Empleados Publicos s/ accion de amparo",
    tribunal:
      "Camara de Apelaciones en lo Civil, Comercial, Minas, de Paz y Tributaria de Mendoza (Primera Camara de San Rafael)",
    cita: "MJ-JU-M-131834-AR, Expediente 13-05419223-6",
    fecha: "15/04/2021",
    ordeno:
      "Ordeno a la Obra Social de Empleados Publicos cubrir el sensor FreeStyle Libre. Los dispositivos CGM aprobados por ANMAT presentan ventajas cualitativas en el manejo de la enfermedad y prevencion de complicaciones.",
    tipo: "DIABETES_SENSOR",
    provincia: "Mendoza",
    fuente: "Microjuris Argentina",
  },
];

// ── Diabetes — Bomba de insulina ────────────────────────────────

export const jurisprudenciaDiabetesBomba = [
  {
    caratula:
      "M. M. E. c/ Instituto Nac. de Serv. Soc. para Jubilados y Pensionados s/ amparo de salud",
    tribunal:
      "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala II",
    cita: "MJ-JU-M-112227-AR",
    fecha: "08/06/2018",
    ordeno:
      "Ordeno a PAMI cubrir integramente bomba de insulina Medtronic Paradigm Veo 754 con monitoreo continuo, alarmas y suspension automatica, mas todos los insumos. Considero que el pedido de PAMI de 3 meses de registros glucemicos previos era una tactica dilatoria, no un desacuerdo clinico genuino.",
    tipo: "DIABETES_BOMBA",
    fuente: "Microjuris Argentina",
  },
];

// ── Helper: obtener jurisprudencia relevante por patologia y tipo

export function getJurisprudenciaRelevante(patologiaId, tipoReclamo) {
  const resultado = {
    principios: principiosGenerales.filter((f) =>
      f.aplicaA.includes(patologiaId) || f.aplicaA.includes("general")
    ),
    pmoPiso: falloPMOPiso,
    especificos: [],
  };

  if (patologiaId === "diabetes1") {
    if (tipoReclamo === "sensor" || tipoReclamo === "tec_sensor") {
      resultado.especificos = jurisprudenciaDiabetesSensor;
    } else if (tipoReclamo === "bomba" || tipoReclamo === "tec_bomba") {
      resultado.especificos = jurisprudenciaDiabetesBomba;
    } else {
      resultado.especificos = [
        ...jurisprudenciaDiabetesSensor,
        ...jurisprudenciaDiabetesBomba,
      ];
    }
  }

  // Oncologia: usar principios generales + Campodonico (oncologico)
  if (patologiaId === "oncologia") {
    resultado.especificos = principiosGenerales.filter(
      (f) => f.aplicaA.includes("oncologia")
    );
  }

  return resultado;
}

// ── Formato para citar en documentos legales ────────────────────

export function formatCitaJurisprudencial(fallo) {
  return `"${fallo.caratula}" (${fallo.tribunal}, ${fallo.fecha}${fallo.cita ? `, ${fallo.cita}` : ""})`;
}
