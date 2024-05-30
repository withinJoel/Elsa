//String Reverse
function reverseString(input) {
    const data = input.trim().replace(/^reverse:\s*/i, '');
    const reversed = data.split('').reverse().join('');
    echo(`Reversed string: ${reversed}`);
}

// String Explode
function stringExplode(sentence, delimiter) {
    if (typeof sentence !== 'string' || typeof delimiter !== 'string') {

        echo('Both sentence and delimiter must be strings.');
    }
    echo('[' + sentence.split(delimiter) + ']');
}

//Remove bad words
function removeBadWords(input) {
  
    // Regular expression to match bad words
    const regex = new RegExp('\\b(' + inappropriatewords.join('|') + ')\\b', 'gi');
  
    // Replace bad words with asterisks
    const cleanInput = input.replace(regex, '***');
  
    echo (cleanInput);
  }

// String remove space
function removeSpaces(data) {
    const input = data.trim().replace(/^remove:space:\s*/i, '');
    if (typeof input !== 'string') {

        echo('Input must be a string.');
    }

    // Use a regular expression to replace spaces globally
    echo(input.replace(/\s/g, ''));
}

//String remove single quotes
function removeSingleQuotes(data) {
    const inputString = data.trim().replace(/^remove:singlequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/'/g, ''));
}

//String remove double quotes
function removeDoubleQuotes(data) {
    const inputString = data.trim().replace(/^remove:doublequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/"/g, ''));
}

//String remove special characters
function removeSpecialCharacters(data) {
    const inputString = data.trim().replace(/^remove:specialcharacters:\s*/i, '');
    // Define the pattern for special characters using a regular expression
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g;
    // Replace special characters with an empty string
    var result = inputString.replace(pattern, '');
    echo("Output:" + result);
}

//String convert single quotes to double quotes
function convertSingleToDoubleQuotes(data) {
    const inputString = data.trim().replace(/^convert:singlequotestodoublequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/'/g, '"'));
}

//String convert double quotes to single quotes
function convertDoubleToSingleQuotes(data) {
    const inputString = data.trim().replace(/^convert:doublequotestosinglequotes:\s*/i, '');
    if (typeof inputString !== 'string') {

        echo('Input must be a string');
    }
    echo(inputString.replace(/"/g, `'`));
}

//String convert spaces to underscore
function convertSpacesToUnderscores(data) {
    const input = data.trim().replace(/^convert:spacetounderscore:\s*/i, '');
    if (typeof input !== 'string') {

        echo('Input must be a string.');
    }

    // Use replace method with a regular expression to replace spaces with underscores
    echo(input.replace(/\s/g, '_'));
}

//String Count Characters
function countCharacters(input) {
    const data = input.trim().replace(/^count:characters:\s*/i, '');
    const count = data.length;
    echo(`Number of characters: ${count}`);
}

//String Count Words
function countWords(input) {
    const words = input.trim().split(/\s+/).filter(word => word !== '').length;
    echo(`Number of words: ${words}`);
}

//Remove Punctuation
function removePunctuation(text) {
    // Define the punctuation marks to remove
    const punctuationMarks = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    // Remove punctuation using regex and return the cleaned text
    echo(text.replace(punctuationMarks, ''));
}