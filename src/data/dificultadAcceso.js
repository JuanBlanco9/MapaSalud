// ── Dificultad de acceso real por droga/insumo ──────────────────
// Estimada a partir de: cantidad de amparos, fallos judiciales,
// precio, y experiencia reportada de pacientes/organizaciones.
//
// "directo"  = lo pedis y te lo dan. Farmacia o autorizacion rapida.
// "tramite"  = cubierto pero requiere autorizacion, puede demorar.
// "dificil"  = cubierto por ley pero alto indice de negativas.

// ── Oncologia ───────────────────────────────────────────────────

const oncoAcceso = {
  // Hormonoterapia oral — directo, bajo costo, sin fricciones
  "Tamoxifeno": "directo",
  "Anastrozol": "directo",
  "Letrozol": "directo",
  "Exemestano": "directo",
  "Bicalutamida": "directo",
  "Flutamida": "directo",

  // QT estandar — tramite (autorizacion previa pero se aprueba)
  "Paclitaxel": "tramite",
  "Carboplatino": "tramite",
  "Cisplatino": "tramite",
  "Docetaxel": "tramite",
  "Ciclofosfamida": "tramite",
  "Oxaliplatino": "tramite",
  "Gemcitabina": "tramite",
  "Fluorouracilo": "tramite",
  "Capecitabina": "tramite",
  "Irinotecan": "tramite",
  "Etoposido": "tramite",
  "Doxorrubicina": "tramite",
  "Vinorelbina": "tramite",
  "Pemetrexed": "tramite",

  // Dirigidas en vademecum — tramite (autorizacion + auditoria)
  "Trastuzumab": "tramite",
  "Pertuzumab": "tramite",
  "Bevacizumab": "tramite",
  "Cetuximab": "tramite",
  "Panitumumab": "tramite",
  "Rituximab": "tramite",
  "Imatinib": "tramite",
  "Erlotinib": "tramite",
  "Gefitinib": "tramite",
  "Afatinib": "tramite",
  "Alectinib": "tramite",
  "Palbociclib": "tramite",
  "Ribociclib": "tramite",
  "Abemaciclib": "tramite",
  "Dabrafenib": "tramite",
  "Trametinib": "tramite",
  "Nilotinib": "tramite",
  "Dasatinib": "tramite",
  "Ibrutinib": "tramite",

  // Inmunoterapia — tramite a dificil (alto costo, auditoria estricta)
  "Pembrolizumab": "tramite",
  "Nivolumab": "tramite",

  // Hormonoterapia inyectable / alto costo — tramite
  "Fulvestrant": "tramite",
  "Goserelina": "tramite",
  "Leuprolida": "tramite",
  "Triptorelina": "tramite",
  "Abiraterona": "tramite",
  "Enzalutamida": "tramite",

  // Dirigidas NO en vademecum — dificil (amparos frecuentes)
  "Trastuzumab emtansina (T-DM1)": "dificil",
  "T-DM1 (Ado-trastuzumab emtansina)": "dificil",
  "T-DXd (Trastuzumab deruxtecan)": "dificil",
  "Trastuzumab deruxtecan": "dificil",
  "Osimertinib": "dificil",
  "Lorlatinib": "dificil",
  "Sotorasib": "dificil",
  "Adagrasib": "dificil",
  "Tucatinib": "dificil",
  "Sacituzumab govitecan": "dificil",
  "Encorafenib": "dificil",
  "Alpelisib": "dificil",
  "Capivasertib": "dificil",
  "Olaparib": "dificil",
  "Rucaparib": "dificil",
  "Talazoparib": "dificil",
  "Ipilimumab": "dificil",
  "Durvalumab": "dificil",
  "Dostarlimab": "dificil",
  "Cemiplimab": "dificil",
  "Apalutamida": "dificil",
  "Atezolizumab": "dificil",

  // Estudios — variable
  "Panel genomico": "dificil",
  "Biopsia liquida": "dificil",
  "Oncotype DX": "dificil",
  "PET PSMA": "dificil",
};

// ── Diabetes T1 ─────────────────────────────────────────────────

