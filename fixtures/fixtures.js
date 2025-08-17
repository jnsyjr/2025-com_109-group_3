let gamesData = null;

function getPinnedIds() {
  const v = localStorage.getItem("pinned") ?? getCookie("pinned");
  return v ? v.split(",").filter(Boolean) : [];
}

function setPinnedIds(ids) {
  const v = ids.join(",");
  localStorage.setItem("pinned", v);
  setCookie("pinned", v);
}

function togglePinned(id) {
  const ids = getPinnedIds();
  const i = ids.indexOf(id);
  if (i >= 0) {
    ids.splice(i, 1);
  } else {
    ids.push(id);
  }
  setPinnedIds(ids);
  return ids;
}

function renderAllSections() {
  const pinnedIds = getPinnedIds();
  let pinnedGames = [];
  let previousGames = [];
  let futureGames = [];
  if (gamesData) {
    pinnedGames = [
      ...gamesData.previousGames.filter(g => pinnedIds.includes(g.id)),
      ...gamesData.futureGames.filter(g => pinnedIds.includes(g.id))
    ];
    previousGames = gamesData.previousGames.filter(g => !pinnedIds.includes(g.id));
    futureGames = gamesData.futureGames.filter(g => !pinnedIds.includes(g.id));
  }
  document.getElementById('pinned-games').innerHTML = '';
  document.getElementById('previous-games').innerHTML = '';
  document.getElementById('future-games').innerHTML = '';
  renderCardSections('pinned-games', pinnedGames, pinnedIds);
  renderCardSections('previous-games', previousGames, pinnedIds);
  renderCardSections('future-games', futureGames, pinnedIds);
}

function renderCardSections(containerId, cardsData, pinnedIds) {
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
      winnerEl.textContent = card.winner ? ("Winner: " + card.winner) : ("Kickoff: " + card.kickoff);
      const score = cardClone.querySelector(".score");
      score.textContent = card.winner ? ("Score: " + card.score) : [];
      const btn = cardClone.querySelector(".card-button");
      btn.href = "#";
      btn.setAttribute("data-card-id", card.id);
      btn.textContent = pinnedIds.includes(card.id) ? "Unpin Game" : "Pin Game";
      section.appendChild(cardClone);
    });
    container.appendChild(section);
  }
}

$.getJSON('./fixtures.json', function (data) {
  gamesData = data;
  renderAllSections();
});

document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(event) {
    const btn = event.target.closest('.card-button');
    if (!btn) return;
    event.preventDefault();
    const cardId = btn.getAttribute('data-card-id');
    togglePinned(cardId);
    renderAllSections();
  });
});

function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + (7*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}
