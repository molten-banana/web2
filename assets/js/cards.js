/* =========================
   LOAD CARDS
========================= */

async function loadCards() {

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

    console.error(
      'CARDS ERROR:',
      error
    );

    return;

  }

  const container =
    document.getElementById(
      'cards-container'
    );

  if (!container) {

    return;

  }

  container.innerHTML = '';

  data.forEach(card => {

    const element =
      document.createElement('div');

    element.classList.add(
      'card'
    );

    element.innerHTML = `
      <div class="card-icon">
        ${card.icon}
      </div>

      <h3>
        ${card.title}
      </h3>

      <p>
        ${card.description}
      </p>
    `;

    container.appendChild(
      element
    );

  });

}

/* =========================
   INITIALIZE
========================= */

loadCards();