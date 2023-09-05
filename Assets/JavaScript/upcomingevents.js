let eventList = data.events

function createCard(event1) {
    return ` <div class="card card-me" style="width: 18rem;">
            <img src="${event1.image}" class="card-img-top h-50 card-cover" alt="food_fair">
                <div class="card-body card-body-me">
                    <h5 class="card-title">${event1.name}</h5>
                    <p class="card-text card-text-me">${event1.description}</p>
                    <div class="div-card">
                        <h4>US$ ${event1.price}</h4>
                        <a href="../Pages/details.html" class="btn btn-primary card-bot">Details</a>
                    </div>
                </div>
        </div> `
}

function createCardsList(eventList) {
    let refDate = new Date(data.currentDate)
    let cards = ""
    for (event1 of eventList) {
        if (new Date(event1.date) >= refDate) {
            cards += createCard(event1)
        }
    }
    return cards
}

function printCards(containerCardsUpcomingEvents, cards) {
    let placeCard = document.getElementById(containerCardsUpcomingEvents)
    placeCard.innerHTML = (cards)
}


let cards = createCardsList(eventList)
printCards("containerCardsUpcomingEvents", cards)


