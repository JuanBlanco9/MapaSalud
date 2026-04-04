# Contribuir a MapaSalud

Gracias por tu interes en contribuir. MapaSalud es una herramienta que puede cambiar la vida de pacientes que no saben como navegar el sistema de salud argentino.

## Como contribuir

### 1. Curado de datos (no requiere programar)

La contribucion mas valiosa es verificar y actualizar los datos:

- **Telefonos de auditoria medica** de obras sociales — llamar y confirmar que funcionan
- **Procesos de autorizacion** — verificar que los pasos descritos son correctos
- **Precios de medicamentos** — consultar Kairos o Alfabeta y actualizar
- **Nuevas resoluciones** — si el Ministerio de Salud actualiza el PMO o el listado de medicamentos

Los datos estan en `src/data/` en archivos `.js` con formato legible. Si encontras un dato incorrecto, abri un issue o un PR.

### 2. Nuevas patologias

La arquitectura esta preparada para agregar patologias nuevas. Cada una necesita 3 archivos:

```
src/data/patologias/[nombre]/
  config.js      # Nombre, base legal, labels de la UI
  tipos.js       # Categorias y subtipos con tratamientos
  cobertura.js   # Nivel de cobertura por droga/insumo
```

Despues se registra en `src/data/patologias/index.js`.

Patologias prioritarias: enfermedades poco frecuentes (Ley 26.689), reumatologicas, VIH/hepatitis (Ley 27.675).

### 3. Codigo

- Fork del repo
- Crear branch descriptivo (`feat/epf-patologia`, `fix/telefono-ioma`)
- PR con descripcion clara de que cambia y por que
- Los PRs de datos necesitan fuente verificable

### 4. Accesibilidad

- Testing con VoiceOver / NVDA
- Verificar contraste WCAG AA
- Testing en dispositivos reales (Android de gama baja especialmente)

### 5. Legal

Si sos abogado/a especializado/a en salud:

- Revisar los textos legales en `src/data/textosLegales.js`
- Verificar que las citas sean exactas y vigentes
- Sugerir mejoras a los templates de carta documento

## Setup de desarrollo

```bash
git clone https://github.com/mapasalud/mapasalud.git
cd mapasalud
npm install
npm run dev
```

Para el asistente de reclamos con IA (opcional):

```bash
echo "ANTHROPIC_API_KEY=tu_key" > .env.local
```

## Principios

- **Precision antes que velocidad**. Un dato incorrecto puede perjudicar a un paciente. Preferimos dejar "Informacion en verificacion" antes que mostrar algo mal.
- **Lenguaje simple**. Los usuarios son pacientes y familias, no abogados ni medicos. Cero jerga.
- **Mobile first**. La mayoria accede desde el telefono. Touch targets de 44px minimo.
- **Funciona sin internet**. Los templates fallback tienen que generar documentos utiles sin conexion a la API.

## Codigo de conducta

Se respetuoso. Este proyecto existe para ayudar a personas en situaciones vulnerables. No se tolera discriminacion, acoso, ni contenido ofensivo.
