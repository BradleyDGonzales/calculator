const equalsButton = document.getElementById(`equals`);
const coeffButton = document.querySelectorAll(`#coefficient`)
const res = document.getElementById(`content`);
const addButton = document.getElementById(`add`);
const subtractButton = document.getElementById(`subtract`);
const multiplyButton = document.getElementById(`multiply`);
const divisionButton = document.getElementById(`division`)
const clearButton = document.getElementById(`clear`)
let firstCoefficient = ``;
let secondCoefficient = ``;
let signCount = 0;
let initialized = false; //might need to use flags to check if a sign has already been initilialized
coeffButton.forEach(el => {
    el.addEventListener(`click`,function(e) {
        if (signCount === 0) {
            firstCoefficient += el.value
            res.textContent = parseInt(firstCoefficient);
        }
        else if (signCount > 0) {
            secondCoefficient += el.value;
            res.textContent = parseInt(secondCoefficient);
        }
    })
});

clearButton.addEventListener(`click`, function(e) {
    firstCoefficient = '';
    res.textContent = 0;
    signCount = 0;
})
addButton.addEventListener(`click`,function(e) {
    res.textContent = 0;
    let coeff1 = parseInt(firstCoefficient);

    if (signCount >= 1) {
        let coeff2 = parseInt(secondCoefficient);
        operate(`add`,coeff1,coeff2);
        let newcoeff1 = add(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    signCount++;
});
subtractButton.addEventListener(`click`,function(e) {
    res.textContent = 0;
    let coeff1 = parseInt(firstCoefficient);

    if (signCount >= 1) {
        let coeff2 = parseInt(secondCoefficient);
        operate(`subtract`,coeff1,coeff2);
        let newcoeff1 = subtract(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    signCount++;
});
multiplyButton.addEventListener(`click`,function(e) {
    res.textContent = 0;
    let coeff1 = parseInt(firstCoefficient);

    if (signCount >= 1) {
        let coeff2 = parseInt(secondCoefficient);
        operate(`multiply`,coeff1,coeff2);
        let newcoeff1 = multiply(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    signCount++;
});
divisionButton.addEventListener(`click`,function(e) {
    res.textContent = 0;
    let coeff1 = parseInt(firstCoefficient);

    if (signCount >= 1) {
        let coeff2 = parseInt(secondCoefficient);
        operate(`divide`,coeff1,coeff2);
        let newcoeff1 = divide(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    signCount++;
});

    /*if (signCount > 1) {

    }
    if (addCount > 1) {
        operate()
    }
    if (addCount !== 0) {
        let coeff2 = parseInt(secondCoefficient);
        let newcoeff1 = add(coeff1,coeff2);
        if (addCount === 1) {
            operate(`add`,coeff1,coeff2);
        }
        if (addCount > 1) {
            coeff1 = newcoeff1;
            operate(`add`,coeff1,coeff2)
            secondCoefficient = ``;
        }
    }
});*/
equalsButton.addEventListener(`click`,function(e) {
    signCount = 0;

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
            res.textContent = add(coeff1,coeff2);
            break;
        case `subtract`:
            res.textContent = subtract(coeff1,coeff2);
            break;
        case `multiply`:
            res.textContent = multiply(coeff1,coeff2);
            break;
        case `divide`:
            res.textContent = divide(coeff1,coeff2);
            break;
    }
}