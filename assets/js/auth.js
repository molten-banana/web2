/* =========================
   SUPABASE CONFIG
========================= */

const SUPABASE_URL =
  'https://clurvhccfgmflpclagac.supabase.co';

const SUPABASE_ANON_KEY =
  'sb_publishable_7RTLhjH7sqvZa5QN7XoTrQ_-IZ_U2Wv';

/* =========================
   INITIALIZE SUPABASE
========================= */

const supabaseClient =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

/* =========================
   ADMIN GITHUB USERNAME
========================= */

const ADMIN_USERNAME =
  'molten-banana';

/* =========================
   BUTTON REFERENCES
========================= */

const loginButton =
  document.getElementById(
    'login-button'
  );

const logoutButton =
  document.getElementById(
    'logout-button'
  );

const adminLink =
  document.getElementById(
    'admin-link'
  );

/* =========================
   LOGIN WITH GITHUB
========================= */

if (loginButton) {

  loginButton.addEventListener(
    'click',
    async () => {

      await supabaseClient.auth
        .signInWithOAuth({

          provider: 'github',

          options: {

            redirectTo:
              window.location.origin +
              '/web2/'

          }

        });

    }
  );

}

/* =========================
   LOGOUT
========================= */

if (logoutButton) {

  logoutButton.addEventListener(
    'click',
    async () => {

      await supabaseClient.auth
        .signOut();

      window.location.reload();

    }
  );

}

/* =========================
   CHECK USER SESSION
========================= */

async function checkUser() {

  const {
    data: { user }
  } =
  await supabaseClient.auth
    .getUser();

  /* =========================
     NO USER
  ========================= */

  if (!user) {

    disableEditing();

    if (loginButton) {

      loginButton.style.display =
        'inline-flex';

    }

    if (logoutButton) {

      logoutButton.style.display =
        'none';

    }

    if (adminLink) {

      adminLink.style.display =
        'none';

    }

    return;

  }

  /* =========================
     VALIDATE ADMIN USER
  ========================= */

  const githubUsername =
    user.user_metadata?.user_name;

  if (
    githubUsername ===
    ADMIN_USERNAME
  ) {

    enableEditing();

    /* =========================
       BUTTON STATES
    ========================= */

    if (loginButton) {

      loginButton.style.display =
        'none';

    }

    if (logoutButton) {

      logoutButton.style.display =
        'inline-flex';

    }

    if (adminLink) {

      adminLink.style.display =
        'inline-flex';

    }

    /* =========================
       CLEAN URL
    ========================= */

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );

    console.log(
      'Admin authenticated'
    );

  }

  else {

    disableEditing();

    if (adminLink) {

      adminLink.style.display =
        'none';

    }

    console.warn(
      'Unauthorized user'
    );

  }

}

/* =========================
   ENABLE EDITING
========================= */

function enableEditing() {

  const editButton =
    document.querySelector(
      '.edit-button'
    );

  if (editButton) {

    editButton.style.display =
      'block';

  }

}

/* =========================
   DISABLE EDITING
========================= */

function disableEditing() {

  const editButton =
    document.querySelector(
      '.edit-button'
    );

  if (editButton) {

    editButton.style.display =
      'none';

  }

  const editableElements =
    document.querySelectorAll(
      '.editable'
    );

  editableElements.forEach(
    element => {

      element.contentEditable =
        false;

      element.classList.remove(
        'editing'
      );

    }
  );

}

/* =========================
   AUTH STATE CHANGES
========================= */

supabaseClient.auth.onAuthStateChange(
  () => {

    checkUser();

  }
);

/* =========================
   INITIAL CHECK
========================= */

checkUser();