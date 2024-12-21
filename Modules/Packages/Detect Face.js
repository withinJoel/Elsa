import DOMPurify from 'dompurify';

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
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Modules/Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Modules/Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Modules/Models/Faceapi/");
    await faceapi.nets.faceExpressionNet.loadFromUri("Modules/Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const sanitizedData = DOMPurify.sanitize(data);
    const imgSrc = imagedir + sanitizedData;
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

    const sanitizedData = DOMPurify.sanitize(data);
    const imgSrc = imagedir + sanitizedData;
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