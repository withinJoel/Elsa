// Dictionary to store command information
const commandDictionary = {
    elsa: "Basic info.",
    ver: "To display the version of Elsa.",
    version: "To display the version of Elsa.",
    developer: "To know about the developer.",
    dev: "To know about the developer.",
    sys: "To get the system information.",
    cls: "To clear screen.",
    clearscreen: "To clear screen.",
    clear: "To clear screen.",
    exit: "To exit the terminal.",
    quit: "To exit the terminal.",
    terminate: "To exit the terminal.",
    refresh: "To refresh/reload.",
    echo: "To display something on the terminal. example: `echo:I am Joel.`",
    config: "To get the configuration information.",
    credits: "To see the credits.",
    help: "To get a list of all the supported commands.",
    reportbug: "To report a bug in the application.",
    whatis: "To tell you what that command does. example: `whatis: echo`",
    os: "To get the operating system details.",
    read: "To read out the input. example: read:hello world",
    encode: "To encode data. example: encode:hola",
    decode: "To decode data. example: decode:aG9sYQ==",
    time: "To display the current time.",
    day: "To get the day info.",
    date: "To get the date info.",
    timezone: "To get the time zone.",
    webrtc: "To get the WebRTC info.",
    mouseposition: "To get the mouse position.",
    installedapps: "To get a list of all the installed applications.",
    installedapplications: "To get a list of all the installed applications.",
    open: "To open a site example open:https://fb.com or open:fb or url:fb or url:https://www.facebook.com/", 
    url: "To open a site example open:https://fb.com or open:fb or url:fb or url:https://www.facebook.com/",


    inputcolor: "To change the input color. example: `inputcolor:pink`",
    inputcolour: "To change the input color. example: `inputcolour:pink`",
    color: "To change the terminal text color. `example: color:blue`",
    colour: "To change the terminal text color. `example: colour:white`",
    bgcolor: "To change the background color of the terminal. example `bgcolor:purple`",
    bgcolour: "To change the background color of the terminal. example `bgcolour:purple`",
    backgroundcolor:  "To change the background color of the terminal. example `backgroundcolor:purple`",
    backgroundcolour:  "To change the background color of the terminal. example `backgroundcolour:purple`",

    zodiacsign:  "To get the zodiac sign based on the date of birth. `example: zodiacsign:2002-05-11 pattern: YYY-MM-DD`",
    numerology: "To get the numerology details for 2 people. `example: numerology:Joel:2002-05-11:Sophia:2003-05-27 pattern: YYYY-MM-DD`",
    kissme: "To get a virtual kiss.",
    lovecalculator: "To get a love score based on two names. `example: lovecalculator:Joel,Anna`",
    guess: "To guess the word. `example: guess:tac`",
    fortunecookie:  "To know the future.",
    easteregg:  "Easter egg.",
    shortstory:  "To get a short story.",
    bible: "To get a bible verse based on the search. `example: bible:joel:2:1-3` (book name - chapter number - verses) (English Version)",
    
    createqr:  "To create a qr code using the link or text . `example createqr:https://www.fb.com or createqr:iamjoel!` (Note: This feature requires internet)",

    flames: "To play the famous game for relationship. `example: flames:Joel,Anna`",
    mash: "To play the famous mash game. `example: mash:Joel,Anna`",
    truthordare: "To play the truth or dare game.",
    headsortails: "To return heads or tails.",
    rolldice: "To roll a dice.",
    compatibilitytest: "To take a compatiablity test with you partner. `example: compatibilitytest:joel,anna`",
    bfftest: "To play the truth or dare game. `example: bfftest:joel,james`",

    happybirthday: "To play the happy birthday song.",
    emergencyalarm: "To play the emergency alarm."
};

//Version
function Version() {
    echo("Elsa [Version " + currentVersion + ']');
}

//Update 
function getUpdate() {
    const networkstatus = navigator.onLine ? "online" : "offline";
    if (networkstatus === "offline") {
        echo("Please connect to the internet to check for updates.")
    } else if (networkstatus === "online") {
        echo("Checking for updates");
        if (currentVersion === latestVersion) {
            echo("You are in the latest version.")
        } else if (currentVersion < latestVersion) {
            echo("Downloading the latest version.")
            url = `https://github.com/withinJoel/Elsa/releases/download/v${latestVersion}/Elsa.exe`;
            window.open(url, '_blank');
        } else if (currentVersion > latestVersion) {
            echo('You are in the latest developer version.')
        }
    } else {

        echo("Error fetching updates.")
    }
}

