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
