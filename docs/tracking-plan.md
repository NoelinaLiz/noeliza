# Plan de medición de noeliza.com

> Documento generado con `npm run docs` a partir de [`src/data/events.ts`](../src/data/events.ts).
> No lo edites a mano: cambia el archivo fuente y vuelve a generarlo.
> `npm test` verifica que el código solo emita eventos declarados aquí.

## 1. Arquitectura: hub de eventos genérico

En lugar de crear una etiqueta de GTM por cada botón, el sitio usa un único evento genérico:

1. **Captura declarativa en HTML.** Los elementos interactivos se etiquetan con atributos `data-*`:
   - `data-track-event`: tipo de acción (`cta_click`, `social_click`…).
   - `data-track-location`: dónde está el elemento (`main_nav`, `footer_nav`…).
   - `data-track-element`: nombre del elemento (`main_logo`, `LinkedIn`…).
   - `data-track-section`: sección de la página (`hero`, `footer`…).
2. **Un solo listener global** ([`src/scripts/tracking.ts`](../src/scripts/tracking.ts)) en `document`. Al hacer clic:
   - busca el elemento con atributos de tracking más cercano (`closest`);
   - lee sus atributos y descarta los vacíos;
   - antes del hit real, empuja `{ event_info: null }` para limpiar el estado y evitar que parámetros de eventos anteriores contaminen el nuevo;
   - empuja un único `trackEvent` con `event_name` y `event_info`.

## 2. Consentimiento (Consent Mode v2)

- El estado inicial es **todo `denied`** y se define antes de cargar GTM (`src/scripts/consent-default.js`, inline en el `<head>`), con `wait_for_update: 500`.
- La decisión se guarda en `localStorage` (clave `cookie-consent`, con fecha) y **vence a los 12 meses**.
- Señales gestionadas: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`. La opción de analítica controla la primera; la de publicidad controla las otras tres.
- Todas las páginas (incluida la 404) cargan el mismo estado inicial.

## 3. Propiedades de usuario

| Propiedad | Tipo | Cuándo se registra | Valores |
| :-- | :-- | :-- | :-- |
| `user_type` | String | Al enviar el formulario con éxito | `lead` |

## 4. Eventos

#### `consent_banner_view`

- **Cuándo:** Se muestra el banner de cookies.
- **Destinos:** GTM, Depuración
- **Parámetros:** Ninguno

#### `cookie_consent_update`

- **Cuándo:** Guardas tus preferencias o eliges una opción del banner.
- **Destinos:** GTM, Consent Mode
- **Parámetros:** Ninguno

#### `trackEvent`

- **Cuándo:** Clic en cualquier elemento con atributos data-track-*.
- **Destinos:** GA4, Meta Pixel
- **Parámetros:** `event_name`, `event_info.location`, `event_info.element`, `event_info.section`, `event_info.text`, `event_info.language`, `event_info.timestamp`

#### `visitor_test_click`

- **Cuándo:** Pulsas «Simular clic» en la consola.
- **Destinos:** GA4
- **Parámetros:** `visitor_action`, `details.simulated_by`, `details.message`, `details.success`

#### `form_submission_success`

- **Cuándo:** El formulario se envía con éxito. El email viaja hasheado con SHA-256.
- **Destinos:** GA4 (lead), Meta Pixel
- **Parámetros:** `event_id`, `event_info.service_id`, `event_info.service_name`, `event_info.email (SHA-256)`, `event_info.language`, `event_info.timestamp`, `user_properties.user_type`

### Valores de `event_name` en `trackEvent`

| `event_name` | Cuándo |
| :-- | :-- |
| `navigation_click` | Clics en la navegación, el menú móvil y los enlaces del pie de página. |
| `cta_click` | Clics en botones principales de conversión. |
| `social_click` | Clics en LinkedIn, GitHub o el email. |
| `interactive_click` | Clics en la consola de eventos y en controles como el cambio de tema. |
| `error_404` | Se visita una ruta que no existe (con path y referrer). |

Estructura del `trackEvent`:

```json
{
  "event": "trackEvent",
  "event_name": "cta_click",
  "event_info": {
    "location": "cta_primary",
    "element": "…",
    "section": "hero",
    "text": "probar la consola",
    "language": "es",
    "timestamp": "2026-01-01T12:00:00.000Z"
  }
}
```

Los valores vacíos se omiten. `language` sale del atributo `lang` de la página.

### `form_submission_success`

Solo se dispara si el servidor respondió correctamente (antes se disparaba aunque el envío fallara).

```json
{
  "event": "form_submission_success",
  "event_id": "noeliza_1720231500_abc123",
  "event_info": {
    "service_id": "noeliza_contact_job",
    "service_name": "oportunidad laboral / contratación",
    "email": "<SHA-256 del email>",
    "language": "es",
    "timestamp": "2026-01-01T12:00:00.000Z"
  },
  "user_properties": { "user_type": "lead" }
}
```

| Motivo del formulario | `service_id` |
| :-- | :-- |
| Oportunidad Laboral / Contratación | `noeliza_contact_job` |
| Consulta sobre mi Stack técnico | `noeliza_contact_stack` |
| Colaboración / Charla | `noeliza_contact_collab` |
| Otro motivo | `noeliza_contact_other` |

## 5. Lo que este sitio NO mide de forma personalizada

- **Scroll:** lo cubre el evento predeterminado de GA4 (medición mejorada, scroll al 90 %). No hay evento propio.
- **Meta:** solo Pixel desde el navegador, como práctica. **No hay Conversions API ni GTM server-side** (evitar costos de servidor). El `event_id` queda preparado por si algún día se suma un envío por servidor y hay que deduplicar.

## 6. Gobernanza y calidad del dato

- **Contrato con GTM:** los nombres de evento y de parámetros no se renombran sin actualizar también el contenedor de GTM.
- **Limpieza de estado:** el reset `event_info: null` evita arrastrar parámetros entre clics consecutivos.
- **Cero PII hacia analítica:** el email solo llega al `dataLayer` como hash SHA-256, normalizado (sin espacios y en minúsculas) para poder cruzarlo con GA4 y Meta.
- **Pruebas:** `npm test` comprueba que todos los `data-track-event` del HTML usen un `event_name` declarado, que cada evento documentado exista en el código y que ninguno quede sin documentar.
