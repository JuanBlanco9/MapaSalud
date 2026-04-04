# MapaSalud — Registro de ultima verificacion

Cada dato en MapaSalud tiene una fecha de verificacion. Este archivo trackea cuando se verifico cada categoria y cuando toca la proxima revision.

| Categoria | Ultima verificacion | Proxima revision | Responsable | Fuente |
|-----------|-------------------|-----------------|-------------|--------|
| Precios medicamentos oncologicos | Abril 2026 | Mayo 2026 | Pendiente | preciosdemedicamentos.com.ar, alfabeta.net |
| Precios insulinas/sensores | Abril 2026 | Mayo 2026 | Pendiente | preciosdemedicamentos.com.ar, alfabeta.net |
| Telefonos auditoria medica (10 OS) | Abril 2026 | Octubre 2026 | Pendiente | Llamar a cada numero |
| Textos legales (15 citas) | Abril 2026 | Octubre 2026 | Pendiente | InfoLEG |
| Listado oficial Res. 3377/2022 | Abril 2026 | Cuando Min. Salud actualice | Pendiente | Boletin Oficial |
| Res. 2091/2025 (diabetes sensores) | Abril 2026 | Cuando Min. Salud actualice | Pendiente | Boletin Oficial |
| Jurisprudencia (40 fallos) | Abril 2026 | Octubre 2026 | Pendiente | SAIJ, Microjuris |
| Organizaciones y telefonos | Abril 2026 | Octubre 2026 | Pendiente | Sitios oficiales |

## Frecuencias recomendadas

- **Precios**: mensual (inflacion argentina los cambia frecuentemente)
- **Telefonos**: semestral (verificar que atienden)
- **Textos legales**: semestral o cuando hay nuevas resoluciones
- **Listado oficial de medicamentos**: cuando el Min. Salud publica actualizacion (2-3 veces/anio)
- **Jurisprudencia**: semestral (agregar fallos nuevos relevantes)

## Como actualizar precios

```bash
# Verificar precios actuales:
# 1. Ir a preciosdemedicamentos.com.ar
# 2. Buscar cada droga
# 3. Comparar con src/data/explicacionesDrogas.js
# 4. Actualizar rango y fecha
# 5. Commit con mensaje "Update prices [mes] [anio]"
```

## Como verificar textos legales

```bash
# 1. Ir a servicios.infoleg.gob.ar
# 2. Buscar cada ley/resolucion por numero
# 3. Verificar que el texto citado coincide con el texto actualizado
# 4. Si hubo modificaciones, actualizar src/data/textosLegales.js
```
