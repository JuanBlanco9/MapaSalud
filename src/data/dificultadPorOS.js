// ── Ajuste de dificultad por obra social ─────────────────────────
//
// La dificultad base de cada droga/insumo (en dificultadAcceso.js)
// es un PROMEDIO NACIONAL. Pero la experiencia real varía por OS.
//
// Este modulo ajusta la dificultad segun lo que sabemos de cada OS.
// Donde NO tenemos datos especificos, lo decimos explicitamente.
//
// FUENTES:
// - queAprueban/queNiegan de coberturas.js (datos curados de sitios oficiales)
// - Fallos judiciales verificados (jurisprudencia/)
// - Alertas reportadas por pacientes/periodismo
// - Datos del Registro Nacional de Amparos SSS 2024
//
// LIMITACION IMPORTANTE:
// No tenemos tasas de aprobacion/negativa por droga por OS.
// Lo que tenemos son señales indirectas: que suelen aprobar,
// que suelen negar, fallos judiciales, y alertas.
// La clasificacion es una ESTIMACION INFORMADA, no un dato exacto.

const perfilOS = {
  osde: {
    perfil: "prepaga_grande",
    notas: "La cobertura oncologica es la misma en todos los planes (210 a 510). La diferencia entre planes es la red de prestadores y velocidad de autorizacion, no la tasa de aprobacion de drogas.",
    ajustes: {},
    fuenteAjuste: "Datos de coberturas.js: OSDE aprueba QT estandar y trastuzumab/pertuzumab HER2+. Fallo Enhertu Chaco 04/2025 (OSDE nego, Camara Federal ordeno cubrir). Fallo Oncotype DX reintegro 11/2025.",
  },
  swiss: {
    perfil: "premium",
    notas: "Planes SMG 40/50 similar a OSDE premium. Planes bajos mas restrictivos.",
    ajustes: {},
    fuenteAjuste: "Datos genericos — no tenemos datos especificos de negativas Swiss Medical en oncologia.",
  },
  ioma: {
    perfil: "obra_social",
    notas: "Demoras cronicas reportadas (3+ meses). Drogas fuera del Plan MEPPES requieren proceso de compra separado que genera demoras adicionales.",
    ajustes: {
      sensor_cgm: +1,       // +1 = subir dificultad (mas dificil que el promedio)
      bomba_insulina: +1,
    },
    fuenteAjuste: "Alertas en coberturas.js: demoras 3+ meses reportadas. Drogas fuera MEPPES con proceso separado. Asciminib y venetoclax denegados.",
  },
  osecac: {
    perfil: "obra_social",
    notas: "Grande pero burocratica. Sin datos especificos de negativas oncologicas.",
    ajustes: {},
    fuenteAjuste: "Datos genericos. Fallo PET-TC en Rio Negro contra OSECAC (no respondieron desde febrero).",
  },
  galeno: {
    perfil: "prepaga_media",
    notas: "Receta electronica obligatoria desde enero 2025. Sin datos especificos de negativas.",
    ajustes: {},
    fuenteAjuste: "Datos genericos — no tenemos datos especificos de Galeno en oncologia/diabetes.",
  },
  medife: {
    perfil: "prepaga_media",
    notas: "Politica explicita de off-label: se reserva derecho, responsabilidad en medico. Requiere declaracion de conflicto de interes.",
    ajustes: {
      off_label: +1,
    },
    fuenteAjuste: "Politica off-label explicita en coberturas.js. Fallo BRCA Bariloche contra Medife (negaron estudio genetico). Fallo FreeStyle Libre CABA 02/2026.",
  },
  omint: {
    perfil: "premium",
    notas: "Acceso a consulta internacional. Sin datos especificos de negativas.",
    ajustes: {},
    fuenteAjuste: "Datos genericos — no tenemos datos especificos de OMINT en oncologia/diabetes.",
  },
  amobp: {
    perfil: "obra_social",
    notas: "Bien financiada (bancarios) pero sin datos de experiencia oncologica.",
    ajustes: {},
    fuenteAjuste: "Sin datos especificos.",
  },
  dosep: {
    perfil: "problematica",
    notas: "Reportes de denegaciones sistematicas. Auditoria externa con catch-22. Infraestructura limitada.",
    ajustes: {
      todo: +1,            // Todo es mas dificil en DOSEP
    },
    fuenteAjuste: "Alertas en coberturas.js: denegaciones sistematicas, catch-22 de auditoria externa, derivaciones a BA/Mendoza por falta de infraestructura.",
  },
  hospital_publico: {
    perfil: "publico",
    notas: "Gratuito pero con limitaciones de stock y tiempos. INC reorganizado en 2025.",
    ajustes: {
      drogas_nuevas: +1,
    },
    fuenteAjuste: "Datos de coberturas.js: stock limitado, INC reorganizado, 400K unidades de morfina vencidas.",
  },
};

// ── Niveles de dificultad ────────────────────────────────────────

const NIVELES = ["directo", "tramite", "dificil"];

export function ajustarDificultadPorOS(dificultadBase, osId) {
  if (!dificultadBase) return null;
  const os = perfilOS[osId];
  if (!os) return dificultadBase;

  // Para DOSEP, todo sube un nivel
  if (os.ajustes.todo) {
    const idx = NIVELES.indexOf(dificultadBase);
    if (idx < NIVELES.length - 1) return NIVELES[idx + 1];
  }

  return dificultadBase;
}

export function getPerfilOS(osId) {
  return perfilOS[osId] || null;
}

// ── Disclaimer para la UI ────────────────────────────────────────

export function getDisclaimerDificultad(osId) {
  const os = perfilOS[osId];
  if (!os) return null;

  const tieneData = os.fuenteAjuste && !os.fuenteAjuste.includes("genericos") && !os.fuenteAjuste.includes("Sin datos");

  if (tieneData) {
    return {
      texto: os.notas,
      confianza: "media",
      fuente: os.fuenteAjuste,
    };
  }

  return {
    texto: `${os.notas} La dificultad mostrada es un promedio nacional — no tenemos datos especificos de esta obra social para cada droga.`,
    confianza: "baja",
    fuente: os.fuenteAjuste,
  };
}
