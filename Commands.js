function runCmd(command, inMemory, fromInput) {
    if (command != undefined) {
        if (fromInput) {
            input.value = "";
            echo(prompt + command);
        }
        if (inMemory && command != "") {
            if (command != memory[memory.length - 1]) {
                memory.push(command);
            }
            if (!navigatingInMemory || command != memory[memoryPos]) {
                memoryPos = memory.length - 1;
            }
            navigatingInMemory = false;
        }
        if (!toFile) {
            var commandName = command.split(" ")[0],
                args = command.split(" ");
            args.shift();

            switch (commandName) {
                //Clear screen
                case "cls":
                    log.innerHTML = "";
                    break;
                case "clearscreen":
                    log.innerHTML = "";
                    break;
                //Exit
                case "exit":
                    window.open(document.URL, "about:blank", "width=977 height=455");
                    window.close();
                    break;
                //Echo
                case "echo":
                    echo(toSpaces(args));
                    break;
                case "echo.":
                    echo("\n");
                    break;
                //Version
                case "ver":
                    echo("Web Shell v1.0");
                    echo("Made with love by Joel Jolly.");
                    break;
                case 'time':
                    showTime();
                    break;
            }
        } else {
            if (command != ")") {
                toExec.push(command);
            } else {
                toFile = false;
                toExec.forEach((command) => {
                    runCmd(command);
                });
                toExec = [];
            }
        }

        if (fromInput) {
            resetPrompt();
        }
    }
}