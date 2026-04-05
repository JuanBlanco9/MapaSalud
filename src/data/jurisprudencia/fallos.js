// ── Jurisprudencia verificada — fallos con caratula, tribunal, fecha ──
// Cada fallo tiene fuente verificable (SAIJ, Microjuris, Global Health Rights DB)
// Verificacion: abril 2026

// ── Principios generales (CSJN) ─────────────────────────────────

export const principiosGenerales = [
  {
    caratula: "Asociacion Benghalensis y otros c/ Estado Nacional",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 323:1339, Causa A.186.XXXIV",
    fecha: "01/06/2000",
    ordeno:
      "Ordeno al Estado cumplir su obligacion de asistencia, tratamiento y provision continua de medicamentos a pacientes con HIV/SIDA. Reconocio legitimacion de ONGs para amparos colectivos en salud. Establecio que la preservacion de la salud tiene 'prioridad indiscutible'.",
    principio: "Derecho a la salud operativo y exigible",
    fuente: "SAIJ / Class Actions Argentina",
    aplicaA: ["oncologia", "diabetes1", "general"],
  },
  {
    caratula:
      "Campodonico de Beviacqua, Ana Carina c/ Ministerio de Salud y Accion Social",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 323:3229",
    fecha: "24/10/2000",
    ordeno:
      "Condeno al Estado Nacional a continuar proveyendo medicacion oncologica a un nino con enfermedad de Kostmann. El Estado no puede evadir obligaciones de derecho internacional ni derivar responsabilidad a provincias u obras sociales cuando estas fallan.",
    principio: "Estado como garante subsidiario del derecho a la salud",
    fuente: "SAIJ",
    aplicaA: ["oncologia", "general"],
  },
  {
    caratula:
      "Etcheverry, Roberto Eduardo c/ Omint Sociedad Anonima y Servicios",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 324:677, Causa E.34.XXXV",
    fecha: "13/03/2001",
    ordeno:
      "Una prepaga no puede dar de baja a un afiliado HIV+ invocando libertad contractual cuando el paciente requiere tratamiento constante. El derecho a la salud prevalece sobre la libertad de contratacion.",
    principio:
      "Prepagas tienen compromiso social que trasciende lo contractual",
    fuente: "SAIJ / Global Health Rights Database",
    aplicaA: ["general"],
  },
  {
    caratula:
      "Hospital Britanico de Buenos Aires c/ Estado Nacional (Ministerio de Salud)",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 324:754",
    fecha: "13/03/2001",
    ordeno:
      "Declaro constitucional la Ley 24.754 que obliga a prepagas a cubrir el PMO. Las prepagas tienen un compromiso social que trasciende lo meramente contractual.",
    principio: "Constitucionalidad de la cobertura obligatoria del PMO",
    fuente: "CSJN / CAM Moron",
    aplicaA: ["general"],
  },
  {
    caratula:
      "Orlando, Susana Beatriz c/ Buenos Aires, Provincia de y otro s/ amparo",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 328:1708",
    fecha: "24/05/2005",
    ordeno:
      "Ordeno medida cautelar en 5 dias para proveer medicacion a paciente con esclerosis multiple. Consolido el principio de que el PMO es un 'piso prestacional', no un techo.",
    principio: "PMO es piso, no techo",
    fuente: "Global Health & Human Rights Database",
    aplicaA: ["oncologia", "diabetes1", "general"],
  },
  {
    caratula:
      "Floreancig, Andrea Cristina y otro c/ Estado Nacional s/ amparo",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "Fallos 329:2552, Causa F.838.XLI",
    fecha: "11/07/2006",
    ordeno:
      "Padres de nino con fibrosis quistica obtuvieron cobertura del Estado cuando la mutual entro en quiebra. El Estado tiene obligacion ineludible de garantizar el derecho a la salud especialmente para ninos con discapacidad y enfermedades graves.",
    principio:
      "Obligacion estatal ineludible, especialmente poblaciones vulnerables",
    fuente: "MPF - Acceso a la Justicia en Materia de Salud",
    aplicaA: ["general"],
  },
];

// ── PMO como piso (Camaras Federales) ───────────────────────────

export const falloPMOPiso = {
  caratula: "B. J. G. c/ OSPLAD s/ sumarisimo de salud",
  tribunal:
    "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala III",
  cita: "MJ-JU-M-95429-AR",
  fecha: "16/07/2015",
  ordeno:
    "Ratifico que el PMO es un 'piso prestacional' y no un techo. La cobertura no puede limitarse al listado del PMO cuando hacerlo danaria el derecho a la vida y la salud del beneficiario, derechos de jerarquia constitucional.",
  fuente: "Microjuris Argentina",
  aplicaA: ["oncologia", "diabetes1", "general"],
};

