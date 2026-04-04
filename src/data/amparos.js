export const queEsUnAmparo = {
  titulo: "Que es un amparo de salud",
  descripcion:
    "Un amparo de salud es una accion legal que podes iniciar cuando tu obra social o prepaga te niega un tratamiento. Puede ser gratuito si usas un defensor publico. Segun datos del Registro Nacional de Amparos, mas del 80% de los fallos judiciales en salud han sido favorables al paciente.",
  destacados: [
    {
      icono: "clock",
      titulo: "24-72 horas",
      texto: "Tiempo de resolucion de la medida cautelar en CABA en casos urgentes",
    },
    {
      icono: "scale",
      titulo: "Mas del 80% favorables",
      texto:
        "Mas del 80% de los fallos de amparo en salud han sido favorables al paciente segun registros publicos (OLEGISAR)",
    },
    {
      icono: "wallet",
      titulo: "Puede ser gratuito",
      texto:
        "Con el Defensor del Pueblo o con organizaciones de pacientes no tiene costo",
    },
  ],
};

export const cuandoIniciar = [
  "La obra social nego el tratamiento por escrito",
  "Pasaron mas de 5 dias habiles sin respuesta a una solicitud",
  "Aprobaron el tratamiento pero no lo entregan",
  "El medico indico el tratamiento pero auditoria medica lo rechazo",
  "La obra social pide estudios o requisitos que el medico ya cumplio",
];

export const pasoAPaso = [
  {
    numero: 1,
    titulo: "Consegui la negativa por escrito",
    descripcion:
      'Si te negaron verbalmente o por telefono, manda un email o carta documento pidiendo la negativa por escrito. Tienen obligacion de dartela. Si no responden en 48 horas, eso tambien cuenta como negativa.',
    tip: "Guarda capturas de pantalla de mensajes, mails, y anota fecha y hora de llamadas telefonicas.",
  },
  {
    numero: 2,
    titulo: "Junta la documentacion",
    descripcion:
      "Necesitas reunir toda la documentacion medica y administrativa. La lista completa esta mas abajo en esta pagina.",
    tip: "Pedi a tu medico un informe que explique por que el tratamiento es necesario y urgente. Esto es clave para el juez.",
  },
  {
    numero: 3,
    titulo: "Elegi como hacerlo",
    descripcion:
      "Tenes tres opciones: Defensor del Pueblo (gratis), organizacion de pacientes (gratis), o abogado particular (pago). Mas abajo te explicamos cada una.",
    tip: "Si tu caso es urgente (el tratamiento no puede esperar), un abogado particular suele ser mas rapido.",
  },
  {
    numero: 4,
    titulo: "Presenta el amparo",
    descripcion:
      "Se presenta en el juzgado federal de tu jurisdiccion. Si vas con abogado o defensor, ellos se encargan. Junto con el amparo se pide una medida cautelar para que la cobertura sea inmediata mientras dura el juicio.",
    tip: "La medida cautelar es lo mas importante: obliga a la obra social a cubrir el tratamiento YA, sin esperar a que termine el juicio.",
  },
  {
    numero: 5,
    titulo: "El juez decide",
    descripcion:
      "En CABA, la medida cautelar en casos urgentes se ha resuelto en 24 a 72 horas segun registros. En otras jurisdicciones puede demorar mas. El juicio de fondo puede tardar meses, pero con la cautelar ya tenes la cobertura.",
    tip: "Una vez que el juez ordena la cobertura, la obra social esta obligada a cumplir. Si no cumple, hay sanciones.",
  },
];

export const documentacionNecesaria = [
  { item: "DNI del paciente", detalle: "Original y copia" },
  {
    item: "Carnet de la obra social o prepaga",
    detalle: "O constancia de afiliacion",
  },
  {
    item: "Receta o indicacion medica firmada",
    detalle: "Del medico tratante, con matricula",
  },
  {
    item: "Negativa por escrito de la obra social",
    detalle: "O constancia de que no respondieron en plazo",
  },
  {
    item: "Presupuesto del tratamiento o medicamento",
    detalle: "De la farmacia o centro medico",
  },
  {
    item: "Historia clinica relevante",
    detalle: "Resumen firmado por el medico",
  },
  {
    item: "Informe medico de necesidad y urgencia",
    detalle:
      "Explicando por que el tratamiento es necesario, por que es urgente, y que pasa si no se realiza",
  },
];

