/* 
User selects fruits that apply
User than clicks submit
When submitted prevent webpage from refreshing -- DONE
User selection should be sent to local storage and show as the fruit the user selected not the boolean 
    
    Detect when a checkbox is clicked
    Collect all checked labels
    Store them in localStorage as an array (e.g., ["Addition", "Money"])
    Restore the checked boxes when the page reloads

When refreshing page webpage should load up data from local storage and display it
When user presses refresh button than all data in local storage should be cleared
*/

const fruitSelection = document.getElementById('fruitSelection')
const submitBtn = document.getElementById('submitBtn')
const resetBtn = document.getElementById('resetBtn')
const fruitCheckboxes = document.querySelectorAll('fieldset .fruit')


function onSwitch() {
    // If checked aadd to local storage
    for (let i = 0; i < fruitCheckboxes.length; i++) {
        if (fruitCheckboxes[i].checked) {
            // take the name and display it
            const nameAttr = fruitCheckboxes[i].getAttribute('name')
            localStorage.setItem(nameAttr, 'true')
        }

        // if unchecked than remove from local storage
        else if (!fruitCheckboxes[i].checked) {
            // take the name and display it
            const nameAttr = fruitCheckboxes[i].getAttribute('name')
            localStorage.removeItem(nameAttr)
        }
    }
}

// Show TRUE selected values from local storage when page loads up
window.addEventListener('load', () => {
    for (let i = 0; i < fruitCheckboxes.length; i++) {
        const nameAttr = fruitCheckboxes[i].getAttribute('name')
        const savedValue = localStorage.getItem(nameAttr)

        fruitCheckboxes[i].checked = savedValue === 'true'
        savedValue == 'true' // convert string to boolean
    }
});

// Send data of from when submit button is pressed
submitBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    onSwitch()
})

// Clear log when reset button is clicked
resetBtn.addEventListener('click', () => {
    console.clear()
    localStorage.clear()
})