// ── Diabetes — Sensor de glucosa ────────────────────────────────

export const jurisprudenciaDiabetesSensor = [
  {
    caratula: "B.V.G. c/ Galeno Argentina S.A. s/ amparo de salud",
    tribunal: "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala III",
    cita: "MJ-JU-M-116486-AR",
    fecha: "01/11/2018",
    ordeno: "Cobertura integral del sensor FreeStyle Libre para paciente con Diabetes Mellitus Tipo 1, segun prescripcion del medico tratante. Ley 23.753 mod. Ley 26.914: cobertura 100% de medicamentos y reactivos de diagnostico para autocontrol.",
    tipo: "DIABETES_SENSOR",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2019/03/29/diabetes-controlada-cobertura-integral-del-sensor-de-glucemia-freeystyle-libre-a-una-paciente-con-diagnostico-de-diabetes-mellitus-tipo-i/",
  },
  {
    caratula: "M. V. A. c/ IOMA s/ amparo",
    tribunal: "Juzgado de Garantias N.2 de Azul, Buenos Aires",
    cita: "MJ-JU-M-113179-AR",
    fecha: "07/08/2018",
    ordeno: "Ordeno a IOMA provisionar permanentemente el kit de sensor de glucemia FreeStyle Libre para menor con diabetes T1, en 30 dias, bajo apercibimiento de ley. IOMA habia ofrecido alternativas inferiores que causaban angustia al menor.",
    tipo: "DIABETES_SENSOR",
    provincia: "Buenos Aires",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2018/10/16/denegatoria-arbitraria-a-cubrir-la-aparatologia-solicitada-por-quien-padece-diabetes-ya-que-los-sustitutos-concedidos-resultaron-validos/",
  },
  {
    caratula: "A. P. A. s/ amparo s/ apelacion (menor con diabetes T1)",
    tribunal: "Superior Tribunal de Justicia de la Provincia de Rio Negro",
    cita: "MJ-JU-M-121910-AR",
    fecha: "09/10/2019",
    ordeno: "Ordeno a Ospecon (OS Construccion) cobertura inmediata, permanente y continua de insulina rapida y prolongada, tiras reactivas, insumos de aplicacion y sensores de monitoreo continuo FreeStyle Libre segun prescripcion medica, para menor con diabetes T1.",
    tipo: "DIABETES_SENSOR",
    provincia: "Rio Negro",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2019/12/11/suministro-de-insulina-cobertura-de-los-medicamentos-y-reactivos-de-diagnostico-para-autocontrol-de-la-diabetes-que-sufre-un-menor-afiliado/",
  },
  {
    caratula: "S.I- H. R. c/ Omint S.A. de Servicios s/ amparo de salud",
    tribunal:
      "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala I",
    jueces: "Maria Susana Najurieta y Fernando A. Uriarte",
    cita: "MJ-JU-M-117780-AR",
    fecha: "14/03/2019",
    ordeno:
      "Ordeno a Omint cubrir el sensor FreeStyle Libre segun prescripcion medica. La Ley 23.753 modificada por Ley 26.914 establece cobertura del 100% de medicamentos y reactivos de autocontrol, incluyendo sensores de monitoreo continuo de glucosa. Rechazo el argumento de que el PMO limitaba la cobertura.",
    tipo: "DIABETES_SENSOR",
    fuente: "Microjuris Argentina",
  },
  {
    caratula:
      "V. M. E. c/ Obra Social de Empleados Publicos s/ accion de amparo",
    tribunal:
      "Camara de Apelaciones en lo Civil, Comercial, Minas, de Paz y Tributaria de Mendoza (Primera Camara de San Rafael)",
    cita: "MJ-JU-M-131834-AR, Expediente 13-05419223-6",
    fecha: "15/04/2021",
    ordeno:
      "Ordeno a la Obra Social de Empleados Publicos cubrir el sensor FreeStyle Libre. Los dispositivos CGM aprobados por ANMAT presentan ventajas cualitativas en el manejo de la enfermedad y prevencion de complicaciones.",
    tipo: "DIABETES_SENSOR",
    provincia: "Mendoza",
    fuente: "Microjuris Argentina",
  },
];

// ── Diabetes — Bomba de insulina ────────────────────────────────

export const jurisprudenciaDiabetesBomba = [
  {
    caratula:
      "M. M. E. c/ Instituto Nac. de Serv. Soc. para Jubilados y Pensionados s/ amparo de salud",
    tribunal:
      "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala II",
    cita: "MJ-JU-M-112227-AR",
    fecha: "08/06/2018",
    ordeno:
      "Ordeno a PAMI cubrir integramente bomba de insulina Medtronic Paradigm Veo 754 con monitoreo continuo, alarmas y suspension automatica, mas todos los insumos. Considero que el pedido de PAMI de 3 meses de registros glucemicos previos era una tactica dilatoria, no un desacuerdo clinico genuino.",
    tipo: "DIABETES_BOMBA",
    fuente: "Microjuris Argentina",
  },
];

