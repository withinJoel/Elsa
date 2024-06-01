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

//Fetch Internet Information
function getInternetInfo() {
    fetch('https://jsonip.com/').then(res => {
        return res.json()
    }).then(data => {
        getInternetData(data.ip)
    }).catch(err => {
        echo(`There was an error ${err}`)
    })
}

//Internet Information
function getInternetData(ip) {
    let ipAddress = ip;
    let output = "";
    const connectionType = navigator.connection.effectiveType;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlinkSpeed = connection.downlink + " Mbps";
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => echo(`IP address: ${data.ip}`))
        .catch(error => echo('Error fetching IP address:', error));
    fetch(`http://ip-api.com/json/${ipAddress}`).then(res => {
        return res.json()
    }).then(data => {
        echo('Country: ' + data.country);
        echo('Country code: ' + data.countryCode);
        echo('Region: ' + data.regionName);
        echo('City: ' + data.city);
        echo('Timezone: ' + data.timezone);
        echo('Internet organization: ' + data.org);
        echo('AS: ' + data.as);
        echo('Zip code: ' + data.zip);
        echo('ISP: ' + data.isp);
        echo('Connection Type: ' + connectionType);
        echo('Connection Speed: ' + downlinkSpeed);
        echo('Round-trip time (RTT): ' + navigator.connection.rtt); // Estimated round-trip time in milliseconds
        echo('Save data mode: ' + navigator.connection.saveData);
    }).catch(err => {
        echo(`There was an error: ${err}`);
    })
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
function credits () {
    echo ('Elsa is created by Joel Jessie Jolly.');
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
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            console.error('Error measuring latency:', error);
            return Promise.reject(error); // Reject the promise if there's an error
        });
}

//error
function errorhandling() {
    echo(`Not a valid command.`);
}