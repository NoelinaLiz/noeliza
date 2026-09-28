# Contrato con Google Tag Manager

El contenedor de GTM (`GTM-5XBZSB7`) ya está configurado y, según el código, **el rediseño no exige cambiar nada en él**: emite los mismos eventos y parámetros que el sitio anterior (esto se deduce del código; el contenedor en sí no está en este repositorio). Este documento fija qué emite el sitio, para que ninguna de las dos partes se rompa sin querer.

## Qué carga el sitio

- El snippet de GTM va en el `<head>` de todas las páginas y pide el script a `/b3ev/gtm.js?id=GTM-5XBZSB7` (proxy de Cloudflare, ver [`cloudflare/reverse-proxy.js`](../cloudflare/reverse-proxy.js)). El ID y la ruta están en [`src/data/site.ts`](../src/data/site.ts).
- Antes del snippet, cada página ejecuta el **estado inicial de Consent Mode** (todo `denied`, o la decisión guardada si sigue vigente). Esto incluye la página 404, que antes no lo hacía.

## Qué espera GTM (no renombrar)

| En el `dataLayer` | Uso en GTM |
| :-- | :-- |
| `event: "trackEvent"` + `event_name` + `event_info.*` | Disparador de eventos personalizados (`cta_click`, `social_click`, `navigation_click`, `interactive_click`, `error_404`). |
| `event: "cookie_consent_update"` | Disparador tras guardar preferencias. |
| `event: "consent_banner_view"` | Registro interno del banner. |
| `event: "visitor_test_click"` | Clic en «Simular clic» de la consola. |
| `event: "form_submission_success"` + `event_id` + `event_info.*` + `user_properties.user_type` | Conversión de lead (GA4 y Meta Pixel). |
| `gtag("consent", "default" \| "update", …)` | Consent Mode v2 (las cuatro señales). |

Las variables del `dataLayer` que GTM lee siguen siendo las mismas: `event_name` y las claves de `event_info` (`location`, `element`, `section`, `text`, `language`, `timestamp`; y `service_id`, `service_name`, `email`, `path`, `referrer` según el evento).

## Qué cambió respecto al sitio anterior (sin efecto en GTM)

- `event_info.language` ahora sale del atributo `lang` de la página (antes se deducía de la URL). Los valores siguen siendo `es` y `en`.
- `form_submission_success` **solo se dispara si el servidor respondió bien**. Antes se disparaba aunque el envío fallara. Los envíos que antes contaban como conversión sin haberse guardado ya no se cuentan.
- El botón de tema y el selector de idioma generan `trackEvent` con `interactive_click` (elementos `theme_toggle`, `lang_en` y `lang_es`).
- Los envíos detectados como bots (campo trampa relleno) no generan ningún evento.
- La decisión de consentimiento guardada incluye ahora una fecha y vence a los 12 meses. Las decisiones anteriores (sin fecha) siguen valiendo.
- Las opciones de contacto conservan sus textos originales, por lo que `service_name` no cambia.

## Lo que NO existe en este sitio

- **Scroll personalizado:** lo cubre el evento predeterminado de GA4 (medición mejorada).
- **GTM server-side y Meta Conversions API:** no se usan. Meta funciona solo con el Pixel del navegador.
