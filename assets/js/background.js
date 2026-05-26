/* =========================
   UTILITIES
========================= */

function clamp(value, min, max) {

  return value >= min
    ? (value <= max ? value : max)
    : min;

}

/* =========================
   DUST PARTICLE
========================= */

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
   INITIALIZE
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