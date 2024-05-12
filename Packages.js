//To get the time
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    log.innerHTML = `Current time is ${timeString}`;
}

//Open Sites
function openLink(input) {
    const url = input.trim().replace(/^open\b\s*/i, ''); // Trim spaces and replace "open"
    if ((url === "developer") || (url === "dev")){
        const website = 'https://joeljolly.pages.dev';
        window.open(website, '_blank');
    } else if (url.includes("https://") || url.includes('www.')) {
        window.open(url, '_blank');
    } else {
        const website = 'https://www.' + url + ".com";
        window.open(website, '_blank');
    }
}