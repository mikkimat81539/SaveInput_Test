/*
store data in JSON format than send to local storage
Key: firstName
Value: John

{
"Orders": 
        [
            {"fname": "john", 
            "lname": "doe", 
            "appetizers": "Cheese Stick, Butter Biscuits",
            "entrées": "burger"}
        ]


JSON.stringify(obj) → turns a JavaScript object into a string.

JSON.parse(str) → turns a string that contains JSON back into a JavaScript object.
}*/

const submitBtn = document.getElementById('submitBtn')
const resetBtn = document.getElementById('resetBtn')

const fname = document.getElementById('firstName')
const lname = document.getElementById('lastName')

const appetizers = document.querySelectorAll('.appetizers')

const entrees = document.getElementById('entree') 

const cookLevel = document.getElementById('cookLevel')

const sides = document.querySelectorAll('.sides')

const dessert = document.querySelectorAll('.dessert')

const drinks = document.querySelectorAll('.drink-option input')

const softdrink = document.getElementById('softDrinks')

const alcohol = document.getElementById('alcoholicDrinks')

// collect first names and store in local storage
fname.addEventListener('click', firstcustomers)

function firstcustomers() {
    const fnameAttr = fname.getAttribute('name')
    const regex = /[^a-zA-Z\s]/g

    fname.value = fname.value.replace(regex, '')

    localStorage.setItem(fnameAttr, fname.value)

    if (localStorage.getItem(fnameAttr) === '') {
        localStorage.removeItem(fnameAttr)
    }
}

// collect last names and store in local storage
lname.addEventListener('click', lastcustomers)

function lastcustomers() {
    const lnameAttr = lname.getAttribute('name')
    const regex = /[^a-zA-Z\s]/g

    lname.value = lname.value.replace(regex, '')

    localStorage.setItem(lnameAttr, lname.value)

    if (localStorage.getItem(lnameAttr) === '') {
        localStorage.removeItem(lnameAttr)
    }
}

// collect appetizers and store in local storage
function appetizerStorage() {
    for (let i=0; i < appetizers.length; i++) {
        const appNameAttr = appetizers[i].getAttribute('name')

        if (appetizers[i].checked) {
            localStorage.setItem(appNameAttr, 'on')
        }

        else {
            localStorage.removeItem(appNameAttr)
        }
    }
}

// collect entrées and store in local storage
entrees.addEventListener('change', entreesStorage)

function entreesStorage() {
    // take the value of what the user selected and store in LS
    const entreeNameAttr = entrees.getAttribute('name')
    const entreeValue = entrees.value
    const cookLevelValue = cookLevel.value

    // if burger and steak are selected unhide cookLevel
    if (entreeValue == 'burger' || entreeValue == 'steak') {
        const cookingType = {
            [entreeValue]: cookLevelValue
        }
        cookLevel.hidden = false
        localStorage.setItem(entreeNameAttr, JSON.stringify(cookingType))

    }

    else if (entreeValue == 'null') {
        localStorage.removeItem(entreeNameAttr)
    }

    else {
        cookLevel.hidden = true
        localStorage.setItem(entreeNameAttr, entreeValue)
    }
}

// collect sides and store in local storage
function sidesStorage() {
    for (i=0; i < sides.length; i++) {
        if (sides[i].checked) {
            const sideNameAttr = sides[i].getAttribute('name')
            const sideValues = sides[i].value
            localStorage.setItem(sideNameAttr, sideValues)
        }
    }
}

// collect desserts and store in local storage
function dessertsStorage() {
    for (let i=0; i < dessert.length; i++) {
        const dessertNameAttr = dessert[i].getAttribute('name')
        const dessertCheck = dessert[i].checked
        
        if (dessertCheck) {
            localStorage.setItem(dessertNameAttr, 'on')
        }

        else {
            localStorage.removeItem(dessertNameAttr)
        }
    }
}

// to loop through each drink when user selects drink
drinks.forEach(i => {
    i.addEventListener('change', drinkStorage);
});

// collect drinks and store in local storage
function drinkStorage() {
    
    for (let i=0; i < drinks.length; i++) {
        if(drinks[i].checked) {
            if (drinks[i].value === "soft") {
                softdrink.hidden = false;
                alcohol.hidden = true;

                localStorage.setItem('soft', softdrink.value)
                localStorage.removeItem('alcohol')
        } 
        
            else if (drinks[i].value === "alcohol") {
                alcohol.hidden = false;
                softdrink.hidden = true;
                localStorage.setItem('alcohol', alcohol.value)
                localStorage.removeItem('soft')
            }
        }
    }
}

// take the data and store in JSON format
function ordersJSON() {
    const fnameAttr = fname.getAttribute('name')
    const lnameAttr = lname.getAttribute('name')

    const selectedAppetizers = [];
    const entreeNameAttr = entrees.getAttribute('name')

    let CookLevelJSON = localStorage.getItem(entreeNameAttr)

    const dessertSelected = []

    // for loop for appetizers
    for (let i=0; i < appetizers.length; i++) {
        const appNameAttr = appetizers[i].getAttribute('name')
        const Appvalue = localStorage.getItem(appNameAttr);

        // store apetizers in an empty list
        if (Appvalue) {
            selectedAppetizers.push(appNameAttr);
        }
    }

    // conditional statement for entrees
    if (entrees.value == 'burger' || entrees.value == 'steak') {
        CookLevelJSON = JSON.parse(localStorage.getItem(entreeNameAttr))
    }

    else {
        CookLevelJSON 
    }

    // variables for sides
    const sideNameAttr = sides[0].getAttribute('name')
    const Sidevalue = localStorage.getItem(sideNameAttr)

    // for loop for desserts
        for (let i=0; i < dessert.length; i++) {
            const dessertNameAttr = dessert[i].getAttribute('name')
            const dessertCheck = dessert[i].checked

            if (dessertCheck) {
                dessertSelected.push(dessertNameAttr)
            }
        }

    const orders = {
        firstName: localStorage.getItem(fnameAttr),
        lastName: localStorage.getItem(lnameAttr),
        appetizers: selectedAppetizers,
        entrees: CookLevelJSON,
        sides: Sidevalue,
        desserts: dessertSelected
    }
    
    console.log(JSON.stringify(orders))
}

// submit button sends data to local storage
submitBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    firstcustomers()
    lastcustomers()
    appetizerStorage()
    entreesStorage()
    sidesStorage()
    dessertsStorage()
    drinkStorage()
    ordersJSON()
})

// reset button clears local storage
resetBtn.addEventListener('click', () => {
    localStorage.clear()
    console.clear()
})