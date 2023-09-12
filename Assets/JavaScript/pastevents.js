let eventList = data.events

function createCard(e) {
    return ` <div class="card card-me" style="width: 18rem;">
            <img src="${e.image}" class="card-img-top h-50 card-cover" alt="food_fair">
                <div class="card-body card-body-me">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text card-text-me">${e.description}</p>
                    <div class="div-card">
                        <h4>US$ ${e.price}</h4>
                        <a href="../Pages/details.html?parametro=${e._id}" class="btn btn-primary card-bot">Details</a>
                    </div>
                </div>
        </div> `
}

function filterPastEvents(eventList) {
    let cards = eventList.filter(eventFilt => new Date(eventFilt.date) < new Date(data.currentDate))
    return cards
}
let pastEventsFilter = filterPastEvents(eventList)

function createListPastEvents(pastEventsFilter) {
    let template = ""
    for (let cardsPrint of pastEventsFilter) {
        template += createCard(cardsPrint)
    }
    return template
}

let pastEventsTemplate = createListPastEvents(pastEventsFilter)


function print(container, element) {
    let placeCard = document.getElementById(container)
    placeCard.innerHTML = (element)
    if (element.length === 0) {
        return print("containerCardsPastEvents", `No results. Write another name`);
    }
}

print("containerCardsPastEvents", pastEventsTemplate)

function createCheckbox(category) {
    return ` <div div-form-checkbox class="form-check form-check-inline">
                <input class="form-check-input check-me" type="checkbox" id="" value="${category}">
                <label class="form-check-label" for="">${category}</label>
            </div> `
}

let listCategories = Array.from(new Set(eventList.map(d => d.category)))

function createListCheckbox(listCategories) {
    let checkbox = ""
    for (let auxCheckbox of listCategories) {
        checkbox += createCheckbox(auxCheckbox)
    }
    return checkbox
}

let categories = createListCheckbox(listCategories)
print("form-check-pastevents", categories)

function createSerch() {
    return `<input id="search" class="form-control form-search" type="text" placeholder="Search...">`
}

let formSearch = createSerch()
print("form-search-pastevents", formSearch)


//Escuchador Checkboxs
let containerCheckbox = document.getElementById("form-check-pastevents")
containerCheckbox.addEventListener("change", () => {
    let returnCrossFilters = crossFilter(pastEventsFilter, containerSearch)
    print("containerCardsPastEvents", returnCrossFilters)
}
)


//Filtro Checkbox
function filterCheckbox(array) {
    let nodeListCheckbox = document.querySelectorAll(`input[type=checkbox]:checked`)
    let arrayCheckbox = Array.from(nodeListCheckbox).map(input => (input.value))
    if (arrayCheckbox.length === 0) {
        return array;
    }
    let objectFilterCheckbox = array.filter(object => arrayCheckbox.includes(object.category))

    return objectFilterCheckbox
}

//Escuchador Search
let containerSearch = document.getElementById("search")
containerSearch.addEventListener("keyup", () => {
    let returnCrossFilters = crossFilter(pastEventsFilter, containerSearch)
    print("containerCardsPastEvents", returnCrossFilters)
}
)

//Filtro Search
function filterSearch(array, input) {
let objectArrayFilter = array.filter(object => object.name.toLowerCase().includes(input.value.toLowerCase()));
    return objectArrayFilter
}



 //Filtro Cruzado
 function crossFilter (array, input){
let arrayFilterCheckbox =  filterCheckbox (array)
let arrayFilterSearch = filterSearch (arrayFilterCheckbox,input)
    return createListPastEvents (arrayFilterSearch)
}