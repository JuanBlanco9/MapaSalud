# MapaSalud — Registro de ultima verificacion

Cada dato tiene una fecha de verificacion. Este archivo trackea cuando se verifico y cuando toca la proxima revision.

| Categoria | Ultima verificacion | Proxima revision | Fuente |
|-----------|-------------------|-----------------|--------|
| 12 regulaciones (PDFs) | Abril 2026 | Octubre 2026 | InfoLEG, B.O. — [docs/normas_pdf/](docs/normas_pdf/) |
| 47 fallos judiciales | Abril 2026 | Octubre 2026 | Microjuris, SAIJ, CIJ — [JURISPRUDENCIA_VERIFICADA.md](JURISPRUDENCIA_VERIFICADA.md) |
| 16 textos legales | Abril 2026 | Octubre 2026 | InfoLEG — cruzados contra PDFs |
| 7 templates de reclamo | Abril 2026 | Cuando cambie normativa | Diferenciados por cubierto/pba/gestion |
| Precios medicamentos (onco) | Abril 2026 | Mayo 2026 | preciosdemedicamentos.com.ar, alfabeta.net |
| Precios insulinas/sensores | Abril 2026 | Mayo 2026 | preciosdemedicamentos.com.ar, alfabeta.net |
| Telefonos auditoria (10 OS) | Abril 2026 | Octubre 2026 | Sitios oficiales + llamar |
| Listado Res. 3377/2022 | Abril 2026 | Cuando Min. Salud actualice | B.O. |
| Res. 2091/2025 (sensores) | Abril 2026 | Cuando Min. Salud actualice | B.O. |
| DNU 379/2025 (PROMESA) | Abril 2026 | Cuando se reglamente nuevo | B.O. + Res. Conjunta 1/2025 |
| Drogas no disponibles en ARG | Abril 2026 | Octubre 2026 | ANMAT |
| Organizaciones y telefonos | Abril 2026 | Octubre 2026 | Sitios oficiales |

## Frecuencias recomendadas

- **Precios**: mensual (inflacion)
- **Telefonos**: semestral
- **Textos legales**: semestral o cuando hay nuevas resoluciones
- **Listado de medicamentos**: cuando Min. Salud publica actualizacion
- **Jurisprudencia**: semestral (agregar fallos nuevos con cita MJ/SAIJ)
- **Drogas no disponibles**: semestral (verificar registro ANMAT)

## Como actualizar

### Precios
1. Ir a preciosdemedicamentos.com.ar
2. Buscar cada droga
3. Comparar con `src/data/explicacionesDrogas.js`
4. Actualizar rango y campo `fecha`

### Textos legales
1. Ir a servicios.infoleg.gob.ar
2. Buscar cada ley/resolucion por numero
3. Comparar texto citado con texto actualizado
4. Si hubo modificaciones, actualizar `src/data/textosLegales.js`

### Jurisprudencia
1. Buscar fallos nuevos en aldiaargentina.microjuris.com
2. Necesita: caratula, tribunal, fecha, cita MJ, que ordeno
3. Agregar a `src/data/jurisprudencia/fallos.js`
4. Agregar contexto de aplicabilidad a `contexto.js`
5. Actualizar `JURISPRUDENCIA_VERIFICADA.md`