//Config
function getConfig() {
    // Check if the browser's developer tools are open
    let devToolsOpen = false;
    const threshold = 160;

    const devToolsCheck = () => {
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            devToolsOpen = true;
        } else {
            devToolsOpen = false;
        }
    };

    // Initial check
    devToolsCheck();

    // Monitor resizing to check for dev tools being opened/closed
    window.addEventListener('resize', devToolsCheck);

    // Check for specific browser features and log to console
    const featuresEnabled = {
        cookies: navigator.cookieEnabled,
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        serviceWorkers: 'serviceWorker' in navigator,
        indexedDB: 'indexedDB' in window,
        geolocation: 'geolocation' in navigator,
        notifications: 'Notification' in window,
        webGL: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext &&
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        })(),
        mediaDevices: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
        online: navigator.onLine,
        fullscreen: document.fullscreenEnabled,
        webAssembly: 'WebAssembly' in window,
        touchEvents: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        battery: 'getBattery' in navigator,
        webRTC: 'RTCPeerConnection' in window,
        speechRecognition: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
        deviceMemory: navigator.deviceMemory || 'unknown',
        bluetooth: 'bluetooth' in navigator,
        clipboard: 'clipboard' in navigator,
        webSockets: 'WebSocket' in window,
        vibration: 'vibrate' in navigator,
        paymentRequest: 'PaymentRequest' in window,
        webShare: 'share' in navigator,
        pointerLock: 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document,
        screenOrientation: 'screen' in window && 'orientation' in window.screen,
        gamepad: 'getGamepads' in navigator,
        webAudio: 'AudioContext' in window || 'webkitAudioContext' in window,
        beacon: 'sendBeacon' in navigator,
        fetch: 'fetch' in window,
        history: 'history' in window && 'pushState' in window.history,
        url: 'URL' in window,
        fileAPI: 'FileReader' in window && 'Blob' in window && 'File' in window,
        dragAndDrop: 'draggable' in document.createElement('span'),
        webNotifications: 'Notification' in window,
        performance: 'performance' in window && 'now' in window.performance,
        visualViewport: 'visualViewport' in window,
        domParsing: 'DOMParser' in window && 'XMLSerializer' in window,
        webVR: 'getVRDisplays' in navigator,
        webXR: 'xr' in navigator,
        speechSynthesis: 'speechSynthesis' in window,
        nfc: 'nfc' in navigator,
        magnetometer: 'Magnetometer' in window,
        gyroscope: 'Gyroscope' in window,
        accelerometer: 'Accelerometer' in window,
        ambientLightSensor: 'AmbientLightSensor' in window,
        proximitySensor: 'ProximitySensor' in window,
        orientationSensor: 'AbsoluteOrientationSensor' in window || 'RelativeOrientationSensor' in window,
        presentation: 'presentation' in navigator,
        backgroundSync: 'sync' in navigator.serviceWorker,
        credentialManagement: 'credentials' in navigator,
        networkInformation: 'connection' in navigator,
        webAuthentication: 'PublicKeyCredential' in window,
        webMIDI: 'requestMIDIAccess' in navigator,
        webCrypto: 'crypto' in window && 'subtle' in window.crypto,
        permissions: 'permissions' in navigator,
        storage: 'storage' in navigator,
        textEncoder: 'TextEncoder' in window && 'TextDecoder' in window
    };

    // Log each feature status to the console
    echo('Cookies enabled:' + featuresEnabled.cookies);
    echo('Local Storage available:' + featuresEnabled.localStorage);
    echo('Session Storage available:' + featuresEnabled.sessionStorage);
    echo('Service Workers available:' + featuresEnabled.serviceWorkers);
    echo('IndexedDB available:' + featuresEnabled.indexedDB);
    echo('Geolocation available:' + featuresEnabled.geolocation);
    echo('Notifications available:' + featuresEnabled.notifications);
    echo('WebGL available:' + featuresEnabled.webGL);
    echo('Media Devices available:' + featuresEnabled.mediaDevices);
    echo('Online status:' + featuresEnabled.online);
    echo('Fullscreen enabled:' + featuresEnabled.fullscreen);
    echo('WebAssembly support:' + featuresEnabled.webAssembly);
    echo('Touch Events support:' + featuresEnabled.touchEvents);
    echo('Battery support:' + featuresEnabled.battery);
    echo('WebRTC support:' + featuresEnabled.webRTC);
    echo('Speech Recognition support:' + featuresEnabled.speechRecognition);
    echo('Device Memory:' + featuresEnabled.deviceMemory);
    echo('Bluetooth support:' + featuresEnabled.bluetooth);
    echo('Clipboard API support:' + featuresEnabled.clipboard);
    echo('WebSockets support:' + featuresEnabled.webSockets);
    echo('Vibration API support:' + featuresEnabled.vibration);
    echo('Payment Request API support:' + featuresEnabled.paymentRequest);
    echo('Web Share API support:' + featuresEnabled.webShare);
    echo('Pointer Lock API support:' + featuresEnabled.pointerLock);
    echo('Screen Orientation API support:' + featuresEnabled.screenOrientation);
    echo('Gamepad API support:' + featuresEnabled.gamepad);
    echo('Web Audio API support:' + featuresEnabled.webAudio);
    echo('Beacon API support:' + featuresEnabled.beacon);
    echo('Fetch API support:' + featuresEnabled.fetch);
    echo('History API support:' + featuresEnabled.history);
    echo('URL API support:' + featuresEnabled.url);
    echo('File API support:' + featuresEnabled.fileAPI);
    echo('Drag and Drop API support:' + featuresEnabled.dragAndDrop);
    echo('Web Notifications support:' + featuresEnabled.webNotifications);
    echo('Performance API support:' + featuresEnabled.performance);
    echo('Visual Viewport API support:' + featuresEnabled.visualViewport);
    echo('DOM Parsing and Serialization API support:' + featuresEnabled.domParsing);
    echo('WebVR API support:' + featuresEnabled.webVR);
    echo('WebXR API support:' + featuresEnabled.webXR);
    echo('Speech Synthesis support:' + featuresEnabled.speechSynthesis);
    echo('NFC support:' + featuresEnabled.nfc);
    echo('Magnetometer support:' + featuresEnabled.magnetometer);
    echo('Gyroscope support:' + featuresEnabled.gyroscope);
    echo('Accelerometer support:' + featuresEnabled.accelerometer);
    echo('Ambient Light Sensor support:' + featuresEnabled.ambientLightSensor);
    echo('Proximity Sensor support:' + featuresEnabled.proximitySensor);
    echo('Orientation Sensor support:' + featuresEnabled.orientationSensor);
    echo('Presentation API support:' + featuresEnabled.presentation);
    echo('Background Sync API support:' + featuresEnabled.backgroundSync);
    echo('Credential Management API support:' + featuresEnabled.credentialManagement);
    echo('Network Information API support:' + featuresEnabled.networkInformation);
    echo('Web Authentication API support:' + featuresEnabled.webAuthentication);
    echo('Web MIDI API support:' + featuresEnabled.webMIDI);
    echo('Web Crypto API support:' + featuresEnabled.webCrypto);
    echo('Permissions API support:' + featuresEnabled.permissions);
    echo('Storage API support:' + featuresEnabled.storage);
    echo('TextEncoder and TextDecoder support:' + featuresEnabled.textEncoder);
}

