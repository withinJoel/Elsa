//Guess
function getGuesses(input) {
    const sortedInput = input.split('').sort().join(''); // Sort the input letters alphabetically
    const matchingWords = wordbank.filter(word => {
        const sortedWord = word.split('').sort().join(''); // Sort each word in the word bank alphabetically
        return sortedWord === sortedInput; // Check if the sorted word matches the sorted input
    });
    echo(matchingWords);
}