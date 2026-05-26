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

/* =========================
   TAB SWITCHING
========================= */

const navItems =
  document.querySelectorAll(
    '.nav-item'
  );

const contentTab =
  document.getElementById(
    'content-tab'
  );

const cardsTab =
  document.getElementById(
    'cards-tab'
  );

const sectionsTab =
  document.getElementById(
    'sections-tab'
  );

const mediaTab =
  document.getElementById(
    'media-tab'
  );

const contentPanel =
  document.getElementById(
    'content-panel'
  );

const cardsPanel =
  document.getElementById(
    'cards-panel'
  );

const sectionsPanel =
  document.getElementById(
    'sections-panel'
  );

const mediaPanel =
  document.getElementById(
    'media-panel'
  );

const mediaGrid =
  document.getElementById(
    'media-grid'
  );

const mediaUpload =
  document.getElementById(
    'media-upload'
  );

/* =========================
   HIDE ALL PANELS
========================= */

function hideAllPanels() {

  contentPanel.style.display =
    'none';

  cardsPanel.style.display =
    'none';

  sectionsPanel.style.display =
    'none';

  mediaPanel.style.display =
    'none';

  navItems.forEach(item => {

    item.classList.remove(
      'active'
    );

  });

}

/* =========================
   CONTENT TAB
========================= */

contentTab.addEventListener(
  'click',
  () => {

    hideAllPanels();

    contentPanel.style.display =
      'block';

    contentTab.classList.add(
      'active'
    );

  }
);

/* =========================
   CARDS TAB
========================= */

cardsTab.addEventListener(
  'click',
  () => {

    hideAllPanels();

    cardsPanel.style.display =
      'block';

    cardsTab.classList.add(
      'active'
    );

  }
);

/* =========================
   SECTIONS TAB
========================= */

sectionsTab.addEventListener(
  'click',
  () => {

    hideAllPanels();

    sectionsPanel.style.display =
      'block';

    sectionsTab.classList.add(
      'active'
    );

  }
);

/* =========================
   MEDIA TAB
========================= */

mediaTab.addEventListener(
  'click',
  () => {

    hideAllPanels();

    mediaPanel.style.display =
      'block';

    mediaTab.classList.add(
      'active'
    );

    loadMedia();

  }
);

/* =========================
   LOAD CARDS
========================= */

async function loadCardsAdmin() {

  const {
    data,
    error
  } = await supabaseClient
    .from('cards')
    .select('*')
    .order(
      'sort_order',
      {
        ascending: true
      }
    );

  if (error) {

    console.error(error);

    return;

  }

  const cardsList =
    document.getElementById(
      'cards-list'
    );

  cardsList.innerHTML = '';

  data.forEach(card => {

    const element =
      document.createElement('div');

    element.classList.add(
      'card-editor'
    );

    element.innerHTML = `
      <input
        type="text"
        id="title-${card.id}"
        value="${card.title}"
        placeholder="Title"
      />

      <textarea
        id="description-${card.id}"
        placeholder="Description"
      >${card.description}</textarea>

      <input
        type="text"
        id="icon-${card.id}"
        value="${card.icon}"
        placeholder="Icon"
      />

      <div class="card-actions">

        <button
          class="save-card"
          onclick="saveCard(${card.id})"
        >
          Save
        </button>

        <button
          class="delete-card"
          onclick="deleteCard(${card.id})"
        >
          Delete
        </button>

        <button
          class="move-card"
          onclick="moveCard(${card.id}, -1)"
        >
          ↑
        </button>

        <button
          class="move-card"
          onclick="moveCard(${card.id}, 1)"
        >
          ↓
        </button>

      </div>
    `;

    cardsList.appendChild(
      element
    );

  });

}

/* =========================
   SAVE CARD
========================= */

async function saveCard(id) {

  const title =
    document.getElementById(
      `title-${id}`
    ).value;

  const description =
    document.getElementById(
      `description-${id}`
    ).value;

  const icon =
    document.getElementById(
      `icon-${id}`
    ).value;

  const {
    error
  } = await supabaseClient
    .from('cards')
    .update({
      title,
      description,
      icon
    })
    .eq('id', id);

  if (error) {

    console.error(error);

    alert('Save failed');

    return;

  }

  alert('Card saved');

}

/* =========================
   DELETE CARD
========================= */

async function deleteCard(id) {

  const confirmed =
    confirm(
      'Delete this card?'
    );

  if (!confirmed) {

    return;

  }

  await supabaseClient
    .from('cards')
    .delete()
    .eq('id', id);

  loadCardsAdmin();

}

/* =========================
   ADD CARD
========================= */

document
  .getElementById(
    'add-card-button'
  )
  .addEventListener(
    'click',
    async () => {

      const {
        data
      } = await supabaseClient
        .from('cards')
        .select('sort_order')
        .order(
          'sort_order',
          {
            ascending: false
          }
        )
        .limit(1);

      const nextOrder =
        data?.[0]?.sort_order + 1 || 1;

      await supabaseClient
        .from('cards')
        .insert([
          {
            title: 'New Card',
            description:
              'Card description',
            icon: '✨',
            sort_order:
              nextOrder
          }
        ]);

      loadCardsAdmin();

    }
  );

