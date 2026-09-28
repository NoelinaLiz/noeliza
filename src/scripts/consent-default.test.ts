import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { SITE } from "../data/site";

const source = readFileSync(new URL("./consent-default.js", import.meta.url), "utf8");

const ALL_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};
const ALL_GRANTED = {
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

/** Ejecuta consent-default.js con un localStorage falso y devuelve lo que dejó en la ventana. */
function run(stored: unknown) {
  const window: Record<string, any> = {};
  const localStorage = {
    getItem: () => (stored === undefined ? null : typeof stored === "string" ? stored : JSON.stringify(stored)),
  };
  vm.runInNewContext(source, { window, localStorage });
  const [command, sub, payload] = Array.from(window.dataLayer[0] as ArrayLike<unknown>);
  return { window, command, sub, payload: payload as Record<string, unknown> };
}

describe("consent-default.js", () => {
  it("usa las mismas constantes que SITE", () => {
    expect(source).toContain(`var KEY = "${SITE.consentStorageKey}"`);
    expect(source).toContain(`var MONTHS = ${SITE.consentMonths}`);
  });

  it("sin decisión guardada: todo denegado y wait_for_update", () => {
    const { command, sub, payload, window } = run(undefined);
    expect([command, sub]).toEqual(["consent", "default"]);
    expect(payload).toEqual({ ...ALL_DENIED, wait_for_update: 500 });
    expect(window.__consent.decided).toBe(false);
  });

  it("con decisión guardada: la aplica sin wait_for_update", () => {
    const { payload, window } = run({ ...ALL_GRANTED, ts: Date.now() });
    expect(payload).toEqual(ALL_GRANTED);
    expect(window.__consent.decided).toBe(true);
  });

  it("acepta decisiones antiguas sin fecha (formato anterior del sitio)", () => {
    const { payload } = run(ALL_GRANTED);
    expect(payload).toEqual(ALL_GRANTED);
  });

  it("no pasa a gtag claves ajenas guardadas junto a la decisión", () => {
    const { payload } = run({ ...ALL_GRANTED, ts: Date.now(), otra: "x" });
    expect(Object.keys(payload).sort()).toEqual(Object.keys(ALL_GRANTED).sort());
  });

  it("una decisión vencida (más de 12 meses) vuelve a preguntar", () => {
    const old = new Date();
    old.setMonth(old.getMonth() - (SITE.consentMonths + 1));
    const { payload, window } = run({ ...ALL_GRANTED, ts: old.getTime() });
    expect(payload).toEqual({ ...ALL_DENIED, wait_for_update: 500 });
    expect(window.__consent.decided).toBe(false);
  });

  it.each([["JSON corrupto", "{no-es-json"], ["valor inválido", { ...ALL_GRANTED, ad_storage: "si" }], ["faltan claves", { analytics_storage: "granted" }]])(
    "%s: cae a todo denegado",
    (_name, stored) => {
      const { payload } = run(stored);
      expect(payload).toEqual({ ...ALL_DENIED, wait_for_update: 500 });
    },
  );
});
