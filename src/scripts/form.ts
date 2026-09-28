import { sha256 } from "./hash";

/**
 * Formulario de contacto.
 *
 * - Honeypot: el campo `contact_website` está oculto para las personas. Si llega
 *   con contenido, es un bot: se simula el éxito y no se envía nada ni se mide.
 * - El mensaje se envía tal cual a Google Apps Script (que lo guarda en una hoja
 *   privada). Los nombres de campo (nombre, email, web, servicio, mensaje) los usa
 *   el script: no renombrar.
 * - En el dataLayer el email viaja solo como hash SHA-256.
 * - `form_submission_success` se dispara únicamente si el servidor respondió bien.
 */

interface FormStrings {
  send: string;
  sending: string;
  note: string;
  errorRequired: string;
  errorEmail: string;
  errorSend: string;
}

const form = document.getElementById("form") as HTMLFormElement | null;
const stringsEl = document.getElementById("i18n-form");

if (form && stringsEl) init(form, JSON.parse(stringsEl.textContent || "{}") as FormStrings);

function init(form: HTMLFormElement, s: FormStrings): void {
  const okBox = document.getElementById("ok")!;
  const msg = document.getElementById("f-msg")!;
  const send = document.getElementById("f-send") as HTMLButtonElement;
  const hashEl = document.getElementById("ok-hash")!;

  const showOk = (hash: string) => {
    hashEl.textContent = hash;
    hashEl.parentElement!.hidden = !hash;
    form.hidden = true;
    okBox.hidden = false;
  };

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const trap = form.elements.namedItem("contact_website") as HTMLInputElement | null;
    if (trap?.value) {
      showOk("");
      return;
    }

    if (!form.checkValidity()) {
      const invalid = form.querySelector<HTMLInputElement>(":invalid")!;
      msg.textContent = invalid.type === "email" ? s.errorEmail : s.errorRequired;
      invalid.focus();
      return;
    }

    send.disabled = true;
    send.textContent = s.sending;
    msg.textContent = s.note;

    const data = new FormData(form);
    data.delete("contact_website");

    const email = String(data.get("email") ?? "");
    const service = form.elements.namedItem("servicio") as HTMLSelectElement;

    let hash: string;
    try {
      hash = await sha256(email);
    } catch {
      hash = "hashing_failed";
    }

    try {
      const response = await fetch(form.dataset.endpoint!, { method: "POST", body: data });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error("No se pudo enviar el formulario:", error);
      send.disabled = false;
      send.textContent = s.send;
      msg.textContent = s.errorSend;
      return;
    }

    window.dataLayer.push({
      event: "form_submission_success",
      // ID único para deduplicar si en el futuro el mismo evento llega también por servidor.
      event_id: `noeliza_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      event_info: {
        service_id: service.value,
        service_name: service.options[service.selectedIndex].text.toLowerCase(),
        email: hash,
        language: document.documentElement.lang || "es",
        timestamp: new Date().toISOString(),
      },
      user_properties: { user_type: "lead" },
    });
    window.dataLayer.push({ event_info: null });
    showOk(hash);
  });

  document.getElementById("again")?.addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    okBox.hidden = true;
    send.disabled = false;
    send.textContent = s.send;
    msg.textContent = s.note;
  });
}
