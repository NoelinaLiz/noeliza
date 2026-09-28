/**
 * Cambio de tema claro/oscuro. La preferencia se guarda en localStorage y se aplica
 * antes del primer pintado con un script inline en el <head> (Head.astro).
 * Sin preferencia guardada, manda la del sistema (prefers-color-scheme).
 */
const root = document.documentElement;

function effectiveTheme(): "light" | "dark" {
  const explicit = root.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

document.getElementById("theme")?.addEventListener("click", () => {
  const next = effectiveTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* la preferencia vale solo para esta visita */
  }
});
