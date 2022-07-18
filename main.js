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
let decimalCount = 0;
let initialized = false; //might need to use flags to check if a sign has already been initilialized. TURNS OUT I WAS RIGHT LMAOOOOOOO
let sign = ``;
let infinityCalled = false;
let equalsButtonPressed = false;
let decimalButtonPressed;
coeffButton.forEach(el => {
    el.addEventListener(`click`,function(e) {
        if (decimalCount >= 2 && secondCoefficient === ``) {
            decimalButton.disabled = false
        }
        if (equalsButtonPressed) {
            if (firstCoefficient.indexOf(`.`) !== -1) {
                firstCoefficient += el.value;
                res.textContent = firstCoefficient;
                return;
            }
            else {
                firstCoefficient = ``;
                secondCoefficient = ``;
                signCount = 0;
                equalsButtonPressed = false;
            }
        }
        if (signCount === 0) {
            firstCoefficient += el.value
            res.textContent = firstCoefficient;
        }
        else if (signCount > 0 || secondCoefficient === ``) {
            secondCoefficient += el.value;
            res.textContent = secondCoefficient;
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
        secondCoefficient = Number(secondCoefficient) / 100;
        res.textContent = secondCoefficient
    }

});
decimalButton.addEventListener(`click`, function(e) {
    decimalButtonPressed = true;
    if (equalsButtonPressed) {
        firstCoefficient = ``;
        secondCoefficient = ``;
        signCount = 0;
        sign = ``;
        decimalCount = 0;
        equalsButtonPressed = false;
        if (decimalButton.disabled === true) {
            decimalButton.disabled === false;
        }
        //return;

    }
    if (decimalButtonPressed) {
        if (sign !== ``) {
            decimalButton.disabled = false;
            //res.textContent = 0;
            if (secondCoefficient === ``) {
                secondCoefficient = `0` + `.`;
                res.textContent = secondCoefficient;
                decimalCount++;
                return;
            }
            else {
                secondCoefficient = res.textContent + `.`;
                res.textContent = secondCoefficient;
                decimalCount++;
            }
            if (res.textContent.indexOf(`.`) !== -1) {
                decimalButton.disabled = true;
            }
            return;
        }
        else if (sign === ``) {
            if (firstCoefficient === `` && secondCoefficient === ``) {
                firstCoefficient = `0` + `.`;
                res.textContent = firstCoefficient;
                decimalButton.disabled = true;
                decimalCount++;
                return;
            }
            else {
                firstCoefficient = res.textContent + `.`;
                res.textContent = firstCoefficient;
                decimalButton.disabled = true;
                decimalCount++
                return;
            }
        }
        if (res.textContent === `0`) {
            if (firstCoefficient === ``) {
                firstCoefficient = res.textContent + `.`;
                res.textContent = firstCoefficient;
                decimalButton.disabled = true;
                decimalCount++;
                return;
            }
            else if (secondCoefficient === ``) {
                secondCoefficient = res.textContent + `.`;
                res.textContent = secondCoefficient;
                decimalButton.disabled = true;
                decimalCount++;
            }
        }
        if (res.textContent.indexOf(`.`) === -1) {
            if (res.textContent === firstCoefficient) {
                firstCoefficient = res.textContent + `.`;
                res.textContent = firstCoefficient
                decimalButton.disabled = true;
                decimalCount++;
            }
            else if (res.textContent === secondCoefficient){
                secondCoefficient = res.textContent + `.`;
                res.textContent = secondCoefficient;
                decimalButton.disabled = true;
                decimalCount++;
            }
            return;
        }
        if (signCount === 0){
            res.textContent = 0;
            firstCoefficient += `.`
            res.textContent = firstCoefficient;
            decimalCount++;
        }
        else {
            res.textContent = 0;
            secondCoefficient += `.`
            res.textContent = secondCoefficient;
            decimalCount++;
        }
        decimalButton.disabled = true;
    }
    if (decimalCount >= 2) {
        decimalButton.disabled = false;
    }
    else {
        reenableDecimals();
    }
    /* if (decimalButtonPressed && res.textContent.indexOf(`.`) === -1) {
        firstCoefficient += `.`
        res.textContent = firstCoefficient;
    }*/
    console.log(`Decimal button is ${decimalButtonPressed} under event listener`)
});

equalsButton.addEventListener(`click`,function(e) {
    equalsButtonPressed = true;
    initialized = false;
    reenableDecimals();
    if (res.textContent === firstCoefficient && res.textContent.indexOf(`.`) !== -1) {
        firstCoefficient = res.textContent;
        decimalButton.disabled = true;
    }

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
    if (decimalButton.disabled === true) {
        decimalButton.disabled = false;
    }
    checkInfinity();
});
clearButton.addEventListener(`click`, clearData);
addButton.addEventListener(`click`,function(e) {
    let coeff1;
    if (equalsButtonPressed) {
        sign = `add`;
        coeff1 = Number(res.textContent)
        firstCoefficient = coeff1;
        secondCoefficient = ``;
        equalsButtonPressed = false;
        return;
    }
    if (!initialized) {
        if (secondCoefficient === ``) {
            decimalButton.disabled = false;
            initialized = false;
            signCount = 1;
            sign = `add`;
            return;
        }
        initialized = true;
    }
    if (initialized) {
        let fn = window[sign];
        if (secondCoefficient !== ``) {
            operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        }
        else {
            firstCoefficient = res.textContent;
            secondCoefficient = ``;
            sign = `add`;
            return;
        }
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `add`;
        secondCoefficient = ``;
        if (decimalButton.disabled === true) {
            decimalButton.disabled = false;
        }
        return;
    }
    if (signCount >= 1) {
        if (secondCoefficient === ``) {
            res.textContent = firstCoefficient;
            return;
        }
        let coeff2 = Number(secondCoefficient);
        operate(`add`,coeff1,coeff2);
        let newcoeff1 = add(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    reenableDecimals();
    checkInfinity();
    signCount++;
});
subtractButton.addEventListener(`click`,function(e) {
    let coeff1;
    if (equalsButtonPressed) {
        sign = `subtract`;
        coeff1 = Number(res.textContent)
        firstCoefficient = coeff1;
        secondCoefficient = ``;
        equalsButtonPressed = false;
        return;
    }

    if (!initialized) {
        if (secondCoefficient === ``) {
            decimalButton.disabled = false;
            initialized = false;
            signCount = 1;
            sign = `subtract`
            return;
        }
        initialized = true;
    }
    if (initialized) {
        let fn = window[sign];
        if (secondCoefficient !== ``) {
            operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        }
        else {
            firstCoefficient = res.textContent;
            secondCoefficient = ``;
            sign = `subtract`;
            return;
        }
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `subtract`;
        secondCoefficient = ``;
        if (decimalButton.disabled === true) {
            decimalButton.disabled = false;
        }
        return;
    }
    if (signCount >= 1) {
        if (secondCoefficient === ``) {
            res.textContent = firstCoefficient;
            return;
        }
        let coeff2 = Number(secondCoefficient);
        operate(`subtract`,coeff1,coeff2);
        let newcoeff1 = subtract(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    reenableDecimals();
    checkInfinity();
    signCount++;
});
multiplyButton.addEventListener(`click`,function(e) {
    let coeff1;
    if (equalsButtonPressed) {
        sign = `multiply`;
        coeff1 = Number(res.textContent)
        firstCoefficient = coeff1;
        secondCoefficient = ``;
        equalsButtonPressed = false;
        return;
    }
    else {
        coeff1 = Number(firstCoefficient);
    }
    if (!initialized) {
        if (secondCoefficient === ``) {
            decimalButton.disabled = false;
            initialized = false;
            signCount = 1;
            sign = `multiply`
            return;
        }
        initialized = true;
    }
    if (initialized) {
        let fn = window[sign];
        if (secondCoefficient !== ``) {
            operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        }
        else {
            firstCoefficient = res.textContent;
            secondCoefficient = ``;
            sign = `multiply`;
            return;
        }
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `multiply`;
        secondCoefficient = ``;
        if (decimalButton.disabled === true) {
            decimalButton.disabled = false;
        }
        return;
    }
    if (signCount >= 1) {
        if (secondCoefficient === ``) {
            res.textContent = firstCoefficient;
            return;
        }
        let coeff2 = Number(secondCoefficient);
        operate(`multiply`,coeff1,coeff2);
        let newcoeff1 = multiply(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    reenableDecimals();
    checkInfinity();
    signCount++;
});
divisionButton.addEventListener(`click`,function(e) {
    let coeff1;
    if (equalsButtonPressed) {
        sign = `division`;
        coeff1 = Number(res.textContent)
        firstCoefficient = coeff1;
        secondCoefficient = ``;
        equalsButtonPressed = false;
        return;
    }
    if (!initialized) {
        if (secondCoefficient === ``) {
            decimalButton.disabled = false;
            initialized = false;
            signCount = 1;
            sign = `division`
            return;
        }
        initialized = true;
    }
    if (initialized) {
        let fn = window[sign];
        if (secondCoefficient !== ``) {
            operate(sign,Number(firstCoefficient),Number(secondCoefficient));
        }
        else {
            firstCoefficient = res.textContent;
            secondCoefficient = ``;
            sign = `division`;
            return;
        }
        if (typeof fn === `function`) firstCoefficient = fn(Number(firstCoefficient),Number(secondCoefficient));
        sign = `division`;
        secondCoefficient = ``;
        if (decimalButton.disabled === true) {
            decimalButton.disabled = false;
        }
        return;
    }
    if (signCount >= 1) {
        if (secondCoefficient === ``) {
            res.textContent = firstCoefficient;
            return;
        }
        let coeff2 = Number(secondCoefficient);
        operate(`division`,coeff1,coeff2);
        let newcoeff1 = division(coeff1,coeff2);
        coeff1 = newcoeff1;
        firstCoefficient = coeff1;
        secondCoefficient = ``;
    }
    reenableDecimals();
    checkInfinity();
    signCount++;
});

function reenableDecimals() {
    decimalButton.disabled = false
}
function clearData() {
    firstCoefficient = ``;
    secondCoefficient = ``;
    sign = ``;
    signCount = 0;
    decimalCount = 0;
    initialized = false;
    equalsButtonPressed = false;
    decimalButton.disabled = false;
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