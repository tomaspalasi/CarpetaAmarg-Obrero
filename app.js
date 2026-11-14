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
  document.body.classList.toggle('home-active', section.id === 'inicio');

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

document.querySelectorAll('[data-profile]').forEach((button) => {
  button.addEventListener('click', () => {
    const profile = document.getElementById(button.dataset.profile);
    if (profile instanceof HTMLDialogElement && !profile.open) {
      profile.showModal();
      profile.scrollTop = 0;
    }
  });
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
