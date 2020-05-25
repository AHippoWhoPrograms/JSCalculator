const MAX_BOXES = 20;

var keyboard = document.querySelector("#calculator > #components > #keyboard");
var input = document.querySelector("#calculator > #components > #textbox");

keyboard.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";

function evaluateExpression()
{
    var pattern = /[[0-9]+[\+|-|\*|\/]]+/i;
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
            button.textContent = "9"
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

window.addEventListener('keydown', (e) =>
{
    var keyCode = e.keyCode;
    if(keyCode === 191) keyCode = 47;
    else if(keyCode === 187) keyCode = 43;
    else if(keyCode === 189) keyCode = 45;
    else if(e.shiftKey === true && keyCode === 56) keyCode = 42;
    const key = document.querySelector(`.kbutton[data-key="${keyCode}"]`);
    
    console.log(key);
    console.log(e.keyCode)
    if(!key) return;

    key.classList.add("kbutton_pressed");

    function removeTransition(e)
    {
        if(e.propertyName !== "transform") return;
        this.classList.remove("kbutton_pressed");
        if(this.textContent === "=") console.log(evaluateExpression());
    }
    const kbuttons = document.querySelectorAll(".kbutton");

    kbuttons.forEach(kb => 
    {
        kb.addEventListener('transitionend', removeTransition);
    });
    if(key.textContent !== "=") input.setAttribute('value', input.getAttribute('value') + String.fromCharCode(keyCode));
});


