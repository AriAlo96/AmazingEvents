//Función para crear el contenido de la card
export function createCard(event) {
    let href = window.location.href
    let route = href.includes("index.html") ? `./assets/pages/details.html?parametro=${event._id}` : `./details.html?parametro=${event._id}`
    return ` <div class="card card-me" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top h-50 card-cover" alt="food_fair">
                <div class="card-body card-body-me">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text card-text-me">${event.description}</p>
                    <div class="div-card">
                        <h4>US$ ${event.price}</h4>
                        <a href="${route}" class="btn btn-primary card-bot">Details</a>
                    </div>
                </div>
        </div> `
}


//Función para generar todas las cards dinámicamente
export function createCardsList(eventList) {
    let cards = ""
    for (let eventAux of eventList) {
        cards += createCard(eventAux)
    }
    return cards
}

//Función para imprimir
export function print(container, element) {
    let placeCard = document.getElementById(container)
    placeCard.innerHTML = (element)
    if (element.length === 0) {
        return print(container, `No results. Write another name`)
    }
}

//Función para crear el contenido de los checkbox
export function createCheckbox(category) {
    return ` <div id= div-form-checkbox class="form-check form-check-inline">
                <input class="form-check-input check-me" type="checkbox" id="" value="${category}">
                <label class="form-check-label" for="">${category}</label>
            </div> `
}

//Función para generar la lista de checkbox dinámicamente
export function createListCheckbox(listCategories, createCheckbox) {
    let checkbox = ""
    for (let auxCheckbox of listCategories) {
        checkbox += createCheckbox(auxCheckbox)
    }
    return checkbox
}

//Función para crear el input Search
export function createSearch() {
    return `<input id="search" class="form-control form-search" type="text" placeholder="Search...">`
}

//Función para filtrar por categoría (checkbox)
export function filterCheckbox(array) {
    let nodeListCheckbox = document.querySelectorAll(`input[type=checkbox]:checked`)
    let arrayCheckbox = Array.from(nodeListCheckbox).map(input => (input.value))
    let objectFilterCheckbox = array.filter(object => arrayCheckbox.includes(object.category))
    if (arrayCheckbox.length === 0) {
        return array;
    }
    return objectFilterCheckbox
}



//Función para filtrar por nombre (search)
export function filterSearch(array, input) {
    let objectArrayFilter = array.filter(object => object.name.toLowerCase().includes(input.value.toLowerCase()));
    return objectArrayFilter
}


//Función de filtro cruzado
export function crossFilter(array, input) {
    let arrayFilterCheckbox = filterCheckbox(array)
    let arrayFilterSearch = filterSearch(arrayFilterCheckbox, input)
    return createCardsList(arrayFilterSearch)
}

//Función para filtrar los eventos pasados
export function filterPastEvents(eventsList, object) {
    let cards = eventsList.filter(event => new Date(event.date) < new Date(object.currentDate))
    return cards
}


//Función para filtrar los eventos futuros
export function filterUpcomingEvents(eventsList, object) {
    let cards = eventsList.filter(eventFilt => new Date(eventFilt.date) >= new Date(object.currentDate))
    return cards
}

//Funcion para crear Card Detalles
export function createCardDetails(event) {
    let containerCardDetails = document.getElementById("containerCardDetails")
    if (event.assistance == null) {
        containerCardDetails.innerHTML += `
    <img src="${event.image}" class="card-img-me">
        <div class="items-card-details">
                <h3 class="card-title">${event.name}</h3>
                <h5 class="card-text">${event.description}</h5>
                <h6>Category: ${event.category}</h6>
                <p>Date: ${event.date}</p>
                <p>Place: ${event.place}</p>
                <p>Capacity: ${event.capacity}</p>
                <p>Estimate: ${event.estimate} <p>
                <h4>US$ ${event.price}</h4>
        </div>
    `
    }
    if (event.estimate == null) {
        containerCardDetails.innerHTML += `
    <img src="${event.image}" class="card-img-me">
        <div class="items-card-details">
                <h3 class="card-title">${event.name}</h3>
                <h5 class="card-text">${event.description}</h5>
                <h6>Category: ${event.category}</h6>
                <p>Date: ${event.date}</p>
                <p>Place: ${event.place}</p>
                <p>Capacity: ${event.capacity}</p>
                <p>Assistance: ${event.assistance}</p>
                <h4>US$ ${event.price}</h4>
        </div>
    `
    }
}

