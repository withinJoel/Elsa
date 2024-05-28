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