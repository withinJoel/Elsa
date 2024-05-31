//Kiss
async function kissMe() {
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

    const imageElement = 'Modules/Packages/KissMe/Kiss.png';
    const audio = new Audio('Modules/Packages/KissMe/Kissing.mp3');
    audio.play();
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
        echo("Oops! I missed the kiss, Try again");
    }
}