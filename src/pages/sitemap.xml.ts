import type { APIRoute } from "astro";
import { SITE, PATHS, lastModified } from "../data/site";

/**
 * Sitemap generado en cada build. Se mantiene la URL /sitemap.xml (la que ya está
 * enviada a Search Console). Solo lista páginas indexables: la política de
 * privacidad lleva noindex, así que no entra.
 */
export const GET: APIRoute = () => {
  const lastmod = lastModified();
  const abs = (path: string) => new URL(path, SITE.url).href;
  const alternates = (["es", "en"] as const)
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(PATHS.home[l])}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(PATHS.home.es)}"/>`)
    .join("\n");

  const urls = (["es", "en"] as const)
    .map(
      (l) => `  <url>
    <loc>${abs(PATHS.home[l])}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
