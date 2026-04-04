<h1 align="center">MapaSalud</h1>

<p align="center">
  <b>Herramienta gratuita de navegacion del sistema de salud argentino</b><br/>
  Cobertura, derechos, amparos y asistente de reclamos para pacientes con enfermedades cronicas
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## El problema

En 2024 se iniciaron **10.072 amparos de salud** en Argentina — un crecimiento del 471% respecto a 2023 ([Decreto 379/2025, Boletin Oficial](https://www.boletinoficial.gob.ar/detalleAviso/primera/326414/20250604)). Mas del 80% se resuelven favorablemente para el paciente ([OLEGISAR](https://olegisar.org/amparos-de-salud-estadistica-doctrina-y-registro-nacional/)). El problema no es la ley — es que la mayoria de los pacientes no sabe que puede reclamar, como hacerlo, ni a quien llamar.

---

## Que hace

MapaSalud toma la situacion del paciente (obra social + diagnostico) y le muestra:

| Funcion | Descripcion |
|---------|-------------|
| **Mapa de cobertura** | Que tratamientos le corresponden, cruzados contra el listado oficial de medicamentos (Res. 3377/2022, Anexo I verificado contra PDF del Ministerio de Salud) |
| **Cobertura + dificultad** | Dos indicadores por droga: derecho legal (semaforo) + dificultad de acceso real (advertencia), con evidencia expandible |
| **Explicaciones de drogas** | Cada droga/insumo clickeable con explicacion en lenguaje simple, forma de administracion, y links a fuentes medicas |
| **Asistente de reclamos** | Genera cartas documento, emails formales, y solicitudes PROMESA con base legal verificada y jurisprudencia aplicable |
| **PROMESA** | Soporte para el nuevo procedimiento de mediacion prejudicial (Decreto 379/2025) — primera herramienta que genera la solicitud formal |
| **PDF descargable** | Mapa personalizado con header, firma digital, y disclaimer legal |
| **Guia de amparos** | Paso a paso, documentacion, modelos de carta, organizaciones, defensores del pueblo, jurisprudencia |

### No es una herramienta medica

No recomienda tratamientos, no dice si el medico tiene razon, no garantiza resultados legales, y no almacena datos personales.

---

## Patologias

| Patologia | Estado | Datos |
|-----------|--------|-------|
| **Oncologia** | Completa | 103 drogas (Res. 3377/2022). 5 canceres, 15+ subtipos. 10 OS con telefonos. Precios abril 2026. 30 drogas con explicacion. |
| **Diabetes Tipo 1** | Completa | Insulinas, sensores CGM, bombas. Ley 23.753 + Ley 26.914 + Res. 2091/2025. Organizaciones especificas. |
| Enfermedades poco frecuentes | Planificado | Ley 26.689 |
| Reumatologicas | Planificado | — |
| VIH / Hepatitis | Planificado | Ley 27.675 |

Agregar una patologia nueva = crear 3 archivos JS (`config.js`, `tipos.js`, `cobertura.js`) y registrarla en `patologias/index.js`.

---

## Arquitectura

```
src/
  components/
    layout/                          # Header, Footer, Layout
    cobertura/                       # UI del flujo de cobertura
      BarraProgreso.jsx
      Paso1Cobertura.jsx             # Selector de OS
      Paso1Plan.jsx                  # Selector de plan
      Paso2Diagnostico.jsx           # Selector de diagnostico
      Paso3Mapa.jsx                  # Mapa con tabs (cobertura/tratamiento/reclamo)
      Badges.jsx                     # NivelBadge, DificultadBadge, DrogaConNivel, EvidenciaPanel
      Verificando.jsx
    AsistenteReclamo.jsx             # Formulario + firma + generacion de cartas
  pages/
    Home.jsx                         # Landing con stats y selector de patologia
    Cobertura.jsx                    # Orquestador del flujo (100 lineas)
    SeleccionPatologia.jsx           # Oncologia / Diabetes
    Amparo.jsx                       # Guia de amparos (10 secciones)
  data/
    coberturas.js                    # 10 OS con datos reales
    explicacionesDrogas.js           # 30 drogas explicadas en lenguaje simple
    dificultadAcceso.js              # Dificultad real + fundamentacion con links a fallos
    dificultadPorOS.js               # Ajustes por OS con disclaimers de confianza
    textosLegales.js                 # 15 articulos verificados contra InfoLEG/BO
    templatesCarta.js                # 6 templates (seguimiento, negativa, carta doc, intimacion, PROMESA onco, PROMESA diabetes)
    organizacionesPorPatologia.js    # LALCEC/FUCA para onco, CUI.D.AR/LAPDI/SAD para diabetes
    datosAmparosReales.js            # Informe Min. Salud 2022 (datos oficiales)
    indiceLitigiosidad.js            # Evidencia cualitativa SAIJ (279K fallos procesados)
    jurisprudencia/
      fallos.js                      # 40 fallos verificados con caratula, tribunal, fecha
      contexto.js                    # Aplicabilidad (alto/medio/bajo) por fallo
    patologias/
      index.js                       # Registry + loader dinamico
      oncologia/                     # config + tipos + cobertura
      diabetes1/                     # config + tipos + cobertura
  utils/
    generarPDF.js                    # PDF con header MapaSalud, firma, footer
api/
  generar-carta.js                   # Edge Function (Claude API, deshabilitado por default)
pipeline/                            # Scripts de procesamiento de datos judiciales
  01_descargar_datos.py              # datos.jus.gob.ar
  02_procesar_amparos.py             # Filtrar y clasificar
  04_saij_huggingface.py             # Streaming de 279K fallos SAIJ
```

### Dos indicadores por droga

| Indicador | Que mide | Ejemplo |
|-----------|----------|---------|
| **Semaforo** (derecho legal) | Si la ley obliga a cubrirlo | 🟢 Cubierto Res. 3377 / 🟡 Provincial / 🔴 Requiere gestion |
| **Advertencia** (acceso real) | Que tan facil es conseguirlo | ✓ Directo / ⏱ Tramite / ⚠ Dificil |

Cada droga tiene un boton (i) que expande la evidencia: por que esa clasificacion, fallos judiciales con links, y normativa. El nombre de la droga es clickeable y muestra una explicacion en lenguaje simple.

**Metodologia de dificultad:**
- Basada en fallos judiciales verificados, datos de OS (`queAprueban`/`queNiegan`), precio, y disponibilidad
- Es un **promedio nacional**, no especifico por OS. Donde tenemos datos de una OS, la UI muestra un disclaimer con la fuente
- Donde NO tenemos datos, lo decimos explicitamente
- Fundamentacion completa en `dificultadAcceso.js` con links a fuentes

### Asistente de reclamos

```
Paciente completa su mapa → elige tratamiento a reclamar
    ↓
3 preguntas: ¿ya lo pediste? ¿que respondieron? ¿cuando?
    ↓
Si negativa escrita → elige: Carta documento o PROMESA
    ↓
Formulario de datos (nombre, DNI, medico, matricula) + firma touch
    ↓
Template pre-generado con:
  - Datos reales del paciente (no [COMPLETAR])
  - Base legal por patologia (PMO 7.3 para onco, Ley 23.753 para diabetes)
  - Jurisprudencia filtrada por aplicabilidad (solo fallos de nivel alto/medio)
  - Tono calibrado (firme, respetuoso, sin ultimatums)
    ↓
Copiar texto / Descargar .txt / PDF con firma
```

### Jurisprudencia

40 fallos verificados con caratula, tribunal, y fecha. Cada uno con:
- Nivel de aplicabilidad (alto/medio/bajo) para evitar citas incorrectas
- Links a fuentes verificables (Microjuris, SAIJ, CIJ, poderes judiciales provinciales)
- Archivo de respaldo en [mapasalud-fallos](https://github.com/JuanBlanco9/mapasalud-fallos) (CC0)

Cobertura: 7/7 tipos de reclamo, 11 provincias, 12+ OS/prepagas.

### PROMESA (nuevo)

Soporte para el Procedimiento de Mediacion Prejudicial en Materia de Salud (Decreto 379/2025):
- Template de solicitud formal para presentar por TAD
- Explicacion paso a paso del procedimiento
- La OS no puede negarse a participar
- Primera audiencia en 5 dias
- Requiere abogado (patrocinio gratuito disponible)

---

## Datos verificados

| Dato | Fuente | Verificacion |
|------|--------|-------------|
| 103 drogas oncologicas | Anexo I, Res. 3377/2022 (PDF oficial) | Abril 2026 |
| 15 textos legales | InfoLEG, Boletin Oficial, SAIJ | Abril 2026, 5 correcciones aplicadas |
| 10 OS con telefonos | Sitios oficiales + Mundo Cancer | Abril 2026 |
| Precios medicamentos | preciosdemedicamentos.com.ar, alfabeta.net | Abril 2026 |
| 40 fallos judiciales | Microjuris, SAIJ, CIJ, poderes judiciales provinciales | Abril 2026 |
| 10.072 amparos 2024 | Decreto 379/2025, Boletin Oficial | Dato oficial |
| Drogas mas litigadas | SciELO (Medicina Buenos Aires, 405 amparos 2017-2020) | Paper peer-reviewed |
| Res. 2091/2025 (sensores diabetes) | Boletin Oficial, InfoLEG | Julio 2025 |
| PROMESA | Decreto 379/2025, Res. Conjunta 1/2025, guia FADEPOF | Septiembre 2025 |

### Obras sociales

| OS | Telefono auditoria | Canal | Datos especificos |
|----|-------------------|-------|-------------------|
| IOMA | 0810-999-4662 / WA +54 911 5050 4662 | App IOMA Digital | Programa Cuidarte, alertas de demora |
| OSDE | 0810-555-6733 | App OSDE / web | Formulario oncologico ene 2024 |
| Swiss Medical | 0810-444-7700 | Mi Swiss Medical | 3 dias habiles / 15-30 auditoria |
| Galeno | 0810-999-7828 | App Galeno | Por plan: Oro/Plata/Azul |
| Medife | 0800-999-9000 / WA | Portal web | Politica off-label explicita |
| OSECAC | 0800-666-0400 | App OSECAC | — |
| OMINT | 0800-777-6246 | Web (2 niveles) | Consulta internacional |
| AMOBP | 0800-555-6722 | Presencial | Planes S-100/200/300 |
| DOSEP | 266-4452000 x4045 | Hospitales designados | Alertas: denegaciones sistematicas |
| Hospital publico | bndo@msal.gov.ar | BNDE via hospital | INC → Dir. Nac. Cancer (2025) |

---

## Quick Start

```bash
git clone https://github.com/JuanBlanco9/MapaSalud.git
cd MapaSalud
npm install
npm run dev
```

La app funciona completa sin API key ni backend. El asistente de reclamos usa templates pre-generados.

```bash
npm run build       # Build de produccion
npm run preview     # Preview local
```

### Deploy en Vercel

1. Importar repo en [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite**
3. Deploy

Opcionalmente, agregar `ANTHROPIC_API_KEY` en Environment Variables para habilitar personalizacion con IA (deshabilitada por default, el boton dice "Proximamente").

---

## Pipeline de datos

```bash
cd pipeline
python 01_descargar_datos.py     # Descarga datos.jus.gob.ar (66MB)
python 02_procesar_amparos.py    # Filtra 56K amparos de 23K+ causas
python 04_saij_huggingface.py    # Procesa 279K fallos SAIJ, extrae 832 amparos salud
```

Resultados en `pipeline/output/`. Los datos procesados alimentan `indiceLitigiosidad.js`.

---

## Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

| Area | Descripcion | Requiere programar |
|------|-------------|-------------------|
| **Curado de datos** | Verificar telefonos, precios, procesos de OS | No |
| **Nuevas patologias** | EPF (Ley 26.689), reumatologicas, VIH | Si (3 archivos JS) |
| **Explicaciones de drogas** | Agregar las que faltan en lenguaje simple | No |
| **Accesibilidad** | Testing con lectores de pantalla | No |
| **Legal** | Revision de textos por abogados en salud | No |
| **Datos** | Procesar informes de Defensoria del Pueblo, CONETEC | Si (Python) |

---

## Licencia

[MIT](LICENSE)

---

<p align="center">
  <b>MapaSalud</b> — Conocer tus derechos es el primer paso.
</p>
