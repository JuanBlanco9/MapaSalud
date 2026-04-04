// ── Indice de Litigiosidad — distribucion de amparos por OS ─────
// Fuente: SAIJ via HuggingFace (279.186 fallos procesados)
// Fecha: abril 2026
//
// METODOLOGIA:
// - Se procesaron 279.186 fallos del dataset SAIJ
// - Se identificaron 832 amparos de salud
// - De esos, 233 tienen OS/prepaga identificable por nombre del demandado
// - El porcentaje muestra que proporcion de los amparos de salud
//   con OS identificada corresponde a cada entidad
//
// LIMITACIONES:
// - SAIJ no contiene todos los amparos de Argentina — es parcial
// - 72% de los amparos de salud no tienen OS identificable
// - Periodo aproximado: 2000-2024 (no un solo anio)
// - La distribucion refleja lo que aparece en SAIJ,
//   no necesariamente la realidad total del sistema
// - OS con pocos amparos (Medife: 1) probablemente reflejan
//   baja representacion en SAIJ, no baja litigiosidad real

export const indiceLitigiosidad = {
  fuente: "SAIJ via HuggingFace (marianbasti/jurisprudencia-Argentina-SAIJ)",
  totalRegistrosSAIJ: 279186,
  amparosSalud: 832,
  conOSIdentificada: 233,
  periodoAproximado: "2000-2024",
  fechaProcesamiento: "2026-04-03",

  // Distribucion: de los 233 amparos con OS identificada,
  // que porcentaje corresponde a cada una
  porObraSocial: {
    "OSDE":            { amparos: 89,  pct: 38.2 },
    "Swiss Medical":   { amparos: 49,  pct: 21.0 },
    "PAMI":            { amparos: 29,  pct: 12.4 },
    "OMINT":           { amparos: 18,  pct: 7.7 },
    "Galeno":          { amparos: 11,  pct: 4.7 },
    "OSECAC":          { amparos: 10,  pct: 4.3 },
    "Union Personal":  { amparos: 10,  pct: 4.3 },
    "Incluir Salud":   { amparos: 6,   pct: 2.6 },
    "IOMA":            { amparos: 5,   pct: 2.1 },
    "OSPLAD":          { amparos: 3,   pct: 1.3 },
    "Sancor Salud":    { amparos: 2,   pct: 0.9 },
    "Medife":          { amparos: 1,   pct: 0.4 },
  },
};

// Helper: obtener datos de litigiosidad de una OS
export function getLitigiosidadOS(osId) {
  const nombres = {
    osde: "OSDE", swiss: "Swiss Medical", ioma: "IOMA",
    osecac: "OSECAC", galeno: "Galeno", medife: "Medife",
    omint: "OMINT", amobp: null, dosep: null, hospital_publico: null,
  };
  const nombre = nombres[osId];
  if (!nombre) return null;
  const data = indiceLitigiosidad.porObraSocial[nombre];
  if (!data) return null;

  return {
    nombre,
    amparos: data.amparos,
    porcentaje: data.pct,
    totalConOS: indiceLitigiosidad.conOSIdentificada,
    texto: `De ${indiceLitigiosidad.conOSIdentificada} amparos de salud con OS identificada en el dataset SAIJ, ${data.pct}% (${data.amparos}) fueron contra ${nombre}.`,
  };
}
