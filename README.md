# Richard Castro — Portfolio

Portafolio personal bilingüe (ES/EN) con estética pixelada, construido con Next.js, TypeScript, Tailwind CSS, NES.css y Framer Motion.

Basado en el template [manishtiwari25/portfolio](https://github.com/manishtiwari25/portfolio) (MIT), adaptado con contenido propio y soporte de idiomas.

---

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run start   # servir el build
```

---

## Dónde se edita el contenido

Todo el contenido vive en `src/data/` como JSON. Cada campo de texto traducible tiene la forma `{ "es": "...", "en": "..." }`.

| Archivo | Qué contiene |
|---|---|
| `src/data/profile.json` | Nombre, título, tagline y resumen profesional |
| `src/data/contact.json` | Email, ubicación, usuario de GitHub, redes |
| `src/data/work.json` | Experiencia laboral con sus viñetas |
| `src/data/projects.json` | Proyectos destacados |
| `src/data/skills.json` | Habilidades agrupadas, con iconos |
| `src/data/education.json` | Formación académica |

### Añadir una habilidad

Cada entrada apunta a un icono de [react-icons](https://react-icons.github.io/react-icons/). Solo se cargan tres librerías (`react-icons/tb`, `react-icons/si`, `react-icons/vsc`):

```json
{ "name": "Redis", "icon": "SiRedis", "library": "react-icons/si" }
```

Si el nombre del icono no existe, el recuadro sale vacío en vez de fallar — conviene verificarlo antes.

### Enlaces opcionales

En `contact.json`, los campos `linkedin`, `medium`, `blog`, `website` y `phone` aceptan `null`. Si están en `null`, su icono simplemente no se muestra.

---

## Textos de la interfaz

Las etiquetas de la interfaz (botones, títulos de sección, menú) están en `src/i18n/dictionary.ts`, con una entrada por idioma. El selector de idioma vive en la barra superior y recuerda la elección en `localStorage`; la primera visita usa el idioma del navegador.

---

## Imágenes

- `public/richard-pixel.png` — avatar de 96×96 que se muestra pixelado (clase `.pixelated`) en el portal y en la cabecera.
- `public/richard.png` — la misma foto a 512×512 sin pixelar.

Para cambiar la foto, sustituye ambos archivos manteniendo los nombres y las medidas.

---

## Licencia

MIT — ver `LICENSE`.
