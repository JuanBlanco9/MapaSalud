// ── Niveles de cobertura para diabetes tipo 1 ───────────────────
// "ley" = Ley 23.753 / 26.914, exigible a todas las OS/prepagas
// "pmo" = Incluido en PMO, cobertura 100%
// "gestion" = Requiere autorizacion especial, reclamo, o amparo

export const nivelCobertura = {
  // Insulinas — Ley 23.753 obliga 100% cobertura
  "Insulina Glargina (Lantus, Basaglar, Toujeo)": "ley",
  "Insulina Detemir (Levemir)": "ley",
  "Insulina Degludec (Tresiba)": "ley",
  "Insulina Lispro (Humalog)": "ley",
  "Insulina Aspart (NovoRapid)": "ley",
  "Insulina Glulisina (Apidra)": "ley",
  "Insulina Lispro ultrarapida (Lyumjev)": "ley",
  "Insulina Aspart ultrarapida (Fiasp)": "ley",

  // Insumos basicos — Ley 23.753 100%
  "Glucometro + tiras reactivas (100% cobertura por Ley 23.753)": "ley",
  "Lancetas y dispositivo de puncion": "ley",
  "Agujas para lapiceras de insulina (100% cobertura)": "ley",
  "Jeringas de insulina (si no usa lapicera)": "ley",

  // Sensores — la batalla principal
  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": "gestion",
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": "gestion",
  "Dexcom G6 — sensor continuo con alertas": "gestion",
  "Dexcom G7 — sensor continuo, mas pequeno": "gestion",

  // Bombas — requiere gestion
  "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)": "gestion",
  "Medtronic MiniMed 740G": "gestion",
  "Omnipod 5 (bomba sin tubo, asa cerrada con Dexcom)": "gestion",
  "Tandem t:slim X2 con Control-IQ": "gestion",

  // Insumos de bomba — depende de si la bomba fue aprobada
  "Sets de infusion para bomba de insulina": "gestion",
  "Reservorios/cartuchos para bomba": "gestion",
};

const prioridad = { gestion: 3, pmo: 2, ley: 1 };

export function getNivelDroga(nombre) {
  if (nivelCobertura[nombre]) return nivelCobertura[nombre];

  const partes = nombre.split(/\s*[\+\/]\s*/);
  if (partes.length > 1) {
    let peor = null;
    for (const parte of partes) {
      const clean = parte.replace(/\s*\(.*\)\s*/g, "").trim();
      const nivel = getNivelDroga(clean);
      if (nivel && (!peor || prioridad[nivel] > prioridad[peor])) {
        peor = nivel;
      }
    }
    if (peor) return peor;
  }

  const lower = nombre.toLowerCase();
  for (const [key, nivel] of Object.entries(nivelCobertura)) {
    if (lower.includes(key.toLowerCase())) return nivel;
  }

  // Diabetes-specific heuristics
  if (lower.includes("insulina")) return "ley";
  if (lower.includes("tiras") || lower.includes("lancetas") || lower.includes("agujas") || lower.includes("jeringas")) return "ley";
  if (lower.includes("sensor") || lower.includes("libre") || lower.includes("dexcom")) return "gestion";
  if (lower.includes("bomba") || lower.includes("omnipod") || lower.includes("medtronic") || lower.includes("tandem")) return "gestion";

  return null;
}

export const nivelesInfo = {
  ley: {
    label: "Cubierto — Ley 23.753",
    descripcion:
      "La ley obliga a todas las obras sociales y prepagas a cubrirlo al 100%. Si te lo niegan, es ilegal.",
    color: "verde",
  },
  pmo: {
    label: "Cubierto — PMO",
    descripcion:
      "Incluido en el Programa Medico Obligatorio. Cobertura obligatoria.",
    color: "verde",
  },
  gestion: {
    label: "Requiere gestion",
    descripcion:
      "Cobertura no garantizada por ley. Muchas OS lo cubren con indicacion medica, pero frecuente motivo de amparo. La Ley 26.914 se usa como argumento legal.",
    color: "rojo",
  },
};

export const pmo = {
  baseLegal:
    "Ley 23.753: cobertura 100% de insulinas, insumos de monitoreo, y medicacion para diabetes. Ley 26.914: amplia cobertura a nuevas tecnologias y tratamientos. PMO Art. 7.2: medicamentos cronicos prevalentes al 70%, pero diabetes tiene cobertura especial del 100%.",
  coseguros:
    "Insulinas e insumos basicos: 0% coseguro (cobertura total por ley). Sensores y bombas: coseguro variable o cobertura parcial segun OS.",
  tratamientos: [
    {
      tipo: "Insulinas (basal y rapida)",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Ley 23.753 obliga cobertura total. Glargina, detemir, lispro, aspart, glulisina. Degludec y ultrarapidas: algunas OS requieren justificacion.",
    },
    {
      tipo: "Insumos de monitoreo",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Tiras reactivas (400/mes minimo segun guias), lancetas, glucometro. Ley 23.753.",
    },
    {
      tipo: "Sensor de glucosa continuo (CGM)",
      cobertura: "Variable",
      autorizacionPrevia: true,
      nota: "FreeStyle Libre y Dexcom: cobertura NO garantizada por ley. Muchas OS cubren con indicacion medica. Causa principal de amparos en diabetes. Ley 26.914 como argumento.",
    },
    {
      tipo: "Bomba de insulina (ISCI)",
      cobertura: "Variable",
      autorizacionPrevia: true,
      nota: "Requiere indicacion del equipo de diabetes. Cobertura variable: algunas OS cubren, muchas requieren amparo. Incluye insumos (sets, reservorios).",
    },
    {
      tipo: "Educacion diabetologica",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Conteo de carbohidratos, manejo de hipoglucemia, automonitoreo. Cubierto por PMO.",
    },
  ],
  estudios: [
    { nombre: "HbA1c (hemoglobina glicosilada)", cobertura: "100%", autorizacionPrevia: false },
    { nombre: "Glucemia en ayunas", cobertura: "100%", autorizacionPrevia: false },
    { nombre: "Perfil lipidico", cobertura: "100%", autorizacionPrevia: false },
    { nombre: "Funcion renal (creatinina, microalbuminuria)", cobertura: "100%", autorizacionPrevia: false },
    { nombre: "Fondo de ojo (retinopatia diabetica)", cobertura: "100%", autorizacionPrevia: false },
    { nombre: "ECG / evaluacion cardiovascular", cobertura: "100%", autorizacionPrevia: false },
    {
      nombre: "Peptido C (confirmar DM1 vs DM2)",
      cobertura: "100%",
      autorizacionPrevia: false,
    },
    {
      nombre: "Anticuerpos anti-GAD, anti-IA2, anti-insulina",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Para confirmar diagnostico autoinmune. Algunas OS requieren justificacion.",
    },
  ],
};
