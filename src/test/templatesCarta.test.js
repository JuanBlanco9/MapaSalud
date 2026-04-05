import { describe, it, expect } from 'vitest';
import { generarTemplateFallback } from '../data/templatesCarta';
import { TIPO_DOCUMENTO, PATOLOGIA, NIVEL_COBERTURA } from '../constants';

const BASE_ARGS = {
  obraSocial: 'OSDE',
  plan: 'OSDE 310',
  diagnostico: 'Cancer de mama',
  subtipo: 'HER2+',
  tratamiento: 'Trastuzumab',
  fechaSolicitud: '2026-01-15',
  patologiaId: PATOLOGIA.ONCOLOGIA,
  nivelCobertura: NIVEL_COBERTURA.NACIONAL,
};

describe('generarTemplateFallback', () => {
  it('genera template de pedir negativa con datos correctos', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      tipoDocumento: TIPO_DOCUMENTO.PEDIR_NEGATIVA,
    });
    expect(result).toContain('OSDE (OSDE 310)');
    expect(result).toContain('Trastuzumab');
    expect(result).toContain('negativa');
    expect(result).toContain('2026-01-15');
  });

  it('genera template de seguimiento con datos correctos', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      tipoDocumento: TIPO_DOCUMENTO.SEGUIMIENTO,
    });
    expect(result).toContain('OSDE');
    expect(result).toContain('Trastuzumab');
    expect(result).toContain('solicitud de cobertura');
    expect(result).toContain('respuesta formal');
  });

  // ── Diferenciación por nivel de cobertura ──────────────────

  it('carta documento CUBIERTO cita listado oficial y Res. 3377', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.NACIONAL,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('CARTA DOCUMENTO');
    expect(result).toContain('listados oficiales');
    expect(result).toContain('Res. 3377/2022');
    expect(result).toContain('Res. 201/2002');
    expect(result).not.toContain('no se encuentra actualmente');
  });

  it('carta documento GESTION NO cita listado oficial, usa argumento jurisprudencial', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.GESTION,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('CARTA DOCUMENTO');
    expect(result).toContain('no se encuentra actualmente en los listados');
    expect(result).toContain('piso de prestaciones minimas');
    expect(result).toContain('medicamente necesario');
    expect(result).not.toContain('se encuentra incluido en los listados oficiales');
  });

  it('carta documento diabetes CUBIERTO cita Res. 2091/2025', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      patologiaId: PATOLOGIA.DIABETES1,
      diagnostico: 'Diabetes tipo 1',
      tratamiento: 'FreeStyle Libre',
      nivelCobertura: NIVEL_COBERTURA.LEY,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('FREESTYLE LIBRE');
    expect(result).toContain('Ley 23.753');
    expect(result).toContain('Res. 2091/2025');
    expect(result).not.toContain('Res. 201/2002');
    expect(result).not.toContain('no se encuentra actualmente');
  });

  it('carta documento diabetes GESTION usa argumento jurisprudencial', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      patologiaId: PATOLOGIA.DIABETES1,
      diagnostico: 'Diabetes tipo 1',
      tratamiento: 'Dexcom G7',
      nivelCobertura: NIVEL_COBERTURA.GESTION,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('DEXCOM G7');
    expect(result).toContain('no se encuentra actualmente');
    expect(result).toContain('medicamente necesario');
    expect(result).toContain('Ley 23.753');
    expect(result).not.toContain('Res. 2091/2025');
  });

  // ── PROMESA diferenciado ───────────────────────────────────

  it('PROMESA cubierto cita Res. 3377 para oncologia', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.NACIONAL,
      tipoDocumento: TIPO_DOCUMENTO.PROMESA,
    });
    expect(result).toContain('PROMESA');
    expect(result).toContain('Res. 3377/2022');
    expect(result).toContain('DNU 379/2025');
  });

  it('PROMESA gestion usa argumento de necesidad medica', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.GESTION,
      tipoDocumento: TIPO_DOCUMENTO.PROMESA,
    });
    expect(result).toContain('PROMESA');
    expect(result).toContain('medicamente necesario');
    expect(result).toContain('piso minimo');
    expect(result).not.toContain('Res. 3377/2022');
  });

  // ── Seguimiento diferenciado ───────────────────────────────

  it('seguimiento cubierto cita listado oficial', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.NACIONAL,
      tipoDocumento: TIPO_DOCUMENTO.SEGUIMIENTO,
    });
    expect(result).toContain('listados oficiales');
  });

  it('seguimiento gestion dice medicamente necesario', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.GESTION,
      tipoDocumento: TIPO_DOCUMENTO.SEGUIMIENTO,
    });
    expect(result).toContain('medicamente necesario');
    expect(result).not.toContain('listados oficiales');
  });

  // ── PBA (provincial Buenos Aires) ───────────────────────────

  it('carta documento PBA cita IPC provincial, no dice "no se encuentra"', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.PBA,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('IPC');
    expect(result).toContain('provincial');
    expect(result).not.toContain('no se encuentra actualmente');
    expect(result).not.toContain('piso de prestaciones');
  });

  it('seguimiento PBA cita IPC provincial', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.PBA,
      tipoDocumento: TIPO_DOCUMENTO.SEGUIMIENTO,
    });
    expect(result).toContain('IPC Buenos Aires');
  });

  it('PROMESA PBA cita IPC provincial', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.PBA,
      tipoDocumento: TIPO_DOCUMENTO.PROMESA,
    });
    expect(result).toContain('IPC');
  });

  // ── CNACAF separada de CSJN ────────────────────────────────

  it('gestion NO atribuye CNACAF a la CSJN', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      nivelCobertura: NIVEL_COBERTURA.GESTION,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('CSJN ha establecido');
    expect(result).toContain('Justicia Federal ha sostenido');
    expect(result).toContain('CNACAF Sala III');
    // CNACAF no debe estar en la misma oración que "CSJN ha establecido"
    const csnjSentence = result.split('.').find(s => s.includes('CSJN ha establecido'));
    expect(csnjSentence).not.toContain('CNACAF');
  });

  // ── Fallback de error ──────────────────────────────────────

  it('devuelve mensaje de error para tipo de documento desconocido', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      tipoDocumento: 'tipo_inexistente',
    });
    expect(result).toContain('Error');
    expect(result).toContain('tipo_inexistente');
  });

  // ── Intimacion usa "INTIMACION" no "SOLICITUD" ────────────

  it('intimacion dice INTIMACION en el OBJETO', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      tipoDocumento: TIPO_DOCUMENTO.INTIMACION_ENTREGA,
    });
    expect(result).toContain('INTIMACION A LA ENTREGA');
  });

  // ── Otros templates ────────────────────────────────────────

  it('genera template de intimacion de entrega', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      tipoDocumento: TIPO_DOCUMENTO.INTIMACION_ENTREGA,
    });
    expect(result).toContain('ENTREGA');
    expect(result).toContain('autorizado');
  });

  it('genera reclamo publico dirigido al Director del hospital', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      obraSocial: 'Hospital Publico / Sin Cobertura',
      plan: null,
      tipoDocumento: TIPO_DOCUMENTO.RECLAMO_PUBLICO,
    });
    expect(result).toContain('Director');
    expect(result).toContain('Campodonico');
    expect(result).toContain('Art. 42');
    expect(result).toContain('saludo a Ud.');
  });

  it('no incluye plan cuando es null', () => {
    const result = generarTemplateFallback({
      ...BASE_ARGS,
      plan: null,
      tipoDocumento: TIPO_DOCUMENTO.CARTA_DOCUMENTO,
    });
    expect(result).toContain('OSDE');
    expect(result).not.toContain('OSDE (');
  });
});
