//Open Image
async function openImage(data) {
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

    if (data && data.trim().startsWith("open:image:")) {
        const img = data.trim().replace(/^open:image:\s*/i, '');
        const imageElement = imagedir + img;

        let targetImgElement = existingImgElement;

        if (!targetImgElement) {
            targetImgElement = document.createElement('img');
            targetImgElement.style.position = 'fixed';
            targetImgElement.style.top = '15px';
            targetImgElement.style.right = '15px';
            targetImgElement.style.maxWidth = '500px';
            targetImgElement.style.maxHeight = '500px';
            targetImgElement.setAttribute('data-role', 'dynamic-image');

            document.body.appendChild(targetImgElement);
        }

        const loadImage = () => {
            return new Promise((resolve, reject) => {
                targetImgElement.onload = resolve;
                targetImgElement.onerror = reject;
                targetImgElement.src = imageElement;
            });
        };

        try {
            await loadImage();
        } catch (error) {
            try {
                targetImgElement.src = '';
                await loadImage();
            } catch (retryError) {
                echo("Image failed to load. Please check the path or filename.");
                throw new Error("Image not found");
            }
        }
    } else if (existingImgElement) {
        document.body.removeChild(existingImgElement);
    }
}

//Open Video
async function openVideo(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingVidElement = document.querySelector('video[data-role="dynamic-video"]') || document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');
    if (existingElement) {
        existingElement.remove();
    }
    // Remove existing error message if any
    if (existingErrorElement) {
        document.body.removeChild(existingErrorElement);
    }

    if (data && data.trim().startsWith("open:video:")) {
        const vid = data.trim().replace(/^open:video:\s*/i, '');
        const videoSrc = videodir + vid;

        let vidElement = existingVidElement;

        try {
            // Create a temporary video element to check if the video loads
            const tempVideo = document.createElement('video');
            await new Promise((resolve, reject) => {
                tempVideo.onloadeddata = resolve; // Use onloadeddata for video
                tempVideo.onerror = reject;
                tempVideo.src = videoSrc;
            });

            if (vidElement) {
                vidElement.src = videoSrc;
            } else {
                vidElement = document.createElement('video');
                vidElement.style.position = 'fixed';
                vidElement.style.top = '15px';
                vidElement.style.right = '15px';
                vidElement.style.maxWidth = '500px';
                vidElement.style.maxHeight = '500px';
                vidElement.autoplay = true; // Autoplay the video
                vidElement.setAttribute('data-role', 'dynamic-video');
                vidElement.controls = true; // Add video controls for play/pause, etc.
                vidElement.src = videoSrc;
                document.body.appendChild(vidElement);
            }
        } catch (error) {
            echo("Video failed to load. Please check the path or filename.");

        }
    } else if (existingVidElement) {
        document.body.removeChild(existingVidElement);
    }
}

//Open Audio 
async function openAudio(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingAudioElement = document.querySelector('audio[data-role="dynamic-audio"]') || document.querySelector('[data-role="dynamic-image"]') || document.querySelector('[data-role="dynamic-dragged"]');
    const existingErrorElement = document.querySelector('div[data-role="error-message"]');

    if (existingElement) {
        existingElement.remove();
    }

    // Remove existing error message if any
    if (existingErrorElement) {
        document.body.removeChild(existingErrorElement);
    }

    if (data && data.trim().startsWith("open:audio:")) {
        const audioFileName = data.trim().replace(/^open:audio:\s*/i, '');
        const audioSrc = audiodir + audioFileName; // Assuming audiopath is defined elsewhere

        let audioElement = existingAudioElement;

        try {
            // Create a temporary audio element to check if the audio loads
            const tempAudio = document.createElement('audio');
            await new Promise((resolve, reject) => {
                tempAudio.onloadeddata = resolve; // Use onloadeddata for audio
                tempAudio.onerror = reject;
                tempAudio.src = audioSrc;
            });

            if (audioElement) {
                audioElement.src = audioSrc;
            } else {
                audioElement = document.createElement('audio');
                audioElement.style.position = 'fixed';
                audioElement.style.top = '15px';
                audioElement.style.right = '15px';
                audioElement.style.maxWidth = '500px';
                audioElement.style.maxHeight = '500px';
                audioElement.autoplay = true; // Autoplay the audio
                audioElement.setAttribute('data-role', 'dynamic-dragged');
                audioElement.controls = true; // Add audio controls for play/pause, etc.
                audioElement.src = audioSrc;
                document.body.appendChild(audioElement);
            }
        } catch (error) {
            console.error("Audio failed to load. Please check the path or filename.");
            // You can show an error message to the user here if needed
        }
    } else if (existingAudioElement) {
        document.body.removeChild(existingAudioElement);
    }
}

