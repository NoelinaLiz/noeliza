// ==========================================
// CONFIGURACIÓN CENTRALIZADA
// ==========================================
const RUTA_PROXY = '/b3ev';             // Sin barra al final para una validación más limpia
const GTM_CONTAINER_ID = 'GTM-5XBZSB7'; // Tu ID de contenedor de GTM
// ==========================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. Verificación robusta de la ruta (captura /b3ev, /b3ev/ y /b3ev/cualquier-cosa)
    const coincideRuta = path === RUTA_PROXY || path.startsWith(RUTA_PROXY + '/');

    if (coincideRuta) {

      // Normalizamos el path para asegurar la barra final si se accede a la raíz del proxy (ej. /b3ev)
      // Google Tag Gateway requiere la barra al final para mapear correctamente endpoints y pasar el geo check
      if (url.pathname === RUTA_PROXY) {
        url.pathname = RUTA_PROXY + '/';
      }

      const GOOGLE_ENDPOINT = `${GTM_CONTAINER_ID}.fps.goog`;

      // Cambiamos el destino al servidor de Google (mantiene los query strings de la URL original)
      url.hostname = GOOGLE_ENDPOINT;

      // Clonamos las cabeceras originales de la petición (mantiene cookies intactas)
      const newHeaders = new Headers(request.headers);

      // REQUISITO DE GOOGLE 1: Anular el encabezado Host obligatoriamente
      newHeaders.set('Host', GOOGLE_ENDPOINT);

      // REQUISITO DE GOOGLE 2: Pasar la IP real del usuario (evita geolocalizar al servidor de Cloudflare)
      const clientIP = request.headers.get('CF-Connecting-IP');
      if (clientIP) {
        newHeaders.set('X-Forwarded-For', clientIP);
      }

      // REQUISITO DE GOOGLE 3: Pasar geolocalización usando los headers exactos solicitados
      if (request.cf) {
        if (request.cf.country) {
          newHeaders.set('X-Forwarded-Country', request.cf.country);
        }
        if (request.cf.regionCode) {
          newHeaders.set('X-Forwarded-Region', request.cf.regionCode);
        }
      }

      // CONFIGURACIÓN DE PETICIÓN PROTEGIDA
      const requestInit = {
        method: request.method,
        headers: newHeaders,
        redirect: 'manual'
      };

      // REGLA DE SEGURIDAD 1: Evita que Cloudflare falle al pasar un 'body' en peticiones GET o HEAD
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        requestInit.body = request.body;
      }

      // Ejecutamos la petición hacia los servidores de Google
      const response = await fetch(url.toString(), requestInit);

      // REGLA DE SEGURIDAD 2: Evita que Cloudflare falle al intentar devolver un cuerpo (body) 
      // en respuestas con estado 204 o 304 (muy comunes en los acuses de recibo de GA4).
      const statusSinCuerpo = [204, 304].includes(response.status);

      // Creamos la respuesta final clonando las propiedades de la respuesta de Google
      const modifiedResponse = new Response(statusSinCuerpo ? null : response.body, response);

      // REQUISITO SEO: Inyectar la cabecera de no indexación
      modifiedResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

      return modifiedResponse;
    }

    // Si la ruta visitada no tiene nada que ver con el proxy, continúa el tráfico normal a la web
    return fetch(request);
  }
};