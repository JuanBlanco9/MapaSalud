# Context for Claude — MapaSalud

Documento de handoff para continuar el trabajo en otra sesión.
Última actualización: abril 2026.

---

## Que es MapaSalud

Herramienta web gratuita y open source para que pacientes argentinos con enfermedades cronicas (oncologia y diabetes T1 hoy) sepan:
- Que cobertura les corresponde por ley
- Que tan dificil es conseguirla en la practica
- Como reclamar formalmente si se las niegan

**Repo**: github.com/JuanBlanco9/MapaSalud
**Deploy**: mapa-salud.vercel.app
**Stack**: React 19 + Vite 8 + Tailwind 4 + Vitest, deploy en Vercel
**Sin backend**, sin base de datos, sin login, sin tracking de usuarios

## Contexto del proyecto

- El usuario es **Juan Blanco**, data scientist argentino
- El proyecto se va a presentar a un **diputado argentino y su equipo de developers**
- Tono del usuario: pragmatico, exige rigor, empuja contra opiniones disfrazadas de hechos, valora honestidad sobre marketing
- **Prefiere no agregar funcionalidad innecesaria** (rechazo el login con Google porque no aporta nada concreto)
- Cuando algo no se puede verificar, prefiere sacarlo a inventar fuentes

---

## Estado actual (importante)

**Todo limpio:**
- 0 errores ESLint (2 warnings esperados de react-refresh en context/Verificando)
- 36/36 tests Vitest pasando
- Build OK (~470KB main chunk, 138KB gzipped)
- 0 patterns problematicos en el codebase (verificado por grep)

**Ultimo commit:** `fc4dbc2` — "Rewrite README, update CONTRIBUTING and LAST_VERIFIED for presentation"

---

## Lo que hicimos en esta sesion (resumen alto nivel)

### 1. Code quality (commit 9255dde)
- Creado ErrorBoundary global
- Creado constants.js (PATOLOGIA, OS_ID, NIVEL_COBERTURA, DIFICULTAD, TIPO_DOCUMENTO) e integrado en 7 archivos
- AsistenteReclamo.jsx splitteado: 836 → 525 lineas, extraidos ProgresoCarta, PanelFirma, generarReclamoPDF
- CoberturaContext creado, Paso3Mapa pasa de 11 props a 3
- obrasSociales.js separado de coberturas.js
- memo() en DrogaConNivel, style maps a nivel de modulo
- PropTypes en 8 componentes
- ESLint strict configurado (eqeqeq, no-var, prefer-const, no-console, no-debugger, exhaustive-deps)
- Vitest setup con 36 tests (constants, templates, textosLegales, jurisprudencia)

### 2. Auditoria desde optica de OS (commit 49a8229)
Una OS no puede demandar por sentimientos pero si por afirmaciones falsas. Sacamos todo lo que no podiamos respaldar:
- DOSEP: removidas "denegaciones sistematicas", "catch-22 reportado", "demoras cronicas reportadas"
- IOMA: removidas "Asciminib denegado", "Venetoclax denegado", "demoras cronicas"
- Hospital publico: removida "400.000 unidades de morfina vencidas" (sin fuente)
- Medife off-label: movido de queNiegan a nota neutral ("evaluacion caso por caso")
- Stats clickeables con link a SSS y OLEGISAR
- Disclaimer visible al usuario sobre la limitacion de los datos de dificultadPorOS
- PROMESA renombrado a "Resumen del caso para tu abogado" (PROMESA requiere patrocinio letrado obligatorio, lo que generamos es un brief)

### 3. Templates diferenciados por nivel de cobertura (commit 49a8229)
**Esto fue critico.** Antes, una carta documento citaba la misma base legal tanto si la droga estaba en Res. 3377/2022 como si era de gestion. Eso era un problema legal: estabamos citando una resolucion que no aplicaba.

