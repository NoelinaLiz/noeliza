/**
 * Plan de medición de noeliza.com: única fuente de verdad.
 *
 * De aquí salen (1) la tabla de la sección "Plan" del sitio y (2) el documento
 * docs/tracking-plan.md (`npm run docs`). Si agregas o cambias un evento en el
 * código, cámbialo aquí; `npm test` comprueba que el HTML solo use eventos declarados.
 */

export type Bilingual = { es: string; en: string };

export type EventGroup = "consent" | "interaccion" | "conversion" | "sistema";

export interface EventDef {
  /** Valor de `event` en el dataLayer. */
  name: string;
  group: EventGroup;
  /** Cuándo se dispara. */
  when: Bilingual;
  /** Destinos configurados en GTM. */
  destinations: string[];
  /** Parámetros que viajan con el evento (estructura resumida). */
  params: string[];
  /** Si aparece en la tabla resumida del sitio. */
  showInSite: boolean;
}

export const EVENTS: EventDef[] = [
  {
    name: "consent_banner_view",
    group: "consent",
    when: {
      es: "Se muestra el banner de cookies.",
      en: "The cookie banner is shown.",
    },
    destinations: ["GTM", "Depuración"],
    params: [],
    showInSite: true,
  },
  {
    name: "cookie_consent_update",
    group: "consent",
    when: {
      es: "Guardas tus preferencias o eliges una opción del banner.",
      en: "You save your preferences or pick an option in the banner.",
    },
    destinations: ["GTM", "Consent Mode"],
    params: [],
    showInSite: true,
  },
  {
    name: "trackEvent",
    group: "interaccion",
    when: {
      es: "Clic en cualquier elemento con atributos data-track-*.",
      en: "Click on any element with data-track-* attributes.",
    },
    destinations: ["GA4", "Meta Pixel"],
    params: [
      "event_name",
      "event_info.location",
      "event_info.element",
      "event_info.section",
      "event_info.text",
      "event_info.language",
      "event_info.timestamp",
    ],
    showInSite: true,
  },
  {
    name: "visitor_test_click",
    group: "interaccion",
    when: {
      es: "Pulsas «Simular clic» en la consola.",
      en: "You press “Simulate click” in the console.",
    },
    destinations: ["GA4"],
    params: ["visitor_action", "details.simulated_by", "details.message", "details.success"],
    showInSite: true,
  },
  {
    name: "form_submission_success",
    group: "conversion",
    when: {
      es: "El formulario se envía con éxito. El email viaja hasheado con SHA-256.",
      en: "The form is submitted successfully. The email travels hashed with SHA-256.",
    },
    destinations: ["GA4 (lead)", "Meta Pixel"],
    params: [
      "event_id",
      "event_info.service_id",
      "event_info.service_name",
      "event_info.email (SHA-256)",
      "event_info.language",
      "event_info.timestamp",
      "user_properties.user_type",
    ],
    showInSite: true,
  },
];

/** Valores de `event_name` que acepta el evento genérico `trackEvent`. */
export const TRACK_EVENT_NAMES: { name: string; when: Bilingual }[] = [
  {
    name: "navigation_click",
    when: {
      es: "Clics en la navegación, el menú móvil y los enlaces del pie de página.",
      en: "Clicks in the navigation, the mobile menu and footer links.",
    },
  },
  {
    name: "cta_click",
    when: {
      es: "Clics en botones principales de conversión.",
      en: "Clicks on primary conversion buttons.",
    },
  },
  {
    name: "social_click",
    when: {
      es: "Clics en LinkedIn, GitHub o el email.",
      en: "Clicks on LinkedIn, GitHub or email links.",
    },
  },
  {
    name: "interactive_click",
    when: {
      es: "Clics en la consola de eventos y en controles como el cambio de tema.",
      en: "Clicks on the event console and controls such as the theme toggle.",
    },
  },
  {
    name: "error_404",
    when: {
      es: "Se visita una ruta que no existe (con path y referrer).",
      en: "A non-existent path is visited (with path and referrer).",
    },
  },
];

export const ALLOWED_EVENT_NAMES = TRACK_EVENT_NAMES.map((e) => e.name);

/** Motivos de contacto del formulario. `value` es el `service_id` que viaja en el evento. */
export const CONTACT_REASONS = [
  { value: "noeliza_contact_job" },
  { value: "noeliza_contact_stack" },
  { value: "noeliza_contact_collab" },
  { value: "noeliza_contact_other" },
] as const;
