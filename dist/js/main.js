document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const btnOpen = document.getElementById("btn-open");
  const btnClose = document.getElementById("btn-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuLinks = document.querySelectorAll(".menu-link");

  if (btnOpen && btnClose && mobileMenu) {
    const toggleMenu = () => {
      mobileMenu.classList.toggle("translate-x-full");
      document.body.classList.toggle("overflow-hidden");
    };

    btnOpen.addEventListener("click", toggleMenu);
    btnClose.addEventListener("click", toggleMenu);

    menuLinks.forEach(link => {
      link.addEventListener("click", toggleMenu);
    });
  }

  // Barra de lectura / Progreso de Scroll horizontal
  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    });
  }

  // Consola de eventos en tiempo real (Intercepción de dataLayer)
  const consoleLogs = document.getElementById("console-logs");
  const btnClearConsole = document.getElementById("clear-console");
  const btnSimulateEvent = document.getElementById("simulate-event");

  if (consoleLogs) {
    // Función para renderizar un log de evento
    const renderLog = (eventData) => {
      // Limpiar el mensaje placeholder de la consola si existe
      const placeholder = consoleLogs.querySelector(".console-placeholder");
      if (placeholder) {
        placeholder.remove();
      }

      const logElement = document.createElement("div");
      logElement.className = "console-line mb-3 font-mono text-[11px] leading-relaxed border-b border-slate-100 pb-3 text-slate-700";

      const timestamp = new Date().toLocaleTimeString();

      // Formatear el HTML para mostrar el evento
      let logHtml = `
        <div class="flex items-center justify-between mb-1">
          <span class="text-brand-primary font-bold">↳ Evento: "${eventData.event || 'push_general'}"</span>
          <span class="text-slate-400 text-[10px]">${timestamp}</span>
        </div>
      `;

      // Copiar el objeto para remover la clave 'event' que ya mostramos
      const properties = { ...eventData };
      delete properties.event;

      if (Object.keys(properties).length > 0) {
        logHtml += `
          <pre class="bg-slate-50 p-2 rounded-lg text-slate-600 overflow-x-auto text-[10px] max-h-48 border border-slate-100 select-all">${JSON.stringify(properties, null, 2)}</pre>
        `;
      } else {
        logHtml += `<span class="text-slate-400 italic text-[10px]">Sin parámetros adicionales</span>`;
      }

      logElement.innerHTML = logHtml;
      consoleLogs.appendChild(logElement);

      // Limitar a los últimos 8 logs para evitar ruido visual
      while (consoleLogs.children.length > 8) {
        consoleLogs.removeChild(consoleLogs.firstChild);
      }

      // Auto-scroll al fondo
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
    };

    // 1. Cargar y mostrar eventos ya existentes en dataLayer en el arranque de la consola
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.forEach(item => {
        if (item && typeof item === "object") {
          // Ignorar resets
          if (Object.keys(item).length === 1 && item.hasOwnProperty("event_info") && item.event_info === null) {
            return;
          }
          renderLog(item);
        }
      });
    }

    // 2. Escuchar e imprimir nuevos eventos en tiempo real
    window.addEventListener("dataLayer-push", (e) => {
      renderLog(e.detail);
    });
  }

  if (btnClearConsole && consoleLogs) {
    btnClearConsole.addEventListener("click", () => {
      consoleLogs.innerHTML = `
        <div class="console-placeholder text-slate-400 italic text-[11px] font-mono py-4 text-center">
          // Consola limpia. Navega o haz clic en los elementos para ver la medición.
        </div>
      `;
    });
  }

  if (btnSimulateEvent) {
    btnSimulateEvent.addEventListener("click", () => {
      window.dataLayer.push({
        event: "visitor_test_click",
        visitor_action: "simulated_debug_click",
        details: {
          simulated_by: "visitor",
          message: "Probando debugger en tiempo real de Noeliza.com",
          success: true
        }
      });
    });
  }
});

// Mensaje de bienvenida en consola del navegador
console.log(
  "%c¡Hola, reclutador / colega! 🚀",
  "color: #1887e1; font-size: 20px; font-weight: bold; font-family: sans-serif;"
);

console.log(
  "%cHe diseñado este sitio web no solo como mi portfolio, sino como mi propio sandbox de analítica digital. 👀💻\n\n" +
  "📬 Si quieres charlar sobre la implementación o arquitectura de datos, escríbeme a: %cnoe@noeliza.com",
  "color: #334155; font-size: 13px; line-height: 1.6;",
  "color: #1887e1; font-weight: bold; text-decoration: underline;"
);
