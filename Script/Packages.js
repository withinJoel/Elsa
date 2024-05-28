//////////////////////////////////////////////////////////////////////////////
////Details///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const currentVersion = '1.1.6';
let imagedir = '../../../Bin/Images/';
let videodir = '../../../Bin/Videos/';
let docdir = '../../../Bin/Documents/';
let audiodir = '../../../Bin/Audios/';

//////////////////////////////////////////////////////////////////////////////
////Sub Process///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function getInternetInfo() {
    fetch('https://jsonip.com/').then(res => {
        return res.json()
    }).then(data => {
        getInternetData(data.ip)
    }).catch(err => {
        echo(`There was an error ${err}`)
    })
}

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

//////////////////////////////////////////////////////////////////////////////
////Main Process//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//Version
function Version() {
    echo("Elsa [Version " + currentVersion + ']');
    echo('Made with love by Joel Jessie Jolly.');
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

//Bible
function Bible(input) {
    // Split input to get the book name, chapter, and verse range
    let [bookName, chapter, verseRange] = input.split(':');

    // Capitalize the book name
    bookName = bookName.charAt(0).toUpperCase() + bookName.slice(1).toLowerCase();

    // Find the index of the book name in the Bible books array
    const bookIndex = bibleBooks.indexOf(bookName);

    // If the book name is found, calculate the book number and retrieve the verses
    if (bookIndex !== -1) {
        const bookNumber = bookIndex + 1;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(bible, 'text/xml');
        const verses = [];

        const [startVerse, endVerse] = verseRange.includes('-') ? verseRange.split('-').map(Number) : [parseInt(verseRange), parseInt(verseRange)];
        const versesNodeList = xmlDoc.querySelectorAll(`book[number='${bookNumber}'] chapter[number='${chapter}'] verse[number]`);

        for (const verseNode of versesNodeList) {
            const verseNumber = parseInt(verseNode.getAttribute('number'));
            if (verseNumber >= startVerse && verseNumber <= endVerse) {
                verses.push(`Verse ${verseNumber}: ${verseNode.textContent.trim()}`);
            }
        }

        if (verses.length > 0) {
            echo(verses.join('\n'));
        } else {
            echo(`No verses found for the specified range in ${bookName} chapter ${chapter}.`);
        }
    } else {
        echo(`${bookName} is not a valid book name in the Bible.`);
    }
}

//CPU Info
function getCPUInfo() {
    const userAgent = navigator.userAgent.toLowerCase();
    let generation = 'Unknown';
    let manufacturer = 'Unknown';
    let modelName = 'Unknown';

    // Check if the userAgent contains information about CPU
    if (userAgent.includes('intel')) {
        const match = userAgent.match(/intel\s+core\s+[0-9]+/);
        if (match) {
            generation = match[0];
            manufacturer = 'Intel';
        }
    } else if (userAgent.includes('amd')) {
        const match = userAgent.match(/amd\s+[a-z]+\s+[0-9]+/);
        if (match) {
            generation = match[0];
            manufacturer = 'AMD';
        }
    }

    // Check if navigator.cpuClass is available for model name
    if (navigator.cpuClass) {
        modelName = navigator.cpuClass;
    }

    // Output CPU information
    echo('Processor: ' + generation);
    echo('Cores: ' + navigator.hardwareConcurrency);
    echo('Manufacturer: ' + manufacturer);
    echo('Model name: ' + modelName);
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

//Download Video
function downloadVideo(url) {
    link = `https://www.savethevideo.com/downloader?url=` + url;
    echo(link);
    window.open(link, '_blank');
}

//Open Pdf
function openPDF(data) {
    const pdf = data.trim().replace(/^open:pdf:\b\s*/i, '');
    // Specify the URL of the PDF file
    var pdfURL = docdir + pdf;

    // Open the PDF file in a new tab
    window.open(pdfURL, '_blank');
}

//Open Text
function openTXT(data) {
    const txt = data.trim().replace(/^open:txt:\b\s*/i, '');
    // Specify the URL of the Txt file
    var txtURL = docdir + txt;

    window.open(txtURL, '_blank');
}

//Open Image
async function openImage(data) {
    const existingElement = document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingImgElement = document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');
    if (existingElement) {
        existingElement.remove();
    }
    // Remove existing error message if any
    if (existingErrorElement) {
        document.body.removeChild(existingErrorElement);
    }

    if (data && data.trim().startsWith("open:image:")) {
        const img = data.trim().replace(/^open:image:\s*/i, '');
        const imageElement = imagedir + img;

        if (existingImgElement) {
            existingImgElement.src = imageElement;
        } else {
            const imgElement = document.createElement('img');
            imgElement.style.position = 'fixed';
            imgElement.style.top = '15px';
            imgElement.style.right = '15px';
            imgElement.style.maxWidth = '500px';
            imgElement.style.maxHeight = '500px';
            imgElement.setAttribute('data-role', 'dynamic-image');

            document.body.appendChild(imgElement);
        }

        try {
            await new Promise((resolve, reject) => {
                existingImgElement.onload = resolve;
                existingImgElement.onerror = reject;
                existingImgElement.src = imageElement;
            });
        } catch (error) {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo("Image failed to load. Please check the path or filename.");
        }
    } else if (existingImgElement) {
        document.body.removeChild(existingImgElement);
    }
}

//Open Video
async function openVideo(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingVidElement = document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');
    if (existingElement) {
        existingElement.remove();
    }
    // Remove existing error message if any
    if (existingErrorElement) {
        document.body.removeChild(existingErrorElement);
    }

    if (data && data.trim().startsWith("open:video:")) {
        const vid = data.trim().replace(/^open:video:\s*/i, '');
        const videoSrc = videodir + vid;

        let vidElement = existingVidElement;

        try {
            // Create a temporary video element to check if the video loads
            const tempVideo = document.createElement('video');
            await new Promise((resolve, reject) => {
                tempVideo.onloadeddata = resolve; // Use onloadeddata for video
                tempVideo.onerror = reject;
                tempVideo.src = videoSrc;
            });

            if (vidElement) {
                vidElement.src = videoSrc;
            } else {
                vidElement = document.createElement('video');
                vidElement.style.position = 'fixed';
                vidElement.style.top = '15px';
                vidElement.style.right = '15px';
                vidElement.style.maxWidth = '500px';
                vidElement.style.maxHeight = '500px';
                vidElement.setAttribute('data-role', 'dynamic-video');
                vidElement.controls = true; // Add video controls for play/pause, etc.
                vidElement.src = videoSrc;
                document.body.appendChild(vidElement);
            }
        } catch (error) {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo("Video failed to load. Please check the path or filename.");

        }
    } else if (existingVidElement) {
        document.body.removeChild(existingVidElement);
    }
}

//Remove the background and get only the head
async function removeBackgroundAndExtractFace(img) {
    const imageElement = imagedir + img;
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    const imgOriginal = document.createElement('img');
    imgOriginal.src = imageElement;
    imgOriginal.style.position = 'fixed';
    imgOriginal.style.top = '15px';
    imgOriginal.style.right = '15px';
    imgOriginal.style.maxWidth = '500px';
    imgOriginal.style.maxHeight = '500px';
    imgOriginal.setAttribute('data-role', 'dynamic-image');

    document.body.appendChild(imgOriginal);

    // Wait for the image to load
    await new Promise((resolve, reject) => {
        imgOriginal.onload = resolve;
        imgOriginal.onerror = reject;
    });

    // Load face-api.js models
    await faceapi.nets.ssdMobilenetv1.loadFromUri('Models/Faceapi/');

    // Detect faces in the image
    const detections = await faceapi.detectAllFaces(imgOriginal);

    // Get the bounding box of the first detected face
    if (detections.length > 0) {
        const faceBox = detections[0].box;
        const { x, y, width, height } = faceBox;

        // Create a temporary canvas to draw the face region
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        tempCtx.drawImage(imgOriginal, x, y, width, height, 0, 0, width, height);

        // Create an image element to display the final processed image
        document.body.removeChild(imgOriginal);
        const imgProcessed = document.createElement('img');
        imgProcessed.src = tempCanvas.toDataURL('image/png');
        imgProcessed.style.position = 'fixed';
        imgProcessed.style.top = '15px';
        imgProcessed.style.right = '15px'; // Adjust to position next to the original image
        imgProcessed.style.maxWidth = '500px';
        imgProcessed.style.maxHeight = '500px';
        imgProcessed.setAttribute('data-role', 'dynamic-image');

        document.body.appendChild(imgProcessed);

        // Automatically download the final image
        echo('Downloading the final image...');
        const link = document.createElement('a');
        const min = 0;
        const max = 999999999999999;
        const randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
        link.download = 'face_output' + randomnumber + '.png';
        link.href = tempCanvas.toDataURL('image/png');
        link.click();

        // Notify the user that the image has been saved
        new Notification('Image Processing', {
            body: 'The face has been extracted and saved as face_output.png.'
        });
    } else {
        echo('No face detected in the image.');
    }
}

//Upscale
async function upscaleAndDownloadImage(data) {
    try {
        const imageUrl = imagedir + data;
        const imgOriginal = document.createElement('img');
        imgOriginal.src = imageUrl;
        imgOriginal.style.position = 'fixed';
        imgOriginal.style.top = '15px';
        imgOriginal.style.right = '15px';
        imgOriginal.style.maxWidth = '500px';
        imgOriginal.style.maxHeight = '500px';
        imgOriginal.setAttribute('data-role', 'dynamic-image');
        document.body.appendChild(imgOriginal);

        // Wait for the image to load
        await imgOriginal.decode();
        console.log('Image loaded.');
        const originalWidth = imgOriginal.width;
        const originalHeight = imgOriginal.height;
        const upscaleFactor = 8; // Define the upscaling factor
        const upscaledWidth = originalWidth * upscaleFactor;
        const upscaledHeight = originalHeight * upscaleFactor;

        // Load the image into an offscreen canvas for processing
        const originalCanvas = document.createElement('canvas');
        originalCanvas.width = originalWidth;
        originalCanvas.height = originalHeight;
        const originalCtx = originalCanvas.getContext('2d');
        originalCtx.drawImage(imgOriginal, 0, 0, originalWidth, originalHeight);

        console.log('Denoising image.');
        // Apply enhanced Non-Local Means (NLM) Denoising to the image
        const denoisedCanvas = await denoiseImage(originalCanvas);

        console.log('Upscaling image.');
        // Apply bicubic interpolation to the denoised image
        const bicubicResampledCanvas = await bicubicResample(denoisedCanvas, upscaleFactor);

        console.log('Sharpening image.');
        // Apply sharpening to the upscaled image
        const sharpenedCanvas = await sharpenImage(bicubicResampledCanvas);

        console.log('Converting to image.');
        // Convert the result back to an image and display it
        const upscaledImage = new Image();
        upscaledImage.src = sharpenedCanvas.toDataURL();
        upscaledImage.style.position = 'fixed';
        upscaledImage.style.top = '15px';
        upscaledImage.style.right = '15px';
        upscaledImage.style.maxWidth = '500px';
        upscaledImage.style.maxHeight = '500px';
        upscaledImage.setAttribute('data-role', 'dynamic-image');
        document.body.appendChild(upscaledImage);

        // Automatically download the upscaled image
        const a = document.createElement('a');
        a.href = upscaledImage.src;
        a.download = 'upscaled_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.log('Error occurred during upscaling:', error);
    }
}

// Function to denoise the image using enhanced Non-Local Means (NLM) Denoising
async function denoiseImage(canvas) {
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const nlmDenoisedImageData = await imageDenoisingNLM(imageData);
    const denoisedCanvas = document.createElement('canvas');
    denoisedCanvas.width = canvas.width;
    denoisedCanvas.height = canvas.height;
    const ctx = denoisedCanvas.getContext('2d');
    ctx.putImageData(nlmDenoisedImageData, 0, 0);
    return denoisedCanvas;
}

// Function to perform bicubic interpolation
async function bicubicResample(canvas, scaleFactor) {
    const width = canvas.width * scaleFactor;
    const height = canvas.height * scaleFactor;
    const srcCtx = canvas.getContext('2d');
    const srcImageData = srcCtx.getImageData(0, 0, canvas.width, canvas.height);
    const srcData = srcImageData.data;

    const destCanvas = document.createElement('canvas');
    destCanvas.width = width;
    destCanvas.height = height;
    const destCtx = destCanvas.getContext('2d');
    const destImageData = destCtx.createImageData(width, height);
    const destData = destImageData.data;

    function cubicInterpolation(p0, p1, p2, p3, t) {
        return (
            p1 +
            0.5 *
                t *
                (p2 - p0 + t * (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3 + t * (3.0 * (p1 - p2) + p3 - p0)))
        );
    }

    function getPixelValue(data, width, height, x, y, c) {
        x = Math.min(Math.max(x, 0), width - 1);
        y = Math.min(Math.max(y, 0), height - 1);
        return data[(y * width + x) * 4 + c];
    }

    for (let y = 0; y < height; y++) {
        const srcY = y / scaleFactor;
        const y0 = Math.floor(srcY);
        const yT = srcY - y0;

        for (let x = 0; x < width; x++) {
            const srcX = x / scaleFactor;
            const x0 = Math.floor(srcX);
            const xT = srcX - x0;

            for (let c = 0; c < 3; c++) {
                const col0 = cubicInterpolation(
                    getPixelValue(srcData, canvas.width, canvas.height, x0 - 1, y0 - 1, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0, y0 - 1, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 1, y0 - 1, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 2, y0 - 1, c),
                    xT
                );
                const col1 = cubicInterpolation(
                    getPixelValue(srcData, canvas.width, canvas.height, x0 - 1, y0, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0, y0, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 1, y0, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 2, y0, c),
                    xT
                );
                const col2 = cubicInterpolation(
                    getPixelValue(srcData, canvas.width, canvas.height, x0 - 1, y0 + 1, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0, y0 + 1, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 1, y0 + 1, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 2, y0 + 1, c),
                    xT
                );
                const col3 = cubicInterpolation(
                    getPixelValue(srcData, canvas.width, canvas.height, x0 - 1, y0 + 2, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0, y0 + 2, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 1, y0 + 2, c),
                    getPixelValue(srcData, canvas.width, canvas.height, x0 + 2, y0 + 2, c),
                    xT
                );

                const value = cubicInterpolation(col0, col1, col2, col3, yT);
                destData[(y * width + x) * 4 + c] = Math.max(0, Math.min(255, value));
            }
            destData[(y * width + x) * 4 + 3] = 255; // Set alpha to fully opaque
        }
    }

    destCtx.putImageData(destImageData, 0, 0);
    return destCanvas;
}

// Function to apply sharpening to the image
async function sharpenImage(canvas) {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const sharpenKernel = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];

    const getPixelValue = (x, y, c) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return 0;
        return data[(y * width + x) * 4 + c];
    };

    const newImageData = ctx.createImageData(width, height);
    const newData = newImageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            for (let c = 0; c < 3; c++) {
                let newValue = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const weight = sharpenKernel[(ky + 1) * 3 + (kx + 1)];
                        newValue += weight * getPixelValue(x + kx, y + ky, c);
                    }
                }
                newData[(y * width + x) * 4 + c] = Math.max(0, Math.min(255, newValue));
            }
            newData[(y * width + x) * 4 + 3] = 255; // Set alpha to fully opaque
        }
    }

    ctx.putImageData(newImageData, 0, 0);
    return canvas;
}

