import { describe, expect, it } from "vitest";
import { sha256 } from "./hash";

describe("sha256", () => {
  it("coincide con el vector de prueba estándar", async () => {
    expect(await sha256("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });

  it("normaliza espacios y mayúsculas antes de hashear (formato que esperan GA4 y Meta)", async () => {
    expect(await sha256("  Ada@Empresa.COM ")).toBe(await sha256("ada@empresa.com"));
  });

  it("devuelve 64 caracteres hexadecimales", async () => {
    expect(await sha256("cualquier@correo.com")).toMatch(/^[0-9a-f]{64}$/);
  });
});
