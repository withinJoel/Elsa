//To get the time
function getTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    echo(`Current time is ${timeString}`);
}

//To get the timezone
function getTimeZone() {
    const timezoneOffset = new Date().getTimezoneOffset();
    echo(timezoneOffset);
}

//To get the Operating system
function getOS() {
    const platform = navigator.platform;
    echo(platform);
}

//Open Sites
function openLink(input) {
    const url = input.trim().replace(/^open:\b\s*/i, ''); // Trim spaces and replace "open"
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

//Open Instagram ID
function openInstagram(input) {
    const username = input.trim().replace(/^instagram:\b\s*/i, ''); // Trim spaces and replace "open"
    const instagramurl = 'https://www.instagram.com/'+username;
    window.open(instagramurl, '_blank');
}

//Open Twitter ID
function openTwitter(input) {
    let username = input.trim().replace(/^x:\b\s*/i, '');
    username = input.trim().replace(/^twitter:\b\s*/i, ''); // Trim spaces and replace "open"
    const instagramurl = 'https://www.twitter.com/'+username;
    window.open(instagramurl, '_blank');
}

//Open X ID
function openX(input) {
    const username = input.trim().replace(/^x:\b\s*/i, ''); // Trim spaces and replace "open"
    const xurl = 'https://www.x.com/'+username;
    window.open(xurl, '_blank');
}

//Open Twitter ID
function openOnlyfans(input) {
    const username = input.trim().replace(/^onlyfans:\b\s*/i, ''); // Trim spaces and replace "open"
    const instagramurl = 'https://www.onlyfans.com/'+username;
    window.open(instagramurl, '_blank');
}

//Network Speed
function getNetworkStatus() {
    const onlineStatus = navigator.onLine ? 'Online' : 'Offline'; // Online status
    echo(onlineStatus);
}

//Connection Type
function getConnectionType() {
    const connectionType = navigator.connection.effectiveType; // Effective network connection type (e.g., "4g", "3g")
    echo(connectionType);
}

//Connection Type
function getRamInfo() {
    const memory = navigator.deviceMemory;
    echo(memory);
}

//Screen Width
function getScreenWidth() {
    const screenWidth = screen.width; // Screen width in pixels
    echo(screenWidth);
}

//Screen Height
function getScreenHeight() {
    const screenHeight = screen.height; // Screen height in pixels
    echo(screenHeight);
}

//Color Depth
function getColorDepth() {
    const colorDepth = screen.colorDepth; // Color depth
    echo(colorDepth);
}

//Screen Resolution
function getScreenResolution() {
    const screenWidth = screen.width; // Screen width in pixels
    const screenHeight = screen.height; // Screen height in pixels
    const screenresolution = ("Screen width: " + screenWidth + " and screen height: " + screenHeight);
    echo(screenresolution);
}

//user Agent
function getUserAgent() {
    const userAgent = navigator.userAgent; // User agent string
    echo(userAgent);
}

//error
function errorhandling(error) {
    log.innerHTML = `${error}`;
}