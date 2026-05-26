/* =========================
   LOAD CMS CONTENT
========================= */

async function loadContent() {

  const {
    data,
    error
  } = await supabaseClient
    .from('site_content')
    .select('*');

  if (error) {

    console.error(
      'CMS LOAD ERROR:',
      error
    );

    return;

  }

  data.forEach(item => {

    const element =
      document.querySelector(
        `[data-key="${item.key}"]`
      );

    if (element) {

      element.innerHTML =
        item.content;

    }

  });

}

/* =========================
   SAVE CMS CONTENT
========================= */

async function saveContent(
  key,
  content
) {

  const {
    error
  } = await supabaseClient
    .from('site_content')
    .upsert({
      key,
      content
    });

  if (error) {

    console.error(
      'CMS SAVE ERROR:',
      error
    );

  }

}

/* =========================
   AUTO SAVE EDITABLES
========================= */

function setupCmsEditing() {

  const editableElements =
    document.querySelectorAll(
      '.editable'
    );

  editableElements.forEach(
    element => {

      element.addEventListener(
        'input',
        async () => {

          const key =
            element.dataset.key;

          const content =
            element.innerHTML;

          await saveContent(
            key,
            content
          );

        }
      );

    }
  );

}

/* =========================
   INITIALIZE CMS
========================= */

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    await loadContent();

    setupCmsEditing();

  }
);