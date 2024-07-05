//Detect Human
async function detectHumans(data) {
    const existingImageElement = document.querySelector('[data-role="dynamic-image"]');
    const existingVideoElement = document.querySelector('video[data-role="dynamic-video"]');
    const existingDraggedElement = document.querySelector('[data-role="dynamic-dragged"]');

    let foundElement = existingImageElement || existingVideoElement || existingDraggedElement;

    if (foundElement) {
        foundElement.remove();
    }

    if (!data.trim()) {
        echo('No image data provided or image does not exist.');
        return;
    }

    const fileExtension = data.split('.').pop().toLowerCase();
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp'];

    if (!imageExtensions.includes(fileExtension)) {
        echo('Unsupported file type for image detection.');
        return;
    }

    const originalImage = document.createElement('img');
    originalImage.style.position = 'fixed';
    originalImage.style.top = '15px';
    originalImage.style.right = '15px';
    originalImage.style.maxWidth = '500px';
    originalImage.style.maxHeight = '500px';
    originalImage.setAttribute('data-role', 'dynamic-image');

    const imageSrc = `${imagedir}/${data}`; // Assuming imagedir is the folder for images
    originalImage.src = imageSrc;
    document.body.appendChild(originalImage);

    console.log('Image Source:', imageSrc);

    try {
        // Load the original image
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        // Convert Blob to HTMLImageElement
        const img = await new Promise((resolve) => {
            const image = new Image();
            const url = URL.createObjectURL(blob);
            image.onload = () => {
                URL.revokeObjectURL(url);
                resolve(image);
            };
            image.src = url;
        });

        // Use the HTMLImageElement with tf.browser.fromPixels
        const originalImg = tf.browser.fromPixels(img);

        // Load the DeepLab model
        const model = await tf.loadGraphModel('Modules/Models/Tensorflow/Model/deeplab/pascal/model.json');

        // Preprocess the image for the model
        const resizedImage = tf.image.resizeBilinear(originalImg, [513, 513]);
        const int32Image = resizedImage.toInt();  // Convert the image to int32

        // Perform segmentation
        const segmentation = await model.execute({'ImageTensor': int32Image.reshape([-1, 513, 513, 3])});

        // Get the segmentation data
        const segmentationData = segmentation.dataSync();

        // Create a mask for the clothes (assuming class 15 is the person)
        const mask = new Uint8ClampedArray(513 * 513 * 4); // RGBA
        for (let i = 0; i < segmentationData.length; i++) {
            const classId = segmentationData[i];
            const offset = i * 4;
            if (classId === 15) {  // Assuming class 15 represents the person (including clothes)
                mask[offset] = 255;     // R
                mask[offset + 1] = 255; // G
                mask[offset + 2] = 255; // B
                mask[offset + 3] = 128; // A (50% transparency)
            } else {
                mask[offset + 3] = 0;   // Fully transparent
            }
        }

        // Create a new image data for the mask
        const maskImageData = new ImageData(mask, 513, 513);

        // Create a canvas for the original image
        const originalCanvas = document.createElement('canvas');
        originalCanvas.width = originalImg.shape[1];
        originalCanvas.height = originalImg.shape[0];
        const originalCtx = originalCanvas.getContext('2d');
        originalCtx.drawImage(img, 0, 0, originalImg.shape[1], originalImg.shape[0]);

        // Create a canvas for the mask
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = 513;
        maskCanvas.height = 513;
        const maskCtx = maskCanvas.getContext('2d');
        maskCtx.putImageData(maskImageData, 0, 0);

        // Draw the mask on top of the original image
        originalCtx.globalAlpha = 0.5; // Adjust transparency as needed
        originalCtx.drawImage(maskCanvas, 0, 0, originalImg.shape[1], originalImg.shape[0]);

        // Convert the canvas to an image
        const outputImage = new Image();
        outputImage.src = originalCanvas.toDataURL();
        outputImage.style.position = 'fixed';
        outputImage.style.top = '15px';
        outputImage.style.right = '15px';
        outputImage.style.maxWidth = '500px';
        outputImage.style.maxHeight = '500px';
        outputImage.setAttribute('data-role', 'dynamic-image');

        // Display the output image
        document.body.appendChild(outputImage);
    } catch (error) {
        echo('Error processing image:', error);
    }
}