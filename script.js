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
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
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

// Reveal sections and project cards as they enter the screen.
const revealItems = document.querySelectorAll(
  '.hero-copy, .education-card, .skill-group, .project-card, .contact-card'
);

revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  if (item.classList.contains('project-card')) {
    item.style.setProperty('--reveal-delay', `${(index % 2) * 100}ms`);
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
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Check the contact form in the browser and give a clear next step.
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formMessage.textContent = 'Please add your name, a valid email, and a short message.';
    contactForm.reportValidity();
    return;
  }

  formMessage.textContent = 'Thanks for your note! This demo form is ready to connect to a service.';
  contactForm.reset();
});

// Keep the footer year current automatically.
document.querySelector('#year').textContent = new Date().getFullYear();