// ── Oncologia — quimioterapia denegada ──────────────────────────

export const jurisprudenciaOncoQT = [
  {
    caratula: "F., C. A. c/ INSSJYP (PAMI) s/ amparo ley 16.986",
    tribunal: "Camara Federal de Apelaciones de Parana",
    cita: "MJ-JU-M-153791-AR",
    fecha: "14/10/2024",
    ordeno: "Cobertura de Paclitaxel 150 mg, Carboplatino 150 mg y Pembrolizumab 100 mg en 48 horas para cancer de mama derecho avanzado con adenopatias axilares. PAMI habia demorado la autorizacion.",
    tipo: "ONCO_QT",
    provincia: "Entre Rios",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2024/11/07/fallos-derecho-a-la-salud-se-ordena-a-una-obra-social-otorgar-la-cobertura-del-medicamento-solicitado-por-el-medico-tratante-de-una-afiliada-que-padece-cancer-de-mama-en-estado-avanzado/",
  },
  {
    caratula: "N.N. c/ Obra Social s/ Amparo (caso Brigatinib)",
    tribunal: "Camara Federal de Apelaciones de Cordoba, Sala A (Navarro, Avalos, Montesi)",
    fecha: "10/2024",
    ordeno: "Cobertura 100% de Brigatinib 180 mg para cancer de pulmon estadio IV con metastasis oseas. La OS habia rechazado alegando que no correspondia al estadio. Cautelar del Juz. Fed. N.2 Cordoba (Sanchez Freytes, 06/05/2024).",
    tipo: "ONCO_QT",
    provincia: "Cordoba",
    fuente: "Infobae Judiciales",
  },
  {
    caratula: "N.N. c/ ASE y OMINT SA s/ Amparo (caso Pertuzumab)",
    tribunal: "Corte de Justicia de Salta",
    fecha: "s/f",
    ordeno: "Cobertura inmediata de poliquimioterapia Docetaxel + Trastuzumab + Pertuzumab para progresion oncologica. Rechazo recursos de ASE y OMINT.",
    tipo: "ONCO_QT",
    provincia: "Salta",
    fuente: "CIJ",
  },
];

// ── Oncologia — estudios diagnosticos denegados ─────────────────

export const jurisprudenciaOncoEstudio = [
  {
    caratula: "N.N. c/ Asociacion Mutual Sancor Salud s/ Amparo (Oncotype DX)",
    tribunal: "Juzgado Federal de San Martin (Juez Oscar Papavero)",
    fecha: "03/2026",
    ordeno: "Cobertura del Oncotype DX para paciente de 38 anos con cancer de mama. Sancor habia rechazado alegando 'insuficiente evidencia'. Cuerpo Medico Forense confirmo que la indicacion es pertinente.",
    tipo: "ONCO_ESTUDIO",
    provincia: "Buenos Aires",
    fuente: "Justicia de Primera",
    url: "https://justiciadeprimera.com/2026/03/30/prepaga-debe-cubrir-un-estudio-genetico-por-cancer-de-mama/",
  },
  {
    caratula: "N.N. c/ OSDE s/ Amparo de salud (reintegro Oncotype DX)",
    tribunal: "Camara Nacional de Apelaciones en lo Civil y Comercial Federal, Sala III (Gottardi, Perozziello Vizier, Nallar)",
    fecha: "11/2025",
    ordeno: "Reintegro de $1.622.337,75 a paciente con cancer de mama por denegacion de Oncotype DX. Las tres salas de la Camara ya reconocian cobertura.",
    tipo: "ONCO_ESTUDIO",
    provincia: "CABA",
    fuente: "Justicia de Primera",
  },
  {
    caratula: "N.N. c/ Medife Asociacion Civil s/ Amparo (estudio BRCA 1/2)",
    tribunal: "Camara Segunda del Trabajo de Bariloche (Rio Negro)",
    fecha: "03/2023",
    ordeno: "Cobertura 100% del estudio genetico BRCA 1 y 2 en 5 dias habiles, con multa de $2.000/dia por incumplimiento. Medife habia rechazado alegando que 'no era indispensable'. Paciente con cancer, recaida y metastasis.",
    tipo: "ONCO_ESTUDIO",
    provincia: "Rio Negro",
    fuente: "Poder Judicial Rio Negro",
  },
  {
    caratula: "N.N. c/ Sancor Salud s/ Amparo (Oncotype DX + Goserelina)",
    tribunal: "Camara Federal de Apelaciones de Resistencia (Alcala, Garcia)",
    fecha: "01/2026",
    ordeno: "Cobertura integral de Goserelina 3,6 mg + Oncotype DX para cancer de mama estadio III con metastasis ganglionar. Incluyo traslado y alojamiento a Cordoba.",
    tipo: "ONCO_ESTUDIO",
    provincia: "Chaco",
    fuente: "Litigio.com.ar",
  },
];

