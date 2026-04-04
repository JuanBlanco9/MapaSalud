// ── Indice de Litigiosidad — SAIJ + datos de afiliados ──────────
// Fuente amparos: SAIJ via HuggingFace (279.186 fallos procesados)
// Fuente afiliados: SSS, Chequeado, iProfesional (datos 2024)
// Fecha: abril 2026
//
// METODOLOGIA:
// - Tasa = amparos de salud en SAIJ / afiliados * 100.000
// - Mide cuantos amparos de salud por cada 100.000 afiliados
//   aparecen en el dataset de jurisprudencia de SAIJ
//
// LIMITACIONES IMPORTANTES:
// - SAIJ no contiene TODOS los amparos — es un dataset parcial
//   de jurisprudencia publicada (~279K fallos, no exhaustivo)
// - 72% de amparos de salud no tienen OS identificable
// - Los amparos cubren un periodo largo (~2000-2024), no un solo anio
// - Los datos de afiliados son de 2024 — no reflejan afiliados
//   historicos al momento de cada amparo
// - La tasa NO es una probabilidad de litigio — es una metrica
//   relativa para comparar entre OS dentro del mismo dataset
// - Medife aparece con 1 amparo, lo cual probablemente refleja
//   baja representacion en SAIJ, no baja litigiosidad real

export const indiceLitigiosidad = {
  fuente: "SAIJ via HuggingFace (marianbasti/jurisprudencia-Argentina-SAIJ)",
  fuenteAfiliados: "SSS, Chequeado.com, iProfesional (2024)",
  totalRegistrosSAIJ: 279186,
  amparosSalud: 832,
  conOSIdentificada: 233,
  periodoAproximado: "2000-2024",
  fechaProcesamiento: "2026-04-03",

  porObraSocial: {
    "OSDE":            { amparos: 89, afiliados: 2111435, tasa: 4.2 },
    "Swiss Medical":   { amparos: 49, afiliados: 1000000, tasa: 4.9 },
    "PAMI":            { amparos: 29, afiliados: 5200000, tasa: 0.6 },
    "OMINT":           { amparos: 18, afiliados: 317000,  tasa: 5.7 },
    "Galeno":          { amparos: 11, afiliados: 556000,  tasa: 2.0 },
    "OSECAC":          { amparos: 10, afiliados: 1800000, tasa: 0.6 },
    "Union Personal":  { amparos: 10, afiliados: 300000,  tasa: 3.3 },
    "Incluir Salud":   { amparos: 6,  afiliados: 800000,  tasa: 0.8 },
    "IOMA":            { amparos: 5,  afiliados: 2000000, tasa: 0.2 },
    "OSPLAD":          { amparos: 3,  afiliados: 120000,  tasa: 2.5 },
    "Sancor Salud":    { amparos: 2,  afiliados: 523000,  tasa: 0.4 },
    "Medife":          { amparos: 1,  afiliados: 400000,  tasa: 0.2 },
  },
};

// Helper: obtener litigiosidad de una OS
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

  // Posicion en ranking por tasa (mayor tasa = mas litigada por afiliado)
  const ranking = Object.entries(indiceLitigiosidad.porObraSocial)
    .sort((a, b) => b[1].tasa - a[1].tasa);
  const posicion = ranking.findIndex(([k]) => k === nombre) + 1;

  return {
    nombre,
    amparos: data.amparos,
    afiliados: data.afiliados,
    tasa: data.tasa,
    posicion,
    totalOS: ranking.length,
    interpretacion: data.tasa > 4 ? "alta" : data.tasa > 1.5 ? "media" : "baja",
  };
}
