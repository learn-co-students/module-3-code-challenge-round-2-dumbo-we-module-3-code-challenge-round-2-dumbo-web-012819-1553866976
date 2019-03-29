const theatreId = 15;


const divUiCard = document.querySelector('#showingss');
console.log(divUiCard)

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${15}`)
.then(resp => resp.json())
.then(theatreObj => (theatreObj.showings.forEach(movie => {
    divUiCard.innerHTML += moviesCard(movie)
})))


const moviesCard = (movie) => {
    return `<div class="card" data-id=${movie.id}>
  <div class="content">
    <div class="header">
      ${movie.film.title}
    </div>
    <div class="meta">
      ${movie.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${movie.showtime}
      </span id="span-tickets">
      ${movie.capacity - movie.tickets_sold} remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button" data-id=${movie.id}>Buy Ticket</div>
  </div>
</div>`
}

const buyTicketfetch = (id) => {
    return fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: id
        })
    }).then(resp => resp.json())
}

divUiCard.addEventListener('click', (event) => {
    //debugger
    const movieId = event.target.dataset.id;
    if (event.target.textContent === "Buy Ticket") {
        
        buyTicketfetch(movieId).then(movieObj => {
            debugger
            movieObj
        })
    }
})
