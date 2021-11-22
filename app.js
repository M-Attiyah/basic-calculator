// declare display section
const display = document.querySelector("#calculator_display #result");
const history = document.querySelector("#calculator_display #history");

// declare keys section
const keys = document.querySelectorAll("#calculator_keys button");
// declare operation variables
let oldNum, currNum, operator;

keys.forEach((key) => {
    // access all keys by class name
    key.addEventListener("click", (e) => {
        /**
         * declare
         * action (to target button)
         * actionText (to get text of target button)
         */
        let action = e.target;
        let action_text = e.target.textContent;

        /**
         * check the name of class
         */

        // numbers
        if (action.className === "number") {
            if (
                display.textContent === '0' || 
                display.textContent.slice(0, 1) === '+' ||
                display.textContent.slice(0, 1) === '-' ||
                display.textContent.slice(0, 1) === '*' ||
                display.textContent.slice(0, 1) === '/'
                ) {
                display.textContent = action_text;
            } else {
                display.textContent += action_text;
            }
            
            history.textContent += action_text;
            currNum = display.textContent;
            console.log(currNum, "curr");
        }

        // operators
        if (action.className === "operator") {
            display.textContent = action_text;
            history.textContent = history.textContent + action_text;
            oldNum = currNum;
            operator = action_text;
        }

        // decimal
        if (action.className === "decimal") {
            if (display.textContent === '0') {
                display.textContent = '0.';
            } else {
                display.textContent += action_text;
            }
        }

        // delete
        if (action.className === "delete") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            
            if (display.textContent.length < 1) {
                display.textContent = 0;
            }
        }

        // clear
        if (action.className === "clear") {
            display.textContent = '0';
            history.textContent = '';
        }

        // equal
        if (action.className === "equal") {
            display.textContent = eval(oldNum, operator, currNum);
            currNum = display.textContent;
        }
    });
});


function eval(n1, o, n2) {
    let result = '';

    if (o === '+') {
        result = Number(n1) + Number(n2);
    } else if (o === '-') {
        result = Number(n1) - Number(n2);
    } else if (o === '*') {
        result = Number(n1) * Number(n2);
    } else if (o === '/') {
        result = Number(n1) / Number(n2);
    } else {
        result = '0';
    }
    
    return result;
}

