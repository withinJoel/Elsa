async function detectHumans(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]');
    if (existingElement) {
        existingElement.remove();
    }
    if (data === ' ') {
        echo('No image data provided or image does not exist.');
    }

    const originalImage = document.createElement('img');
    originalImage.style.position = 'fixed';
    originalImage.style.top = '15px';
    originalImage.style.right = '15px';
    originalImage.style.maxWidth = '500px';
    originalImage.style.maxHeight = '500px';
    originalImage.setAttribute('data-role', 'dynamic-image');

    const imageSrc = imagedir + data; // Replace with the path to your image
    originalImage.src = imageSrc;
    document.body.appendChild(originalImage);

    console.log('Image Source:', imageSrc);

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
    console.log('Image Shape:', originalImg.shape);

    // Load the DeepLab model
    const model = await tf.loadGraphModel('Modules/Models/Tensorflow/Model/deeplab/pascal/model.json');
    console.log('Model Loaded:', model);

    // Preprocess the image for the model
    const resizedImage = tf.image.resizeBilinear(originalImg, [513, 513]);
    const int32Image = resizedImage.toInt();  // Convert the image to int32

    // Perform segmentation
    const segmentation = await model.execute({'ImageTensor': int32Image.reshape([-1, 513, 513, 3])});

    // Check the segmentation output
    console.log('Segmentation Output:', segmentation);

    // Get the segmentation data
    const segmentationData = segmentation.dataSync();
    console.log('Segmentation Data:', segmentationData);

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
}