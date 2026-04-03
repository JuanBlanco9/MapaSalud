// Vercel Edge Function — genera cartas de reclamo con Claude API
// POST /api/generar-carta

export const config = { runtime: "edge" };

const TIPOS_DOCUMENTO = {
  seguimiento: "email de seguimiento formal",
  pedir_negativa: "email solicitando la negativa por escrito",
  carta_documento: "carta documento formal",
  intimacion_entrega: "carta documento por falta de entrega de tratamiento autorizado",
};

const DAILY_LIMIT = parseInt(process.env.DAILY_LIMIT || "5", 10);

// In-memory rate limit (resets on cold start, ~5-15min on Vercel Edge)
// Not bulletproof but catches casual abuse. For production, use Upstash Redis.
const ipCounts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const dayMs = 86400000;
  const entry = ipCounts.get(ip);
  if (!entry || now - entry.start > dayMs) {
    ipCounts.set(ip, { start: now, count: 1 });
    return true;
  }
  if (entry.count >= DAILY_LIMIT) return false;
  entry.count++;
  return true;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        error: "Limite diario alcanzado. Podes generar hasta " + DAILY_LIMIT + " documentos por dia. Los templates sin IA siguen disponibles.",
        useFallback: true,
        rateLimited: true,
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key not configured", useFallback: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const {
      obraSocial,
      plan,
      diagnostico,
      subtipo,
      tratamiento,
      nivelCobertura,
      tipoDocumento,
      fechaSolicitud,
      textosLegales,
      jurisprudencia,
      patologiaId,
      datosPaciente,
    } = body;

    const tipoDesc = TIPOS_DOCUMENTO[tipoDocumento] || tipoDocumento;

    const dp = datosPaciente || {};
    const datosBloque = dp.nombre ? `
DATOS DEL PACIENTE (usar estos datos reales, NO inventar ni usar placeholders):
- Nombre completo: ${dp.nombre}
- DNI: ${dp.dni}
- Domicilio: ${dp.domicilio}
${dp.telefono ? `- Telefono: ${dp.telefono}` : ""}
${dp.email ? `- Email: ${dp.email}` : ""}
- Medico tratante: ${dp.medico}
- Matricula del medico: ${dp.matricula}` : "";

    const systemPrompt = `Sos un asistente legal especializado en derecho a la salud en Argentina.
Tu rol es redactar comunicaciones formales para pacientes que necesitan reclamar cobertura medica a sus obras sociales o prepagas.

REGLAS ESTRICTAS DE TONO Y CONTENIDO:

1. TONO: Formal, firme y RESPETUOSO. Nunca agresivo ni confrontativo. No uses ultimatums.
   - NO decir: "me vere en la obligacion de iniciar acciones legales"
   - SI decir: "me reservo el derecho de recurrir a las instancias correspondientes, incluyendo la Superintendencia de Servicios de Salud y la via judicial de amparo"
   - El objetivo es abrir dialogo, no amenazar. Las obras sociales responden mejor a un tono profesional.

2. NUNCA MENCIONES "MapaSalud" en el cuerpo del documento. MapaSalud no es una autoridad oficial y no debe citarse como fuente en documentos legales.

3. COBERTURA — lenguaje calibrado, NO absolutista:
   - NO decir: "este tratamiento esta CUBIERTO POR LEY al 100%"
   - SI decir: "El tratamiento prescripto por mi medico tratante se enmarca en los protocolos oncologicos aprobados por ANMAT y las guias de practica clinica vigentes, correspondiendo su cobertura integral segun el PMO."
   - La cobertura depende de la indicacion exacta, protocolo y biomarcadores. Reconocelo sin debilitar el reclamo.

4. BASE LEGAL — citar especificamente:
   - PMO Res. 201/2002, punto 7.3 (medicamentos oncologicos al 100% segun protocolos ANMAT) — esta es la cita principal para oncologia
   - Res. 1926/2024 (exencion de coseguros para oncologia)
   - Ley 26.682 Art. 7 (cobertura minima PMO para prepagas)
   - Ley 23.660 Art. 3 como base adicional, no principal
   - Para diabetes: Ley 23.753, Ley 26.914, Res. 2091/2025

5. JURISPRUDENCIA — general, no especifica:
   - NO citar expedientes o salas que no podamos verificar
   - SI decir: "La jurisprudencia reiterada de la Justicia Federal ha establecido que el PMO constituye un piso de prestaciones minimas, no un techo, y que las obras sociales deben fundar por escrito sus decisiones denegatorias."

6. PLAZOS — firmes pero no agresivos:
   - Solicitar respuesta "en un plazo razonable"
   - Para carta documento: "dentro del plazo legal correspondiente"
   - NO poner "48 HORAS IMPRORROGABLES" como ultimatum

7. DATOS DEL PACIENTE: usa los datos reales que te proveo. Si falta un dato, usa [COMPLETAR EN MAYUSCULAS].

8. Maximo 500 palabras. Formato de carta formal argentina. No uses lenguaje inclusivo con x o @.
${datosBloque}

TEXTOS LEGALES PARA REFERENCIA (citar de forma precisa pero no necesariamente verbatim):
${textosLegales.join("\n\n")}
${jurisprudencia && jurisprudencia.length > 0 ? `
JURISPRUDENCIA VERIFICADA PARA CITAR (usar la mas relevante al caso, con caratula, tribunal y fecha exacta):
${jurisprudencia.join("\n")}