// ── Oncologia — cirugia / reconstruccion mamaria ────────────────

export const jurisprudenciaOncoCirugia = [
  {
    caratula: "C.R.C.A. c/ Asociacion Mutual Sancor Salud s/ Amparo Ley 16.986",
    tribunal: "Camara Federal de Apelaciones de Parana",
    fecha: "02/10/2020",
    ordeno: "Cobertura 100% de mastectomia radical derecha + mastectomia profilactica izquierda + reconstruccion inmediata con dos protesis expansoras. Cancer de mama triple negativo, estadio III.",
    tipo: "ONCO_CIRUGIA",
    provincia: "Entre Rios",
    fuente: "Microjuris Argentina",
  },
  {
    caratula: "N.N. c/ OSPAC s/ Amparo (cirugia preventiva mama)",
    tribunal: "Juzgado Federal de Rosario",
    fecha: "2025",
    ordeno: "Cobertura de adenomastectomia preventiva + reseccion remanente mamario + reconstruccion con implante y malla. OSPAC habia aprobado la extraccion pero rechazado la reconstruccion.",
    tipo: "ONCO_CIRUGIA",
    provincia: "Santa Fe",
    fuente: "Version Rosario",
  },
];

// ── Fallos por obra social específica ───────────────────────────

export const jurisprudenciaPorOS = {
  "Swiss Medical": {
    caratula: "C., G. A. y otro c/ Swiss Medical SA s/ Amparo de salud",
    tribunal: "Corte Suprema de Justicia de la Nacion",
    cita: "FA24000017",
    fecha: "12/03/2024",
    ordeno: "Fallo CSJN sobre continuidad de cobertura por patologias graves. Derecho a la continuidad del servicio de salud.",
    fuente: "SAIJ",
  },
  "OSECAC": {
    caratula: "G. D. S. c/ OSECAC y otro s/ Amparo",
    tribunal: "Camara Federal de Apelaciones de Mar del Plata (Expediente 13.796)",
    fecha: "24/05/2012",
    ordeno: "Cobertura de medicamentos al 100% para paciente con discapacidad. Condena extendida al Estado Nacional como responsable subsidiario.",
    fuente: "Biblioteca Camara Federal Mar del Plata",
  },
  "Galeno": {
    caratula: "Seidenari, Edelweis Irene Eulogia c/ Galeno Argentina S.A. s/ Amparo",
    tribunal: "CSJN (Fallos 344:1308)",
    fecha: "03/06/2021",
    ordeno: "Eliminar adicionales discriminatorios por franja etaria para afiliada mayor de 65 anos con mas de 10 anos de antiguedad.",
    fuente: "MPF",
  },
};

// ── Tucuman — fallos específicos ────────────────────────────────

export const jurisprudenciaTucuman = [
  // Removido: Gomez c/ IPSST — sin fecha, sin tribunal especifico, fuente no verificable (blog offline)
];

// ── Oncologia — terapia dirigida / inmunoterapia ────────────────

