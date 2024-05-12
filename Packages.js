//To get the time
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    log.innerHTML = `Current time is ${timeString}`;
}

//To get the date
function getCurrentDate() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
    const year = currentDate.getFullYear();
    return `${date}/${month}/${year}`;
}

//To get the day
function getCurrentDay() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
}

//Open Sites
function openLink(input) {
    const url = input.trim().replace(/^open\b\s*/i, ''); // Trim spaces and replace "open"
    if ((url === "developer") || (url === "dev")) {
        const website = 'https://joeljolly.pages.dev';
        window.open(website, '_blank');
    } else if (url.includes("https://") || url.includes('www.')) {
        window.open(url, '_blank');
    } else {
        const website = 'https://www.' + url + ".com";
        window.open(website, '_blank');
    }
}