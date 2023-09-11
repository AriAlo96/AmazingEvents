let parametro = location.search;

let params = new URLSearchParams(parametro)

let idEvent = params.get("parametro");

let events = data.events.find($event => $event._id === idEvent);

let containerCardDetails = document.getElementById("containerCardDetails");


function createCardDetails(e) {
    if (e.assistance == null){
    containerCardDetails.innerHTML += `
    <img src="${e.image}" class="card-img-me">
        <div class="items-card-details">
                <h3 class="card-title">${e.name}</h3>
                <h5 class="card-text">${e.description}</h5>
                <h6>Category: ${e.category}</h6>
                <p>Date: ${e.date}</p>
                <p>Place: ${e.place}</p>
                <p>Capacity: ${e.capacity}</p>
                <p>Estimate: ${e.estimate} <p>
                <h4>US$ ${e.price}</h4>
        </div>
    `  
} 

if (e.estimate == null){
    containerCardDetails.innerHTML += `
    <img src="${e.image}" class="card-img-me">
        <div class="items-card-details">
                <h3 class="card-title">${e.name}</h3>
                <h5 class="card-text">${e.description}</h5>
                <h6>Category: ${e.category}</h6>
                <p>Date: ${e.date}</p>
                <p>Place: ${e.place}</p>
                <p>Capacity: ${e.capacity}</p>
                <p>Assistance: ${e.assistance}</p>
                <h4>US$ ${e.price}</h4>
        </div>
    `  
} 
}

createCardDetails(events)