//System
function getSys() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const platform = navigator.platform;
    const timezoneOffset = new Date().getTimezoneOffset();
    const connectionType = navigator.connection.effectiveType;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlinkSpeed = connection.downlink + " Mbps";
    const memory = navigator.deviceMemory;
    const colorDepth = screen.colorDepth;
    const screenWidth = screen.width; // Screen width in pixels
    const screenHeight = screen.height; // Screen height in pixels
    const screenresolution = ("Width: " + screenWidth + " and Height: " + screenHeight);
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => echo(`IP address: ${data.ip}`))
        .catch(error => echo('Error fetching IP address:', error));
    navigator.getBattery().then(battery => {
        const level = battery.level * 100;
        const charging = battery.charging ? 'Charging' : 'Discharging';
        echo(`Battery Level: ${level}%`);
        echo(`Battery Status: ${charging}`);
    }).catch(error => echo('Error getting battery status:', error));
    echo('OS: ' + platform);
    echo('System time: ' + timeString);
    echo('Timezone: ' + timezoneOffset);
    echo('Connection Type: ' + connectionType);
    echo('Connection Speed: ' + downlinkSpeed);
    echo('Ram Info: ' + memory + 'Gb');
    echo('Color Depth: ' + colorDepth);
    echo('Screen Resolution: ' + screenresolution);
}

