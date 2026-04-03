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

  // Default: carta_documento
  return `CARTA DOCUMENTO

De: [COMPLETAR NOMBRE], DNI [COMPLETAR], con domicilio en [COMPLETAR DOMICILIO]
A: ${os}, con domicilio en [COMPLETAR DIRECCION DE LA OBRA SOCIAL]

OBJETO: INTIMACION A COBERTURA DE TRATAMIENTO — ${tratamiento.toUpperCase()}

Me dirijo a Uds. en mi caracter de afiliado/a (N° [COMPLETAR NUMERO DE AFILIADO]) a fin de intimarles fehacientemente para que en el plazo improrrogable de CUARENTA Y OCHO (48) HORAS procedan a autorizar y brindar cobertura integral del tratamiento de ${tratamiento}, indicado por mi medico tratante Dr/a. [COMPLETAR NOMBRE DEL MEDICO] (MP [COMPLETAR MATRICULA]), segun prescripcion de fecha ${fechaSol}, para el tratamiento de ${diag}.

Dicho tratamiento se encuentra contemplado en el Programa Medico Obligatorio (Res. 201/2002, Art. 7.3) y en el Listado Complementario de Medicamentos Oncologicos (Res. 3377/2022), resultando medicamente necesario y urgente segun criterio de mi medico tratante.

Hago saber que la negativa de su parte vulnera mis derechos consagrados en:
- Art. 42 de la Constitucion Nacional (derecho a la salud)
- Art. 43 de la Constitucion Nacional (accion de amparo)
- Ley 26.682 (Marco regulatorio de medicina prepaga)
- Ley 23.660 (Obras Sociales)
- Res. 1926/2024 (exencion de coseguros para oncologia)

La jurisprudencia argentina ha establecido reiteradamente que el PMO constituye un piso de prestaciones minimas y no un techo, debiendo las obras sociales cubrir tratamientos con indicacion medica aun cuando no esten expresamente incluidos en el listado.

De no dar cumplimiento en el plazo indicado, me reservo el derecho de iniciar la accion de amparo prevista en el Art. 43 de la Constitucion Nacional, con mas los danos y perjuicios que su conducta omisiva me ocasione, incluyendo dano moral.

Queda Ud. debidamente intimado/a.

${fecha}
[COMPLETAR NOMBRE COMPLETO]
DNI [COMPLETAR]`;
}
