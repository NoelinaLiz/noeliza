# noeliza.com — Marketing Technology & Analytics Sandbox 🚀

Este es el repositorio de mi sitio web personal e interactivo [noeliza.com](https://noeliza.com). 

Si bien sirve como mi carta de presentación y portfolio profesional para reclutadores, el **propósito principal de este proyecto es ser mi entorno de pruebas (sandbox)** para diseñar, implementar y testear arquitecturas avanzadas de analítica digital, gobernanza de datos y privacidad en entornos web reales.

---

## 🛠️ Arquitectura de Medición y MarTech

En este sitio he implementado y validado en producción diversas soluciones de ingeniería de marketing y analítica digital, destacando las siguientes:

### 1. Gobernanza de Privacidad: Consent Mode v2 (Nativo)
*   **Implementación:** Configuración del estado de consentimiento nativo en el `<head>` respetando GDPR/DMA.
*   **Lógica:** Las preferencias del usuario sobre analítica y marketing se capturan en un banner de cookies dinámico, se persisten en `localStorage` y actualizan los permisos de Google Tag Manager mediante la API de `gtag("consent", "update", ...)`. 
*   **Comportamiento:** Si un usuario niega el consentimiento, las etiquetas correspondientes se disparan en modo condicional sin persistir cookies de seguimiento, garantizando una medición *privacy-first*.

### 2. Cumplimiento de PII: Hasheo SHA-256 en el Cliente (Zero PII)
*   **Problema:** Enviar datos personales (como correos en texto plano de un formulario de contacto) a plataformas de terceros viola las políticas de GA4 y Meta.
*   **Solución:** En el archivo [form-handler.js](dist/js/form-handler.js), antes de que el formulario se envíe por POST y se registre el evento en el `dataLayer`, el email del usuario se procesa localmente con la API de criptografía nativa del navegador (`window.crypto.subtle.digest("SHA-256", ...)`).
*   **Resultado:** Solo se registra y comparte la firma hasheada unidireccional (SHA-256) del correo, protegiendo al 100% el PII del usuario.

### 3. Evitando Bloqueadores: GTM Proxy Inverso con Cloudflare Workers
*   **Implementación:** Para mitigar el impacto de bloqueadores de anuncios (adblockers) y mejorar la vida útil de las cookies bajo las políticas ITP/CNIL, las solicitudes a Google Tag Manager se sirven desde mi propio dominio.
*   **Lógica:** Vinculé el dominio a Cloudflare y creé una Worker Rule que enmascara las peticiones. En el HTML del sitio verás que el script de GTM solicita el script de descarga y envía hits de eventos a través de la ruta `/b3ev/gtm.js?id=GTM-...` que enruta el tráfico hacia los servidores oficiales en segundo plano.

### 4. Seguimiento Declarativo: Event Delegation mediante Atributos HTML5
*   **Implementación:** Para mantener el HTML limpio y escalable, no utilizo disparadores de JavaScript inline en los botones.
*   **Lógica:** En su lugar, utilizo un listener global en [tracking.js](dist/js/tracking.js) que intercepta todos los clics y procesa únicamente aquellos elementos que cuentan con atributos declarativos `data-track-event`, `data-track-location`, `data-track-element` y `data-track-section`. Los datos se limpian de valores vacíos y se envían de forma estandarizada en un solo hit al dataLayer.

### 5. Debugger Visual en Pantalla (Live Tracking Console)
*   **Implementación:** Para demostrar la precisión de la medición a las visitas y reclutadores, el sitio cuenta con una consola interactiva en pantalla.
*   **Lógica:** En [tracking.js](dist/js/tracking.js) creamos un wrapper para la función estándar `window.dataLayer.push`. Cada vez que GTM u otro script agrega datos a la cola del dataLayer, el wrapper intercepta el objeto y despacha un evento personalizado de ventana.
*   **UX:** El archivo [main.js](dist/js/main.js) escucha este evento y renderiza visualmente en la consola los datos capturados en formato JSON estructurado, incluyendo un botón de simulación interactiva. En el arranque de la página, el script también lee y expone los eventos iniciales (`gtm.js` o configuraciones de consentimiento) para evitar que la consola inicie vacía.

---

## 📂 Estructura del Código

```bash
├── dist/                    # Archivos estáticos finales listos para producción
│   ├── assets/              # Imágenes, logos y favicon del sitio
│   ├── css/
│   │   └── style.css        # Hoja de estilos final generada por Tailwind CLI
│   ├── js/
│   │   ├── consent.js       # Control del banner de cookies y API de consentimiento
│   │   ├── form-handler.js  # Envío del formulario asíncrono y Hasheo SHA-256
│   │   ├── main.js          # Control de menús, progresos y render de la consola en vivo
│   │   └── tracking.js      # Interceptor del dataLayer y listener global de clics
│   ├── index.html           # Página de inicio y portfolio principal
│   ├── privacidad.html      # Página de Política de Privacidad (Explicación del Hasheo y GTM Proxy)
│   └── 404.html             # Página de error 404 con trackeo específico
├── src/
│   └── input.css            # Archivo CSS de entrada Tailwind CSS v4 con variables del tema y grids
├── package.json             # Scripts de compilación de Tailwind CLI y dependencias de desarrollo
└── README.md                # Documento explicativo de la arquitectura
```

---

## ⚙️ Desarrollo Local y Despliegue

### Requisitos
*   Node.js (v18+)

### Instalación de dependencias
```bash
npm install
```

### Compilar estilos CSS (Tailwind v4)
Para compilar los estilos de forma manual o durante el desarrollo continuo:
```bash
# Compilar una única vez
npx @tailwindcss/cli -i ./src/input.css -o ./dist/css/style.css

# Compilar en modo observación (watch)
npm run build
```

### Despliegue
Este repositorio utiliza un flujo de **GitHub Actions** automatizado. Al realizar un `git push` a la rama `main`, los cambios estáticos del directorio `dist/` se sincronizan automáticamente con el plan de hosting productivo en Hostinger.
