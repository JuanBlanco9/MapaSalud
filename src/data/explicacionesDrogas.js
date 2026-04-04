// ── Explicaciones de drogas/insumos en lenguaje simple ──────────
// Para mostrar al paciente cuando hace clic en el nombre.
// Cada entrada tiene: que es, como se administra, y links.
//
// Fuentes principales:
// - MedlinePlus en español (medlineplus.gov/spanish)
// - ANMAT (anmat.gob.ar)
// - Chemocare (chemocare.com) — info para pacientes
// - NCCN Patient Guidelines

export const explicaciones = {
  // ── ONCOLOGIA — Primera linea / dirigidas ─────────────────────

  "Trastuzumab": {
    nombre: "Trastuzumab (Herceptin y biosimilares)",
    queEs: "Anticuerpo monoclonal que bloquea la proteina HER2 en la superficie de las celulas tumorales. Se usa en cancer de mama y gastrico HER2 positivo.",
    administracion: "Intravenoso, generalmente cada 3 semanas. Tambien existe una version subcutanea (inyeccion bajo la piel en 5 minutos).",
    links: [
      { titulo: "MedlinePlus — Trastuzumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a699011-es.html" },
      { titulo: "Chemocare — Herceptin", url: "https://chemocare.com/es/chemotherapy/drug-info/trastuzumab.aspx" },
    ],
  },
  "Pertuzumab": {
    nombre: "Pertuzumab (Perjeta)",
    queEs: "Anticuerpo monoclonal que se combina con trastuzumab para bloquear HER2 de forma mas completa. Se usa en cancer de mama HER2+.",
    administracion: "Intravenoso, cada 3 semanas, junto con trastuzumab y quimioterapia.",
    links: [
      { titulo: "MedlinePlus — Pertuzumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a612028-es.html" },
    ],
  },
  "T-DM1 (Ado-trastuzumab emtansina)": {
    nombre: "T-DM1 / Ado-trastuzumab emtansina (Kadcyla)",
    queEs: "Combina trastuzumab con un agente de quimioterapia (emtansina) que se libera directamente dentro de la celula tumoral HER2+. Reduce efectos secundarios de la quimio convencional.",
    administracion: "Intravenoso, cada 3 semanas.",
    links: [
      { titulo: "MedlinePlus — Ado-trastuzumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a613038-es.html" },
    ],
  },
  "T-DXd (Trastuzumab deruxtecan)": {
    nombre: "Trastuzumab deruxtecan (Enhertu)",
    queEs: "Anticuerpo conjugado de nueva generacion contra HER2. Mas potente que T-DM1. Funciona incluso en tumores con niveles bajos de HER2 (HER2-low).",
    administracion: "Intravenoso, cada 3 semanas.",
    links: [
      { titulo: "Cancer.org — Enhertu", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-seno/tratamiento/terapia-dirigida-para-el-cancer-de-seno.html" },
    ],
  },
  "Pembrolizumab": {
    nombre: "Pembrolizumab (Keytruda)",
    queEs: "Inmunoterapia que 'desbloquea' al sistema inmune para que ataque al tumor. Bloquea la proteina PD-1 que usan las celulas tumorales para esconderse. Se usa en pulmon, mama triple negativo, colorrectal MSI-H, y otros.",
    administracion: "Intravenoso, cada 3 o 6 semanas segun indicacion.",
    links: [
      { titulo: "MedlinePlus — Pembrolizumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a614048-es.html" },
      { titulo: "Cancer.org — Inmunoterapia", url: "https://www.cancer.org/es/cancer/como-sobrellevar-el-cancer/tipos-de-tratamiento/inmunoterapia.html" },
    ],
  },
  "Nivolumab": {
    nombre: "Nivolumab (Opdivo)",
    queEs: "Inmunoterapia similar a pembrolizumab. Bloquea PD-1 para que el sistema inmune reconozca y ataque al tumor. Se usa en pulmon, rinon, melanoma, colorrectal MSI-H, y otros.",
    administracion: "Intravenoso, cada 2 o 4 semanas. Desde 2026, disponible en version subcutanea (inyeccion).",
    links: [
      { titulo: "MedlinePlus — Nivolumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a614056-es.html" },
    ],
  },
  "Bevacizumab": {
    nombre: "Bevacizumab (Avastin y biosimilares)",
    queEs: "Anticuerpo que bloquea la formacion de nuevos vasos sanguineos que alimentan al tumor (antiangiogenico). Se usa en colorrectal, pulmon, rinon, cuello de utero, y otros.",
    administracion: "Intravenoso, cada 2 o 3 semanas.",
    links: [
      { titulo: "MedlinePlus — Bevacizumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a607001-es.html" },
    ],
  },
  "Cetuximab": {
    nombre: "Cetuximab (Erbitux)",
    queEs: "Anticuerpo que bloquea el receptor EGFR en la superficie del tumor. Se usa en colorrectal (RAS wild-type) y cabeza/cuello.",
    administracion: "Intravenoso, semanal o cada 2 semanas.",
    links: [
      { titulo: "MedlinePlus — Cetuximab", url: "https://medlineplus.gov/spanish/druginfo/meds/a607037-es.html" },
    ],
  },
  "Panitumumab": {
    nombre: "Panitumumab (Vectibix)",
    queEs: "Anticuerpo anti-EGFR similar a cetuximab. Se usa en colorrectal metastasico RAS wild-type.",
    administracion: "Intravenoso, cada 2 semanas.",
    links: [
      { titulo: "MedlinePlus — Panitumumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a607066-es.html" },
    ],
  },
  "Palbociclib": {
    nombre: "Palbociclib (Ibrance y biosimilares)",
    queEs: "Inhibidor de CDK4/6 que frena la division celular del tumor. Se usa en cancer de mama RE+/HER2- avanzado, combinado con hormonoterapia.",
    administracion: "Oral (capsulas), 21 dias tomando + 7 dias de descanso. Ciclo de 28 dias.",
    links: [
      { titulo: "MedlinePlus — Palbociclib", url: "https://medlineplus.gov/spanish/druginfo/meds/a615012-es.html" },
    ],
  },
  "Ribociclib": {
    nombre: "Ribociclib (Kisqali)",
    queEs: "Inhibidor de CDK4/6 similar a palbociclib. Se usa en cancer de mama RE+/HER2- avanzado.",
    administracion: "Oral (comprimidos), 21 dias tomando + 7 dias de descanso.",
    links: [
      { titulo: "MedlinePlus — Ribociclib", url: "https://medlineplus.gov/spanish/druginfo/meds/a617046-es.html" },
    ],
  },
  "Abemaciclib": {
    nombre: "Abemaciclib (Verzenio)",
    queEs: "Inhibidor de CDK4/6. A diferencia de palbociclib y ribociclib, se toma de forma continua (sin semana de descanso).",
    administracion: "Oral (comprimidos), 2 veces por dia, todos los dias.",
    links: [
      { titulo: "MedlinePlus — Abemaciclib", url: "https://medlineplus.gov/spanish/druginfo/meds/a618010-es.html" },
    ],
  },
  "Osimertinib": {
    nombre: "Osimertinib (Tagrisso)",
    queEs: "Inhibidor de EGFR de tercera generacion para cancer de pulmon con mutacion EGFR. Cruza la barrera hematoencefalica (util en metastasis cerebrales).",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    links: [
      { titulo: "MedlinePlus — Osimertinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a616018-es.html" },
    ],
  },
  "Alectinib": {
    nombre: "Alectinib (Alecensa)",
    queEs: "Inhibidor de ALK para cancer de pulmon con reordenamiento ALK. Recomendado por guias NCCN como primera linea sobre crizotinib.",
    administracion: "Oral (capsulas), 2 veces por dia con alimentos.",
    links: [
      { titulo: "MedlinePlus — Alectinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a616011-es.html" },
    ],
  },
  "Olaparib": {
    nombre: "Olaparib (Lynparza)",
    queEs: "Inhibidor de PARP para tumores con mutacion BRCA (mama, ovario, prostata). Impide que las celulas tumorales reparen su ADN danado.",
    administracion: "Oral (comprimidos), 2 veces por dia.",
    links: [
      { titulo: "MedlinePlus — Olaparib", url: "https://medlineplus.gov/spanish/druginfo/meds/a615022-es.html" },
    ],
  },

  // ── ONCOLOGIA — Quimioterapia ─────────────────────────────────

  "Paclitaxel": {
    nombre: "Paclitaxel (Taxol)",
    queEs: "Quimioterapia clasica que interfiere con la division celular. Se usa en mama, pulmon, ovario, y otros.",
    administracion: "Intravenoso, semanal o cada 3 semanas.",
    links: [
      { titulo: "MedlinePlus — Paclitaxel", url: "https://medlineplus.gov/spanish/druginfo/meds/a607070-es.html" },
    ],
  },
  "Carboplatino": {
    nombre: "Carboplatino",
    queEs: "Quimioterapia basada en platino. Dana el ADN de las celulas tumorales. Se usa en pulmon, ovario, y otros.",
    administracion: "Intravenoso, generalmente cada 3 semanas.",
    links: [
      { titulo: "Chemocare — Carboplatino", url: "https://chemocare.com/es/chemotherapy/drug-info/carboplatino.aspx" },
    ],
  },
  "Cisplatino": {
    nombre: "Cisplatino",
    queEs: "Quimioterapia basada en platino, mas potente que carboplatino pero con mas efectos secundarios. Se usa en pulmon, cuello de utero, cabeza/cuello, y otros.",
    administracion: "Intravenoso. Requiere hidratacion intensa para proteger los rinones.",
    links: [
      { titulo: "MedlinePlus — Cisplatino", url: "https://medlineplus.gov/spanish/druginfo/meds/a684036-es.html" },
    ],
  },
  "Docetaxel": {
    nombre: "Docetaxel (Taxotere)",
    queEs: "Quimioterapia similar a paclitaxel. Se usa en mama, pulmon, prostata, y otros.",
    administracion: "Intravenoso, cada 3 semanas.",
    links: [
      { titulo: "MedlinePlus — Docetaxel", url: "https://medlineplus.gov/spanish/druginfo/meds/a696031-es.html" },
    ],
  },

  // ── ONCOLOGIA — Hormonoterapia ────────────────────────────────

  "Tamoxifeno": {
    nombre: "Tamoxifeno (Nolvadex)",
    queEs: "Bloquea los receptores de estrogeno en el tumor. Es el tratamiento hormonal mas usado en cancer de mama RE+, especialmente en premenopausicas.",
    administracion: "Oral (comprimidos), 1 vez por dia, durante 5 a 10 anios.",
    links: [
      { titulo: "MedlinePlus — Tamoxifeno", url: "https://medlineplus.gov/spanish/druginfo/meds/a682414-es.html" },
    ],
  },
  "Anastrozol": {
    nombre: "Anastrozol (Arimidex)",
    queEs: "Inhibidor de aromatasa. Reduce la produccion de estrogeno en mujeres postmenopausicas con cancer de mama RE+.",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    links: [
      { titulo: "MedlinePlus — Anastrozol", url: "https://medlineplus.gov/spanish/druginfo/meds/a696018-es.html" },
    ],
  },
  "Letrozol": {
    nombre: "Letrozol (Femara)",
    queEs: "Inhibidor de aromatasa similar a anastrozol. Para cancer de mama RE+ en postmenopausicas.",
    administracion: "Oral, 1 vez por dia.",
    links: [
      { titulo: "MedlinePlus — Letrozol", url: "https://medlineplus.gov/spanish/druginfo/meds/a698004-es.html" },
    ],
  },
  "Abiraterona": {
    nombre: "Abiraterona (Zytiga)",
    queEs: "Bloquea la produccion de androgenos (hormonas masculinas) que alimentan al cancer de prostata. Se usa junto con prednisona.",
    administracion: "Oral (comprimidos), 1 vez por dia en ayunas.",
    links: [
      { titulo: "MedlinePlus — Abiraterona", url: "https://medlineplus.gov/spanish/druginfo/meds/a611046-es.html" },
    ],
  },
  "Enzalutamida": {
    nombre: "Enzalutamida (Xtandi)",
    queEs: "Bloquea el receptor de androgenos en las celulas tumorales de prostata. Se usa en cancer de prostata avanzado.",
    administracion: "Oral (capsulas o comprimidos), 1 vez por dia.",
    links: [
      { titulo: "MedlinePlus — Enzalutamida", url: "https://medlineplus.gov/spanish/druginfo/meds/a612027-es.html" },
    ],
  },

  // ── DIABETES — Insulinas ──────────────────────────────────────

  "Insulina Glargina (Lantus, Basaglar, Toujeo)": {
    nombre: "Insulina Glargina (Lantus, Basaglar, Toujeo)",
    queEs: "Insulina de accion prolongada (basal). Mantiene un nivel estable de insulina durante 24 horas. Es la base del tratamiento de diabetes tipo 1.",
    administracion: "Subcutanea (inyeccion bajo la piel), 1 vez por dia, siempre a la misma hora.",
    links: [
      { titulo: "MedlinePlus — Insulina Glargina", url: "https://medlineplus.gov/spanish/druginfo/meds/a600027-es.html" },
    ],
  },
  "Insulina Detemir (Levemir)": {
    nombre: "Insulina Detemir (Levemir)",
    queEs: "Insulina de accion prolongada. Similar a glargina pero puede requerir 2 inyecciones diarias.",
    administracion: "Subcutanea, 1 o 2 veces por dia.",
    links: [
      { titulo: "MedlinePlus — Insulina Detemir", url: "https://medlineplus.gov/spanish/druginfo/meds/a606012-es.html" },
    ],
  },
  "Insulina Degludec (Tresiba)": {
    nombre: "Insulina Degludec (Tresiba)",
    queEs: "Insulina ultralenta de ultima generacion. Dura mas de 42 horas, lo que permite mayor flexibilidad en el horario de inyeccion. Menor riesgo de hipoglucemia nocturna.",
    administracion: "Subcutanea, 1 vez por dia (horario flexible).",
    links: [
      { titulo: "MedlinePlus — Insulina Degludec", url: "https://medlineplus.gov/spanish/druginfo/meds/a614042-es.html" },
    ],
  },
  "Insulina Lispro (Humalog)": {
    nombre: "Insulina Lispro (Humalog)",
    queEs: "Insulina de accion rapida. Se inyecta antes de comer para cubrir el azucar de la comida (bolo prandial).",
    administracion: "Subcutanea, justo antes de cada comida (0-15 minutos).",
    links: [
      { titulo: "MedlinePlus — Insulina Lispro", url: "https://medlineplus.gov/spanish/druginfo/meds/a697021-es.html" },
    ],
  },
  "Insulina Aspart (NovoRapid)": {
    nombre: "Insulina Aspart (NovoRapid)",
    queEs: "Insulina de accion rapida similar a lispro. Para cubrir las comidas.",
    administracion: "Subcutanea, justo antes de comer.",
    links: [
      { titulo: "MedlinePlus — Insulina Aspart", url: "https://medlineplus.gov/spanish/druginfo/meds/a605013-es.html" },
    ],
  },

  // ── DIABETES — Tecnologia ─────────────────────────────────────

  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": {
    nombre: "Sensor FreeStyle Libre 2 (Abbott)",
    queEs: "Sensor de glucosa que se adhiere al brazo y mide la glucosa en el liquido intersticial cada minuto. Para ver el valor, se acerca el celular o lector al sensor ('escaneo'). Dura 14 dias.",
    administracion: "Se coloca en la parte posterior del brazo con un aplicador. Indoloro. Se reemplaza cada 14 dias.",
    links: [
      { titulo: "Abbott — FreeStyle Libre", url: "https://www.freestyle.abbott/ar-es/home.html" },
      { titulo: "CUI.D.AR — Sensores de glucosa", url: "https://cuidar.org" },
    ],
  },
  "FreeStyle Libre 3 (Abbott) — sensor continuo, 14 dias": {
    nombre: "Sensor FreeStyle Libre 3 (Abbott)",
    queEs: "Version mas nueva y mas chica del Libre 2. Envia las lecturas automaticamente al celular sin necesidad de escanear. Tiene alertas de glucosa alta y baja.",
    administracion: "Igual que el Libre 2: se coloca en el brazo, dura 14 dias.",
    links: [
      { titulo: "Abbott — FreeStyle Libre 3", url: "https://www.freestyle.abbott/ar-es/home.html" },
    ],
  },
  "Dexcom G6 — sensor continuo con alertas": {
    nombre: "Sensor Dexcom G6",
    queEs: "Sensor de monitoreo continuo de glucosa (CGM) con alertas predictivas. Avisa antes de que la glucosa suba o baje demasiado. No requiere escanear — envia datos continuamente.",
    administracion: "Se coloca en abdomen o parte posterior del brazo. Dura 10 dias. Transmisor reutilizable por 3 meses.",
    links: [
      { titulo: "Dexcom — G6", url: "https://www.dexcom.com/es-ES/dexcom-g6-cgm-system" },
    ],
  },
  "Medtronic MiniMed 780G (sistema hibrido de asa cerrada)": {
    nombre: "Bomba de insulina Medtronic MiniMed 780G",
    queEs: "Bomba de insulina con sistema de 'asa cerrada hibrida': mide la glucosa con un sensor, calcula automaticamente cuanta insulina dar, y ajusta la dosis cada 5 minutos.",
    administracion: "La bomba se lleva adherida al cuerpo (cintura o bolsillo). Se cambia el set de infusion cada 3 dias y el reservorio cuando se vacia.",
    links: [
      { titulo: "Medtronic — MiniMed 780G", url: "https://www.medtronicdiabetes.com/products/minimed-780g-sistema-de-bomba-de-insulina" },
    ],
  },

  // ── ONCOLOGIA — Otros frecuentes ──────────────────────────────

  "Ipilimumab": {
    nombre: "Ipilimumab (Yervoy)",
    queEs: "Inmunoterapia que bloquea CTLA-4. Se combina con nivolumab en melanoma, rinon, y colorrectal MSI-H. Puede tener efectos secundarios inmunologicos importantes.",
    administracion: "Intravenoso, cada 3 semanas (generalmente 4 dosis).",
    links: [
      { titulo: "MedlinePlus — Ipilimumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a611023-es.html" },
    ],
  },
  "Dabrafenib": {
    nombre: "Dabrafenib (Tafinlar)",
    queEs: "Inhibidor de BRAF para tumores con mutacion BRAF V600 (melanoma, pulmon). Se combina con trametinib.",
    administracion: "Oral (capsulas), 2 veces por dia.",
    links: [
      { titulo: "MedlinePlus — Dabrafenib", url: "https://medlineplus.gov/spanish/druginfo/meds/a613027-es.html" },
    ],
  },
  "Trametinib": {
    nombre: "Trametinib (Mekinist)",
    queEs: "Inhibidor de MEK. Se combina con dabrafenib en tumores BRAF V600 mutados.",
    administracion: "Oral (comprimidos), 1 vez por dia en ayunas.",
    links: [
      { titulo: "MedlinePlus — Trametinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a614016-es.html" },
    ],
  },
  "Sotorasib": {
    nombre: "Sotorasib (Lumakras)",
    queEs: "Primer inhibidor de KRAS G12C aprobado. Para cancer de pulmon con mutacion KRAS G12C, despues de progresar a quimio/inmunoterapia.",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    links: [
      { titulo: "Cancer.org — Terapia dirigida pulmon", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-pulmon-no-microcito/tratamiento/terapia-dirigida.html" },
    ],
  },
  "Encorafenib": {
    nombre: "Encorafenib (Braftovi)",
    queEs: "Inhibidor de BRAF para colorrectal con mutacion BRAF V600E. Se combina con cetuximab en segunda linea.",
    administracion: "Oral (capsulas), 1 vez por dia.",
    links: [
      { titulo: "Cancer.org — BRAF colorrectal", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-colon-o-recto/tratamiento/terapia-dirigida.html" },
    ],
  },
};

// Helper: obtener explicacion de una droga
export function getExplicacion(nombre) {
  if (explicaciones[nombre]) return explicaciones[nombre];
  // Partial match
  const lower = nombre.toLowerCase();
  for (const [key, exp] of Object.entries(explicaciones)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower.split("(")[0].trim().toLowerCase())) {
      return exp;
    }
  }
  return null;
}
