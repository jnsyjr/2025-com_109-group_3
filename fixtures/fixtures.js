function renderCardSections(containerId, cardsData) {
  const container = document.getElementById(containerId);
  const template = document.getElementById("card-template").content;

  for (let i = 0; i < cardsData.length; i += 3) {
    const section = document.createElement("div");
    section.classList.add("card-section");

    const chunk = cardsData.slice(i, i + 3);
    chunk.forEach(card => {
      const cardClone = template.cloneNode(true);
      cardClone.querySelector(".card-title").textContent = card.title;
      cardClone.querySelector(".card-description").textContent = card.description;
      cardClone.querySelector(".date").textContent = card.date;
      const winnerEl = cardClone.querySelector(".card-winner-or-kickoff");
      if (card.winner) {
        winnerEl.textContent = "Winner: " + card.winner;
      } else {
        winnerEl.textContent = "Kickoff: " + card.kickoff;
      }
      cardClone.querySelector(".card-button").href = card.link;
      section.appendChild(cardClone);
    });

    container.appendChild(section);
    console.log(container.innerHTML);
  }
}

$.getJSON('./fixtures.json', function (data) {
  renderCardSections('previous-games', data.previousGames);
  renderCardSections('future-games', data.futureGames);
});