export const jurisprudenciaOncoDirigida = [
  // Removido: Amparo c/ OS UNR (T-DM1 Rosario 2018) — no verificable en web
  {
    caratula: "I. J. R. c/ OSDE s/ procesos urgentes (autosatisfactiva)",
    tribunal: "Juzgado Civil, Comercial, Laboral, Familia y Menores de Esquina, Corrientes",
    cita: "MJ-JU-M-135570-AR",
    fecha: "17/11/2021",
    ordeno: "Cobertura de Pembrolizumab (Keytruda) para carcinoma de celulas renales, aun sin aprobacion ANMAT para esa indicacion. 2 ampollas cada 21 dias por 1 ano.",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Corrientes",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2022/02/03/fallos-medida-autosatisfactiva-se-ordena-a-una-empresa-de-medicina-prepaga-suministrar-a-un-afiliado-un-medicamento-aun-no-aprobado-por-la-anmat-para-el-tratamiento-del-cancer-de-rinon-que-padece/",
  },
  {
    caratula: "Amparo c/ PAMI (Trastuzumab Deruxtecan / Enhertu, Rosario)",
    tribunal: "Juzgado Federal de Rosario",
    fecha: "11/2024",
    ordeno: "Cobertura 100% de Trastuzumab Deruxtecan (Enhertu) 100 mg, 4 ampollas cada 21 dias para cancer de mama HER2+ metastasico. Costo ~$6.000.000/ciclo.",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Santa Fe",
    fuente: "El Ciudadano Web / Version Rosario",
  },
  {
    caratula: "N.N. c/ OSDE s/ Amparo de salud (Trastuzumab Deruxtecan)",
    tribunal: "Camara Federal de Apelaciones de Resistencia (Garcia, Bosch)",
    fecha: "09/04/2025",
    ordeno: "Confirmo cautelar que ordeno a OSDE cobertura 100% de Trastuzumab-Deruxtecan (Enhertu). Rechazo argumento de desequilibrio financiero: 'en materia de salud el tratamiento adecuado no admite demoras'. Prioridad a evaluacion del medico tratante.",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Chaco",
    fuente: "Litigio.com.ar",
    url: "https://litigio.com.ar/2025/04/09/confirman-un-fallo-que-ordeno-a-osde-la-cobertura-de-un-medicamento-oncologico/",
  },
  {
    caratula: "Amparo c/ PAMI (Pembrolizumab ca. uterino, Rosario)",
    tribunal: "Juzgado Federal N.1 de Rosario",
    fecha: "2020",
    ordeno: "Cobertura 100% de Pembrolizumab como ultimo recurso para cancer uterino avanzado. No estaba en protocolos PAMI (Disp. 35/17).",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Santa Fe",
    fuente: "Version Rosario",
  },
  {
    caratula: "R. CH., G. c/ Min. Salud Pcia. Salta s/ Amparo",
    tribunal: "Corte de Justicia de la Provincia de Salta",
    cita: "MJ-JU-M-152040-AR",
    fecha: "26/04/2024",
    ordeno: "Cobertura de Volanesorsen, medicamento no registrado en ANMAT pero aprobado en UE, para quilomicronemia familiar. Negar cobertura por falta de certeza absoluta es incompatible con cobertura integral. Aplica Disposicion ANMAT 4616/2019 (acceso excepcion).",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Salta",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2024/07/16/fallos-primero-el-paciente-una-obra-social-debe-brindar-cobertura-de-un-medicamento-no-registrado-ante-el-anmat-pero-que-cuenta-con-respaldo-cientifico/",
  },
  {
    caratula: "A. I. c/ INSSJYP (PAMI) s/ amparo ley 16.986",
    tribunal: "Camara Federal de Apelaciones de Posadas",
    cita: "MJ-JU-M-154415-AR",
    fecha: "08/01/2025",
    ordeno: "Cobertura continua e ininterrumpida de Atezolizumab 120 mg y Bevacizumab 15/kg al 100% para hepatocarcinoma irresecable. El medico tratante tiene amplia libertad para escoger el tratamiento.",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Misiones",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2025/02/19/fallos-derecho-a-la-salud-se-ordena-a-una-obra-social-otorgar-el-medicamento-oncologico-prescripto-por-los-medicos-tratantes-a-favor-de-una-afiliada-que-padece-cancer-de-higado/",
  },
  {
    caratula: "R. J. L. c/ OS Union del Personal Civil de la Nacion s/ medida autosatisfactiva",
    tribunal: "Camara Federal de Apelaciones de Posadas",
    cita: "MJ-JU-M-156543-AR",
    fecha: "12/06/2025",
    ordeno: "Cobertura 100% de radioterapia IMRT para carcinoma nasofaringeo en CEMENER (Oro Verde, Entre Rios), incluyendo traslado y alojamiento para paciente y acompanante a 832 km, con astreintes de $200.000/dia.",
    tipo: "ONCO_ESTUDIO",
    provincia: "Misiones",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2025/08/05/fallos-derecho-a-la-salud-se-ordena-a-una-obra-social-brindar-cobertura-total-para-un-tratamiento-oncologico-a-mas-de-800-km-del-domicilio-del-paciente-incluyendo-traslado-y-alojamiento/",
  },
];

// ── Oncologia — PET/CT denegado (OSECAC) ────────────────────────

export const jurisprudenciaOncoEstudioPET = [
  {
    caratula: "N.N. c/ OSECAC s/ Amparo (PET-TC oncologico)",
    tribunal: "Juzgado Civil, Comercial, Mineria y Sucesiones de General Roca, Rio Negro",
    fecha: "2021",
    ordeno: "Autorizacion y cobertura de PET-TC en 3 dias, con astreintes de $10.000/dia y apercibimiento de desobediencia. Amparo integramente digital. OSECAC no habia respondido la solicitud desde febrero.",
    tipo: "ONCO_ESTUDIO",
    provincia: "Rio Negro",
    fuente: "Poder Judicial de Rio Negro",
    url: "http://servicios.jusrionegro.gov.ar/inicio/comunicacionjudicial/index.php/noticias/item/2892-amparo-integramente-digital-ordena-a-obra-social-cubrir-estudios-oncologicos",
  },
];

