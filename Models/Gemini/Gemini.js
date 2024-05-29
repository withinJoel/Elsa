async function getGeminiResponse(rawdata, flag) {
    if (geminiapi !== '') {
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiapi; // Replace YOUR_API_KEY with your actual API key
        const userInput = rawdata.trim().replace(/^-read\b\s*/i, '');
        // Data to be sent to the API
        const requestData = {
            contents: [{
                parts: [{
                    text: userInput
                }]
            }]
        };

        // Example using fetch API to send a POST request to the Google Cloud Natural Language API endpoint
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers required by the API
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API response:', data);
                // Handle the API response
                displayResponse(data, flag);

            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors from the API request
                displayError(error.message);
            });
    } else {
        let text = 'Please add you gemini api key by getting an api key from gemini developer page and adding it to C:/Program Files (x86)/Elsa/API/Apikeys.js';
        echo (text); 
    }
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