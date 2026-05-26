/* =========================
   ADMIN MODE
========================= */

let editMode = false;

let isAdmin = false;

/* =========================
   ELEMENTS
========================= */

const editableElements =
  document.querySelectorAll('.editable');

const adminToolbar =
  document.getElementById(
    'admin-toolbar'
  );

const editToggle =
  document.getElementById(
    'edit-toggle'
  );

const saveStatus =
  document.getElementById(
    'save-status'
  );

/* =========================
   CHECK ADMIN STATUS
========================= */

async function checkAdminStatus() {

  const {
    data: { user }
  } = await supabaseClient
    .auth
    .getUser();

  if (!user) {

    return;

  }

  const githubUsername =
    user.user_metadata?.user_name;

  if (
    githubUsername ===
    'molten-banana'
  ) {

    isAdmin = true;

    adminToolbar.style.display =
      'flex';

  }

}

checkAdminStatus();

/* =========================
   TOGGLE EDIT MODE
========================= */

editToggle.addEventListener(
  'click',
  () => {

    if (!isAdmin) {

      return;

    }

    editMode = !editMode;

    editableElements.forEach(
      element => {

        element.contentEditable =
          editMode;

        element.classList.toggle(
          'editing',
          editMode
        );

      }
    );

    editToggle.innerText =
      editMode
        ? '💾 Editing Enabled'
        : '✏️ Enable Editing';

  }
);

/* =========================
   SAVE STATUS
========================= */

document.addEventListener(
  'input',
  () => {

    if (!editMode) {

      return;

    }

    saveStatus.innerText =
      'Saving...';

    clearTimeout(
      window.saveTimer
    );

    window.saveTimer =
      setTimeout(() => {

        saveStatus.innerText =
          'Saved ✓';

      }, 600);

  }
);