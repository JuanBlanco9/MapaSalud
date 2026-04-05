// ── Contexto de aplicabilidad de cada fallo ─────────────────────
// Este modulo agrega circunstancias y limitaciones a los fallos
// para que el asistente de IA sepa CUANDO citar cada uno
// y CUANDO NO — evitando que un paciente cite jurisprudencia
// que no aplica a su situacion.
//
// Regla: un fallo es citable cuando las circunstancias del
// paciente son IGUALES o MAS FUERTES que las del fallo.
// Si el fallo fue ganado por circunstancias excepcionales
// (discapacidad, menor, riesgo de vida inminente, droga
// sin ANMAT), no aplica automaticamente a un caso normal.

export const contextoFallos = {
  // ── DIABETES SENSOR ────────────────────────────────────────

  "S.I- H. R. c/ Omint S.A. de Servicios s/ amparo de salud": {
    circunstancias: "Paciente diabetico con prescripcion medica de FreeStyle Libre. Sin circunstancias excepcionales — caso estandar.",
    aplicabilidad: "AMPLIA. Aplica a cualquier diabetico con prescripcion medica de sensor CGM. El fallo se basa en la Ley 26.914 y la cobertura de 'reactivos de autocontrol', no en circunstancias particulares del paciente.",
    nivel: "alto",
  },

  "V. M. E. c/ Obra Social de Empleados Publicos s/ accion de amparo": {
    circunstancias: "Paciente diabetico con prescripcion de FreeStyle Libre. Ventajas cualitativas del CGM para manejo de enfermedad.",
    aplicabilidad: "AMPLIA. Aplica a cualquier diabetico. Fundamento tecnico (ventajas del CGM) es universal.",
    nivel: "alto",
  },

  "[Amparista] c/ PAMI s/ Amparo": {
    // Salta sensor
    circunstancias: "Paciente con diabetes Y discapacidad mental que impide reconocer hipo/hiperglucemia. Doble vulnerabilidad.",
    aplicabilidad: "LIMITADA. El fallo se fortalecio por la discapacidad mental. Un diabetico sin discapacidad puede citarlo pero la OS podria distinguir las circunstancias. Mejor complementar con otros fallos (H.R. c/ Omint, V.M.E. c/ OSEP).",
    nivel: "medio",
  },

  "[Amparista] c/ Medife s/ Amparo de Salud": {
    // CABA sensor feb 2026
    circunstancias: "Paciente con diabetes tipo 1. Fallo posterior a Res. 2091/2025 que ya establecia cobertura de sensores flash.",
    aplicabilidad: "AMPLIA. Post Res. 2091/2025 la cobertura de sensores flash ya es obligatoria por resolucion ministerial. Este fallo es refuerzo.",
    nivel: "alto",
  },

  "B.V.G. c/ Galeno Argentina S.A. s/ amparo de salud": {
    circunstancias: "Paciente con diabetes T1 con prescripcion de FreeStyle Libre. Galeno rechazo cobertura.",
    aplicabilidad: "AMPLIA. Caso estandar de sensor CGM. Ley 23.753/26.914 como fundamento directo.",
    nivel: "alto",
  },

  "M. V. A. c/ IOMA s/ amparo": {
    circunstancias: "Menor con diabetes T1. IOMA ofrecio alternativas inferiores que causaban angustia. Tribunal ordeno FreeStyle Libre especificamente.",
    aplicabilidad: "AMPLIA contra IOMA. Aplica cuando la OS ofrece dispositivo alternativo inferior al prescripto. Principio: el medico tratante elige.",
    nivel: "alto",
  },

  "A. P. A. s/ amparo s/ apelacion (menor con diabetes T1)": {
    circunstancias: "Menor con diabetes T1. Superior Tribunal de Rio Negro ordeno cobertura integral incluyendo sensores, insulinas e insumos.",
    aplicabilidad: "AMPLIA. Fallo de maximo tribunal provincial. Aplica a cualquier menor con diabetes T1.",
    nivel: "alto",
  },

  // ── DIABETES INSULINA ─────────────────────────────────────

  "P., A. A. c/ OSPACA STAFF MEDICO S.A. s/ accion de amparo": {
    circunstancias: "Paciente joven con diabetes. OS rechazo cobertura de medicacion prescripta sin justificacion.",
    aplicabilidad: "AMPLIA. La OS no puede negar cobertura sin justificacion razonable. Voluntarismo no es argumento.",
    nivel: "alto",
  },

  // ── DIABETES BOMBA ─────────────────────────────────────────

  "M. M. E. c/ Instituto Nac. de Serv. Soc. para Jubilados y Pensionados s/ amparo de salud": {
    circunstancias: "Paciente PAMI (jubilado/pensionado). PAMI exigio 3 meses de registros glucemicos como condicion previa — el tribunal lo considero tactica dilatoria.",
    aplicabilidad: "MEDIA. Aplica especialmente contra PAMI y cuando la OS exige requisitos previos excesivos. Para otras OS, el principio de 'tactica dilatoria' es aplicable si la OS impone condiciones no razonables.",
    nivel: "medio",
  },

  "M.A.N. c/ OS Union del Personal Civil de la Nacion s/ Amparo de salud": {
    circunstancias: "La OS ofrecio modelo de bomba distinto al prescripto. El tribunal ordeno el modelo especifico prescripto.",
    aplicabilidad: "AMPLIA. Aplica cuando la OS quiere sustituir la bomba prescripta por el medico con otra marca/modelo. Principio: la prescripcion del tratante prevalece.",
    nivel: "alto",
  },

  "Z., Y. E. c/ Union Personal s/ Amparo": {
    circunstancias: "Mismo caso: OS ofrecio Accu-Check Solo en vez de Medtronic prescripta.",
    aplicabilidad: "AMPLIA. Refuerza que la OS no puede imponer marca/modelo. El medico elige.",
    nivel: "alto",
  },

  // ── ONCOLOGIA DIRIGIDA ─────────────────────────────────────

  "I. J. R. c/ OSDE s/ procesos urgentes (autosatisfactiva)": {
    circunstancias: "Pembrolizumab NO estaba aprobado por ANMAT para cancer renal en Argentina. Si aprobado en EE.UU. y UE. Caso EXCEPCIONAL.",
    aplicabilidad: "MUY LIMITADA. Solo aplica si el medicamento no tiene aprobacion ANMAT pero si tiene aprobacion internacional. Si el medicamento SI tiene aprobacion ANMAT, existen fallos mas directamente aplicables.",
    nivel: "bajo",
  },

  "R. CH., G. c/ Min. Salud Pcia. Salta s/ Amparo": {
    circunstancias: "Volanesorsen para quilomicronemia familiar. Medicamento no registrado en ANMAT, aprobado en UE. Enfermedad rara.",
    aplicabilidad: "MUY LIMITADA. Solo para enfermedades poco frecuentes con medicamentos no registrados en ANMAT. No aplica a drogas con aprobacion ANMAT.",
    nivel: "bajo",
  },

  "A. I. c/ INSSJYP (PAMI) s/ amparo ley 16.986": {
    circunstancias: "Atezolizumab + Bevacizumab para hepatocarcinoma irresecable. PAMI denego cobertura.",
    aplicabilidad: "AMPLIA. Principio de libertad del medico tratante para escoger el tratamiento. Aplica a cualquier denegacion de inmunoterapia/dirigida con indicacion medica.",
    nivel: "alto",
  },

  "R. J. L. c/ OS Union del Personal Civil de la Nacion s/ medida autosatisfactiva": {
    circunstancias: "Radioterapia IMRT a 832 km del domicilio. Incluyo traslado y alojamiento.",
    aplicabilidad: "AMPLIA cuando el tratamiento requiere traslado a otra provincia. Astreintes de $200.000/dia refuerzan la urgencia.",
    nivel: "alto",
  },

  "F., C. A. c/ INSSJYP (PAMI) s/ amparo ley 16.986": {
    circunstancias: "QT estandar (Paclitaxel + Carboplatino + Pembrolizumab) para cancer de mama avanzado. PAMI demoraba autorizacion.",
    aplicabilidad: "AMPLIA. Caso estandar de demora en autorizacion de QT. Aplica a cualquier demora de PAMI u OS en quimioterapia indicada.",
    nivel: "alto",
  },

  "N.N. c/ OSDE s/ Amparo de salud (Trastuzumab Deruxtecan)": {
    circunstancias: "Enhertu (T-DXd) para cancer de mama. OSDE argumento desequilibrio financiero. Tribunal rechazo el argumento.",
    aplicabilidad: "AMPLIA. Aplica a cualquier reclamo donde la OS argumente costo como motivo de denegacion. Principio: 'en materia de salud el tratamiento adecuado no admite demoras'.",
    nivel: "alto",
  },

  "Amparo c/ PAMI (Trastuzumab Deruxtecan / Enhertu, Rosario)": {
    circunstancias: "Cancer de mama HER2+ metastasico, afiliada PAMI de 62 anos.",
    aplicabilidad: "AMPLIA para Enhertu/T-DXd contra PAMI. Aplica a cualquier afiliado PAMI con indicacion de Enhertu.",
    nivel: "alto",
  },

  // ── ONCOLOGIA ESTUDIOS ─────────────────────────────────────

  "N.N. c/ Asociacion Mutual Sancor Salud s/ Amparo (Oncotype DX)": {
    circunstancias: "Paciente de 38 anos con cancer de mama. Sancor alego 'insuficiente evidencia'. Cuerpo Medico Forense valido la indicacion.",
    aplicabilidad: "AMPLIA para Oncotype DX en cancer de mama. El Cuerpo Medico Forense ya establecio que la indicacion es pertinente — argumento reutilizable.",
    nivel: "alto",
  },

  "N.N. c/ OSDE s/ Amparo de salud (reintegro Oncotype DX)": {
    circunstancias: "OSDE denego y la paciente pago de su bolsillo. Las 3 salas de la Camara ya reconocian cobertura.",
    aplicabilidad: "AMPLIA para Oncotype DX contra OSDE. Tambien aplica para reintegro si el paciente ya pago.",
    nivel: "alto",
  },

  "Amparo c/ OSECAC (PET-TC oncologico, Rio Negro)": {
    circunstancias: "OSECAC simplemente no respondio desde febrero. Sin respuesta = denegacion tacita.",
    aplicabilidad: "AMPLIA. Aplica cuando la OS no responde la solicitud de PET/CT. El silencio es denegacion.",
    nivel: "alto",
  },

  // ── ONCOLOGIA CIRUGIA ──────────────────────────────────────

  "G.G.B. c/ Swiss Medical S.A. s/ Accion declarativa de derecho": {
    circunstancias: "Lipotransferencia mamaria como reconstruccion reparadora (no estetica). Swiss alego que era estetica.",
    aplicabilidad: "AMPLIA para reconstruccion mamaria cuando la OS la califica como 'estetica'. El tribunal distinguio reparadora de estetica bajo Ley 26.872.",
    nivel: "alto",
  },

  "C.R.C.A. c/ Asociacion Mutual Sancor Salud s/ Amparo Ley 16.986": {
    circunstancias: "Cancer de mama triple negativo estadio III. Mastectomia bilateral + reconstruccion inmediata + protesis expansoras.",
    aplicabilidad: "AMPLIA para mastectomia con reconstruccion inmediata. Cubre protesis expansoras.",
    nivel: "alto",
  },
};

// ── Helper: obtener contexto de un fallo ────────────────────────

export function getContextoFallo(caratula) {
  // Exact match
  if (contextoFallos[caratula]) return contextoFallos[caratula];
  // Partial match
  for (const [key, ctx] of Object.entries(contextoFallos)) {
    if (caratula.includes(key.substring(0, 30)) || key.includes(caratula.substring(0, 30))) {
      return ctx;
    }
  }
  return null;
}

// ── Helper: filtrar fallos por nivel de aplicabilidad ────────────
// "alto" = citable sin restricciones
// "medio" = citable con nota de circunstancias
// "bajo" = citar solo si las circunstancias del paciente coinciden

export function filtrarFallosPorAplicabilidad(fallos, nivelMinimo = "medio") {
  const niveles = { alto: 3, medio: 2, bajo: 1 };
  const min = niveles[nivelMinimo] || 2;

  return fallos.filter((f) => {
    const ctx = getContextoFallo(f.caratula);
    if (!ctx) return true; // sin contexto = citable por defecto
    return niveles[ctx.nivel] >= min;
  });
}
