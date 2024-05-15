//Version
function Version() {
    echo("Elsa v1.1");
    echo('Made with love by Joel Jessie Jolly.');
}

//Change Background Color
function changeBodyColor(userColor) {

    // Check if the input is a valid color
    var isValidColor = /^#[0-9A-F]{6}$/i.test(userColor) || /^[a-z]+$/i.test(userColor);

    if (isValidColor) {
        // Set the body background color
        document.body.style.backgroundColor = userColor;
    } else {
        echo("Invalid color!");
    }
}

//Change Color
function changeColor(userColor) {

    // Check if the input is a valid color
    var isValidColor = /^#[0-9A-F]{6}$/i.test(userColor) || /^[a-z]+$/i.test(userColor);

    if (isValidColor) {
        // Set the body background color
        document.body.style.color = userColor;
    } else {
        echo("Invalid color!");
    }
}

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

//search Codepen
function searchCodepen(input) {
    const data = input.trim().replace(/^codepen:\b\s*/i, ''); // Trim spaces and replace "open"
    const codepenurl = 'https://codepen.io/search/pens?q=' + data;
    window.open(codepenurl, '_blank');
}

//search Amazon
function searchAmazon(input) {
    const data = input.trim().replace(/^amazon:\b\s*/i, ''); // Trim spaces and replace "open"
    const amazonurl = 'https://www.amazon.com/s?k=' + data;
    window.open(amazonurl, '_blank');
}

//search Flipart
function searchFlipkart(input) {
    const data = input.trim().replace(/^flipkart:\b\s*/i, ''); // Trim spaces and replace "open"
    const amazonurl = 'https://www.flipkart.com/search?q=' + data;
    window.open(amazonurl, '_blank');
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

//Search Spotify
function searchSpotify(input) {
    const query = input.trim().replace(/^spotify:\b\s*/i, ''); // Trim spaces and replace "open"
    const spotifyurl = 'https://open.spotify.com/search/' + query + '';
    window.open(spotifyurl, '_blank');
}

//Search Yts
function searchYts(input) {
    const query = input.trim().replace(/^yts:\b\s*/i, ''); // Trim spaces and replace "open"
    const ytsurl = 'https://yts.mx/browse-movies/' + query + '/all/all/0/latest/0/all';
    window.open(ytsurl, '_blank');
}

//Search Youtube
function searchYoutube(input) {
    const query = input.trim().replace(/^youtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const youtubeurl = 'https://www.youtube.com/results?search_query=' + query + '/';
    window.open(youtubeurl, '_blank');
}

//Search Pinterest
function searchPinterest(input) {
    const query = input.trim().replace(/^pinterest:\b\s*/i, ''); // Trim spaces and replace "open"
    const pinteresturl = 'https://pinterest.com/search/pins/?q=' + query + '&rs=typed';
    window.open(pinteresturl, '_blank');
}

//Search Godaddy
function searchGodaddy(input) {
    const query = input.trim().replace(/^godaddy:\b\s*/i, ''); // Trim spaces and replace "open"
    const godaddyurl = 'https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=' + query;
    window.open(godaddyurl, '_blank');
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

//Search Porn
function openPorn(input) {
    const query = input.trim().replace(/^porn:\b\s*/i, ''); // Trim spaces and replace "open"
    const pornurl = 'https://www.porn.com/search?sq=' + query;
    window.open(pornurl, '_blank');
}

//Search Xvideos
function openXvideos(input) {
    const query = input.trim().replace(/^xvideos:\b\s*/i, ''); // Trim spaces and replace "open"
    const xvideosurl = 'https://www.xvideos.com/?k=' + query;
    window.open(xvideosurl, '_blank');
}

//Search Siliconwives
function searchSiliconwives(input) {
    const query = input.trim().replace(/^siliconwives:\b\s*/i, ''); // Trim spaces and replace "open"
    const siliconwivesurl = 'https://www.siliconwives.com/search?q=' + query;
    window.open(siliconwivesurl, '_blank');
} 

//Search Yourdoll
function searchYourdoll(input) {
    const query = input.trim().replace(/^yourdoll:\b\s*/i, ''); // Trim spaces and replace "open"
    const yourdollurl = 'https://www.yourdoll.com/?s=' + query + '&post_type=product';
    window.open(yourdollurl, '_blank');
} 

//Search Czechvr
function openCzechvr(input) {
    const query = input.trim().replace(/^czechvr:\b\s*/i, ''); // Trim spaces and replace "open"
    const czechvrurl = 'https://www.czechvr.com/vyhledavani?search=' + query;
    window.open(czechvrurl, '_blank');
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

//Convert Octal to Decimal
function octalToDecimal(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltodecimal:\b\s*/i, ''), 8);
    if (isNaN(octal)) {
        echo('Invalid octal number');
        return;
    }

    echo(octal);
}

//Convert Octal to Hexadecimal
function octalToHexadecimal(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltohexadecimal:\b\s*/i, ''), 8);
    if (isNaN(octal)) {
        echo('Invalid octal number');
        return;
    }

    const hexadecimal = octal.toString(16).toUpperCase();
    echo(hexadecimal);
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

// Decode
function decode(input) {
    const data = input.trim().replace(/^decode:\s*/i, '');
    try {
        const decoded = atob(data);
        echo(`Base64 decoded: ${decoded}`);
    } catch (error) {
        echo(`Error decoding: ${error.message}`);
    }
}

//Latency
function measureLatency(url) {
    const startTime = performance.now(); // Get the current time before sending the request

    return fetch(url)
        .then(response => {
            const endTime = performance.now(); // Get the current time after receiving the response
            const latency = endTime - startTime; // Calculate the latency by subtracting start time from end time
            return Promise.resolve(latency); // Resolve the promise with the calculated latency
        })
        .catch(error => {
            console.error('Error measuring latency:', error);
            return Promise.reject(error); // Reject the promise if there's an error
        });
}

//Encode
function encode(input) {
    const data = input.trim().replace(/^encode:\s*/i, '');
    try {
        const encoded = btoa(data);
        echo(`Base64 encoded: ${encoded}`);
    } catch (error) {
        echo(`Error encoding: ${error.message}`);
    }
}

//String Reverse
function reverseString(input) {
    const data = input.trim().replace(/^string:reverse:\s*/i, '');
    const reversed = data.split('').reverse().join('');
    echo(`Reversed string: ${reversed}`);
}

//String Count Characters
function countCharacters(input) {
    const data = input.trim().replace(/^string:count:characters:\s*/i, '');
    const count = data.length;
    echo(`Number of characters: ${count}`);
}

//String Count Words
function countWords(input) {
    const words = input.trim().split(/\s+/).filter(word => word !== '').length;
    echo(`Number of words: ${words}`);
}

//Camera
function openCamera() {
    // Check if the browser supports mediaDevices and getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Create a new window with video stream
                const newWindow = window.open('', '_blank', 'width=670,height=560');
                if (newWindow) {
                    // Create a video element in the new window
                    const video = document.createElement('video');
                    video.autoplay = true;
                    video.srcObject = stream;
                    newWindow.document.body.appendChild(video);
                } else {
                    echo('Failed to open new window.');
                }
            })
            .catch(function (error) {
                echo('Error accessing the webcam:', error);
            });
    } else {
        echo('getUserMedia is not supported on this browser.');
    }
}

