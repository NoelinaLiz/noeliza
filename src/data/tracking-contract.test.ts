import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { ALLOWED_EVENT_NAMES, EVENTS, TRACK_EVENT_NAMES } from "./events";
import { es } from "../i18n/es";
import { en } from "../i18n/en";

const srcDir = path.resolve(import.meta.dirname, "..");

function files(dir: string, exts: string[]): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return files(full, exts);
    return exts.some((e) => name.endsWith(e) && !name.endsWith(".test.ts")) ? [full] : [];
  });
}

const markup = files(srcDir, [".astro"]);
const scripts = files(srcDir, [".ts", ".astro"]).filter((f) => !f.includes(`${path.sep}data${path.sep}`) && !f.includes(`${path.sep}i18n${path.sep}`) && !f.endsWith("console.ts"));
const read = (f: string) => readFileSync(f, "utf8");

describe("contrato de tracking con GTM", () => {
  it("todo data-track-event del HTML usa un event_name declarado en el plan", () => {
    const used = new Set<string>();
    for (const file of markup) {
      for (const m of read(file).matchAll(/"?data-track-event"?\s*[=:]\s*"([^"]+)"/g)) used.add(m[1]);
    }
    expect(used.size).toBeGreaterThan(0);
    for (const name of used) expect(ALLOWED_EVENT_NAMES, `event_name no declarado: ${name}`).toContain(name);
  });

  it("todo evento del plan existe realmente en el código", () => {
    const code = scripts.map(read).join("\n") + readFileSync(path.join(srcDir, "scripts/console.ts"), "utf8");
    for (const e of EVENTS) expect(code, `evento sin implementar: ${e.name}`).toContain(e.name);
    for (const e of TRACK_EVENT_NAMES.filter((n) => n.name === "error_404")) expect(code).toContain(e.name);
  });

  it("todo `event:` que el código empuja al dataLayer está en el plan", () => {
    // gtm.js lo emite el snippet estándar de GTM (Head.astro); no es un evento propio.
    const declared = new Set([...EVENTS.map((e) => e.name), "gtm.js"]);
    for (const file of scripts) {
      for (const m of read(file).matchAll(/\bevent:\s*"([^"]+)"/g)) {
        expect(declared, `evento no documentado en ${path.basename(file)}: ${m[1]}`).toContain(m[1]);
      }
    }
  });
});

describe("i18n", () => {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === "object"
        ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]))
        : typeof value;

  it("español e inglés tienen exactamente la misma estructura", () => {
    expect(shape(en)).toEqual(shape(es));
  });

  it("no quedan textos vacíos", () => {
    const empties: string[] = [];
    const walk = (value: unknown, trail: string) => {
      if (typeof value === "string" && value.trim() === "") empties.push(trail);
      else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${trail}[${i}]`));
      else if (value && typeof value === "object") Object.entries(value).forEach(([k, v]) => walk(v, `${trail}.${k}`));
    };
    walk(es, "es");
    walk(en, "en");
    expect(empties).toEqual([]);
  });
});
