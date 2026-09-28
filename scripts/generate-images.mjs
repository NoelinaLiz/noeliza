// Genera imágenes derivadas a partir de los originales de public/assets:
//   - perfil-noeliza-128.webp: retrato pequeño para el hero (el original pesa ~40 KB para mostrarse a 64 px).
//   - og-image.png: imagen 1200×630 para compartir el enlace (Open Graph / Twitter).
// Uso: npm run images   (los resultados se commitean; no corre en cada build)
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const assets = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/assets");
const file = (name) => path.join(assets, name);

// 1) Retrato del hero
await sharp(file("perfil-noeliza.webp"))
  .resize(128, 128, { fit: "cover", position: "top" })
  .webp({ quality: 82 })
  .toFile(file("perfil-noeliza-128.webp"));

// 2) Imagen para compartir
const W = 1200;
const H = 630;
const photo = await sharp(file("perfil-noeliza.webp"))
  .resize(420, 420, { fit: "cover", position: "top" })
  .png()
  .toBuffer();
const rounded = await sharp(photo)
  .composite([{ input: Buffer.from(`<svg width="420" height="420"><rect width="420" height="420" rx="16" ry="16"/></svg>`), blend: "dest-in" }])
  .png()
  .toBuffer();
const icon = await sharp(file("logo-icon.webp")).resize({ height: 56 }).png().toBuffer();
const iconMeta = await sharp(icon).metadata();

const sans = "Segoe UI, Helvetica, Arial, sans-serif";
const mono = "Consolas, Menlo, Courier New, monospace";
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#0a0e13"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="12" fill="none" stroke="#222e3c" stroke-width="2"/>
  <text x="96" y="190" font-family="${mono}" font-size="26" fill="#52b6ff" letter-spacing="3">// MARKETING TECHNOLOGIST</text>
  <text x="96" y="290" font-family="${sans}" font-size="84" font-weight="700" fill="#e7edf3">NoeLiza</text>
  <text x="96" y="368" font-family="${sans}" font-size="38" fill="#9aa8b7">Datos de marketing que se</text>
  <text x="96" y="418" font-family="${sans}" font-size="38" fill="#9aa8b7">pueden auditar.</text>
  <text x="96" y="540" font-family="${mono}" font-size="26" fill="#7d8c9d">noeliza.com</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([
    { input: rounded, left: W - 96 - 420, top: Math.round((H - 420) / 2) },
    { input: icon, left: 96, top: 64 + 0 * iconMeta.width },
  ])
  .png({ compressionLevel: 9 })
  .toFile(file("og-image.png"));

console.log("Imágenes generadas en public/assets");
