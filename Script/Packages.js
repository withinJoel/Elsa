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

function openUrl(input) {
    const url = input.trim().replace(/^url:\b\s*/i, ''); // Trim spaces and replace "open"
    if (url.includes("https://") || url.includes('www.')) {
        window.open(url, '_blank');
    } else {
        const website = 'https://www.' + url + ".com";
        window.open(website, '_blank');
    }
}

//Open Instagram ID
function openInstagram(input) {
    const username = input.trim().replace(/^instagram:\b\s*/i, ''); // Trim spaces and replace "open"
    const instagramurl = 'https://www.instagram.com/' + username;
    window.open(instagramurl, '_blank');
}

//Open Github ID
function openGithub(input) {
    const username = input.trim().replace(/^github:\b\s*/i, ''); // Trim spaces and replace "open"
    const githuburl = 'https://www.github.com/' + username;
    window.open(githuburl, '_blank');
}

//Open Twitter ID
function openTwitter(input) {
    let username = input.trim().replace(/^x:\b\s*/i, '');
    username = input.trim().replace(/^twitter:\b\s*/i, ''); // Trim spaces and replace "open"
    const twitterurl = 'https://www.twitter.com/' + username;
    window.open(twitterurl, '_blank');
}

//Open X ID
function openX(input) {
    const username = input.trim().replace(/^x:\b\s*/i, ''); // Trim spaces and replace "open"
    const xurl = 'https://www.x.com/' + username;
    window.open(xurl, '_blank');
}

//Open Snapchat ID
function openSnapchat(input) {
    const username = input.trim().replace(/^snapchat:\b\s*/i, ''); // Trim spaces and replace "open"
    const snapchaturl = 'https://www.snapchat.com/add/' + username;
    window.open(snapchaturl, '_blank');
}

//Open Linkedin ID
function openLinkedin(input) {
    const username = input.trim().replace(/^linkedin:\b\s*/i, ''); // Trim spaces and replace "open"
    const linkedinurl = 'https://www.linkedin.com/in/' + username;
    window.open(linkedinurl, '_blank');
}

//Open Clubhouse ID
function openClubhouse(input) {
    const username = input.trim().replace(/^clubhouse:\b\s*/i, ''); // Trim spaces and replace "open"
    const clubhouseurl = 'https://www.clubhouse.com/@' + username;
    window.open(clubhouseurl, '_blank');
}

//Open OnlyFans ID
function openOnlyfans(input) {
    const username = input.trim().replace(/^onlyfans:\b\s*/i, ''); // Trim spaces and replace "open"
    const onlyfansurl = 'https://www.onlyfans.com/' + username;
    window.open(onlyfansurl, '_blank');
}

//Network Speed
function getNetworkStatus() {
    const onlineStatus = navigator.onLine ? 'Online' : 'Offline'; // Online status
    echo(onlineStatus);
}

//IP Address
function getIPAddress() {
    fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => echo(`Your IP address is: ${data.ip}`))
  .catch(error => echo('Error fetching IP address:', error));
}

//Battery Info
function getBatteryInfo() {
    const isCharging = navigator.getBattery().then(function (battery) {
        return battery.charging;
    });

    isCharging.then(function (result) {
        echo(result ? 'Device is Charging' : 'Device is Not Charging');
    }).catch(function (error) {
        echo('Battery information not available:', error);
    });
}

//Connection Type
function getConnectionType() {
    const connectionType = navigator.connection.effectiveType; // Effective network connection type (e.g., "4g", "3g")
    echo(connectionType);
}

//Connection Speed
function getConnectionSpeed() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlinkSpeed = connection.downlink + " Mbps"; // Downlink speed in Mbps
    echo(downlinkSpeed);
}

//Ram Type
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

//Get Day Info
function getDay() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[dayOfWeek];
    echo(currentDay);
}

//Get Date Info
function getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    echo("year-month-day: " + formattedDate); // This will log the current date in the format "YYYY-MM-DD"

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
    echo(`${error}`);
}