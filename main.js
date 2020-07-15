"use strict"

// Function to render each individual coffee
function renderCoffee(coffee) {
    let html = '<div class="coffee w-50 mb-3  w-sm-25">';
    html += '<div class="d-none">' + coffee.id + '</div>';
    html += '<div class="d-flex align-items-baseline"><div class="coffeeName h2 mr-2">' + coffee.name + '</div>';
    html += '<div class="text-muted">' + coffee.roast + '</div></div>';
    html += '</div>';

    return html;
}

// Function rendering the coffees array to the index.html
function renderCoffees(coffees) {
    let html = '';
    // coffees.sort implements the compare function to sort by property id
    coffees.sort(function (a,b) {
        return a.id - b.id;
    });
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Event Listener/handler function to update and filter the coffee array
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;

    // Set filteredCoffees to coffees array when selected roast is set to 'all'
    let filteredCoffees = coffees;

    // Set filteredCoffees variable to the coffees array which is filtered by roast type
    if (selectedRoast !== "all") {
        filteredCoffees = coffees.filter(function (coffee) {
            return coffee.roast === selectedRoast;
        });
    }

    // Filter coffees array by coffee name
    // Set filteredCoffees variable to the coffees array which is filtered by coffee name
    if (e.target.value !== selectedRoast) {
        const coffeeSearchName = e.target.value.toLowerCase();
        filteredCoffees = filteredCoffees.filter(function (coffee) {
            // Set the coffeeName to the coffee object property name and make it case insensitive
            const coffeeName = coffee.name.toLowerCase();
            // implement the JS built-in includes function to test for the user's input for coffee name
            return coffeeName.includes(coffeeSearchName);
        });
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// Function to add/create a new coffee object to coffees array
function addNewCoffee(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data

    console.log(localStorage);

    // Declare empty newCoffee object to store the new coffee info (id, name, roasta)
    const newCoffee = {};

    // Add the id property to newCoffee object by using coffees array length plus 1
    newCoffee.id = coffees.length + 1;

    // Declare newCoffee variable to store the new user coffee name
    const newCoffeeName = addCoffee.value;
    if (newCoffeeName.length > 0 && isNaN(newCoffeeName)) {
        newCoffee.name = newCoffeeName;
    } else {
        console.log("Invalid coffee name entry.");

       //set default for undefined coffee name entry
        newCoffee.name  = "newCoffee";
    }

    // Declare newRoast variable to store the new user selected roast type
    const newRoast = addRoast.value;
    newCoffee.roast = newRoast;

    // Add newly created coffee object to localStorage
    localStorage.setItem(`${newCoffee.id}`, JSON.stringify(newCoffee));
    // Add newly created coffee object to coffees array
    coffees.push(newCoffee);
    tbody.innerHTML = renderCoffees(coffees);
}

// From http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

// To declare variables to access the DOM elements in index.html
const coffeeFilter = document.getElementById("coffee-filter");
const tbody = document.querySelector("#coffees");
// const filterButton = document.querySelector("#submit0");
const roastSelection = document.querySelector("#roast-selection");
const addRoast = document.getElementById("add-roast");
const addCoffee = document.getElementById("add-coffee");
const addButton = document.querySelector("#submit1");

// load localStorage coffee names into coffees array
function loadStorage() {
    const keys = Object.keys(localStorage);
    let i = keys.length;
    // console.log("i: ", i);

    while ( i-- ) {
        console.log("localStorage: ", localStorage.getItem(keys[i]));
        coffees.push( JSON.parse( localStorage.getItem(keys[i]) ) );
    }
}

// Initially load items from localStorage
loadStorage();

// Render initial coffees array
tbody.innerHTML = renderCoffees(coffees);

// These are the actions attached to the DOM elements:

// Event: No action done with #submit0 button in index.html
// filterButton.addEventListener('click', updateCoffees);

// Event: filters coffee array by using the #roast-selection options in updatedCoffees function
roastSelection.addEventListener('change',updateCoffees );

// Event: filters coffees array using the user input for coffee name in updatedCoffees function
coffeeFilter.addEventListener('input', updateCoffees);

// Event: submit button handler to add the new coffee object to the coffees array
addButton.addEventListener('click', addNewCoffee);
