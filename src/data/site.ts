/**
 * Datos del sitio que no dependen del idioma.
 * Si cambias el contenedor de GTM, la ruta del proxy o la URL del formulario,
 * este es el único lugar que hay que tocar.
 */
export const SITE = {
  url: "https://noeliza.com",
  brand: "NoeLiza",
  fullName: "Noelia Lizárraga",
  email: "noe@noeliza.com",
  linkedin: "https://www.linkedin.com/in/noelia-lizarraga/",
  github: "https://github.com/NoelinaLiz",
  gtmId: "GTM-5XBZSB7",
  /** Ruta del reverse proxy de GTM en Cloudflare (ver cloudflare/reverse-proxy.js). */
  gtmProxyPath: "/b3ev",
  /** Google Apps Script que guarda los mensajes del formulario en una hoja privada. */
  formEndpoint:
    "https://script.google.com/macros/s/AKfycby-pjcbpr8umUnoU_OXW1bBdycoQLvlMshfWp4tLTooipBJ7lLkaf1acOw3GBtdUrSyKQ/exec",
  trackingPlanUrl:
    "https://docs.google.com/document/d/1S_yUPoUFvPwvxvJJSoF8ofIntNR_Ne8mQwh387oE9Hg/edit?usp=sharing",
  googleSiteVerification: "KxTMML_8I6eKVFESLhRJi_meo7Ixmn2HBh-mDybHzkE",
  /** Clave de localStorage donde se guarda la decisión de consentimiento. No cambiarla: los visitantes que ya decidieron la conservan. */
  consentStorageKey: "cookie-consent",
  /** Meses de vigencia de la decisión de consentimiento antes de volver a preguntar. */
  consentMonths: 12,
} as const;

export type Lang = "es" | "en";

/** Ruta pública de cada página por idioma (se conservan las URLs del sitio anterior). */
export const PATHS = {
  home: { es: "/", en: "/en.html" },
  privacy: { es: "/privacidad.html", en: "/privacy.html" },
} as const;

/**
 * Fecha del `lastmod` del sitemap: el día en que se compila el sitio (formato AAAA-MM-DD).
 * Como `dist/` se compila y se commitea en cada cambio, esa fecha coincide con la de la
 * última actualización publicada.
 */
export function lastModified(): string {
  // "sv-SE" formatea como AAAA-MM-DD con la hora local (toISOString usaría UTC y podría adelantar el día).
  return new Date().toLocaleDateString("sv-SE");
}
