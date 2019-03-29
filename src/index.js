// VARIABLES:
const theatreId = 11;
const theatresUrl = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;
const ticketUrl = "https://evening-plateau-54365.herokuapp.com/tickets"
const showingsDiv = document.querySelector('.showings')
//-----

// FUNCTIONS:
function createShowingCard(showing) {
  return `
    <div class="card" data-showing-id="${showing.id}">
      <div class="content">
        <div class="header">
          ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime} minutes
        </div>
        <div class="description">
          <span class="ui label">
            ${showing.showtime}
          </span>
          <span class="tickets-remaining">
          ${showing.capacity - showing.tickets_sold} remaining tickets
          </span>
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
      </div>
    </div>
  `
};

function purchaseTicket(id) {
  const fetchObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      showing_id: id
    })
  };
  return fetch(ticketUrl, fetchObj)
  .then(resp => resp.json())
};

function updateRemainingTickets(ticket) {
  let showingId = ticket.showing_id
  let currentShowing = document.querySelector(`[data-showing-id="${showingId}"]`)
  let ticketsOnDom = currentShowing.querySelector('.tickets-remaining')
  let decreasedTickets = parseInt(ticketsOnDom.innerText) - 1
  ticketsOnDom.innerText = `${decreasedTickets} remaining tickets`
};
//-----

// EVENT LISTENERS:
showingsDiv.addEventListener('click', e => {
  const blueButton = e.target
  if (blueButton.className === "ui blue button") {
    const showingCard = blueButton.parentElement.parentElement
    const ticketsLeft = parseInt(showingCard.querySelector('.tickets-remaining').innerText)
    const ticketId = showingCard.dataset.showingId

    if (ticketsLeft > 0) {
      purchaseTicket(ticketId)
      .then(ticket => {
        if (!!ticket) {
          updateRemainingTickets(ticket)
        }
      })
    } else {
      blueButton.innerText = "SOLD OUT"
      blueButton.className = "SOLD OUT"
      alert('no tickets left')
    }
  }
});
//-----

// GETs theatres:
fetch(theatresUrl)
.then(resp => resp.json())
.then(theatre => {
  theatre.showings.forEach(showing => {
    showingsDiv.innerHTML += createShowingCard(showing)
  })
});
//
