document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("btn-open");
  const btnClose = document.getElementById("btn-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuLinks = document.querySelectorAll(".menu-link");

  // Función para alternar el menú
  const toggleMenu = () => {
    // La clase 'translate-x-full' mueve el menú fuera de pantalla
    // Al quitarla, vuelve a su posición original (dentro de pantalla)
    mobileMenu.classList.toggle("translate-x-full");

    // Evita el scroll en el body cuando el menú está abierto
    document.body.classList.toggle("overflow-hidden");
  };

  // Eventos de clic
  btnOpen.addEventListener("click", toggleMenu);
  btnClose.addEventListener("click", toggleMenu);

  // Cerrar el menú automáticamente al hacer clic en un enlace
  menuLinks.forEach(link => {
    link.addEventListener("click", toggleMenu);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("image-reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Cuando la imagen es visible, aplicamos las clases de Tailwind
          entry.target.classList.remove("opacity-0", "translate-y-4");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target); // Dejamos de observar una vez cargada
        }
      });
    },
    { threshold: 0.1 }
  ); // Se activa cuando el 10% de la imagen es visible

  if (image) observer.observe(image);
});

// Mensaje de bienvenida en la consola
console.log(
  "%c¡Hola, colega! 🚀",
  "color: #1887e1; font-size: 20px; font-weight: bold; font-family: sans-serif;"
);

console.log(
  "%cSi estás viendo esto, es porque eres una persona con conocimientos técnicos y te gusta ver qué hay 'bajo el capó'. 👀💻\n\n" +
    "Gracias por visitar mi sitio. He diseñado esta arquitectura pensando en la robustez de los datos y la privacidad (Consent Mode v2 + Data Attributes).\n\n" +
    "✨ ¿Tienes alguna duda o feedback sobre la implementación?\n" +
    "📫 Escríbeme directamente a: %cnoe@noeliza.com",
  "color: #334155; font-size: 14px; line-height: 1.5;",
  "color: #1887e1; font-weight: bold; text-decoration: underline;"
);
