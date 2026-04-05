export const cartaDocumento = {
  titulo: "Modelo de Carta Documento",
  descripcion:
    "Antes del amparo, mandar una carta documento a la obra social. En muchos casos resuelve el problema sin llegar a la Justicia.",
  campos: [
    "NOMBRE DEL PACIENTE",
    "DNI",
    "NUMERO DE AFILIADO",
    "OBRA SOCIAL O PREPAGA",
    "DIRECCION DE LA OBRA SOCIAL",
    "TRATAMIENTO SOLICITADO",
    "FECHA DE SOLICITUD ORIGINAL",
    "NOMBRE DEL MEDICO",
    "MATRICULA DEL MEDICO",
    "DIAGNOSTICO",
  ],
  texto: `CARTA DOCUMENTO

De: [NOMBRE DEL PACIENTE], DNI [DNI], con domicilio en [DOMICILIO DEL PACIENTE]
A: [OBRA SOCIAL O PREPAGA], con domicilio en [DIRECCION DE LA OBRA SOCIAL]

OBJETO: SOLICITUD DE COBERTURA DE TRATAMIENTO — [TRATAMIENTO SOLICITADO]

Me dirijo a Uds. en mi caracter de afiliado/a (N° [NUMERO DE AFILIADO]) en relacion a la cobertura del tratamiento de [TRATAMIENTO SOLICITADO], indicado por mi medico tratante Dr/a. [NOMBRE DEL MEDICO] (MP [MATRICULA DEL MEDICO]), segun prescripcion de fecha [FECHA DE SOLICITUD ORIGINAL], para el tratamiento de [DIAGNOSTICO].

El tratamiento prescripto se enmarca en los protocolos aprobados por ANMAT y las guias de practica clinica vigentes, correspondiendo su cobertura integral conforme el Programa Medico Obligatorio (Res. 201/2002, punto 7.3: medicamentos oncologicos al 100% segun protocolos aprobados por la autoridad de aplicacion).

Asimismo, la Res. 1926/2024 del Ministerio de Salud exceptua a los tratamientos oncologicos de coseguros.

La jurisprudencia reiterada de la Justicia Federal ha establecido que el PMO constituye un piso de prestaciones minimas, no un techo, y que las obras sociales deben fundar por escrito sus decisiones denegatorias, especificando los motivos medicos, tecnicos y legales que sustentan su negativa.

Solicito se considere la presente peticion y se proceda a autorizar la cobertura conforme la normativa citada, en un plazo razonable.

En caso de no recibir respuesta fundada, me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo.

Sin otro particular, saludo a Uds. atentamente.

[NOMBRE DEL PACIENTE]
DNI [DNI]
Fecha: [FECHA]`,
};

export const jurisprudencia = [
  {
    titulo: "Cobertura de trastuzumab en cancer de mama",
    anio: 2023,
    provincia: "Buenos Aires",
    tribunal: "Juzgado Federal de La Plata",
    resumen:
      "Una paciente con cancer de mama HER2+ obtuvo en 48 horas una medida cautelar que obligo a su prepaga a cubrir trastuzumab despues de que lo negaran. El argumento fue el derecho a la salud garantizado por el Art. 42 de la Constitucion Nacional y la indicacion medica clara.",
    resultado: "Favorable al paciente",
  },
  {
    titulo: "Panel genomico NGS para cancer de pulmon",
    anio: 2022,
    provincia: "CABA",
    tribunal: "Camara Federal de Apelaciones",
    resumen:
      "Un paciente con cancer de pulmon avanzado logro que su obra social cubriera un panel genomico NGS (no incluido en el PMO) porque su oncologo demostro que era necesario para determinar el tratamiento dirigido adecuado. La Camara confirmo que el PMO es un piso minimo, no un techo.",
    resultado: "Favorable al paciente",
  },
  {
    titulo: "Inmunoterapia en cancer colorrectal",
    anio: 2023,
    provincia: "Cordoba",
    tribunal: "Juzgado Federal de Cordoba",
    resumen:
      "Paciente con cancer colorrectal MSI-H obtuvo cobertura de pembrolizumab en primera linea. La obra social argumentaba que no estaba en el PMO para esa indicacion, pero el juez priorizo la evidencia cientifica (guias NCCN) y el derecho a la salud.",
    resultado: "Favorable al paciente",
  },
  {
    titulo: "Medicacion oncologica de alto costo en hospital publico",
    anio: 2021,
    provincia: "Tucuman",
    tribunal: "Juzgado Federal de Tucuman",
    resumen:
      "Una paciente sin obra social logro por amparo que el Estado provincial le proveyera olaparib para cancer de ovario BRCA+. El juez ordeno al Ministerio de Salud provincial garantizar la provision del medicamento.",
    resultado: "Favorable al paciente",
  },
];
