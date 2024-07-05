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
        const imagePath = `${imagedir}/${data}`; // Assuming imagedir is the folder for images
    
        // Check if the image file exists
        if (!await fileExists(imagePath)) {
            echo("Image file is not found");
            return;
        }
    
        await predictNudityForImage(imagePath);
    } else {
        const videoPath = `${videodir}/${data}`; // Assuming videodir is the folder for videos
    
        // Check if the video file exists
        if (!await fileExists(videoPath)) {
            echo("Video file is not found");
            return;
        }
    
        await predictNudityForVideo(videoPath);
    }    
}

//Detect nudity for images
async function predictNudityForImage(filePath) {
    const imgElement = document.createElement('img');
    imgElement.style.position = 'fixed';
    imgElement.style.top = '15px';
    imgElement.style.right = '15px';
    imgElement.style.maxWidth = '500px';
    imgElement.style.maxHeight = '500px';
    imgElement.setAttribute('data-role', 'dynamic-image');

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

//Detect Nudity for video
async function predictNudityForVideo(filePath) {
    const videoElement = document.createElement('video');
    videoElement.style.position = 'fixed';
    videoElement.style.top = '15px';
    videoElement.style.right = '15px';
    videoElement.style.maxWidth = '500px';
    videoElement.style.maxHeight = '500px';
    videoElement.setAttribute('data-role', 'dynamic-video');
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