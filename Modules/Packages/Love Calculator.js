//Love Calculator
function loveCalculator(name1, name2) {
    // Clean up names and combine them
    let combinedNames = (name1 + name2).toLowerCase().replace(/\s+/g, '');

    // Create a frequency map of letters
    let letterCounts = {};
    for (let char of combinedNames) {
        if (letterCounts[char]) {
            letterCounts[char]++;
        } else {
            letterCounts[char] = 1;
        }
    }

    // Convert the frequency map to a string of numbers
    let countsString = Object.values(letterCounts).join('');

    // Function to reduce a string of numbers to a single digit
    function reduceToSingleDigit(numberString) {
        while (numberString.length > 1) {
            let sum = 0;
            for (let char of numberString) {
                sum += parseInt(char, 10);
            }
            numberString = sum.toString();
        }
        return parseInt(numberString, 10);
    }

    // Reduce the countsString to a single digit
    let compatibilityScore = reduceToSingleDigit(countsString);

    // Create a compatibility message based on the score
    let compatibilityMessages = {
        1: 'You are not a good match. Your strong personalities may lead to conflicts and power struggles. It’s important to work on communication and compromise.',
        2: 'You are a good match! Your balanced personalities create harmony and support. Your relationship is likely to thrive with mutual understanding and respect.',
        3: 'You are not a good match. Balancing fun and responsibility might be challenging. Finding common ground and shared interests could strengthen your bond.',
        4: 'You are not a good match. Your stability may lead to rigidity in the relationship. Flexibility and openness to change can improve your connection.',
        5: 'You are not a good match. Adventure may clash with commitment in your relationship. Finding ways to blend excitement and commitment can lead to growth.',
        6: 'You are a great match! Your love is nurturing and family-oriented. Building a strong foundation based on trust and care is key to your happiness together.',
        7: 'You are not a good match. Emotional expression may be a challenge. Cultivating emotional intelligence and empathy can deepen your connection.',
        8: 'You are not a good match. Material success might overshadow emotional needs. Balancing material goals with emotional fulfillment is essential for your happiness.',
        9: 'You are a good match! Your relationship focuses on compassion and the greater good. Supporting each other’s dreams and values strengthens your bond.'
    };

    let goodScores = [2, 6, 9]; // Adjust this array based on your preferences for "good" scores
    let message = goodScores.includes(compatibilityScore)
        ? `Good compatibility: ${compatibilityMessages[compatibilityScore]}`
        : `Poor compatibility: ${compatibilityMessages[compatibilityScore]}`;

    echo('Score: ' + compatibilityScore);
    echo('Prediction: ' + message);
}