export const formasDeHacerlo = [
  {
    opcion: "A",
    titulo: "Defensor del Pueblo",
    costo: "GRATIS",
    costoDetalle: null,
    quien: "Defensoria del Pueblo de tu provincia",
    cuandoConviene: "Siempre intentar primero",
    como: "Ir personalmente con la documentacion o iniciar tramite por web de cada defensoria",
    tiempo: "Variable, puede ser mas lento que un abogado",
    ventaja: "Sin costo, asesoran en todo el proceso",
    desventaja: "Puede demorar mas en casos no urgentes",
  },
  {
    opcion: "B",
    titulo: "Abogado particular",
    costo: "PAGO",
    costoDetalle: "$50.000 - $200.000 ARS aproximado (honorarios variables, abril 2026)",
    quien: "Abogado especializado en derecho de la salud",
    cuandoConviene: "Casos urgentes o complejos",
    como: "Buscar abogado con experiencia en amparos de salud",
    tiempo: "Generalmente mas rapido: 24-72 horas para la cautelar",
    ventaja: "Mas rapido y personalizado",
    desventaja: "Tiene costo",
  },
  {
    opcion: "C",
    titulo: "Organizaciones de pacientes",
    costo: "GRATIS",
    costoDetalle: null,
    quien: "LALCEC, FUCA, Fundacion Cancer, CUI.D.AR (diabetes), FADEPOF (enf. poco frecuentes)",
    cuandoConviene:
      "Si no podes pagar abogado y la defensoria demora",
    como: "Contactar a la organizacion, te asesoran y en algunos casos actuan directamente",
    tiempo: "Variable",
    ventaja: "Gratuito, experiencia especifica en salud",
    desventaja: "Capacidad limitada, no siempre pueden tomar el caso",
  },
];

export const preguntasFrecuentes = [
  {
    pregunta: "Que pasa si pierdo el amparo?",
    respuesta:
      "Segun registros publicos (OLEGISAR), mas del 80% de los amparos de salud con indicacion medica se han resuelto favorablemente. Si el resultado no es favorable, podes apelar. Ademas, la medida cautelar ya te habra dado cobertura durante el proceso. Perder el amparo no genera costos adicionales si fuiste con defensor publico.",
  },
  {
    pregunta: "Puedo hacer el amparo mientras sigo el tratamiento actual?",
    respuesta:
      "Si. El amparo no interrumpe ningun tratamiento en curso. De hecho, es lo recomendable: seguir con lo que tengas mientras buscas la cobertura de lo que necesitas.",
  },
  {
    pregunta: "La obra social me puede dar de baja por hacer un amparo?",
    respuesta:
      "No. Es ilegal. Darte de baja como represalia por un amparo esta prohibido por ley y seria motivo de otro reclamo judicial con indemnizacion.",
  },
  {
    pregunta: "Cuanto tarda realmente?",
    respuesta:
      "La medida cautelar (lo urgente) tarda entre 24 y 72 horas en CABA, y entre 3 y 10 dias en el interior. El juicio completo puede tardar meses, pero con la cautelar ya tenes la cobertura mientras tanto.",
  },
  {
    pregunta: "Necesito ir a tribunales?",
    respuesta:
      "Generalmente no. Tu abogado o el defensor se encargan de todo. Vos solo tenes que firmar el escrito y aportar la documentacion.",
  },
  {
    pregunta: "Que es una medida cautelar y por que es importante?",
    respuesta:
      "Es una orden del juez que obliga a la obra social a cubrirte el tratamiento de forma inmediata, sin esperar a que termine el juicio. Es lo mas importante del amparo porque te da la cobertura ahora, cuando la necesitas.",
  },
];
