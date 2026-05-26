/* =========================
   EDIT MODE
========================= */

let editMode = false;

let isAdmin = false;

/* =========================
   SELECT EDITABLE ELEMENTS
========================= */

const editableElements =
  document.querySelectorAll('.editable');

/* =========================
   CREATE EDIT BUTTON
========================= */

const editButton =
  document.createElement('button');

editButton.innerText = '✏️ Edit';

editButton.classList.add('edit-button');

document.body.appendChild(editButton);

/* Hide by default */

editButton.style.display = 'none';

/* =========================
   CHECK USER SESSION
========================= */

async function checkAdminStatus() {

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  /* Not logged in */

  if (!user) {

    return;

  }

  /* GitHub username */

  const githubUsername =
    user.user_metadata?.user_name;

  /* ONLY ALLOW YOUR ACCOUNT */

  if (
    githubUsername ===
    'molten-banana'
  ) {

    isAdmin = true;

    editButton.style.display =
      'block';

  }

}

checkAdminStatus();

/* =========================
   TOGGLE EDIT MODE
========================= */

editButton.addEventListener(
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

        if (editMode) {

          element.classList.add(
            'editing'
          );

        }

        else {

          element.classList.remove(
            'editing'
          );

        }

      }
    );

    editButton.innerText =
      editMode
        ? '💾 Save Mode'
        : '✏️ Edit';

  }
);