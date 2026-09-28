# Decisiones de diseño y arquitectura

Cada decisión indica **qué se eligió, por qué y qué se descartó**, para poder revisarla sin tener que reconstruir el contexto.

## Astro en lugar de HTML escrito a mano

- **Elección:** Astro genera HTML estático; cada sección es un componente y ES/EN comparten estructura.
- **Por qué:** antes había dos archivos casi idénticos (`index.html`, `en.html`) y el nav, el footer y el banner estaban copiados en varias páginas. Cada cambio se hacía dos veces y era fácil que ES y EN se desalinearan.
- **Descartado:** Next.js (demasiado para una landing); Eleventy (válido, pero con menos comodidad para componentes y TypeScript).

## Se versiona `dist/`

- **Elección:** el sitio compilado está en el repositorio.
- **Por qué:** Hostinger solo hace `git pull` y no compila. Así el despliegue no exige tocar ningún ajuste del hosting.
- **Consecuencia:** hay que ejecutar `npm run build` antes de cada commit (ver [despliegue](despliegue.md)).

## CSS propio con variables, sin Tailwind

- **Elección:** una hoja de estilos con tokens de tema (`src/styles/global.css`).
- **Por qué:** el diseño se prototipó así y no hay ganancia visible en reescribirlo con clases de utilidad. Se eliminan también `autoprefixer`, `postcss` y `postcss-cli`, que ya no se usaban.
- **Reversible:** si algún día se prefiere Tailwind, se puede volver a añadir sin tocar los componentes de datos ni de tracking.

## Tipografías propias

- **Elección:** Fontsource sirve las fuentes desde el propio dominio.
- **Por qué:** Google Fonts filtraba la IP del visitante a Google **antes** del consentimiento, y bloqueaba el renderizado.

## Sin GTM server-side

- **Elección:** no se usa sGTM (ni Stape, ni Cloud Run).
- **Por qué:** es un sitio de pruebas sin tráfico que justifique un costo de servidor, y los contenedores gratuitos se dan de baja sin uso.
- **Consecuencia:** Meta recibe la conversión solo desde el Pixel del navegador, como práctica. El `event_id` queda generado por si algún día se necesita deduplicar con un envío por servidor.

## El formulario sigue usando Google Apps Script

- **Elección:** no se migra a un Worker de Cloudflare.
- **Por qué:** evita mantener otro código en Cloudflare. El único Worker del sitio es el proxy de GTM.
- **Mitigación del spam:** campo trampa (honeypot) y comprobación de la respuesta del servidor. Un bot que envíe directamente a la URL de Apps Script (sin pasar por la página) no lo detiene el honeypot; si el spam llegara a ser un problema, la opción es reevaluar un Worker o Cloudflare Turnstile.

## Evento de scroll: solo el de GA4

- **Elección:** no hay evento de scroll propio.
- **Por qué:** GA4 ya lo mide con la medición mejorada (scroll al 90 %) y un evento propio duplicaría datos.

## Consentimiento

- **Todo `denied` hasta que la persona decide**, con "Rechazar todo" y "Aceptar todo" de igual peso y casillas sin marcar en "Personalizar".
- **Caduca a los 12 meses** (se vuelve a preguntar). Las decisiones antiguas sin fecha siguen valiendo.
- **Misma lógica en todas las páginas**, incluida la 404, para que ninguna cargue GTM sin estado inicial.

## Nombre y SEO

- El titular de la portada es la propuesta de valor con el rol ("Marketing Technologist"), no el nombre completo.
- "Noelia Lizárraga" y "Noeliza" aparecen en el título de la página, en "Sobre mí", en el alt de la foto y en los datos estructurados (`name` y `alternateName`), para que el sitio responda a ambas búsquedas.
- La política de privacidad lleva `noindex` **sin** bloquearse en `robots.txt`: un `Disallow` impediría que Google leyera el `noindex`.

## Pendiente por decisión

- Resultados cuantificables en los casos de estudio (se añadirán cuando haya datos reales).
- Sección de notas técnicas (`/notas/`), aplazada.
- Cabeceras de seguridad y caché en Hostinger: propuesta en [`htaccess.recomendado`](htaccess.recomendado), sin aplicar.
