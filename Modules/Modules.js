////Version
const currentVersion = '2.0.5';

////Load Script
function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}

////External
loadScript('https://cdn.jsdelivr.net/gh/withinJoel/Elsa/Version/Version-1.0.0.js');

////API
loadScript('../../API/Apikeys.js');

////Datasets
loadScript('Modules/Datasets/Data.js');
loadScript('Modules/Datasets/wordBank.js');
loadScript('Modules/Datasets/Bible_English.js');
loadScript('Modules/Datasets/Bible_French.js');
loadScript('Modules/Datasets/Bible_Finnish.js');
loadScript('Modules/Datasets/Bible_German.js');
loadScript('Modules/Datasets/Bible_Swedish.js');
loadScript('Modules/Datasets/Bible_Danish.js');
loadScript('Modules/Datasets/Bible_Dutch.js');
loadScript('Modules/Datasets/Bible_Arabic.js');
loadScript('Modules/Datasets/Bible_Czech.js');
loadScript('Modules/Datasets/Bible_Bulgarian.js');
loadScript('Modules/Datasets/Bible_Croatian.js');

///Models
loadScript('Modules/Models/Gemini/Gemini.js');

//Core
loadScript('Modules/Dependencies.js');
loadScript('Modules/System.js');
//loadScript('Modules/Security.js');
loadScript('Modules/Directory.js');

////Modules
loadScript('Modules/OS.js');
loadScript('Modules/Detect File Type.js');
loadScript('Modules/Check.js');
loadScript('Modules/Convertion.js');
loadScript('Modules/Customization.js');
loadScript('Modules/Download.js');
loadScript('Modules/Drag And Drop.js');
loadScript('Modules/Generate.js');
loadScript('Modules/Math.js');
loadScript('Modules/Media.js');
loadScript('Modules/Randomization.js');
loadScript('Modules/Sort.js');
loadScript('Modules/String.js');
loadScript('Modules/Web.js');
loadScript('Modules/Networking.js');

////Packages
loadScript('Modules/Packages/Reddit.js');
loadScript('Modules/Packages/Bible.js');
loadScript('Modules/Packages/Crop Face.js');
loadScript('Modules/Packages/Detect Age.js');
loadScript('Modules/Packages/Detect Face.js');
loadScript('Modules/Packages/Detect Gender.js');
loadScript('Modules/Packages/KissMe/KissMe.js');
loadScript('Modules/Packages/Detect Human.js');
loadScript('Modules/Packages/Detect Nudity.js');
loadScript('Modules/Packages/Encoding Decoding.js');
loadScript('Modules/Packages/Flames.js');
loadScript('Modules/Packages/Mash.js');
loadScript('Modules/Packages/compatibility Test.js');
loadScript('Modules/Packages/BFF Test.js');
loadScript('Modules/Packages/Games.js');
loadScript('Modules/Packages/Guess.js');
loadScript('Modules/Packages/Love Calculator.js');
loadScript('Modules/Packages/Numerology.js');
loadScript('Modules/Packages/Predict.js');
loadScript('Modules/Packages/Remove Background.js');
loadScript('Modules/Packages/Upscale.js');
loadScript('Modules/Packages/Zodiac Sign.js');

//Made with 💖 by Joel Jolly