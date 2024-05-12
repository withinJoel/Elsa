// Required Packages
function pathToString() {
    var string = "";
    path.forEach((dir, i) => {
        string += dir;
        if (i + 1 < path.length) string += "";
    });
    if (path.length == 1) string += "";
    return string;
}

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
        while (text[text.length - 1] == " " || text[text.length - 1] == "	") text.pop();
    }
    return text;
}

//To get the time
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    log.innerHTML = `Current time is ${timeString}`;
}