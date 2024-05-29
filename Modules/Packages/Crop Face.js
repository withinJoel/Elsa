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