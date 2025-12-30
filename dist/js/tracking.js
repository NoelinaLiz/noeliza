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

        // 1. Creamos un objeto con toda la información potencial
        const rawInfo = {
          location: eventLocation,
          element: eventElement,
          section: eventSection,
          text: trackElement.innerText.trim().toLowerCase(),
          timestamp: new Date().toISOString(),
        };

        // 2. FILTRADO: Solo conservamos las propiedades que tienen un valor real y no están vacías
        const cleanInfo = Object.fromEntries(
          Object.entries(rawInfo).filter(
            ([_, value]) => value && value.trim() !== ""
          )
        );

        // 3. Realizar el push al dataLayer usando el objeto limpio
        window.dataLayer.push({
          event: "trackEvent",
          event_name: eventName,
          event_info: cleanInfo,
        });

        // Opcional: Log en consola para depuración local
        //console.log(`Tracking Push (Limpio): ${eventName}`, cleanInfo);
      }
    },
    true
  );
})();
