// Punto de entrada único del JavaScript del sitio. El orden importa:
// tracking instala el wrapper del dataLayer antes de que nada más emita eventos,
// y la consola va al final para poder repetir todo lo que ya pasó por el dataLayer.
import "./tracking";
import "./theme";
import "./consent";
import "./form";
import "./console";
