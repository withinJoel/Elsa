// Function to check the existence of an image file
function checkFileExistence(url, callback) {
    const img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}

// Detect image type function
function detectImageType(data) {
    const existingElement = document.querySelector('[data-role="dynamic-image"]');
    if (existingElement) {
        existingElement.remove();
    }

    const imageurl = imagedir + data;

    checkFileExistence(imageurl, function (exists) {
        if (exists) {
            const img = document.createElement('img');
            img.src = imageurl;
            img.style.position = 'fixed';
            img.style.top = '15px';
            img.style.right = '15px';
            img.style.maxWidth = '500px';
            img.style.maxHeight = '500px';
            img.setAttribute('data-role', 'dynamic-image');
            document.body.appendChild(img);

            if (data.includes('.png')) {
                echo("The file is in PNG format.");
            } else if (data.includes('.jpg')) {
                echo("The file is in JPG format.");
            } else if (data.includes('.jpeg')) {
                echo("The file is in JPEG format.");
            } else if (data.includes('.webp')) {
                echo("The file is in WEBP format.");
            } else {
                echo("The file format is unknown.");
            }
        } else {
            echo("Image does not exist.");
        }
    });
}

// Function to check the existence of a video file
function checkVideoExistence(url, callback) {
    const video = document.createElement('video');
    video.onloadeddata = function () {
        callback(true);
    };
    video.onerror = function () {
        callback(false);
    };
    video.src = url;
    video.load();
}

// Detect video type function
function detectVideoType(data) {
    const existingElement = document.querySelector('video[data-role="dynamic-video"]');
    if (existingElement) {
        existingElement.remove();
    }

    const videourl = videodir + data;

    checkVideoExistence(videourl, function (exists) {
        if (exists) {
            const video = document.createElement('video');
            video.src = videourl;
            video.style.position = 'fixed';
            video.style.top = '15px';
            video.style.right = '15px';
            video.style.maxWidth = '500px';
            video.style.maxHeight = '500px';
            video.controls = true;
            video.setAttribute('data-role', 'dynamic-video');
            document.body.appendChild(video);

            if (data.includes('.mp4')) {
                echo("The file is in MP4 format.");
            } else if (data.includes('.mkv')) {
                echo("The file is in MKV format.");
            } else if (data.includes('.avi')) {
                echo("The file is in AVI format.");
            } else {
                echo("The file format is unknown.");
            }
        } else {
            echo("Video does not exist.");
        }
    });
}

// Function to check the existence of an audio file
function checkAudioExistence(url, callback) {
    const audio = new Audio();
    audio.onloadeddata = function () {
        callback(true);
    };
    audio.onerror = function () {
        callback(false);
    };
    audio.src = url;
    audio.load();
}

// Detect audio type function
function detectAudioType(data) {
    const audiourl = audiodir + data;

    checkAudioExistence(audiourl, function (exists) {
        if (exists) {
            if (data.includes('.mp3')) {
                echo("The file is in MP3 format.");
            } else if (data.includes('.wav')) {
                echo("The file is in WAV format.");
            } else if (data.includes('.ogg')) {
                echo("The file is in OGG format.");
            } else {
                echo("The file format is unknown.");
            }
        } else {
            echo("Audio does not exist.");
        }
    });
}

// Function to check the existence of a script file
function checkScriptExistence(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.status !== 404);
        }
    };
    xhr.send();
}

// Detect script type function
function detectScriptType(data) {
    const scripturl = scriptdir + data;

    checkScriptExistence(scripturl, function (exists) {
        if (exists) {
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
            } else if (data.includes('.cpp')) {
                echo("The file is in C++ format.");
            } else if (data.includes('.java')) {
                echo("The file is in Java format.");
            } else if (data.includes('.rb')) {
                echo("The file is in Ruby format.");
            } else if (data.includes('.go')) {
                echo("The file is in Go format.");
            } else if (data.includes('.ts')) {
                echo("The file is in TypeScript format.");
            } else if (data.includes('.sh')) {
                echo("The file is in Shell Script format.");
            } else if (data.includes('.bat')) {
                echo("The file is in Batch Script format.");
            } else if (data.includes('.xml')) {
                echo("The file is in XML format.");
            } else if (data.includes('.yaml') || data.includes('.yml')) {
                echo("The file is in YAML format.");
            } else if (data.includes('.rs')) {
                echo("The file is in Rust format.");
            } else if (data.includes('.swift')) {
                echo("The file is in Swift format.");
            } else if (data.includes('.kt') || data.includes('.kts')) {
                echo("The file is in Kotlin format.");
            } else if (data.includes('.pl')) {
                echo("The file is in Perl format.");
            } else if (data.includes('.r')) {
                echo("The file is in R format.");
            } else if (data.includes('.m')) {
                echo("The file is in MATLAB format.");
            } else if (data.includes('.lua')) {
                echo("The file is in Lua format.");
            } else if (data.includes('.sql')) {
                echo("The file is in SQL format.");
            } else if (data.includes('.groovy')) {
                echo("The file is in Groovy format.");
            } else if (data.includes('.ini')) {
                echo("The file is in INI format.");
            } else if (data.includes('.toml')) {
                echo("The file is in TOML format.");
            } else if (data.includes('.properties')) {
                echo("The file is in Properties format.");
            } else if (data.includes('.dart')) {
                echo("The file is in Dart format.");
            } else if (data.includes('.scss') || data.includes('.sass')) {
                echo("The file is in SCSS/SASS format.");
            } else if (data.includes('.less')) {
                echo("The file is in LESS format.");
            } else if (data.includes('.tsx')) {
                echo("The file is in TSX format.");
            } else if (data.includes('.jsx')) {
                echo("The file is in JSX format.");
            } else if (data.includes('.cs')) {
                echo("The file is in C# format.");
            } else if (data.includes('.vb')) {
                echo("The file is in Visual Basic format.");
            } else if (data.includes('.scala')) {
                echo("The file is in Scala format.");
            } else if (data.includes('.clj') || data.includes('.cljs') || data.includes('.cljc')) {
                echo("The file is in Clojure format.");
            } else if (data.includes('.erl') || data.includes('.hrl')) {
                echo("The file is in Erlang format.");
            } else if (data.includes('.ex') || data.includes('.exs')) {
                echo("The file is in Elixir format.");
            } else if (data.includes('.coffee')) {
                echo("The file is in CoffeeScript format.");
            } else if (data.includes('.h')) {
                echo("The file is in C Header format.");
            } else if (data.includes('.cppm')) {
                echo("The file is in C++ Module format.");
            } else if (data.includes('.nim')) {
                echo("The file is in Nim format.");
            } else if (data.includes('.ada')) {
                echo("The file is in Ada format.");
            } else if (data.includes('.ml')) {
                echo("The file is in OCaml format.");
            } else if (data.includes('.f90') || data.includes('.f95')) {
                echo("The file is in Fortran format.");
            } else if (data.includes('.hs')) {
                echo("The file is in Haskell format.");
            } else if (data.includes('.jl')) {
                echo("The file is in Julia format.");
            } else if (data.includes('.vhdl')) {
                echo("The file is in VHDL format.");
            } else if (data.includes('.verilog')) {
                echo("The file is in Verilog format.");
            } else if (data.includes('.v')) {
                echo("The file is in Verilog format.");
            } else {
                echo("The file format is unknown.");
            }
        } else {
            echo("Script does not exist.");
        }
    });
}