Ahora hay 3 branches:
- **cubierto** (nacional/ley/pmo): cita listado oficial directamente
- **pba** (provincial): cita IPC Buenos Aires
- **gestion**: NO cita listado oficial. Usa argumento jurisprudencial — "PMO es piso no techo" + Benghalensis (CSJN Fallos 323:1339) + B.J.G. c/ OSPLAD (CNACAF Sala III)

**Importante**: en los templates de gestion, la CSJN y la CNACAF se citan en **oraciones separadas**. Antes decia "la CSJN ha establecido... CNACAF" lo cual atribuia un fallo de Camara a la Corte. Eso es un error legal.

### 4. Auditoria de fallos (commit 49a8229 + 8d77c14)
- Eran 44 fallos. Verifique todos contra fuente web.
- Removidos 4 no verificables: Gomez c/ IPSST Tucuman, T-DM1 Rosario OS UNR, Z.Y.E. bomba Union Personal, duplicado Brigatinib
- Agregados 7 nuevos con cita MJ verificada leyendo directamente de Microjuris via WebFetch:
  - F.C.A. c/ PAMI Parana QT mama (MJ-153791)
  - I.J.R. c/ OSDE Pembrolizumab renal (MJ-135570)
  - R.CH.G. c/ Salta Volanesorsen (MJ-152040)
  - A.I. c/ PAMI Atezolizumab+Bevacizumab higado (MJ-154415)
  - R.J.L. c/ Union Personal IMRT 832km (MJ-156543)
  - B.V.G. c/ Galeno sensor (MJ-116486)
  - M.V.A. c/ IOMA sensor (MJ-113179)
  - A.P.A. Rio Negro sensor menor (MJ-121910)
  - P.A.A. c/ OSPACA insulina Mendoza (MJ-104506)
- Total ahora: **47 fallos**, 14 con cita MJ, 7 CSJN
- Cada fallo verificado tiene URL en el campo `url`
- Documentado en `JURISPRUDENCIA_VERIFICADA.md`

### 5. Verificacion de PROMESA (commit 8d77c14) — IMPORTANTE
**El PDF en `docs/normas_pdf/12_Dec_379-2025_PROMESA.pdf` esta INCORRECTO**. Contiene una resolucion electoral de Misiones, no el DNU PROMESA. La URL en el script `gen_pdf.py` era un placeholder.

**URL real del DNU 379/2025**: https://www.boletinoficial.gob.ar/detalleAviso/primera/326414/20250604
**InfoLEG id**: 413574

Correcciones que hicimos:
- "Decreto 379/2025" → "DNU 379/2025" en todo el codebase (es un Decreto de Necesidad y Urgencia)
- Removidas TODAS las referencias a TAD/tramitesadistancia.gob.ar (el decreto NO especifica TAD como canal)
- Confirmados via fuentes oficiales: patrocinio letrado obligatorio SI, primera audiencia en 5 dias SI, OS no puede negarse SI
- Reglamentado por Resolucion Conjunta 1/2025 (Min. Justicia y Min. Salud)

**TODO**: descargar el PDF correcto del DNU 379/2025 y reemplazar el archivo en `docs/normas_pdf/`.

### 6. Auditoria final de 19 issues (commit 211d403)
- PROMESA reemplazarDatos: regex no matcheaba `DNI: [COMPLETAR]` con dos puntos. Tampoco Email: ni Telefono:. Arreglado.
- Caratula duplicada `[Amparista] c/ PAMI s/ Amparo` usada para 2 fallos distintos (Salta diabetes y Concordia onco). El contexto del primero se aplicaba al segundo. Renombradas a carátulas únicas.
- OSECAC PET: caratula en contexto.js no matcheaba con fallos.js. Arreglado.
- "Sistemas DIY de asa cerrada" aparecia en dropdown de reclamo. Agregado "no disponible" al nombre para que el filtro lo excluya.
- "CDK4/6 inhibidor si metastasico" retornaba null porque el `/` lo splitteaba mal. Reemplazado por "Palbociclib + Hormonoterapia (si metastasico)".
- FreeStyle Libre Parana movido de `jurisprudenciaDiabetesInsulinaAdicional` a `jurisprudenciaDiabetesSensor` (era inconsistente con su tipo).
- R.J.L. IMRT tipo cambiado de ONCO_ESTUDIO a ONCO_TRATAMIENTO.
- Agregados 11 contexto entries para fallos sin contexto.
- fallosPorProvincia recontado: Santa Fe 6 (era 3), Salta 3 (era 2), Rio Negro 3 (era 2), agregada Chaco.
- Removido contexto huerfano de Z.Y.E.
- Art. 75 inc. 22 CN + PIDESC Art. 12 agregados a textosLegales.
- PET PSMA agregado a nivelCobertura como "gestion".
- Hardcoded "gestion" en Paso3Mapa.jsx reemplazado por NIVEL_COBERTURA.GESTION.
- Dexcom ONE+ y Eversense E3 con entradas explicitas en diabetes cobertura.
- Dead exports removidos.

