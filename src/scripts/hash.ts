/**
 * SHA-256 en el navegador con la API nativa (`crypto.subtle`).
 * El email se normaliza (sin espacios y en minúsculas) antes de hashear, que es
 * el formato que esperan GA4 y Meta para poder cruzar el dato.
 */
export async function sha256(message: string): Promise<string> {
  const bytes = new TextEncoder().encode(message.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
