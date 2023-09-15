let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

import { createCardsList } from "../modules/functions.js"
import { print } from "../modules/functions.js"
import { createCheckbox } from "../modules/functions.js"
import { createListCheckbox } from "../modules/functions.js"
import { createSearch } from "../modules/functions.js"
import { filterCheckbox } from "../modules/functions.js"
import { crossFilter } from "../modules/functions.js"



fetch(URL_API)
    .then(response => response.json())
    .then((object) => {
       
        let eventsList = object.events
        createCheckbox(eventsList.category)
        let listCategories = Array.from(new Set(eventsList.map(eventList => eventList.category)))
        let categories = createListCheckbox(listCategories, createCheckbox)
        print("form-check-index", categories)
        let formSearch = createSearch()
        print("form-search-index", formSearch)
        let containerSearch = document.getElementById("search")
        let listCards = createCardsList(eventsList)
        print("containerCards", listCards)
        let containerCheckbox = document.getElementById("form-check-index")
        containerCheckbox.addEventListener("change", () => {
            let returnCrossFilters = crossFilter(eventsList, containerSearch)
            print("containerCards", returnCrossFilters)
        })

        containerSearch.addEventListener("keyup", () => {
            let returnCrossFilters = crossFilter(eventsList, containerSearch)
            print("containerCards", returnCrossFilters)
        }
        )
    })
    .catch(err => err)


