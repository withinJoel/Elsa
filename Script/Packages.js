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

//Help
function Help() {
    var url = 'Documentation/Syntax.md';
    window.open(url, '_blank');
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

//Search using Google
function searchViaGoogle(input) {
    const query = input.trim().replace(/^google:\b\s*/i, ''); // Trim spaces and replace "open"
    const queryurl = 'http://www.google.com/search?q=' + query;
    window.open(queryurl, '_blank');
}

//Search using DuckDuckGo
function searchViaDuckDuckGo(input) {
    const query = input.trim().replace(/^duckduckgo:\b\s*/i, ''); // Trim spaces and replace "open"
    const queryurl = 'http://www.duckduckgo.com/?q=' + query;
    window.open(queryurl, '_blank');
}

//Open Github ID
function openGithub(input) {
    const username = input.trim().replace(/^github:\b\s*/i, ''); // Trim spaces and replace "open"
    const githuburl = 'https://www.github.com/' + username;
    window.open(githuburl, '_blank');
}

//Search Pexels Video
function searchPexelsVid(input) {
    const query = input.trim().replace(/^pexels:video:\b\s*/i, ''); // Trim spaces and replace "open"
    const pexelsvidurl = 'https://www.pexels.com/search/videos/' + query + '/';
    window.open(pexelsvidurl, '_blank');
}

//Search Pexels Image
function searchPexelsImg(input) {
    const query = input.trim().replace(/^pexels:image:\b\s*/i, ''); // Trim spaces and replace "open"
    const pexelsimgurl = 'https://www.pexels.com/search/' + query + '/';
    window.open(pexelsimgurl, '_blank');
}

//Search Pixabay Image
function searchPixabayImg(input) {
    const query = input.trim().replace(/^pixabay:image:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabayimgurl = 'https://pixabay.com/images/search/' + query + '/';
    window.open(pixabayimgurl, '_blank');
}

//Search Pixabay Video
function searchPixabayVid(input) {
    const query = input.trim().replace(/^pixabay:video:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabayvidurl = 'https://pixabay.com/videos/search/' + query + '/';
    window.open(pixabayvidurl, '_blank');
}

//Search Pixabay Audio
function searchPixabayAud(input) {
    const query = input.trim().replace(/^pixabay:audio:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabayaudurl = 'https://pixabay.com/music/search/' + query + '/';
    window.open(pixabayaudurl, '_blank');
}

//Search Pixabay Gifs
function searchPixabayGif(input) {
    const query = input.trim().replace(/^pixabay:gif:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabaygifurl = 'https://pixabay.com/gifs/search/' + query + '/';
    window.open(pixabaygifurl, '_blank');
}

//Search Youtube
function searchYoutube(input) {
    const query = input.trim().replace(/^youtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const pexelsimgurl = 'https://www.youtube.com/results?search_query=' + query + '/';
    window.open(pexelsimgurl, '_blank');
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

//Search Wikipedia
function searchWiki(input) {
    const query = input.trim().replace(/^wikipedia:\b\s*/i, ''); // Trim spaces and replace "open"
    const wikiurl = 'https://en.wikipedia.org/wiki/' + query;
    window.open(wikiurl, '_blank');
}

//Search XNXX
function openXNXX(input) {
    const query = input.trim().replace(/^xnxx:\b\s*/i, ''); // Trim spaces and replace "open"
    const xnxxurl = 'https://xnxx.health/search/' + query;
    window.open(xnxxurl, '_blank');
}

//Search Porn gifs
function searchPorngifs(input) {
    const query = input.trim().replace(/^porngifs:\b\s*/i, ''); // Trim spaces and replace "open"
    const porngifsurl = 'https://porngifs.xxx/?s=' + query;
    window.open(porngifsurl, '_blank');
}

//Search Reddit
function searchReddit(input) {
    const query = input.trim().replace(/^reddit:\b\s*/i, ''); // Trim spaces and replace "open"
    const redditurl = 'https://www.reddit.com/r/' + query + '/';
    window.open(redditurl, '_blank');
}

//Search tenor
function searchTenor(input) {
    const query = input.trim().replace(/^tenor:\b\s*/i, ''); // Trim spaces and replace "open"
    const tenorurl = 'https://tenor.com/search/' + query + '-gifs';
    window.open(tenorurl, '_blank');
}

//Search Red gifs
function searchRedgifs(input) {
    const query = input.trim().replace(/^redgifs:\b\s*/i, ''); // Trim spaces and replace "open"
    const redgifsurl = 'https://www.redgifs.com/gifs/' + query;
    window.open(redgifsurl, '_blank');
}

//Search itsex
function searchItsex(input) {
    const query = input.trim().replace(/^itsex:\b\s*/i, ''); // Trim spaces and replace "open"
    const itsexurl = 'https://it.sex.com/search/gifs?query=' + query;
    window.open(itsexurl, '_blank');
}

//Search Hdtube
function openHdtube(input) {
    const query = input.trim().replace(/^hdtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const hdtubeurl = 'https://www.hdtube.porn/tags/' + query + '/';
    window.open(hdtubeurl, '_blank');
}

//Search Pussyspace
function openPussyspace(input) {
    const query = input.trim().replace(/^pussyspace:\b\s*/i, ''); // Trim spaces and replace "open"
    const pussyspaceurl = 'https://www.pussyspace.com/' + query + '/';
    window.open(pussyspaceurl, '_blank');
}

//Search Pornpics
function openPornpics(input) {
    const query = input.trim().replace(/^pornpics:\b\s*/i, ''); // Trim spaces and replace "open"
    const pornpicsurl = 'https://www.pornpics.com/?q=' + query;
    window.open(pornpicsurl, '_blank');
}

//Search Indianporn365
function openIndianporn365(input) {
    const query = input.trim().replace(/^indianporn365:\b\s*/i, ''); // Trim spaces and replace "open"
    const indianporn365url = 'https://www.indianporn365.net/?s=' + query;
    window.open(indianporn365url, '_blank');
}

//Search Babespedia
function openBabespedia(input) {
    const query = input.trim().replace(/^babespedia:\b\s*/i, ''); // Trim spaces and replace "open"
    const babespediaurl = 'https://www.babepedia.com/babe/' + query;
    window.open(babespediaurl, '_blank');
}

//Search Goodporn
function openGoodPorn(input) {
    const query = input.trim().replace(/^goodporn:\b\s*/i, ''); // Trim spaces and replace "open"
    const goodpornurl = 'https://goodporn.to/search/' + query + '/';
    window.open(goodpornurl, '_blank');
}

//Search Xhamster
function openXhamster(input) {
    const query = input.trim().replace(/^xhamster:\b\s*/i, ''); // Trim spaces and replace "open"
    const xhamsterurl = 'https://xhamster.desi/search/' + query;
    window.open(xhamsterurl, '_blank');
}

//Search Redtube
function openRedtube(input) {
    const query = input.trim().replace(/^redtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const redtubeurl = 'https://www.redtube.net/?search=' + query;
    window.open(redtubeurl, '_blank');
}

//Search YouPorn
function openYouporn(input) {
    const query = input.trim().replace(/^youporn:\b\s*/i, ''); // Trim spaces and replace "open"
    const youpornurl = 'https://www.you-porn.com/search/?search-btn=&query=' + query;
    window.open(youpornurl, '_blank');
}

//Search Tube8
function openTube8(input) {
    const query = input.trim().replace(/^tube8:\b\s*/i, ''); // Trim spaces and replace "open"
    const tube8url = 'https://www.tube8.es/searches.html?q=' + query;
    window.open(tube8url, '_blank');
}

//Search Milfporn
function openMilfporn(input) {
    const query = input.trim().replace(/^milfporn:\b\s*/i, ''); // Trim spaces and replace "open"
    const milfpornurl = 'https://www.milfporn.tv/tags/milf-' + query + '/';
    window.open(milfpornurl, '_blank');
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

//Reload or Refresh the page
function refreshPage() {
    location.reload();
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
    navigator.getBattery().then(battery => {
        const level = battery.level * 100;
        const charging = battery.charging ? 'Charging' : 'Discharging';
        echo(`Battery Level: ${level}%`);
        echo(`Battery Status: ${charging}`);
    }).catch(error => echo('Error getting battery status:', error));
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

//WebRTC
function getWebRTCInfo() {
    const isWebRTCSupported = typeof RTCPeerConnection === 'function';
    echo(`WebRTC Supported: ${isWebRTCSupported}`);
}

//Device type
function getDeviceType() {
    const isMobile = /Mobi/i.test(navigator.userAgent);
    echo(`Device Type: ${isMobile ? 'Mobile' : 'Desktop'}`);
}

//Random Color
function getRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    echo(`Random Color: ${randomColor}`);
}

//Random Number
function getRandomNumber() {
    min = 0;
    max = 999999999999999;
    echo(Math.floor(Math.random() * (max - min + 1)) + min);
}

//Random Alphabet
function getRandomAlphabet() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    echo(alphabet[randomIndex]);
}

//Convert Binary to Decimal
function binaryToDecimal(number) {
    const binary = number.trim().replace(/^convert:binarytodecimal:\b\s*/i, '');
    // Check if the input is a valid binary number
    if (!/^[01]+$/.test(binary)) {
        echo('Invalid binary number');
    }

    let decimal = 0;
    for (let i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        decimal += parseInt(binary[i]) * Math.pow(2, j);
    }

    echo(decimal);
}

//Convert Decimal to binary
function decimalToBinary(number) {
    const decimal = parseInt(number.trim().replace(/^convert:decimaltobinary:\b\s*/i, ''), 10);
    if (isNaN(decimal)) {
        echo('Invalid decimal number');
        return;
    }

    const binary = decimal.toString(2);
    echo(binary);
}

//Convert Binary to Octal
function binaryToOctal(number) {
    const binary = number.trim().replace(/^convert:binarytooctal:\b\s*/i, '');
    if (!/^[01]+$/.test(binary)) {
        echo('Invalid binary number');
        return;
    }

    const decimal = parseInt(binary, 2);
    const octal = decimal.toString(8);
    echo(octal);
}

//Convert Octal to Binary
function octalToBinary(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltobinary:\b\s*/i, ''), 8);
    if (isNaN(octal)) {
        echo('Invalid octal number');
        return;
    }

    const binary = octal.toString(2);
    echo(binary);
}

//Convert Hexadecimal to Binary
function hexadecimalToBinary(number) {
    const hexadecimal = number.trim().replace(/^convert:hexadecimaltobinary:\b\s*/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {
        echo('Invalid hexadecimal number');
        return;
    }

    const decimal = parseInt(hexadecimal, 16);
    const binary = decimal.toString(2);
    echo(binary);
}

//Convert Hexadecimal to Decimal
function hexadecimalToDecimal(number) {
    const hexadecimal = number.trim().replace(/^convert:hexadecimaltodecimal:\b\s*/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {
        echo('Invalid hexadecimal number');
        return;
    }

    const decimal = parseInt(hexadecimal, 16);
    echo(decimal);
}

//Convert Hexadecimal to Octal
function hexadecimalToOctal(number) {
    const hexadecimal = number.trim().replace(/^convert:hexadecimaltooctal:\b\s*/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {
        echo('Invalid hexadecimal number');
        return;
    }

    const decimal = parseInt(hexadecimal, 16);
    const octal = decimal.toString(8);
    echo(octal);
}

//Convert Binary to Hexadecimal
function binaryToHexadecimal(number) {
    const binary = number.trim().replace(/^convert:binarytohexadecimal:\b\s*/i, '');
    if (!/^[01]+$/.test(binary)) {
        echo('Invalid binary number');
        return;
    }

    const decimal = parseInt(binary, 2);
    const hexadecimal = decimal.toString(16).toUpperCase();
    echo(hexadecimal);
}

//Mouse Position
function getMousePosition() {
    const handleMouseMove = event => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        echo(`Mouse Position: (${mouseX}, ${mouseY})`);
        document.removeEventListener('mousemove', handleMouseMove);
    };
    document.addEventListener('mousemove', handleMouseMove);
}

//Generate QR Code
function createQrCode(input) {
    const qr = input.trim().replace(/^createqr:\b\s*/i, '');
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=100x100`;

    const newTab = window.open(qrImageUrl, '_blank');
    if (newTab) {
        newTab.focus();
    } else {
        alert('Please allow pop-ups for this website to view the QR code.');
    }
}

//Generate a password
function createPassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    echo(`Password: ${password}`);
}

//error
function errorhandling() {
    echo(`Not a valid command.`);
}

//Made with 💖 by Joel Jolly