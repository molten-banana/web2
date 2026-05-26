/* =========================
   ADMIN AUTH
========================= */

async function checkAdmin() {

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {

    window.location.href =
      '../index.html';

    return;

  }

  const username =
    user.user_metadata?.user_name;

  if (
    username !==
    'molten-banana'
  ) {

    window.location.href =
      '../index.html';

  }

}

checkAdmin();

/* =========================
   LOAD CONTENT
========================= */

async function loadContent() {

  const {
    data,
    error
  } = await supabaseClient
    .from('site_content')
    .select('*');

  if (error) {

    console.error(error);

    return;

  }

  const contentList =
    document.getElementById(
      'content-list'
    );

  contentList.innerHTML = '';

  data.forEach(item => {

    const wrapper =
      document.createElement('div');

    wrapper.classList.add(
      'content-item'
    );

    wrapper.innerHTML = `
      <label>${item.key}</label>

      <textarea
        id="${item.key}"
      >${item.content}</textarea>

      <button
        class="save-button"
        onclick="saveContent('${item.key}')"
      >
        Save
      </button>
    `;

    contentList.appendChild(
      wrapper
    );

  });

}

/* =========================
   SAVE CONTENT
========================= */

async function saveContent(
  key
) {

  const textarea =
    document.getElementById(
      key
    );

  const content =
    textarea.value;

  const {
    error
  } = await supabaseClient
    .from('site_content')
    .upsert(
      [
        {
          key,
          content
        }
      ],
      {
        onConflict: 'key'
      }
    );

  if (error) {

    console.error(error);

    alert(
      'Save failed'
    );

    return;

  }

  alert(
    'Saved!'
  );

}

/* =========================
   LOGOUT
========================= */

document
  .getElementById(
    'logout-button'
  )
  .addEventListener(
    'click',
    async () => {

      await supabaseClient
        .auth
        .signOut();

      window.location.href =
        '../index.html';

    }
  );

/* =========================
   INITIALIZE
========================= */

loadContent();