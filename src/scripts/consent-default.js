/*
 * Estado inicial de Consent Mode v2.
 *
 * Este archivo se inserta INLINE en el <head>, antes del snippet de GTM (ver
 * components/Head.astro). Tiene que ejecutarse de forma síncrona para que el
 * "default" llegue al dataLayer antes de que GTM lea nada.
 *
 * Es JavaScript plano y sin imports a propósito: así se puede inlinear y también
 * probar con Vitest (consent-default.test.ts). Las constantes de abajo deben
 * coincidir con SITE.consentStorageKey y SITE.consentMonths (lo verifica el test).
 */
(function () {
  var KEY = "cookie-consent";
  var MONTHS = 12;
  var KEYS = ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"];

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  function allDenied() {
    var state = {};
    KEYS.forEach(function (k) {
      state[k] = "denied";
    });
    return state;
  }

  // Devuelve la decisión guardada (solo las 4 claves válidas) o null si no hay,
  // está corrupta o venció. Las decisiones anteriores sin fecha (`ts`) siguen valiendo.
  function readSaved() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      if (!raw || typeof raw !== "object") return null;
      var state = {};
      for (var i = 0; i < KEYS.length; i++) {
        var v = raw[KEYS[i]];
        if (v !== "granted" && v !== "denied") return null;
        state[KEYS[i]] = v;
      }
      if (typeof raw.ts === "number") {
        var limit = new Date(raw.ts);
        limit.setMonth(limit.getMonth() + MONTHS);
        if (Date.now() > limit.getTime()) return null;
      }
      return state;
    } catch (e) {
      return null;
    }
  }

  var saved = readSaved();
  var state = saved || allDenied();

  window.__consent = { key: KEY, keys: KEYS, months: MONTHS, state: state, decided: !!saved };

  var payload = {};
  KEYS.forEach(function (k) {
    payload[k] = state[k];
  });
  if (!saved) payload.wait_for_update = 500;
  gtag("consent", "default", payload);
})();
