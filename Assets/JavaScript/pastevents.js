let listaEventos = data.events

function crearCard(a) {
    return ` <div class="card card-me" style="width: 18rem;">
            <img src="${a.image}" class="card-img-top h-50 card-cover" alt="food_fair">
                <div class="card-body h-25"> 
                    <h5 class="card-title">${a.name}</h5>
                    <p class="card-text">${a.description}</p>
                    <div class="div-card">
                        <h4>US$ ${a.price}</h4>
                        <a href="./Assets/Pages/details.html" class="btn btn-primary card-bot">Details</a>
                    </div>
                </div>
        </div> `
}

function crearListaCards(a) {
    let fechaReferencia = new Date(data.currentDate)
    let cards = ""
    for (evento of a) {
        if (new Date(evento.date) < fechaReferencia) {
            cards += crearCard(evento)
        }
    }
    return cards

}

function imprimirCards(a, b) {
    let contenedorCards = document.getElementById(a)
    contenedorCards.innerHTML = (b)
}

let cards = crearListaCards(listaEventos)
imprimirCards("contenedorCardsPastEvents", cards)
