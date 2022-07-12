/*
        TODO:
    1. signButton: changing coefficients to negative or back to positive and getting correct calculation
    2. decimalButton: change to decimal, should probably check if coefficient has more than 1 decimal then it wont be able to calculate correctly (throw an alert?)
    3. percentButton
        
        
        
*/const equalsButton = document.getElementById(`equals`);
const coeffButton = document.querySelectorAll(`#coefficient`)
const res = document.getElementById(`content`);
const addButton = document.getElementById(`add`);
const subtractButton = document.getElementById(`subtract`);
const multiplyButton = document.getElementById(`multiply`);
const divisionButton = document.getElementById(`division`)
const clearButton = document.getElementById(`clear`)
const signButton = document.getElementById(`sign`);
let firstCoefficient = ``;
let secondCoefficient = ``;
let signCount = 0;
let initialized = false; //might need to use flags to check if a sign has already been initilialized. TURNS OUT I WAS RIGHT LMAOOOOOOO
let sign = ``;
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
signButton.addEventListener(`click`,function(e) {
})
equalsButton.addEventListener(`click`,function(e) {
    switch(sign) {
        case `add`:
            operate(`add`,parseInt(firstCoefficient),parseInt(secondCoefficient));
            break;
        case `subtract`:
            operate(`subtract`,parseInt(firstCoefficient),parseInt(secondCoefficient));
            break;
        case `multiply`:
            operate(`multiply`,parseInt(firstCoefficient),parseInt(secondCoefficient));
            break;
        case `division`:
            operate(`division`,parseInt(firstCoefficient),parseInt(secondCoefficient));
            break; 
    }
    console.log(firstCoefficient);
});
clearButton.addEventListener(`click`, function(e) {
    firstCoefficient = ``;
    secondCoefficient = ``;
    sign = ``;
    res.textContent = 0;
    signCount = 0;
    initialized = false;
});
addButton.addEventListener(`click`,function(e) {
    let coeff1 = parseInt(firstCoefficient);
    if (!initialized && secondCoefficient === ``) {
        initialized = true;
        sign = `add`;
    }
    else if (initialized) {
        let fn = window[sign]; //add or subtract
        operate(sign,parseInt(firstCoefficient),parseInt(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(parseInt(firstCoefficient),parseInt(secondCoefficient));
        sign = `add`;
        secondCoefficient = ``;
        return;
    }
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
    let coeff1 = parseInt(firstCoefficient);
    if (!initialized) {
        initialized = true;
        sign = `subtract`;
    }
    else if (initialized) {
        let fn = window[sign];
        operate(sign,parseInt(firstCoefficient),parseInt(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(parseInt(firstCoefficient),parseInt(secondCoefficient));
        sign = `subtract`;
        secondCoefficient = ``;
        return;
    }
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
    let coeff1 = parseInt(firstCoefficient);
    if (!initialized) {
        initialized = true;
        sign = `multiply`;
    }
    else if (initialized) {
        let fn = window[sign];
        operate(sign,parseInt(firstCoefficient),parseInt(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(parseInt(firstCoefficient),parseInt(secondCoefficient));
        sign = `multiply`;
        secondCoefficient = ``;
        return;
    }
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
    let coeff1 = parseInt(firstCoefficient);
    if (!initialized) {
        initialized = true;
        sign = `division`;
    }
    else if (initialized) {
        let fn = window[sign];
        operate(sign,parseInt(firstCoefficient),parseInt(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(parseInt(firstCoefficient),parseInt(secondCoefficient));
        sign = `division`;
        secondCoefficient = ``;
        return;
    }
    if (signCount >= 1) {
        let coeff2 = parseInt(secondCoefficient);
        operate(`division`,coeff1,coeff2);
        let newcoeff1 = division(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    signCount++;
});
function add(coeff1,coeff2) {
    return coeff1 + coeff2;
}
function subtract(coeff1,coeff2) {
    return coeff1 - coeff2;
}
function multiply(coeff1,coeff2) {
    return coeff1 * coeff2;
}
function division(coeff1,coeff2) {
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
        case `division`:
            res.textContent = division(coeff1,coeff2);
            break;
    }
}