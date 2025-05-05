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

// Functions
const updateSelectedTip = (e) => {
    enableReset();
    resetTipButtons();
    e.target.classList.add('selected');
    selectedTip = parseFloat(e.target.value);
}

const handleFormChange = () => {
    enableReset();
    if(validateInputs() && selectedTip){
        calculateTip()
    }
}

const validateInputs = () => {
    let isBillValid = true;
    let isPeopleValid = true;

    const billValue = parseFloat(billInput.value);
    if (isNaN(billValue)) {
        billInput.classList.add('invalid');
        isBillValid = false;
        billError.classList.remove('hidden');
    } else {
        billInput.classList.remove('invalid');
        billError.classList.add('hidden');

    }

    const peopleValue = parseInt(peopleInput.value);
    if (isNaN(peopleValue)) {
        peopleInput.classList.add('invalid');
        isPeopleValid = false;
        peopleError.classList.remove('hidden');
    } else {
        peopleInput.classList.remove('invalid');
        peopleError.classList.add('hidden');
    }
    return isBillValid && isPeopleValid;
}

const calculateTip = () => {
    const currentTipAmount = (parseFloat(billInput.value)*(selectedTip)).toFixed(2);
    const currentTotalAmount = (parseFloat((billInput.value)*(selectedTip+1))/peopleInput.value).toFixed(2);

    tipAmount.textContent = "$ " + currentTipAmount;
    totalAmount.textContent = "$ " + currentTotalAmount;
}

const handleReset = () => {
    resetButton.disabled = true;
    cleanForm();
    resetTipButtons();
    billInput.classList.remove('invalid');
    peopleInput.classList.remove('invalid');
    billError.classList.add('hidden');
    peopleError.classList.add('hidden');
}
const cleanForm = (e) => {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    selectedTip = undefined;
    tipForm.reset();
}

const resetTipButtons = () => {
    buttonsGroup.forEach(element => {
        element.classList.remove('selected');
    });
}

const enableReset = () => {
    resetButton.disabled = false;
}

// Event listeners
buttonsGroup.forEach(element => {
    element.addEventListener('click', updateSelectedTip);
    element.addEventListener('click', handleFormChange);
});
tipForm.addEventListener('input', handleFormChange);
resetButton.addEventListener('click', handleReset)

