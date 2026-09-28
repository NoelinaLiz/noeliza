/**
 * Capa de tracking del sitio.
 *
 * 1. Envuelve `dataLayer.push` para avisar a la consola en vivo de cada evento
 *    (CustomEvent "dataLayer-push"), sin alterar lo que recibe GTM.
 * 2. Captura clics de forma declarativa: cualquier elemento con `data-track-event`
 *    genera un único `trackEvent` con sus atributos `data-track-*`.
 *
 * Los nombres de evento y de parámetros son un contrato con el contenedor de GTM:
 * no se renombran sin actualizar también GTM (ver docs/tracking-plan.md).
 */

window.dataLayer = window.dataLayer || [];

const originalPush = window.dataLayer.push || Array.prototype.push;

window.dataLayer.push = function (...items: unknown[]): number {
  const result = originalPush.apply(window.dataLayer, items);
  for (const item of items) {
    if (item && typeof item === "object" && !isEventInfoReset(item)) {
      window.dispatchEvent(new CustomEvent("dataLayer-push", { detail: item }));
    }
  }
  return result;
};

/** `{ event_info: null }` es solo un reset de estado para GTM; no aporta nada al debugger. */
function isEventInfoReset(item: object): boolean {
  const keys = Object.keys(item);
  return keys.length === 1 && keys[0] === "event_info" && (item as Record<string, unknown>).event_info === null;
}

document.addEventListener(
  "click",
  (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const el = target.closest<HTMLElement>("[data-track-event]");
    if (!el) return;

    const raw: Record<string, string | null> = {
      location: el.getAttribute("data-track-location"),
      element: el.getAttribute("data-track-element"),
      section: el.getAttribute("data-track-section"),
      text: (el.innerText || "").trim().toLowerCase(),
      language: document.documentElement.lang || "es",
      timestamp: new Date().toISOString(),
    };
    const info = Object.fromEntries(Object.entries(raw).filter(([, value]) => value && value.trim() !== ""));

    // Reset previo para evitar que parámetros de eventos anteriores se filtren al nuevo hit.
    window.dataLayer.push({ event_info: null });
    window.dataLayer.push({
      event: "trackEvent",
      event_name: el.getAttribute("data-track-event"),
      event_info: info,
    });
  },
  true,
);
