/*
User selects a color -- DONE
User clicks display -- DONE
When user clicks display button, the value of dropdown should be sent to local storage -- DONE
The default selected should be changed to the color the user selected -- DONE
The webpage should display the color that is in the local storage -- DONE
When reset button is pressed it should clear the webpage and reset it to the default which is null option -- DONE
null option is white -- DONE
*/

const displayBtn = document.getElementById('displayColor')
const resetBtn = document.getElementById('resetColor')
const colorSelection = document.getElementById('colorSelection')


// when refreshed background color remains to what is in local storage
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem("colorSelected");
    if (savedColor){
        document.body.style.backgroundColor = savedColor;
    } 

    else {
        document.body.style.backgroundColor = 'white'; // Default color if nothing is saved
    }
})


// sends to local storage
displayBtn.addEventListener('click', (event) => {
    event.preventDefault() // prevent from refreshing
    localStorage.setItem('colorSelected', colorSelection.value)

    document.body.style.backgroundColor = colorSelection.value
    // if blank option selected than change color to white
    if (colorSelection.value == "null") {
        document.body.style.backgroundColor = 'white'
    }

    else {
        document.body.style.backgroundColor = colorSelection.value;
    }
})

// clear local storage
resetBtn.addEventListener('click', () => {
    localStorage.clear();
    document.body.style.backgroundColor = 'white'
})