// ── Oncologia — cirugia reconstruccion (Swiss Medical + OSDE) ───

export const jurisprudenciaOncoCirugiaAdicional = [
  {
    caratula: "G.G.B. c/ Swiss Medical S.A. s/ Accion declarativa de derecho",
    tribunal: "Camara Federal de Apelaciones de Rosario",
    fecha: "11/02/2016",
    ordeno: "Cobertura integral de lipotransferencia mamaria bilateral como reconstruccion reparadora (no estetica) bajo Ley 26.872, para paciente con secuelas de cirugia conservadora.",
    tipo: "ONCO_CIRUGIA",
    provincia: "Santa Fe",
    fuente: "Microjuris Argentina",
  },
  {
    caratula: "Amparo c/ OSDE (reconstruccion mamaria con protesis, La Plata)",
    tribunal: "Camara Federal de Apelaciones de La Plata",
    fecha: "2022",
    ordeno: "Cirugia de reconstruccion mamaria con protesis al 100% bajo Ley 26.872. OSDE habia rechazado alegando que era estetica, no funcional.",
    tipo: "ONCO_CIRUGIA",
    provincia: "Buenos Aires",
    fuente: "Comercio y Justicia",
  },
];

// ── Diabetes — bomba de insulina adicional ──────────────────────

export const jurisprudenciaDiabetesBombaAdicional = [
  {
    caratula: "M.A.N. c/ OS Union del Personal Civil de la Nacion s/ Amparo de salud",
    tribunal: "Camara Nacional de Apelaciones en lo Civil y Comercial Federal",
    cita: "MJ-JU-M-107418-AR",
    fecha: "01/08/2017",
    ordeno: "Cobertura 100% de microinfusora Paradigm Veo 754 Medtronic con bolo inteligente, medicion continua, alarma y corte automatico. La OS habia ofrecido modelo distinto al prescripto.",
    tipo: "DIABETES_BOMBA",
    provincia: "Nacional",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2017/11/23/obligacion-de-la-obra-social-de-proveer-al-actor-la-microinfusora-de-insulina-con-bolo-inteligente-y-medicion-continua-de-glucosa-en-tiempo-real/",
  },
  // Removido: Z.Y.E. c/ Union Personal — tribunal no especificado ("primera y segunda instancia"), fuente no verificable
];

// ── Diabetes — insulina / insumos denegados adicional ───────────

export const jurisprudenciaDiabetesInsulinaAdicional = [
  {
    caratula: "P., A. A. c/ OSPACA STAFF MEDICO S.A. s/ accion de amparo",
    tribunal: "Camara Quinta de Apelaciones en lo Civil, Comercial, Minas, de Paz y Tributario de Mendoza",
    cita: "MJ-JU-M-104506-AR",
    fecha: "28/04/2017",
    ordeno: "Cobertura 100% de medicacion para diabetes (Zomarist Met + Avastian). La OS no puede condicionar la cobertura por voluntarismo; debe justificar razonablemente cualquier negativa.",
    tipo: "DIABETES_INSULINA",
    provincia: "Mendoza",
    fuente: "Microjuris Argentina",
    url: "https://aldiaargentina.microjuris.com/2017/06/29/es-obligacion-de-la-obra-social-demandada-la-de-cubrir-los-medicamentos-que-indica-el-medico-tratante-para-el-tratamiento-de-la-diabetes-padecida-por-la-actora/",
  },
  {
    caratula: "Amparo c/ PAMI (insulina Glargina Basaglar + Sitagliptina)",
    tribunal: "Justicia Federal (tribunal no identificado en fuente)",
    fecha: "02/2020",
    ordeno: "Cobertura integral 100% de insulina Glargina Basaglar y Sitagliptina. La OS no puede sustituir la medicacion prescripta por el tratante. Condicionamiento de PAMI de exigir uso previo de NPH fue considerado arbitrario.",
    tipo: "DIABETES_INSULINA",
    provincia: "Nacional",
    fuente: "Microjuris Argentina (aldiaargentina.microjuris.com, 26/02/2020)",
    url: "https://aldiaargentina.microjuris.com/2020/02/26/diabetes-con-cobertura-obra-social-debe-cubrir-integramente-la-insulina-y-medicacion-para-el-tratamiento-de-la-diabetes/",
  },
  {
    caratula: "Amparo c/ OSDE (FreeStyle Libre, Parana)",
    tribunal: "Juzgado Federal de Primera Instancia de Parana N.2 (Juez Alonso)",
    fecha: "2019",
    ordeno: "Cobertura integral, inmediata, permanente y gratuita del kit FreeStyle Libre (lector + 2 sensores) para paciente con diabetes T1 que planificaba embarazo.",
    tipo: "DIABETES_SENSOR",
    provincia: "Entre Rios",
    fuente: "ElEntreRios.com",
  },
];

