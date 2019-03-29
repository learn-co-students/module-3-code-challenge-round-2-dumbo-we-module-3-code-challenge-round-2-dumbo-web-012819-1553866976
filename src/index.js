//------------------   Global Vars  ----------------------
const theatreId = 14;

const uiCards = document.querySelector("#cardDiv")



//------------------ Fetch Functions ---------------------

getMoviesFromApi()

function getMoviesFromApi() {
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(function(response) {return response.json();})
    .then(function(moviesArry) {
      moviesArry.showings.forEach(movie =>{
        createMovieShowCard(movie)

      })
    })
}

function postTicketsToApi(showing_id) {
return  fetch('https://evening-plateau-54365.herokuapp.com/tickets/',{
  'Method':'POST',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Body':JSON.stringify({
    id: showing_id
  })
})
    // .then(function(response) {response.json();})
    .then(console.log)
}



//----------------  DOM Functions ----------------------------
function createMovieShowCard(moive) {

uiCards.innerHTML +=`<div class="card">
                      <div class="content">
                        <div class="header">
                          (${moive.film.title})
                        </div>
                        <div class="meta">
                          (${moive.film.runtime}) minutes
                        </div>
                        <div class="description">
                          <span class="ui label">
                            (${moive.showtime})
                          </span>
                          (${moive.capacity - moive.tickets_sold}) remaining tickets
                        </div>
                      </div>
                      <div class="extra content">
                        <div data-movie-id="${moive.id}" id="button" class="ui blue button">Buy Ticket</div>
                      </div>
                    </div>`

}

//----------------  Event Listeners ----------------------------

uiCards.addEventListener("click",(e) =>{
  if (e.target.id === "button") {
      const showing_id = parseInt(e.target.dataset.movieId)
      postTicketsToApi(showing_id)

  }
})
