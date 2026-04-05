import { describe, it, expect } from 'vitest';
import { getTextosParaCarta, textosLegales } from '../data/textosLegales';
import { PATOLOGIA } from '../constants';

describe('textosLegales', () => {
  it('tiene todos los textos legales necesarios', () => {
    expect(textosLegales.constitucion_art42).toBeTruthy();
    expect(textosLegales.constitucion_art43).toBeTruthy();
    expect(textosLegales.pmo_art73).toBeTruthy();
    expect(textosLegales.ley_26682).toBeTruthy();
    expect(textosLegales.ley_23753_diabetes).toBeTruthy();
    expect(textosLegales.res_2091_2025_diabetes).toBeTruthy();
  });

  it('cada texto legal incluye fuente verificable', () => {
    for (const [key, text] of Object.entries(textosLegales)) {
      if (key === 'jurisprudencia_piso' || key === 'jurisprudencia_sensor_cgm') continue;
      expect(text, `${key} debe tener fuente`).toMatch(/fuente|Fuente|servicios\.infoleg|boletinoficial|Microjuris/i);
    }
  });
});

describe('getTextosParaCarta', () => {
  it('retorna textos base para cualquier patologia', () => {
    const textos = getTextosParaCarta(PATOLOGIA.ONCOLOGIA);
    expect(textos.length).toBeGreaterThanOrEqual(5);
    expect(textos).toContain(textosLegales.constitucion_art42);
    expect(textos).toContain(textosLegales.ley_26682);
  });

  it('incluye textos oncologicos para oncologia', () => {
    const textos = getTextosParaCarta(PATOLOGIA.ONCOLOGIA);
    expect(textos).toContain(textosLegales.pmo_art73);
    expect(textos).toContain(textosLegales.pmo_art74);
    expect(textos).toContain(textosLegales.res_1926_2024);
    // No debe incluir textos de diabetes
    expect(textos).not.toContain(textosLegales.ley_23753_diabetes);
  });

  it('incluye textos de diabetes para diabetes1', () => {
    const textos = getTextosParaCarta(PATOLOGIA.DIABETES1);
    expect(textos).toContain(textosLegales.ley_23753_diabetes);
    expect(textos).toContain(textosLegales.ley_26914_diabetes);
    expect(textos).toContain(textosLegales.res_2091_2025_diabetes);
    // No debe incluir textos oncologicos
    expect(textos).not.toContain(textosLegales.pmo_art73);
  });

  it('no contamina patologias entre si', () => {
    const onco = getTextosParaCarta(PATOLOGIA.ONCOLOGIA);
    const diab = getTextosParaCarta(PATOLOGIA.DIABETES1);
    // Diabetes textos no deben estar en oncologia
    expect(onco).not.toContain(textosLegales.ley_23753_diabetes);
    // Oncologia textos no deben estar en diabetes
    expect(diab).not.toContain(textosLegales.pmo_art73);
  });
});
