import type { ConsentState } from "./types";

/**
 * Banner de consentimiento. Actualiza Consent Mode v2 vía `gtag("consent", "update")`,
 * guarda la decisión en localStorage (con fecha, para vencer a los 12 meses) y avisa
 * al resto de la página con el evento de ventana "noe:consent".
 *
 * Los valores por defecto (todo "denied") y la lectura de la decisión previa los
 * resuelve consent-default.js, que se ejecuta antes que GTM.
 */

const banner = document.getElementById("banner");
if (banner) initBanner(banner);

function initBanner(banner: HTMLElement): void {
  const { key, state: initial, decided } = window.__consent;
  const panel = document.getElementById("c-panel") as HTMLElement;
  const customize = document.getElementById("c-custom") as HTMLButtonElement;
  const chkAnalytics = document.getElementById("chk-analytics") as HTMLInputElement;
  const chkAds = document.getElementById("chk-ads") as HTMLInputElement;

  const all = (value: "granted" | "denied"): ConsentState => ({
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });

  function show(focus: boolean): void {
    chkAnalytics.checked = window.__consent.state.analytics_storage === "granted";
    chkAds.checked = window.__consent.state.ad_storage === "granted";
    banner.hidden = false;
    window.dataLayer.push({ event: "consent_banner_view" });
    if (focus) banner.querySelector<HTMLElement>("#c-reject")?.focus();
  }

  function apply(state: ConsentState): void {
    window.__consent.state = state;
    window.__consent.decided = true;
    window.gtag("consent", "update", state);
    window.dataLayer.push({ event: "cookie_consent_update" });
    try {
      localStorage.setItem(key, JSON.stringify({ ...state, ts: Date.now() }));
    } catch {
      /* sin almacenamiento disponible: la decisión vale solo para esta visita */
    }
    banner.hidden = true;
    window.dispatchEvent(new CustomEvent("noe:consent", { detail: state }));
  }

  document.getElementById("c-reject")?.addEventListener("click", () => apply(all("denied")));
  document.getElementById("c-accept")?.addEventListener("click", () => apply(all("granted")));
  document.getElementById("c-save")?.addEventListener("click", () => {
    const ads = chkAds.checked ? "granted" : "denied";
    apply({
      analytics_storage: chkAnalytics.checked ? "granted" : "denied",
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
    });
  });

  customize.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    customize.setAttribute("aria-expanded", String(open));
  });

  document.getElementById("open-consent")?.addEventListener("click", () => show(true));

  // Con una decisión ya tomada, Escape cierra el banner reabierto desde el pie de página.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !banner.hidden && window.__consent.decided) banner.hidden = true;
  });

  if (!decided) {
    chkAnalytics.checked = initial.analytics_storage === "granted";
    chkAds.checked = initial.ad_storage === "granted";
    banner.hidden = false;
    window.dataLayer.push({ event: "consent_banner_view" });
  }
}
