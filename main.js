"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<div>' + coffee.id + '</div>';
    html += '<div>' + coffee.name + '</div>';
    html += '<div>' + coffee.roast + '</div>';
    html += '</div>';

    return html;
}



//Function rendering the coffees to the index.html and sorts by the coffee id
function renderCoffees(coffees) {
    var html = '';
// coffees.sort implements the compareTo function
    coffees.sort(function (a,b) {
        return a.id - b.id;
    })
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}


// Event Listener/handler function to update and filter the coffee list
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;

//set filtered coffees when selected roast is equal to 'all'
    let filteredCoffees = coffees;

// set filteredCoffees variable to the coffees array which is filtered by roast type
    if (selectedRoast !== 'all') {
        filteredCoffees = coffees.filter(function (coffee) {
            return coffee.roast === selectedRoast;
        });
    }


// Filter coffees array by coffee name
    if (e.target.value !== selectedRoast) {
    const coffeeSearchName = e.target.value.toLowerCase()
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];



//To declare variables to access the DOM elements in index.html
const coffeeFilter = document.getElementById("coffee-filter")
const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

//these are the actions attached to the DOM elements:

// action filters coffee array by using the #submit button in index.html
submitButton.addEventListener('click', updateCoffees);

// action filters coffee array by using the #roast-selection options in updatedCoffees function
roastSelection.addEventListener('change',updateCoffees );

//action filters coffees array using the user input for coffee name in updatedCoffees function
coffeeFilter.addEventListener('input', updateCoffees);
