<h1 align="center">MapaSalud</h1>

<p align="center">
  <b>Herramienta gratuita de navegacion del sistema de salud argentino</b><br/>
  Cobertura, derechos, amparos y asistente de reclamos para pacientes con enfermedades cronicas
</p>

<p align="center">
  <a href="https://mapa-salud.vercel.app">mapa-salud.vercel.app</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Tests-36_passing-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## El problema

En 2024 se iniciaron **10.072 amparos de salud** en Argentina ([Registro SSS](https://www.sssalud.gob.ar/index.php?page=bus_regamparo)). Mas del 80% se resuelven favorablemente para el paciente ([OLEGISAR](https://olegisar.csjn.gob.ar/)). El problema no es la ley — es que la mayoria de los pacientes no sabe que puede reclamar, como hacerlo, ni a quien llamar.

## Que hace

MapaSalud toma la situacion del paciente (obra social + diagnostico) y le muestra:

| Funcion | Descripcion |
|---------|-------------|
| **Mapa de cobertura** | Que tratamientos le corresponden, con semaforo legal + dificultad de acceso real |
| **Explicaciones de drogas** | Cada droga clickeable con explicacion simple, administracion, precio aproximado |
| **Asistente de reclamos** | Genera cartas documento, emails, intimaciones y resumen PROMESA con base legal diferenciada segun nivel de cobertura |
| **Jurisprudencia** | 47 fallos verificados contra fuentes primarias (Microjuris, SAIJ, CIJ) |
| **Guia de amparos** | Paso a paso, PROMESA (DNU 379/2025), organizaciones, defensores del pueblo |
| **PDF descargable** | Mapa personalizado con firma digital |

### No es una herramienta medica

No recomienda tratamientos, no dice si el medico tiene razon, no garantiza resultados legales, y no almacena datos personales.

---

## Patologias cubiertas

| Patologia | Estado | Datos |
|-----------|--------|-------|
| **Oncologia** | Completa | 75+ drogas mapeadas (Res. 3377/2022). 5 canceres, 15 subtipos. 10 OS con telefonos verificados. |
| **Diabetes Tipo 1** | Completa | Insulinas, sensores (FreeStyle Libre al 100% por Res. 2091/2025), bombas. |
| Enfermedades poco frecuentes | Planificado | — |
| VIH / Hepatitis | Planificado | — |

---

## Datos verificados

Todas las citas legales fueron cruzadas contra el texto oficial descargado de InfoLEG y Boletin Oficial.

| Dato | Fuente | Verificacion |
|------|--------|-------------|
| Normativa (12 regulaciones) | PDFs oficiales de InfoLEG/B.O. | Abril 2026 — [ver docs/normas_pdf/](docs/normas_pdf/) |
| 47 fallos judiciales | Microjuris (14 con cita MJ), SAIJ (7 CSJN), CIJ, poderes judiciales | Abril 2026 — [ver JURISPRUDENCIA_VERIFICADA.md](JURISPRUDENCIA_VERIFICADA.md) |
| Precios medicamentos | preciosdemedicamentos.com.ar, alfabeta.net | Abril 2026 (nota visible: "pueden haber cambiado") |
| 10 OS con telefonos | Sitios oficiales de cada OS | Abril 2026 |
| Drogas no disponibles en ARG | Verificacion ANMAT | Marcadas con "(no disponible en ARG)" y excluidas del reclamo |

### Regulaciones usadas

1. Res. 201/2002 — PMO (Anexo I, punto 7.3: oncologia al 100%)
2. Res. 3377/2022 — Listado Complementario de Medicamentos Oncologicos
3. Res. 1926/2024 — Oncologia exceptuada de coseguros
4. Ley 26.682 Art. 7 — Prepagas deben cubrir PMO
5. Ley 23.660 Art. 3 — Obras sociales
6. Ley 24.754 — Prepagas = mismas prestaciones que OS
7. Ley 26.872 — Reconstruccion mamaria obligatoria
8. Ley 23.753 Art. 5 — Cobertura 100% diabetes
9. Ley 26.914 — Ampliacion cobertura diabetes
10. Res. 2091/2025 — Sensores flash al 100% para insulinodependientes
11. CN Art. 42 y 43 — Proteccion de la salud y amparo
12. DNU 379/2025 — PROMESA (mediacion prejudicial en salud)

Cada una verificada contra el texto oficial. Ver [docs/normas_pdf/](docs/normas_pdf/).

### Jurisprudencia

47 fallos organizados por tipo de reclamo. Cada uno con:
- Caratula real, tribunal, fecha
- Cita verificable (14 con numero MJ, 7 con Fallos CSJN)
- Nivel de aplicabilidad (alto/medio/bajo) para evitar citas incorrectas
- URL a la fuente cuando esta disponible

Cobertura: 11 provincias, todos los tipos de reclamo (QT, dirigida, estudios, cirugia, sensores, bombas, insulinas).

Ver [JURISPRUDENCIA_VERIFICADA.md](JURISPRUDENCIA_VERIFICADA.md) para el detalle completo.

---

## Arquitectura

```
src/
  constants.js                         # Constantes globales (elimina magic strings)
  context/CoberturaContext.jsx         # Context para prop drilling
  components/
    ErrorBoundary.jsx                  # Catch de errores global
    layout/                            # Header, Footer, Layout
    cobertura/                         # UI del flujo de cobertura
      Badges.jsx                       # NivelBadge, DificultadBadge, DrogaConNivel (memo)
      Paso3Mapa.jsx                    # Mapa con tabs (cobertura/tratamiento/reclamo)
    reclamo/
      ProgresoCarta.jsx                # Barra de progreso del asistente
      PanelFirma.jsx                   # Canvas de firma touch
    AsistenteReclamo.jsx               # Flujo de reclamo (525 lineas)
  pages/
    Home.jsx                           # Landing con stats linkeadas a fuentes
    Cobertura.jsx                      # Orquestador (CoberturaProvider)
    Amparo.jsx                         # Guia de amparos + PROMESA
  data/
    coberturas.js                      # 10 OS + nivelCobertura (75+ drogas)
    obrasSociales.js                   # Re-export separado de OS (compartido entre patologias)
    templatesCarta.js                  # 7 templates diferenciados por cobertura (cubierto/pba/gestion)
    textosLegales.js                   # 16 textos legales verificados con URL
    explicacionesDrogas.js             # 49 drogas con explicacion simple
    dificultadAcceso.js                # Dificultad real + fundamentacion con fallos
    dificultadPorOS.js                 # Ajustes por OS + disclaimer visible
    organizacionesPorPatologia.js      # LALCEC, FUCA, CUI.D.AR, etc.
    jurisprudencia/
      fallos.js                        # 47 fallos verificados
      contexto.js                      # Aplicabilidad por fallo (34 entradas)
      index.js                         # Re-exports
    patologias/
      index.js                         # Registry + dynamic import()
      oncologia/                       # config + tipos + cobertura
      diabetes1/                       # config + tipos + cobertura
  utils/
    generarPDF.js                      # PDF mapa de cobertura
    generarReclamoPDF.js               # PDF reclamo con firma
  test/
    setup.js                           # Vitest + jsdom
    constants.test.js
    templatesCarta.test.js             # 14 tests (por cobertura, por patologia, PBA, CNACAF, error)
    textosLegales.test.js
    jurisprudencia.test.js
```

### Templates diferenciados por nivel de cobertura

Cada template genera argumentacion legal distinta segun el nivel de la droga:

| Nivel | Argumento legal | Ejemplo |
|-------|----------------|---------|
| **Cubierto** (nacional/ley/pmo) | "Se encuentra en los listados oficiales" + cita Res. 3377 o Ley 23.753 | Trastuzumab, FreeStyle Libre |
| **PBA** (provincial) | "Incluido en el IPC provincial Buenos Aires" | T-DM1, Atezolizumab |
| **Gestion** | "PMO es piso no techo" + cita CSJN Benghalensis (Fallos 323:1339) + CNACAF B.J.G. c/ OSPLAD | Osimertinib, Dexcom G7 |

La CSJN y la CNACAF se citan en **oraciones separadas** para no confundir jurisdicciones.

### Asistente de reclamos

```
Paciente completa su mapa → elige tratamiento a reclamar
    ↓
3 preguntas: ya lo pediste? / que respondieron? / cuando?
    ↓
Si negativa escrita → elige: Carta documento o PROMESA
    ↓
Formulario de datos + firma touch
    ↓
Template con base legal diferenciada + jurisprudencia de nivel alto
    ↓
Copiar / .txt / PDF con firma
    ↓
Proximo paso: escalacion en 3 pasos con plazos (10 dias, SSS, amparo)
```

El template de PROMESA se genera como **resumen del caso para el abogado**, no como documento final (requiere patrocinio letrado obligatorio).

---

## Quick Start

```bash
git clone https://github.com/JuanBlanco9/MapaSalud.git
cd MapaSalud
npm install
npm run dev
```

La app funciona completa sin API key ni backend.

```bash
npm run build       # Build de produccion
npm run test        # 36 tests (Vitest)
npm run lint        # ESLint strict (0 errores)
```

### Deploy en Vercel

1. Importar repo en [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite**
3. Deploy

---

## Testing

```bash
npm test            # 36 tests
```

Tests cubren:
- Constantes (PATOLOGIA, OS_ID, NIVEL_COBERTURA, DIFICULTAD, TIPO_DOCUMENTO)
- Templates por nivel de cobertura (cubierto/pba/gestion x oncologia/diabetes)
- Separacion CSJN vs CNACAF en citas
- Texto legal por patologia (no contaminacion onco↔diabetes)
- Jurisprudencia (routing por tipo de reclamo)
- Fallback de error para tipo de documento desconocido

---

## Calidad de codigo

- **ESLint strict**: eqeqeq, no-var, prefer-const, no-console, no-debugger, exhaustive-deps
- **PropTypes** en todos los componentes con props
- **ErrorBoundary** global
- **CoberturaContext** (elimina prop drilling — Paso3Mapa: 11 props → 3)
- **memo()** en DrogaConNivel, style maps a nivel de modulo
- **constants.js** elimina magic strings en 7 archivos

---

## Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

| Area | Descripcion | Requiere programar |
|------|-------------|-------------------|
| **Verificar datos** | Telefonos, precios, procesos de OS | No |
| **Nuevas patologias** | Crear 3 archivos JS (`config.js`, `tipos.js`, `cobertura.js`) | Si |
| **Explicaciones de drogas** | Las que faltan, en lenguaje simple | No |
| **Nuevos fallos** | Con caratula, tribunal, fecha, cita MJ/SAIJ | No |
| **Revision legal** | Revision por abogados en derecho a la salud | No |

### Reportar un error

- **Email**: mapasalud.contacto@gmail.com
- **GitHub**: [Abrir issue](https://github.com/JuanBlanco9/MapaSalud/issues/new?template=dato-incorrecto.md)

---

## Licencia

[MIT](LICENSE)

---

<p align="center">
  <b>MapaSalud</b> — Conocer tus derechos es el primer paso.
</p>
