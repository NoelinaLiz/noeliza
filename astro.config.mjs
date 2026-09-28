// @ts-check
import { defineConfig } from "astro/config";

// Hostinger solo hace `git pull`: no compila nada. Por eso la salida (`dist/`) se
// commitea ya construida y conserva la estructura de URLs del sitio anterior
// (index.html, en.html, privacidad.html, 404.html).
export default defineConfig({
  site: "https://noeliza.com",
  outDir: "dist",
  trailingSlash: "ignore",
  build: {
    format: "file",
    inlineStylesheets: "auto",
  },
});
