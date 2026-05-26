/* =========================
   EDIT MODE
========================= */

let editMode = false;

/* =========================
   SELECT EDITABLE ELEMENTS
========================= */

const editableElements =
  document.querySelectorAll('.editable');

/* =========================
   LOAD SAVED CONTENT
========================= */

editableElements.forEach(element => {

  const key =
    element.dataset.key;

  const savedContent =
    localStorage.getItem(key);

  if (savedContent) {

    element.innerHTML =
      savedContent;

  }

});

/* =========================
   CREATE EDIT BUTTON
========================= */

const editButton =
  document.createElement('button');

editButton.innerText = '✏️ Edit';

editButton.classList.add('edit-button');

document.body.appendChild(editButton);

editButton.style.display = 'none';

/* =========================
   TOGGLE EDIT MODE
========================= */

editButton.addEventListener('click', () => {

  editMode = !editMode;

  editableElements.forEach(element => {

    element.contentEditable =
      editMode;

    if (editMode) {

      element.classList.add('editing');

    }

    else {

      element.classList.remove('editing');

    }

  });

  editButton.innerText =
    editMode
      ? '💾 Save Mode'
      : '✏️ Edit';

});

/* =========================
   SAVE CONTENT
========================= */

editableElements.forEach(element => {

  element.addEventListener('input', () => {

    const key =
      element.dataset.key;

    localStorage.setItem(
      key,
      element.innerHTML
    );

  });

});