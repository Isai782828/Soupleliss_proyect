/* Soupleliss — interacciones de la primera versión */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  const form = document.querySelector('#contact-form');
  const formMessage = document.querySelector('#form-message');
  const year = document.querySelector('#current-year');

  // Año y apariencia del encabezado.
  if (year) year.textContent = new Date().getFullYear();
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Navegación móvil accesible.
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', opening);
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu.classList.contains('is-open') && !header.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  // Acordeón: mantiene una sola respuesta abierta.
  const questions = document.querySelectorAll('.faq-list details');
  questions.forEach(question => question.addEventListener('toggle', () => {
    if (question.open) questions.forEach(other => {
      if (other !== question) other.open = false;
    });
  }));

  // Aparición progresiva, con respaldo para navegadores antiguos.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // El formulario es una demostración y no transmite datos.
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    formMessage.textContent = 'Esta función estará disponible próximamente. El formulario no ha enviado información.';
  });
});
