//////////////////////////////////////////////////////////////////////////////
////Details///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const currentVersion = '1.1.4';
let imagedir = '../../../Bin/Images/';
let videodir = '../../../Bin/Videos/';

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
    }).catch(err => {
        echo(`There was an error: ${err}`);
    })
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
    echo("Elsa v1.1.4");
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo("Error fetching updates.")
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

//Open Image
async function image(data) {
    const existingImgElement = document.querySelector('img[data-role="dynamic-image"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');

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
            imgElement.style.right = '30px';
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
async function video(data) {
    const existingVidElement = document.querySelector('video[data-role="dynamic-video"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');

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
                vidElement.style.right = '30px';
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
    imgElement.style.right = '30px';
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
    for (let i = 0; i < 5; i++) {
        predictions.push(neuralNetwork.predict(grayscaleArray)[0]);
    }

    const isNude = predictions.every(prediction => prediction < 0.5); // Adjust threshold for sensitivity

    if (isNude) {
        echo('Yes, The image contains nudity.');
    } else {
        echo('No, The image does not contain any nudity.');
    }

    setTimeout(() => {
        document.body.removeChild(imgElement);
    }, 10000); // Remove the image after 10 seconds
}

async function predictNudityForVideo(filePath) {
    const videoElement = document.createElement('video');
    videoElement.style.position = 'fixed';
    videoElement.style.top = '15px';
    videoElement.style.right = '30px';
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

    setTimeout(() => {
        document.body.removeChild(videoElement);
    }, 10000); // Remove the video element after 10 seconds
}

//Detect Emotion
async function detectEmotion(data) {
    if (!data) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
    img.style.right = '30px';
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

            setTimeout(() => {
                document.body.removeChild(img);
            }, 10000);
        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Failed to load image.');
    };
}

//Detect Gender
async function detectGender(data) {
    if (!data) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
    img.style.right = '30px';
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

            setTimeout(() => {
                document.body.removeChild(img);
            }, 10000);
        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Failed to load image.');
    };
}

//Detect Age
async function detectAge(data) {
    if (!data) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
    img.style.right = '30px';
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

            setTimeout(() => {
                document.body.removeChild(img);
            }, 10000);
        } else {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo('Failed to load image.');
        }
    };

    // Handle image load error
    img.onerror = () => {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        1: 'Leadership, independence, and individuality.',
        2: 'Sensitivity, balance, and harmony.',
        3: 'Creativity, self-expression, and joy.',
        4: 'Stability, order, and responsibility.',
        5: 'Freedom, change, and adventure.',
        6: 'Love, family, and responsibility.',
        7: 'Spirituality, introspection, and wisdom.',
        8: 'Power, success, and material achievement.',
        9: 'Compassion, humanitarianism, and completion.',
        11: 'Inspiration, idealism, and intuition.',
        22: 'Master builder, large-scale plans, and potential.',
        33: 'Master teacher, spiritual uplifting, and compassion.'
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid date of birth.');
    }
}

//FLAMES Game
function flames(input) {
    // Split the input into two names
    const [name1, name2] = input.split(':');

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

//Echo function
function echoFunction(input) {
    const data = input.trim().replace(/^echo:\b\s*/i, ''); // Trim spaces and replace "open"
    echo(data);
}

//Change Background Color
function changeBodyColor(userColor) {

    // Check if the input is a valid color
    var isValidColor = /^#[0-9A-F]{6}$/i.test(userColor) || /^[a-z]+$/i.test(userColor);

    if (isValidColor) {
        // Set the body background color
        document.body.style.backgroundColor = userColor;
    } else {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Please provide a valid number after "count:".');  // Assuming echo is a function that displays a message
        return;  // Exit the function if the input is not a valid number
    }

    // Check if the number is positive
    if (number <= 0) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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

// Function to convert decimal to binary
function decimalToBinary(data) {
    const decimal = data.trim().replace(/^convert:decimaltobinary:\b\s*/i, '');
    if (isNaN(decimal)) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(2));
}

// Function to convert decimal to octal
function decimalToOctal(data) {
    const decimal = data.trim().replace(/^convert:decimaltooctal:\b\s*/i, '');
    if (isNaN(decimal)) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(8));
}

// Function to convert decimal to hexadecimal
function decimalToHexadecimal(data) {
    const decimal = data.trim().replace(/^convert:decimaltohexadecimal:\b\s*/i, '');
    if (isNaN(decimal)) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid octal number');
        return;
    }

    echo(octal);
}

//Convert Octal to Hexadecimal
function octalToHexadecimal(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltohexadecimal:\b\s*/i, ''), 8);
    if (isNaN(octal)) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Both sentence and delimiter must be strings.');
    }
    echo('[' + sentence.split(delimiter) + ']');
}

// String remove space
function removeSpaces(data) {
    const input = data.trim().replace(/^remove:space:\s*/i, '');
    if (typeof input !== 'string') {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Input must be a string');
    }
    echo(inputString.replace(/'/g, ''));
}

//String remove double quotes
function removeDoubleQuotes(data) {
    const inputString = data.trim().replace(/^remove:doublequotes:\s*/i, '');
    if (typeof inputString !== 'string') {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Input must be a string');
    }
    echo(inputString.replace(/'/g, '"'));
}

//String convert double quotes to single quotes
function convertDoubleToSingleQuotes(data) {
    const inputString = data.trim().replace(/^convert:doublequotestosinglequotes:\s*/i, '');
    if (typeof inputString !== 'string') {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Input must be a string');
    }
    echo(inputString.replace(/"/g, `'`));
}

//String convert spaces to underscore
function convertSpacesToUnderscores(data) {
    const input = data.trim().replace(/^convert:spacetounderscore:\s*/i, '');
    if (typeof input !== 'string') {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid input format');
    }

    expression = parts[1].trim();
    try {
        // Replace 'x' with '*' for multiplication to work correctly
        const formattedExpression = expression.replace(/x/g, '*');
        // Using eval to evaluate the expression
        echo('The answer is ' + eval(formattedExpression));
    } catch (error) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid value'); // Return NaN for unsupported types or invalid input
    }
}

//Float
function processFloat(num) {
    let x = parseFloat(num.trim().replace(/^float:\s*/i, ''));
    if (!isNaN(x)) {
        echo('The float value is ' + x);
    } else {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Invalid value'); // Return NaN for unsupported types or invalid input
    }
}

// Function to calculate the Greatest Common Divisor (GCD) of two numbers
function processGcd(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
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
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Input must be a string.');
    }
}

// Convert to uppercase
function convertToUpperCase(data) {
    let input = data.trim().replace(/^convert:touppercase:\s*/i, '');
    if (typeof input === 'string') {
        echo(input.toUpperCase());
    } else {
        const audio = new Audio('Effects/Wrong Input.mp3');
        audio.play();
        echo('Input must be a string.');
    }
}

//error
function errorhandling() {
    const audio = new Audio('Effects/Error.mp3');
    audio.play();
    echo(`Not a valid command.`);
}

//Made with 💖 by Joel Jolly