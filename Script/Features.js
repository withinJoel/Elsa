function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf' || file.type === 'text/plain') {
        // Remove existing image or video element if exists
        const existingDynamicElement = document.querySelector('[data-role="dynamic-dragged"]') || document.querySelector('[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-image"]');
        if (existingDynamicElement) {
            existingDynamicElement.remove();
        }

        if (file.type === 'application.pdf' || file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (file.type === 'application/pdf') {
                    window.open(URL.createObjectURL(file), '_blank');
                } else if (file.type === 'text/plain') {
                    const textWindow = window.open();
                    textWindow.document.write('<pre>' + e.target.result + '</pre>');
                }
            };
            reader.readAsText(file);
        } else {
            const url = URL.createObjectURL(file);
            const mediaElement = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');

            if (file.type.startsWith('video/')) {
                mediaElement.src = url;
                mediaElement.setAttribute('controls', true);
                mediaElement.setAttribute('data-role', 'dynamic-video');
            } else {
                mediaElement.src = url;
                mediaElement.setAttribute('data-role', 'dynamic-image');
            }

            mediaElement.style.position = 'fixed';
            mediaElement.style.top = '15px';
            mediaElement.style.right = '30px';
            mediaElement.style.maxWidth = '500px';
            mediaElement.style.maxHeight = '500px';

            document.body.appendChild(mediaElement);
        }
    } else {
        alert('Unsupported file type. Please upload an Image, a Video, a PDF, or a Text file.');
    }
}

function allowDrop(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragover', allowDrop);
    document.body.addEventListener('drop', handleFileDrop);
});