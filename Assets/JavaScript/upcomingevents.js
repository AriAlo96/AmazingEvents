let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

import { createCardsList } from "../modules/functions.js"
import { print } from "../modules/functions.js"
import { createCheckbox } from "../modules/functions.js"
import { createListCheckbox } from "../modules/functions.js"
import { createSearch } from "../modules/functions.js"
import { filterCheckbox } from "../modules/functions.js"
import { crossFilter } from "../modules/functions.js"
import { filterUpcomingEvents } from "../modules/functions.js"



filterCheckbox
fetch(URL_API)
    .then(response => response.json())
    .then(object => {
        let eventsList = object.events
        let upcomingEvents = filterUpcomingEvents (eventsList,object)
        createCheckbox(upcomingEvents.category)
        let listCategories = Array.from(new Set(upcomingEvents.map(eventList => eventList.category)))
        let categories = createListCheckbox(listCategories, createCheckbox)
        print("form-check-upcomingevents", categories)
        let formSearch = createSearch()
        print("form-search-upcomingevents", formSearch)
        let containerSearch = document.getElementById("search")
        let listCards = createCardsList(upcomingEvents)
        print("containerCardsUpcomingEvents", listCards)
        let containerCheckbox = document.getElementById("form-check-upcomingevents")
        containerCheckbox.addEventListener("change", () => {
            let returnCrossFilters = crossFilter(upcomingEvents, containerSearch)
            print("containerCardsUpcomingEvents", returnCrossFilters)
        })

        containerSearch.addEventListener("keyup", () => {
            let returnCrossFilters = crossFilter(upcomingEvents, containerSearch)
            print("containerCardsUpcomingEvents", returnCrossFilters)
        }
        )
    })
    .catch(err => err)