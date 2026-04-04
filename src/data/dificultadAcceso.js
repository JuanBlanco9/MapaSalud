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
  "Sensor flash CGM (FreeStyle Libre)": "tramite",
  "Sensor flash CGM": "tramite",
  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": "tramite",
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": "tramite",

  // Sensores Dexcom — dificil (no en Res 2091, poca disponibilidad ARG)
  "Sensor CGM con alertas (Dexcom)": "dificil",
  "Dexcom G6 — sensor continuo con alertas": "dificil",
  "Dexcom G7 — sensor continuo, mas pequeno": "dificil",

  // Bombas — dificil (alto costo, amparos frecuentes)
  "Bomba de insulina (ISCI)": "dificil",
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
  "Palbociclib": {
    porque: "En vademecum nacional (Res. 3377/2022), 12+ biosimilares. Requiere auditoria medica.",
    datosLitigiosidad: "Entre los mas litigados a nivel nacional (Registro Nacional SSS, 2024).",
    fallos: [
      {
        titulo: "R.E.V. c/ Incluir Salud (Palbociclib + Letrozol, ca. mama)",
        url: "https://www.cij.gov.ar/scp/d/sentencia-SGU-89083ab5-7a4d-45cb-94aa-f792c81d0e73.pdf",
        tribunal: "Cam. Fed. La Plata, Sala II, 2020",
      },
    ],
    normativa: [
      { titulo: "Res. 3377/2022 — Listado Complementario", url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=376215" },
    ],
  },
  "Pembrolizumab": {
    porque: "En vademecum para indicaciones ANMAT. Biosimilar Pembrox (2025) bajo precios. Cobertura depende de indicacion, PD-L1, protocolo.",
    datosLitigiosidad: "~$21M ARS/ciclo. Multiples amparos, especialmente indicaciones no estandar.",
    fallos: [
      {
        titulo: "Amparo c/ Economicas Salud (Pembrolizumab ca. uterino, Rosario)",
        url: "https://www.abogadosrosario.com/noticias/leer/13177-ordenan-prestadora-salud-cubrir-medicacio-oncologica.html",
        tribunal: "Juz. Fed. Rosario, 2024",
      },
      {
        titulo: "Amparo c/ PAMI (Pembrolizumab ca. uterino, Rosario)",
        url: "https://www.versionrosario.com.ar/pami-debera-cubrir-a-una-afiliada-un-costoso-medicamento-oncologico/",
        tribunal: "Juz. Fed. N.1 Rosario, 2020",
      },
      {
        titulo: "OSDE condenada a proveer Pembrolizumab (cancer renal, Corrientes)",
        url: "http://www.juscorrientes.gov.ar/prensa/condenan-a-osde-a-proveer-un-medicamento-no-autorizado-por-la-anmat-argentina-a-paciente-con-cancer/",
        tribunal: "Juz. CyCL Esquina, Corrientes, 17/12/2021",
      },
    ],
    normativa: [
      { titulo: "Res. 3377/2022", url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=376215" },
    ],
  },
  "Trastuzumab": {
    porque: "En vademecum nacional. 6+ biosimilares (47-63% ahorro). Autorizacion de rutina para HER2+.",
    datosLitigiosidad: "Baja litigiosidad actual gracias a biosimilares.",
    fallos: [],
    normativa: [
      { titulo: "Res. 3377/2022", url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=376215" },
    ],
  },
  "Osimertinib": {
    porque: "NO en vademecum nacional. Precio mas alto oral (~$21.4M/mes). Sin biosimilar.",
    datosLitigiosidad: "Requiere amparo en la mayoria de los casos.",
    fallos: [],
    normativa: [],
  },
  "Trastuzumab deruxtecan": {
    porque: "NO en vademecum nacional. ~$6M ARS/ciclo. Amparos ganados contra OSDE y PAMI en 2024-2025.",
    datosLitigiosidad: "2 fallos favorables verificados — indica negativas frecuentes.",
    fallos: [
      {
        titulo: "Amparo c/ OSDE — Enhertu (Chaco)",
        url: "https://litigio.com.ar/2025/04/09/confirman-un-fallo-que-ordeno-a-osde-la-cobertura-de-un-medicamento-oncologico/",
        tribunal: "Cam. Fed. Resistencia, 09/04/2025",
      },
      {
        titulo: "Amparo c/ PAMI — Enhertu (Rosario)",
        url: "https://elciudadanoweb.com/la-justicia-ordeno-a-pami-cubrir-a-una-afiliada-medicacion-oncologica/",
        tribunal: "Juz. Fed. Rosario, 11/2024",
      },
    ],
    normativa: [],
  },
  "Oncotype DX": {
    porque: "No en PMO. Se procesa en USA (~USD 3.000-4.000). 3 fallos ordenando cobertura.",
    datosLitigiosidad: "3 fallos verificados — negativas sistematicas.",
    fallos: [
      {
        titulo: "Amparo c/ Sancor Salud — Oncotype DX (San Martin)",
        url: "https://justiciadeprimera.com/2026/03/30/prepaga-debe-cubrir-un-estudio-genetico-por-cancer-de-mama/",
        tribunal: "Juz. Fed. San Martin, 03/2026",
      },
      {
        titulo: "Amparo c/ OSDE — Reintegro Oncotype DX",
        url: "https://justiciadeprimera.com/2025/11/03/ordenan-reintegrar-a-afiliada-con-cancer-de-mama-el-costo-de-un-test-genetico-clave/",
        tribunal: "CNACCF Sala III, 11/2025",
      },
      {
        titulo: "Cautelar c/ IOSFA — Oncotype DX en 24hs",
        url: "https://actualidadjuridicaonline.com/cautelar-ordena-la-ejecucion-inmediata-de-la-practica-oncologica-oncotype/",
        tribunal: "Juz. Fed. (Juez Marigo), 13/12/2019",
      },
    ],
    normativa: [],
  },
  "Sensor flash CGM (FreeStyle Libre)": {
    porque: "Cubierto por Res. 2091/2025 para insulinodependientes. Pero muchas OS todavia demoran la autorizacion pese a la obligacion legal.",
    datosLitigiosidad: "El sensor de glucosa es el insumo de diabetes mas litigado en Argentina. 4 fallos verificados pre-Res. 2091/2025.",
    fallos: [
      {
        titulo: "H.R. c/ Omint — FreeStyle Libre",
        url: "https://aldiaargentina.microjuris.com/2019/06/06/medicion-de-glucemia-asegurada-la-empresa-de-medicina-prepaga-debe-cubrir-al-actor-el-sensor-de-glucemia-indicado-por-su-medico-tratante/",
        tribunal: "CNACCF Sala I, 14/03/2019",
      },
      {
        titulo: "Amparo c/ PAMI — Sensor glucosa (Salta)",
        url: "https://justiciadeprimera.com/2025/02/10/conflicto-por-la-cobertura-de-sensores-de-medicion-de-glucosa-para-diabetes/",
        tribunal: "Cam. Fed. Salta, Sala I, 02/2025",
      },
      {
        titulo: "Amparo c/ Medife — FreeStyle Libre (CABA)",
        url: "https://justiciadeprimera.com/2026/02/12/cobertura-obligatoria-al-100-para-insumos-de-diabetes/",
        tribunal: "Juz. Civ.Com.Fed. (Nobili), 02/2026",
      },
    ],
    normativa: [
      { titulo: "Res. 2091/2025 (cobertura sensores flash)", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/327710/20250701" },
      { titulo: "Ley 26.914", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm" },
    ],
  },
  "Sensor CGM con alertas (Dexcom)": {
    porque: "NO incluido en Res. 2091/2025 (que dice 'flash'). Sin distribuidor oficial Dexcom en Argentina.",
    datosLitigiosidad: "Menor litigiosidad que FreeStyle Libre por baja disponibilidad en el pais.",
    fallos: [],
    normativa: [
      { titulo: "Ley 26.914 (argumento 'equipos y dispositivos')", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm" },
    ],
  },
  "Bomba de insulina (ISCI)": {
    porque: "Alto costo (USD 1.600-5.800 ref. internacional). Requiere indicacion del equipo de diabetes. Las OS frecuentemente niegan o intentan sustituir el modelo prescripto.",
    datosLitigiosidad: "3 fallos verificados ordenando cobertura de bombas, lo que indica negativas sistematicas.",
    fallos: [
      {
        titulo: "M.M.E. c/ PAMI — Bomba Medtronic Veo 754",
        url: "https://aldiaargentina.microjuris.com/2018/08/01/se-ordena-otorgar-la-bomba-infusora-de-insulina-integrada-con-monitoreo-continuo-de-glucosa-alarmas-y-suspension-automatica-de-insulina/",
        tribunal: "CNACCF Sala II, 08/06/2018",
      },
      {
        titulo: "M.A.N. c/ Union Personal — Bomba Medtronic",
        url: "https://aldiaargentina.microjuris.com/2017/11/23/obligacion-de-la-obra-social-de-proveer-al-actor-la-microinfusora-de-insulina-con-bolo-inteligente-y-medicion-continua-de-glucosa-en-tiempo-real/",
        tribunal: "CNACCF, 01/08/2017",
      },
    ],
    normativa: [
      { titulo: "Ley 26.914", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm" },
    ],
  },
  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": {
    porque: "Cubierto por Res. 2091/2025 para insulinodependientes. Antes 'dificil', ahora OS obligadas pero algunas demoran.",
    datosLitigiosidad: "4 fallos pre-Res. 2091. La litigiosidad deberia bajar.",
    fallos: [
      {
        titulo: "H.R. c/ Omint — FreeStyle Libre",
        url: "https://aldiaargentina.microjuris.com/2019/06/06/medicion-de-glucemia-asegurada-la-empresa-de-medicina-prepaga-debe-cubrir-al-actor-el-sensor-de-glucemia-indicado-por-su-medico-tratante/",
        tribunal: "CNACCF Sala I, 14/03/2019",
      },
      {
        titulo: "V.M.E. c/ OSEP — FreeStyle Libre (Mendoza)",
        url: "https://aldiaargentina.microjuris.com/2021/05/18/fallos-salud-una-obra-social-debe-brindar-cobertura-de-un-dispositivo-de-monitoreo-continuo-de-glucosa-para-la-afiliada-que-padece-diabetes-ya-que-que-presenta-ventajas-cualitativas-en-el-tratamien/",
        tribunal: "1ra Cam. San Rafael, Mendoza, 15/04/2021",
      },
      {
        titulo: "Amparo c/ PAMI — Sensor glucosa (Salta)",
        url: "https://justiciadeprimera.com/2025/02/10/conflicto-por-la-cobertura-de-sensores-de-medicion-de-glucosa-para-diabetes/",
        tribunal: "Cam. Fed. Salta, Sala I, 02/2025",
      },
      {
        titulo: "Amparo c/ Medife — FreeStyle Libre (CABA)",
        url: "https://justiciadeprimera.com/2026/02/12/cobertura-obligatoria-al-100-para-insumos-de-diabetes/",
        tribunal: "Juz. Civ.Com.Fed. (Nobili), 02/2026",
      },
    ],
    normativa: [
      { titulo: "Res. 2091/2025 (cobertura sensores flash)", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/327710/20250701" },
      { titulo: "Ley 26.914 (equipos y dispositivos diabetes)", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm" },
    ],
  },
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": {
    porque: "Mismo marco que Libre 2. Res. 2091/2025 cubre 'sistemas flash'. ~$79.000/sensor.",
    datosLitigiosidad: "Misma normativa que Libre 2.",
    fallos: [],
    normativa: [
      { titulo: "Res. 2091/2025", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/327710/20250701" },
    ],
  },
  "Dexcom G6 — sensor continuo con alertas": {
    porque: "NO en Res. 2091/2025 (que dice 'flash'). Sin distribuidor oficial en ARG. Importacion individual.",
    datosLitigiosidad: "Jurisprudencia favorable via Ley 26.914, pero menor que Libre.",
    fallos: [],
    normativa: [
      { titulo: "Ley 26.914 (argumento 'equipos y dispositivos')", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm" },
    ],
  },
  "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)": {
    porque: "Alto costo (USD 1.600-5.800). Requiere indicacion de equipo de diabetes. 3 fallos ordenando cobertura.",
    datosLitigiosidad: "3 fallos favorables — negativas frecuentes.",
    fallos: [
      {
        titulo: "M.M.E. c/ PAMI — Bomba Medtronic Veo 754",
        url: "https://aldiaargentina.microjuris.com/2018/08/01/se-ordena-otorgar-la-bomba-infusora-de-insulina-integrada-con-monitoreo-continuo-de-glucosa-alarmas-y-suspension-automatica-de-insulina/",
        tribunal: "CNACCF Sala II, 08/06/2018",
      },
      {
        titulo: "M.A.N. c/ Union Personal — Bomba Medtronic",
        url: "https://aldiaargentina.microjuris.com/2017/11/23/obligacion-de-la-obra-social-de-proveer-al-actor-la-microinfusora-de-insulina-con-bolo-inteligente-y-medicion-continua-de-glucosa-en-tiempo-real/",
        tribunal: "CNACCF, 01/08/2017",
      },
      {
        titulo: "Z.Y.E. c/ Union Personal — Bomba Medtronic prescripta",
        url: "https://amparandosalud.com.ar/obra-social-niega-bomba-de-insulina-las-leyes-y-un-amparo-que-garantizaron-la-cobertura-integra/",
        tribunal: "1ra y 2da instancia, 2021",
      },
    ],
    normativa: [
      { titulo: "Ley 26.914", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm" },
    ],
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
