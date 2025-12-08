const numInput = document.getElementById("numQuestions")
const submitBtn = document.getElementById('sendBtn')
const resetBtn = document.getElementById('resetBtn')
const subjects = document.getElementById('subject')
const form = document.getElementById("userInputs")

// Input numbers only
numInput.addEventListener("input", num =>{
    regex = /[^0-9]/g
    numInput.value = numInput.value.replace(regex, '')

    numInput.textContent = num.target.value
})

window.addEventListener("load", () => {
    saveNumInput = localStorage.getItem('userNumberInput')
    saveSubject = localStorage.getItem('subjectSelection')


    if (saveSubject) {
        subjects.value = saveSubject
        numInput.value = saveNumInput
    }
})

// Saving inputs
const saveLocalStorage = () => {
    localStorage.setItem('userNumberInput', numInput.textContent)
    localStorage.setItem('subjectSelection', subjects.value)
}

// Prevents from refreshing page
function unrefreshForm(event) { event.preventDefault() } 
form.addEventListener('submit', unrefreshForm)

// submit when I click
submitBtn.addEventListener('click', saveLocalStorage)

// Clearing when reseting
resetBtn.addEventListener('click', () => {
    localStorage.clear()
})

// When selected, the selected option should be the new default