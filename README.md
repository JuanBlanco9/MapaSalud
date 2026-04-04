<h1 align="center">MapaSalud</h1>

<p align="center">
  <b>Herramienta gratuita de navegacion del sistema de salud argentino</b><br/>
  Cobertura, derechos, amparos y asistente de reclamos para pacientes con enfermedades cronicas
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Claude_API-Sonnet-cc785c?style=for-the-badge&logo=anthropic" />
  <img src="https://img.shields.io/badge/Vercel-Edge_Functions-000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## El problema

Un paciente recibe un diagnostico. La obra social le niega el tratamiento. No sabe que tiene derecho, no sabe como reclamar, no sabe a quien llamar.

- **5.474 amparos de salud** se iniciaron en 2018 — 5x mas que en 2011
- **90%** de los fallos judiciales son favorables al paciente
- **42%** de los amparos se originan en Buenos Aires

El sistema legal argentino es progresista en derechos de salud. El problema no es la ley — es que la mayoria no sabe que existe.

**MapaSalud cierra esa brecha.**

---

## Que hace

MapaSalud toma la situacion del paciente (obra social + diagnostico) y le muestra:

| Funcion | Descripcion |
|---------|-------------|
| **Mapa de cobertura** | Que tratamientos le corresponden por ley, cruzados contra el vademecum oficial (Res. 3377/2022, Anexo I verificado) |
| **Tres niveles de cobertura** | Cubierto por ley nacional, cubierto a nivel provincial, o requiere gestion — visualmente claros |
| **Proceso de autorizacion** | Como pedir la cobertura: canal, telefonos de auditoria medica, tiempos por obra social |
| **Asistente de reclamos** | IA que genera cartas documento y emails formales con la cita legal exacta |
| **PDF descargable** | Mapa personalizado para llevar al medico o al abogado |
| **Guia de amparos** | 10 secciones: paso a paso, documentacion, modelos de carta, jurisprudencia, FAQ |

### No es una herramienta medica

No recomienda tratamientos, no dice si el medico tiene razon, no garantiza resultados legales, y no almacena datos personales. Es una herramienta de **navegacion del sistema de salud**.

---

## Patologias

| Patologia | Estado | Datos verificados |
|-----------|--------|-------------------|
| **Oncologia** | Completa | 103 drogas cruzadas contra Res. 3377/2022. 5 tipos de cancer, 15+ subtipos con biomarcadores. 10 obras sociales con telefonos reales. Precios abril 2026. |
| **Diabetes Tipo 1** | Estructura lista | Insulinas, sensores CGM, bombas de insulina. Ley 23.753 + Ley 26.914. |
| Enfermedades poco frecuentes | Planificado | Ley 26.689 |
| Reumatologicas | Planificado | — |
| VIH / Hepatitis | Planificado | Ley 27.675 |

La arquitectura soporta multiples patologias con carga dinamica — agregar una nueva es crear 3 archivos de datos.

---

## Arquitectura

```
mapasalud/
├── api/
│   └── generar-carta.js            # Vercel Edge Function → Claude API
├── src/
│   ├── components/
│   │   ├── AsistenteReclamo.jsx    # Paso 4: generacion de cartas con IA
│   │   ├── Header.jsx              # Nav + boton "Me dijeron que NO"
│   │   ├── Footer.jsx              # Disclaimer permanente
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx                # Landing con CTAs
│   │   ├── SeleccionPatologia.jsx  # Selector de patologia
│   │   ├── Cobertura.jsx           # Flujo de 3 pasos (OS → diagnostico → mapa)
│   │   ├── Amparo.jsx              # Guia completa de amparos (10 secciones)
│   │   └── NotFound.jsx
│   ├── data/
│   │   ├── coberturas.js           # 10 obras sociales con datos reales
│   │   ├── textosLegales.js        # 12 articulos de ley exactos
│   │   ├── templatesCarta.js       # Templates fallback (sin internet)
│   │   ├── amparos.js              # Contenido de la guia de amparos
│   │   ├── organizaciones.js       # LALCEC, FUCA, defensores del pueblo
│   │   ├── modelos.js              # Carta documento + jurisprudencia
│   │   └── patologias/
│   │       ├── index.js            # Registry + loader dinamico
│   │       ├── oncologia/
│   │       │   ├── config.js       # Nombre, labels, base legal
│   │       │   ├── tipos.js        # 5 canceres, 15+ subtipos
│   │       │   └── cobertura.js    # Nivel por droga (nacional/PBA/gestion)
│   │       └── diabetes1/
│   │           ├── config.js
│   │           ├── tipos.js        # Insulinas, sensores, bombas
│   │           └── cobertura.js    # Nivel por insumo (ley/PMO/gestion)
│   └── utils/
│       └── generarPDF.js           # PDF client-side con jsPDF (lazy loaded)
├── vercel.json                     # Rewrites para Edge Function + SPA
└── .env.example
```

