/* -------------- variables declarations ---------------- */
// result section
const result = document.querySelector("#calculator_display #result");
const history = document.querySelector("#calculator_display #history");

// buttons
const buttons = document.querySelectorAll("#calculator_keys button");

// evaluate variables
let currNum, oldNum, operation;

// events
buttons.forEach((btn) => {
    btn.addEventListener("click", clickKey);
});

// functions
function clickKey(e) {
    // target the button
    let action = e.target;
    // store the button value
    let actionText = action.textContent;

    // if user input greater than 8 numbers
    if (result.textContent.length > 8) return;

    // access numbers buttons
    if (action.className === "number") {
        /**
         * check the number buttons
         * - if result section empty
         * - then: add one number
         * - otherwise: add new number to old
         */
        if (result.textContent === '') {
            result.textContent = actionText;
        } else {
            result.textContent += actionText;
        }

        // store the result section to current Number
        currNum = result.textContent;
        console.log(currNum, 'curr');
    }

    // access operators buttons 
    if (action.className === 'operator') {
        if (result.textContent !== '') {
            result.textContent = actionText; 
            oldNum = currNum;
            operation = actionText;
            history.textContent = actionText;

            console.log(operation, 'operation');
            console.log(oldNum, 'old');  
        } 
        result.textContent = '';
    }
    
    // access the dot 
    if (action.className === 'decimal') {
        if (result.textContent === '') {
            result.textContent = '0' + actionText;
        } else {
            result.textContent += actionText;
        }        
    }

    // access clear button 
    if (action.className === 'clear') {
        result.textContent = '';
        history.textContent = '';
        operation = '';
        currNum = 0;
    }

    // access delete button
    if (action.className === 'delete') {
        let textLength = result.textContent.length;
        result.textContent = result.textContent.slice(0, textLength - 1);
    }

    // access equal button 
    if (action.className === 'equal') {
        if (result.textContent === '') {
            return;
        } else {
            result.textContent = eval(oldNum, operation, currNum);
            currNum = result.textContent;
        }
    }
}

function eval(old, operation, current) {
    let result = '';
        if (operation === '+') {
            result = parseFloat(old) + parseFloat(current);
        } else if (operation === '-') {
            result = parseFloat(old) - parseFloat(current);
        } else if (operation === '*') {
            result = parseFloat(old) * parseFloat(current);
        } else if (operation === '/') {
            result = parseFloat(old) / parseFloat(current);
        } else {
            result = '';
        }
    return result;    
}
