const menuButton = document.querySelector('.menu-toggle');
const mobileNavigation = document.querySelector('#mobile-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileNavigation?.classList.toggle('is-open', !isOpen);
});

mobileNavigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileNavigation.classList.remove('is-open');
  });
});

const workDetails = [
  {
    title: 'A cielo abierto',
    kicker: 'Estudio visual / 01 · Imagen editorial',
    image: '/manus-storage/async-images/4v2SGRElHLuTLkAD8NlRuQ/image-2.webp',
    alt: 'Paisaje ilustrado de muestra en tintas rojas, ocres y verdes',
    description: 'Una exploración gráfica de paisaje, color y papel impreso. Es un visual de muestra creado para darle forma al archivo de esta página, no un trabajo publicado del grupo.'
  },
  {
    title: 'La mesa',
    kicker: 'Estudio visual / 02 · Proceso',
    image: '/manus-storage/async-images/4v2SGRElHLuTLkAD8NlRuQ/image-3.webp',
    alt: 'Cámara analógica en un bodegón editorial de muestra',
    description: 'Una composición sobre herramientas, oficio y proceso. Es un visual de muestra creado para darle forma al archivo de esta página, no un trabajo publicado del grupo.'
  },
  {
    title: 'Un símbolo',
    kicker: 'Estudio visual / 03 · Identidad',
    image: '/manus-storage/async-images/4v2SGRElHLuTLkAD8NlRuQ/image-4.webp',
    alt: 'Bolso de lona y motivo abstracto en un collage botánico',
    description: 'Una prueba de color y símbolo para una identidad ficticia. Es un visual de muestra creado para darle forma al archivo de esta página, no un trabajo publicado del grupo.'
  }
];

const workDialog = document.querySelector('#work-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogTitle = document.querySelector('#dialog-title');
const dialogKicker = document.querySelector('#dialog-kicker');
const dialogDescription = document.querySelector('#dialog-description');

function openWorkDetail(index) {
  const work = workDetails[index];
  if (!work || !workDialog || !dialogImage || !dialogTitle || !dialogKicker || !dialogDescription) return;
  dialogImage.src = work.image;
  dialogImage.alt = work.alt;
  dialogTitle.textContent = work.title;
  dialogKicker.textContent = work.kicker;
  dialogDescription.textContent = work.description;
  workDialog.showModal();
}

document.querySelectorAll('.work-open').forEach((button) => {
  button.addEventListener('click', () => openWorkDetail(Number(button.dataset.work)));
});

document.querySelector('.dialog-close')?.addEventListener('click', () => workDialog?.close());
workDialog?.addEventListener('click', (event) => {
  if (event.target === workDialog) workDialog.close();
});

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const contactEmail = ''; // Completar con la dirección real del grupo cuando esté disponible.

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!contactEmail) {
    if (formStatus) formStatus.textContent = 'El mensaje quedó listo, pero falta configurar el correo real del grupo para poder enviarlo.';
    return;
  }

  const data = new FormData(form);
  const subject = `Consulta para Amarg* Obrero — ${String(data.get('name')).trim()}`;
  const body = `${String(data.get('message')).trim()}\n\nResponder a: ${String(data.get('email')).trim()}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.section-heading, .work-card, .about-topline, .person-card, .contact-layout');
if ('IntersectionObserver' in window && !reducedMotion) {
  document.documentElement.classList.add('reveal-ready');
  revealTargets.forEach((target) => target.classList.add('reveal'));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => observer.observe(target));
}