//Open Pdf
function openPDF(data) {
    const pdf = data.trim().replace(/^open:pdf:\b\s*/i, '');
    // Specify the URL of the PDF file
    var pdfURL = docdir + pdf;

    // Open the PDF file in a new tab
    window.open(pdfURL, '_blank');
}

//Open Text
function openTXT(data) {
    const txt = data.trim().replace(/^open:txt:\b\s*/i, '');
    // Specify the URL of the Txt file
    var txtURL = docdir + txt;

    window.open(txtURL, '_blank');
}

//Read
function readOutLine(text) {
    // Check if the Web Speech API is supported
    if ('speechSynthesis' in window) {
        // Create a new instance of SpeechSynthesisUtterance
        let utterance = new SpeechSynthesisUtterance(text);

        // Function to set the voice to a female one
        function setFemaleVoice() {
            // Get the available voices
            let voices = window.speechSynthesis.getVoices();
            // Find a female voice
            let femaleVoice = voices.find(voice => voice.gender === 'female' || voice.name.toLowerCase().includes('female'));

            // If a female voice is found, set it
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            } else {
                // Default to the first voice if no female voice is found
                utterance.voice = voices[0];
            }
        }

        // Voices might not be immediately available, so use the onvoiceschanged event
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = setFemaleVoice;
        } else {
            setFemaleVoice();
        }

        // Set some properties for the speech
        utterance.rate = 1; // Speed of the speech
        utterance.pitch = 1; // Pitch of the speech
        utterance.volume = 1; // Volume of the speech

        // Speak the text
        window.speechSynthesis.speak(utterance);
    } else {

        echo('Speech synthesis not supported.');
    }
}

//Camera
function openCamera() {
    // Check if the browser supports mediaDevices and getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Create a new window with video stream
                const newWindow = window.open('', '_blank', 'width=670,height=560');
                if (newWindow) {
                    // Create a video element in the new window
                    const video = document.createElement('video');
                    video.autoplay = true;
                    video.srcObject = stream;
                    newWindow.document.body.appendChild(video);
                } else {
                    echo('Failed to open new window.');
                }
            })
            .catch(function (error) {
                echo('Error accessing the webcam:', error);
            });
    } else {
        echo('getUserMedia is not supported.');
    }
}

//Happy Birthday 
function getHappybirthday() {
    // Initialize Tone.js
    Tone.start();

    // Create a synthesizer for the piano sound
    const piano = new Tone.Synth({
        oscillator: {
            type: 'sine' // You can change the type of oscillator for different piano sounds
        },
        envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1
        }
    }).toDestination(); // Connect to the audio output

    // Define the notes and their durations for "Twinkle, Twinkle, Little Star"
    const notes = [
        { note: 'C4', duration: '4n' },
        { note: 'C4', duration: '4n' },
        { note: 'G4', duration: '4n' },
        { note: 'G4', duration: '4n' },
        { note: 'A4', duration: '4n' },
        { note: 'A4', duration: '4n' },
        { note: 'G4', duration: '2n' },
        { note: 'F4', duration: '4n' },
        { note: 'F4', duration: '4n' },
        { note: 'E4', duration: '4n' },
        { note: 'E4', duration: '4n' },
        { note: 'D4', duration: '4n' },
        { note: 'D4', duration: '4n' },
        { note: 'C4', duration: '2n' }
    ];

    // Function to play a note
    function playNote(note, time, duration) {
        piano.triggerAttackRelease(note, duration, time);
    }

    // Function to play the melody
    function playMelody() {
        let startTime = Tone.now();
        notes.forEach((noteInfo) => {
            playNote(noteInfo.note, startTime, noteInfo.duration);
            startTime += Tone.Time(noteInfo.duration).toSeconds();
        });
    }

    // Call the playMelody function to play "Twinkle, Twinkle, Little Star"
    playMelody();
}

