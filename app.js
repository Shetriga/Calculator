let operators = [];
function add (num1, num2) {
    return (num1 + num2);
}
function subtract (num1, num2) {
    return (num1 - num2);
}
function multiply (num1, num2) {
    return (num1 * num2);
}
function divide (num1, num2) {
    return (num1 / num2);
}
function clearAll() {
    operators.length = 0;    // empty the operators array
    document.getElementById("screen").value = "";
}
let numbersArray = document.getElementsByClassName("number");
for (let i = 0; i < numbersArray.length; i++) {
    numbersArray[i].addEventListener("click", () => {
        if (numbersArray[i].textContent === "0") {
            if (document.getElementById('screen').value.length === 1 && document.getElementById("screen").value[0] === "0") {
                alert(`Sorry you have entered 0 once!`);
            } else if (document.getElementById("screen").value.length > 1 
                        && (document.getElementById("screen").value[document.getElementById("screen").value.length - 2] === "+" ||
                            document.getElementById("screen").value[document.getElementById("screen").value.length - 2] === "-" ||
                            document.getElementById("screen").value[document.getElementById("screen").value.length - 2] === "/" ||
                            document.getElementById("screen").value[document.getElementById("screen").value.length - 2] === "*")
                        && document.getElementById("screen").value[document.getElementById("screen").value.length - 1] === "0") {
                            alert(`Sorry you have already typed a '0' once after the operator`);
            } else {
                document.getElementById("screen").value += numbersArray[i].textContent;
            }
        } else {
            document.getElementById("screen").value += numbersArray[i].textContent;   
        }
    });
}
let operatorsArray = document.getElementsByClassName("operator");
for (let i = 0; i < operatorsArray.length; i++) {
    operatorsArray[i].addEventListener("click", () => {
        operators.push(operatorsArray[i].textContent);
        document.getElementById("screen").value += operatorsArray[i].textContent;
        console.log(`The added operator is ${operators[operators.length-1]}`);
    });
}
function check_screen_text(text) {
    if (text[text.length-1] === "+" ||
        text[text.length-1] === "-" ||
        text[text.length-1] === "*" ||
        text[text.length-1] === "/") {
        alert(`Error! Screen text cannot end with an operator`);
        return false;
    } else if(text[0] === "+" ||
                text[0] === "-" ||
                text[0] === "*" ||
                text[0] === "/") {
        alert(`Error! Screen text cannot start with a symbol`);
        return false;
    } else {
        return true;
    }
}
document.getElementById("equal").addEventListener("click", () => {
    if (operators.length === 0) {
        alert("You did not type any operator yet!");
    } else if (operators.length === 1) {
        if (check_screen_text(document.getElementById("screen").value)) {
            operate(document.getElementById("screen").value, operators[0]);
        }
    } else if (operators.length > 1) {
        if (check_screen_text(document.getElementById("screen").value)) {
            multiple_operations();
        }
    }
});
function multiple_operations() {
    let text = document.getElementById("screen").value;
    for (let i = 0; i < operators.length; i++) {
        if (i === operators.length - 1) {
            // console.log(`Last Iteration`);
            operate(text, operators[i]);
            // alert(`Final answer is ${parseInt(text)}`)
        } else {
            // console.log(operators[i]);
            let current_operator = text.indexOf(operators[i]);
            let next_operator = text.indexOf(operators[i + 1], (current_operator + 1));
            console.log(`Current operator at: ${current_operator} and next operator at: ${next_operator}`);
            let tmp_Array = [];
            for (let j = 0; j < text.length; j++) {
                tmp_Array.push(text[j]);
            }
            tmp_Array.splice(0, next_operator, operate(text.substring(0, next_operator), operators[i]));
            text = tmp_Array.join('');
        }
    }
}
document.getElementById("remove").addEventListener("click", () => {
    let screenText = document.getElementById("screen");
    if (screenText.value[screenText.value.length-1] === "+" ||
        screenText.value[screenText.value.length-1] === "-" ||
        screenText.value[screenText.value.length-1] === "*" ||
        screenText.value[screenText.value.length-1] === "/") {
        operators.pop();
        console.log("Removed an operator");
    }
    screenText.value = screenText.value.slice(0, -1);
});
document.getElementById("clear").addEventListener("click", () => {
    clearAll();
});
function operate(sliced_portion, operator_symbol) {
    let op_index = sliced_portion.indexOf(operator_symbol);
    // console.log(`The index of operator is ${op_index}`);
    let n1 = parseInt(sliced_portion.substring(0, op_index));
    let n2 = parseInt(sliced_portion.substring(op_index+1));
    // console.log(`${n1} : ${n2}`);
    let result = 0;
    if (operator_symbol === "+") {
        console.log(`Result is ${add(n1, n2)}`);
        result = add(n1, n2);
    } else if (operator_symbol === "-"){
        console.log(`Result is ${subtract(n1, n2)}`);
        result = subtract(n1, n2);
    } else if (operator_symbol === "*"){
        console.log(`Result is ${multiply(n1, n2)}`);
        result = multiply(n1, n2);
    } else {
        console.log(`Result is ${divide(n1, n2)}`);
        result = divide(n1, n2);
    }
    // clearAll();
    displayResult(result);
    return result.toString();
}
function displayResult(v) {
    document.getElementById("screen").value = v;
}