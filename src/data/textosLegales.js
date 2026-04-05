// ── Textos legales VERIFICADOS contra fuentes oficiales ─────────
// Verificacion: abril 2026 contra InfoLEG, Boletin Oficial, SAIJ
// Cada cita indica la fuente de verificacion.

import { PATOLOGIA } from "../constants";

export const textosLegales = {
  // ── Constitucionales (CONFIRMADOS) ────────────────────────────

  constitucion_art43:
    `Art. 43 Constitucion Nacional: "Toda persona puede interponer accion expedita y rapida de amparo, siempre que no exista otro medio judicial mas idoneo, contra todo acto u omision de autoridades publicas o de particulares, que en forma actual o inminente lesione, restrinja, altere o amenace, con arbitrariedad o ilegalidad manifiesta, derechos y garantias reconocidos por esta Constitucion, un tratado o una ley." [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/804/norma.htm]`,

  constitucion_art42:
    `Art. 42 Constitucion Nacional: "Los consumidores y usuarios de bienes y servicios tienen derecho, en la relacion de consumo, a la proteccion de su salud, seguridad e intereses economicos; a una informacion adecuada y veraz; a la libertad de eleccion, y a condiciones de trato equitativo y digno." [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/804/norma.htm]`,

  constitucion_art75_22:
    `Art. 75 inc. 22 Constitucion Nacional: Otorga jerarquia constitucional a tratados internacionales de derechos humanos, entre ellos el Pacto Internacional de Derechos Economicos, Sociales y Culturales (PIDESC), cuyo Art. 12 reconoce "el derecho de toda persona al disfrute del mas alto nivel posible de salud fisica y mental." [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/804/norma.htm]`,

  // ── PMO Oncologico (CORREGIDO) ────────────────────────────────

  pmo_art73:
    `PMO Anexo I, punto 7.3 (Res. 201/2002): Los medicamentos para uso oncologico segun protocolos oncologicos aprobados por la autoridad de aplicacion tendran cobertura al 100% por parte del Agente del Seguro. [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/70000-74999/73649/texactres201-2002MS-anexoI.htm — Nota: el texto dice "autoridad de aplicacion", sin especificar ANMAT.]`,

  pmo_art74:
    `PMO Anexo I, punto 7.4 (Res. 201/2002): La cobertura de medicacion de soporte clinico de la quimioterapia destinada a la prevencion y tratamiento de los vomitos inducidos por agentes antineoplasicos, segun los protocolos oncologicos aprobados por la autoridad de aplicacion, sera del 100%. La medicacion analgesica para el dolor oncologico tendra cobertura del 100%. [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/70000-74999/73649/texactres201-2002MS-anexoI.htm]`,

  // ── Marco regulatorio (CONFIRMADOS) ───────────────────────────

  ley_26682:
    `Ley 26.682 Art. 7 (Marco regulatorio de medicina prepaga): Las entidades "deben cubrir, como minimo en sus planes de cobertura medico asistencial, el Programa Medico Obligatorio vigente segun Resolucion del Ministerio de Salud de la Nacion y el Sistema de Prestaciones Basicas para Personas con Discapacidad prevista en la ley 24.901 y sus modificatorias." [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/180000-184999/182180/texact.htm — Nota: algunos articulos modificados por DNU 70/2023.]`,

  ley_23660:
    `Ley 23.660 Art. 3 (Obras Sociales, texto modificado por DNU 70/2023): "Las entidades del articulo 1 destinaran sus recursos en forma prioritaria a prestaciones de salud. Deberan, asimismo, brindar otras prestaciones sociales. En lo referente a las prestaciones de salud formaran parte del Sistema Nacional del Seguro de Salud." [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm]`,

  ley_24754:
    `Ley 24.754 Art. 1: "Las empresas o entidades que presten servicios de medicina prepaga deberan cubrir, como minimo, en sus planes de cobertura medico asistencial las mismas prestaciones obligatorias dispuestas para las obras sociales." [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/41166/norma.htm — Nota: vigente pero en la practica supersedida por Ley 26.682 Art. 7.]`,

  // ── Resoluciones oncologicas (CONFIRMADAS) ────────────────────

  res_3377_2022:
    `Resolucion 3377/2022 Ministerio de Salud (publicada 06/12/2022): Aprueba el Listado Complementario de Medicamentos Oncologicos de la Coordinacion de Banco de Drogas Especiales. Deroga expresamente la Res. 29/2022 (RESOL-2022-29-APN-MS). [Fuente: servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=376215]`,

  res_1926_2024:
    `Resolucion 1926/2024 Ministerio de Salud (publicada 24/06/2024): Liberaliza los coseguros para las prestaciones no exceptuadas, pero establece un Anexo con servicios exceptuados de esa liberalizacion (segun texto de la resolucion). Los tratamientos oncologicos estan incluidos entre los exceptuados, junto con discapacidad, emergencias, plan materno-infantil, HIV/hepatitis y transplantes. Efecto practico: oncologia sigue sin coseguro. [Fuente: boletinoficial.gob.ar/detalleAviso/primera/309532/20240624]`,

  // ── Reconstruccion mamaria (CONFIRMADA) ───────────────────────

  ley_26872:
    `Ley 26.872 (Reconstruccion mamaria): Obliga a todos los establecimientos de salud publicos, obras sociales, Obra Social del Poder Judicial, Obra Social del Congreso, entidades de medicina prepaga, y todos los agentes que brinden servicios medicos — a cubrir la cirugia reconstructiva y la provision de las protesis necesarias para pacientes mastectomizadas como consecuencia de patologia mamaria. [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/215000-219999/218211/norma.htm]`,

  // ── Diabetes (CORREGIDO contra texto oficial) ─────────────────

  ley_23753_diabetes:
    `Ley 23.753 Art. 5 (texto segun Ley 26.914): "La cobertura de los medicamentos y reactivos de diagnostico para autocontrol de los pacientes con diabetes, sera del 100% (cien por ciento) y en las cantidades necesarias segun prescripcion medica." La autoridad de aplicacion debe fijar Normas de Provision de Medicamentos e Insumos actualizadas cada 2 anios. [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/154/texact.htm]`,

  ley_26914_diabetes:
    `Ley 26.914 (sancionada 27/11/2013, promulgada 17/12/2013): Modifica la Ley 23.753 de diabetes. Art. 1: establece al Ministerio de Salud como autoridad de aplicacion y coordina prevencion/tratamiento. Art. 2: incorpora el nuevo Art. 5 a la Ley 23.753 (cobertura 100% de medicamentos y reactivos). Art. 3: incorpora Art. 6 (plazo de 30 dias para revision). Art. 4: incorpora Art. 7 (orden publico, adhesion provincial). [Fuente: servicios.infoleg.gob.ar/infolegInternet/anexos/220000-224999/224327/norma.htm — Nota: la expresion "equipos y dispositivos" no aparece textualmente en la ley pero ha sido interpretada por la jurisprudencia.]`,

  res_2091_2025_diabetes:
    `Resolucion 2091/2025 Ministerio de Salud (publicada B.O. 01/07/2025): Aprueba las nuevas Normas de Provision de Medicamentos e Insumos para Personas con Diabetes. Deroga expresamente la Res. 2820/2022. El Anexo I establece cobertura del 100% de sensores de monitoreo de glucosa flash (MG-i) para personas insulinodependientes, embarazadas, o que planifiquen embarazo, con indicacion documentada del medico tratante. Aplica a todos los agentes del sistema: obras sociales (Ley 23.660/23.661), prepagas (Ley 26.682), PAMI (Ley 19.032), Obra Social del Poder Judicial, IOSFA, y obras sociales universitarias (Ley 24.741). Tambien incluye cobertura 100% de bombas de insulina y duplica minimos de agujas, lancetas y tiras reactivas. [Fuente: servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=414617 y boletinoficial.gob.ar/detalleAviso/primera/327710/20250701 — Nota: el 100% para sensores esta en el Anexo I (IF-2025-31857900-APN), no en el articulado principal.]`,

  // ── PROMESA (mediacion prejudicial) ───────────────────────────

  decreto_379_2025:
    `DNU 379/2025 (publicado B.O. 04/06/2025, vigencia 02/09/2025): Establece el Procedimiento de Mediacion Prejudicial en Materia de Salud (PROMESA). Modifica la Ley 26.589 de mediacion prejudicial. Es optativo para el reclamante pero obligatorio para la entidad requerida (OS, prepagas). El mediador debe convocar la primera audiencia dentro de los 5 dias de su designacion. Requiere patrocinio letrado obligatorio (quienes no cuenten con recursos pueden solicitar patrocinio gratuito al Ministerio de Justicia). Se aplica a controversias con entidades comprendidas en las Leyes 23.660, 23.661 y 26.682. Reglamentado por Resolucion Conjunta 1/2025 (Min. Justicia y Min. Salud). [Fuente: boletinoficial.gob.ar/detalleAviso/primera/326414/20250604 — InfoLEG id 413574]`,

  // ── Jurisprudencia (pendiente de fallos especificos) ──────────

  jurisprudencia_sensor_cgm:
    `Jurisprudencia en materia de sensores CGM: Camaras Federales de Salta (02/2025, MJ-JU-M-117780-AR) y Mendoza (04/2021, MJ-JU-M-131834-AR) han ordenado a obras sociales cubrir sensores de monitoreo continuo de glucosa, fundamentando en la Ley 23.753/26.914 y el derecho a la salud del Art. 42 CN. Desde la Res. 2091/2025, la cobertura de sensores flash tiene base normativa directa. [Fuentes: Microjuris Argentina, aldiaargentina.microjuris.com]`,

  jurisprudencia_piso:
    `Principio jurisprudencial establecido: "El PMO constituye un piso de prestaciones minimas y no un techo." Las obras sociales y prepagas no pueden usar el PMO para denegar cobertura de tratamientos medicamente necesarios. Principio sostenido por la Camara Nacional de Apelaciones en lo Civil y Comercial Federal (Sala III, "B. J. G. c/ OSPLAD", 16/07/2015), la Camara Federal de Resistencia (causa 3528/2024), y respaldado por la CSJN en Fallos 316:479 y 323:1339 ("Asociacion Benghalensis"). [Fuentes: Microjuris MJ-JU-M-95429-AR, Diario Judicial diariojudicial.com/note/101443]`,
};

// ── Selector de textos legales por patologia y situacion ────────

export function getTextosParaCarta(patologiaId) {
  const base = [
    textosLegales.constitucion_art42,
    textosLegales.constitucion_art43,
    textosLegales.ley_26682,
    textosLegales.ley_23660,
    textosLegales.jurisprudencia_piso,
  ];

  if (patologiaId === PATOLOGIA.ONCOLOGIA) {
    base.push(
      textosLegales.pmo_art73,
      textosLegales.pmo_art74,
      textosLegales.res_3377_2022,
      textosLegales.res_1926_2024
    );
  }

  if (patologiaId === PATOLOGIA.DIABETES1) {
    base.push(
      textosLegales.ley_23753_diabetes,
      textosLegales.ley_26914_diabetes,
      textosLegales.res_2091_2025_diabetes,
      textosLegales.jurisprudencia_sensor_cgm
    );
  }

  return base;
}
