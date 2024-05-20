function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf' || file.type === 'text/plain') {
        // Remove existing image or video element if exists
        const existingDynamicElement = document.querySelector('[data-role="dynamic-dragged"]') || document.querySelector('[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-image"]');
        if (existingDynamicElement) {
            existingDynamicElement.remove();
        }
        
        if (file.type === 'application/pdf' || file.type === 'text/plain') {
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
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
                if (file.type.startsWith('video/')) {
                    imgElement.src = URL.createObjectURL(file);
                    imgElement.setAttribute('controls', true);
                } else {
                    imgElement.src = e.target.result;
                }
                imgElement.style.position = 'fixed';
                imgElement.style.top = '15px';
                imgElement.style.right = '30px';
                imgElement.style.maxWidth = '500px';
                imgElement.style.maxHeight = '500px';
                imgElement.setAttribute('data-role', 'dynamic-dragged');
                
                document.body.appendChild(imgElement);
            };
            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                reader.readAsArrayBuffer(file);
            }
        }
    } else {
        alert('Unsupported file type. Please upload an image, a video, a PDF, or a text file.');
    }
}

function allowDrop(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragover', allowDrop);
    document.body.addEventListener('drop', handleFileDrop);
});
