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
}*/

const submitBtn = document.getElementById('submitBtn')
const resetBtn = document.getElementById('resetBtn')

const fname = document.getElementById('firstName')
const lname = document.getElementById('lastName')

const appetizers = document.querySelectorAll('.appetizers')

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


// take the data and store in JSON format
function ordersJSON() {
    const fnameAttr = fname.getAttribute('name')
    const lnameAttr = lname.getAttribute('name')

    const selectedAppetizers = [];
    
    for (let i=0; i < appetizers.length; i++) {
        const appNameAttr = appetizers[i].getAttribute('name')
        const value = localStorage.getItem(appNameAttr);

        // store apetizers in an empty list
        if (value) {
            selectedAppetizers.push(appNameAttr);
        }
    }

    const orders = {
        firstName: localStorage.getItem(fnameAttr),
        lastName: localStorage.getItem(lnameAttr),
        appetizers: selectedAppetizers
    }
    
    console.log(JSON.stringify(orders))
}

// submit button sends data to local storage
submitBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    firstcustomers()
    lastcustomers()
    appetizerStorage()
    ordersJSON()
})

// reset button clears local storage
resetBtn.addEventListener('click', () => {
    localStorage.clear()
})