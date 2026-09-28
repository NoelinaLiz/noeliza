# noeliza.com

Sitio personal de **Noeliza** (Noelia Lizárraga), Marketing Technologist. Es mi carta de presentación para reclutadores y, sobre todo, mi **sandbox de MarTech**: aquí practico consentimiento, tracking, privacidad y arquitectura de datos en un entorno real, y el propio sitio lo demuestra con una consola que muestra su `dataLayer` en vivo.

Sitio en producción: <https://noeliza.com> · Versión en inglés: <https://noeliza.com/en.html>

---

## Qué demuestra este sitio

| Pieza | Qué hace | Dónde está |
| :-- | :-- | :-- |
| **Consent Mode v2** | Estado inicial `denied` antes de cargar GTM, banner con "Rechazar todo" y "Aceptar todo" con el mismo peso, decisión guardada con fecha (vence a los 12 meses). | [`consent-default.js`](src/scripts/consent-default.js), [`consent.ts`](src/scripts/consent.ts) |
| **Tracking declarativo** | Un solo listener global; los elementos se etiquetan con `data-track-*` y generan un único `trackEvent`. | [`tracking.ts`](src/scripts/tracking.ts) |
| **Consola del dataLayer en vivo** | Muestra los eventos reales, el estado del consentimiento y cómo viaja cada evento hacia GA4 y Meta Pixel. | [`console.ts`](src/scripts/console.ts) |
| **PII con hash en el cliente** | El email se transforma con SHA-256 en el navegador antes de llegar al `dataLayer`. | [`hash.ts`](src/scripts/hash.ts), [`form.ts`](src/scripts/form.ts) |
| **GTM detrás de un proxy** | `gtm.js` y los hits se sirven desde `/b3ev` en mi dominio, mediante un Worker de Cloudflare. | [`cloudflare/reverse-proxy.js`](cloudflare/reverse-proxy.js) |
| **Formulario con honeypot** | Campo trampa oculto; envío a Google Apps Script; la conversión solo se mide si el envío fue correcto. | [`form.ts`](src/scripts/form.ts) |
| **Plan de medición como código** | Una sola fuente ([`events.ts`](src/data/events.ts)) alimenta la tabla del sitio, el documento y las pruebas. | [`docs/tracking-plan.md`](docs/tracking-plan.md) |

---

## Stack

- **[Astro](https://astro.build)** genera HTML estático. Cada sección es un componente y ES/EN comparten estructura (los textos están en [`src/i18n`](src/i18n)).
- **CSS propio** con variables de tema (oscuro por defecto, claro por preferencia del sistema o con el botón "Tema"), en [`src/styles/global.css`](src/styles/global.css).
- **TypeScript** para el JavaScript del sitio, con **Vitest** para las pruebas.
- **Tipografías propias** (Bricolage Grotesque, Geist y Geist Mono vía Fontsource): no se pide nada a Google Fonts.
- **Sin servidor propio**: Hostinger sirve los archivos estáticos; Cloudflare solo hace de proxy de GTM.

Por qué estas decisiones (y qué se descartó a propósito, como sGTM o un Worker para el formulario) está en [`docs/decisiones.md`](docs/decisiones.md).

---

## Estructura

```text
├── src/
│   ├── components/      # Secciones y piezas de la página (Header, Hero, Console, Contact…)
│   ├── data/
│   │   ├── site.ts      # Datos del sitio: ID de GTM, ruta del proxy, endpoint del formulario…
│   │   └── events.ts    # Plan de medición (única fuente de verdad de los eventos)
│   ├── i18n/            # Textos en español (es.ts) e inglés (en.ts)
│   ├── layouts/Base.astro
│   ├── pages/           # index (ES), en (EN), privacidad, privacy, 404, sitemap.xml
│   ├── scripts/         # consent, tracking, consola, formulario, tema, hash (+ pruebas)
│   └── styles/global.css
├── public/              # Se copia tal cual a dist/: assets, robots.txt
├── scripts/             # Utilidades: generar el plan de medición y las imágenes
├── cloudflare/          # Copia versionada del Worker que hace de proxy de GTM
├── docs/                # Documentación (plan de medición, despliegue, decisiones, GTM)
└── dist/                # Sitio compilado. SÍ se versiona: Hostinger no compila nada
```

---

## Desarrollo

Requiere Node.js 22.12 o superior.

```bash
npm install        # una sola vez
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # compila el sitio en dist/
npm run preview    # sirve dist/ para probarlo como en producción
npm run check      # revisión de tipos (astro check)
npm test           # pruebas
npm run docs       # regenera docs/tracking-plan.md desde src/data/events.ts
npm run images     # regenera el retrato pequeño y la imagen para compartir
```

> En local, `/b3ev/gtm.js` da 404: el proxy de GTM solo existe en producción (Cloudflare). Es esperado.

## Publicar cambios

Hostinger solo hace `git pull`; no compila. Por eso el flujo es:

1. Hacer los cambios y ejecutar `npm test` y `npm run build`.
2. Hacer commit **incluyendo `dist/`**.
3. Subir a `main` y, en el panel de Hostinger, hacer el pull.

Detalle, verificación posterior y cómo volver atrás: [`docs/despliegue.md`](docs/despliegue.md).

---

## Documentación

- [Plan de medición](docs/tracking-plan.md): eventos, parámetros y reglas de gobierno del dato.
- [Contrato con GTM](docs/gtm.md): qué espera el contenedor de GTM del sitio y qué no se puede renombrar.
- [Despliegue](docs/despliegue.md): flujo de publicación, verificación y reversión.
- [Decisiones](docs/decisiones.md): por qué el sitio es como es.

## Licencia

ISC © Noelia Lizárraga
