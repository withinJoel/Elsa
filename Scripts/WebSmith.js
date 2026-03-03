// WebSmith Version
const WEB_SMITH_VERSION = "v2.0.2";

// Head Config
const headConfig = {
    appName: "Elsa",
    appDescription: "The programming language for the next generation.",
    appKeywords: "Elsa, programming language, AI, AI programming language",
    appLogo: "Logo/Elsa.png",
    appManifest: "Manifest.json"
};

// Utils
function createScriptElement(srcElement, onload) {
    const script = document.createElement("script");
    script.src = srcElement;
    if (onload) script.onload = onload;
    document.head.appendChild(script);
}

// Script Loader
createScriptElement(`https://cdn.jsdelivr.net/gh/withinjoel/WebSmith@${WEB_SMITH_VERSION}/Head/Head.js`, () => Head(headConfig));
createScriptElement(`https://cdn.jsdelivr.net/gh/withinjoel/WebSmith@${WEB_SMITH_VERSION}/Vercel/Vercel.js`);