//Emergency Alarm
function getEmergencyAlarm() {
    // Initialize Tone.js
    Tone.start();

    // Create a synthesizer for the alarm sound
    const alarmSynth = new Tone.Synth({
        oscillator: {
            type: 'square' // Square wave for a more urgent sound
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.5,
            release: 0.1
        }
    }).toDestination(); // Connect to the audio output

    // Define the notes and their durations for the emergency alarm
    const notes = [
        { note: 'C5', duration: '8n' },
        { note: 'G4', duration: '8n' },
        { note: 'C5', duration: '8n' },
        { note: 'G4', duration: '8n' },
        { note: 'C5', duration: '8n' },
        { note: 'G4', duration: '8n' }
    ];

    // Function to play a note
    function playNote(note, time, duration) {
        alarmSynth.triggerAttackRelease(note, duration, time);
    }

    // Function to play the alarm
    function playAlarm() {
        let startTime = Tone.now();
        for (let i = 0; i < 10; i++) { // Repeat the alarm 10 times
            notes.forEach((noteInfo) => {
                playNote(noteInfo.note, startTime, noteInfo.duration);
                startTime += Tone.Time(noteInfo.duration).toSeconds();
            });
        }
    }

    // Call the playAlarm function to play the emergency alarm
    playAlarm();
}

//convert webp to jpeg
function convertWebPtoJpeg(data) {
    const imgOriginal = new Image();
    imgOriginal.src = imagedir + data;
    imgOriginal.onload = function () {
        // Create a temporary canvas to draw the image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgOriginal.width;
        tempCanvas.height = imgOriginal.height;
        const ctx = tempCanvas.getContext('2d');
        ctx.drawImage(imgOriginal, 0, 0);

        // Convert the image to JPEG
        const jpegDataUrl = tempCanvas.toDataURL('image/jpeg');

        // Display the original image
        const originalImgElement = document.createElement('img');
        originalImgElement.src = imgOriginal.src;
        originalImgElement.style.position = 'fixed';
        originalImgElement.style.top = '15px';
        originalImgElement.style.right = '15px'; // Adjust position as needed
        originalImgElement.style.maxWidth = '500px';
        originalImgElement.style.maxHeight = '500px';
        originalImgElement.setAttribute('data-role', 'dynamic-image');
        document.body.appendChild(originalImgElement);

        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 100000);

        // Automatically download the converted JPEG image with a random filename
        const link = document.createElement('a');
        link.href = jpegDataUrl;
        link.download = `converted_image_${randomNumber}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
    };
}

//convert jpeg to webp
function convertJpegtoWebP(data) {
    const imgOriginal = new Image();
    imgOriginal.src = imagedir + data;
    imgOriginal.onload = function () {
        // Create a temporary canvas to draw the image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgOriginal.width;
        tempCanvas.height = imgOriginal.height;
        const ctx = tempCanvas.getContext('2d');
        ctx.drawImage(imgOriginal, 0, 0);

        // Convert the image to WebP
        const webpDataUrl = tempCanvas.toDataURL('image/webp');

        // Display the original image
        const originalImgElement = document.createElement('img');
        originalImgElement.src = imgOriginal.src;
        originalImgElement.style.position = 'fixed';
        originalImgElement.style.top = '15px';
        originalImgElement.style.right = '15px'; // Adjust position as needed
        originalImgElement.style.maxWidth = '500px';
        originalImgElement.style.maxHeight = '500px';
        originalImgElement.setAttribute('data-role', 'dynamic-image');
        document.body.appendChild(originalImgElement);

        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 100000);

        // Automatically download the converted WebP image with a random filename
        const link = document.createElement('a');
        link.href = webpDataUrl;
        link.download = `converted_image_${randomNumber}.webp`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
    };
}

//Convert Jpeg to png
function convertJpegtoPng(data) {
    const imgOriginal = new Image();
    imgOriginal.src = imagedir + data;
    imgOriginal.onload = function () {
        // Create a temporary canvas to draw the image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgOriginal.width;
        tempCanvas.height = imgOriginal.height;
        const ctx = tempCanvas.getContext('2d');
        ctx.drawImage(imgOriginal, 0, 0);

        // Convert the image to PNG
        const pngDataUrl = tempCanvas.toDataURL('image/png');

        // Display the original image
        const originalImgElement = document.createElement('img');
        originalImgElement.src = imgOriginal.src;
        originalImgElement.style.position = 'fixed';
        originalImgElement.style.top = '15px';
        originalImgElement.style.right = '15px'; // Adjust position as needed
        originalImgElement.style.maxWidth = '500px';
        originalImgElement.style.maxHeight = '500px';
        originalImgElement.setAttribute('data-role', 'dynamic-image');
        document.body.appendChild(originalImgElement);

        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 100000);

        // Automatically download the converted PNG image with a random filename
        const link = document.createElement('a');
        link.href = pngDataUrl;
        link.download = `converted_image_${randomNumber}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
    };
}