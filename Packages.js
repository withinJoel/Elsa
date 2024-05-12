//To get the time
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    log.innerHTML = `Current time is ${timeString}`;
}

function openLink(input) {
    const test = input;
    const url = input.trim().replace(/^open:\b\s*/i, ''); // Trim spaces and replace "open"
    if (url.includes("https://") || url.includes('www.')) {
        window.open(url, '_blank');
    } else {
        const website = 'https://www.' + url + ".com";
        window.open(website, '_blank');
    }
}