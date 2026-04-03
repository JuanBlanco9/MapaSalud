// Vercel Edge Function — genera cartas de reclamo con Claude API
// POST /api/generar-carta

export const config = { runtime: "edge" };

const TIPOS_DOCUMENTO = {
  seguimiento: "email de seguimiento formal",
  pedir_negativa: "email solicitando la negativa por escrito",
  carta_documento: "carta documento formal de intimacion",
  intimacion_entrega: "carta documento de intimacion por falta de entrega",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
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

REGLAS ESTRICTAS:
- USA LOS DATOS REALES DEL PACIENTE que te proveo. No uses placeholders como [COMPLETAR] para datos que ya tengas.
- Si falta un dato que NO te provei, usa [COMPLETAR EN MAYUSCULAS] como placeholder.
- Cita los articulos de ley TEXTUALMENTE como te los proveo. No parafrasees ni modifiques las citas legales.
- El tono es formal, firme, y respetuoso. Nunca agresivo ni amenazante.
- Maximo 500 palabras.
- Usa formato de carta formal argentina.
- Incluye la fecha de hoy en el encabezado.
- Establece un plazo de respuesta de 48 horas.
- Menciona las consecuencias legales de no responder (amparo judicial, danos y perjuicios).
- No uses lenguaje inclusivo con x o @.
${datosBloque}

TEXTOS LEGALES EXACTOS PARA CITAR:
${textosLegales.join("\n\n")}`;

    const userPrompt = `Genera un ${tipoDesc} para la siguiente situacion:

DATOS DEL CASO:
- Obra social/prepaga: ${obraSocial}${plan ? ` (${plan})` : ""}
- Patologia: ${patologiaId === "oncologia" ? "Oncologica" : patologiaId === "diabetes1" ? "Diabetes tipo 1" : patologiaId}
- Diagnostico: ${diagnostico}${subtipo ? ` — ${subtipo}` : ""}
- Tratamiento/insumo solicitado: ${tratamiento}
- Nivel de cobertura segun MapaSalud: ${nivelCobertura === "nacional" || nivelCobertura === "ley" ? "CUBIERTO POR LEY — la obra social ESTA OBLIGADA a cubrirlo" : nivelCobertura === "pba" ? "Cubierto en Provincia de Buenos Aires pero no en vademecum nacional" : "No incluido en listados oficiales — requiere fundamentacion medica"}
- Fecha de solicitud original: ${fechaSolicitud || "[COMPLETAR]"}

${tipoDocumento === "seguimiento" ? "La obra social no respondio en mas de 5 dias habiles. Reclamar respuesta formal." : ""}
${tipoDocumento === "pedir_negativa" ? "La obra social nego verbalmente. Pedir la negativa por escrito, que es obligacion legal." : ""}
${tipoDocumento === "carta_documento" ? "La obra social nego por escrito. Intimar a cubrir en 48 horas bajo apercibimiento de accion de amparo." : ""}
${tipoDocumento === "intimacion_entrega" ? "La obra social aprobo pero no entrega el tratamiento/insumo. Intimar a entregar en 48 horas." : ""}

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
