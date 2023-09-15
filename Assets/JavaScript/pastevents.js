let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

import { createCardsList } from "../modules/functions.js"
import { print } from "../modules/functions.js"
import { createCheckbox } from "../modules/functions.js"
import { createListCheckbox } from "../modules/functions.js"
import { createSearch } from "../modules/functions.js"
import { filterCheckbox } from "../modules/functions.js"
import { crossFilter } from "../modules/functions.js"
import { filterPastEvents } from "../modules/functions.js"



filterCheckbox
fetch(URL_API)
    .then(response => response.json())
    .then(object => {
        let eventsList = object.events
        let pastEvents = filterPastEvents (eventsList,object)
        createCheckbox(pastEvents.category)
        let listCategories = Array.from(new Set(pastEvents.map(eventList => eventList.category)))
        let categories = createListCheckbox(listCategories, createCheckbox)
        print("form-check-pastevents", categories)
        let formSearch = createSearch()
        print("form-search-pastevents", formSearch)
        let containerSearch = document.getElementById("search")
        let listCards = createCardsList(pastEvents)
        console.log(pastEvents);
        print("containerCardsPastEvents", listCards)
        let containerCheckbox = document.getElementById("form-check-pastevents")
        containerCheckbox.addEventListener("change", () => {
            let returnCrossFilters = crossFilter(pastEvents, containerSearch)
            print("containerCardsPastEvents", returnCrossFilters)
        })

        containerSearch.addEventListener("keyup", () => {
            let returnCrossFilters = crossFilter(pastEvents, containerSearch)
            print("containerCardsPastEvents", returnCrossFilters)
        }
        )
    })
    .catch(err => err)
    