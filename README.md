# MapaSalud

**Herramienta gratuita de navegacion del sistema de salud argentino.**

Un paciente recibe un diagnostico. La obra social le niega el tratamiento. No sabe que tiene derecho, no sabe como reclamar, no sabe a quien llamar. MapaSalud cierra esa brecha.

> En Argentina, el 90% de los amparos de salud se resuelven a favor del paciente.
> El problema no es la ley — es que la mayoria no sabe que existe.

---

## Que hace

MapaSalud toma la situacion del paciente (obra social + diagnostico) y le muestra:

- **Que tratamientos le corresponden por ley**, cruzados contra el vademecum oficial (Res. 3377/2022, Anexo I verificado)
- **Tres niveles de cobertura** visualmente claros: cubierto por ley nacional, cubierto a nivel provincial, o requiere gestion
- **Como pedir la cobertura** — proceso de autorizacion, telefonos de auditoria medica, tiempos
- **Que hacer si le dicen que no** — asistente de redaccion de reclamos con IA que genera cartas documento y emails formales con la cita legal exacta
- **Un PDF descargable** con su mapa personalizado para llevar al medico o al abogado

### No es una herramienta medica

MapaSalud no recomienda tratamientos, no dice si el medico tiene razon, no garantiza resultados legales, y no almacena datos personales.

Es una herramienta de **navegacion del sistema de salud**.

---

## Patologias cubiertas

| Patologia | Estado | Datos verificados |
|-----------|--------|-------------------|
| **Oncologia** | Completa | 103 drogas cruzadas contra Res. 3377/2022. 5 tipos de cancer, 15+ subtipos con biomarcadores. 10 obras sociales con telefonos reales. Precios abril 2026 (Kairos/Alfabeta). |
| **Diabetes Tipo 1** | Estructura lista | Insulinas, sensores CGM, bombas de insulina. Ley 23.753 + Ley 26.914. |
| Enfermedades poco frecuentes | Planificado | Ley 26.689 |
| Reumatologicas | Planificado | — |
| VIH / Hepatitis | Planificado | Ley 27.675 |

La arquitectura soporta multiples patologias con carga dinamica — agregar una nueva es crear 3 archivos de datos.

---

## Stack

| Capa | Tecnologia |
|------|-----------|
| Frontend | React 19 + Tailwind CSS 4 + Vite 8 |
| Asistente IA | Claude API (Sonnet) via Vercel Edge Function |
| PDF | jsPDF (client-side, sin backend) |
| Deploy | Vercel |
| Datos | JSON/JS estatico, sin base de datos |

---

## Arquitectura de datos

```
src/data/
  coberturas.js                 # Obras sociales (compartido entre patologias)
  textosLegales.js              # Articulos de ley exactos para el asistente IA
  templatesCarta.js             # Templates fallback si la API no responde
  patologias/
    index.js                    # Registry + loader dinamico
    oncologia/
      config.js                 # Nombre, labels, base legal
      tipos.js                  # Tipos de cancer con subtipos y tratamientos
      cobertura.js              # Nivel de cobertura por droga (nacional/PBA/gestion)
    diabetes1/
      config.js
      tipos.js
      cobertura.js
```

### Tres niveles de cobertura

Cada droga o insumo tiene un nivel verificado contra fuentes oficiales:

| Nivel | Significado | Fuente |
|-------|-------------|--------|
| `nacional` | Exigible en cualquier OS del pais | Res. 3377/2022 (oncologia), Ley 23.753 (diabetes) |
| `pba` | Cubierto en Prov. de Buenos Aires | Vademecum IPC PBA oct 2024 |
| `gestion` | Requiere autorizacion, reclamo SSS, o amparo | Jurisprudencia + experiencia de pacientes |

### Asistente de reclamos

Cuando un tratamiento requiere gestion, el paciente puede generar una carta formal:

1. Responde 3 preguntas (ya solicito? que respondieron? cuando?)
2. El sistema determina el tipo de documento (email, carta documento, intimacion)
3. Claude API genera la carta con los textos legales exactos inyectados en el prompt
4. Si la API falla, se usa un template estatico con campos `[COMPLETAR]`

La API key nunca llega al frontend — corre en una Edge Function server-side.

---

## Correr localmente

```bash
git clone https://github.com/mapasalud/mapasalud.git
cd mapasalud
npm install
npm run dev
```

La app funciona completa sin API key. El asistente de reclamos usa templates fallback.

Para habilitar la generacion con IA localmente:

```bash
# Crear archivo .env.local (ya esta en .gitignore)
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
```

### Build de produccion

```bash
npm run build
npm run preview
```

---

## Deploy en Vercel

1. Importar el repo en [vercel.com/new](https://vercel.com/new)
2. Framework: Vite (se detecta automaticamente)
3. En Settings > Environment Variables, agregar `ANTHROPIC_API_KEY`
4. Deploy

El archivo `vercel.json` ya tiene la configuracion de rewrites para la Edge Function y el SPA routing.

---

## Fuentes de datos

Toda la informacion esta verificada contra fuentes oficiales:

| Dato | Fuente | Ultima verificacion |
|------|--------|---------------------|
| Drogas oncologicas cubiertas | Anexo I, Res. 3377/2022 (PDF oficial del Ministerio de Salud) | Abril 2026 |
| Drogas IPC Buenos Aires | Vademecum IPC PBA, Ministerio de Salud PBA | Octubre 2024 |
| Precios de medicamentos | preciosdemedicamentos.com.ar, alfabeta.net | Abril 2026 |
| Coberturas por obra social | Sitios oficiales de cada OS + Mundo Cancer | Abril 2026 |
| Programas de acceso expandido | AstraZeneca, Roche, MSD, Pfizer, Novartis Argentina | Abril 2026 |
| Textos legales | Boletin Oficial, InfoLEG, SAIJ | Abril 2026 |

### Datos que requieren actualizacion periodica

- **Precios**: cambian mensualmente. Mostrar siempre "precio aproximado a [mes/anio]".
- **Telefonos de auditoria medica**: verificar semestralmente.
- **Vademecum PMO**: el Ministerio de Salud lo actualiza 2-3 veces por anio.

---

## Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

Las areas donde mas se necesita ayuda:

- **Curado de datos**: verificar telefonos, procesos de autorizacion, precios actuales
- **Nuevas patologias**: diabetes T1 (completar), enfermedades poco frecuentes, reumatologicas
- **Accesibilidad**: testing con lectores de pantalla, mejoras de contraste
- **Legal**: revision por abogados especializados en salud

---

## Contexto

En Argentina:

- **5.474 amparos de salud** se iniciaron en 2018 — 5x mas que en 2011 ([fuente](https://olegisar.org/amparos-de-salud-estadistica-doctrina-y-registro-nacional/))
- **90%** de los fallos judiciales son favorables al paciente
- **42%** de los amparos se originan en Buenos Aires
- La Res. 1926/2024 eximio a los tratamientos oncologicos de coseguros
- El PMO es un **piso**, no un techo — la jurisprudencia es clara

El sistema legal argentino es progresista en derechos de salud. El problema es la brecha entre el derecho y el acceso: la mayoria de los pacientes no saben que pueden reclamar, como hacerlo, ni a quien llamar.

MapaSalud existe para cerrar esa brecha.

---

## Licencia

[MIT](LICENSE)
