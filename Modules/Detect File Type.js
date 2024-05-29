function detectImageType(data) {
    const existingElement = document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]') || document.querySelector('[data-role="dynamic-image"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');
    if (existingElement) {
        existingElement.remove();
    }
    // Remove existing error message if any
    if (existingErrorElement) {
        document.body.removeChild(existingErrorElement);
    }
    const imageurl = document.createElement('img');
    imageurl.src = imagedir + data;
    imageurl.style.position = 'fixed';
    imageurl.style.top = '15px';
    imageurl.style.right = '15px';
    imageurl.style.maxWidth = '500px';
    imageurl.style.maxHeight = '500px';
    imageurl.setAttribute('data-role', 'dynamic-image');

    document.body.appendChild(imageurl);
    if (data === '') {
        echo("Please enter your file name.");
    } else if ((imageurl)) {
        if (data.includes('.png')) {
            echo("The file is in PNG format.");
        } else if (data.includes('.jpg')) {
            echo("The file is in JPG format.");
        } else if (data.includes('.jpeg')) {
            echo("The file is in JPEG format.");
        } else if (data.includes('.webp')) {
            echo("The file is in WEBP format.");
        }
    } else {
        echo("Image does not exist.")
    }
}

function detectVideoType(data) {
    const existingElement = document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-dragged"]') || document.querySelector('[data-role="dynamic-image"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');
    if (existingElement) {
        existingElement.remove();
    }
    // Remove existing error message if any
    if (existingErrorElement) {
        document.body.removeChild(existingErrorElement);
    }
    const videourl = document.createElement('video');
    videourl.src = videodir + data;
    videourl.style.position = 'fixed';
    videourl.style.top = '15px';
    videourl.style.right = '15px';
    videourl.style.maxWidth = '500px';
    videourl.style.maxHeight = '500px';
    videourl.controls = true;
    videourl.setAttribute('data-role', 'dynamic-video');

    document.body.appendChild(videourl);
    if (data === '') {
        echo("Please enter your file name.");
    } else if ((videourl)) {
        if (data.includes('.mp4')) {
            echo("The file is in MP4 format.");
        } else if (data.includes('.mkv')) {
            echo("The file is in MKV format.");
        } else if (data.includes('.avi')) {
            echo("The file is in AVI format.");
        }
    } else {
        echo("Video does not exist.")
    }
}

function detectAudioType(data) {
    audiourl = audiodir + data;
    if (data === '') {
        echo("Please enter your file name.");
    } else if ((audiourl)) {
        if (data.includes('.mp3')) {
            echo("The file is in MP3 format.");
        }
    } else {
        echo("Audio does not exist.")
    }
}

function detectScriptType(data) {
    scripturl = scriptdir + data;
    if (data === '') {
        echo("Please enter your file name.");
    } else if ((scripturl)) {
        if (data.includes('.js')) {
            echo("The file is in Javascript format.");
        } else if (data.includes('.json')) {
            echo("The file is in JSON format.");
        } else if (data.includes('.py')) {
            echo("The file is in Python format.");
        } else if (data.includes('.php')) {
            echo("The file is in PHP format.");
        } else if (data.includes('.html')) {
            echo("The file is in HTML format.");
        } else if (data.includes('.css')) {
            echo("The file is in CSS format.");
        } else if (data.includes('.c')) {
            echo("The file is in C format.");
        }
    } else {
        echo("script does not exist.")
    }
}