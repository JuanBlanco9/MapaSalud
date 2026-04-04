// ── Templates fallback — se usan si la API falla ────────────────

const fecha = new Date().toLocaleDateString("es-AR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function generarTemplateFallback({
  obraSocial,
  plan,
  diagnostico,
  subtipo,
  tratamiento,
  fechaSolicitud,
  tipoDocumento,
  patologiaId,
}) {
  const os = `${obraSocial}${plan ? ` (${plan})` : ""}`;
  const fechaSol = fechaSolicitud || "[COMPLETAR FECHA]";
  const diag = `${diagnostico}${subtipo ? ` — ${subtipo}` : ""}`;

  // ── Email: pedir negativa por escrito ──────────────────────
  if (tipoDocumento === "pedir_negativa") {
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
  if (tipoDocumento === "seguimiento") {
    return `${fecha}

A la Direccion Medica / Auditoria Medica de ${os}:

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la solicitud de cobertura del tratamiento de ${tratamiento}, presentada con fecha ${fechaSol}, para el tratamiento de ${diag}, indicado por el Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]).

Habiendo transcurrido un plazo razonable desde la presentacion de la solicitud sin haber recibido respuesta formal de vuestra parte, solicito se expidan sobre la autorizacion requerida.

El tratamiento prescripto se enmarca en ${patologiaId === "diabetes1" ? "la Ley 23.753, la Ley 26.914 y la Res. 2091/2025, que establecen la cobertura integral de la diabetes incluyendo medicacion, insumos, equipos y dispositivos" : "los protocolos aprobados por ANMAT y el Programa Medico Obligatorio (Res. 201/2002, punto 7.3), que establece la cobertura integral de medicamentos oncologicos"}. La demora en la autorizacion afecta mi derecho a la salud consagrado en el Art. 42 de la Constitucion Nacional.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // ── Carta documento: tratamiento aprobado pero no entregado
  if (tipoDocumento === "intimacion_entrega") {
    return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: SOLICITUD DE ENTREGA DE TRATAMIENTO AUTORIZADO — ${tratamiento.toUpperCase()}

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion al tratamiento de ${tratamiento}, el cual fue debidamente autorizado con fecha [COMPLETAR FECHA DE AUTORIZACION] para el tratamiento de ${diag}.

A pesar de contar con la autorizacion correspondiente, a la fecha no se ha concretado la provision efectiva del tratamiento, situacion que afecta mi derecho a la salud y al acceso oportuno al tratamiento prescripto por mi medico tratante.

La jurisprudencia reiterada de la Justicia Federal ha establecido que la demora injustificada en la provision de tratamientos autorizados configura un incumplimiento de las obligaciones legales a cargo de la obra social o prepaga.

Solicito se proceda a la entrega efectiva del tratamiento en un plazo razonable.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // ── Hospital publico: nota al Director del hospital ────────
  if (tipoDocumento === "reclamo_publico") {
    return `${fecha}

Al Sr/a Director/a del [COMPLETAR NOMBRE DEL HOSPITAL]
[COMPLETAR DIRECCION DEL HOSPITAL]

OBJETO: SOLICITUD DE PROVISION DE ${tratamiento.toUpperCase()}

Me dirijo a Ud. en mi caracter de paciente atendido en ese establecimiento, a fin de solicitar formalmente la provision de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]) para el tratamiento de ${diag}.

El tratamiento prescripto resulta medicamente necesario segun criterio del equipo tratante. La obligacion del Estado de garantizar el acceso a la salud se encuentra consagrada en:

- Art. 42 de la Constitucion Nacional (derecho a la salud)
- Art. 75 inc. 22 de la Constitucion Nacional (tratados internacionales con jerarquia constitucional, incluyendo el Pacto Internacional de Derechos Economicos, Sociales y Culturales — Art. 12, derecho a la salud)
- La CSJN ha establecido que el Estado es garante subsidiario del derecho a la salud: "Campodonico de Beviacqua, Ana Carina c/ Ministerio de Salud y Accion Social" (CSJN, Fallos 323:3229, 24/10/2000)

Solicito que se gestione la provision del tratamiento a traves del Banco Nacional de Drogas Especiales (BNDE) o del programa provincial correspondiente, y que se me informe por escrito el estado de la gestion en un plazo razonable.

En caso de no obtener respuesta, me reservo el derecho de recurrir a la Defensoria del Pueblo y a la via judicial de amparo contra el Estado.

Sin otro particular, saludo a Ud. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]

