async function getGeminiResponse(rawdata, flag) {
    const userInput = rawdata.trim().replace(/^-read\b\s*/i, '');
    window.electronAPI.geminiQuery(userInput)
        .then(data => {
            displayResponse(data, flag);
        })
        .catch(error => {
            displayError(error.message);
        });
}


function displayResponse(responseData, flag) {
    let text = responseData.candidates[0]?.content?.parts[0]?.text || 'Gemini did not respond.';
    if (flag === 'True') {
        readOutLine(text);
        echo(text);
    } else {
        echo(text);
    }
}

function displayError(text) {
    echo(text);
}