//Truthordare
function truthOrDare() {
    const result = Math.floor(Math.random() * 6) + 1;
    if (result % 2 !== 0) {
        const randomQuestion = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
        echo('Outcome: Truth');
        echo('Question: ' + randomQuestion);
    } else {
        const randomChallenge = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
        echo('Outcome: Dare');
        echo('Challenge: ' + randomChallenge);
    }
}

//Roll a dice
function rollDice() {
    // Generate a random number between 1 and 6 (inclusive)
    const result = Math.floor(Math.random() * 6) + 1;
    echo(result);
}

//Heads or taisl
function headsOrTails() {
    // Generate a random number (0 or 1)
    const result = Math.floor(Math.random() * 2);

    // Check the result and return heads or tails
    if (result === 0) {
        echo('Heads');
    } else {
        echo('Tails');
    }
}

// Fortune Cookie
function getFortuneCookie() {
    const randomIndex = Math.floor(Math.random() * fortunecookie.length);
    const randomFortune = fortunecookie[randomIndex];
    const capitalizedFortune = randomFortune.charAt(0).toUpperCase() + randomFortune.slice(1);
    echo(capitalizedFortune);
}