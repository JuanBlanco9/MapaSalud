// ── Organizaciones de ayuda por patologia ────────────────────────

export const organizacionesPorPatologia = {
  oncologia: [
    {
      nombre: "LALCEC",
      descripcion: "Asesoria oncologica gratuita",
      telefono: "0800-222-1166",
      web: "lalcec.org.ar",
    },
    {
      nombre: "FUCA (Fundacion Cancer)",
      descripcion: "Apoyo a pacientes, asesoria legal",
      telefono: "(011) 4783-5762",
      web: "fuca.org.ar",
    },
    {
      nombre: "AstraZeneca Alcanzar",
      descripcion: "Programa de pacientes oncologicos (osimertinib, olaparib, Enhertu)",
      telefono: "0800-999-0575",
      web: "alcanzar.com.ar",
    },
    {
      nombre: "Roche Cerca Tuyo",
      descripcion: "Programa de pacientes (trastuzumab, pertuzumab, bevacizumab)",
      telefono: null,
      web: "rochecercatuyo.com.ar",
    },
  ],
  diabetes1: [
    {
      nombre: "CUI.D.AR",
      descripcion: "Comunidad de diabetes mas grande de Argentina. Asesoria, acompanamiento.",
      telefono: "(011) 4732-9000",
      whatsapp: "+54 9 11 3606 5108",
      web: "cuidar.org",
    },
    {
      nombre: "LAPDI",
      descripcion: "Liga Argentina de Proteccion al Diabetico. Grupo familias DM1.",
      telefono: "11 3290 3355",
      web: "lapdi.org",
    },
    {
      nombre: "FAD (Federacion Argentina de Diabetes)",
      descripcion: "Federacion que agrupa asociaciones de pacientes. Asesoria legal.",
      telefono: null,
      email: "legales@fad.org.ar",
      web: "fad.org.ar",
    },
    {
      nombre: "SAD (Sociedad Argentina de Diabetes)",
      descripcion: "Sociedad medico-cientifica. Guias y recursos.",
      telefono: "(011) 4813-8419",
      whatsapp: "+54 9 11 5589 3068",
      web: "diabetes.org.ar",
    },
  ],
  general: [
    {
      nombre: "Superintendencia de Servicios de Salud",
      descripcion: "Reclamos contra obras sociales",
      telefono: "0800-222-72583",
      web: "sssalud.gob.ar",
    },
    {
      nombre: "Defensoria del Pueblo de la Nacion",
      descripcion: "Amparos gratuitos contra OS nacionales",
      telefono: null,
      web: "dpn.gob.ar",
    },
  ],
};

export function getOrganizaciones(patologiaId) {
  return [
    ...organizacionesPorPatologia.general,
    ...(organizacionesPorPatologia[patologiaId] || []),
  ];
}
