function echo(text) {
    if (text && removeIndent(text)) {
        switch (removeIndent(text)) {
            case "on":
            case "off":
                echoState = text;
                echo();
                break;
            default:
                var div = document.createElement("div");
                div.innerText = text || "\n";
                log.appendChild(div);
        }
    } else {
        echo(`ECHO command is ${echoState}.`);
    }
}

function resetPrompt() {
    if (promptState == "default") prompt = pathToString() + "";
    promptElement.innerText = prompt;
    document.body.style.setProperty("--prompt-offset", promptElement.clientWidth + "px");
}

function toSpaces(array) {
    if (array) {
        var string = "";
        array.forEach((el, i) => {
            string += el;
            if (i + 1 < array.length) string += " ";
        });
        return string;
    }
}

function removeIndent(string) {
    var text = string;
    if (text) {
        while (text[0] == " " || text[0] == "	") text = text.slice(1, text.length);
        while (text[text.length - 1] == " " || text[text.length - 1] == "\t") text = text.slice(0, -1);
    }
    return text;
}

input.onkeydown = function (key) {
    switch (key.keyCode) {
        case 38:
            if (memory.length) {
                if (memoryPos > 0 && navigatingInMemory) memoryPos--;
                input.value = memory[memoryPos];
                input.selectionStart = memory[memoryPos].length;
                input.selectionEnd = memory[memoryPos].length;
                navigatingInMemory = true;
            }
            break;
        case 40:
            if (memory.length) {
                if (memoryPos < memory.length && navigatingInMemory) memoryPos++;
                if (memoryPos >= memory.length) memoryPos = memory.length - 1;
                input.value = memory[memoryPos];
                input.selectionStart = memory[memoryPos].length;
                input.selectionEnd = memory[memoryPos].length;
                navigatingInMemory = true;
            }
    }
}

function cmd() {
    runCmd("ver");
    echo('Made with 💖 by Joel Jessie Jolly.');
    echo('Type "help" for more information.');
    resetPrompt();
}

cmd();

function loop() {
    //
}

setInterval(() => {
    loop();
}, 1);
