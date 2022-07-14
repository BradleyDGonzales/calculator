/*
        TODO:
    1. signButton: changing coefficients to negative or back to positive and getting correct calculation (//)
    2. decimalButton: change to decimal, should probably check if coefficient has more than 1 decimal then it wont be able to calculate correctly (throw an alert?)
    3. percentButton (//?)
        
        
07/13 = changed parseInt/parseFloat to Number(); seemed to have made everything a lot more clearer but we'll see.
07/13 = I think percentButton is working now.. but tbh unsure. It can be a bit buggy but currently too tired to QA it. NOTE: test out the percent button correctly!!!!
*/
const equalsButton = document.getElementById(`equals`);
const coeffButton = document.querySelectorAll(`#coefficient`)
const res = document.getElementById(`content`);
const addButton = document.getElementById(`add`);
const subtractButton = document.getElementById(`subtract`);
const multiplyButton = document.getElementById(`multiply`);
const divisionButton = document.getElementById(`division`)
const clearButton = document.getElementById(`clear`)
const signButton = document.getElementById(`sign`);
const decimalButton = document.getElementById(`decimal`);
const percentButton = document.getElementById(`percent`);
let firstCoefficient = ``;
let secondCoefficient = ``;
let signCount = 0;
let initialized = false; //might need to use flags to check if a sign has already been initilialized. TURNS OUT I WAS RIGHT LMAOOOOOOO
let sign = ``;
let infinityCalled = false;
let equalsButtonPressed = false;
coeffButton.forEach(el => {
    el.addEventListener(`click`,function(e) {
        if (signCount === 0) {
            firstCoefficient += el.value
            res.textContent = Number(firstCoefficient);
        }
        else if (signCount > 0) {
            secondCoefficient += el.value;
            res.textContent = Number(secondCoefficient);
        }
    })
});
signButton.addEventListener(`click`,function(e) {
    if (signCount === 0) {
        firstCoefficient = Number(firstCoefficient) * -1;
        res.textContent = firstCoefficient;
    }
    else if (isNaN(Number(firstCoefficient))) {
        res.textContent = 0;
        return;
    }
    else if (isNaN(Number(secondCoefficient))) {
        secondCoefficient = Number(secondCoefficient) * -1;
        res.textContent = secondCoefficient;
        return;
    }
    else {
        secondCoefficient = Number(secondCoefficient) * -1;
        res.textContent = secondCoefficient;
    }
});
percentButton.addEventListener(`click`,function(e) {
    if (signCount === 0) {
        firstCoefficient = Number(firstCoefficient) / 100;
        res.textContent = firstCoefficient;
    }
    else {
        if (equalsButtonPressed) {
            let fn = window[sign]; 
            operate(sign,Number(firstCoefficient),Number(secondCoefficient));
            if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient)) / 100;
            res.textContent = firstCoefficient;
            secondCoefficient = ``;
            equalsButtonPressed = false;
            return;
        }
        secondCoefficient = parseFloat(secondCoefficient) / 100;
        res.textContent = secondCoefficient
    }

});
decimalButton.addEventListener(`click`, function(e) {
});

equalsButton.addEventListener(`click`,function(e) {
    equalsButtonPressed = true;
    initialized = false;
    switch(sign) {
        case `add`:
            operate(`add`,Number(firstCoefficient),Number(secondCoefficient));
            break;
        case `subtract`:
            operate(`subtract`,Number(firstCoefficient),Number(secondCoefficient));
            break;
        case `multiply`:
            operate(`multiply`,Number(firstCoefficient),Number(secondCoefficient));
            break;
        case `division`:
            operate(`division`,Number(firstCoefficient),Number(secondCoefficient));
            break; 
    }
    checkInfinity();
});
clearButton.addEventListener(`click`, clearData);
addButton.addEventListener(`click`,function(e) {
    let coeff1 = Number(firstCoefficient);
    if (!initialized && secondCoefficient === ``) {
        initialized = true;
        sign = `add`;
    }
    else if (initialized) {
        let fn = window[sign]; 
        operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `add`;
        secondCoefficient = ``;
        return;
    }
    if (signCount >= 1) {
        let coeff2 = Number(secondCoefficient);
        operate(`add`,coeff1,coeff2);
        let newcoeff1 = add(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    checkInfinity();
    signCount++;
});
subtractButton.addEventListener(`click`,function(e) {
    let coeff1 = Number(firstCoefficient);
    if (!initialized && secondCoefficient === ``) {
        initialized = true;
        sign = `subtract`;
    }
    else if (initialized) {
        let fn = window[sign];
        operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `subtract`;
        secondCoefficient = ``;
        return;
    }
    if (signCount >= 1) {
        let coeff2 = Number(secondCoefficient);
        operate(`subtract`,coeff1,coeff2);
        let newcoeff1 = subtract(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    checkInfinity();
    signCount++;
});
multiplyButton.addEventListener(`click`,function(e) {
    let coeff1 = Number(firstCoefficient);
    if (!initialized && secondCoefficient === ``) {
        initialized = true;
        sign = `multiply`;
    }
    else if (initialized) {
        let fn = window[sign];
        operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `multiply`;
        secondCoefficient = ``;
        return;
    }
    if (signCount >= 1) {
        let coeff2 = Number(secondCoefficient);
        operate(`multiply`,coeff1,coeff2);
        let newcoeff1 = multiply(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    checkInfinity();
    signCount++;
});
divisionButton.addEventListener(`click`,function(e) {
    let coeff1 = Number(firstCoefficient);
    if (!initialized && secondCoefficient === ``) {
        initialized = true;
        sign = `division`;
    }
    else if (initialized) {
        let fn = window[sign];
        operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `division`;
        secondCoefficient = ``;
        return;
    }
    if (signCount >= 1) {
        let coeff2 = Number(secondCoefficient);
        operate(`division`,coeff1,coeff2);
        let newcoeff1 = division(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    checkInfinity();
    signCount++;
});
function clearData() {
    firstCoefficient = ``;
    secondCoefficient = ``;
    sign = ``;
    signCount = 0;
    initialized = false;
    equalsButtonPressed = false;
    if (infinityCalled) {
        res.textContent = `Can't divide by zero!`;
        infinityCalled = false;
    }
    else {
        res.textContent = 0;
        infinityCalled = false;
    }
}
function checkInfinity() {
    if (res.textContent === `Infinity`) {
        infinityCalled = true;
        res.textContent = `Can't divide by zero!`;
        clearData();
        return true;
    }
}
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