const diabetesAcceso = {
  // Insulinas — directo (farmacia con receta)
  "Insulina Glargina (Lantus, Basaglar, Toujeo)": "directo",
  "Insulina Detemir (Levemir)": "directo",
  "Insulina Lispro (Humalog)": "directo",
  "Insulina Aspart (NovoRapid)": "directo",
  "Insulina Glulisina (Apidra)": "directo",

  // Insulinas nuevas — tramite (algunas OS piden justificacion)
  "Insulina Degludec (Tresiba)": "tramite",
  "Insulina Lispro ultrarapida (Lyumjev)": "tramite",
  "Insulina Aspart ultrarapida (Fiasp)": "tramite",

  // Insumos basicos — directo
  "Glucometro + tiras reactivas (100% cobertura por Ley 23.753)": "directo",
  "Lancetas y dispositivo de puncion": "directo",
  "Agujas para lapiceras de insulina (100% cobertura)": "directo",
  "Jeringas de insulina (si no usa lapicera)": "directo",

  // Sensores flash — tramite (Res 2091/2025 obliga, pero OS demoran)
  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": "tramite",
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": "tramite",

  // Sensores Dexcom — dificil (no en Res 2091, poca disponibilidad ARG)
  "Dexcom G6 — sensor continuo con alertas": "dificil",
  "Dexcom G7 — sensor continuo, mas pequeno": "dificil",

  // Bombas — dificil (alto costo, amparos frecuentes)
  "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)": "dificil",
  "Medtronic MiniMed 740G": "dificil",
  "Omnipod 5 (bomba sin tubo, asa cerrada con Dexcom)": "dificil",
  "Tandem t:slim X2 con Control-IQ": "dificil",
  "Sets de infusion para bomba de insulina": "dificil",
  "Reservorios/cartuchos para bomba": "dificil",
};

// ── Lookup unificado ────────────────────────────────────────────

const todosAcceso = { ...oncoAcceso, ...diabetesAcceso };

export function getDificultadAcceso(nombre) {
  // Exact match
  if (todosAcceso[nombre]) return todosAcceso[nombre];

  // For combinations, take the hardest
  const prioridad = { dificil: 3, tramite: 2, directo: 1 };
  const partes = nombre.split(/\s*[\+\/]\s*/);
  if (partes.length > 1) {
    let peor = null;
    for (const parte of partes) {
      const clean = parte.replace(/\s*\(.*\)\s*/g, "").trim();
      const d = getDificultadAcceso(clean);
      if (d && (!peor || prioridad[d] > prioridad[peor])) peor = d;
    }
    if (peor) return peor;
  }

  // Partial match
  const lower = nombre.toLowerCase();
  for (const [key, dif] of Object.entries(todosAcceso)) {
    if (lower.includes(key.toLowerCase())) return dif;
  }

  return null;
}

export const dificultadInfo = {
  directo: {
    label: "Acceso directo",
    descripcion: "Lo pedis y te lo dan. Farmacia con receta o autorizacion rapida.",
  },
  tramite: {
    label: "Acceso con tramite",
    descripcion: "Cubierto pero requiere autorizacion previa. Puede demorar dias a semanas.",
  },
  dificil: {
    label: "Acceso dificil",
    descripcion: "Alto indice de negativas. Probable que necesites reclamo formal o amparo.",
  },
};

// ── Fundamentacion por droga — por que esta clasificacion ───────
// Cada entrada explica la evidencia detrás de la clasificacion
// para mostrar en el boton (i) de la UI.