// Funcion para obtener el  mayor porcentaje de asistencia
export function percentageAssistanceMax(pastEvents) {
    let maxAssistance = 0
    for (let event of pastEvents) {
        let assistance = (event.assistance * 100 / event.capacity).toFixed(1)
        maxAssistance = Math.max(maxAssistance, assistance);
    }
    return maxAssistance
}

// Funcion para obtener el nombre del evento con mayor porcentaje de asistencia
export function nameMaxAssistance(pastEvents, eventMaxPercentageAssistance) {
    for (let event of pastEvents) {
        let assistance = (event.assistance * 100 / event.capacity).toFixed(1)
        if (assistance == eventMaxPercentageAssistance) {
            return event.name
        }
    }
}

// Funcion para obtener el  menor porcentaje de asistencia
export function percentageAssistanceMin(pastEvents) {
    let minAssistance = Infinity
    for (let event of pastEvents) {
        let assistance = (event.assistance * 100 / event.capacity).toFixed(1)
        minAssistance = Math.min(minAssistance, assistance);
    }
    return minAssistance
}

// Funcion para obtener el nombre del evento con menor porcentaje de asistencia
export function nameMinAssistance(pastEvents, eventMinPercentageAssistance) {
    for (let event of pastEvents) {
        let assistance = (event.assistance * 100 / event.capacity).toFixed(1)
        if (assistance == eventMinPercentageAssistance) {
            return event.name
        }
    }
}

//Funcion para obtener el evento con mayor capacidad
export function largerCapacity(eventsList) {
    let largerCapacity = 0
    for (let event of eventsList) {
        let capacity = event.capacity
        largerCapacity = Math.max(largerCapacity, capacity);

    }
    return largerCapacity
}

// Funcion para obtener el nombre del evento mayor capacidad
export function nameLargerCapacitiy(eventList, eventLargerCapacity) {
    for (let event of eventList) {
        let capacity = event.capacity
        if (capacity == eventLargerCapacity) {
            return event.name
        }
    }
}


//Funcion para imprimir tabla 1
export function printTable1(bodyTable1, nameMaxAssistance, maxAssistance, nameMinAssistance, minAssistance, eventNameLargerCapacity, eventLargerCapacity) {
    return bodyTable1.innerHTML =
        `<td class="td">${nameMaxAssistance} ${maxAssistance} %</td>
         <td class="td">${nameMinAssistance} ${minAssistance} %</td>
         <td class="td">${eventNameLargerCapacity} ${eventLargerCapacity}</td>`

}

//Funcion para obtener categorias
export function categoriesTable(events) {
    return Array.from(new Set(events.map(event => event.category)))
}

//Funcion para obtener el ingreso por categoria
export function revenueCategory(events) {
    return events.reduce((acc, event) => {
        let category = event.category;
        let revenue = (event.price) * (event.estimate||event.assistance);
        acc[category] = (acc[category] ? acc[category] + revenue : revenue);
        return acc;
    }, {});
}

// Función para obtener el promedio del porcentaje de asistencia por categoría
export function percentageAssistanceByCategory(events) {
    let additionPercentajes = {};
    let additionEvents = {};
    for (let event of events) {
        let category = event.category;
        let percentageAssistance = ((event.estimate || event.assistance) * 100 / event.capacity);
        if (!additionPercentajes[category]) {
            additionPercentajes[category] = 0;
            additionEvents[category] = 0;
        }
        additionPercentajes[category] += percentageAssistance;
        additionEvents[category] += 1;
    }
    let categoryAverages = {};
    for (let category in additionPercentajes) {
        let addition = additionPercentajes[category];
        let events = additionEvents[category];
        let average = (addition / events).toFixed(1);
        categoryAverages[category] = average;
    }
    return categoryAverages;
}

// Función para imprimir la tabla 2 y 3
export function printTable2and3(bodyTable, categories, revenuesCategory, percentageAssistance) {
    let tableHTML = ""
    for (let category of categories) {
        tableHTML += `<tr>
        <td class="td">${category}</td>
        <td class="td">$${revenuesCategory[category]}</td>
        <td class="td">${percentageAssistance[category]}%</td>
        </tr>`
    }

    bodyTable.innerHTML = tableHTML;
}
