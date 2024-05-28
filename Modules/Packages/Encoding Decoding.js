// Decode
function decode(input) {
    const data = input.trim().replace(/^decode:\s*/i, '');
    try {
        const decoded = atob(data);
        echo(`Base64 decoded: ${decoded}`);
    } catch (error) {

        echo(`Error decoding: ${error.message}`);
    }
}

//Encode
function encode(input) {
    const data = input.trim().replace(/^encode:\s*/i, '');
    try {
        const encoded = btoa(data);
        echo(`Base64 encoded: ${encoded}`);
    } catch (error) {

        echo(`Error encoding: ${error.message}`);
    }
}