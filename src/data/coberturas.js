// ── Obras sociales / prepagas del MVP ────────────────────────────

export const obrasSociales = [
  {
    id: "osde",
    nombre: "OSDE",
    tipo: "Prepaga",
    planes: [
      { id: "osde_210", nombre: "OSDE 210", detalle: "Plan basico." },
      { id: "osde_310", nombre: "OSDE 310", detalle: "Red de prestadores mas amplia." },
      { id: "osde_410", nombre: "OSDE 410", detalle: "Incluye centros de referencia (Fleming, CEMIC)." },
      { id: "osde_510", nombre: "OSDE 510", detalle: "Incluye Fleming, Fundaleu, Hospital Italiano." },
    ],
    coberturaOncologica:
      "100% cobertura de quimioterapia segun indicaciones ANMAT. Provision directa de citostaticos a traves de instituciones contratadas. La cobertura oncologica no varia entre planes — la diferencia esta en la red de prestadores y velocidad de autorizacion.",
    procesoAutorizacion: {
      canal: "App OSDE o portal web (Tramites > Autorizar una prestacion). Presentar al menos 72 horas antes del procedimiento.",
      tiempoTipico: "3-10 dias habiles segun tipo de prestacion.",
    },
    queNiegan: [
      "Drogas no aprobadas por ANMAT para la indicacion",
      "Usos off-label sin fundamentacion solida",
      "Inmunoterapia/dirigidas fuera de protocolo estricto",
    ],
    queAprueban: [
      "QT estandar segun indicaciones ANMAT",
      "Radioterapia",
      "Cirugia oncologica",
      "Trastuzumab/pertuzumab para HER2+",
    ],
    auditoria: {
      telefono: "0810-555-6733 / 11-4872-9000",
      email: null,
    },
    programaOncologico:
      "Formulario Oncologico dedicado (actualizado ene 2024). Acuerdos con Fleming, Fundaleu y hospitales de referencia.",
  },
  {
    id: "swiss",
    nombre: "Swiss Medical",
    tipo: "Prepaga",
    planes: [
      { id: "swiss_smg20", nombre: "SMG 20", detalle: "Plan basico. Red cerrada." },
      { id: "swiss_smg30", nombre: "SMG 30", detalle: "Red intermedia." },
      { id: "swiss_smg40", nombre: "SMG 40", detalle: "Red amplia." },
      { id: "swiss_smg50", nombre: "SMG 50+", detalle: "Red mas amplia." },
    ],
    coberturaOncologica:
      "Cobertura oncologica segun PMO en todos los planes. Sin copago para oncologia. Red cerrada: cobertura via prestadores designados.",
    procesoAutorizacion: {
      canal: "Mi Swiss Medical (web o app). Auditoria medica determina cobertura.",
      tiempoTipico: "3 dias habiles (documentacion completa). 15-30 dias si va a auditoria medica.",
    },
    queNiegan: ["Off-label / experimentales sin aprobacion ANMAT"],
    queAprueban: ["QT estandar", "Radioterapia", "Cirugia", "Dirigidas/inmuno aprobadas ANMAT"],
    auditoria: {
      telefono: "0810-444-7700",
      email: "autorizaciones.consultas@swissmedical.com.ar",
    },
    programaOncologico:
      "Sin programa oncologico dedicado. Cobertura por PMO + auditoria medica. Formulario: Ficha Registro Prescripcion Oncologica.",
  },
  {
    id: "ioma",
    nombre: "IOMA",
    tipo: "Obra Social Provincial (Buenos Aires)",
    planes: [],
    coberturaOncologica:
      "100% cobertura de medicacion oncologica — costo cero para el afiliado. Cubre QT, cirugia, internacion, radioterapia (convencional, 3D, IMRT, braquiterapia, estereotaxica). Drogas fuera del Plan MEPPES se gestionan por Departamento de Compras (proceso digitalizado).",
    procesoAutorizacion: {
      canal: "Online: el prestador solicita autorizacion a IOMA por sistema. Tambien via App IOMA Digital. Requiere: DNI, diagnostico histopatologico, estadificacion, ficha oncologica (peso, talla, superficie corporal, drogas, dosis, dias, interciclo, ciclos).",
      tiempoTipico: "Objetivo: 15 dias. Realidad: demoras frecuentes de semanas a 3+ meses reportadas.",
    },
    queNiegan: [
      "Drogas off-label / experimentales",
      "Asciminib (LMC) — denegado reportado",
      "Venetoclax (LMA) — denegado reportado",
      "Drogas fuera del MEPPES (demora por proceso de compra separado)",
    ],
    queAprueban: [
      "Medicacion dentro del protocolo oncologico IOMA",
      "Radioterapia (todas las modalidades)",
      "Cirugia oncologica",
    ],
    auditoria: {
      telefono: "0810-999-4662 / WhatsApp: +54 911 5050 4662",
      email: "dayfma.ioma@gmail.com",
    },
    programaOncologico:
      "Programa Enfermedad Oncologica (dedicado) + Programa Cuidarte (cuidados paliativos domiciliarios — unico a nivel nacional). Contacto Cuidarte: cuidarte@ioma.gba.gob.ar",
    alertas: [
      "Demoras cronicas en entrega de medicacion oncologica reportadas (semanas a 3+ meses)",
      "Pedir medicacion con 30-40 dias de anticipacion",
    ],
  },
  {
    id: "osecac",
    nombre: "OSECAC",
    tipo: "Obra Social (Empleados de Comercio)",
    planes: [],
    coberturaOncologica:
      "100% cobertura de medicacion oncologica e internacion por PMO.",
    procesoAutorizacion: {
      canal: "App OSECAC (gestiones digitales) o presencial en Centros de Atencion/Gestion.",
      tiempoTipico: null,
    },
    queNiegan: [],
    queAprueban: ["QT estandar", "Radioterapia", "Cirugia"],
    auditoria: {
      telefono: "0800-666-0400 (afiliados) / 0810-333-0004 (emergencias)",
      email: "denunciasdeinternacion@osecac.org.ar",
    },
    programaOncologico: null,
  },
  {
    id: "galeno",
    nombre: "Galeno",
    tipo: "Prepaga",
    planes: [
      { id: "galeno_azul", nombre: "Galeno Azul", detalle: "Plan basico." },
      { id: "galeno_plata", nombre: "Galeno Plata", detalle: "Red intermedia." },
      { id: "galeno_oro", nombre: "Galeno Oro", detalle: "Red amplia." },
    ],
    coberturaOncologica:
      "100% cobertura de drogas oncologicas. 40% medicamentos comunes, 70% cronicos, 100% oncologicos. Receta electronica obligatoria desde enero 2025.",
    procesoAutorizacion: {
      canal: "App Galeno (Tramites > Autorizaciones). Solicitud al inicio de tratamiento, reevaluacion cada 2-3 ciclos, y ante cambios de dosis/medicacion. Formulario oncologico/oncohematologico dedicado.",
      tiempoTipico: null,
    },
    queNiegan: [],
    queAprueban: ["QT estandar", "Radioterapia", "Cirugia"],
    auditoria: {
      telefono: "0810-999-7828 (lun-vie 8-20h). Oro: 4321-4115 / Plata: 4321-4215 / Azul: 5382-5010",
      email: null,
    },
    programaOncologico: null,
  },
  {
    id: "medife",
    nombre: "Medife",
    tipo: "Prepaga",
    planes: [],
    coberturaOncologica:
      "100% medicacion oncologica por PMO. Se reserva el derecho de autorizar medicacion Fase II / off-label, colocando responsabilidad exclusiva en el medico tratante. Requiere declaracion de conflicto de interes del medico.",
    procesoAutorizacion: {
      canal: "Portal Medife (Autorizaciones Online). Planilla Oncologicos dedicada. Documentacion incompleta causa demoras. Para 2+ presentaciones comerciales: detallar consumo diario, prescribir por denominacion comun internacional.",
      tiempoTipico: null,
    },
    queNiegan: ["Medicacion Fase II / off-label (evaluacion caso por caso)"],
    queAprueban: ["QT estandar", "Radioterapia", "Cirugia", "Dirigidas/inmuno aprobadas ANMAT"],
    auditoria: {
      telefono: "0800-999-9000 (24hs) / WhatsApp: +54 9 11 2242 0091 (8-22h)",
      email: null,
    },
    programaOncologico:
      "Sin programa dedicado. Notable: politica explicita de off-label y requisito de declaracion de conflicto de interes.",
  },
  {
    id: "omint",
    nombre: "OMINT",
    tipo: "Prepaga",
    planes: [],
    coberturaOncologica:
      "100% cobertura de medicacion especial incluyendo oncologica. Solo oncologos pueden prescribir. Acceso a consulta internacional sin cargo (sujeto a derivacion de Auditoria Medica).",
    procesoAutorizacion: {
      canal: "Gestiones online > Solicitudes > Autorizaciones. Dos tipos: Administrativa o Administrativa con Auditoria Medica. Prescripciones validas 60 dias.",
      tiempoTipico: null,
    },
    queNiegan: [],
    queAprueban: ["QT estandar", "Radioterapia", "Cirugia"],
    auditoria: {
      telefono: "0800-777-6246 (lun-vie 9-17h)",
      email: null,
    },
    programaOncologico:
      "Sin programa dedicado. Notable: acceso a consulta medica internacional y sistema de autorizacion de dos niveles.",
  },
  {
    id: "amobp",
    nombre: "AMOBP / Bancarios",
    tipo: "Obra Social (Bancarios)",
    planes: [
      { id: "amobp_s100", nombre: "S-100", detalle: "Cobertura maxima en medicamentos." },
      { id: "amobp_s200", nombre: "S-200", detalle: "Cobertura maxima en medicamentos." },
      { id: "amobp_s300", nombre: "S-300", detalle: "Cobertura maxima en medicamentos." },
    ],
    coberturaOncologica:
      "100% cobertura oncologica por PMO. 100% analgesia oncologica. Planes S-100, S-200, S-300 con cobertura maxima en medicamentos.",
    procesoAutorizacion: {
      canal: "Presencial en sucursales (revision administrativa unicamente, no realizan consultas medicas). Contactar por linea principal.",
      tiempoTipico: null,
    },
    queNiegan: [],
    queAprueban: ["QT estandar", "Radioterapia", "Cirugia"],
    auditoria: {
      telefono: "0800-555-6722 (opcion 4, GBA y provincias). AMEBPBA: 0810-222-6888",
      email: null,
    },
    programaOncologico: null,
  },
  {
    id: "dosep",
    nombre: "DOSEP",
    tipo: "Obra Social Provincial (San Luis)",
    planes: [],
    coberturaOncologica:
      "100% cobertura oncologica por PMO, sin coseguro. Derivaciones oncologicas deben ser presentadas por el Centro Oncologico Provincial con copia de biopsia. Usa auditoria externa.",
    procesoAutorizacion: {
      canal: "Presentar en hospitales publicos designados. Requiere: prescripcion con diagnostico + firmas medico/director, formulario de admision, resumen clinico, estudios, DNI, negativa ANSES, informe socioeconomico. Prescripciones validas 30 dias, renovacion cada 3 ciclos.",
      tiempoTipico: "Variable. Reportes de demoras sistematicas y denegaciones.",
    },
    queNiegan: [
      "Reportes de denegaciones sistematicas y demoras en entrega",
      "Auditoria externa rechaza por 'solicitud anticipada excesiva' (catch-22 reportado)",
    ],
    queAprueban: ["QT estandar cuando el proceso funciona"],
    auditoria: {
      telefono: "266-4452000 ext 4045",
      email: "auditoriamedicadosepvm@gmail.com",
    },
    programaOncologico:
      "Circuito provincial: Centro Oncologico Integral San Luis, Policlinico Juan D. Peron (Villa Mercedes), Hospital De Merlo. Banco provincial drogas oncologicas: bpdoncologicosanluis@gmail.com / 266-4452000 int 3466.",
    alertas: [
      "Reportes persistentes de no entrega de medicacion oncologica",
      "Infraestructura oncologica limitada en la provincia — derivaciones frecuentes a Buenos Aires o Mendoza",
    ],
  },
  {
    id: "hospital_publico",
    nombre: "Hospital Publico / Sin Cobertura",
    tipo: "Sistema publico",
    planes: [],
    coberturaOncologica:
      "Cobertura universal gratuita via Banco Nacional de Drogas Especiales (BNDE). Requiere cobertura publica exclusiva (sin OS/prepaga), tratamiento en hospital publico, residencia argentina, negativa ANSES trimestral.",
    procesoAutorizacion: {
      canal: "El medico tratante en hospital publico solicita al BNDE. Requiere: DNI, formulario de solicitud, receta electronica de especialista (validez 30 dias), anatomia patologica, estudios de estadificacion, resumen clinico, encuesta social (renovar cada 6 meses), negativa jurisdiccional.",
      tiempoTipico: "Variable. Historicamente 15-30 dias. Reportes de escasez y demoras en 2024-2025.",
    },
    queNiegan: ["Tratamientos de ultima generacion por falta de stock"],
    queAprueban: ["Quimioterapia estandar", "Radioterapia", "Cirugia"],
    auditoria: {
      telefono: null,
      email: "bndo@msal.gov.ar",
    },
    programaOncologico:
      "Direccion Nacional del Cancer (ex-INC, absorbido por Ministerio de Salud en marzo 2025). Coordina red publica oncologica. Instituto Roffo: (011) 5287-5200.",
    bancoDeDrogas:
      "BNDE — Av. 9 de Julio 1925, Piso 8, Ala Belgrano. Lun-Vie 9-13h. Medicamentos deben estar en el Listado Complementario (Res 3377/2022).",
    limitaciones:
      "Turnos con espera larga. INC reorganizado en 2025 (irregularidades detectadas: 400.000 unidades de morfina vencidas). Cambios de medicacion requieren negativa escrita de la jurisdiccion.",
    provincialBuenosAires: {
      telefono: "(221) 429-2700",
      direccion: "Av. 51 No. 1120, La Plata 1900",
      horario: "Lun-Vie 7-18h (info), 8-18h (ingreso)",
    },
  },
];

