// ── Datos reales de amparos — Ministerio de Salud de la Nación ──
// Fuente: Informe del Registro de Amparos 2022
// Dirección de Medicamentos Especiales y Alto Precio
// URL: argentina.gob.ar/sites/default/files/bancos/2023-09/informe-amparos-2022.pdf
//
// IMPORTANTE: Este informe cubre amparos contra el Ministerio de
// Salud de la Nación y organismos de la APN (PAMI, IOSFA, etc.),
// no directamente contra obras sociales/prepagas privadas.
// El 63% de los amparistas tiene cobertura privada (OS/prepaga)
// pero demandan al Estado como garante subsidiario.
//
// Para amparos directos contra OS/prepagas, se necesita el
// Registro Nacional de Amparos de la SSS (no publico).

export const informeAmparos2022 = {
  fuente: "Ministerio de Salud — Dir. Medicamentos Especiales y Alto Precio",
  periodo: "2022",
  amparosActivos: 131,
  nuevos2022: 70,
  impactoPresupuestarioARS: 8902074065,

  distribucionPatologia: {
    "Enfermedades poco frecuentes": 62.3,
    "Oncologia": 24.6,
    "Otras": 13.0,
  },

  topMedicamentosPorAmparos: [
    { droga: "Nusinersen (AME)", amparos: 18 },
    { droga: "Onasemnogén abeparvovec (AME)", amparos: 12 },
    { droga: "Elexacaftor/tezacaftor/ivacaftor (FQ)", amparos: 9 },
    { droga: "Nivolumab (oncologia)", amparos: 6 },
    { droga: "Pembrolizumab (oncologia)", amparos: 5 },
    { droga: "Palbociclib (oncologia)", amparos: 4 },
    { droga: "Rituximab", amparos: 4 },
    { droga: "Trastuzumab (oncologia)", amparos: 3 },
    { droga: "Ipilimumab (oncologia)", amparos: 3 },
    { droga: "Bevacizumab (oncologia)", amparos: 2 },
  ],

  topDiagnosticos: [
    { diagnostico: "AME (Atrofia Muscular Espinal)", pacientes: 30 },
    { diagnostico: "Fibrosis Quistica", pacientes: 10 },
    { diagnostico: "Cancer de mama", pacientes: 9 },
    { diagnostico: "Mucopolisacaridosis", pacientes: 7 },
    { diagnostico: "Cancer de rinon", pacientes: 3 },
    { diagnostico: "Cancer de pulmon", pacientes: 1 },
    { diagnostico: "Diabetes", pacientes: 1 },
  ],

  tendencia: {
    "2020": { nuevos: "dato en informe 2020", topDroga: "Nusinersen (46 amparos)" },
    "2021": { nuevos: "dato en informe 2021", topDroga: "Nusinersen (29 amparos)" },
    "2022": { nuevos: 70, topDroga: "Nusinersen (18 amparos)" },
  },

  datosSSS2024: {
    totalAmparos: 10072,
    contraObrasSociales: 7602,
    contraPrepagas: 2470,
    fuente: "Registro Nacional SSS (dato publico, dataset no publico)",
  },
};
