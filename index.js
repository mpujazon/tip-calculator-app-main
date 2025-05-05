const tipForm = document.getElementById('tip-form');
const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const buttonsGroup = document.querySelectorAll('#buttons-group button');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetButton = document.getElementById('reset-button');
const billError = document.getElementById('bill-error');
const peopleError = document.getElementById('people-error');

let selectedTip;

//Functions

// Handles every change in the form (inputs and buttons).
const handleFormChange = () => {
    enableReset();
    if(validateInputs() && selectedTip){
        calculateTip()
    }
}

// Updates the selected tip chosen by the user, enables the reset feature, and manages the appearance of the tip buttons.
const updateSelectedTip = (e) => {
    enableReset();
    resetTipButtons();
    e.target.classList.add('selected');
    selectedTip = parseFloat(e.target.value);
}

// Validates the inputs and manages the visual appearance of the inputs.
const validateInputs = () => {
    let isBillValid = true;
    let isPeopleValid = true;

    const billValue = parseFloat(billInput.value);
    if (isNaN(billValue)) {
        billInput.classList.add('invalid');
        billError.classList.remove('hidden');
        isBillValid = false;
    } else {
        billInput.classList.remove('invalid');
        billError.classList.add('hidden');
    }

    const peopleValue = parseInt(peopleInput.value);
    if (isNaN(peopleValue)) {
        peopleInput.classList.add('invalid');
        peopleError.classList.remove('hidden');
        isPeopleValid = false;
    } else {
        peopleInput.classList.remove('invalid');
        peopleError.classList.add('hidden');
    }
    return isBillValid && isPeopleValid;
}

// Calculates the tip and total amount and updates the values in the results container.
const calculateTip = () => {
    const currentTipAmount = (parseFloat(billInput.value)*(selectedTip)).toFixed(2);
    const currentTotalAmount = (parseFloat((billInput.value)*(selectedTip+1))/peopleInput.value).toFixed(2);

    tipAmount.textContent = "$ " + currentTipAmount;
    totalAmount.textContent = "$ " + currentTotalAmount;
}

// Manages the reset when the user clicks the reset button.
const handleReset = () => {
    resetButton.disabled = true;
    cleanForm();
    resetTipButtons();
    billInput.classList.remove('invalid');
    peopleInput.classList.remove('invalid');
    billError.classList.add('hidden');
    peopleError.classList.add('hidden');
}

// Cleans the form inputs and the tip selected button.
const cleanForm = (e) => {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    selectedTip = undefined;
    tipForm.reset();
}

// Removes the selected style on tip buttons.
const resetTipButtons = () => {
    buttonsGroup.forEach(element => {
        element.classList.remove('selected');
    });
}

//Enables the reset feature.
const enableReset = () => {
    resetButton.disabled = false;
}

// Event listeners
buttonsGroup.forEach(element => {
    element.addEventListener('click', updateSelectedTip);
    element.addEventListener('click', handleFormChange);
});
tipForm.addEventListener('input', handleFormChange);
resetButton.addEventListener('click', handleReset);