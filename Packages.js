//To get the time
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    log.innerHTML = `Current time is ${timeString}`;
}