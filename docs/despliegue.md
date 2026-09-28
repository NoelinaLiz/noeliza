# Despliegue

## Cómo llega un cambio a producción

Hostinger está conectado a este repositorio y **solo copia archivos**: no ejecuta `npm`, no compila nada. Por eso `dist/` (el sitio ya construido) forma parte del repositorio.

1. Cambia lo que necesites en `src/`, `public/` o `docs/`.
2. Ejecuta las comprobaciones:
   ```bash
   npm test
   npm run check
   npm run build
   ```
3. Haz commit **con `dist/` incluido** (`git add -A` lo incluye) y súbelo a `main`.
4. En el panel de Hostinger, haz el pull de la rama `main`. El sitio se actualiza.

Si te olvidas del paso 2 (`npm run build`), Hostinger publicará la versión anterior: `dist/` es lo único que se sirve.

La estructura de URLs no cambia entre versiones: `/`, `/en.html`, `/privacidad.html`, `/privacy.html`, `/sitemap.xml`, `/robots.txt` y `/404.html`.

## Verificación después de publicar

1. Abre <https://noeliza.com> en una ventana privada: debe aparecer el banner de cookies.
2. Rechaza todo y comprueba en la consola de la página que el estado queda en `denied`.
3. Abre una ruta inexistente anidada (por ejemplo `/a/b/c`): debe verse la 404 **con estilos** y el banner de cookies.
4. Revisa `https://noeliza.com/sitemap.xml`: el `lastmod` debe ser la fecha del build.
5. En GTM (modo vista previa) confirma que llegan `trackEvent`, `cookie_consent_update` y `form_submission_success`.

## Volver atrás

Como todo lo que se sirve está en el repositorio, revertir es revertir el commit:

```bash
git revert <commit>      # crea un commit que deshace el anterior
git push origin main
```

Después, repite el pull en Hostinger.

## Cloudflare

Cloudflare solo se usa para el proxy de GTM (ruta `/b3ev`). El código de ese Worker está copiado en [`cloudflare/reverse-proxy.js`](../cloudflare/reverse-proxy.js) **para dejar constancia de lo que está desplegado**. El Worker real se edita en el panel de Cloudflare; si lo cambias allí, actualiza también esa copia.

## `.htaccess` opcional

Para añadir cabeceras de seguridad y caché en Hostinger, hay una propuesta en [`htaccess.recomendado`](htaccess.recomendado). **No se incluye en `dist/` a propósito:** Hostinger suele generar su propio `.htaccess` (redirección a HTTPS, etc.) y un archivo con el mismo nombre en el repositorio lo sobrescribiría al hacer el pull. Si quieres aplicarlo, agrégalo a mano al `.htaccess` existente desde el administrador de archivos del panel.