Copia a: Servicio Social del hospital`;
  }

  // ── PROMESA: solicitud de mediacion prejudicial ────────────
  if (tipoDocumento === "promesa") {
    const baselegal = patologiaId === "diabetes1"
      ? `Ley 23.753 Art. 5 (cobertura integral diabetes), Ley 26.914 (equipos y dispositivos), y Res. 2091/2025 (sensores flash)`
      : `PMO Res. 201/2002 punto 7.3 (medicamentos oncologicos al 100%), Res. 3377/2022 (Listado Complementario), y Res. 1926/2024 (exencion de coseguros)`;

    return `SOLICITUD DE MEDIACION PREJUDICIAL EN MATERIA DE SALUD (PROMESA)
Decreto 379/2025 — Procedimiento de Mediacion Prejudicial en Materia de Salud

Datos del requirente:
Nombre: [COMPLETAR NOMBRE]
DNI: [COMPLETAR]
Domicilio: [COMPLETAR]
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

El tratamiento solicitado se enmarca en la normativa vigente: ${baselegal}

La cobertura corresponde conforme el Art. 42 de la Constitucion Nacional (derecho a la salud) y la Ley 26.682 Art. 7 (cobertura minima PMO para prepagas).

PRETENSION:

Se solicita que en el marco del procedimiento de mediacion PROMESA (Decreto 379/2025), la entidad requerida autorice y provea la cobertura integral de ${tratamiento} conforme prescripcion medica.

DOCUMENTACION ADJUNTA:
- Prescripcion medica de ${tratamiento} (Dr/a. [COMPLETAR])
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

NOTA: Este documento se presenta a traves de la plataforma TAD (tramitesadistancia.gob.ar). Buscar el tramite "Mediacion prejudicial en materia de salud (PROMESA)".

SI NO TENES ABOGADO: Podes solicitar patrocinio juridico gratuito en la Defensoria del Pueblo de tu provincia o en el Ministerio Publico de la Defensa (mpd.gov.ar). Tambien podes consultar a organizaciones como LALCEC (0800-222-1166) o CUI.D.AR ((011) 4732-9000) que orientan sobre asistencia legal.

Consultas sobre PROMESA: consultasmediacion@jus.gob.ar`;
  }

  // ── Carta documento: diabetes tipo 1 ──────────────────────
  if (patologiaId === "diabetes1") {
    return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: SOLICITUD DE COBERTURA DE ${tratamiento.toUpperCase()} — DIABETES TIPO 1

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la cobertura de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]), segun prescripcion de fecha ${fechaSol}, para el tratamiento de ${diag}.

El tratamiento prescripto se enmarca en la normativa vigente sobre diabetes:

- Ley 23.753 Art. 5: establece la cobertura integral de la diabetes, incluyendo medicacion, elementos e insumos necesarios para su tratamiento.
- Ley 26.914 Art. 1 (modifica Ley 23.753): amplia la cobertura incluyendo "equipos y dispositivos", expresion que la jurisprudencia reiterada de la Justicia Federal ha interpretado como inclusiva de los sistemas de monitoreo continuo de glucosa.
- Res. 2091/2025: establece la cobertura del 100% de sensores de monitoreo continuo sistema flash para personas insulinodependientes.
- Art. 42 de la Constitucion Nacional (derecho a la salud).
- Ley 26.682 Art. 7 (cobertura minima PMO para prepagas).

Solicito se considere la presente peticion y se proceda a autorizar la cobertura conforme la normativa citada, en un plazo razonable.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // ── Carta documento: oncologia / generico ──────────────────
  return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: SOLICITUD DE COBERTURA DE TRATAMIENTO — ${tratamiento.toUpperCase()}

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la cobertura del tratamiento de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]), segun prescripcion de fecha ${fechaSol}, para el tratamiento de ${diag}.

El tratamiento prescripto se enmarca en los protocolos aprobados por ANMAT y las guias de practica clinica vigentes, correspondiendo su cobertura integral conforme el Programa Medico Obligatorio (Res. 201/2002, punto 7.3: medicamentos oncologicos al 100% segun protocolos aprobados por la autoridad de aplicacion).

Asimismo, la Res. 1926/2024 del Ministerio de Salud establece la exencion de coseguros para tratamientos oncologicos. La Ley 26.682 Art. 7 obliga a las empresas de medicina prepaga a cubrir como minimo el PMO vigente.

La jurisprudencia reiterada de la Justicia Federal ha establecido que el PMO constituye un piso de prestaciones minimas, no un techo, y que las obras sociales deben fundar por escrito sus decisiones denegatorias, especificando los motivos medicos, tecnicos y legales que sustentan su negativa.

Solicito se considere la presente peticion y se proceda a autorizar la cobertura conforme la normativa citada, en un plazo razonable.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
}