### 7. Verificacion contra PDFs descargados (commit 6c74234)
El usuario descargo las 12 normas como PDF en `docs/normas_pdf/`. Verifique cada cita textual contra el texto oficial:
- PMO 7.3: ✓ correcto
- Ley 23.753 Art. 5: ✓ correcto
- Ley 26.914: ✓ correcto (incluyendo la nota de que "equipos y dispositivos" es interpretacion jurisprudencial, no texto literal)
- Res. 2091/2025: ✓ correcto (verificada via web porque el PDF tenia error de encoding)
- Ley 26.682 Art. 7: ✓ correcto
- Ley 26.872 Art. 1: ✓ correcto
- Res. 1926/2024: tenia simplificacion. Cambiada de "establece la exencion" a "exceptua" (la resolucion liberaliza coseguros y EXCEPTUA oncologia, no establece una exencion)

### 8. UX post-reclamo (commit 6c74234)
El "proximo paso" antes era vago. Ahora hay escalacion en 3 pasos con plazos:
1. Esperar 10 dias habiles
2. Si no responden: SSS (0800-222-72583, gratuito sin abogado), PROMESA (con abogado), o amparo
3. Removido el costo estimado de carta documento ("$5K-$15K") porque no podiamos verificarlo

### 9. Feedback mejorado (commit 6c74234)
- Antes: solo link a GitHub Issues
- Ahora: email mailto: + GitHub para developers
- Direccion: mapasalud.contacto@gmail.com (placeholder, el usuario tiene que crearla o cambiarla)

### 10. Auditoria final 4 issues (commit 11caca8)
- Home.jsx: 40 → 47 fallos
- Amparo.jsx: "Decreto 379/2025" → "DNU 379/2025" en 4 lugares
- jurisprudencia_sensor_cgm sin URL: agregadas citas MJ
- modelos.js: "establece la exencion" → "exceptua de coseguros"

### 11. README + docs (commit fc4dbc2)
- README reescrito desde 0 con la realidad actual
- CONTRIBUTING actualizado
- LAST_VERIFIED actualizado

---

## Decisiones clave (con razonamiento)

### Sin login, sin backend, sin tracking
**Razon**: Datos de salud son sensibles. "No almacenamos datos personales" es un diferencial real. Un paciente con cancer asustado no quiere crear cuenta para ver sus derechos. La complejidad operativa de manejar PII de salud no justifica los beneficios marginales.

### Templates diferenciados por nivel de cobertura
**Razon**: Una carta documento que cita Res. 3377/2022 para una droga que no esta en esa resolucion es legalmente debil y nos puede traer problemas. La diferenciacion permite argumentar correctamente en cada caso.

### CSJN y CNACAF en oraciones separadas
**Razon**: "La Corte Suprema ha establecido... CNACAF Sala III" es atribucion incorrecta. Una OS con un buen abogado lo desafiaria. Mejor: "La CSJN ha establecido... [oracion]. En el mismo sentido, la Justicia Federal ha sostenido este criterio (CNACAF...)".

