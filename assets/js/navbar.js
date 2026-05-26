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
   MOBILE MENU
========================= */

const mobileMenuToggle =
  document.getElementById(
    'mobile-menu-toggle'
  );

const navMenu =
  document.querySelector(
    '.nav-links'
  );

if (
  mobileMenuToggle &&
  navMenu
) {

  mobileMenuToggle.addEventListener(
    'click',
    () => {

      navMenu.classList.toggle(
        'active'
      );

    }
  );

  /* CLOSE ON LINK CLICK */

  document
    .querySelectorAll(
      '.nav-links a'
    )
    .forEach(link => {

      link.addEventListener(
        'click',
        () => {

          navMenu.classList.remove(
            'active'
          );

        }
      );

    });

}