// ── IOMA — fallo específico (competencia, no fondo) ─────────────

export const jurisprudenciaIOMA = {
  caratula: "D., M. P. N. c/ I.O.M.A. s/ Amparo (CSJ 2116/2022/CS1)",
  tribunal: "CSJN (competencia) — origen jurisdiccion provincial Buenos Aires",
  fecha: "2022",
  ordeno: "Paciente con cancer de mama triple negativo reclamo Atezolizumab + Nab-Paclitaxel. CSJN resolvio cuestion de competencia. Nota: no hay fallo de fondo verificable contra IOMA por denegacion oncologica.",
  tipo: "ONCO_QT",
  provincia: "Buenos Aires",
  fuente: "Dictamen MPF",
};

// ── Oncologia — fallos provinciales adicionales (dirigida/general)

export const jurisprudenciaOncologiaEspecifica = [
  {
    caratula: "R.E.V. c/ Incluir Salud - Min. Salud Pcia. Bs. As. y Otro s/ Amparo Ley 16.986",
    tribunal: "Camara Federal de La Plata, Sala II",
    cita: "FLP 17936/2020/1/CA1",
    fecha: "2020",
    ordeno: "Cobertura total de Palbociclib 125 mg, Letrozol 2,5 mg y Acido Zoledronico 4 mg para cancer de mama EIIb luminal B con metastasis osea.",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Buenos Aires",
    fuente: "CIJ",
  },
  // Removido: Brigatinib Cordoba — duplicado de jurisprudenciaOncoQT[0]
  {
    caratula: "[Amparista] c/ Economicas Salud s/ Amparo",
    tribunal: "Juzgado Federal de Rosario",
    fecha: "2024",
    ordeno: "Cobertura integral de Pembrolizumab (Keytruda) de $14.000.000 cada 21 dias para cancer uterino avanzado.",
    tipo: "ONCO_DIRIGIDA",
    provincia: "Santa Fe",
    fuente: "Abogados Rosario",
  },
  {
    caratula: "[Amparista] c/ PAMI s/ Amparo",
    tribunal: "Juzgado Federal de Concordia (Jueza Analia Ramponi)",
    fecha: "03/2026",
    ordeno: "Medida cautelar en 24 horas para cobertura integral de tratamiento oncologico. 'En casos de cancer, el tiempo es un factor determinante.'",
    tipo: "ONCO_GENERAL",
    provincia: "Entre Rios",
    fuente: "Analisis Litoral",
  },
];

// ── Diabetes — fallos provinciales adicionales ──────────────────

export const jurisprudenciaDiabetesProvincial = [
  {
    caratula: "[Amparista] c/ Medife s/ Amparo de Salud",
    tribunal: "Juzgado Nacional en lo Civil y Comercial Federal (Juez Alejandro Nobili)",
    fecha: "02/2026",
    ordeno: "Cobertura integral al 100% del sensor FreeStyle Libre, lector, aplicador y tiras reactivas segun prescripcion medica.",
    tipo: "DIABETES_SENSOR",
    provincia: "CABA",
    fuente: "Justicia de Primera",
  },
  {
    caratula: "[Amparista] c/ PAMI s/ Amparo",
    tribunal: "Camara Federal de Salta, Sala I",
    fecha: "02/2025",
    ordeno: "Cobertura total 100% de sensores FreeStyle Libre para paciente con diabetes y discapacidad mental, mas reembolso de gastos previos. Cito Res. 2820/2022.",
    tipo: "DIABETES_SENSOR",
    provincia: "Salta",
    fuente: "Justicia de Primera",
  },
  {
    caratula: "[Amparista] c/ OSDE s/ Amparo de Salud",
    tribunal: "Camara Federal de Apelaciones de Rosario",
    cita: "FSA 2152/2024/CA1",
    fecha: "2024",
    ordeno: "Cobertura 100% de Semaglutida (Ozempic) para diabetes tipo 2 insulinodependiente. Rechazo que OSDE solo cubriera 40%.",
    tipo: "DIABETES_INSULINA",
    provincia: "Santa Fe",
    fuente: "LXForce",
  },
  {
    caratula: "N.N. c/ Obra Social s/ Amparo (Semaglutida, Mendoza)",
    tribunal: "Camara Federal de Apelaciones de Mendoza, Sala A (Castiñeira de Dios, Perez Curci, Pizarro)",
    fecha: "10/2024",
    ordeno: "Cobertura 100% de Semaglutida por unanimidad para diabetes tipo 2 avanzada con obesidad. El PMO es un 'piso basico irrenunciable', no un techo.",
    tipo: "DIABETES_INSULINA",
    provincia: "Mendoza",
    fuente: "Infobae Judiciales",
    url: "https://www.infobae.com/judiciales/2024/10/22/obligan-a-una-obra-social-a-cubrir-el-tratamiento-completo-de-una-paciente-con-diabetes-avanzada/",
  },
];