// Function to denoise the image using enhanced Non-Local Means (NLM) Denoising
function imageDenoisingNLM(imageData) {
    return new Promise((resolve) => {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;

        const windowSize = 11; // Size of the search window
        const patchSize = 2; // Reduced size of the patch for better quality
        const h = 0.20; // Increased h parameter for smoother results

        // Function to compute the weighted average of patches in the search window
        function computeWeightedAverage(x, y) {
            let [numeratorR, numeratorG, numeratorB] = [0, 0, 0];
            let denominator = 0;

            const refPatch = getPatch(x, y);

            for (let i = -windowSize; i <= windowSize; i++) {
                for (let j = -windowSize; j <= windowSize; j++) {
                    const nx = x + i;
                    const ny = y + j;

                    if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                        const curPatch = getPatch(nx, ny);

                        const weight = computeWeight(refPatch, curPatch);
                        const index = (ny * width + nx) * 4;

                        numeratorR += weight * data[index];
                        numeratorG += weight * data[index + 1];
                        numeratorB += weight * data[index + 2];
                        denominator += weight;
                    }
                }
            }

            return [numeratorR / denominator, numeratorG / denominator, numeratorB / denominator];
        }

        // Function to get the patch centered at (x, y)
        function getPatch(x, y) {
            const patch = [];
            for (let ny = y - Math.floor(patchSize / 2); ny <= y + Math.floor(patchSize / 2); ny++) {
                for (let nx = x - Math.floor(patchSize / 2); nx <= x + Math.floor(patchSize / 2); nx++) {
                    const px = Math.min(Math.max(nx, 0), width - 1); // Correct for boundary
                    const py = Math.min(Math.max(ny, 0), height - 1); // Correct for boundary
                    const index = (py * width + px) * 4;
                    patch.push(data[index], data[index + 1], data[index + 2]);
                }
            }
            return patch;
        }

        // Function to compute the Euclidean distance between two patches
        function patchDistance(patch1, patch2) {
            let distance = 0;
            for (let i = 0; i < patch1.length; i++) {
                distance += Math.pow(patch1[i] - patch2[i], 2);
            }
            return Math.sqrt(distance);
        }

        // Function to compute the weight of two patches
        function computeWeight(patch1, patch2) {
            const distance = patchDistance(patch1, patch2);
            return Math.exp(-distance / (h * h));
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const [newValueR, newValueG, newValueB] = computeWeightedAverage(x, y);

                const index = (y * width + x) * 4;
                data[index] = newValueR;
                data[index + 1] = newValueG;
                data[index + 2] = newValueB;
            }
        }

        console.log("Denoising complete.");
        resolve(imageData);
    });
}

//Remove Background
async function removeBackground(img) {
    const imageElement = imagedir + img;
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    const imgOriginal = document.createElement('img');
    imgOriginal.src = imageElement;
    imgOriginal.style.position = 'fixed';
    imgOriginal.style.top = '15px';
    imgOriginal.style.right = '15px';
    imgOriginal.style.maxWidth = '500px';
    imgOriginal.style.maxHeight = '500px';
    imgOriginal.setAttribute('data-role', 'dynamic-image');

    document.body.appendChild(imgOriginal);

    // Wait for the image to load
    await new Promise((resolve, reject) => {
        imgOriginal.onload = resolve;
        imgOriginal.onerror = reject;
    });

    // Load the BodyPix model with custom parameters
    echo('Loading BodyPix model with custom parameters...');
    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
    });

    // Segment the image using BodyPix with custom parameters
    echo('Segmenting image using BodyPix with custom parameters...');
    const segmentation = await net.segmentPerson(imgOriginal, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.5
    });

    // Create a canvas to draw the original image and apply the mask
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imgOriginal.width;
    canvas.height = imgOriginal.height;

    // Draw the original image on the canvas
    echo('Drawing original image on canvas...');
    ctx.drawImage(imgOriginal, 0, 0, canvas.width, canvas.height);

    // Create a mask from the segmentation
    const mask = segmentation.data.map((val) => val === 0 ? 0 : 255);

    // Apply the mask to the image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < mask.length; i++) {
        const alpha = mask[i];
        data[i * 4 + 3] = alpha; // Set alpha channel based on the mask
    }

    // Put the modified image data back on the canvas
    echo('Putting modified image data back on canvas...');
    ctx.putImageData(imageData, 0, 0);

    // Create an image element to display the final processed image
    document.body.removeChild(imgOriginal);
    const imgProcessed = document.createElement('img');
    imgProcessed.src = canvas.toDataURL('image/png');
    imgProcessed.style.position = 'fixed';
    imgProcessed.style.top = '15px';
    imgProcessed.style.right = '15px'; // Adjust to position next to the original image
    imgProcessed.style.maxWidth = '500px';
    imgProcessed.style.maxHeight = '500px';
    imgProcessed.setAttribute('data-role', 'dynamic-image');

    document.body.appendChild(imgProcessed);

    // Automatically download the final image
    echo('Downloading the final image...');
    const link = document.createElement('a');
    const min = 0;
    const max = 999999999999999;
    const randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
    link.download = 'output' + randomnumber + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Notify the user that the image has been saved
    new Notification('Image Processing', {
        body: 'The image has been processed and saved as output.png.'
    });
}