### Tres niveles de cobertura

Cada droga o insumo tiene un nivel verificado contra fuentes oficiales:

| Nivel | Significado | Color | Fuente |
|-------|-------------|-------|--------|
| **Nacional** | Exigible en cualquier OS del pais | Verde | Res. 3377/2022 (oncologia), Ley 23.753 (diabetes) |
| **Provincial (PBA)** | Cubierto en Provincia de Buenos Aires | Naranja | Vademecum IPC PBA oct 2024 |
| **Requiere gestion** | Necesita reclamo SSS o amparo | Rojo | Jurisprudencia + experiencia de pacientes |

El lookup de nivel maneja combinaciones (A + B toma el nivel mas restrictivo). Ejemplo: Nivolumab (nacional) + Ipilimumab (gestion) = gestion.

### Dificultad de acceso real

Ademas del derecho legal, cada droga muestra un indicador de dificultad practica:

| Indicador | Significado |
|-----------|-------------|
| **Acceso directo** | Lo pedis y te lo dan. Farmacia con receta. |
| **Acceso con tramite** | Cubierto pero requiere autorizacion previa. Puede demorar. |
| **Acceso dificil** | Alto indice de negativas. Probable reclamo o amparo. |

**Metodologia:** La dificultad se estima a partir de:
- Cantidad de fallos judiciales por droga (mas fallos = mas negativas)
- Datos de `queAprueban` / `queNiegan` por OS (de sitios oficiales)
- Precio de la droga (alto costo = mas resistencia)
- Disponibilidad en el mercado argentino (Dexcom sin distribuidor oficial)
- Estadisticas del Registro Nacional de Amparos SSS 2024

**Limitaciones honestas:**
- La dificultad mostrada es un **promedio nacional**. No tenemos tasas de aprobacion/negativa por droga por OS.
- Donde tenemos datos especificos de una OS (OSDE, IOMA, DOSEP), la UI muestra un disclaimer con la fuente.
- Donde NO tenemos datos, la UI dice explicitamente: "La dificultad mostrada es un promedio nacional — no tenemos datos especificos de esta obra social."
- La cobertura oncologica de OSDE es la misma en todos los planes (210 a 510). La diferencia es red de prestadores y velocidad, no tasa de aprobacion.

Cada indicador tiene un boton (i) que expande la evidencia: por que esa clasificacion, cuantos fallos judiciales, y links a las fuentes.

### Asistente de reclamos

```
Paciente completa su mapa (Paso 3)
    ↓
Elige tratamiento a reclamar
    ↓
3 preguntas: ¿ya lo pediste? ¿que respondieron? ¿cuando?
    ↓
Sistema determina tipo de documento:
  - No respondieron     → email de seguimiento
  - Negativa verbal     → email pidiendo negativa escrita
  - Negativa escrita    → carta documento
  - Aprobado sin entrega → carta de intimacion
    ↓
POST /api/generar-carta (Edge Function)
    → Claude API con textos legales exactos inyectados
    ← Documento personalizado
    ↓
Textarea editable + Copiar + Descargar .txt
    ↓
Si la API falla → template estatico con campos [COMPLETAR]
```

La API key nunca llega al frontend. Los textos legales (12 articulos) se inyectan verbatim en el prompt — no se parafrasean.

