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

// store first names in local storage
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

// store last names in local storage
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

// submit button sends data to local storage
submitBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    firstcustomers()
    lastcustomers()
})

// reset button clears local storage
resetBtn.addEventListener('click', () => {
    localStorage.clear()
})