function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/') || file.type === 'application/pdf' || file.type === 'text/plain') {
        // Remove existing dynamic elements if they exist
        const existingDynamicElement = document.querySelector('[data-role="dynamic-dragged"]') || 
                                      document.querySelector('[data-role="dynamic-video"]') || 
                                      document.querySelector('[data-role="dynamic-image"]') || 
                                      document.querySelector('[data-role="dynamic-audio"]');
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
        } else if (file.type.startsWith('audio/')) {
            const audioElement = document.createElement('audio');
            audioElement.src = URL.createObjectURL(file);
            audioElement.controls = true;
            audioElement.autoplay = true; // Autoplay for audio
            audioElement.style.position = 'fixed';
            audioElement.style.top = '15px';
            audioElement.style.right = '15px';
            audioElement.style.maxWidth = '500px';
            audioElement.setAttribute('data-role', 'dynamic-audio');
            
            document.body.appendChild(audioElement);
        } else {
            const reader = new FileReader();
            reader.onload = function(e) {
                const dynamicElement = document.createElement(file.type.startsWith('video/') ? 'video' : 'img');
                if (file.type.startsWith('video/')) {
                    dynamicElement.src = URL.createObjectURL(file);
                    dynamicElement.setAttribute('controls', true);
                    dynamicElement.autoplay = true; // Autoplay for video
                } else {
                    dynamicElement.src = e.target.result;
                }
                dynamicElement.style.position = 'fixed';
                dynamicElement.style.top = '15px';
                dynamicElement.style.right = '15px';
                dynamicElement.style.maxWidth = '500px';
                dynamicElement.style.maxHeight = '500px';
                dynamicElement.setAttribute('data-role', 'dynamic-dragged');
                
                document.body.appendChild(dynamicElement);
            };
            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                reader.readAsArrayBuffer(file);
            }
        }
    } else {
        alert('Unsupported file type. Please upload an Image, Video, Audio, PDF, or Text file.');
    }
}

function allowDrop(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragover', allowDrop);
    document.body.addEventListener('drop', handleFileDrop);
});