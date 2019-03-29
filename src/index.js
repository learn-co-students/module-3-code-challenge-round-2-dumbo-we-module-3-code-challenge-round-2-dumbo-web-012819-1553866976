// VARIABLES:
const theatreId = 11;
const theatresUrl = "https://evening-plateau-54365.herokuapp.com/theatres/11";
const ticketUrl = "https://evening-plateau-54365.herokuapp.com/tickets"
const showingsDiv = document.querySelector('.showings')
//-----

// FUNCTIONS:
function createShowingCard(showing) {
  // debugger
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
//-----

// EVENT LISTENERS:
showingsDiv.addEventListener('click', e => {
  const blueButton = e.target
  if (blueButton.className === "ui blue button") {
    const ticketId = blueButton.parentElement.parentElement.dataset.showingId
    purchaseTicket(ticketId)
    .then(ticket => {
      if (!!ticket) {
        let showingId = ticket.showing_id
        let currentShowing = document.querySelector(`[data-showing-id="${showingId}"]`)
        let ticketsOnDom = currentShowing.querySelector('.tickets-remaining')
        let currentTickets = parseInt(ticketsOnDom.innerText) - 1
        ticketsOnDom.innerText = `${currentTickets} remaining tickets`
      }
    })
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
