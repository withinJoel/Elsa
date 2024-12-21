//Remove Background
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}
async function removeBackground(img) {
    const sanitizedImg = sanitizeInput(img);
    const imageElement = imagedir + sanitizedImg;
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