// ── PMO: lo que cubre la ley para todos ─────────────────────────
// Fuentes: Res 201/2002, Res 1991/2005, Res 3377/2022, Res 1926/2024,
// Ley 26.682, Ley 26.872, Listado IPC PBA oct 2024

export const pmo = {
  baseLegal:
    "PMO Art. 7.3: medicamentos oncologicos segun protocolos nacionales e internacionales aprobados por ANMAT, cobertura 100%. El PMO es un piso minimo, no un techo (jurisprudencia reiterada).",
  coseguros:
    "Desde Res 1926/2024 (junio 2024), los tratamientos oncologicos estan exentos de coseguros.",
  tratamientos: [
    {
      tipo: "Quimioterapia",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "35+ drogas cubiertas. Requiere protocolo medico con esquema detallado. Sin coseguro.",
    },
    {
      tipo: "Radioterapia",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Convencional, conformada 3D, IMRT. Protonterapia y radiocirugia estereotaxica: no incluidas en PMO.",
    },
    {
      tipo: "Cirugia oncologica",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluye internacion sin limite de tiempo y reconstruccion mamaria con protesis (Ley 26.872 obligatoria para hospitales, OS y prepagas).",
    },
    {
      tipo: "Terapias dirigidas",
      cobertura: "Variable",
      autorizacionPrevia: true,
      nota: "26 drogas en Res 3377/2022 (trastuzumab, pertuzumab, bevacizumab, palbociclib, ribociclib, abemaciclib, alectinib, entre otras). Osimertinib, T-DXd y sacituzumab no estan en el listado oficial.",
    },
    {
      tipo: "Inmunoterapia",
      cobertura: "Variable",
      autorizacionPrevia: true,
      nota: "Pembrolizumab y nivolumab en Res 3377/2022. Atezolizumab en listado IPC PBA pero no en listado nacional. Ipilimumab, durvalumab, dostarlimab: no en listado oficial. Nivolumab subcutaneo aprobado ANMAT 2026.",
    },
    {
      tipo: "Hormonoterapia",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "12 drogas en Res 3377/2022: tamoxifeno, anastrozol, letrozol, exemestano, fulvestrant, abiraterona, enzalutamida, goserelina, leuprolida, triptorelina, bicalutamida, flutamida. Apalutamida no en listado oficial.",
    },
    {
      tipo: "Soporte oncologico",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Filgrastim, eritropoyetina, ondansetron, dexametasona, corticoides, bifosfonatos, mesna, leucovorina, rasburicasa, alopurinol, deferasirox.",
    },
    {
      tipo: "Cuidados paliativos",
      cobertura: "100%",
      autorizacionPrevia: false,
      nota: "Morfina, metadona, tramadol, pregabalina — cubiertos al 100% por PMO.",
    },
  ],
  estudios: [
    { nombre: "Biopsia", cobertura: "100%", autorizacionPrevia: false },
    {
      nombre: "Anatomia patologica",
      cobertura: "100%",
      autorizacionPrevia: false,
    },
    {
      nombre: "Inmunohistoquimica (ER, PR, HER2, Ki67)",
      cobertura: "100%",
      autorizacionPrevia: false,
    },
    {
      nombre: "PET/CT",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Requiere justificacion medica y autorizacion previa.",
    },
    {
      nombre: "Test BRCA1/BRCA2 germinal",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para mama/ovario con criterio clinico",
    },
    {
      nombre: "MSI/MMR",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para colorrectal y otros tumores solidos",
    },
    {
      nombre: "EGFR (mutaciones)",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para adenocarcinoma de pulmon",
    },
    {
      nombre: "ALK (fusion/reordenamiento)",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para pulmon no microcito",
    },
    {
      nombre: "RAS extendido (KRAS/NRAS)",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para colorrectal",
    },
    {
      nombre: "BRAF V600E",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para colorrectal y melanoma",
    },
    {
      nombre: "PD-L1",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Incluido para pulmon y otros tumores al evaluar inmunoterapia",
    },
    {
      nombre: "HER2 por FISH",
      cobertura: "100%",
      autorizacionPrevia: true,
      nota: "Cuando IHQ es 2+ (resultado equivoco)",
    },
    {
      nombre: "Oncotype DX / MammaPrint",
      cobertura: "Discutida",
      autorizacionPrevia: true,
      nota: "Tests genomicos para mama en estadio temprano. No incluido formalmente en PMO. Se procesan en USA.",
    },
    {
      nombre: "Panel genomico amplio (NGS)",
      cobertura: "Parcial / Discutida",
      autorizacionPrevia: true,
      nota: "No incluido formalmente en PMO. Existen fallos judiciales ordenando cobertura con indicacion medica fundamentada.",
    },
    {
      nombre: "Biopsia liquida (ctDNA)",
      cobertura: "No incluida en PMO",
      autorizacionPrevia: true,
      nota: "No incluida en PMO. Precio aprox USD 1500-3000.",
    },
    {
      nombre: "PET PSMA (prostata)",
      cobertura: "Discutida",
      autorizacionPrevia: true,
      nota: "Cobertura no establecida formalmente. Disponibilidad variable por jurisdiccion.",
    },
  ],
};

