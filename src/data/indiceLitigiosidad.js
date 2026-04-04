// ── Indice de Litigiosidad — generado desde SAIJ (HuggingFace) ──
// Dataset: marianbasti/jurisprudencia-Argentina-SAIJ (Apache 2.0)
// Total registros procesados: 279.186 fallos judiciales
// Amparos de salud identificados: 832
// Con obra social identificada: 233 (28%)
// Fecha de procesamiento: abril 2026
//
// METODOLOGIA:
// 1. Se descargo el dataset completo de jurisprudencia SAIJ via HuggingFace
// 2. Se filtro por tipo-fallo/texto conteniendo "amparo"
// 3. Se filtro por patrones de salud (obra social, prepaga, cobertura medica, etc)
// 4. Se identifico la OS del demandado por regex sobre el campo "demandado"
// 5. Se identificaron drogas por regex sobre el texto del sumario
//
// LIMITACIONES:
// - El dataset cubre ~279K fallos, no la totalidad de la jurisprudencia argentina
// - 72% de los amparos de salud no tienen OS identificable en el campo demandado
// - La clasificacion por droga es muy limitada (los sumarios legales rara vez
//   mencionan el nombre comercial del medicamento)
// - No distingue resultado (favorable/desfavorable) — seria necesario NLP
//   sobre el texto completo del fallo
// - El dataset de HuggingFace tenia errores de schema que cortaron el
//   procesamiento a 279K de ~300K+ registros totales

export const indiceLitigiosidad = {
  fuente: "SAIJ via HuggingFace (marianbasti/jurisprudencia-Argentina-SAIJ)",
  totalRegistros: 279186,
  amparosSalud: 832,
  conOSIdentificada: 233,
  sinOSIdentificada: 599,
  fechaProcesamiento: "2026-04-03",

  porObraSocial: {
    "OSDE":            89,
    "Swiss Medical":   49,
    "PAMI":            29,
    "OMINT":           18,
    "Galeno":          11,
    "OSECAC":          10,
    "Union Personal":  10,
    "Incluir Salud":    6,
    "IOMA":             5,
    "OSPLAD":           3,
    "Sancor Salud":     2,
    "Medife":            1,
  },
};

// Helper: obtener litigiosidad de una OS
export function getLitigiosidadOS(osId) {
  const nombres = {
    osde: "OSDE",
    swiss: "Swiss Medical",
    ioma: "IOMA",
    osecac: "OSECAC",
    galeno: "Galeno",
    medife: "Medife",
    omint: "OMINT",
    amobp: null, // sin datos
    dosep: null,  // sin datos
    hospital_publico: null,
  };
  const nombre = nombres[osId];
  if (!nombre) return null;
  const cantidad = indiceLitigiosidad.porObraSocial[nombre];
  if (!cantidad) return null;

  return {
    nombre,
    amparos: cantidad,
    posicion: Object.entries(indiceLitigiosidad.porObraSocial)
      .sort((a, b) => b[1] - a[1])
      .findIndex(([k]) => k === nombre) + 1,
    totalOS: Object.keys(indiceLitigiosidad.porObraSocial).length,
  };
}
