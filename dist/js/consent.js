document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const btnSave = document.getElementById("btn-save");
  const btnAcceptAll = document.getElementById("btn-accept-all");
  const checkAnalytics = document.getElementById("check-analytics");
  const checkMarketing = document.getElementById("check-marketing");

  if (!localStorage.getItem("cookie-consent")) {
    banner.classList.remove("hidden");
  }

  // Función para actualizar consentimiento
  const updateConsent = (analytics, marketing) => {
    const consent = {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    };

    gtag("consent", "update", consent);
    window.dataLayer.push({
      event: "cookie_consent_update",
    });
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    banner.classList.add("hidden");
  };

  // Botón Guardar Selección
  btnSave.addEventListener("click", () => {
    updateConsent(checkAnalytics.checked, checkMarketing.checked);
  });

  // Botón Aceptar Todo
  btnAcceptAll.addEventListener("click", () => {
    updateConsent(true, true);
  });

  // --- Lógica para re-abrir el banner desde el footer ---
  const btnOpenSettings = document.getElementById("open-cookie-settings");

  if (btnOpenSettings) {
    btnOpenSettings.addEventListener("click", () => {
      // 1. Si ya había una decisión guardada, marcamos los checkboxes según esa decisión
      const savedConsent = localStorage.getItem("cookie-consent");
      if (savedConsent) {
        const consent = JSON.parse(savedConsent);
        checkAnalytics.checked = consent.analytics_storage === "granted";
        checkMarketing.checked = consent.ad_storage === "granted";
      }

      // 2. Mostramos el banner
      banner.classList.remove("hidden");

      // 3. Opcional: Hacer scroll suave hasta el banner si el usuario está muy arriba
      banner.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }
});