// ── Nivel de cobertura por droga ─────────────────────────────────
// "nacional" = Res 3377/2022, exigible en todo el pais
// "pba"      = IPC PBA oct 2024, solo cobertura publica en Buenos Aires
// "gestion"  = no en ningun listado oficial, requiere reclamo/amparo

export const nivelCobertura = {
  // Res 3377/2022 — nacional
  "Trastuzumab": "nacional",
  "Pertuzumab": "nacional",
  "Bevacizumab": "nacional",
  "Cetuximab": "nacional",
  "Panitumumab": "nacional",
  "Rituximab": "nacional",
  "Erlotinib": "nacional",
  "Gefitinib": "nacional",
  "Afatinib": "nacional",
  "Alectinib": "nacional",
  "Imatinib": "nacional",
  "Nilotinib": "nacional",
  "Dasatinib": "nacional",
  "Ibrutinib": "nacional",
  "Sunitinib": "nacional",
  "Pazopanib": "nacional",
  "Axitinib": "nacional",
  "Bortezomib": "nacional",
  "Lenalidomida": "nacional",
  "Pomalidomida": "nacional",
  "Talidomida": "nacional",
  "Palbociclib": "nacional",
  "Ribociclib": "nacional",
  "Abemaciclib": "nacional",
  "Dabrafenib": "nacional",
  "Trametinib": "nacional",
  "Pembrolizumab": "nacional",
  "Nivolumab": "nacional",
  "Enzalutamida": "nacional",
  "Abiraterona": "nacional",
  "Tamoxifeno": "nacional",
  "Anastrozol": "nacional",
  "Letrozol": "nacional",
  "Exemestano": "nacional",
  "Fulvestrant": "nacional",
  "Goserelina": "nacional",
  "Leuprolida": "nacional",
  "Triptorelina": "nacional",
  "Bicalutamida": "nacional",
  "Flutamida": "nacional",
  // IPC PBA — provincial
  "Trastuzumab emtansina (T-DM1)": "pba",
  "T-DM1 (Ado-trastuzumab emtansina)": "pba",
  "Lapatinib": "pba",
  "Sorafenib": "pba",
  "Everolimus": "pba",
  "Vemurafenib": "pba",
  "Nimotuzumab": "pba",
  "Atezolizumab": "pba",
  // Requiere gestion / amparo
  "Trastuzumab deruxtecan": "gestion",
  "T-DXd (Trastuzumab deruxtecan)": "gestion",
  "Osimertinib": "gestion",
  "Lorlatinib": "gestion",
  "Sotorasib": "gestion",
  "Adagrasib": "gestion",
  "Tucatinib": "gestion",
  "Sacituzumab govitecan": "gestion",
  "Encorafenib": "gestion",
  "Alpelisib": "gestion",
  "Capivasertib": "gestion",
  "Olaparib": "gestion",
  "Rucaparib": "gestion",
  "Talazoparib": "gestion",
  "Ipilimumab": "gestion",
  "Durvalumab": "gestion",
  "Dostarlimab": "gestion",
  "Cemiplimab": "gestion",
  "Apalutamida": "gestion",
  "Amivantamab": "gestion",
  "Lazertinib": "gestion",
  "Tisotumab vedotin": "gestion",
  "Elacestrant": "gestion",
  "Datopotamab deruxtecan": "gestion",
  "Lutetio-177 PSMA": "gestion",
  "Cabazitaxel": "nacional",
  "Docetaxel": "nacional",
};