---

## Stack

| Componente | Tecnologia |
|-----------|-----------|
| Frontend | React 19 + Tailwind CSS 4 + Vite 8 |
| Asistente IA | Claude API (Sonnet) via Vercel Edge Function |
| PDF | jsPDF (client-side, lazy loaded) |
| Iconos | Lucide React |
| Routing | React Router 7 |
| Deploy | Vercel |
| Datos | JSON/JS estatico — sin base de datos |

---

## Quick Start

```bash
git clone https://github.com/JuanBlanco9/MapaSalud.git
cd MapaSalud
npm install
npm run dev
```

La app funciona completa sin API key. El asistente de reclamos usa templates fallback.

Para habilitar la generacion con IA:

```bash
cp .env.example .env.local
# Editar .env.local con tu API key de Anthropic
```

### Build de produccion

```bash
npm run build       # Build optimizado (354KB main + lazy chunks)
npm run preview     # Preview local del build
```

---

## Deploy en Vercel

1. Importar el repo en [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Vite**
3. En Settings → Environment Variables, agregar `ANTHROPIC_API_KEY`
4. Deploy

El `vercel.json` ya tiene la configuracion de rewrites para la Edge Function y el SPA routing.

---

## Fuentes de datos

| Dato | Fuente | Verificacion |
|------|--------|-------------|
| Drogas oncologicas cubiertas | Anexo I, Res. 3377/2022 (PDF oficial Ministerio de Salud) | Abril 2026 |
| Drogas IPC Buenos Aires | Vademecum IPC PBA, Ministerio de Salud PBA | Octubre 2024 |
| Precios de medicamentos | preciosdemedicamentos.com.ar, alfabeta.net | Abril 2026 |
| Coberturas por obra social | Sitios oficiales de cada OS + Mundo Cancer | Abril 2026 |
| Programas de acceso expandido | AstraZeneca, Roche, MSD, Pfizer, Novartis Argentina | Abril 2026 |
| Textos legales | Boletin Oficial, InfoLEG, SAIJ | Abril 2026 |

### Obras sociales con datos reales

| Obra Social | Telefono auditoria | Canal autorizacion | Programa oncologico |
|-------------|-------------------|-------------------|---------------------|
| IOMA | 0810-999-4662 | App IOMA Digital | Enfermedad Oncologica + Cuidarte |
| OSDE | 0810-555-6733 | App OSDE / web | Formulario dedicado |
| Swiss Medical | 0810-444-7700 | Mi Swiss Medical | — |
| Galeno | 0810-999-7828 | App Galeno | — |
| Medife | 0800-999-9000 | Portal web | — |
| OSECAC | 0800-666-0400 | App OSECAC | — |
| OMINT | 0800-777-6246 | Web (2 niveles) | Consulta internacional |
| AMOBP | 0800-555-6722 | Presencial | — |
| DOSEP | 266-4452000 x4045 | Hospitales designados | Circuito provincial |
| Hospital publico | bndo@msal.gov.ar | BNDE via hospital | Dir. Nacional del Cancer |

### Actualizacion periodica

- **Precios**: mensuales (inflacion). Mostrar siempre "precio aproximado a [mes/anio]".
- **Telefonos**: semestrales.
- **Vademecum PMO**: 2-3 actualizaciones por anio (Ministerio de Salud).

---

## Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

Areas donde mas se necesita ayuda:

| Area | Descripcion | Requiere programar |
|------|-------------|-------------------|
| **Curado de datos** | Verificar telefonos, precios, procesos | No |
| **Nuevas patologias** | Diabetes T1 (completar), EPF, reumatologicas | Si (3 archivos JS) |
| **Accesibilidad** | Testing con lectores de pantalla, contraste | No |
| **Legal** | Revision de textos legales por abogados | No |
| **Traducciones** | Guarani, quechua (provincias del norte) | Parcial |

---

## Licencia

[MIT](LICENSE)

---

<p align="center">
  <b>MapaSalud</b> — Porque saber tus derechos no deberia requerir un abogado.
</p>
