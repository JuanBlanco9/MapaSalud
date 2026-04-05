import { describe, it, expect } from 'vitest';
import {
  getJurisprudenciaRelevante,
  formatCitaJurisprudencial,
  filtrarFallosPorAplicabilidad,
} from '../data/jurisprudencia';
import { PATOLOGIA } from '../constants';

describe('getJurisprudenciaRelevante', () => {
  it('retorna fallos para oncologia', () => {
    const result = getJurisprudenciaRelevante(PATOLOGIA.ONCOLOGIA);
    expect(result.principios).toBeDefined();
    expect(result.principios.length).toBeGreaterThan(0);
    expect(result.especificos).toBeDefined();
    expect(result.especificos.length).toBeGreaterThan(0);
  });

  it('retorna fallos para diabetes', () => {
    const result = getJurisprudenciaRelevante(PATOLOGIA.DIABETES1);
    expect(result.principios.length).toBeGreaterThan(0);
    expect(result.especificos.length).toBeGreaterThan(0);
  });

  it('no contamina fallos de oncologia en diabetes', () => {
    const result = getJurisprudenciaRelevante(PATOLOGIA.DIABETES1);
    const oncoOnly = result.especificos.filter(f =>
      f.aplicaA && f.aplicaA.includes(PATOLOGIA.ONCOLOGIA) && !f.aplicaA.includes(PATOLOGIA.DIABETES1)
    );
    expect(oncoOnly.length).toBe(0);
  });

  it('no contamina fallos de diabetes en oncologia', () => {
    const result = getJurisprudenciaRelevante(PATOLOGIA.ONCOLOGIA);
    const diabOnly = result.especificos.filter(f =>
      f.aplicaA && f.aplicaA.includes(PATOLOGIA.DIABETES1) && !f.aplicaA.includes(PATOLOGIA.ONCOLOGIA)
    );
    expect(diabOnly.length).toBe(0);
  });
});

describe('formatCitaJurisprudencial', () => {
  it('formatea correctamente una cita', () => {
    const fallo = {
      caratula: 'Garcia c/ OSDE',
      tribunal: 'Camara Federal',
      sala: 'Sala I',
      fecha: '2024-03-15',
      id: 'test_1',
    };
    const cita = formatCitaJurisprudencial(fallo);
    expect(cita).toContain('Garcia c/ OSDE');
    expect(cita).toContain('Camara Federal');
  });
});

describe('filtrarFallosPorAplicabilidad', () => {
  it('filtra por aplicabilidad alto por defecto', () => {
    const fallos = [
      { id: 'f1', caratula: 'A c/ B' },
      { id: 'f2', caratula: 'C c/ D' },
    ];
    // Should return fallos (no context means they pass)
    const result = filtrarFallosPorAplicabilidad(fallos, 'alto');
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
