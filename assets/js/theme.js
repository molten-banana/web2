/* =========================
   THEME TOGGLE
========================= */

const toggleButton =
  document.getElementById('theme-toggle');

const body = document.body;

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
   TOGGLE THEME
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