// ── Estadísticas nacionales de amparos ──────────────────────────

export const estadisticasAmparos = {
  ultimaActualizacion: "2024",
  fuente: "Registro Nacional de Amparos SSS / OLEGISAR",
  total2024: {
    obrasSociales: 7602,
    prepagas: 2470,
    total: 10072,
  },
  historico: [
    { anio: 2011, total: 1130 },
    { anio: 2018, total: 5474 },
    { anio: 2024, total: 10072 },
  ],
  concentracionGeografica: {
    buenosAires: 42,
    cordoba: 17,
    resto: 41,
  },
  tasaExito: ">80%",
  medicamentosMasLitigados: [
    "Nusinersen (AME)",
    "Palbociclib (cancer de mama)",
    "Agalsidasa alfa (Fabry)",
    "Pembrolizumab (varios canceres)",
    "Semaglutida/Ozempic (diabetes)",
    "Brigatinib (cancer de pulmon)",
    "FreeStyle Libre (diabetes T1)",
  ],
};

// ── Fallos por provincia (para mostrar en UI) ───────────────────

export const fallosPorProvincia = {
  "Buenos Aires": { cantidad: 4, patologias: ["Oncologia", "Diabetes T1", "General"] },
  "CABA": { cantidad: 1, patologias: ["Diabetes T1"] },
  "Cordoba": { cantidad: 1, patologias: ["Oncologia"] },
  "Corrientes": { cantidad: 1, patologias: ["Oncologia"] },
  "Entre Rios": { cantidad: 4, patologias: ["Oncologia", "Diabetes T1", "General"] },
  "Mendoza": { cantidad: 2, patologias: ["Diabetes T1", "Diabetes T2"] },
  "Misiones": { cantidad: 2, patologias: ["Oncologia"] },
  "Rio Negro": { cantidad: 2, patologias: ["Oncologia", "Diabetes T1"] },
  "Salta": { cantidad: 2, patologias: ["Oncologia", "Diabetes"] },
  "Santa Fe": { cantidad: 3, patologias: ["Oncologia", "Diabetes T2"] },
};

// ── Helper: obtener jurisprudencia relevante por patologia y tipo

export function getJurisprudenciaRelevante(patologiaId, tipoReclamo) {
  const resultado = {
    principios: principiosGenerales.filter((f) =>
      f.aplicaA.includes(patologiaId) || f.aplicaA.includes("general")
    ),
    pmoPiso: falloPMOPiso,
    especificos: [],
  };

  if (patologiaId === "diabetes1") {
    if (tipoReclamo === "sensor" || tipoReclamo === "tec_sensor") {
      resultado.especificos = [
        ...jurisprudenciaDiabetesSensor,
        ...jurisprudenciaDiabetesProvincial.filter((f) => f.tipo === "DIABETES_SENSOR"),
      ];
    } else if (tipoReclamo === "bomba" || tipoReclamo === "tec_bomba") {
      resultado.especificos = [
        ...jurisprudenciaDiabetesBomba,
        ...jurisprudenciaDiabetesBombaAdicional,
      ];
    } else {
      resultado.especificos = [
        ...jurisprudenciaDiabetesSensor,
        ...jurisprudenciaDiabetesBomba,
        ...jurisprudenciaDiabetesBombaAdicional,
        ...jurisprudenciaDiabetesProvincial,
        ...jurisprudenciaDiabetesInsulinaAdicional,
      ];
    }
  }

  if (patologiaId === "oncologia") {
    resultado.especificos = [
      ...jurisprudenciaOncoQT,
      ...jurisprudenciaOncoDirigida,
      ...jurisprudenciaOncoEstudio,
      ...jurisprudenciaOncoEstudioPET,
      ...jurisprudenciaOncoCirugia,
      ...jurisprudenciaOncoCirugiaAdicional,
      ...jurisprudenciaOncologiaEspecifica,
      ...jurisprudenciaTucuman.filter((f) => f.tipo?.startsWith("ONCO")),
    ];
  }

  return resultado;
}

// ── Formato para citar en documentos legales ────────────────────

export function formatCitaJurisprudencial(fallo) {
  return `"${fallo.caratula}" (${fallo.tribunal}, ${fallo.fecha}${fallo.cita ? `, ${fallo.cita}` : ""})`;
}
