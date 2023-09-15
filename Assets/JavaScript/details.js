let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

import { createCardDetails } from "../modules/functions.js"

let parametro = location.search
let params = new URLSearchParams(parametro)
let idEvent = params.get("parametro")


fetch(URL_API)
    .then(response => response.json())
    .then(object => {
        let eventsList = object.events
        let eventsFilterID = eventsList.find(object => object._id == idEvent);
        createCardDetails(eventsFilterID)
    })
    .catch(err => console.log(err))

    


