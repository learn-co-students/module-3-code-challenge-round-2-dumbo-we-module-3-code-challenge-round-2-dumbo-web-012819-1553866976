document.addEventListener('DOMContentLoaded', () => {

    const theatreId = null;
    const divTag = document.querySelector('.showings');

    //========================================= EVENT LISTENER ===============================================//
    divTag.addEventListener('click', event =>{
        if (event.target.textContent === "Buy Ticket"){
            console.log(event.target);
            buyTicket(event)
        }
    });
    //running out of time... so at this point once we click on "buy ticket" we would go to the buy ticket
    // function and pass in the event.
    //  we would need to create a constant that will get the ticket_capacity... we would need to
    // GRAB that number using an event listener.. const ticket_capacity = document.querySelector('ticket_capacity')
    // ... since we already subtracted the capacity minus tickets sold when we
    // set up each card. We would need to step down 1 to show the number of tickets remaining.
    // push that to the DOM and run the createNewTicketFetch that I didnt get a chance to implement
    // yet.
// ============================================= FETCH REQUESTS  ====================================================//
    const getShowingsFromServer = () => {
        fetch('https://evening-plateau-54365.herokuapp.com/theatres/13')
            .then(response => response.json())
            .then(showings => makeShowCard(showings))
    };

    const createNewTicket = (id) => {
        fetch (`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                showing_id: id
            })
        })
    };

// ========================================= GET LIST OF SHOWINGS FROM THE SERVER ===================================//
// have to actually call the function since made with arrow
    getShowingsFromServer();
// ========================================== BUY TICKET  ==================================================//
    const buyTicket = (event) => {
        const showingsId = event.target.dataset.id
        createNewTicket(showingsId)
    };
// ========================================= MAKE A SHOW CARD FOR EACH SHOW ==========================================//
    const makeShowCard = (theater) => {
        debugger;
        theater.showings.forEach(show => {
            divTag.innerHTML += formatShowCard(show);
        })
    };

// ========================================== FORMAT EACH SHOW CARD ==================================================//
    const formatShowCard = (showings) => {
        return (
            `<div class="card">
          <div class="content">
            <div class="header">
              ${showings.film.title}
            </div>
            <div class="meta">
            ${showings.film.runtime}
            </div>
            <div class="description">
              <span class="ui label">
               ${showings.showtime}
              </span>
              ${showings.capacity - showings.tickets_sold} remaining tickets
            </div>
          </div>
          <div class="extra content">
            <div class="ui blue button">Buy Ticket</div>
          </div>
        </div>
        `
        )
    }
});


