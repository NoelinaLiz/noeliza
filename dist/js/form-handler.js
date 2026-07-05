const scriptURL =
  "https://script.google.com/macros/s/AKfycby-pjcbpr8umUnoU_OXW1bBdycoQLvlMshfWp4tLTooipBJ7lLkaf1acOw3GBtdUrSyKQ/exec";
const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-btn");
const formContainer = document.getElementById("form-container");
const successMessage = document.getElementById("success-message");

// Función nativa y asíncrona para hashear el email en SHA-256 en el cliente
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  // Capturar el servicio seleccionado y el email
  const selectElement = form.elements["servicio"];
  const serviceCode = selectElement.value || "noeliza_service_unknown";
  const selectedServiceText = selectElement.options[selectElement.selectedIndex].text;
  const userEmail = form.elements["email"].value;

  // Hashear el email para cumplir con las normativas PII de GA4/Meta
  let hashedEmail = "";
  try {
    hashedEmail = await sha256(userEmail);
  } catch (err) {
    console.error("Error al hashear el email:", err);
    hashedEmail = "hashing_failed";
  }

  // Cambiar estado del botón
  btn.disabled = true;
  btn.innerText = "Enviando...";
  btn.classList.add("opacity-50", "cursor-not-allowed");

  // Enviar el formulario por POST (a Google Sheets a través de Apps Script)
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => {
      formContainer.classList.add("hidden");
      successMessage.classList.remove("hidden");

      // Unique event ID para deduplicación
      const uniqueEventId =
        "noeliza_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

      // Envío del evento a dataLayer con el email HASHEADO
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submission_success",
        event_id: uniqueEventId,
        event_info: {
          service_id: serviceCode,
          service_name: selectedServiceText.toLowerCase(),
          email: hashedEmail, // SHA-256 Hash
          language: window.location.pathname.includes("en.html") ? "en" : "es",
          timestamp: new Date().toISOString(),
        },
        user_properties: {
          user_type: "lead",
        },
      });
      window.dataLayer.push({ event_info: null }); // Reset
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error.message);

      // Re-habilitar botón en caso de error
      btn.disabled = false;
      btn.innerText = "Enviar consulta";
      btn.classList.remove("opacity-50", "cursor-not-allowed");
    });
});
