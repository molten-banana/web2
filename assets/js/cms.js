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
    data,
    error
  } = await supabaseClient
    .from('site_content')
    .upsert(
      [
        {
          key: key,
          content: content
        }
      ],
      {
        onConflict: 'key'
      }
    );

  if (error) {

    console.error(
      'CMS SAVE ERROR:',
      error
    );

  }

  else {

    console.log(
      'CMS SAVED:',
      key
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