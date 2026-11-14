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

const projects = [
  {
    id: 1,
    title: 'EN ALGÚN LUGAR DE IBEROAMÉRICA',
    subtitle: 'Festival El Ojo de Iberoamérica',
    year: 2026,
    category: 'Creatividad',
    description: 'En Algún Lugar de Iberoamérica es una idea desarrollada para celebrar los 30 años del Festival El Ojo de Iberoamérica, que busca reconocer los espacios cotidianos donde nacen las grandes ideas. La propuesta parte de una observación: celebramos las ideas cuando reciben un premio, pero pocas veces conocemos el lugar donde surgieron. A partir de esto, convocamos a creativos ganadores del festival para que compartieran fotografías y testimonios de los espacios donde se les ocurrieron sus ideas premiadas. Con este material, desarrollamos una serie de piezas gráficas que retratan esos escenarios, desde una oficina o una cama hasta una ducha o un inodoro. El proyecto busca demostrar que la creatividad puede surgir en cualquier lugar, incluso en los más inesperados, e inspirar a las nuevas generaciones de creativos.',
    image: 'https://i.imgur.com/YheYogG.jpeg',
    boards: [
      'https://i.imgur.com/YzAVVwM.jpeg',
      'https://i.imgur.com/fUNdGV5.png',
      'https://i.imgur.com/LJJZVAr.jpeg',
      'https://i.imgur.com/pyfFF9e.jpeg',
    ],
    youtube: 'https://youtu.be/7UnsXOe6r2k',
  },
  {
    id: 2,
    title: 'COMO EN CASA, ESTÉS DONDE ESTÉS',
    subtitle: 'Airbnb',
    year: 2026,
    category: 'Film / Creatividad',
    description: 'Como en casa, estés donde estés es un film desarrollado para Airbnb que, a través del humor, busca transmitir la comodidad y familiaridad de sentirse en casa, incluso cuando estamos de viaje. La propuesta parte de una situación cotidiana con la que todos podemos identificarnos: ir al baño y sentir que no hay lugar más cómodo que el de nuestra propia casa. A partir de esta observación, el film juega con el contraste entre estar en un lugar desconocido y disfrutar de la confianza y privacidad del hogar. De manera simple y humorística, buscamos destacar uno de los principales atributos de Airbnb: la posibilidad de sentirte como en casa, estés donde estés.',
    image: 'https://i.imgur.com/Ml1rtKD.png',
    boards: [],
    youtube: 'https://youtu.be/DiNkxuDQHPI',
  },
  {
    id: 3,
    title: 'HALLOWEEN',
    subtitle: 'Monster Energy',
    year: 2026,
    category: 'Film / Creatividad',
    description: 'Desarrollamos un film con motivo de Halloween, utilizando la marca Monster Energy como punto de partida. La propuesta consiste en un cortometraje que combina elementos del terror con situaciones humorísticas, jugando con el suspenso, la sorpresa y lo inesperado. Buscamos generar tensión y romperla con humor, creando una experiencia entretenida que conecta la identidad de Monster con el espíritu de Halloween.',
    image: 'https://i.imgur.com/P5wkEmh.jpeg',
    boards: [],
    youtube: 'https://youtu.be/8fhWikJjE_Y',
  },
  {
    id: 4,
    title: 'P.V.N.I.',
    subtitle: 'Caladryl',
    year: 2026,
    category: 'Diseño / Creatividad',
    description: 'La propuesta consistió en desarrollar una pieza gráfica publicitaria para Caladryl, centrada en una situación cotidiana: la aparición de una picadura inesperada sin saber qué insecto la provocó. A partir de esa incertidumbre, se construyó el concepto creativo tomando como referencia el término O.V.N.I. (Objeto Volador No Identificado) y adaptándolo al universo de los insectos y las picaduras, dando origen a la idea de P.V.N.I. (Picador Volador No Identificado). El objetivo fue generar una comunicación con un tono creativo y humorístico, transformando una experiencia común en un concepto memorable que refuerza la necesidad de contar con Caladryl para aliviar las molestias ocasionadas por cualquier picadura, independientemente de su origen.',
    image: 'https://i.imgur.com/1mOFw8p.png',
    boards: [
      'https://i.imgur.com/FwBQ9Ab.png',
      'https://i.imgur.com/D3XgxHZ.png',
      'https://i.imgur.com/upFmj71.png',
    ],
  },
  {
    id: 5,
    title: 'QUILMES BOTELLÓN 0.0',
    subtitle: 'Quilmes · Premios Martín Fierro',
    year: 2026,
    category: 'Diseño / Acción / Creatividad',
    description: 'La consigna fue diseñar una activación y un nuevo producto para Quilmes en el marco de los premios Martín Fierro. Para salir del clásico patrocinio de marca y generar un impacto real en la cultura popular, creamos el “Botellón Quilmes 0.0”, un premio especial entregado a la categoría de Mejor Labor de Conducción. La idea nació de reinterpretar el festejo con champagne de la Fórmula 1, pero cruzándolo con un insight bien argentino: un juego de palabras entre la conducción televisiva y la conducción al volante. De este doble sentido nació el trofeo ideal: una cerveza sin alcohol para el mejor “conductor”. Así, a través del humor popular, logramos instalar el producto y promover el consumo responsable en el evento más visto del país.',
    image: 'https://i.imgur.com/D3k2UQD.jpeg',
    boards: ['https://i.imgur.com/P4ryydx.jpeg'],
    youtube: 'https://youtu.be/j5tsiHB84Fg',
  },
];

const workGallery = document.querySelector('.work-gallery');
const workCardTemplate = document.querySelector('#work-card-template');
const workDialog = document.querySelector('#work-dialog');
const dialogKicker = document.querySelector('#dialog-kicker');
const dialogTitle = document.querySelector('#dialog-title');
const dialogSubtitle = document.querySelector('#dialog-subtitle');
const dialogCover = document.querySelector('#dialog-cover');
const dialogDescription = document.querySelector('#dialog-description');
const dialogVisuals = document.querySelector('#dialog-visuals');
const dialogVideo = document.querySelector('#dialog-video');

function openWorkDetail(project) {
  const [cover = project.image, ...secondaryBoards] = project.boards;

  dialogKicker.textContent = `${project.category} · ${project.year}`;
  dialogTitle.textContent = project.title;
  dialogSubtitle.textContent = project.subtitle;
  dialogCover.src = cover;
  dialogCover.alt = `Imagen principal de ${project.title}`;
  dialogDescription.textContent = project.description;
  dialogVideo.hidden = !project.youtube;
  if (project.youtube) {
    dialogVideo.href = project.youtube;
  } else {
    dialogVideo.removeAttribute('href');
  }

  dialogVisuals.replaceChildren(...secondaryBoards.map((src, index) => {
    const image = document.createElement('img');
    image.className = 'dialog-image';
    image.src = src;
    image.alt = `Pieza ${index + 2} de ${project.title}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  }));

  workDialog.showModal();
  workDialog.scrollTop = 0;
}

for (const project of projects) {
  const card = workCardTemplate.content.cloneNode(true);
  const button = card.querySelector('.work-open');
  card.querySelector('img').src = project.image;
  card.querySelector('strong').textContent = project.title;
  card.querySelector('small').textContent = `${project.subtitle} · ${project.category} · ${project.year}`;
  button.dataset.work = String(project.id);
  button.addEventListener('click', () => openWorkDetail(project));
  workGallery.append(card);
}

document.querySelector('.dialog-close').addEventListener('click', () => workDialog.close());
workDialog.addEventListener('click', (event) => {
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
