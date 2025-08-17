$(document).ready(function () {
  // Load navbar into all pages that have the placeholder
  $("#navbar-placeholder").load("/navbar.html");

  // Anthem Play/Pause toggle
  $("#play-button").on("click", function () {
    const $audio = $("#anthem-audio");
    if ($audio[0].paused) {
      $audio[0].play();
      $(this).text("⏸️ Pause Anthem");
    } else {
      $audio[0].pause();
      $(this).text("▶️ Play Anthem");
    }
  });

  // Optional: Reset button text when audio ends
  $("#anthem-audio").on("ended", function () {
    $("#play-button").text("▶️ Play Anthem");
  });
});

function loadCards(jsonPath, containerSelector, detailSelector) {
  $.getJSON(jsonPath, function (cards) {
    const $container = $(containerSelector);
    $container.empty(); // Clear if reused

    for (let i = 0; i < cards.length; i += 2) {
      const row = $('<section class="card-container"></section>');

      [cards[i], cards[i + 1]].forEach((cardData) => {
        if (cardData) {
          const card = $(`
            <div class="card" data-id="${cardData.id}" style="cursor:pointer;">
              <img src="${cardData.image}" alt="${
            cardData.title
          }" class="card-image" />
              <div class="card-content">
                <h3 class="card-title">${cardData.title}</h3>
                <p class="card-description">${cardData.description}</p>
                <p style="font-weight:bold;">${cardData.price || ""}</p>
              </div>
            </div>
          `);
          row.append(card);
        }
      });

      $container.append(row);
    }

    if (detailSelector) {
      $container.off("click").on("click", ".card", function () {
        const id = $(this).data("id");
        const cardData = cards.find((c) => c.id === id);

        if (cardData) {
          // Determine extra content based on data source
          let extraContent = "";

          if (jsonPath.includes("players.json")) {
            extraContent = `
              <h3 style="margin-top:1.5rem;">Biography</h3>
              <p>${cardData.bio || "Biography not available."}</p>
            `;
          } else if (jsonPath.includes("trophies.json")) {
            extraContent = `
              <h3 style="margin-top:1.5rem;">History</h3>
              <p>${cardData.history || "No historical info provided."}</p>
            `;
          }

          const detailHTML = `
            <div style="padding:2rem; max-width:900px; margin:auto;">
              <img src="${cardData.image}" alt="${cardData.title}" style="width:100%; max-width:900px; border-radius:8px;" />
              <h2 style="margin-top:1rem;">${cardData.title}</h2>
              <p style="margin-top:0.5rem; font-size:1.1rem;">${cardData.description}</p>
              ${extraContent}
              <button id="back-button" style="margin-top:2rem;">← Back to List</button>
            </div>
          `;

          $(detailSelector).html(detailHTML).show();
          $container.hide();
          window.scrollTo(0, 0);
        }
      });

      // Back to cards
      $(document)
        .off("click", "#back-button")
        .on("click", "#back-button", function () {
          $(detailSelector).hide().empty();
          $container.show();
        });
    }
  });
}

$(document).ready(function () {
  $("#navbar-placeholder").load("/navbar/navbar.html");

  if ($("#players-container").length) {
    loadCards("./players.json", "#players-container", "#player-detail");
  }

  if ($("#trophy-container").length) {
    loadCards("./trophies.json", "#trophy-container", "#trophy-detail");
  }
});