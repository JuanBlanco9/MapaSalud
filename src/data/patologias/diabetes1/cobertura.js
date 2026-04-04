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

  // No disponible en Argentina
  "Insulina semanal Icodec (Awiqli — aprobada FDA 2024, no disponible en ARG)": "gestion",

  // Insumos basicos — Ley 23.753 100%
  "Glucometro + tiras reactivas (100% cobertura por Ley 23.753)": "ley",
  "Lancetas y dispositivo de puncion": "ley",
  "Agujas para lapiceras de insulina (100% cobertura)": "ley",
  "Jeringas de insulina (si no usa lapicera)": "ley",

  // Sensores flash — Res 2091/2025: 100% cobertura para insulinodependientes
  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": "ley",
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": "ley",

  // Sensores Dexcom — no incluidos expresamente en Res 2091/2025 (dice "flash")
  "Dexcom G6 — sensor continuo con alertas": "gestion",
  "Dexcom G7 — sensor continuo, mas pequeno": "gestion",

  // Bombas — requiere gestion
  "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)": "gestion",
  "Medtronic MiniMed 740G": "gestion",
  "Omnipod 5 (bomba sin tubo, asa cerrada con Dexcom)": "gestion",
  "Tandem t:slim X2 con Control-IQ": "gestion",

  // Insumos de bomba
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
    label: "Cubierto por ley — 100%",
    descripcion:
      "Ley 23.753, Ley 26.914 y Res. 2091/2025 obligan a TODAS las OS, prepagas y PAMI a cubrirlo al 100%. Si te lo niegan, es ilegal.",
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
      "No incluido expresamente en Res. 2091/2025. Muchas OS cubren con indicacion medica, pero puede requerir reclamo o amparo. Jurisprudencia favorable.",
    color: "rojo",
  },
};

export const pmo = {
  baseLegal:
    "Ley 23.753 + Ley 26.914: cobertura 100% de insulinas, insumos, y tecnologia para diabetes. Res. 2091/2025 (julio 2025): cobertura 100% de sensores flash CGM para insulinodependientes, embarazadas, y quienes planifiquen embarazo. Aplica a TODAS las OS, prepagas, PAMI, IOSFA, y obras sociales universitarias. Diagnostico de diabetes valido de por vida.",
  coseguros:
    "Insulinas, insumos basicos y sensores flash: 0% coseguro (cobertura total por ley). Bombas de insulina y sensores Dexcom: coseguro variable segun OS.",
  tratamientos: [
    {
      tipo: "Insulinas (basal y rapida)",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Ley 23.753 obliga cobertura total. Glargina ($525.000/caja), lispro ($348.000/caja), aspart, glulisina, detemir, degludec. PAMI: $0 con empadronamiento.",
    },
    {
      tipo: "Insumos de monitoreo",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Tiras reactivas, lancetas, glucometro. Ley 23.753. Cantidades segun prescripcion medica.",
    },
    {
      tipo: "Sensor flash CGM (FreeStyle Libre)",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Res. 2091/2025 (julio 2025): cobertura 100% segun Anexo I para insulinodependientes, embarazadas, y quienes planifiquen embarazo. Reemplazo la Res. 2820/2022. Precio particular: ~$117.936/sensor (14 dias, precio abril 2026). Si te lo niegan, cita la Res. 2091/2025.",
    },
    {
      tipo: "Sensor CGM con alertas (Dexcom)",
      cobertura: "Variable",
      autorizacionPrevia: true,
      nota: "Dexcom G6/G7 no incluido expresamente en Res. 2091/2025 (que dice 'flash'). Disponibilidad limitada en ARG. Jurisprudencia favorable usando Ley 26.914.",
    },
    {
      tipo: "Bomba de insulina (ISCI)",
      cobertura: "Variable",
      autorizacionPrevia: true,
      nota: "Medtronic 780G, Omnipod, Tandem. Requiere indicacion del equipo de diabetes. Muchas OS cubren, algunas requieren amparo. Precio no publicado (referencia internacional: USD 1.600-5.800).",
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
