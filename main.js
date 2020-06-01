const MAX_BOXES = 20;

var keyboard = document.querySelector("#calculator > #components > #keyboard");
var input = document.querySelector("#calculator > #components > #textbox");

keyboard.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";



function calculateExpression(expression, operators)
{
    var expArray = expression.split(" ");

    for(var i = 0; i < expArray.length; i++)
    {
        if(operators.indexOf(expArray[i]) !== -1)
        {
            var operator = expArray[i];
            var operand1 = parseInt(expArray[i - 2]);
            var operand2 = parseInt(expArray[i - 1]);
            var result = 0;

            //turn operands to integers and results to strings.
            if(operator === "+") result = (operand1 + operand2).toString();
            else if(operator === "-") result = (operand1 - operand2).toString();
            else if(operator === "*") result = (operand1 * operand2).toString();
            else if(operator === "/") result = (operand1 / operand2).toString();

            expArray.splice(i - 2, 3, result);
            i += -3;
        }
    }
    return expArray[0];
}

function checkParenthesesPairing(input_string)
{
    var test_arr = input_string.split("");
    var stack = [];
    
    for(var i = 0; i < input_string.length; i++)
    {
        if(test_arr[i] === "(") stack.push(test_arr[i]);
        else if(test_arr[i] === ")")
        {
            if(stack.length > 0) stack.pop();
            else return false;
        } 
    }

    if(stack.length === 0) return true;
    else return false;
}

function evaluateExpression()
{
    const precedence = { "*":2, "/":2, "+":1, "-":1, "(":3};
    var pattern = /^((\(*([0-9|\)*]+[\+|\-|\*|\/]?)\)*)+)$/;
    var input_str = input.value;
    var queue = [];
    var stack = [];
    var operands = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var operators = ["*", "+", "-", "/", "(", ")"];
    var isOperand = true;
    var isOperator = false;

    if(pattern.test(input_str) === false) return "Not a valid expression!";
    if(checkParenthesesPairing(input_str) === false) return "Incorrect parentheses pairing";

    for(var input_str_itr = 0; input_str_itr < input_str.length; input_str_itr++)
    {
        var current = input_str[input_str_itr];

        //Every time we switch from an operand to an operator or vice versa,
        //we add a space to the queue.
        if(current in operands)
        {
            if(!isOperand)
            {
                queue.push(" ");
                isOperand = true;
                isOperator = false;
            }
            queue.push(current);
        }

        else if(operators.indexOf(current) !== -1)
        {
            if(isOperand)
            {
                isOperand = false;
                isOperator = true;
            }
            if(current == "(") stack.push(current);
            else if(current == ")")
            {
                while(stack[stack.length - 1] !== "(")
                {
                    if(stack.length === 0) return "Invalid parentheses pairing!";
                    else 
                    {
                        queue.push(" ");
                        queue.push(stack.pop());
                    }
                };
                stack.pop();
            }
        
            else if(stack.length !== 0 && precedence[current] <= precedence[stack[stack.length - 1]])
            {
                while(precedence[current] <= precedence[stack[stack.length - 1]])
                {
                    if(precedence[stack[stack.length - 1]] === 3) break;
                    var top = stack.pop();
                    queue.push(" ");
                    queue.push(top);
                }
                stack.push(current);
            }
            else if(stack.length === 0 || precedence[current] > precedence[stack[stack.length - 1]]) stack.push(current);
        }
    }

    while(stack.length !== 0)
    {
        queue.push(" ");
        queue.push(stack.pop());
    }
    return calculateExpression(queue.join(""), operators);
}

for(var i = 0; i < MAX_BOXES; i++)
{
    var button = document.createElement("button");
    button.classList.add("kbutton");
    
    switch(i)
    {
        case 0:
            button.textContent = "C";
            button.setAttribute("data-key", "36");
            break;
        case 1:
            button.textContent = "()";
            break;
        case 2:
            button.textContent = "%";
            button.setAttribute("data-key", "37");
            break;
        case 3:
            button.textContent = "/";
            button.setAttribute("data-key", "47");
            break;
        case 4:
            button.textContent = "7";
            button.setAttribute("data-key", "55");
            break;
        case 5:
            button.textContent = "8";
            button.setAttribute("data-key", "56");
            break;
        case 6:
            button.textContent = "9";
            button.setAttribute("data-key", "57");
            break;
        case 7:
            button.textContent = "*";
            button.setAttribute("data-key", "42");
            break;
        case 8:
            button.textContent = "4";
            button.setAttribute("data-key", "52");
            break;
        case 9:
            button.textContent = "5";
            button.setAttribute("data-key", "53");
            break;
        case 10:
            button.textContent = "6";
            button.setAttribute("data-key", "54");
            break;
        case 11:
            button.textContent = "-";
            button.setAttribute("data-key", "45")
            break;
        case 12:
            button.textContent = "1";
            button.setAttribute("data-key", "49")
            break;
        case 13:
            button.textContent = "2";
            button.setAttribute("data-key", "50");
            break;
        case 14:
            button.textContent = "3";
            button.setAttribute("data-key", "51");
            break;
        case 15:
            button.textContent = "+";
            button.setAttribute("data-key", "43");
            break;
        case 16:
            button.textContent = "+/-";
            break;
        case 17:
            button.textContent = "0";
            button.setAttribute("data-key", "48");
            break;
        case 18:
            button.textContent = ".";
            button.setAttribute("data-key", "189");
            break;
        default:
            button.textContent = "=";
            button.setAttribute("data-key", "13");
    }
    
    keyboard.appendChild(button);
}

//buttons were not added until later, so kbuttons is declared here instead of on in the beginning.
const kbuttons = document.querySelectorAll(".kbutton");

window.addEventListener('keydown', (e) =>
{
    var keyCode = e.keyCode;
    if(keyCode === 191) keyCode = 47;
    else if(e.shiftKey === true && keyCode === 187) keyCode = 43;
    else if(keyCode === 189) keyCode = 45;
    else if(e.shiftKey === true && keyCode === 56) keyCode = 42;
    const key = document.querySelector(`.kbutton[data-key="${keyCode}"]`);

    if(!key) return;

    key.classList.add("kbutton_pressed");

    function removeTransition(e)
    {
        if(e.propertyName !== "transform") return;
        this.classList.remove("kbutton_pressed");
        if(this.textContent === "=") console.log(evaluateExpression());
    }
    

    for(var kbuttons_i = 0; kbuttons_i < kbuttons.length; kbuttons_i++)
    {
        kbuttons[kbuttons_i].addEventListener("transitionend", removeTransition);
    }
    if(key.textContent !== "=") input.setAttribute('value', input.getAttribute('value') + String.fromCharCode(keyCode));
});


