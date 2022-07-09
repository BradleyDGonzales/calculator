const equalsButton = document.getElementById(`equals`);
const coeffButton = document.querySelectorAll(`#coefficient`)
const res = document.getElementById(`content`);
const addButton = document.getElementById(`addition`);
const clearButton = document.getElementById(`clear`)
let firstCoefficient = ``;
let secondCoefficient = ``;
let sign;
coeffButton.forEach(el => {
    el.addEventListener(`click`,function(e) {
        firstCoefficient += el.value
        res.textContent = parseInt(firstCoefficient);
    })
});

clearButton.addEventListener(`click`, function(e) {
    firstCoefficient = '';
    res.textContent = 0;
})
addButton.addEventListener(`click`,function(e) {
    res.textContent = 0;
    let coeff1 = firstCoefficient;
    secondCoefficient += el.value;
    let coeff2 = secondCoefficient;
    add(coeff1,coef2);
});
equalsButton.addEventListener(`click`,function(e) {
    console.log(`clicked!`);
})

function add(coeff1,coeff2) {
    return coeff1 + coeff2;
}
function subtract(coeff1,coeff2) {
    return coeff1 - coeff2;
}
function multiply(coeff1,coeff2) {
    return coeff1 * coeff2;
}
function divide(coeff1,coeff2) {
    return coeff1 / coeff2;
}
function operate(operator,coeff1,coeff2) {
    switch(operator) {
        case `add`:
            return add(coeff1,coeff2);
        case `subtract`:
            return subtract(coeff1,coeff2);
        case `multiply`:
            return multiply(coeff1,coeff2);
        case `divide`:
            return divide(coeff1,coeff2);
    }
}