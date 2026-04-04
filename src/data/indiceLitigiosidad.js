// ── Evidencia de litigiosidad — CUALITATIVA, no cuantitativa ────
// Fuente: SAIJ via HuggingFace (279.186 fallos de jurisprudencia)
// Fecha: abril 2026
//
// IMPORTANTE: Estos datos NO representan el universo de amparos
// de salud en Argentina. SAIJ publica jurisprudencia seleccionada,
// no todos los fallos. De ~10.000 amparos de salud anuales
// (Registro SSS 2024), SAIJ tiene ~832 en 25 anios.
//
// USO CORRECTO: evidencia de que existen amparos contra cada OS
// y por que motivos. NO usar para calcular porcentajes ni rankings.
//
// Para datos cuantitativos reales se necesita el Registro Nacional
// de Amparos de la SSS (Res. 1781/2022), que no es publico.
// Pedido FOIA (Ley 27.275) en tramite.

export const evidenciaLitigiosidad = {
  fuente: "SAIJ via HuggingFace (jurisprudencia seleccionada, no exhaustiva)",
  advertencia: "Estos son fallos publicados en SAIJ, no el total de amparos. No usar para rankings ni porcentajes.",
  totalFallosProcesados: 279186,
  amparosSaludEncontrados: 832,
  conOSIdentificada: 233,
  periodoAproximado: "2000-2024",

  // Evidencia cualitativa: contra que OS se litigo
  obrasSocialesConAmparos: [
    "OSDE", "Swiss Medical", "PAMI", "OMINT", "Galeno",
    "OSECAC", "Union Personal", "Incluir Salud", "IOMA",
    "OSPLAD", "Sancor Salud", "Medife",
  ],

  // Dato cuantitativo real (fuente: Registro Nacional SSS)
  datosRegistroSSS: {
    totalAmparos2024: 10072,
    contraObrasSociales2024: 7602,
    contraPrepagas2024: 2470,
    fuente: "argentina.gob.ar/sssalud — Registro Nacional de Amparos",
    accesibilidad: "No publico. Pedido FOIA (Ley 27.275) en tramite.",
  },
};

// Helper: verificar si una OS tiene evidencia de litigiosidad
export function tieneEvidenciaLitigiosidad(osId) {
  const nombres = {
    osde: "OSDE", swiss: "Swiss Medical", ioma: "IOMA",
    osecac: "OSECAC", galeno: "Galeno", medife: "Medife",
    omint: "OMINT", amobp: null, dosep: null, hospital_publico: null,
  };
  const nombre = nombres[osId];
  if (!nombre) return null;

  const tiene = evidenciaLitigiosidad.obrasSocialesConAmparos.includes(nombre);
  if (!tiene) return null;

  return {
    nombre,
    texto: `Existen amparos de salud registrados en SAIJ contra ${nombre}. Para datos cuantitativos sobre volumen y resultados, se requiere acceso al Registro Nacional de Amparos de la SSS.`,
    fuenteTexto: "SAIJ (jurisprudencia seleccionada)",
  };
}