### Drogas no disponibles en ARG marcadas explicitamente
**Razon**: No tiene sentido generar un reclamo para Lyumjev si no tiene registro ANMAT. El paciente perderia tiempo. El filtro `.includes("no disponible")` las excluye del dropdown.

### PROMESA generamos un "resumen para abogado", no el documento final
**Razon**: PROMESA requiere patrocinio letrado obligatorio (verificado contra el DNU). Generar el documento "final" daria falsa seguridad. El abogado rehace la presentacion igual; lo que aporta MapaSalud es el brief con datos ordenados.

### Banner rojo "Mi obra social me dijo que NO" se mantiene
**Razon**: El usuario lo dejo claro: "No nos pueden reclamar por sentimientos". El paciente describe SU situacion (es factual desde la perspectiva del usuario), no es una afirmacion de MapaSalud sobre la OS.

### TAD removido completamente
**Razon**: El DNU 379/2025 NO especifica TAD como canal. Lo decia la pagina de la SSS, pero no esta en la norma. Decir que "se presenta por TAD" es una afirmacion sobre el procedimiento que no podemos respaldar. Mejor: "consulta con tu abogado el canal vigente".

---

## Lo que falta / pendientes

### Critico (verificar antes de presentar)
1. **El PDF del DNU 379/2025 en `docs/normas_pdf/` esta INCORRECTO**. Necesita descargarse del URL correcto: https://www.boletinoficial.gob.ar/detalleAviso/primera/326414/20250604
2. **Email de contacto** `mapasalud.contacto@gmail.com` es placeholder. El usuario tiene que crearla o cambiarla en `src/components/layout/Footer.jsx`.

### Significativo (mejoraria la calidad)
3. **Verificacion de las otras 9 normas contra PDFs**: PMO, Ley 23.753, Ley 26.914, Ley 26.682, Ley 26.872, Res. 2091, Res. 3377, Res. 1926, CN. Spot-checks ya hechos pero no exhaustivos articulo por articulo.
4. **Solo cubrimos 10 OS**. Argentina tiene 300+. Patron expandible pero requiere data.
5. **Precios de drogas sin pipeline de actualizacion**. Dice "abril 2026" + warning "pueden haber cambiado" pero no hay job que los actualice.
6. **25+ drogas sin explicacion en explicacionesDrogas.js** (ver auditoria de drogas).
7. **Solo 2 patologias**. La arquitectura soporta mas (3 archivos JS por patologia). Prioridades: enfermedades poco frecuentes (Ley 26.689), reumatologicas, VIH/Hepatitis (Ley 27.675).

### Nice to have
8. **Analytics**: Vercel Analytics es 1 linea de codigo si el usuario quiere medir uso. No se hizo porque no se decidio.
9. **Testing con usuarios reales**: nunca se probo con un paciente. Lenguaje puede ser opaco para alguien en crisis.
10. **Pipeline de jurisprudencia**: hoy se agregan fallos a mano. Podria scrapear Microjuris semanalmente.
11. **i18n**: hoy todo en espanol. Si se quiere ofrecer en otros idiomas o quechua/guarani.
12. **Auditoria contable de OS**: que OS realmente cumple. Hoy decimos que cubren por ley pero no medimos cumplimiento real.

---

## Estructura del repo (ubicacion de cosas clave)

