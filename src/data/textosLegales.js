// ── Textos legales EXACTOS para inyectar en el prompt de generacion ──
// Estos son los articulos que el asistente debe citar verbatim.

export const textosLegales = {
  constitucion_art43:
    `Art. 43 Constitucion Nacional: "Toda persona puede interponer accion expedita y rapida de amparo, siempre que no exista otro medio judicial mas idoneo, contra todo acto u omision de autoridades publicas o de particulares, que en forma actual o inminente lesione, restrinja, altere o amenace, con arbitrariedad o ilegalidad manifiesta, derechos y garantias reconocidos por esta Constitucion, un tratado o una ley."`,

  constitucion_art42:
    `Art. 42 Constitucion Nacional: "Los consumidores y usuarios de bienes y servicios tienen derecho, en la relacion de consumo, a la proteccion de su salud, seguridad e intereses economicos; a una informacion adecuada y veraz; a la libertad de eleccion, y a condiciones de trato equitativo y digno."`,

  pmo_art73:
    `PMO Art. 7.3 (Res. 201/2002): "Tendran cobertura al 100% por parte del Agente del Seguro los medicamentos para uso oncologico segun protocolos nacionales e internacionales aprobados por la autoridad de aplicacion (ANMAT)."`,

  pmo_art74:
    `PMO Art. 7.4 (Res. 201/2002): "Los medicamentos de soporte clinico de la quimioterapia y la medicacion analgesica para el dolor oncologico tendran cobertura al 100%."`,

  ley_26682:
    `Ley 26.682 Art. 7 (Marco regulatorio de medicina prepaga): "Las empresas de medicina prepaga deberan cubrir, como minimo en sus planes de cobertura medico asistencial, el Programa Medico Obligatorio vigente segun Resolucion del Ministerio de Salud de la Nacion y el Sistema de Prestaciones Basicas para Personas con Discapacidad."`,

  ley_23660:
    `Ley 23.660 Art. 3 (Obras Sociales): "Las obras sociales deberan destinar sus recursos en forma prioritaria a prestaciones de salud. Deberan, asimismo, brindar prestaciones de conformidad con el Programa Medico Obligatorio."`,

  ley_24754:
    `Ley 24.754 Art. 1: "Las empresas o entidades que presten servicios de medicina prepaga deberan cubrir, como minimo, en sus planes de cobertura medico asistencial las mismas prestaciones obligatorias dispuestas para las obras sociales."`,

  res_3377_2022:
    `Resolucion 3377/2022 Ministerio de Salud: Aprueba el Listado Complementario de Medicamentos Oncologicos de la Coordinacion de Banco de Drogas Especiales. Deroga Res. 29/2022. Establece el vademecum de drogas oncologicas obligatorio para el sistema de salud.`,

  res_1926_2024:
    `Resolucion 1926/2024 Ministerio de Salud: Los tratamientos oncologicos estan EXENTOS de coseguros. Las obras sociales pueden fijar libremente coseguros para otros servicios, pero oncologia, discapacidad, plan materno-infantil, HIV y hepatitis quedan exceptuados.`,

  ley_26872:
    `Ley 26.872 (Reconstruccion mamaria): "Los establecimientos de salud publicos, obras sociales y prepagas deberan cubrir la cirugia reconstructiva y las protesis necesarias para pacientes mastectomizadas como consecuencia de patologia mamaria."`,

  ley_23753_diabetes:
    `Ley 23.753 Art. 5 (Diabetes): "Los agentes del Seguro de Salud comprendidos en la Ley 23.660 deberan proveer la cobertura integral de la diabetes, incluyendo insulinas, antidiabeticos orales, reactivos de autocontrol, y toda otra medicacion, elementos e insumos necesarios para su tratamiento."`,

  ley_26914_diabetes:
    `Ley 26.914 Art. 1 (modifica Ley 23.753): Amplia la cobertura al 100% de "insulinas, analogos de insulina y medicacion oral, reactivos de autocontrol y todo otro tipo de elementos que la autoridad de aplicacion determine para el tratamiento de la diabetes, incluyendo la provision de equipos y dispositivos para su uso." La expresion "equipos y dispositivos" incluye sensores de monitoreo continuo de glucosa y bombas de infusion de insulina.`,

  ley_26914_art2_diabetes:
    `Ley 26.914 Art. 2: "Los gastos que demande el cumplimiento de la presente ley se imputaran a las partidas que se determinen a tal efecto en la Ley de Presupuesto General de la Administracion Nacional." Esto implica que el Estado asume la responsabilidad presupuestaria de la cobertura tecnologica.`,

  jurisprudencia_sensor_cgm:
    `Jurisprudencia reiterada en materia de sensores CGM: Multiples fallos de Camaras Federales han ordenado a obras sociales y prepagas cubrir sensores de monitoreo continuo de glucosa (FreeStyle Libre, Dexcom) al 100%, fundamentando en la Ley 26.914 y en el derecho a la salud del Art. 42 CN. Los tribunales han interpretado que la expresion "equipos y dispositivos" de la Ley 26.914 incluye los CGM, especialmente cuando el medico tratante los indica y se demuestra que mejoran el control glucemico y reducen hipoglucemias.`,

  jurisprudencia_piso:
    `Principio jurisprudencial reiterado: "El PMO constituye un piso de prestaciones minimas y no un techo. Las obras sociales y prepagas deben cubrir tratamientos no incluidos en el PMO cuando hay indicacion medica y existe riesgo para la vida o la salud del paciente." (CSJN, reiterado en multiples fallos de Camaras Federales)`,
};

// ── Templates de texto legal por situacion ──────────────────────

export function getTextosParaCarta(patologiaId, nivelCobertura) {
  const base = [
    textosLegales.constitucion_art42,
    textosLegales.constitucion_art43,
    textosLegales.ley_26682,
    textosLegales.ley_23660,
    textosLegales.ley_24754,
    textosLegales.jurisprudencia_piso,
  ];

  if (patologiaId === "oncologia") {
    base.push(
      textosLegales.pmo_art73,
      textosLegales.pmo_art74,
      textosLegales.res_3377_2022,
      textosLegales.res_1926_2024
    );
    if (nivelCobertura === "nacional") {
      // Strongest position — drug is in the official vademecum
    }
  }

  if (patologiaId === "diabetes1") {
    base.push(
      textosLegales.ley_23753_diabetes,
      textosLegales.ley_26914_diabetes,
      textosLegales.ley_26914_art2_diabetes,
      textosLegales.jurisprudencia_sensor_cgm
    );
  }

  return base;
}