IMPORTANTE: Cita al menos 1-2 fallos relevantes en el documento. Usa el formato exacto: "caratula" (Tribunal, fecha). No inventes fallos ni modifiques las citas.` : ""}`;

    const userPrompt = `Genera un ${tipoDesc} para la siguiente situacion:

DATOS DEL CASO:
- Obra social/prepaga: ${obraSocial}${plan ? ` (${plan})` : ""}
- Patologia: ${patologiaId === "oncologia" ? "Oncologica" : patologiaId === "diabetes1" ? "Diabetes tipo 1" : patologiaId}
- Diagnostico: ${diagnostico}${subtipo ? ` — ${subtipo}` : ""}
- Tratamiento/insumo solicitado: ${tratamiento}
- Marco normativo aplicable: ${nivelCobertura === "nacional" || nivelCobertura === "ley" ? "El tratamiento se enmarca en los protocolos aprobados y la normativa vigente (PMO, Res. 201/2002)" : nivelCobertura === "pba" ? "Incluido en el listado provincial de Buenos Aires. En otras jurisdicciones, fundamentar con indicacion medica." : "Requiere fundamentacion medica especifica del medico tratante. Jurisprudencia favorable."}
- Fecha de solicitud original: ${fechaSolicitud || "[COMPLETAR]"}

${tipoDocumento === "seguimiento" ? "La obra social no respondio en plazo razonable. Solicitar formalmente una respuesta fundada." : ""}
${tipoDocumento === "pedir_negativa" ? "La obra social nego verbalmente. Solicitar la negativa por escrito con fundamentacion, que es obligacion legal de la obra social." : ""}
${tipoDocumento === "carta_documento" ? "La obra social nego la cobertura. Intimar a reconsiderar y cubrir el tratamiento conforme normativa vigente." : ""}
${tipoDocumento === "intimacion_entrega" ? "La obra social aprobo pero no entrega el tratamiento. Solicitar la efectiva provision en plazo razonable." : ""}

Genera SOLO el documento, sin explicaciones ni comentarios adicionales.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [{ role: "user", content: userPrompt }],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return new Response(
        JSON.stringify({ error: "Error generando documento", useFallback: true }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const texto = data.content?.[0]?.text || "";

    return new Response(JSON.stringify({ texto, tipoDocumento }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno", useFallback: true }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
