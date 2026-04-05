import { describe, it, expect } from 'vitest';
import { PATOLOGIA, OS_ID, NIVEL_COBERTURA, DIFICULTAD, TIPO_DOCUMENTO } from '../constants';

describe('constants', () => {
  it('PATOLOGIA tiene todas las patologias', () => {
    expect(PATOLOGIA.ONCOLOGIA).toBe('oncologia');
    expect(PATOLOGIA.DIABETES1).toBe('diabetes1');
  });

  it('OS_ID tiene todas las obras sociales', () => {
    expect(Object.keys(OS_ID).length).toBe(10);
    expect(OS_ID.OSDE).toBe('osde');
    expect(OS_ID.HOSPITAL_PUBLICO).toBe('hospital_publico');
  });

  it('NIVEL_COBERTURA tiene los 5 niveles', () => {
    expect(Object.keys(NIVEL_COBERTURA).length).toBe(5);
    expect(NIVEL_COBERTURA.NACIONAL).toBe('nacional');
    expect(NIVEL_COBERTURA.LEY).toBe('ley');
    expect(NIVEL_COBERTURA.PMO).toBe('pmo');
    expect(NIVEL_COBERTURA.GESTION).toBe('gestion');
  });

  it('DIFICULTAD tiene los 3 niveles', () => {
    expect(Object.keys(DIFICULTAD).length).toBe(3);
    expect(DIFICULTAD.DIRECTO).toBe('directo');
    expect(DIFICULTAD.TRAMITE).toBe('tramite');
    expect(DIFICULTAD.DIFICIL).toBe('dificil');
  });

  it('TIPO_DOCUMENTO tiene los 6 tipos', () => {
    expect(Object.keys(TIPO_DOCUMENTO).length).toBe(6);
    expect(TIPO_DOCUMENTO.PROMESA).toBe('promesa');
    expect(TIPO_DOCUMENTO.RECLAMO_PUBLICO).toBe('reclamo_publico');
  });
});