```
src/
  constants.js                    # PATOLOGIA, OS_ID, NIVEL_COBERTURA, DIFICULTAD, TIPO_DOCUMENTO
  context/CoberturaContext.jsx    # Context global del flujo de cobertura
  components/
    ErrorBoundary.jsx
    AsistenteReclamo.jsx          # 525 lineas, flujo de reclamo
    cobertura/
      Paso3Mapa.jsx               # Mapa con tabs (cobertura/tratamiento/reclamo)
      Badges.jsx                  # NivelBadge, DificultadBadge, DrogaConNivel (memo)
      estilos.js                  # nivelStyles compartidos
    reclamo/
      ProgresoCarta.jsx
      PanelFirma.jsx              # Canvas de firma touch
    layout/Footer.jsx             # Email + GitHub feedback
  pages/
    Home.jsx                      # 47 fallos en stats
    Cobertura.jsx                 # Orquestador con CoberturaProvider
    Amparo.jsx                    # PROMESA explicado (DNU 379/2025)
  data/
    coberturas.js                 # 10 OS + nivelCobertura oncologia
    obrasSociales.js              # Re-export de obrasSociales
    templatesCarta.js             # 7 templates con 3 branches por cobertura
    textosLegales.js              # 16 textos legales con [Fuente: URL]
    explicacionesDrogas.js        # 49 drogas con queEs, administracion, precio
    dificultadAcceso.js           # Dificultad por droga + fundamentacion
    dificultadPorOS.js            # Ajustes por OS con disclaimer
    modelos.js                    # Modelos legales (uno con la wording corregida)
    organizacionesPorPatologia.js
    jurisprudencia/
      fallos.js                   # 47 fallos
      contexto.js                 # 34 entradas de aplicabilidad
      index.js                    # Re-exports
    patologias/
      index.js
      oncologia/
      diabetes1/
  utils/
    generarPDF.js                 # PDF mapa
    generarReclamoPDF.js          # PDF reclamo con firma
  test/
    setup.js                      # @testing-library/jest-dom
    constants.test.js
    templatesCarta.test.js        # 14 tests por nivel/patologia
    textosLegales.test.js
    jurisprudencia.test.js

docs/
  normas_pdf/                     # 12 PDFs de normas (PROMESA es INCORRECTO)
  gen_pdf.py                      # Script que las descarga (URL de PROMESA es placeholder)

README.md                         # Descripcion completa
JURISPRUDENCIA_VERIFICADA.md      # 47 fallos con verificacion
CONTRIBUTING.md
LAST_VERIFIED.md                  # Cuando se verifico cada categoria
.github/ISSUE_TEMPLATE/dato-incorrecto.md
```

---

## Como continuar

### Para validar el estado actual:
```bash
cd "D:/MapaSalud/mapasalud"
npm test          # 36 tests deben pasar
npm run lint      # 0 errores (2 warnings esperados)
npm run build     # Build OK
```

### Para verificar que no haya regresiones de patrones removidos:
```bash
grep -r "denegaciones sistematicas" src/    # debe estar vacio
grep -r "Decreto 379" src/                  # debe estar vacio
grep -r "tramitesadistancia" src/           # debe estar vacio
grep -r "establece la exencion" src/        # debe estar vacio
```

### Reglas que el usuario tiene claras:
- **No inventar fuentes**. Si no podemos verificar, sacarlo o marcarlo como pendiente.
- **No agregar opiniones**. "Suelen", "rara vez", "la mayoria" estan prohibidos sin data.
- **No simplificar normas legalmente importantes**. Mejor decirlo bien aunque sea mas largo.
- **Sin emojis en el codigo** (ni en commits ni en comentarios).
- **Commits descriptivos** con co-author de Claude.
- **Templates diferenciados por nivel de cobertura siempre**.
- **Datos personales nunca se persisten**.

### Cosas que el usuario rechazo en esta sesion:
- Login con Google (no aporta valor concreto)
- Cambiar el banner rojo "Mi obra social me dijo que NO" (no es reclamable)
- Poner caveats dentro del documento de reclamo (debilita la posicion del paciente — el caveat va en la UI)

---

## Memoria personal del usuario (de auto-memory)

- **Juan Blanco** — data scientist, contexto argentino
- Prefiere honestidad sobre marketing
- Prefiere metricas conservadoras
- Es el responsable de varios proyectos: Grain Intel, MapaSalud, OncoPrecision, Budget Galaxy, Credit Score Argentina, PEP Tool, SAPS Ucrania
- **NUNCA aproximar datos sin fuente verificable** (regla critica del usuario)
- Prefiere agentes en paralelo cuando es posible
- Para visualizaciones geograficas de USA states: el layout esferico no funciona, usar treemap/choropleth