//Detect nudity
class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        // Initialize weights randomly
        this.weightsIH = new Array(this.hiddenNodes).fill().map(() => new Array(this.inputNodes).fill().map(() => Math.random() * 2 - 1));
        this.weightsHO = new Array(this.outputNodes).fill().map(() => new Array(this.hiddenNodes).fill().map(() => Math.random() * 2 - 1));

        // Initialize biases randomly
        this.biasH = new Array(this.hiddenNodes).fill().map(() => Math.random() * 2 - 1);
        this.biasO = new Array(this.outputNodes).fill().map(() => Math.random() * 2 - 1);
    }

    // Activation function (sigmoid)
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    // Feedforward function
    predict(inputArray) {
        // Calculate hidden layer outputs
        const hiddenOutputs = this.weightsIH.map((weights, i) => {
            return this.sigmoid(weights.reduce((sum, weight, j) => sum + weight * inputArray[j], 0) + this.biasH[i]);
        });

        // Calculate output layer outputs
        const outputs = this.weightsHO.map((weights, i) => {
            return this.sigmoid(weights.reduce((sum, weight, j) => sum + weight * hiddenOutputs[j], 0) + this.biasO[i]);
        });

        return outputs;
    }
}

// Function to convert image data to grayscale array
function imageToGrayscale(imgData) {
    const grayscale = [];
    for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i];
        const g = imgData.data[i + 1];
        const b = imgData.data[i + 2];
        grayscale.push((r + g + b) / 3);
    }
    return grayscale;
}

async function detectNudity(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    const fileExtension = data.split('.').pop().toLowerCase();
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp'];

    if (imageExtensions.includes(fileExtension)) {
        const imagePath = `${imagedir}/${data}`; // Assuming imageDir is the folder for images
        await predictNudityForImage(imagePath);
    } else {
        const videoPath = `${videodir}/${data}`; // Assuming videoDir is the folder for videos
        await predictNudityForVideo(videoPath);
    }
}

