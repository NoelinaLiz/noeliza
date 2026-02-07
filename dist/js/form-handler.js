const scriptURL =
  "https://script.google.com/macros/s/AKfycby-pjcbpr8umUnoU_OXW1bBdycoQLvlMshfWp4tLTooipBJ7lLkaf1acOw3GBtdUrSyKQ/exec";
const form = document.getElementById("contact-form"); //
const btn = document.getElementById("submit-btn");
const formContainer = document.getElementById("form-container");
const successMessage = document.getElementById("success-message");

// 1. Diccionario de mapeo: Texto del HTML -> Código de Analytics
const serviceCodes = {
  "Cimientos Digitales: Implementación Profesional de GA4 y GTM":
    "noeliza_service_01",
  "Visualización Pro: Dashboards en Looker Studio": "noeliza_service_02",
  "Diagnóstico: Auditoría de Analítica Técnica": "noeliza_service_03",
  "Advanced MarTech Stack: Infraestructura & Data": "noeliza_service_04",
};

form.addEventListener("submit", e => {
  e.preventDefault();

  // Capturamos el servicio seleccionado
  const selectedServiceText = form.elements["servicio"].value; //
  //Captura del email del usuario
  const userEmail = form.elements["email"].value;

  const serviceCode =
    serviceCodes[selectedServiceText] || "noeliza_service_unknown";
  // Cambiar estado del botón
  btn.disabled = true;
  btn.innerText = "Enviando...";
  btn.classList.add("opacity-50", "cursor-not-allowed");

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => {
      formContainer.classList.add("hidden");
      successMessage.classList.remove("hidden");

      //Unique event ID para deduplicación
      const uniqueEventId =
        "noeliza_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      // Envío del evento
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submission_success",
        event_id: uniqueEventId,
        event_info: {
          service_id: serviceCode,
          service_name: selectedServiceText.toLowerCase(),
          email: userEmail,
          timestamp: new Date().toISOString(),
        },
        user_properties: {
          user_type: "lead",
        },
      });
      window.dataLayer.push({ event_info: null }); // Reset para evitar pollution del Data Model
    })
    .catch(error => {
      console.error("Error!", error.message);
      //alert("Error al enviar");

      // Re-habilitar botón en caso de error
      btn.disabled = false;
      btn.innerText = "Solicitar presupuesto";
      btn.classList.remove("opacity-50", "cursor-not-allowed");
    });
});
