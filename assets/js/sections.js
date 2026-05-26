/* =========================
   LOAD SECTIONS
========================= */

async function loadSections() {

  const {
    data,
    error
  } = await supabaseClient
    .from('sections')
    .select('*')
    .order(
      'sort_order',
      {
        ascending: true
      }
    );

  if (error) {

    console.error(
      'SECTIONS ERROR:',
      error
    );

    return;

  }

  const main =
    document.querySelector(
      '.main-content'
    );

  data.forEach(section => {

    const element =
      document.querySelector(
        `[data-section="${section.key}"]`
      );

    if (!element) {

      return;

    }

    /* SHOW / HIDE */

    element.style.display =
      section.enabled
        ? ''
        : 'none';

    /* REORDER */

    main.appendChild(
      element
    );

  });

}

/* =========================
   INITIALIZE
========================= */

loadSections();