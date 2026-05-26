/* =========================
   NAVBAR EFFECTS
========================= */

const navbar =
  document.querySelector('.navbar');

const sections =
  document.querySelectorAll('section');

const navLinks =
  document.querySelectorAll('.nav-links a');

/* =========================
   SCROLL EFFECT
========================= */

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {

    navbar.classList.add('scrolled');

  }

  else {

    navbar.classList.remove('scrolled');

  }

});

/* =========================
   ACTIVE NAV LINK
========================= */

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.clientHeight;

    if (
      scrollY >= sectionTop &&
      scrollY < sectionTop + sectionHeight
    ) {

      current =
        section.getAttribute('id');

    }

  });

  navLinks.forEach(link => {

    link.classList.remove('active');

    if (
      link.getAttribute('href')
      .includes(current)
    ) {

      link.classList.add('active');

    }

  });

});

/* =========================
   NAV ACTIONS
========================= */

.nav-actions {

  display: flex;

  align-items: center;

  gap: 12px;

}

/* =========================
   AUTH BUTTONS
========================= */

.auth-button {

  border: none;

  padding: 10px 16px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 0.95rem;

  font-weight: 500;

  background:
    var(--card-color);

  color:
    var(--text-color);

  backdrop-filter:
    blur(10px);

  border:
    1px solid var(--border-color);

  box-shadow:
    var(--shadow);

  transition:
    all var(--transition-speed) ease;

}

.auth-button:hover {

  transform:
    scale(1.05);

}