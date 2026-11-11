// Mobile navigation: open and close the menu with the button or a link.
const menuButton = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');

function closeMenu() {
  siteNav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.textContent = '☰';
}

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');

  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  );
  menuButton.textContent = isOpen ? '×' : '☰';
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});


// Reveal page content as it scrolls into view.
const revealItems = document.querySelectorAll(
  '.hero-copy, .education-card, .skill-group, .project-card, .contact-card'
);

revealItems.forEach((item, index) => {
  item.classList.add('reveal');

  // Slightly stagger the project card entrances.
  if (item.classList.contains('project-card')) {
    item.style.setProperty('--reveal-delay', `${(index % 2) * 120}ms`);
  }
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  // Show everything in older browsers that lack IntersectionObserver.
  revealItems.forEach((item) => item.classList.add('is-visible'));
}


// Add a gentle 3D tilt to project cards when using a mouse or trackpad.
const projectCards = document.querySelectorAll('.project-card');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  projectCards.forEach((card) => {
    const visual = card.querySelector('.project-visual');

    card.addEventListener('pointermove', (event) => {
      // Skip the tilt for touch input.
      if (event.pointerType === 'touch') return;

      const bounds = card.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width;
      const pointerY = (event.clientY - bounds.top) / bounds.height;

      const tiltY = (pointerX - 0.5) * 8;
      const tiltX = (0.5 - pointerY) * 8;

      visual.style.transform =
        `perspective(850px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    });

    card.addEventListener('pointerleave', () => {
      visual.style.transform = '';
    });
  });
}


// Validate the contact form and animate its confirmation message.
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formMessage.textContent =
      'Please add your name, a valid email, and a short message.';
    contactForm.reportValidity();
    return;
  }

  formMessage.textContent =
    'Thanks for your note! This demo form is ready to connect to a service.';

  if (!reduceMotion) {
    formMessage.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 450,
        easing: 'ease-out'
      }
    );
  }

  contactForm.reset();
});


// Keep the footer year current automatically.
document.querySelector('#year').textContent = new Date().getFullYear();