//Check Palindrome
function isPalindrome(input) {
    let cleanedInput = input.trim().replace(/^check:palindrome:\s*/i, '');
    const reversed = cleanedInput.split('').reverse().join('');
    const palindrome = cleanedInput === reversed;
    echo('palindrome: ' + palindrome);
}

//Check Prime
function isPrimeNumber(num) {
    let n = num.trim().replace(/^check:prime:\s*/i, '');
    if (n <= 1) {
        echo(`${n} is not a prime number.`);
        return;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            echo(`${n} is not a prime number.`);
            return;
        }
    }
    echo(`${n} is a prime number.`);
}

//Check Composite
function isCompositeNumber(num) {
    let n = num.trim().replace(/^check:composite:\s*/i, '');
    if (n <= 1) {
        echo(`${n} is neither prime nor composite.`);
        return;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            echo(`${n} is a composite number.`);
            return;
        }
    }
    echo(`${n} is not a composite number.`);
}

// Factorial
function calculateFactorial(n) {
    let num = n.trim().replace(/^factorial:\s*/i, '');
    if (num < 0) {
        echo('Factorial is not defined for negative numbers.');
        return;
    }
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
        factorial *= i;
    }
    echo(`Factorial of ${num}: ${factorial}`);
}

//Check Odd
function isOddNumber(num) {
    let n = num.trim().replace(/^check:odd:\s*/i, '');
    if (n % 2 !== 0) {
        echo(`${n} is an odd number.`);
    } else {
        echo(`${n} is not an odd number.`);
    }
}

//Check Even
function isEvenNumber(num) {
    let n = num.trim().replace(/^check:even:\s*/i, '');
    if (n % 2 === 0) {
        echo(`${n} is an even number.`);
    } else {
        echo(`${n} is not an even number.`);
    }
}

//Fibonacci
function fibonacci(num) {
    let n = num.trim().replace(/^fibonacci:\s*/i, '');
    const sequence = [0, 1];
    for (let i = 2; i <= n; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    echo(`Fibonacci sequence up to ${n}: ${sequence.slice(0, n + 1).join(', ')}`);
}

//Multiplication Table
function multiplicationTable(num) {
    let n = num.trim().replace(/^multiplicationtable:\s*/i, '');
    echo(`Multiplication table for ${n}:`);
    for (let i = 1; i <= 10; i++) {
        echo(`${n} x ${i} = ${n * i}`);
    }
}

//Square Root
function squareRoot(num) {
    let n = num.trim().replace(/^squareroot:\s*/i, '');
    const result = Math.sqrt(n);
    echo(`Square root of ${n} is ${result}`);
}

//error
function errorhandling() {
    echo(`Not a valid command.`);
}

//Made with 💖 by Joel Jolly