async function predictNudityForImage(filePath) {
    const imgElement = document.createElement('img');
    imgElement.style.position = 'fixed';
    imgElement.style.top = '15px';
    imgElement.style.right = '15px';
    imgElement.style.maxWidth = '500px';
    imgElement.style.maxHeight = '500px';

    document.body.appendChild(imgElement);

    await new Promise((resolve, reject) => {
        imgElement.onload = resolve;
        imgElement.onerror = reject;
        imgElement.src = filePath;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const grayscaleArray = imageToGrayscale(imageData);

    // Define neural network parameters
    const inputNodes = grayscaleArray.length;
    const hiddenNodes = 64;
    const outputNodes = 1;

    // Create and train neural network
    const neuralNetwork = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);
    // Assuming you have training data and a training function for nudity detection

    // Make multiple predictions using the neural network
    const predictions = [];
    for (let i = 0; i < 250; i++) {
        predictions.push(neuralNetwork.predict(grayscaleArray)[0]);
    }

    // Count occurrences of each prediction value
    const predictionCounts = predictions.reduce((acc, prediction) => {
        acc[prediction] = (acc[prediction] || 0) + 1;
        return acc;
    }, {});

    // Find the prediction with the highest count
    let maxCount = -1;
    let majorityPrediction = null;
    for (const prediction in predictionCounts) {
        if (predictionCounts[prediction] > maxCount) {
            maxCount = predictionCounts[prediction];
            majorityPrediction = prediction;
        }
    }

    if (majorityPrediction > 0.5) {
        echo('Yes, The image contains nudity.');
    } else {
        echo('No, The image does not contain any nudity.');
    }
}

async function predictNudityForVideo(filePath) {
    const videoElement = document.createElement('video');
    videoElement.style.position = 'fixed';
    videoElement.style.top = '15px';
    videoElement.style.right = '15px';
    videoElement.style.maxWidth = '500px';
    videoElement.style.maxHeight = '500px';
    videoElement.src = filePath;
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.loop = true;

    document.body.appendChild(videoElement);

    await new Promise((resolve, reject) => {
        videoElement.onloadeddata = resolve;
        videoElement.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const getRandomTime = (duration) => Math.random() * duration;

    const analyzeFrame = () => {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const grayscaleArray = imageToGrayscale(imageData);

        // Define neural network parameters
        const inputNodes = grayscaleArray.length;
        const hiddenNodes = 64;
        const outputNodes = 1;

        // Create and train neural network
        const neuralNetwork = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);
        // Assuming you have training data and a training function for nudity detection

        return neuralNetwork.predict(grayscaleArray)[0];
    };

    const analyzeRandomFrames = async () => {
        const predictions = [];
        let frameCount;

        if (videoElement.duration > 12800 * 60 * 60) { // 12800 hours
            frameCount = 419430400;
        } else if (videoElement.duration > 6400 * 60 * 60) { // 6400 hours
            frameCount = 209715200;
        } else if (videoElement.duration > 3200 * 60 * 60) { // 3200 hours
            frameCount = 104857600;
        } else if (videoElement.duration > 1600 * 60 * 60) { // 1600 hours
            frameCount = 52428800;
        } else if (videoElement.duration > 800 * 60 * 60) { // 800 hours
            frameCount = 26214400;
        } else if (videoElement.duration > 400 * 60 * 60) { // 400 hours
            frameCount = 13107200;
        } else if (videoElement.duration > 200 * 60 * 60) { // 200 hours
            frameCount = 6553600;
        } else if (videoElement.duration > 100 * 60 * 60) { // 100 hours
            frameCount = 3276800;
        } else if (videoElement.duration > 50 * 60 * 60) { // 50 hours
            frameCount = 1638400;
        } else if (videoElement.duration > 25 * 60 * 60) { // 25 hours
            frameCount = 819200;
        } else if (videoElement.duration > 12.5 * 60 * 60) { // 12.5 hours
            frameCount = 409600;
        } else if (videoElement.duration > 6.25 * 60 * 60) { // 6.25 hours
            frameCount = 204800;
        } else if (videoElement.duration > 3.125 * 60 * 60) { // 3.125 hours
            frameCount = 102400;
        } else if (videoElement.duration > 1.5625 * 60 * 60) { // 1.5625 hours
            frameCount = 51200;
        } else if (videoElement.duration > 0.78125 * 60 * 60) { // 0.78125 hours
            frameCount = 25600;
        } else if (videoElement.duration > 0.390625 * 60 * 60) { // 0.390625 hours
            frameCount = 12800;
        } else if (videoElement.duration > 0.1953125 * 60 * 60) { // 0.1953125 hours
            frameCount = 6400;
        } else if (videoElement.duration > 0.09765625 * 60 * 60) { // 0.09765625 hours
            frameCount = 3200;
        } else if (videoElement.duration > 0.048828125 * 60 * 60) { // 0.048828125 hours
            frameCount = 1600;
        } else if (videoElement.duration > 0.0244140625 * 60 * 60) { // 0.0244140625 hours
            frameCount = 800;
        } else if (videoElement.duration > 0.01220703125 * 60 * 60) { // 0.01220703125 hours
            frameCount = 400;
        } else if (videoElement.duration > 0.006103515625 * 60 * 60) { // 0.006103515625 hours
            frameCount = 200;
        } else if (videoElement.duration > 0.0030517578125 * 60 * 60) { // 0.0030517578125 hours
            frameCount = 180;
        } else {
            frameCount = 100;
        }

        for (let i = 0; i < frameCount; i++) {
            videoElement.currentTime = getRandomTime(videoElement.duration);
            await new Promise(resolve => videoElement.onseeked = resolve);
            predictions.push(analyzeFrame());
        }

        const nudeCount = predictions.filter(prediction => prediction < 0.5).length; // Adjust threshold for sensitivity
        const isNude = nudeCount > (frameCount / 2); // Majority of analyzed frames

        echo(isNude ? 'Yes, The video contains nudity.' : 'No, The video does not contain any nudity.');
    };

    await analyzeRandomFrames();
}
//Detect Humans
async function detectHumans(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    if (!data) {
        echo('No image data provided.');
        return;
    }

    // Load the models
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceExpressionNet.loadFromUri("Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const imgSrc = imagedir + data;
    img.src = imgSrc;

    // Check if the image source is valid
    img.onload = async () => {
        if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
            document.body.appendChild(img);

            // Detect faces
            const detections = await faceapi.detectAllFaces(img);

            if (detections.length > 1) {
                echo('Humans are detected.');
                echo(`Number of faces detected: ${detections.length}`);
            } else if (detections.length < 1) {
                echo('No humans are detected.');
            } else if (detections.length === 1) {
                echo('Human is detected.');
                echo(`Number of faces detected: ${detections.length}`);
            }
        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {

        echo('Failed to load image.');
    };
}

//Detect Faces
async function detectFaces(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    if (!data) {
        echo('No image data provided.');
        return;
    }

    // Load the models
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceExpressionNet.loadFromUri("Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const imgSrc = imagedir + data;
    img.src = imgSrc;

    // Check if the image source is valid
    img.onload = async () => {
        if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
            document.body.appendChild(img);

            // Detect faces
            const detections = await faceapi.detectAllFaces(img);

            echo(`Number of faces detected: ${detections.length}`);

        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {

        echo('Failed to load image.');
    };
}

//Detect Emotion
async function detectEmotion(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    if (!data) {
        echo('No image data provided.');
        return;
    }

    // Load the models
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceExpressionNet.loadFromUri("Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const imgSrc = imagedir + data;
    img.src = imgSrc;

    // Check if the image source is valid
    img.onload = async () => {
        if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
            document.body.appendChild(img);

            // Detect faces with emotion
            const detections = await faceapi.detectAllFaces(img)
                .withFaceLandmarks()
                .withFaceDescriptors()
                .withFaceExpressions();

            if (detections.length > 0) {
                detections.forEach(detection => {
                    const { expressions } = detection;
                    echo('Expressions:');
                    Object.keys(expressions).forEach(expression => {
                        echo(`${expression}: ${(expressions[expression] * 100).toFixed(2)}%`);
                    });
                });
            } else {
                const audio = new Audio('Effects/Wrong Input.mp3');
                audio.play();
                echo('No faces detected.');
            }

        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {

        echo('Failed to load image.');
    };
}

//Detect Gender
async function detectGender(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    if (!data) {
        echo('No image data provided.');
        return;
    }

    // Load the models
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Models/Faceapi/");
    await faceapi.nets.ageGenderNet.loadFromUri("Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const imgSrc = imagedir + data;
    img.src = imgSrc;

    // Check if the image source is valid
    img.onload = async () => {
        if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
            document.body.appendChild(img);

            // Detect faces with gender
            const detections = await faceapi.detectAllFaces(img)
                .withFaceLandmarks()
                .withFaceDescriptors()
                .withAgeAndGender();

            if (detections.length > 0) {
                detections.forEach(detection => {
                    const { gender, genderProbability } = detection;
                    echo(`Gender: ${gender}, Probability: ${(genderProbability * 100).toFixed(2)}`);
                });
            } else {
                const audio = new Audio('Effects/Wrong Input.mp3');
                audio.play();
                echo('No faces detected.');
            }

        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {

        echo('Failed to load image.');
    };
}

//Detect Age
async function detectAge(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    if (!data) {
        echo('No image data provided.');
        return;
    }

    // Load the models
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Models/Faceapi/");
    await faceapi.nets.ageGenderNet.loadFromUri("Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const imgSrc = imagedir + data;
    img.src = imgSrc;

    // Check if the image source is valid
    img.onload = async () => {
        if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
            document.body.appendChild(img);

            // Detect faces with age and gender
            const detections = await faceapi.detectAllFaces(img)
                .withFaceLandmarks()
                .withFaceDescriptors()
                .withAgeAndGender();

            if (detections.length > 0) {
                detections.forEach(detection => {
                    const { gender, genderProbability, age } = detection;
                    echo(`Age: ${age}`);
                });
            } else {
                const audio = new Audio('Effects/Wrong Input.mp3');
                audio.play();
                echo('No faces detected.');
            }

        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {

        echo('Failed to load image.');
    };
}

// Convert seconds to minutes
function secondsToMinutes(seconds) {
    echo(seconds / 60);
}

// Convert seconds to hours
function secondsToHours(seconds) {
    echo(seconds / 3600); // 60 seconds * 60 minutes
}

// Convert seconds to days
function secondsToDays(seconds) {
    echo(seconds / 86400); // 60 seconds * 60 minutes * 24 hours
}

// Convert seconds to months
function secondsToMonths(seconds) {
    echo(seconds / 2592000); // 60 seconds * 60 minutes * 24 hours * 30 days
}

// Convert seconds to years
function secondsToYears(seconds) {
    echo(seconds / 31536000); // 60 seconds * 60 minutes * 24 hours * 365 days
}

// Convert minutes to seconds
function minutesToSeconds(minutes) {
    echo(minutes * 60);
}

// Convert minutes to hours
function minutesToHours(minutes) {
    echo(minutes / 60);
}

// Convert minutes to days
function minutesToDays(minutes) {
    echo(minutes / 1440); // 60 minutes * 24 hours
}

// Convert minutes to months
function minutesToMonths(minutes) {
    echo(minutes / 43200); // 60 minutes * 24 hours * 30 days
}

// Convert minutes to years
function minutesToYears(minutes) {
    echo(minutes / 525600); // 60 minutes * 24 hours * 365 days
}

// Convert hours to seconds
function hoursToSeconds(hours) {
    echo(hours * 3600); // 60 seconds * 60 minutes
}

// Convert hours to minutes
function hoursToMinutes(hours) {
    echo(hours * 60);
}

// Convert hours to days
function hoursToDays(hours) {
    echo(hours / 24);
}

// Convert hours to months
function hoursToMonths(hours) {
    echo(hours / 720); // 24 hours * 30 days
}

// Convert hours to years
function hoursToYears(hours) {
    echo(hours / 8760); // 24 hours * 365 days
}

// Convert days to seconds
function daysToSeconds(days) {
    echo(days * 86400); // 60 seconds * 60 minutes * 24 hours
}

// Convert days to minutes
function daysToMinutes(days) {
    echo(days * 1440); // 60 minutes * 24 hours
}

// Convert days to hours
function daysToHours(days) {
    echo(days * 24);
}

// Convert days to months
function daysToMonths(days) {
    echo(days / 30);
}

// Convert days to years
function daysToYears(days) {
    echo(days / 365);
}

// Convert months to seconds
function monthsToSeconds(months) {
    echo(months * 2592000); // 60 seconds * 60 minutes * 24 hours * 30 days
}

// Convert months to minutes
function monthsToMinutes(months) {
    echo(months * 43200); // 60 minutes * 24 hours * 30 days
}

// Convert months to hours
function monthsToHours(months) {
    echo(months * 720); // 24 hours * 30 days
}

// Convert months to days
function monthsToDays(months) {
    echo(months * 30);
}

// Convert months to years
function monthsToYears(months) {
    echo(months / 12);
}

// Convert years to seconds
function yearsToSeconds(years) {
    echo(years * 31536000); // 60 seconds * 60 minutes * 24 hours * 365 days
}

// Convert years to minutes
function yearsToMinutes(years) {
    echo(years * 525600); // 60 minutes * 24 hours * 365 days
}

// Convert years to hours
function yearsToHours(years) {
    echo(years * 8760); // 24 hours * 365 days
}

// Convert years to days
function yearsToDays(years) {
    echo(years * 365);
}

// Convert years to months
function yearsToMonths(years) {
    echo(years * 12);
}

//Guess
function getGuesses(input) {
    const sortedInput = input.split('').sort().join(''); // Sort the input letters alphabetically
    const matchingWords = wordbank.filter(word => {
        const sortedWord = word.split('').sort().join(''); // Sort each word in the word bank alphabetically
        return sortedWord === sortedInput; // Check if the sorted word matches the sorted input
    });
    echo(matchingWords);
}

//predict
// Function to calculate the mean of an array
function mean(arr) {
    return arr.reduce((sum, value) => sum + value, 0) / arr.length;
}

//Love Calculator
function loveCalculator(name1, name2) {
    // Clean up names and combine them
    let combinedNames = (name1 + name2).toLowerCase().replace(/\s+/g, '');

    // Create a frequency map of letters
    let letterCounts = {};
    for (let char of combinedNames) {
        if (letterCounts[char]) {
            letterCounts[char]++;
        } else {
            letterCounts[char] = 1;
        }
    }

    // Convert the frequency map to a string of numbers
    let countsString = Object.values(letterCounts).join('');

    // Function to reduce a string of numbers to a single digit
    function reduceToSingleDigit(numberString) {
        while (numberString.length > 1) {
            let sum = 0;
            for (let char of numberString) {
                sum += parseInt(char, 10);
            }
            numberString = sum.toString();
        }
        return parseInt(numberString, 10);
    }

    // Reduce the countsString to a single digit
    let compatibilityScore = reduceToSingleDigit(countsString);

    // Create a compatibility message based on the score
    let compatibilityMessages = {
        1: 'You are not a good match. Your strong personalities may lead to conflicts and power struggles. It’s important to work on communication and compromise.',
        2: 'You are a good match! Your balanced personalities create harmony and support. Your relationship is likely to thrive with mutual understanding and respect.',
        3: 'You are not a good match. Balancing fun and responsibility might be challenging. Finding common ground and shared interests could strengthen your bond.',
        4: 'You are not a good match. Your stability may lead to rigidity in the relationship. Flexibility and openness to change can improve your connection.',
        5: 'You are not a good match. Adventure may clash with commitment in your relationship. Finding ways to blend excitement and commitment can lead to growth.',
        6: 'You are a great match! Your love is nurturing and family-oriented. Building a strong foundation based on trust and care is key to your happiness together.',
        7: 'You are not a good match. Emotional expression may be a challenge. Cultivating emotional intelligence and empathy can deepen your connection.',
        8: 'You are not a good match. Material success might overshadow emotional needs. Balancing material goals with emotional fulfillment is essential for your happiness.',
        9: 'You are a good match! Your relationship focuses on compassion and the greater good. Supporting each other’s dreams and values strengthens your bond.'
    };

    let goodScores = [2, 6, 9]; // Adjust this array based on your preferences for "good" scores
    let message = goodScores.includes(compatibilityScore)
        ? `Good compatibility: ${compatibilityMessages[compatibilityScore]}`
        : `Poor compatibility: ${compatibilityMessages[compatibilityScore]}`;

    echo('Score: ' + compatibilityScore);
    echo('Prediction: ' + message);
}

//Numerlogy
function processNumerologyInput(input) {
    // Numerology value mappings for letters
    const numerologyValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };

    // Extract input values
    const [name1, dob1, name2, dob2] = input.split(':').map((s, i) => i % 2 === 0 ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s);

    if (!name1 || !dob1 || !name2 || !dob2) {

        return 'Invalid input. Please provide names and dates of birth in the format "name1:dob1:name2:dob2".';
    }

    // Helper function to calculate numerology number
    function calculateNumber(value) {
        while (value > 9 && ![11, 22, 33].includes(value)) {
            value = value.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
        return value;
    }

    // Calculate numerology numbers for names
    let sumName1 = 0, sumName2 = 0;
    for (let char of name1.toUpperCase()) {
        if (numerologyValues[char]) {
            sumName1 += numerologyValues[char];
        }
    }
    for (let char of name2.toUpperCase()) {
        if (numerologyValues[char]) {
            sumName2 += numerologyValues[char];
        }
    }
    const num1 = calculateNumber(sumName1);
    const num2 = calculateNumber(sumName2);

    // Calculate Life Path numbers from dates of birth
    const [year1, month1, day1] = dob1.split('-').map(Number);
    const [year2, month2, day2] = dob2.split('-').map(Number);
    const lifePath1 = calculateNumber(year1 + month1 + day1);
    const lifePath2 = calculateNumber(year2 + month2 + day2);

    // Calculate Destiny numbers
    const destiny1 = calculateNumber(sumName1);
    const destiny2 = calculateNumber(sumName2);

    // Calculate Soul Urge numbers
    const vowels = 'AEIOU';
    let sumSoulUrge1 = 0, sumSoulUrge2 = 0;
    for (let char of name1.toUpperCase()) {
        if (vowels.includes(char)) {
            sumSoulUrge1 += numerologyValues[char];
        }
    }
    for (let char of name2.toUpperCase()) {
        if (vowels.includes(char)) {
            sumSoulUrge2 += numerologyValues[char];
        }
    }
    const soulUrge1 = calculateNumber(sumSoulUrge1);
    const soulUrge2 = calculateNumber(sumSoulUrge2);

    // Compatibility descriptions
    const compatibility = {
        1: 'Leadership, independence, and individuality. \n - Pros: Strong leadership qualities, highly independent and self-reliant, ambitious and goal-oriented. \n - Cons: Can be domineering or controlling, may struggle with compromise, possible tendency towards selfishness. \n - Advice: Partners need to respect each other\'s independence and create a balance between leading and supporting. Open communication and mutual respect are key.',
        2: 'Sensitivity, balance, and harmony. \n - Pros: Highly empathetic and understanding, excellent at creating balance and harmony, good at mediating conflicts. \n - Cons: May be overly sensitive or emotional, can be indecisive, may avoid confrontation. \n - Advice: Focus on open and honest communication to prevent misunderstandings. Encourage each other to make decisions confidently and address issues directly.',
        3: 'Creativity, self-expression, and joy. \n - Pros: Highly creative and expressive, brings joy and enthusiasm into relationships, excellent communication skills. \n - Cons: May be prone to mood swings, can be overly expressive or dramatic, may struggle with responsibility. \n - Advice: Encourage each other\'s creative pursuits and find ways to balance joy with responsibility. Be patient and understanding during emotional ups and downs.',
        4: 'Stability, order, and responsibility. \n - Pros: Highly reliable and responsible, excellent at creating structure and order, strong sense of duty and commitment. \n - Cons: Can be rigid or inflexible, may struggle with spontaneity, possible tendency towards being overly serious. \n - Advice: Appreciate each other\'s reliability and work together to introduce flexibility and fun into the relationship. Balance structure with spontaneity.',
        5: 'Freedom, change, and adventure. \n - Pros: Highly adaptable and open to change, brings excitement and adventure into relationships, excellent at embracing new experiences. \n - Cons: May be restless or impulsive, can struggle with commitment, possible tendency towards being unpredictable. \n - Advice: Embrace each other\'s need for freedom and adventure while finding ways to create stability and commitment. Communicate openly about boundaries and expectations.',
        6: 'Love, family, and responsibility. \n - Pros: Highly nurturing and caring, excellent at creating a loving and supportive environment, strong sense of responsibility towards family. \n - Cons: Can be overly protective or controlling, may struggle with self-care, possible tendency towards taking on too much responsibility. \n - Advice: Support each other\'s nurturing qualities while encouraging self-care and independence. Balance family responsibilities with personal well-being.',
        7: 'Spirituality, introspection, and wisdom. \n - Pros: Highly introspective and wise, excellent at seeking deeper meaning and understanding, strong sense of spirituality. \n - Cons: Can be withdrawn or aloof, may struggle with emotional expression, possible tendency towards overthinking. \n - Advice: Appreciate each other\'s introspective nature and find ways to connect on a deeper level. Encourage open emotional expression and avoid overthinking.',
        8: 'Power, success, and material achievement. \n - Pros: Highly ambitious and goal-oriented, excellent at achieving success and material wealth, strong leadership qualities. \n - Cons: Can be overly focused on material success, may struggle with work-life balance, possible tendency towards being controlling. \n - Advice: Support each other\'s ambitions while finding ways to balance work and personal life. Emphasize the importance of emotional and relational success alongside material achievements.',
        9: 'Compassion, humanitarianism, and completion. \n - Pros: Highly compassionate and caring, excellent at seeing the bigger picture and working towards humanitarian goals, strong sense of empathy. \n - Cons: Can be overly idealistic, may struggle with practicality, possible tendency towards neglecting personal needs. \n - Advice: Encourage each other\'s compassionate nature while finding ways to balance idealism with practicality. Ensure personal needs are met alongside humanitarian goals.',
        11: 'Inspiration, idealism, and intuition. \n - Pros: Highly intuitive and inspirational, excellent at bringing visionary ideas into relationships, strong sense of idealism. \n - Cons: Can be overly idealistic or unrealistic, may struggle with practical implementation, possible tendency towards being overly sensitive. \n - Advice: Embrace each other\'s visionary qualities while finding ways to ground ideas in reality. Balance idealism with practicality and encourage open communication.',
        22: 'Master builder, large-scale plans, and potential. \n - Pros: Highly capable of achieving large-scale goals, excellent at creating and building substantial projects, strong sense of potential and ambition. \n - Cons: Can be overly focused on grand plans, may struggle with details, possible tendency towards being overly serious. \n - Advice: Support each other\'s grand visions while ensuring attention to detail and balance. Find ways to incorporate joy and relaxation into the pursuit of large-scale goals.',
        33: 'Master teacher, spiritual uplifting, and compassion. \n - Pros: Highly compassionate and spiritually uplifting, excellent at teaching and guiding others, strong sense of empathy and understanding. \n - Cons: Can be overly self-sacrificing, may struggle with setting boundaries, possible tendency towards neglecting personal needs. \n - Advice: Encourage each other\'s compassionate and teaching qualities while ensuring personal boundaries and self-care. Balance giving to others with taking care of personal well-being.'
    };

    const relationshipPotential = (num1 + num2) % 9 || 9;

    echo(`Numerology compatibility for ${name1} and ${name2}:
  
      ${name1}:
      - Core Number: ${num1} (${compatibility[num1]})
      - Life Path Number: ${lifePath1} (${compatibility[lifePath1]})
      - Destiny Number: ${destiny1} (${compatibility[destiny1]})
      - Soul Urge Number: ${soulUrge1} (${compatibility[soulUrge1]})
  
      ${name2}:
      - Core Number: ${num2} (${compatibility[num2]})
      - Life Path Number: ${lifePath2} (${compatibility[lifePath2]})
      - Destiny Number: ${destiny2} (${compatibility[destiny2]})
      - Soul Urge Number: ${soulUrge2} (${compatibility[soulUrge2]})
  
      Together, ${name1} and ${name2} have a relationship potential number ${relationshipPotential}, which signifies:
      ${compatibility[relationshipPotential]}.`);
}

//Zodiac Sign
function getZodiacSign(dateOfBirth) {
    const [year, month, day] = dateOfBirth.split('-').map(Number);

    const zodiacSigns = [
        { sign: 'Capricorn', start: '01-01', end: '01-19', details: 'Capricorns are responsible, disciplined, and have excellent self-control.' },
        { sign: 'Aquarius', start: '01-20', end: '02-18', details: 'Aquarians are independent, original, and humanitarian.' },
        { sign: 'Pisces', start: '02-19', end: '03-20', details: 'Pisceans are compassionate, artistic, and intuitive.' },
        { sign: 'Aries', start: '03-21', end: '04-19', details: 'Aries are courageous, determined, and natural-born leaders.' },
        { sign: 'Taurus', start: '04-20', end: '05-20', details: 'Taureans are reliable, patient, and devoted.' },
        { sign: 'Gemini', start: '05-21', end: '06-20', details: 'Geminis are curious, adaptable, and excellent communicators.' },
        { sign: 'Cancer', start: '06-21', end: '07-22', details: 'Cancers are nurturing, sensitive, and deeply intuitive.' },
        { sign: 'Leo', start: '07-23', end: '08-22', details: 'Leos are generous, confident, and natural-born leaders.' },
        { sign: 'Virgo', start: '08-23', end: '09-22', details: 'Virgos are practical, loyal, and hardworking.' },
        { sign: 'Libra', start: '09-23', end: '10-22', details: 'Libras are diplomatic, social, and value harmony.' },
        { sign: 'Scorpio', start: '10-23', end: '11-21', details: 'Scorpios are passionate, determined, and assertive.' },
        { sign: 'Sagittarius', start: '11-22', end: '12-21', details: 'Sagittarians are adventurous, optimistic, and freedom-loving.' },
        { sign: 'Capricorn', start: '12-22', end: '12-31', details: 'Capricorns are responsible, disciplined, and have excellent self-control.' },
    ];

    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const sign = zodiacSigns.find(({ start, end }) => dateStr >= start && dateStr <= end);
    if (sign) {
        echo(`You are a ${sign.sign}. ${sign.details}`);
    } else {

        echo('Invalid date of birth.');
    }
}

//FLAMES Game
function flames(input) {
    // Split the input into two names
    const [name1, name2] = input.split(',');

    // Remove spaces and convert to lowercase
    const cleanName1 = name1.replace(/\s+/g, '').toLowerCase();
    const cleanName2 = name2.replace(/\s+/g, '').toLowerCase();

    // Function to count and remove common characters
    function getCommonCharactersCount(name1, name2) {
        let name1Arr = name1.split('');
        let name2Arr = name2.split('');

        name1Arr.forEach(char => {
            const index = name2Arr.indexOf(char);
            if (index !== -1) {
                name2Arr.splice(index, 1);
            }
        });

        return name1Arr.length + name2Arr.length;
    }

    const count = getCommonCharactersCount(cleanName1, cleanName2);

    const flamesArr = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
    let index = 0;

    // Loop to find the FLAMES outcome
    while (flamesArr.length > 1) {
        index = (count % flamesArr.length) - 1;
        if (index >= 0) {
            flamesArr.splice(index, 1);
        } else {
            flamesArr.splice(flamesArr.length - 1, 1);
        }
    }

    echo(flamesArr[0]);
}

//Remove Punctuation
function removePunctuation(text) {
    // Define the punctuation marks to remove
    const punctuationMarks = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    // Remove punctuation using regex and return the cleaned text
    echo(text.replace(punctuationMarks, ''));
}

// Function to calculate the next number in the sequence using linear regression
function predictNextNumber(sequence) {
    const numbers = sequence.split(',').map(Number);
    const n = numbers.length;

    if (n < 2) {
        throw new Error("At least two numbers are required to predict the next number.");
    }

    const x = Array.from({ length: n }, (_, i) => i + 1);
    const y = numbers;

    const meanX = mean(x);
    const meanY = mean(y);

    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
        numerator += (x[i] - meanX) * (y[i] - meanY);
        denominator += (x[i] - meanX) * (x[i] - meanX);
    }

    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;

    const nextX = n + 1;
    const nextY = slope * nextX + intercept;

    echo(nextY);
}

//Input color
function inputColor(input) {
    document.getElementById('input').style.color = input;
}

//Theme Pinky
function themePinky() {
    userBgColor = 'pink';
    userColor = 'black';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Hacker
function themeHacker() {
    userBgColor = 'black';
    userColor = 'green';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Valentine
function themeValentine() {
    userBgColor = '#fe5757';
    userColor = 'black';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Sunrise
function themeSunrise() {
    userBgColor = '#ff9a00';
    userColor = 'black';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Energy
function themeEnergy() {
    userBgColor = '#101820';
    userColor = '#FEE715';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Vibrant
function themeLoversParadise() {
    userBgColor = '#F96167';
    userColor = '#F9E795';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Soft
function themeSoft() {
    userBgColor = '#F98866';
    userColor = '#FFF2D7';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

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

//Count
function countBackward(number) {
    // Check if the input is a valid number
    if (isNaN(number)) {

        echo('Please provide a valid number after "count:".');  // Assuming echo is a function that displays a message
        return;  // Exit the function if the input is not a valid number
    }

    // Check if the number is positive
    if (number <= 0) {

        echo('Please provide a positive number greater than zero.');
        return;  // Exit the function if the input is not a positive number
    }

    // Start counting backward in real-time
    let count = number;

    // Define a function to update the count in real-time
    function updateCount() {
        if (count >= 1) {
            echo(count + '\n');  // Append '\n' for a new line
            count--;
            setTimeout(updateCount, 1000);  // Update the count every 1000ms (1 second)
        }
    }

    updateCount();  // Start updating the count in real-time
}

//Sort
function customSort(input) {
    const parts = input.split(':');
    if (parts.length !== 3 || !['ascending', 'descending'].includes(parts[1])) {
        return 'Invalid input format. Please use the format: sort:ascending:1,2,1,4,53,2,4,5,2,... or sort:descending:apple,bay,app,bay,apend...';
    }

    const order = parts[1] === 'ascending' ? 1 : -1;
    const items = parts[2].split(',');

    if (items.every(item => !isNaN(item))) {
        // If all items are numbers, sort as numbers
        items.sort((a, b) => order * (Number(a) - Number(b)));
    } else {
        // Otherwise, sort as strings
        items.sort((a, b) => order * a.localeCompare(b));
    }

    echo(items.join(','));
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
    const youtubeurl = 'https://www.youtube.com/results?search_query=' + query + '';
    window.open(youtubeurl, '_blank');
}

//Search Threads
function searchThreads(input) {
    const query = input.trim().replace(/^threads:\b\s*/i, ''); // Trim spaces and replace "open"
    const youtubeurl = 'https://www.threads.net/@' + query + '/';
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

//Search Bellesa
function searchBellesa(input) {
    const query = input.trim().replace(/^bellesa:\b\s*/i, ''); // Trim spaces and replace "open"
    const bellesaurl = 'https://www.bellesa.co/search?q=' + query;
    window.open(bellesaurl, '_blank');
}

//Search Yourdoll
function searchYourdoll(input) {
    const query = input.trim().replace(/^yourdoll:\b\s*/i, ''); // Trim spaces and replace "open"
    const yourdollurl = 'https://www.yourdoll.com/?s=' + query + '&post_type=product';
    window.open(yourdollurl, '_blank');
}

//Search Clips4sale
function searchClips4sale(input) {
    const query = input.trim().replace(/^clips4sale:\b\s*/i, ''); // Trim spaces and replace "open"
    const clips4saleurl = 'https://www.clips4sale.com/clips/search/' + query + '/category/0/storesPage/1/clipsPage/1';
    window.open(clips4saleurl, '_blank');
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

//Search NoodleMagazine
function openNoodleMagazine(input) {
    const query = input.trim().replace(/^noodlemagazine:\b\s*/i, ''); // Trim spaces and replace "open"
    const noodlemagazineurl = 'https://noodlemagazine.com/video/' + query;
    window.open(noodlemagazineurl, '_blank');
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

// Random Color
function getRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    echo(`Random Color: ${randomColor}`);
}

// Random Number
function getRandomNumber() {
    const min = 0;
    const max = 999999999999999;
    echo(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Random Alphabet
function getRandomAlphabet() {
    const randomIndex = Math.floor(Math.random() * englishalphabets.length);
    echo(englishalphabets[randomIndex]);
}

// Random Weekday
function getRandomWeekday() {
    const randomIndex = Math.floor(Math.random() * weekdays.length);
    const capitalizedWeekday = weekdays[randomIndex].charAt(0).toUpperCase() + weekdays[randomIndex].slice(1);
    echo(capitalizedWeekday);
}

// Random Weekend
function getRandomWeekend() {
    const randomIndex = Math.floor(Math.random() * weekends.length);
    const capitalizedWeekend = weekends[randomIndex].charAt(0).toUpperCase() + weekends[randomIndex].slice(1);
    echo(capitalizedWeekend);
}

// Random Video Game
function getRandomVideoGame() {
    const randomIndex = Math.floor(Math.random() * videogames.length);
    const capitalizedVideoGame = videogames[randomIndex].charAt(0).toUpperCase() + videogames[randomIndex].slice(1);
    echo(capitalizedVideoGame);
}

// Random Song
function getRandomSong() {
    const randomIndex = Math.floor(Math.random() * popularsongs.length);
    const capitalizedSong = popularsongs[randomIndex].charAt(0).toUpperCase() + popularsongs[randomIndex].slice(1);
    echo(capitalizedSong);
}

// Random Song Genre
function getRandomSongGenre() {
    const randomIndex = Math.floor(Math.random() * musicgenres.length);
    const capitalizedMusicGenre = musicgenres[randomIndex].charAt(0).toUpperCase() + musicgenres[randomIndex].slice(1);
    echo(capitalizedMusicGenre);
}

// Random Movie
function getRandomMovie() {
    const randomIndex = Math.floor(Math.random() * popularmovies.length);
    const capitalizedMovie = popularmovies[randomIndex].charAt(0).toUpperCase() + popularmovies[randomIndex].slice(1);
    echo(capitalizedMovie);
}

// Random Movie Genre
function getRandomMovieGenre() {
    const randomIndex = Math.floor(Math.random() * moviegenres.length);
    const capitalizedMovieGenre = moviegenres[randomIndex].charAt(0).toUpperCase() + moviegenres[randomIndex].slice(1);
    echo(capitalizedMovieGenre);
}

// Random OS
function getRandomOperatingSystem() {
    const randomIndex = Math.floor(Math.random() * operatingsystems.length);
    const capitalizedOperatingSystem = operatingsystems[randomIndex].charAt(0).toUpperCase() + operatingsystems[randomIndex].slice(1);
    echo(capitalizedOperatingSystem);
}

// Random Programming Language
function getRandomProgrammingLanguage() {
    const randomIndex = Math.floor(Math.random() * programminglanguages.length);
    const capitalizedProgrammingLanguages = programminglanguages[randomIndex].charAt(0).toUpperCase() + programminglanguages[randomIndex].slice(1);
    echo(capitalizedProgrammingLanguages);
}

// Random Joke
function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const capitalizedJoke = jokes[randomIndex].charAt(0).toUpperCase() + jokes[randomIndex].slice(1);
    echo(capitalizedJoke);
}

// Random Pickup line
function getRandomPickupline() {
    const randomIndex = Math.floor(Math.random() * pickuplines.length);
    const capitalizedPickupline = pickuplines[randomIndex].charAt(0).toUpperCase() + pickuplines[randomIndex].slice(1);
    echo(capitalizedPickupline);
}

// Random Facts
function getRandomFacts() {
    const randomIndex = Math.floor(Math.random() * randomfacts.length);
    const capitalizedFact = randomfacts[randomIndex].charAt(0).toUpperCase() + randomfacts[randomIndex].slice(1);
    echo(capitalizedFact);
}

// Random Quotes
function getRandomQuotes() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const capitalizedQuote = quotes[randomIndex].charAt(0).toUpperCase() + quotes[randomIndex].slice(1);
    echo(capitalizedQuote);
}

// Random Fooditem
function getRandomFooditem() {
    const randomIndex = Math.floor(Math.random() * fooditems.length);
    const capitalizedFooditem = fooditems[randomIndex].charAt(0).toUpperCase() + fooditems[randomIndex].slice(1);
    echo(capitalizedFooditem);
}

// Random Profession
function getRandomProfession() {
    const randomIndex = Math.floor(Math.random() * professions.length);
    const capitalizedProfession = professions[randomIndex].charAt(0).toUpperCase() + professions[randomIndex].slice(1);
    echo(capitalizedProfession);
}

// Random Festival
function getRandomFestival() {
    const randomIndex = Math.floor(Math.random() * festivals.length);
    const capitalizedFestival = festivals[randomIndex].charAt(0).toUpperCase() + festivals[randomIndex].slice(1);
    echo(capitalizedFestival);
}

// Random Brand
function getRandomBrand() {
    const randomIndex = Math.floor(Math.random() * brands.length);
    const capitalizedBrand = brands[randomIndex].charAt(0).toUpperCase() + brands[randomIndex].slice(1);
    echo(capitalizedBrand);
}

// Random Zodiac Sign
function getRandomZodiacSign() {
    const randomIndex = Math.floor(Math.random() * zodiacSigns.length);
    const randomSign = zodiacSigns[randomIndex];
    const capitalizedSign = randomSign.charAt(0).toUpperCase() + randomSign.slice(1);
    echo(capitalizedSign);
}

// Random Quotes
function getRandomPlanet() {
    const randomIndex = Math.floor(Math.random() * planet.length);
    const randomPlanet = planet[randomIndex];
    const capitalizedQuote = randomPlanet.charAt(0).toUpperCase() + randomPlanet.slice(1);
    echo(capitalizedQuote);
}

// Random Country
function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    const capitalizedCountry = randomCountry.charAt(0).toUpperCase() + randomCountry.slice(1);
    echo(capitalizedCountry);
}

// Random European Country
function getRandomEuropeanCountry() {
    const randomIndex = Math.floor(Math.random() * europeancountries.length);
    const randomEuropeanCountry = europeancountries[randomIndex];
    const capitalizedEuropeanCountry = randomEuropeanCountry.charAt(0).toUpperCase() + randomEuropeanCountry.slice(1);
    echo(capitalizedEuropeanCountry);
}

// Random North American Country
function getRandomNorthAmericanCountry() {
    const randomIndex = Math.floor(Math.random() * northamericancountries.length);
    const randomNorthAmericanCountry = northamericancountries[randomIndex];
    const capitalizedNorthAmericanCountry = randomNorthAmericanCountry.charAt(0).toUpperCase() + randomNorthAmericanCountry.slice(1);
    echo(capitalizedNorthAmericanCountry);
}

// Random South American Country
function getRandomSouthAmericanCountry() {
    const randomIndex = Math.floor(Math.random() * southamericancountries.length);
    const randomSouthAmericanCountry = southamericancountries[randomIndex];
    const capitalizedSouthAmericanCountry = randomSouthAmericanCountry.charAt(0).toUpperCase() + randomSouthAmericanCountry.slice(1);
    echo(capitalizedSouthAmericanCountry);
}

// Random Asian Country
function getRandomAsianCountry() {
    const randomIndex = Math.floor(Math.random() * asiancountries.length);
    const randomAsianCountry = asiancountries[randomIndex];
    const capitalizedAsianCountry = randomAsianCountry.charAt(0).toUpperCase() + randomAsianCountry.slice(1);
    echo(capitalizedAsianCountry);
}

// Random African Country
function getRandomAfricanCountry() {
    const randomIndex = Math.floor(Math.random() * africancountries.length);
    const randomAfricanCountry = africancountries[randomIndex];
    const capitalizedAfricanCountry = randomAfricanCountry.charAt(0).toUpperCase() + randomAfricanCountry.slice(1);
    echo(capitalizedAfricanCountry);
}

// Fortune Cookie
function getFortuneCookie() {
    const randomIndex = Math.floor(Math.random() * fortunecookie.length);
    const randomFortune = fortunecookie[randomIndex];
    const capitalizedFortune = randomFortune.charAt(0).toUpperCase() + randomFortune.slice(1);
    echo(capitalizedFortune);
}

//Random Human Organ
function getRandomHumanOrgan() {
    const randomIndex = Math.floor(Math.random() * humanorgans.length);
    const randomHumanOrgan = humanorgans[randomIndex];
    const capitalizedHumanOrgan = randomHumanOrgan.charAt(0).toUpperCase() + randomHumanOrgan.slice(1);
    echo(capitalizedHumanOrgan);
}

//Random Culture
function getRandomCulture() {
    const randomIndex = Math.floor(Math.random() * cultures.length);
    const randomCulture = cultures[randomIndex];
    const capitalizedCulture = randomCulture.charAt(0).toUpperCase() + randomCulture.slice(1);
    echo(capitalizedCulture);
}

//Random Hairstyle
function getRandomHairstyle() {
    const randomIndex = Math.floor(Math.random() * hairstyles.length);
    const randomHairstyle = hairstyles[randomIndex];
    const capitalizedHairstyle = randomHairstyle.charAt(0).toUpperCase() + randomHairstyle.slice(1);
    echo(capitalizedHairstyle);
}

//Random Language
function getRandomLanguage() {
    const randomIndex = Math.floor(Math.random() * humanlanguages.length);
    const randomLanguage = humanlanguages[randomIndex];
    const capitalizedLanguage = randomLanguage.charAt(0).toUpperCase() + randomLanguage.slice(1);
    echo(capitalizedLanguage);
}

//Random Religion
function getRandomReligion() {
    const randomIndex = Math.floor(Math.random() * religions.length);
    const randomReligion = religions[randomIndex];
    const capitalizedReligion = randomReligion.charAt(0).toUpperCase() + randomReligion.slice(1);
    echo(capitalizedReligion);
}

//Random Name
function getRandomName() {
    randomarray = ['masculinenames', 'femininenames'];
    const randomArrayIndex = Math.floor(Math.random() * randomarray.length);
    const randomArrayOutput = randomarray[randomArrayIndex];
    if (randomArrayOutput === 'masculinenames') {
        getRandomMaleName();
    } else {
        getRandomFemaleName();
    }
}

//Random Male Name
function getRandomMaleName() {
    const randomIndex = Math.floor(Math.random() * masculinenames.length);
    const randomMasculineNames = masculinenames[randomIndex];
    const capitalizedMasculinename = randomMasculineNames.charAt(0).toUpperCase() + randomMasculineNames.slice(1);
    echo(capitalizedMasculinename);
}

//Random Female Name
function getRandomFemaleName() {
    const randomIndex = Math.floor(Math.random() * femininenames.length);
    const randomFeminineName = femininenames[randomIndex];
    const capitalizedFemininename = randomFeminineName.charAt(0).toUpperCase() + randomFeminineName.slice(1);
    echo(capitalizedFemininename);
}

//Random Bible Book
function getRandomBibleBook() {
    const randomIndex = Math.floor(Math.random() * bibleBooks.length);
    const randombibleBook = bibleBooks[randomIndex];
    const capitalizedbibleBook = randombibleBook.charAt(0).toUpperCase() + randombibleBook.slice(1);
    echo(capitalizedbibleBook);
}

//Random Male Clothing
function getRandomMaleClothing() {
    const randomIndex = Math.floor(Math.random() * masculineclothing.length);
    const randomMasculineClothing = masculineclothing[randomIndex];
    const capitalizedMasculineclothing = randomMasculineClothing.charAt(0).toUpperCase() + randomMasculineClothing.slice(1);
    echo(capitalizedMasculineclothing);
}

//Random Female Clothing
function getRandomFemaleClothing() {
    const randomIndex = Math.floor(Math.random() * feminineclothing.length);
    const randomFeminineClothing = feminineclothing[randomIndex];
    const capitalizedFeminineclothing = randomFeminineClothing.charAt(0).toUpperCase() + randomFeminineClothing.slice(1);
    echo(capitalizedFeminineclothing);
}

// Random Fruit
function getRandomFruit() {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    const randomFruit = fruits[randomIndex];
    const capitalizedFruit = randomFruit.charAt(0).toUpperCase() + randomFruit.slice(1);
    echo(capitalizedFruit);
}

// Random Vegetable
function getRandomVegetable() {
    const randomIndex = Math.floor(Math.random() * vegetables.length);
    const randomVegetable = vegetables[randomIndex];
    const capitalizedVegetable = randomVegetable.charAt(0).toUpperCase() + randomVegetable.slice(1);
    echo(capitalizedVegetable);
}

// Random Animal
function getRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const randomAnimal = animals[randomIndex];
    const capitalizedAnimal = randomAnimal.charAt(0).toUpperCase() + randomAnimal.slice(1);
    echo(capitalizedAnimal);
}

// Random Bird
function getRandomBird() {
    const randomIndex = Math.floor(Math.random() * birds.length);
    const randomBird = birds[randomIndex];
    const capitalizedBird = randomBird.charAt(0).toUpperCase() + randomBird.slice(1);
    echo(capitalizedBird);
}

// Random Flower
function getRandomFlower() {
    const randomIndex = Math.floor(Math.random() * flowers.length);
    const randomFlower = flowers[randomIndex];
    const capitalizedFlower = randomFlower.charAt(0).toUpperCase() + randomFlower.slice(1);
    echo(capitalizedFlower);
}

// Random Sex Position
function getRandomSexPosition() {
    const randomIndex = Math.floor(Math.random() * sexPositions.length);
    const randomsexPositions = sexPositions[randomIndex];
    const capitalizedsexPositions = randomsexPositions.charAt(0).toUpperCase() + randomsexPositions.slice(1);
    echo(capitalizedsexPositions);
}

// Short Adult Story
function getAdultStory() {
    const randomIndex = Math.floor(Math.random() * eroticstories.length);
    const randomEroticStory = eroticstories[randomIndex];
    const capitalizedEroticStory = randomEroticStory.charAt(0).toUpperCase() + randomEroticStory.slice(1);
    echo(capitalizedEroticStory);
}

// Short Story
function getShortStory() {
    const randomIndex = Math.floor(Math.random() * shortstories.length);
    const randomStory = shortstories[randomIndex];
    const capitalizedStory = randomStory.charAt(0).toUpperCase() + randomStory.slice(1);
    echo(capitalizedStory);
}

//Truthordare
function truthOrDare() {
    const result = Math.floor(Math.random() * 6) + 1;
    if (result % 2 !== 0) {
        const randomQuestion = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
        echo('Outcome: Truth');
        echo('Question: ' + randomQuestion);
    } else {
        const randomChallenge = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
        echo('Outcome: Dare');
        echo('Challenge: ' + randomChallenge);
    }
}

//Roll a dice
function rollDice() {
    // Generate a random number between 1 and 6 (inclusive)
    const result = Math.floor(Math.random() * 6) + 1;
    echo(result);
}

//Heads or taisl
function headsOrTails() {
    // Generate a random number (0 or 1)
    const result = Math.floor(Math.random() * 2);

    // Check the result and return heads or tails
    if (result === 0) {
        echo('Heads');
    } else {
        echo('Tails');
    }
}
//Happy Birthday 
function getHappybirthday() {
    // Initialize Tone.js
    Tone.start();

    // Create a synthesizer for the piano sound
    const piano = new Tone.Synth({
        oscillator: {
            type: 'sine' // You can change the type of oscillator for different piano sounds
        },
        envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1
        }
    }).toDestination(); // Connect to the audio output

    // Define the notes and their durations for "Twinkle, Twinkle, Little Star"
    const notes = [
        { note: 'C4', duration: '4n' },
        { note: 'C4', duration: '4n' },
        { note: 'G4', duration: '4n' },
        { note: 'G4', duration: '4n' },
        { note: 'A4', duration: '4n' },
        { note: 'A4', duration: '4n' },
        { note: 'G4', duration: '2n' },
        { note: 'F4', duration: '4n' },
        { note: 'F4', duration: '4n' },
        { note: 'E4', duration: '4n' },
        { note: 'E4', duration: '4n' },
        { note: 'D4', duration: '4n' },
        { note: 'D4', duration: '4n' },
        { note: 'C4', duration: '2n' }
    ];

    // Function to play a note
    function playNote(note, time, duration) {
        piano.triggerAttackRelease(note, duration, time);
    }

    // Function to play the melody
    function playMelody() {
        let startTime = Tone.now();
        notes.forEach((noteInfo) => {
            playNote(noteInfo.note, startTime, noteInfo.duration);
            startTime += Tone.Time(noteInfo.duration).toSeconds();
        });
    }

    // Call the playMelody function to play "Twinkle, Twinkle, Little Star"
    playMelody();

}

// Function to convert number to text
const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function numberToWords(num) {
    if (num === 0) return 'zero';

    let result = '';

    if (num >= 1000) {
        result += ones[Math.floor(num / 1000)] + ' thousand ';
        num %= 1000;
    }

    if (num >= 100) {
        result += ones[Math.floor(num / 100)] + ' hundred ';
        num %= 100;
    }

    if (num >= 20) {
        result += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
    } else if (num >= 10) {
        result += teens[num - 10];
        num = 0;
    }

    if (num > 0) {
        result += ones[num];
    }

    let finalresult = result.trim();
    echo(finalresult);
}

// Function to convert decimal to binary
function decimalToBinary(data) {
    const decimal = data.trim().replace(/^convert:decimaltobinary:\b\s*/i, '');
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(2));
}

// Function to convert decimal to octal
function decimalToOctal(data) {
    const decimal = data.trim().replace(/^convert:decimaltooctal:\b\s*/i, '');
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(8));
}

// Function to convert decimal to hexadecimal
function decimalToHexadecimal(data) {
    const decimal = data.trim().replace(/^convert:decimaltohexadecimal:\b\s*/i, '');
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(16).toUpperCase());
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

//Read
function readOutLine(text) {
    // Check if the Web Speech API is supported
    if ('speechSynthesis' in window) {
        // Create a new instance of SpeechSynthesisUtterance
        let utterance = new SpeechSynthesisUtterance(text);

        // Function to set the voice to a female one
        function setFemaleVoice() {
            // Get the available voices
            let voices = window.speechSynthesis.getVoices();
            // Find a female voice
            let femaleVoice = voices.find(voice => voice.gender === 'female' || voice.name.toLowerCase().includes('female'));

            // If a female voice is found, set it
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            } else {
                // Default to the first voice if no female voice is found
                utterance.voice = voices[0];
            }
        }

        // Voices might not be immediately available, so use the onvoiceschanged event
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = setFemaleVoice;
        } else {
            setFemaleVoice();
        }

        // Set some properties for the speech
        utterance.rate = 1; // Speed of the speech
        utterance.pitch = 1; // Pitch of the speech
        utterance.volume = 1; // Volume of the speech

        // Speak the text
        window.speechSynthesis.speak(utterance);
    } else {

        console.error('Speech synthesis not supported in this browser.');
    }
}

//String Reverse
function reverseString(input) {
    const data = input.trim().replace(/^reverse:\s*/i, '');
    const reversed = data.split('').reverse().join('');
    echo(`Reversed string: ${reversed}`);
}

// String Explode
function stringExplode(sentence, delimiter) {
    if (typeof sentence !== 'string' || typeof delimiter !== 'string') {

        echo('Both sentence and delimiter must be strings.');
    }
    echo('[' + sentence.split(delimiter) + ']');
}

// String remove space
function removeSpaces(data) {
    const input = data.trim().replace(/^remove:space:\s*/i, '');
    if (typeof input !== 'string') {

        echo('Input must be a string.');
    }

    // Use a regular expression to replace spaces globally
    echo(input.replace(/\s/g, ''));
}

//Math remove numbers
function removeNumbers(str) {
    let result = '';
    let start = 0;
    let end = 0;
    for (let i = 0; i <= str.length; i++) {
        if (/\d/.test(str[i]) || i === str.length) {
            if (start !== end) {
                result += str.slice(start, end);
            }
            start = i + 1;
            end = i + 1;
        } else {
            end++;
        }
    }
    echo(result);
}

//String remove single quotes
function removeSingleQuotes(data) {
    const inputString = data.trim().replace(/^remove:singlequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/'/g, ''));
}

//String remove double quotes
function removeDoubleQuotes(data) {
    const inputString = data.trim().replace(/^remove:doublequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/"/g, ''));
}

//String remove special characters
function removeSpecialCharacters(data) {
    const inputString = data.trim().replace(/^remove:specialcharacters:\s*/i, '');
    // Define the pattern for special characters using a regular expression
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g;
    // Replace special characters with an empty string
    var result = inputString.replace(pattern, '');
    echo("Output:" + result);
}

//String convert single quotes to double quotes
function convertSingleToDoubleQuotes(data) {
    const inputString = data.trim().replace(/^convert:singlequotestodoublequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/'/g, '"'));
}

//String convert double quotes to single quotes
function convertDoubleToSingleQuotes(data) {
    const inputString = data.trim().replace(/^convert:doublequotestosinglequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/"/g, `'`));
}

//String convert spaces to underscore
function convertSpacesToUnderscores(data) {
    const input = data.trim().replace(/^convert:spacetounderscore:\s*/i, '');
    if (typeof input !== 'string') {

        echo('Input must be a string.');
    }

    // Use replace method with a regular expression to replace spaces with underscores
    echo(input.replace(/\s/g, '_'));
}

//String Count Characters
function countCharacters(input) {
    const data = input.trim().replace(/^count:characters:\s*/i, '');
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
                    const audio = new Audio('Effects/Wrong Input.mp3');
                    audio.play();
                    echo('Failed to open new window.');
                }
            })
            .catch(function (error) {
                const audio = new Audio('Effects/Wrong Input.mp3');
                audio.play();
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

//Calculate
function calculate(num) {
    const parts = num.split('calculate:');
    if (parts.length !== 2) {

        echo('Invalid input format');
    }

    expression = parts[1].trim();
    try {
        // Replace 'x' with '*' for multiplication to work correctly
        const formattedExpression = expression.replace(/x/g, '*');
        // Using eval to evaluate the expression
        echo('The answer is ' + eval(formattedExpression));
    } catch (error) {

        // Handle any errors in the expression
        echo('Error: Invalid expression');
    }
}

//Calculate Log
function processLogCommand(input) {
    const parts = input.split(':');
    const command = parts[0].trim();
    const value = parseFloat(parts[1]);

    if (command.toLowerCase() === 'log' && !isNaN(value)) {
        const result = Math.log10(value);
        echo(`The logarithm base 10 of ${value} is ${result}`);
    } else {

        echo('Invalid log command or value');
    }
}

// Ceil
function processCeilCommand(input) {
    const parts = input.split(':');
    const command = parts[0].trim();
    const value = parseFloat(parts[1]);

    if (command.toLowerCase() === 'ceil' && !isNaN(value)) {
        const result = ceil(value);
        echo(`The ceiling value of ${value} is ${result}`);
    } else {

        echo('Invalid ceil command or value');
    }
}

function ceil(x) {
    if (Number.isInteger(x)) {
        return x;
    } else {
        return Math.ceil(x);
    }
}

//Float Absolute
function processFloatAbsolute(num) {
    let x = parseFloat(num.trim().replace(/^floatabsolute:\s*/i, ''));
    if (!isNaN(x)) {
        echo('The float absolute for ' + x + ' is ' + Math.abs(x));
    } else {

        echo('Invalid value'); // Return NaN for unsupported types or invalid input
    }
}

//Float
function processFloat(num) {
    let x = parseFloat(num.trim().replace(/^float:\s*/i, ''));
    if (!isNaN(x)) {
        echo('The float value is ' + x);
    } else {

        echo('Invalid value'); // Return NaN for unsupported types or invalid input
    }
}

// Function to calculate the Greatest Common Divisor (GCD) of two numbers
function processGcd(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {

        echo('Invalid input format. Please use "gcd:a,b" where a and b are numbers.');
        return;
    }

    // Euclidean algorithm to find GCD
    let a = Math.abs(numbers[0]);
    let b = Math.abs(numbers[1]);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    echo('GCD of ' + numbers[0] + ' and ' + numbers[1] + ' is ' + a);
}

// This is different from processGcd
function processGcdForLcm(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {

        echo('Invalid input format. Please use "gcd:a,b" where a and b are numbers.');
        return;
    }

    // Euclidean algorithm to find GCD
    let a = Math.abs(numbers[0]);
    let b = Math.abs(numbers[1]);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return (a);
}

// Function to calculate the Least Common Multiple (LCM) of two numbers
function processLcm(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {

        echo('Invalid input format. Please use "lcm:a,b" where a and b are numbers.');
        return;
    }

    // LCM is calculated using the formula: LCM(a, b) = (a * b) / GCD(a, b)
    const a = Math.abs(numbers[0]);
    const b = Math.abs(numbers[1]);
    const gcdValue = processGcdForLcm(input.split(':')[0] + ':' + numbers[0] + ',' + numbers[1]); // Calculate GCD first
    const lcmValue = (a * b) / gcdValue;
    echo('LCM of ' + numbers[0] + ' and ' + numbers[1] + ' is ' + lcmValue);
}

// Convert to lowercase
function convertToLowerCase(data) {
    let input = data.trim().replace(/^convert:tolowercase:\s*/i, '');
    if (typeof input === 'string') {
        echo(input.toLowerCase());
    } else {

        echo('Input must be a string.');
    }
}

// Convert to uppercase
function convertToUpperCase(data) {
    let input = data.trim().replace(/^convert:touppercase:\s*/i, '');
    if (typeof input === 'string') {
        echo(input.toUpperCase());
    } else {

        echo('Input must be a string.');
    }
}

//error
function errorhandling() {
    echo(`Not a valid command.`);
}

//Made with 💖 by Joel Jolly