// Inicializar el dataLayer
window.dataLayer = window.dataLayer || [];

(function () {
  // Escuchar todos los clics en el documento
  document.addEventListener(
    "click",
    function (e) {
      // Buscar si el elemento clickeado (o alguno de sus padres) tiene el atributo de tracking
      const trackElement = e.target.closest("[data-track-event]");

      if (trackElement) {
        // Extraer los valores de los atributos data-
        const eventName = trackElement.getAttribute("data-track-event");
        const eventLocation = trackElement.getAttribute("data-track-location");

        // Realizar el push al dataLayer con el esquema estándar
        window.dataLayer.push({
          event: "trackEvent",
          event_name: eventName,
          event_info: {
            location: eventLocation,
            element_text: trackElement.innerText.trim() || "no_text",
            timestamp: new Date().toISOString(),
          },
        });

        // Opcional: Log en consola para depuración local
        console.log(`Tracking Push: ${eventName} desde ${eventLocation}`);
      }
    },
    true
  );
})();
