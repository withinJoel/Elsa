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

    echo(cleanInput);
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

//Percentage Calculator - What % is X of Y
function calculatePercentage(input) {
    const parts = input.split(',');
    if (parts.length !== 2) {
        echo('Usage: percentage:value,total (e.g., percentage:25,100)');
        return;
    }

    const value = parseFloat(parts[0].trim());
    const total = parseFloat(parts[1].trim());

    if (isNaN(value) || isNaN(total)) {
        echo('Please provide valid numbers.');
        return;
    }

    if (total === 0) {
        echo('Total cannot be zero.');
        return;
    }

    const percentage = (value / total) * 100;
    echo(`${value} is ${percentage.toFixed(2)}% of ${total}`);
}

//Word Frequency Counter
function wordFrequency(input) {
    const text = input.toLowerCase().replace(/[^\w\s]/g, '');
    const words = text.split(/\s+/).filter(word => word !== '');

    if (words.length === 0) {
        echo('No words found in the input.');
        return;
    }

    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    // Sort by frequency (descending)
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

    echo('=== Word Frequency ===');
    echo(`Total words: ${words.length}`);
    echo(`Unique words: ${sorted.length}`);
    echo('Top words:');
    sorted.slice(0, 10).forEach(([word, count]) => {
        echo(`  "${word}": ${count} time${count > 1 ? 's' : ''}`);
    });
    echo('======================');
}

//Text Statistics
function textStats(input) {
    const text = input.trim();

    if (text.length === 0) {
        echo('No text provided.');
        return;
    }

    // Character count
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, '').length;

    // Word count
    const words = text.split(/\s+/).filter(word => word !== '');
    const wordCount = words.length;

    // Sentence count (rough estimate)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '');
    const sentenceCount = sentences.length;

    // Paragraph count
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '');
    const paragraphCount = paragraphs.length;

    // Average word length
    const avgWordLength = words.length > 0
        ? (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(1)
        : 0;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(wordCount / 150);

    echo('=== Text Statistics ===');
    echo(`Characters: ${charCount} (${charNoSpaces} without spaces)`);
    echo(`Words: ${wordCount}`);
    echo(`Sentences: ${sentenceCount}`);
    echo(`Paragraphs: ${paragraphCount}`);
    echo(`Avg word length: ${avgWordLength} chars`);
    echo(`Reading time: ~${readingTime} min`);
    echo(`Speaking time: ~${speakingTime} min`);
    echo('=======================');
}

//Anagram Checker
function checkAnagram(input) {
    const parts = input.split(',');
    if (parts.length !== 2) {
        echo('Usage: anagram:word1,word2 (e.g., anagram:listen,silent)');
        return;
    }

    const word1 = parts[0].trim().toLowerCase().replace(/\s/g, '');
    const word2 = parts[1].trim().toLowerCase().replace(/\s/g, '');

    if (word1.length === 0 || word2.length === 0) {
        echo('Please provide two words.');
        return;
    }

    // Sort characters and compare
    const sorted1 = word1.split('').sort().join('');
    const sorted2 = word2.split('').sort().join('');

    const isAnagram = sorted1 === sorted2;

    echo('=== Anagram Check ===');
    echo(`Word 1: "${parts[0].trim()}"`);
    echo(`Word 2: "${parts[1].trim()}"`);
    if (isAnagram) {
        echo(`Result: YES! They are anagrams.`);
    } else {
        echo(`Result: NO, they are not anagrams.`);
    }
    echo('=====================');
}