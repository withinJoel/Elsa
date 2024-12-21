//Detect Gender
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

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
    await faceapi.nets.ssdMobilenetv1.loadFromUri("Modules/Models/Faceapi/");
    await faceapi.nets.faceLandmark68Net.loadFromUri("Modules/Models/Faceapi/");
    await faceapi.nets.faceRecognitionNet.loadFromUri("Modules/Models/Faceapi/");
    await faceapi.nets.ageGenderNet.loadFromUri("Modules/Models/Faceapi/");

    const img = document.createElement('img');
    img.style.position = 'fixed';
    img.style.top = '15px';
    img.style.right = '15px';
    img.style.maxWidth = '500px';
    img.style.maxHeight = '500px';
    img.setAttribute('data-role', 'dynamic-image');

    const sanitizedData = sanitizeInput(data);
    const imgSrc = imagedir + sanitizedData;
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