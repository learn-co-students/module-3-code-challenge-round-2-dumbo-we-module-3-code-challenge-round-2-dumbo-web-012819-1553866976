const theatreId = 12;


divTagForCards = document.querySelector('.ui.cards.showings')

const createHtmlForShowingCards = (showing) => {

  return `<div data-id="${showing.id}" class="card">
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
                  <span class="tickets">
                  ${showing.capacity - showing.tickets_sold}
                  </span> remaining tickets
                </div>
              </div>
              <div class="extra content">
                <div class="ui blue button">Buy Ticket</div>
              </div>
            </div>`
}


fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
.then(res => res.json())
.then(theater => {
  theater.showings.map(showing => {
    divTagForCards.innerHTML += createHtmlForShowingCards(showing)
  })
})


divTagForCards.addEventListener('click', event => {
   if(event.target.className === "ui blue button")
      id = event.target.parentElement.parentElement.dataset.id
      ticket = document.querySelector('.tickets')
      currentTicket = parseInt(document.querySelector('.tickets').innerText)

      createNewTicket(id).then(obj => {
           ticket.innerText = currentTicket
        // debugger
      })
})

const createNewTicket = (id) => {
  return fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
  method: "POST",
  headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
  },
  body: JSON.stringify({
    showing_id: id
    // ticket: currentTicket
    })
  })
  .then(res => res.json())
}