export function getNivelDroga(nombre) {
  // Exact match
  if (nivelCobertura[nombre]) return nivelCobertura[nombre];

  // For combinations (A + B, A/B), find the MOST RESTRICTIVE level
  // gestion > pba > nacional
  const prioridad = { gestion: 3, pba: 2, nacional: 1 };
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

  // Partial match — check if any key is contained in the name
  const lower = nombre.toLowerCase();
  for (const [key, nivel] of Object.entries(nivelCobertura)) {
    if (lower.includes(key.toLowerCase())) {
      return nivel;
    }
  }
  return null; // unknown
}

export const nivelesInfo = {
  nacional: {
    label: "Cubierto — Res. 3377/2022",
    descripcion: "Listado oficial de medicamentos (Res. 3377/2022). Exigible en cualquier obra social o prepaga del pais.",
    color: "verde",
  },
  pba: {
    label: "Cubierto en PBA — IPC",
    descripcion: "Incluido en el listado del Instituto Provincial del Cancer de Buenos Aires. Si estas en otra provincia, el acceso depende del listado provincial vigente.",
    color: "naranja",
  },
  gestion: {
    label: "Requiere gestion",
    descripcion: "No esta en ningun listado oficial. Necesita autorizacion previa, carta documento, reclamo ante la SSS, o amparo judicial.",
    color: "rojo",
  },
};

