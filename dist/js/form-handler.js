const scriptURL =
  "https://script.google.com/macros/s/AKfycby-pjcbpr8umUnoU_OXW1bBdycoQLvlMshfWp4tLTooipBJ7lLkaf1acOw3GBtdUrSyKQ/exec";
const form = document.getElementById("contact-form");
const btn = document.getElementById("submit-btn");
const formContainer = document.getElementById("form-container");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", e => {
  e.preventDefault();

  // Cambiar estado del botón
  btn.disabled = true;
  btn.innerText = "Enviando...";
  btn.classList.add("opacity-50", "cursor-not-allowed");

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => {
      // Con 'no-cors', no podemos leer la respuesta JSON,
      // pero si no entra al .catch, es que se envió.
      formContainer.classList.add("hidden");
      successMessage.classList.remove("hidden");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submission_success",
      });
    })
    .catch(error => {
      console.error("Error!", error.message);
      alert("Error al enviar. Revisa la consola.");
    });
});