export const fundamentacion = {
  // Oncologia — dificil
  "Palbociclib": {
    dificultad: "tramite",
    porque: "Esta en el vademecum nacional (Res. 3377/2022) y tiene 12+ marcas biosimilares que bajaron el precio. Pero requiere autorizacion de auditoria medica en todas las OS.",
    datosLitigiosidad: "Entre los medicamentos mas litigados a nivel nacional (Registro Nacional SSS, 2024).",
    fuente: "Registro Nacional de Amparos SSS / preciosdemedicamentos.com.ar",
  },
  "Pembrolizumab": {
    dificultad: "tramite",
    porque: "En vademecum nacional para indicaciones aprobadas por ANMAT. Biosimilar Pembrox (Elea, 2025) bajo precios. Pero la cobertura depende de la indicacion exacta, biomarcadores (PD-L1), y protocolo.",
    datosLitigiosidad: "Alto costo (~$21M ARS/ciclo). Multiples amparos registrados, especialmente para indicaciones no estandar.",
    fallosRelacionados: 3,
    fuente: "OLEGISAR / Kairos / fallos verificados en jurisprudencia.js",
  },
  "Trastuzumab": {
    dificultad: "tramite",
    porque: "En vademecum nacional. 6+ biosimilares disponibles (47-63% ahorro). Autorizacion de rutina en todas las OS para indicaciones HER2+.",
    datosLitigiosidad: "Baja litigiosidad actual gracias a biosimilares y normativa clara.",
    fuente: "preciosdemedicamentos.com.ar / Res. 3377/2022",
  },
  "Osimertinib": {
    dificultad: "dificil",
    porque: "NO en vademecum nacional (Res. 3377/2022). Precio mas alto de todos los orales (~$21.4M ARS/mes). Sin biosimilar.",
    datosLitigiosidad: "Requiere amparo en la mayoria de los casos.",
    fuente: "Kairos / jurisprudencia.js",
  },
  "Trastuzumab deruxtecan": {
    dificultad: "dificil",
    porque: "NO en vademecum nacional. Costo ~$6M ARS/ciclo. Amparos recientes ganados contra OSDE (Chaco, 04/2025) y PAMI (Rosario, 11/2024).",
    datosLitigiosidad: "2 fallos favorables verificados en 2024-2025, lo que indica frecuencia de negativas.",
    fallosRelacionados: 2,
    fuente: "Litigio.com.ar / El Ciudadano Web",
  },
  "Oncotype DX": {
    dificultad: "dificil",
    porque: "No en PMO formalmente. Se procesa en USA (~USD 3.000-4.000). 3 fallos judiciales verificados ordenando cobertura.",
    datosLitigiosidad: "3 fallos verificados (Sancor 2026, OSDE reintegro 2025, IOSFA 2019), indicando negativas sistematicas.",
    fallosRelacionados: 3,
    fuente: "Justicia de Primera / jurisprudencia.js",
  },

  // Diabetes — dificil
  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": {
    dificultad: "tramite",
    porque: "Cubierto por Res. 2091/2025 (julio 2025) para insulinodependientes. Antes de esta resolucion era 'dificil'. Ahora las OS estan obligadas, pero algunas todavia demoran la autorizacion.",
    datosLitigiosidad: "4 fallos verificados pre-Res. 2091 (Omint 2019, OSEP Mendoza 2021, PAMI Salta 2025, Medife 2026). La litigiosidad deberia bajar con la nueva resolucion.",
    fallosRelacionados: 4,
    fuente: "Res. 2091/2025 B.O. / Microjuris / Justicia de Primera",
  },
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": {
    dificultad: "tramite",
    porque: "Mismo marco legal que Libre 2. Res. 2091/2025 cubre 'sistemas flash'. Precio particular ~$79.000/sensor.",
    datosLitigiosidad: "Incluido en la misma normativa que Libre 2.",
    fuente: "Res. 2091/2025 / OpenFarma",
  },
  "Dexcom G6 — sensor continuo con alertas": {
    dificultad: "dificil",
    porque: "NO incluido expresamente en Res. 2091/2025 (que dice 'flash'). Disponibilidad limitada en Argentina (no hay distribuidor oficial Dexcom). Precio alto via importacion individual.",
    datosLitigiosidad: "Jurisprudencia favorable usando Ley 26.914 ('equipos y dispositivos'), pero menor que FreeStyle Libre.",
    fuente: "Res. 2091/2025 / MercadoLibre (importacion individual)",
  },
  "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)": {
    dificultad: "dificil",
    porque: "Alto costo (ref. internacional USD 1.600-5.800). Requiere indicacion del equipo de diabetes. 3 fallos verificados ordenando cobertura de bombas, lo que indica negativas frecuentes.",
    datosLitigiosidad: "3 fallos favorables de bombas (PAMI 2018, Union Personal 2017 y 2021). Medicamento entre los mas litigados.",
    fallosRelacionados: 3,
    fuente: "Microjuris / Amparando Salud / GS BIO Argentina",
  },
};

// ── Helper: obtener fundamentacion de una droga ─────────────────

export function getFundamentacion(nombre) {
  if (fundamentacion[nombre]) return fundamentacion[nombre];
  // Partial match
  const lower = nombre.toLowerCase();
  for (const [key, fund] of Object.entries(fundamentacion)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower.split("(")[0].trim().toLowerCase())) {
      return fund;
    }
  }
  return null;
}