/* =========================
   MOVE CARD
========================= */

async function moveCard(
  id,
  direction
) {

  const {
    data
  } = await supabaseClient
    .from('cards')
    .select('*')
    .order(
      'sort_order',
      {
        ascending: true
      }
    );

  const index =
    data.findIndex(
      card => card.id === id
    );

  const target =
    data[index + direction];

  if (!target) {

    return;

  }

  const current =
    data[index];

  await supabaseClient
    .from('cards')
    .update({
      sort_order:
        target.sort_order
    })
    .eq('id', current.id);

  await supabaseClient
    .from('cards')
    .update({
      sort_order:
        current.sort_order
    })
    .eq('id', target.id);

  loadCardsAdmin();

}

loadCardsAdmin();

/* =========================
   LOAD SECTIONS
========================= */

async function loadSectionsAdmin() {

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

    console.error(error);

    return;

  }

  const sectionsList =
    document.getElementById(
      'sections-list'
    );

  sectionsList.innerHTML = '';

  data.forEach(section => {

    const element =
      document.createElement('div');

    element.classList.add(
      'section-editor'
    );

    element.innerHTML = `
      <div class="section-header">

        <div>

          <div class="section-title">
            ${section.key}
          </div>

          <input
            type="text"
            id="section-title-${section.id}"
            value="${section.title}"
          />

        </div>

        <label>

          Enabled

          <input
            type="checkbox"
            class="section-toggle"
            id="section-enabled-${section.id}"
            ${
              section.enabled
                ? 'checked'
                : ''
            }
          />

        </label>

      </div>

      <div class="section-actions">

        <button
          onclick="saveSection(${section.id})"
        >
          Save
        </button>

        <button
          onclick="moveSection(${section.id}, -1)"
        >
          ↑
        </button>

        <button
          onclick="moveSection(${section.id}, 1)"
        >
          ↓
        </button>

      </div>
    `;

    sectionsList.appendChild(
      element
    );

  });

}

/* =========================
   SAVE SECTION
========================= */

async function saveSection(id) {

  const title =
    document.getElementById(
      `section-title-${id}`
    ).value;

  const enabled =
    document.getElementById(
      `section-enabled-${id}`
    ).checked;

  const {
    error
  } = await supabaseClient
    .from('sections')
    .update({
      title,
      enabled
    })
    .eq('id', id);

  if (error) {

    console.error(error);

    alert('Save failed');

    return;

  }

  alert('Section saved');

}

/* =========================
   MOVE SECTION
========================= */

async function moveSection(
  id,
  direction
) {

  const {
    data
  } = await supabaseClient
    .from('sections')
    .select('*')
    .order(
      'sort_order',
      {
        ascending: true
      }
    );

  const index =
    data.findIndex(
      section => section.id === id
    );

  const target =
    data[index + direction];

  if (!target) {

    return;

  }

  const current =
    data[index];

  await supabaseClient
    .from('sections')
    .update({
      sort_order:
        target.sort_order
    })
    .eq('id', current.id);

  await supabaseClient
    .from('sections')
    .update({
      sort_order:
        current.sort_order
    })
    .eq('id', target.id);

  loadSectionsAdmin();

}

loadSectionsAdmin();

/* =========================
   MEDIA MANAGER
========================= */

async function loadMedia() {

  mediaGrid.innerHTML = '';

  const {
    data,
    error
  } = await supabaseClient
    .storage
    .from('media')
    .list('', {
      limit: 100
    });

  if (error) {

    console.error(error);

    return;

  }

  data.forEach(file => {

    const {
      data: publicUrlData
    } =
    supabaseClient
      .storage
      .from('media')
      .getPublicUrl(file.name);

    const imageUrl =
      publicUrlData.publicUrl;

    const item =
      document.createElement('div');

    item.className =
      'media-item';

    item.innerHTML = `

      <img src="${imageUrl}" />

      <div class="media-actions">

        <button
          onclick="copyMediaUrl('${imageUrl}')"
        >
          Copy URL
        </button>

        <button
          onclick="deleteMedia('${file.name}')"
        >
          Delete
        </button>

      </div>

    `;

    mediaGrid.appendChild(item);

  });

}

/* =========================
   UPLOAD
========================= */

mediaUpload.addEventListener(
  'change',
  async event => {

    const file =
      event.target.files[0];

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name}`;

    const {
      error
    } =
    await supabaseClient
      .storage
      .from('media')
      .upload(
        fileName,
        file
      );

    if (error) {

      console.error(error);

      alert(
        'Upload failed.'
      );

      return;

    }

    loadMedia();

  }
);

/* =========================
   COPY URL
========================= */

function copyMediaUrl(url) {

  navigator.clipboard.writeText(
    url
  );

  alert('URL copied.');

}

/* =========================
   DELETE
========================= */

async function deleteMedia(fileName) {

  const confirmed =
    confirm(
      'Delete this image?'
    );

  if (!confirmed) return;

  const {
    error
  } =
  await supabaseClient
    .storage
    .from('media')
    .remove([fileName]);

  if (error) {

    console.error(error);

    return;

  }

  loadMedia();

}