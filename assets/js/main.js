/* =========================
   THEME TOGGLE
========================= */

const toggleButton =
  document.getElementById('theme-toggle');

const body = document.body;

const navbar =
  document.querySelector('.navbar');

const sections =
  document.querySelectorAll('section');

const navLinks =
  document.querySelectorAll('.nav-links a');

/* =========================
   LOAD SAVED THEME
========================= */

const savedTheme =
  localStorage.getItem('theme');

if (savedTheme === 'dark') {

  body.classList.add('dark-mode');

  toggleButton.textContent = '☀️';

}

/* =========================
   DARK / LIGHT TOGGLE
========================= */

toggleButton.addEventListener('click', () => {

  body.classList.toggle('dark-mode');

  const isDark =
    body.classList.contains('dark-mode');

  toggleButton.textContent =
    isDark ? '☀️' : '🌙';

  localStorage.setItem(
    'theme',
    isDark ? 'dark' : 'light'
  );

});

/* =========================
   STICKY NAVBAR EFFECT
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
   SCROLL REVEAL ANIMATION
========================= */

const observer =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('show');

      }

    });

  }, {
    threshold: 0.2
  });

sections.forEach(section => {

  observer.observe(section);

});

/* =========================
   PARTICLE BACKGROUND
========================= */

function clamp(value, min, max) {

  return value >= min
    ? (value <= max ? value : max)
    : min;

}

function Dust(
  startx,
  starty,
  offset = 0,
  baseColor = 1,
  duration = 100,
  size = 20
) {

  this.x = startx;
  this.y = starty;

  this.duration = duration;
  this.offset = offset;
  this.size = size;

  this.timer = offset % duration;

  this.baseColor = baseColor;

  this.draw = function(canvas) {

    if (this.timer > this.duration) {

      this.timer = 0;

    }

    this.timer += 1;

    const framesize = this.size;

    const positionMultiplier =
      this.timer * (this.offset % 2);

    const xPosition =
      this.x + positionMultiplier;

    const yPosition =
      this.y + positionMultiplier;

    const colorOpacity =
      clamp(
        (this.timer + 50) % this.duration,
        0,
        this.baseColor
      );

    canvas.beginPath();

    canvas.arc(
      xPosition,
      yPosition,
      framesize,
      0,
      Math.PI * 2,
      false
    );

    canvas.fillStyle =
      "rgba(255,255,255," +
      colorOpacity +
      ")";

    canvas.fill();

  };

}

/* =========================
   RENDER LOOP
========================= */

function renderFrame(
  canvas,
  canvasElement,
  dustArray
) {

  canvas.clearRect(
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  dustArray.forEach(dust => {

    dust.draw(canvas);

  });

  requestAnimationFrame(() => {

    renderFrame(
      canvas,
      canvasElement,
      dustArray
    );

  });

}

/* =========================
   INITIALIZE CANVAS
========================= */

const canvasElements =
  document.querySelectorAll('canvas');

canvasElements.forEach(canvasElement => {

  const canvas =
    canvasElement.getContext('2d');

  const quantity =
    canvasElement.getAttribute('data-dust');

  const ballsize =
    canvasElement.getAttribute('data-size');

  const ballopacity =
    canvasElement.getAttribute('data-opacity');

  const dustArray = [];

  for (let i = 0; i < quantity; i++) {

    const positionX =
      window.innerWidth *
      Math.random() *
      1.5 -
      window.innerWidth / 4;

    const positionY =
      window.innerHeight *
      Math.random() *
      1.5 -
      window.innerHeight / 4;

    const duration =
      Math.random() * 500 + 1000;

    const size =
      Math.random() * ballsize;

    const offset =
      Math.random() * 100;

    const baseColor =
      clamp(
        (Math.random() * ballopacity) / 100,
        0,
        0.3
      );

    dustArray.push(
      new Dust(
        positionX,
        positionY,
        offset,
        baseColor,
        duration,
        size
      )
    );

  }

  canvasElement.width =
    window.innerWidth;

  canvasElement.height =
    window.innerHeight;

  renderFrame(
    canvas,
    canvasElement,
    dustArray
  );

});

/* =========================
   RESIZE FIX
========================= */

window.addEventListener('resize', () => {

  canvasElements.forEach(canvas => {

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

  });

});