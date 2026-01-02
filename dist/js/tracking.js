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
        const eventElement = trackElement.getAttribute("data-track-element");
        const eventSection = trackElement.getAttribute("data-track-section");

        // Reset para evitar pollution del Data Model
        window.dataLayer.push({ event_info: null });

        // Creación del objeto inicial de event info
        const rawInfo = {
          location: eventLocation,
          element: eventElement,
          section: eventSection,
          text: trackElement.innerText.trim().toLowerCase(),
          timestamp: new Date().toISOString(),
        };

        // FILTRADO: Solo conservamos las propiedades que tienen un valor real y no están vacías
        const cleanInfo = Object.fromEntries(
          Object.entries(rawInfo).filter(
            ([_, value]) => value && value.trim() !== ""
          )
        );

        // Push al dataLayer usando el objeto limpio
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
