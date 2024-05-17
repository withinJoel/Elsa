var input = document.getElementById("input"),
	log = document.getElementById("log"),
	promptElement = document.getElementById("prompt"),
	path = ["$"],
	vars = [],
	memory = [],
	memoryPos = 0,
	navigatingInMemory = false,
	promptState = "default",
	echoState = "on",
	toFile = false,
	toExec = [],
	prompt = pathToString() + ">";

function pathToString() {
	var string = "";
	path.forEach((dir, i) => {
		string += dir;
		if (i + 1 < path.length) string += "";
	});
	if (path.length == 1) string += "";
	return string;
}