// ── Tipos de cancer del MVP ─────────────────────────────────────

export const tiposCancer = [
  {
    id: "mama",
    nombre: "Cancer de mama",
    icono: "ribbon",
    subtipos: [
      {
        id: "mama_her2",
        nombre: "HER2+",
        biomarcadores: ["HER2 amplificado/sobreexpresado"],
        primeraLinea: ["Trastuzumab + Pertuzumab + Taxano (THP)"],
        terapiasDirigidas: [
          "Trastuzumab",
          "Pertuzumab",
          "T-DM1 (Ado-trastuzumab emtansina)",
          "T-DXd (Trastuzumab deruxtecan)",
        ],
        estudios: [
          "IHQ (HER2, ER, PR, Ki67)",
          "FISH si IHQ 2+",
          "Panel genomico si metastasico",
        ],
        opcionesNuevas: [
          "Tucatinib + Trastuzumab + Capecitabina (metastasis cerebral)",
          "T-DXd (algunas indicaciones)",
        ],
      },
      {
        id: "mama_er",
        nombre: "ER+ (Luminal)",
        biomarcadores: ["RE+", "RP+", "HER2-"],
        primeraLinea: [
          "Hormonoterapia (Tamoxifeno o Inhibidor de aromatasa)",
          "CDK4/6 inhibidor si metastasico",
        ],
        terapiasDirigidas: [
          "Palbociclib",
          "Ribociclib",
          "Abemaciclib",
          "Alpelisib (si PIK3CA mutado)",
        ],
        estudios: [
          "Oncotype DX o MammaPrint (estadio temprano)",
          "PIK3CA si metastasico",
        ],
        opcionesNuevas: ["Elacestrant", "Capivasertib"],
      },
      {
        id: "mama_tnbc",
        nombre: "Triple Negativo (TNBC)",
        biomarcadores: ["RE-", "RP-", "HER2-"],
        primeraLinea: [
          "Quimioterapia (AC-T, Carboplatino-Paclitaxel)",
          "Pembrolizumab + QT si PD-L1+ (CPS >= 10)",
        ],
        terapiasDirigidas: [
          "Pembrolizumab (si PD-L1+)",
          "Olaparib/Talazoparib (si BRCA mutado)",
          "Sacituzumab govitecan",
        ],
        estudios: [
          "PD-L1 (CPS)",
          "BRCA1/2 germinal",
          "Panel genomico si metastasico",
        ],
        opcionesNuevas: [
          "Sacituzumab govitecan (disponibilidad variable en ARG)",
          "Datopotamab deruxtecan",
        ],
      },
    ],
  },
  {
    id: "pulmon",
    nombre: "Cancer de pulmon",
    icono: "wind",
    subtipos: [
      {
        id: "pulmon_egfr",
        nombre: "EGFR mutado",
        biomarcadores: ["EGFR mutacion (del19, L858R, T790M, exon20ins)"],
        primeraLinea: ["Osimertinib"],
        terapiasDirigidas: ["Osimertinib", "Erlotinib", "Gefitinib", "Afatinib"],
        estudios: [
          "EGFR por PCR o NGS",
          "T790M si progresion a TKI de 1ra/2da gen",
        ],
        opcionesNuevas: ["Amivantamab (exon20ins)", "Lazertinib"],
      },
      {
        id: "pulmon_alk",
        nombre: "ALK reordenado",
        biomarcadores: ["ALK fusion/reordenamiento"],
        primeraLinea: ["Alectinib"],
        terapiasDirigidas: [
          "Alectinib",
          "Crizotinib",
          "Ceritinib",
          "Brigatinib",
          "Lorlatinib",
        ],
        estudios: ["ALK por FISH o IHQ o NGS"],
        opcionesNuevas: ["Lorlatinib (disponibilidad en ARG variable)"],
      },
      {
        id: "pulmon_kras",
        nombre: "KRAS G12C",
        biomarcadores: ["KRAS G12C mutacion"],
        primeraLinea: [
          "Quimioterapia + Pembrolizumab (si PD-L1+)",
          "Sotorasib (segunda linea)",
        ],
        terapiasDirigidas: ["Sotorasib", "Adagrasib"],
        estudios: ["KRAS por NGS", "PD-L1"],
        opcionesNuevas: ["Adagrasib (no disponible en ARG aun)"],
      },
      {
        id: "pulmon_pdl1",
        nombre: "Sin driver / PD-L1 alto",
        biomarcadores: ["PD-L1 >= 50%", "Sin mutacion driver"],
        primeraLinea: ["Pembrolizumab monoterapia", "Pembrolizumab + QT"],
        terapiasDirigidas: ["Pembrolizumab", "Nivolumab + Ipilimumab"],
        estudios: [
          "PD-L1",
          "TMB (opcional)",
          "Panel NGS completo para descartar drivers",
        ],
        opcionesNuevas: [],
      },
    ],
  },
  {
    id: "colorrectal",
    nombre: "Cancer colorrectal",
    icono: "activity",
    subtipos: [
      {
        id: "colorrectal_msi",
        nombre: "MSI-H / dMMR",
        biomarcadores: [
          "MSI-H",
          "dMMR (perdida MLH1, MSH2, MSH6, PMS2)",
        ],
        primeraLinea: [
          "Pembrolizumab (primera linea en metastasico MSI-H)",
          "FOLFOX/FOLFIRI + Bevacizumab",
        ],
        terapiasDirigidas: ["Pembrolizumab", "Nivolumab + Ipilimumab"],
        estudios: [
          "MSI por PCR o IHQ de MMR",
          "Si MSI-H: considerar Lynch (germinal)",
        ],
        opcionesNuevas: ["Dostarlimab"],
      },
      {
        id: "colorrectal_ras_wt",
        nombre: "RAS wild-type",
        biomarcadores: ["KRAS/NRAS wild-type"],
        primeraLinea: [
          "FOLFOX o FOLFIRI + Cetuximab o Panitumumab (si lado izquierdo)",
        ],
        terapiasDirigidas: ["Cetuximab", "Panitumumab"],
        estudios: [
          "RAS extendido (KRAS exon 2,3,4 + NRAS)",
          "BRAF V600E",
          "MSI",
        ],
        opcionesNuevas: [],
      },
      {
        id: "colorrectal_braf",
        nombre: "BRAF V600E",
        biomarcadores: ["BRAF V600E mutacion"],
        primeraLinea: ["FOLFOXIRI + Bevacizumab"],
        terapiasDirigidas: ["Encorafenib + Cetuximab (segunda linea)"],
        estudios: ["BRAF V600E", "MSI (frecuente co-ocurrencia)"],
        opcionesNuevas: [],
      },
    ],
  },
  {
    id: "prostata",
    nombre: "Cancer de prostata",
    icono: "user",
    subtipos: [
      {
        id: "prostata_hspc",
        nombre: "Hormono-sensible (mHSPC)",
        biomarcadores: [],
        primeraLinea: [
          "ADT + Abiraterona o Enzalutamida o Apalutamida",
          "ADT + Docetaxel",
        ],
        terapiasDirigidas: ["Abiraterona", "Enzalutamida", "Apalutamida"],
        estudios: [
          "PSA",
          "Centellograma oseo",
          "PET PSMA (si disponible)",
        ],
        opcionesNuevas: ["PET PSMA (cobertura variable)"],
      },
      {
        id: "prostata_crpc",
        nombre: "Resistente a castracion (mCRPC)",
        biomarcadores: [
          "Progresion bajo ADT con testosterona de castracion",
        ],
        primeraLinea: [
          "Abiraterona o Enzalutamida (si no usados antes)",
          "Docetaxel",
          "Cabazitaxel",
        ],
        terapiasDirigidas: [
          "Olaparib (si BRCA/HRD mutado)",
          "Rucaparib",
          "Lutetio-177 PSMA (si PSMA+)",
        ],
        estudios: ["BRCA1/2 y genes HRD", "PET PSMA para Lu-177"],
        opcionesNuevas: [
          "Lutetio-177 PSMA (disponibilidad muy limitada en ARG)",
          "Talazoparib + Enzalutamida",
        ],
      },
    ],
  },
  {
    id: "cuello_utero",
    nombre: "Cancer de cuello de utero",
    icono: "heart",
    subtipos: [
      {
        id: "cuello_local",
        nombre: "Localmente avanzado",
        biomarcadores: [],
        primeraLinea: [
          "Cisplatino concomitante + Radioterapia",
          "Pembrolizumab + QT-RT (KEYNOTE-A18)",
        ],
        terapiasDirigidas: ["Pembrolizumab (en combinacion)"],
        estudios: [
          "HPV tipificacion",
          "PD-L1",
          "Estadificacion completa (RMN pelvis, PET/CT)",
        ],
        opcionesNuevas: [
          "Pembrolizumab + QT-RT (aprobacion reciente, cobertura incierta en ARG)",
        ],
      },
      {
        id: "cuello_meta",
        nombre: "Metastasico / Recurrente",
        biomarcadores: [],
        primeraLinea: [
          "Cisplatino/Carboplatino + Paclitaxel + Bevacizumab + Pembrolizumab",
        ],
        terapiasDirigidas: [
          "Bevacizumab",
          "Pembrolizumab (si PD-L1+ CPS >= 1)",
          "Tisotumab vedotin (segunda linea)",
        ],
        estudios: [
          "PD-L1 (CPS)",
          "MSI",
          "Panel genomico si disponible",
        ],
        opcionesNuevas: ["Tisotumab vedotin (no disponible en ARG aun)"],
      },
    ],
  },
];