//Whatis
// Function to handle user input
function whatIsCommand(input) {
    // Extract the command from the input
    const command = input.split(' ')[1];
    
    // Look up the command in the dictionary
    const meaning = commandDictionary[command];
    
    // Use echo to display the meaning or a message if the command is not found
    if (meaning) {
        echo(command + ": " + meaning);
    } else {
        echo(`Command '${command}' not found.`);
    }
}

//CPU Info
async function getCPUInfo() {
    const cpuInfo = await window.electronAPI.getCPUInfo();
    if (cpuInfo && cpuInfo.length > 0) {
        const { model, speed, times } = cpuInfo[0]; // Get the first CPU info as an example

        // You can extract more details if needed
        const cpuname = model;
        const cpuSpeed = speed;
        const cpuUserTime = times.user;
        const cpuNiceTime = times.nice;
        const cpuSysTime = times.sys;
        const cpuIdleTime = times.idle;
        const cpuIrqTime = times.irq;

        echo('CPU name: ' + cpuname);
        echo('CPU speed: ' + cpuSpeed);
        echo('CPU user time: ' + cpuUserTime);
        echo('CPU nice time: ' + cpuNiceTime);
        echo('CPU system time: ' + cpuSysTime);
        echo('CPU idle time: ' + cpuIdleTime);
        echo('CPU time spent servicing interrupts: ' + cpuIrqTime)
    } else {
        echo('Failed to retrieve CPU information');
    }
}

//GPU Info
function getGPUInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unavailable';
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unavailable';
    const version = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unavailable';

    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const maxCubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    const maxRenderBufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
    const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);

    echo('GPU Renderer: ' + renderer);
    echo('GPU Vendor: ' + vendor);
    echo('GPU Version: ' + version);
    echo('Maximum Texture Size: ' + maxTextureSize);
    echo('Maximum CubeMap Texture Size: ' + maxCubeMapSize);
    echo('Maximum RenderBuffer Size: ' + maxRenderBufferSize);
    echo('Maximum Viewport Dimensions: ' + maxViewportDims[0] + 'x' + maxViewportDims[1]);
}

//Echo Repeat Function
function outputRepeat(text, count) {
    // Repeat the text the specified number of times
    for (let i = 0; i < count; i++) {
        echo(text);
    }
}

//Echo Function
function echoFunction(input) {
    // Remove the 'echo:' prefix and trim spaces
    const data = input.trim().replace(/^echo:\s*/i, '');

    // Extract the text and repetition count using a regular expression
    const match = data.match(/(.*)\s*\*\s*(\d+)/);
    if (match) {
        const text = match[1].trim();
        const count = parseInt(match[2], 10);
        outputRepeat(text, count)
    } else {
        echo(data);
    }
}

//Credits
function credits() {
    echo('Elsa is created by Joel Jessie Jolly.');
}

//Reload or Refresh the page
function refreshPage() {
    location.reload();
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
    var url = 'Documentation/Help.pdf';
    var newWindow = window.open("", "_blank");
    newWindow.document.write('<iframe src="' + url + '" frameborder="0" style="border:none; width:100%; height:100vh;"></iframe>');
}

//To get the Operating system
function getOS() {
    const platform = navigator.platform;
    echo(platform);
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

//Ram Type
function getRamInfo() {
    const memory = navigator.deviceMemory;
    echo('Ram: ' + memory + 'Gb');
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

//Display Info
function getDisplayInfo() {
    const screenWidth = screen.width; // Screen width in pixels
    const screenHeight = screen.height; // Screen height in pixels
    const screenresolution = ("Screen width: " + screenWidth + " and screen height: " + screenHeight);
    const colorDepth = screen.colorDepth; // Color depth
    echo(screenresolution);
    echo('color depth: ' + colorDepth);
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



//error
function errorhandling() {
    echo(`Not a valid command.`);
}
