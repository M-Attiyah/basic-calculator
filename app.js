/**
 * create basic calculator can add or subtract or multiply or divide two numbers
 * TODO: keep code cleaner and easy to read
 */

// define the elements to access the buttons
const buttons = document.querySelectorAll("#calculator_keys div button");

// define the history element to show all actions
const history = document.querySelector("#calculator_display #history");

// define the display element to show the numbers and operators and calc them
const display = document.querySelector("#calculator_display #display");

const h3 = document.querySelector("h3");

// define the operator / ( old / current numbers )
let operator, currentNumber, oldNumber;

// check elements
// console.log(buttons, history, display); ✅

/**
 * we need to access all keys to get value of any key will user click on it
 * - to do that we need to loop through buttons elements to access all of them
 *  - user foreach to loop with @param (btn)
 *  @return (btn) to use it for get value from button
 *  - we need to group the operators buttons
 *  - we need to group the numbers buttons
 *  - we need to group the equals and del and clear and decimal
 */

buttons.forEach((btn) => {
    // when user click the button will get the value from button
    btn.addEventListener("click", (e) => {
        // declare variable to store the user action
        let action = e.target;
        let action_text = action.textContent;

        // group the numbers
        if (action.className === "number") {
            display.textContent += action_text
            currentNumber = display.textContent;
        }

        if (action.className === "operator") {
            if (display.textContent !== '') {
                history.textContent = action_text
            }
            oldNumber = currentNumber;
            operator = action_text;
            display.textContent = "";
            return false
        }

        if (action.className === "decimal") {
            if (display.textContent !== "") {
                display.textContent += action_text;
            }
            return false;
        }

        // when click equal will take the old number and operator and current number to put it in calculate function to get result
        if (action.className === "equal") {
            if (display.textContent !== "") {
                display.textContent = calculate(
                    oldNumber,
                    operator,
                    currentNumber
                );
                currentNumber = display.textContent;
            }
            return false;
        }

        // when click clear button will reset everything
        if (action.className === "clear") {
            display.textContent = "";
            history.textContent = "";
            oldNumber = "";
            currentNumber = "";
            operator = "";
        }

        // when click delete button will delete numbers one by one
        if (action.className === "delete") {
            display.textContent = display.textContent.slice(
                0,
                display.textContent.length - 1
            );
        }
    });
});

function calculate(number1, operator, number2) {
    let result = "";

    if (operator === "+") {
        result = Number(number1) + Number(number2);
    } else if (operator === "-") {
        result = Number(number1) - Number(number2);
    } else if (operator === "*") {
        result = Number(number1) * Number(number2);
    } else if (operator === "/") {
        result = Number(number1) / Number(number2);
    } else {
        result = "error";
        setTimeout(function () {
            display.textContent = "";
        }, 1100);
    }

    return result;
}

