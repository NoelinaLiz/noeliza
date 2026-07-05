// Inicializar el dataLayer e interceptor de eventos
window.dataLayer = window.dataLayer || [];

(function () {
  const originalPush = window.dataLayer.push || Array.prototype.push;

  // Función customizada para interceptar los pushes de GTM u otros scripts
  window.dataLayer.push = function (...args) {
    const result = originalPush.apply(window.dataLayer, args);

    args.forEach(item => {
      if (item && typeof item === "object") {
        // Ignorar el reset de event_info: null para evitar ruido en la consola
        if (Object.keys(item).length === 1 && item.hasOwnProperty("event_info") && item.event_info === null) {
          return;
        }
        // Despachar el evento para la consola en vivo
        const customEvt = new CustomEvent("dataLayer-push", { detail: item });
        window.dispatchEvent(customEvt);
      }
    });

    return result;
  };
})();

// Captura de clics declarativa mediante data-attributes
(function () {
  document.addEventListener(
    "click",
    function (e) {
      const trackElement = e.target.closest("[data-track-event]");

      if (trackElement) {
        const eventName = trackElement.getAttribute("data-track-event");
        const eventLocation = trackElement.getAttribute("data-track-location");
        const eventElement = trackElement.getAttribute("data-track-element");
        const eventSection = trackElement.getAttribute("data-track-section");

        // Reset de event_info para evitar pollution
        window.dataLayer.push({ event_info: null });

        const rawInfo = {
          location: eventLocation,
          element: eventElement,
          section: eventSection,
          text: trackElement.innerText.trim().toLowerCase(),
          timestamp: new Date().toISOString(),
        };

        // Eliminar valores vacíos o nulos
        const cleanInfo = Object.fromEntries(
          Object.entries(rawInfo).filter(
            ([_, value]) => value && value.trim() !== ""
          )
        );

        // Envío al dataLayer
        window.dataLayer.push({
          event: "trackEvent",
          event_name: eventName,
          event_info: cleanInfo,
        });
      }
    },
    true
  );
})();
