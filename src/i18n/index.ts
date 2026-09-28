import { es, type Dict } from "./es";
import { en } from "./en";
import type { Lang } from "../data/site";

const dictionaries: Record<Lang, Dict> = { es, en };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}

/** Reemplaza marcadores {clave} en una plantilla de texto. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export type { Dict };
