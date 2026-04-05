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
    precio: { rango: "$3.717.522 — $9.924.749", nota: "Biosimilares desde $3.7M (47-63% ahorro vs Herceptin original)", fecha: "abril 2026" },
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
    precio: { rango: "$20.735.442 — $21.262.599", nota: "Pembrox (biosimilar Elea, 2025) vs Keytruda original", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Pembrolizumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a614048-es.html" },
      { titulo: "Cancer.org — Inmunoterapia", url: "https://www.cancer.org/es/cancer/como-sobrellevar-el-cancer/tipos-de-tratamiento/inmunoterapia.html" },
    ],
  },
  "Nivolumab": {
    nombre: "Nivolumab (Opdivo)",
    queEs: "Inmunoterapia similar a pembrolizumab. Bloquea PD-1 para que el sistema inmune reconozca y ataque al tumor. Se usa en pulmon, rinon, melanoma, colorrectal MSI-H, y otros.",
    administracion: "Intravenoso, cada 2 o 4 semanas. Desde 2026, disponible en version subcutanea (inyeccion).",
    precio: { rango: "$7.173.483 (100mg)", nota: "Tambien disponible en 40mg ($2.869.307) y 240mg ($17.216.359)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Nivolumab", url: "https://medlineplus.gov/spanish/druginfo/meds/a614056-es.html" },
    ],
  },
  "Bevacizumab": {
    nombre: "Bevacizumab (Avastin y biosimilares)",
    queEs: "Anticuerpo que bloquea la formacion de nuevos vasos sanguineos que alimentan al tumor (antiangiogenico). Se usa en colorrectal, pulmon, rinon, cuello de utero, y otros.",
    administracion: "Intravenoso, cada 2 o 3 semanas.",
    precio: { rango: "$5.517.236 — $11.923.485", nota: "Biosimilares desde $5.5M (~52% ahorro vs Avastin)", fecha: "abril 2026" },
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
    precio: { rango: "$6.119.120 — $11.984.066", nota: "12+ marcas disponibles", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Palbociclib", url: "https://medlineplus.gov/spanish/druginfo/meds/a615012-es.html" },
    ],
  },
  "Ribociclib": {
    nombre: "Ribociclib (Kisqali)",
    queEs: "Inhibidor de CDK4/6 similar a palbociclib. Se usa en cancer de mama RE+/HER2- avanzado.",
    administracion: "Oral (comprimidos), 21 dias tomando + 7 dias de descanso.",
    precio: { rango: "$10.860.668", nota: "Caja x63 comprimidos (ciclo completo)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Ribociclib", url: "https://medlineplus.gov/spanish/druginfo/meds/a617046-es.html" },
    ],
  },
  "Abemaciclib": {
    nombre: "Abemaciclib (Verzenio)",
    queEs: "Inhibidor de CDK4/6. A diferencia de palbociclib y ribociclib, se toma de forma continua (sin semana de descanso).",
    administracion: "Oral (comprimidos), 2 veces por dia, todos los dias.",
    precio: { rango: "$2.583.122", nota: "Caja x14. Tratamiento continuo, 2 cajas/mes.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Abemaciclib", url: "https://medlineplus.gov/spanish/druginfo/meds/a618010-es.html" },
    ],
  },
  "Osimertinib": {
    nombre: "Osimertinib (Tagrisso)",
    queEs: "Inhibidor de EGFR de tercera generacion para cancer de pulmon con mutacion EGFR. Cruza la barrera hematoencefalica (util en metastasis cerebrales).",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    precio: { rango: "$21.416.937/mes", nota: "Sin biosimilar. El oral mas caro del listado.", fecha: "abril 2026" },
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
    precio: { rango: "$5.979.528 — $6.906.851", nota: "Lynparza (AstraZeneca) y Olapater (Tuteur)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Olaparib", url: "https://medlineplus.gov/spanish/druginfo/meds/a615022-es.html" },
    ],
  },

  // ── ONCOLOGIA — Quimioterapia ─────────────────────────────────

  "Paclitaxel": {
    nombre: "Paclitaxel (Taxol)",
    queEs: "Quimioterapia clasica que interfiere con la division celular. Se usa en mama, pulmon, ovario, y otros.",
    administracion: "Intravenoso, semanal o cada 3 semanas.",
    precio: { rango: "$1.081.690 — $2.943.136", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Paclitaxel", url: "https://medlineplus.gov/spanish/druginfo/meds/a607070-es.html" },
    ],
  },
  "Carboplatino": {
    nombre: "Carboplatino",
    queEs: "Quimioterapia basada en platino. Dana el ADN de las celulas tumorales. Se usa en pulmon, ovario, y otros.",
    administracion: "Intravenoso, generalmente cada 3 semanas.",
    precio: { rango: "$303.493 — $1.113.533", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Carboplatino", url: "https://medlineplus.gov/spanish/druginfo/meds/a695017-es.html" },
    ],
  },
  "Cisplatino": {
    nombre: "Cisplatino",
    queEs: "Quimioterapia basada en platino, mas potente que carboplatino pero con mas efectos secundarios. Se usa en pulmon, cuello de utero, cabeza/cuello, y otros.",
    administracion: "Intravenoso. Requiere hidratacion intensa para proteger los rinones.",
    precio: { rango: "$63.466 — $226.478", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Cisplatino", url: "https://medlineplus.gov/spanish/druginfo/meds/a684036-es.html" },
    ],
  },
  "Docetaxel": {
    nombre: "Docetaxel (Taxotere)",
    queEs: "Quimioterapia similar a paclitaxel. Se usa en mama, pulmon, prostata, y otros.",
    administracion: "Intravenoso, cada 3 semanas.",
    precio: { rango: "$1.493.826 — $2.189.504", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Docetaxel", url: "https://medlineplus.gov/spanish/druginfo/meds/a696031-es.html" },
    ],
  },

  // ── ONCOLOGIA — Hormonoterapia ────────────────────────────────

  "Tamoxifeno": {
    nombre: "Tamoxifeno (Nolvadex)",
    queEs: "Bloquea los receptores de estrogeno en el tumor. Es el tratamiento hormonal mas usado en cancer de mama RE+, especialmente en premenopausicas.",
    administracion: "Oral (comprimidos), 1 vez por dia, durante 5 a 10 anios.",
    precio: { rango: "$29.800 — $37.300", nota: "Varifarma (mas barato) a Gador", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Tamoxifeno", url: "https://medlineplus.gov/spanish/druginfo/meds/a682414-es.html" },
    ],
  },
  "Anastrozol": {
    nombre: "Anastrozol (Arimidex)",
    queEs: "Inhibidor de aromatasa. Reduce la produccion de estrogeno en mujeres postmenopausicas con cancer de mama RE+.",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    precio: { rango: "$189.648 — $418.556", nota: "Raffo a Arimidex (AstraZeneca)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Anastrozol", url: "https://medlineplus.gov/spanish/druginfo/meds/a696018-es.html" },
    ],
  },
  "Letrozol": {
    nombre: "Letrozol (Femara)",
    queEs: "Inhibidor de aromatasa similar a anastrozol. Para cancer de mama RE+ en postmenopausicas.",
    administracion: "Oral, 1 vez por dia.",
    precio: { rango: "$162.740 — $235.008", nota: "Eurofarma a Femara (Novartis)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Letrozol", url: "https://medlineplus.gov/spanish/druginfo/meds/a698004-es.html" },
    ],
  },
  "Abiraterona": {
    nombre: "Abiraterona (Zytiga)",
    queEs: "Bloquea la produccion de androgenos (hormonas masculinas) que alimentan al cancer de prostata. Se usa junto con prednisona.",
    administracion: "Oral (comprimidos), 1 vez por dia en ayunas.",
    precio: { rango: "$5.969.758 — $12.400.000", nota: "Varifarma a Zytiga (Janssen)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Abiraterona", url: "https://medlineplus.gov/spanish/druginfo/meds/a611046-es.html" },
    ],
  },
  "Enzalutamida": {
    nombre: "Enzalutamida (Xtandi)",
    queEs: "Bloquea el receptor de androgenos en las celulas tumorales de prostata. Se usa en cancer de prostata avanzado.",
    administracion: "Oral (capsulas o comprimidos), 1 vez por dia.",
    precio: { rango: "$10.860.580 — $14.745.736", nota: "Baliarda a Xtandi (Raffo)", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Enzalutamida", url: "https://medlineplus.gov/spanish/druginfo/meds/a612027-es.html" },
    ],
  },

  // ── DIABETES — Insulinas ──────────────────────────────────────

  "Insulina Glargina (Lantus, Basaglar, Toujeo)": {
    nombre: "Insulina Glargina (Lantus, Basaglar, Toujeo)",
    queEs: "Insulina de accion prolongada (basal). Mantiene un nivel estable de insulina durante 24 horas. Es la base del tratamiento de diabetes tipo 1.",
    administracion: "Subcutanea (inyeccion bajo la piel), 1 vez por dia, siempre a la misma hora.",
    precio: { rango: "$524.963", nota: "Lantus Solostar x5 lapiceras x3ml. PAMI: $0 con empadronamiento.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Glargina", url: "https://medlineplus.gov/spanish/druginfo/meds/a600027-es.html" },
    ],
  },
  "Insulina Detemir (Levemir)": {
    nombre: "Insulina Detemir (Levemir)",
    queEs: "Insulina de accion prolongada. Similar a glargina pero puede requerir 2 inyecciones diarias.",
    administracion: "Subcutanea, 1 o 2 veces por dia.",
    precio: { rango: "$398.317", nota: "Levemir FlexPen x5 lapiceras x3ml. PAMI: $0 con empadronamiento.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Detemir", url: "https://medlineplus.gov/spanish/druginfo/meds/a606012-es.html" },
    ],
  },
  "Insulina Degludec (Tresiba)": {
    nombre: "Insulina Degludec (Tresiba)",
    queEs: "Insulina ultralenta de ultima generacion. Dura mas de 42 horas, lo que permite mayor flexibilidad en el horario de inyeccion.",
    administracion: "Subcutanea, 1 vez por dia (horario flexible).",
    precio: { rango: "$544.250", nota: "Tresiba FlexTouch 200U/ml x3 lapiceras x3ml. PAMI: $0 con empadronamiento.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Degludec", url: "https://medlineplus.gov/spanish/druginfo/meds/a614042-es.html" },
    ],
  },
  "Insulina Lispro (Humalog)": {
    nombre: "Insulina Lispro (Humalog)",
    queEs: "Insulina de accion rapida. Se inyecta antes de comer para cubrir el azucar de la comida (bolo prandial).",
    administracion: "Subcutanea, justo antes de cada comida (0-15 minutos).",
    precio: { rango: "$347.799", nota: "Humalog KwikPen x5 lapiceras x3ml.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Lispro", url: "https://medlineplus.gov/spanish/druginfo/meds/a697021-es.html" },
    ],
  },
  "Insulina Aspart (NovoRapid)": {
    nombre: "Insulina Aspart (NovoRapid)",
    queEs: "Insulina de accion rapida similar a lispro. Para cubrir las comidas.",
    administracion: "Subcutanea, justo antes de comer.",
    precio: { rango: "$297.303 — $375.773", nota: "Penfill $297K, FlexTouch $326K, FlexPen $376K. PAMI: $0.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Aspart", url: "https://medlineplus.gov/spanish/druginfo/meds/a605013-es.html" },
    ],
  },
  "Insulina Glulisina (Apidra)": {
    nombre: "Insulina Glulisina (Apidra SoloStar)",
    queEs: "Insulina de accion rapida. Similar a lispro y aspart. Producida por Sanofi.",
    administracion: "Subcutanea, justo antes de comer.",
    precio: { rango: "$510.168", nota: "Apidra SoloStar x5 lapiceras x3ml. PAMI: $0.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Glulisina", url: "https://medlineplus.gov/spanish/druginfo/meds/a606014-es.html" },
    ],
  },
  "Insulina Aspart ultrarapida (Fiasp)": {
    nombre: "Insulina Aspart ultrarapida (Fiasp)",
    queEs: "Version ultrarapida de insulina aspart. Actua mas rapido que NovoRapid, util para corregir picos de glucosa postprandial.",
    administracion: "Subcutanea, al inicio de la comida o hasta 20 minutos despues.",
    precio: { rango: "$263.815", nota: "Fiasp Penfill x5 cartuchos x3ml.", fecha: "abril 2026" },
    links: [
      { titulo: "MedlinePlus — Insulina Aspart", url: "https://medlineplus.gov/spanish/druginfo/meds/a605013-es.html" },
    ],
  },

  // ── DIABETES — Tecnologia ─────────────────────────────────────

  "FreeStyle Libre 2 (Abbott) — sensor flash, 14 dias": {
    nombre: "Sensor FreeStyle Libre 2 Plus (Abbott)",
    queEs: "Sensor de glucosa que se adhiere al brazo y mide la glucosa en el liquido intersticial cada minuto. Para ver el valor, se acerca el celular o lector al sensor ('escaneo'). Dura 14 dias.",
    administracion: "Se coloca en la parte posterior del brazo con un aplicador. Indoloro. Se reemplaza cada 14 dias.",
    precio: { rango: "$117.936/sensor", nota: "Precio por unidad en farmacias. Algunas ofrecen promo 3x2 (~$78.624/sensor).", fecha: "abril 2026" },
    links: [
      { titulo: "Abbott — FreeStyle Libre", url: "https://www.freestyle.abbott/ar-es/home.html" },
      { titulo: "CUI.D.AR — Sensores de glucosa", url: "https://cuidar.org" },
    ],
  },
  "FreeStyle Libre 3 (Abbott) — sensor flash, 14 dias": {
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
      { titulo: "Dexcom — G6 (sitio oficial)", url: "https://www.dexcom.com" },
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
      { titulo: "MedlinePlus — Sotorasib", url: "https://medlineplus.gov/spanish/druginfo/meds/a621024-es.html" },
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

  // ── Pulmon — ALK ────────────────────────────────────────────────

  "Crizotinib": {
    nombre: "Crizotinib (Xalkori)",
    queEs: "Primer inhibidor de ALK aprobado. Hoy se usa menos en primera linea (reemplazado por alectinib) pero sigue siendo una opcion valida.",
    administracion: "Oral (capsulas), 2 veces por dia.",
    links: [
      { titulo: "MedlinePlus — Crizotinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a612018-es.html" },
    ],
  },
  "Ceritinib": {
    nombre: "Ceritinib (Zykadia)",
    queEs: "Inhibidor de ALK de segunda generacion. Se usa cuando hay progresion a crizotinib o como opcion alternativa.",
    administracion: "Oral (capsulas), 1 vez por dia con comida (reduce efectos gastrointestinales).",
    links: [
      { titulo: "MedlinePlus — Ceritinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a614055-es.html" },
    ],
  },
  "Lorlatinib": {
    nombre: "Lorlatinib (Lorbrena)",
    queEs: "Inhibidor de ALK de tercera generacion. Tiene la mejor penetracion cerebral de los ALK-i. Se usa cuando hay progresion a otros inhibidores o metastasis cerebrales.",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    links: [
      { titulo: "Cancer.org — Terapia dirigida pulmon", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-pulmon/tratamiento/terapia-dirigida.html" },
    ],
  },

  // ── Pulmon — EGFR ───────────────────────────────────────────────

  "Erlotinib": {
    nombre: "Erlotinib (Tarceva)",
    queEs: "Inhibidor de EGFR de primera generacion. Se usa en cancer de pulmon con mutacion EGFR (del19 o L858R).",
    administracion: "Oral (comprimidos), 1 vez por dia en ayunas.",
    links: [
      { titulo: "MedlinePlus — Erlotinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a605008-es.html" },
    ],
  },
  "Gefitinib": {
    nombre: "Gefitinib (Iressa)",
    queEs: "Inhibidor de EGFR de primera generacion. Similar a erlotinib. Se usa en cancer de pulmon EGFR mutado.",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    links: [
      { titulo: "MedlinePlus — Gefitinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a607002-es.html" },
    ],
  },
  "Afatinib": {
    nombre: "Afatinib (Gilotrif)",
    queEs: "Inhibidor de EGFR de segunda generacion (irreversible). Se usa en cancer de pulmon EGFR mutado, especialmente mutaciones poco comunes.",
    administracion: "Oral (comprimidos), 1 vez por dia en ayunas.",
    links: [
      { titulo: "MedlinePlus — Afatinib", url: "https://medlineplus.gov/spanish/druginfo/meds/a613054-es.html" },
    ],
  },
  "Amivantamab": {
    nombre: "Amivantamab (Rybrevant)",
    queEs: "Anticuerpo biespecifico anti-EGFR/MET. Se usa en cancer de pulmon con mutacion EGFR exon 20 insercion, donde los inhibidores clasicos no funcionan bien.",
    administracion: "Infusion intravenosa, cada 2 semanas.",
    links: [
      { titulo: "Cancer.org — Terapia dirigida pulmon", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-pulmon/tratamiento/terapia-dirigida.html" },
    ],
  },

  // ── Colorrectal — adicionales ────────────────────────────────────

  "Dostarlimab": {
    nombre: "Dostarlimab (Jemperli)",
    queEs: "Inmunoterapia anti-PD-1. Se usa en colorrectal MSI-H/dMMR. Estudios recientes mostraron remision completa en pacientes con cancer rectal dMMR.",
    administracion: "Infusion intravenosa cada 3 semanas (6 ciclos), luego cada 6 semanas.",
    links: [
      { titulo: "Cancer.org — Inmunoterapia colorrectal", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-colon-o-recto/tratamiento/inmunoterapia.html" },
    ],
  },

  // ── Mama — adicionales ──────────────────────────────────────────

  "Alpelisib": {
    nombre: "Alpelisib (Piqray)",
    queEs: "Inhibidor de PI3K alfa. Se usa en cancer de mama ER+/HER2- con mutacion PIK3CA, en combinacion con fulvestrant.",
    administracion: "Oral (comprimidos), 1 vez por dia con comida.",
    links: [
      { titulo: "Cancer.org — Terapia dirigida mama", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-seno/tratamiento/terapia-dirigida-para-el-cancer-de-seno.html" },
    ],
  },
  "Tucatinib": {
    nombre: "Tucatinib (Tukysa)",
    queEs: "Inhibidor de HER2 de molecula pequena. Especialmente util en metastasis cerebrales por cancer de mama HER2+. Se combina con trastuzumab y capecitabina.",
    administracion: "Oral (comprimidos), 2 veces por dia.",
    links: [
      { titulo: "Cancer.org — Terapia dirigida mama", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-seno/tratamiento/terapia-dirigida-para-el-cancer-de-seno.html" },
    ],
  },
  "Sacituzumab govitecan": {
    nombre: "Sacituzumab govitecan (Trodelvy)",
    queEs: "Anticuerpo conjugado anti-Trop-2. Se usa en cancer de mama triple negativo metastasico despues de 2+ lineas previas. Tambien aprobado para mama ER+/HER2-.",
    administracion: "Infusion intravenosa, dias 1 y 8 de cada ciclo de 21 dias.",
    links: [
      { titulo: "Cancer.org — Anticuerpos conjugados", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-seno/tratamiento/terapia-dirigida-para-el-cancer-de-seno.html" },
    ],
  },
  "Talazoparib": {
    nombre: "Talazoparib (Talzenna)",
    queEs: "Inhibidor de PARP. Se usa en cancer de mama HER2- con mutacion BRCA germinal. Similar a olaparib pero con distinto perfil de efectos secundarios.",
    administracion: "Oral (capsulas), 1 vez por dia.",
    links: [
      { titulo: "Cancer.org — Inhibidores PARP", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-seno/tratamiento/terapia-dirigida-para-el-cancer-de-seno.html" },
    ],
  },

  // ── Prostata — adicionales ──────────────────────────────────────

  "Apalutamida": {
    nombre: "Apalutamida (Erleada)",
    queEs: "Antiandrógeno de nueva generacion. Se usa en cancer de prostata hormono-sensible metastasico (mHSPC) junto con ADT. Mejora supervivencia vs ADT sola.",
    administracion: "Oral (comprimidos), 1 vez por dia.",
    links: [
      { titulo: "MedlinePlus — Apalutamida", url: "https://medlineplus.gov/spanish/druginfo/meds/a618024-es.html" },
    ],
  },
  "Cabazitaxel": {
    nombre: "Cabazitaxel (Jevtana)",
    queEs: "Quimioterapia taxano de segunda linea para cancer de prostata resistente a castracion, despues de progresion a docetaxel.",
    administracion: "Infusion intravenosa cada 3 semanas.",
    links: [
      { titulo: "MedlinePlus — Cabazitaxel", url: "https://medlineplus.gov/spanish/druginfo/meds/a611006-es.html" },
    ],
  },
  "Rucaparib": {
    nombre: "Rucaparib (Rubraca)",
    queEs: "Inhibidor de PARP. Se usa en cancer de prostata mCRPC con mutacion BRCA, despues de progresion a tratamiento hormonal y quimioterapia.",
    administracion: "Oral (comprimidos), 2 veces por dia.",
    links: [
      { titulo: "Cancer.org — PARP prostata", url: "https://www.cancer.org/es/cancer/tipos/cancer-de-prostata/tratamiento/terapia-dirigida.html" },
    ],
  },

  // ── Diabetes — adicionales ──────────────────────────────────────

  "Dexcom G7 — sensor continuo, mas pequeno": {
    nombre: "Sensor Dexcom G7",
    queEs: "Sensor de monitoreo continuo de glucosa (CGM real-time). Mas pequeno y rapido de colocar que el G6. Mide glucosa cada 5 minutos con alertas de hipo/hiperglucemia. Requiere prescripcion medica.",
    administracion: "Sensor adhesivo en el brazo o abdomen. Se cambia cada 10 dias. Se conecta al celular por Bluetooth.",
    links: [
      { titulo: "Dexcom — G7", url: "https://www.dexcom.com/es-es/dexcom-g7" },
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
