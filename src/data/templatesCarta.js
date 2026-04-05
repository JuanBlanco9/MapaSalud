// ── Templates de reclamo — base legal diferenciada por nivel de cobertura ──

import { TIPO_DOCUMENTO, PATOLOGIA, NIVEL_COBERTURA } from "../constants";

const fecha = new Date().toLocaleDateString("es-AR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// ── Clasificacion de cobertura para argumentacion legal ────────
// "cubierto" = listado oficial nacional o ley especifica
// "pba"      = listado complementario provincial Buenos Aires (IPC)
// "gestion"  = no en listados oficiales, requiere argumento jurisprudencial
const NIVELES_CUBIERTOS = [NIVEL_COBERTURA.NACIONAL, NIVEL_COBERTURA.LEY, NIVEL_COBERTURA.PMO];

function clasificarCobertura(nivel) {
  if (NIVELES_CUBIERTOS.includes(nivel)) return "cubierto";
  if (nivel === NIVEL_COBERTURA.PBA) return "pba";
  return "gestion";
}

// ── Fundamentos legales por patologia y cobertura ──────────────

function fundamentoOncologia(tipo) {
  if (tipo === "cubierto") {
    return `El tratamiento prescripto se encuentra incluido en los listados oficiales de medicamentos oncologicos (Res. 3377/2022 — Listado Complementario), correspondiendo su cobertura integral conforme el Programa Medico Obligatorio (Res. 201/2002, Anexo I, punto 7.3: medicamentos oncologicos al 100% segun protocolos aprobados por la autoridad de aplicacion).

Asimismo, la Res. 1926/2024 del Ministerio de Salud establece la exencion de coseguros para tratamientos oncologicos. El Art. 42 de la Constitucion Nacional consagra la proteccion de la salud en la relacion de consumo.`;
  }
  if (tipo === "pba") {
    return `El tratamiento prescripto se encuentra incluido en el listado complementario provincial de Buenos Aires (IPC — Inclusion de Prestaciones de Cobertura), correspondiendo su cobertura para afiliados en la jurisdiccion de la Provincia de Buenos Aires. Asimismo, el Programa Medico Obligatorio (Res. 201/2002, Anexo I, punto 7.3) establece la cobertura integral de medicamentos oncologicos.

La Res. 1926/2024 establece la exencion de coseguros para tratamientos oncologicos. El Art. 42 de la Constitucion Nacional consagra la proteccion de la salud en la relacion de consumo.`;
  }
  // gestion
  return `El tratamiento prescripto ha sido indicado por el medico tratante como medicamente necesario para mi cuadro clinico. Si bien el medicamento no se encuentra actualmente en los listados oficiales de cobertura obligatoria (Res. 3377/2022), la CSJN ha establecido que el PMO constituye un piso de prestaciones minimas, no un techo ("Asociacion Benghalensis c/ Ministerio de Salud", Fallos 323:1339). En el mismo sentido, la Justicia Federal ha sostenido este criterio (CNACAF Sala III, "B. J. G. c/ OSPLAD", 16/07/2015).

La Res. 1926/2024 establece la exencion de coseguros para tratamientos oncologicos. El Art. 42 de la Constitucion Nacional consagra la proteccion de la salud en la relacion de consumo.`;
}

function fundamentoDiabetes(tipo) {
  if (tipo === "cubierto") {
    return `El tratamiento prescripto se enmarca en la normativa vigente sobre diabetes:

- Ley 23.753 Art. 5: establece la cobertura del 100% de medicamentos y reactivos de diagnostico para autocontrol.
- Ley 26.914 (modifica Ley 23.753): amplia la cobertura. La jurisprudencia ha interpretado que incluye sistemas de monitoreo continuo de glucosa.
- Res. 2091/2025: establece la cobertura del 100% de sensores de monitoreo flash para personas insulinodependientes.
- Art. 42 de la Constitucion Nacional (proteccion de la salud).`;
  }
  if (tipo === "pba") {
    return `El tratamiento prescripto se encuentra incluido en el listado complementario provincial de Buenos Aires (IPC) y se enmarca en la normativa vigente sobre diabetes:

- Ley 23.753 Art. 5: cobertura del 100% de medicamentos y reactivos.
- Ley 26.914 (modifica Ley 23.753): amplia la cobertura.
- Art. 42 de la Constitucion Nacional (proteccion de la salud).`;
  }
  // gestion
  return `El tratamiento prescripto ha sido indicado por el medico tratante como medicamente necesario para el control de mi diabetes tipo 1. Si bien el insumo o dispositivo no se encuentra actualmente en los listados de cobertura obligatoria, la Ley 23.753 Art. 5 establece la cobertura integral de la diabetes. La CSJN ha establecido que el PMO constituye un piso de prestaciones minimas, no un techo ("Asociacion Benghalensis c/ Ministerio de Salud", Fallos 323:1339). En el mismo sentido, la Justicia Federal ha sostenido este criterio (CNACAF Sala III, "B. J. G. c/ OSPLAD", 16/07/2015).

- Art. 42 de la Constitucion Nacional (proteccion de la salud).
- Ley 23.753 / 26.914 (marco legal diabetes).`;
}

function getFundamento(patologiaId, tipoCobertura) {
  if (patologiaId === PATOLOGIA.DIABETES1) return fundamentoDiabetes(tipoCobertura);
  return fundamentoOncologia(tipoCobertura);
}

// ── Base legal resumida para PROMESA ───────────────────────────

function getBaseLegalPromesa(patologiaId, tipoCobertura) {
  if (patologiaId === PATOLOGIA.DIABETES1) {
    if (tipoCobertura === "cubierto") return `Ley 23.753 Art. 5 (cobertura integral diabetes), Ley 26.914, y Res. 2091/2025 (sensores flash al 100%)`;
    if (tipoCobertura === "pba") return `Ley 23.753 Art. 5 (cobertura integral diabetes), Ley 26.914, e IPC provincial Buenos Aires`;
    return `Ley 23.753 Art. 5 (cobertura integral diabetes), Ley 26.914, Art. 42 CN, y jurisprudencia de la CSJN que establece el PMO como piso minimo (Fallos 323:1339, "Asociacion Benghalensis"). El tratamiento es medicamente necesario segun prescripcion del medico tratante`;
  }
  if (tipoCobertura === "cubierto") return `PMO Res. 201/2002 Anexo I punto 7.3 (medicamentos oncologicos al 100%), Res. 3377/2022 (Listado Complementario), y Res. 1926/2024 (exencion de coseguros)`;
  if (tipoCobertura === "pba") return `PMO Res. 201/2002 Anexo I punto 7.3, IPC provincial Buenos Aires (listado complementario), y Res. 1926/2024 (exencion de coseguros)`;
  return `Art. 42 CN, Res. 1926/2024 (exencion de coseguros oncologicos), y jurisprudencia de la CSJN que establece el PMO como piso minimo (Fallos 323:1339, "Asociacion Benghalensis"). El tratamiento es medicamente necesario segun prescripcion del medico tratante`;
}

// ── Referencia legal breve para seguimiento ───────────────────

function getRefSeguimiento(patologiaId, tipoCobertura) {
  if (tipoCobertura === "cubierto") {
    if (patologiaId === PATOLOGIA.DIABETES1) return "se enmarca en la Ley 23.753, la Ley 26.914 y la Res. 2091/2025, que establecen la cobertura integral de la diabetes";
    return "se encuentra incluido en los listados oficiales de medicamentos oncologicos (Res. 3377/2022) y el PMO (Res. 201/2002, Anexo I, punto 7.3)";
  }
  if (tipoCobertura === "pba") {
    return "se encuentra incluido en el listado complementario provincial (IPC Buenos Aires) y el PMO";
  }
  return "ha sido indicado como medicamente necesario por mi medico tratante";
}

// ── Templates ──────────────────────────────────────────────────

export function generarTemplateFallback({
  obraSocial,
  plan,
  diagnostico,
  subtipo,
  tratamiento,
  fechaSolicitud,
  tipoDocumento,
  patologiaId,
  nivelCobertura,
}) {
  const os = `${obraSocial}${plan ? ` (${plan})` : ""}`;
  const fechaSol = fechaSolicitud || "[COMPLETAR FECHA]";
  const diag = `${diagnostico}${subtipo ? ` — ${subtipo}` : ""}`;
  const tipoCobertura = clasificarCobertura(nivelCobertura);

  // ── Email: pedir negativa por escrito ──────────────────────
  if (tipoDocumento === TIPO_DOCUMENTO.PEDIR_NEGATIVA) {
    return `${fecha}

A la Direccion Medica de ${os}:

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la cobertura del tratamiento de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]) para el tratamiento de ${diag}.

Dicho tratamiento fue solicitado con fecha ${fechaSol}. La negativa me fue comunicada verbalmente, sin que se me haya entregado documentacion formal al respecto.

De acuerdo con la normativa vigente, tengo derecho a recibir por escrito los fundamentos de cualquier decision denegatoria de cobertura de prestaciones medicas. Las obras sociales y prepagas tienen la obligacion de fundar sus decisiones especificando los motivos medicos, tecnicos y legales que las sustentan.

Solicito que la respuesta formal, debidamente fundada, sea emitida en un plazo razonable.

En caso de no recibir respuesta, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // ── Email: seguimiento por falta de respuesta ─────────────
  if (tipoDocumento === TIPO_DOCUMENTO.SEGUIMIENTO) {
    return `${fecha}

A la Direccion Medica / Auditoria Medica de ${os}:

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la solicitud de cobertura del tratamiento de ${tratamiento}, presentada con fecha ${fechaSol}, para el tratamiento de ${diag}, indicado por el Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]).

Habiendo transcurrido un plazo razonable desde la presentacion de la solicitud sin haber recibido respuesta formal de vuestra parte, solicito se expidan sobre la autorizacion requerida.

El tratamiento prescripto ${getRefSeguimiento(patologiaId, tipoCobertura)}. La demora en la autorizacion afecta mi derecho a la proteccion de la salud consagrado en el Art. 42 de la Constitucion Nacional.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // ── Carta documento: tratamiento aprobado pero no entregado
  if (tipoDocumento === TIPO_DOCUMENTO.INTIMACION_ENTREGA) {
    return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE COMPLETO], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: INTIMACION A LA ENTREGA DE TRATAMIENTO AUTORIZADO — ${tratamiento.toUpperCase()}

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion al tratamiento de ${tratamiento}, el cual fue debidamente autorizado con fecha [COMPLETAR FECHA DE AUTORIZACION] para el tratamiento de ${diag}.

A pesar de contar con la autorizacion correspondiente, a la fecha no se ha concretado la provision efectiva del tratamiento, situacion que afecta mi derecho a la salud y al acceso oportuno al tratamiento prescripto por mi medico tratante.

La CSJN ha establecido la obligacion de las obras sociales de garantizar el acceso efectivo y oportuno a las prestaciones de salud ("Asociacion Benghalensis c/ Ministerio de Salud", Fallos 323:1339).

Intimo a que se proceda a la entrega efectiva del tratamiento en un plazo de 48 horas.

En caso de incumplimiento, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // ── Hospital publico: nota al Director del hospital ────────
  if (tipoDocumento === TIPO_DOCUMENTO.RECLAMO_PUBLICO) {
    return `${fecha}

Al Sr/a Director/a del [COMPLETAR NOMBRE DEL HOSPITAL]
[COMPLETAR DIRECCION DEL HOSPITAL]

OBJETO: SOLICITUD DE PROVISION DE ${tratamiento.toUpperCase()}

Me dirijo a Ud. en mi caracter de paciente atendido en ese establecimiento, a fin de solicitar formalmente la provision de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]) para el tratamiento de ${diag}.

El tratamiento prescripto resulta medicamente necesario segun criterio del equipo tratante. La obligacion del Estado de garantizar el acceso a la salud se encuentra consagrada en:

- Art. 42 de la Constitucion Nacional (proteccion de la salud)
- Art. 75 inc. 22 de la Constitucion Nacional (tratados internacionales con jerarquia constitucional, incluyendo el Pacto Internacional de Derechos Economicos, Sociales y Culturales — Art. 12, derecho a la salud)
- La CSJN ha establecido que el Estado es garante subsidiario del derecho a la salud: "Campodonico de Beviacqua, Ana Carina c/ Ministerio de Salud y Accion Social" (CSJN, Fallos 323:3229, 24/10/2000)

Solicito que se gestione la provision del tratamiento a traves del Banco Nacional de Drogas Especiales (BNDE) o del programa provincial correspondiente, y que se me informe por escrito el estado de la gestion en un plazo razonable.

En caso de no obtener respuesta, me reservo el derecho de recurrir a la Defensoria del Pueblo y a la via judicial de amparo contra el Estado.

Sin otro particular, saludo a Ud. atentamente.

[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]

Copia a: Servicio Social del hospital`;
  }

  // ── PROMESA: resumen del caso para abogado ────────────────
  if (tipoDocumento === TIPO_DOCUMENTO.PROMESA) {
    return `RESUMEN DEL CASO PARA PRESENTAR A TU ABOGADO — PROMESA
DNU 379/2025 — Procedimiento de Mediacion Prejudicial en Materia de Salud

NOTA: Este documento es un resumen de tu caso para facilitar la consulta con un abogado. El procedimiento PROMESA requiere patrocinio letrado obligatorio. Tu abogado usara estos datos como base para redactar la solicitud definitiva.

Datos del requirente:
Nombre: [COMPLETAR NOMBRE COMPLETO]
DNI: [COMPLETAR]
Domicilio: [COMPLETAR DOMICILIO]
Email: [COMPLETAR]
Telefono: [COMPLETAR]
Abogado patrocinante: [COMPLETAR NOMBRE DEL ABOGADO]
Matricula: [COMPLETAR]

Entidad requerida:
${os}
Domicilio: [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: Solicitud de mediacion prejudicial por denegacion/demora en la cobertura de ${tratamiento} para el tratamiento de ${diag}.

ANTECEDENTES:

1. El/la requirente es afiliado/a de ${os} (N° [COMPLETAR NUMERO DE AFILIADO]).

2. Con fecha ${fechaSol}, se solicito formalmente la cobertura de ${tratamiento}, indicado por el/la Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]).

3. La entidad requerida [no respondio en plazo razonable / denego la cobertura verbalmente / denego la cobertura por escrito / aprobo pero no provee el tratamiento].

FUNDAMENTO LEGAL:

El tratamiento solicitado se enmarca en la normativa vigente: ${getBaseLegalPromesa(patologiaId, tipoCobertura)}

PRETENSION:

Se solicita que en el marco del procedimiento de mediacion PROMESA (DNU 379/2025), la entidad requerida autorice y provea la cobertura integral de ${tratamiento} conforme prescripcion medica.

DOCUMENTACION ADJUNTA:
- Prescripcion medica de ${tratamiento} (Dr/a. [COMPLETAR NOMBRE DEL MEDICO])
- Constancia de afiliacion
- Constancia de solicitud previa (fecha ${fechaSol})
- [Negativa por escrito de la entidad, si la tiene]
- Historia clinica resumida
- Estudios complementarios relevantes

Sin otro particular, saludo a Uds. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]

Firma del abogado patrocinante:
[COMPLETAR]
Matricula: [COMPLETAR]

NOTA: Consultar con tu abogado el canal de presentacion vigente. La SSS informa sobre el procedimiento en sssalud.gob.ar.

SI NO TENES ABOGADO: Podes solicitar patrocinio juridico gratuito en la Defensoria del Pueblo de tu provincia o en el Ministerio Publico de la Defensa (mpd.gov.ar). Tambien podes consultar a organizaciones como LALCEC (0800-222-1166) o CUI.D.AR ((011) 4732-9000) que orientan sobre asistencia legal.

Consultas sobre PROMESA: consultasmediacion@jus.gob.ar`;
  }

  // ── Carta documento: por patologia ────────────────────────
  if (tipoDocumento === TIPO_DOCUMENTO.CARTA_DOCUMENTO) {
    const esdiab = patologiaId === PATOLOGIA.DIABETES1;
    const fundamento = getFundamento(patologiaId, tipoCobertura);
    const objeto = esdiab
      ? `SOLICITUD DE COBERTURA DE ${tratamiento.toUpperCase()} — DIABETES TIPO 1`
      : `SOLICITUD DE COBERTURA DE TRATAMIENTO — ${tratamiento.toUpperCase()}`;

    return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE COMPLETO], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: ${objeto}

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la cobertura de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]), segun prescripcion de fecha ${fechaSol}, para el tratamiento de ${diag}.

${fundamento}

Las obras sociales y prepagas deben fundar por escrito sus decisiones denegatorias, especificando los motivos medicos, tecnicos y legales que las sustentan.

Solicito se considere la presente peticion y se proceda a autorizar la cobertura en un plazo razonable.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // Si llegamos aca, tipo de documento no reconocido
  return `[Error: tipo de documento "${tipoDocumento}" no reconocido. Contactar soporte en github.com/JuanBlanco9/MapaSalud/issues]`;
}
