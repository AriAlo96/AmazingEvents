let eventList = data.events

function createCard(e) {
    return ` <div class="card card-me" style="width: 18rem;">
            <img src="${e.image}" class="card-img-top h-50 card-cover" alt="food_fair">
                <div class="card-body card-body-me">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text card-text-me">${e.description}</p>
                    <div class="div-card">
                        <ha4>US$ ${e.price}</ha4>
                        <a href="../Assets/Pages/details.html?parametro=${e._id}" class="btn btn-primary card-bot">Details</a>
                    </div>
                </div>
        </div> `
}

function createCardsList(eventList) {
    let cards = ""
    for (event1 of eventList) {
        cards += createCard(event1)
    }
    return cards
}

let cards = createCardsList(eventList)

function print(container, element) {
    let placeCard = document.getElementById(container)
    placeCard.innerHTML = (element)
    if (element.length === 0) {
        return print("containerCards", `No results. Write another name`);
    }
}

print("containerCards", cards)

function createCheckbox(category) {
    return ` <div id= div-form-checkbox class="form-check form-check-inline">
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
print("form-check-index", categories)

function createSearch() {
    return `<input id="search" class="form-control form-search" type="text" placeholder="Search...">`
}


let formSearch = createSearch()
print("form-search-index", formSearch)


//Escuchador Checkboxs
let containerCheckbox = document.getElementById("form-check-index")
containerCheckbox.addEventListener("change", () => {
    let returnCrossFilters = crossFilter(eventList, containerSearch)
    print("containerCards", returnCrossFilters)
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
    let returnCrossFilters = crossFilter(eventList, containerSearch)
    print("containerCards", returnCrossFilters)
}
)

//Filtro Search
function filterSearch(array, input) {
    let objectArrayFilter = array.filter(object => object.name.toLowerCase().includes(input.value.toLowerCase()));
    return objectArrayFilter
}


//Filtro Cruzado
function crossFilter(array, input) {
    let arrayFilterCheckbox = filterCheckbox(array)
    let arrayFilterSearch = filterSearch(arrayFilterCheckbox, input)
    return createCardsList(arrayFilterSearch)
}