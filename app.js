const menuButton = document.querySelector('.menu-toggle');
const mobileNavigation = document.querySelector('#mobile-nav');
const sections = [...document.querySelectorAll('#contenido > section[id]')];
const navigationLinks = document.querySelectorAll('.site-header nav a, .footer-nav a');
let activeSection;

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileNavigation?.classList.toggle('is-open', !isOpen);
});

function showSection(hash, moveFocus = false) {
  const section = sections.find(({ id }) => `#${id}` === hash) ?? sections[0];
  if (section === activeSection && !moveFocus) return;
  activeSection = section;

  for (const panel of sections) {
    panel.hidden = panel !== section;
  }
  for (const link of navigationLinks) {
    if (link.hash === `#${section.id}`) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  if (mobileNavigation?.classList.contains('is-open')) {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileNavigation.classList.remove('is-open');
  }
  if (moveFocus) {
    const heading = document.getElementById(section.getAttribute('aria-labelledby'));
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

showSection(window.location.hash);

window.addEventListener('hashchange', () => {
  if (window.location.hash !== '#contenido') showSection(window.location.hash, true);
});

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  if (link.hash === '#contenido') {
    event.preventDefault();
    document.getElementById('contenido').focus();
    return;
  }
  if (!sections.some(({ id }) => link.hash === `#${id}`)) return;

  event.preventDefault();
  if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash);
  showSection(link.hash, true);
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
