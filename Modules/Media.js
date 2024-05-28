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
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo("Image failed to load. Please check the path or filename.");
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
                vidElement.setAttribute('data-role', 'dynamic-video');
                vidElement.controls = true; // Add video controls for play/pause, etc.
                vidElement.src = videoSrc;
                document.body.appendChild(vidElement);
            }
        } catch (error) {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            echo("Video failed to load. Please check the path or filename.");

        }
    } else if (existingVidElement) {
        document.body.removeChild(existingVidElement);
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

        console.error('Speech synthesis not supported in this browser.');
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
                    const audio = new Audio('Effects/Wrong Input.mp3');
                    audio.play();
                    echo('Failed to open new window.');
                }
            })
            .catch(function (error) {
                const audio = new Audio('Effects/Wrong Input.mp3');
                audio.play();
                echo('Error accessing the webcam:', error);
            });
    } else {

        echo('getUserMedia is not supported on this browser.');
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