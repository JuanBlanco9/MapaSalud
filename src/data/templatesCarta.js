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

  if (tipoDocumento === "pedir_negativa") {
    return `${fecha}

A la Direccion Medica de ${os}:

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) a fin de solicitar formalmente que se me entregue por escrito la negativa a la cobertura del tratamiento de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]) para el tratamiento de ${diag}.

Dicho tratamiento fue solicitado con fecha ${fechaSol} y la negativa me fue comunicada verbalmente por [COMPLETAR NOMBRE O AREA], sin que se me haya entregado documentacion formal al respecto.

De acuerdo con la normativa vigente, tengo derecho a recibir por escrito los fundamentos de cualquier negativa a la cobertura de prestaciones medicas. La falta de respuesta por escrito sera considerada como negativa tacita a los fines de iniciar las acciones legales correspondientes.

Solicito que la respuesta formal sea emitida dentro de las 48 (cuarenta y ocho) horas de recibida la presente.

Queda Ud. debidamente notificado/a.

[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  if (tipoDocumento === "seguimiento") {
    return `${fecha}

A la Direccion Medica / Auditoria Medica de ${os}:

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) en relacion a la solicitud de cobertura del tratamiento de ${tratamiento}, presentada con fecha ${fechaSol}, para el tratamiento de ${diag}, indicado por el Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]).

Habiendo transcurrido mas de 5 (cinco) dias habiles desde la presentacion de la solicitud sin haber recibido respuesta formal de vuestra parte, solicito se expidan a la brevedad sobre la autorizacion requerida.

De conformidad con el Art. 7.3 del Programa Medico Obligatorio (Res. 201/2002), los medicamentos oncologicos segun protocolos aprobados por ANMAT tienen cobertura del 100%. La demora injustificada en la autorizacion vulnera mi derecho a la salud consagrado en el Art. 42 de la Constitucion Nacional.

De no recibir respuesta dentro de las 48 (cuarenta y ocho) horas, me reservo el derecho de iniciar las acciones administrativas ante la Superintendencia de Servicios de Salud y/o la accion de amparo prevista en el Art. 43 de la Constitucion Nacional.

Queda Ud. debidamente intimado/a.

[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  if (tipoDocumento === "intimacion_entrega") {
    return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: INTIMACION A ENTREGA DE TRATAMIENTO AUTORIZADO

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) a fin de intimarles fehacientemente para que en el plazo improrrogable de CUARENTA Y OCHO (48) HORAS procedan a la efectiva entrega del tratamiento de ${tratamiento}, el cual fue debidamente autorizado con fecha [COMPLETAR FECHA DE AUTORIZACION] para el tratamiento de ${diag}.

A pesar de contar con la autorizacion correspondiente, a la fecha no se ha concretado la entrega del tratamiento/medicamento, poniendo en riesgo mi salud y configurando un incumplimiento de las obligaciones a vuestro cargo.

De no dar cumplimiento en el plazo indicado, me reservo el derecho de iniciar la accion de amparo prevista en el Art. 43 de la Constitucion Nacional, con mas los danos y perjuicios que su conducta omisiva me ocasione.

Queda Ud. debidamente intimado/a.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
  }

  // Default: carta_documento — bifurca por patologia
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

  // Oncologia / generico
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
