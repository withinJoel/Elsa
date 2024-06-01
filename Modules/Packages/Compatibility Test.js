function compatibilityTest(input) {
    const [name1, name2] = input.split(',');

    const cleanName1 = name1.replace(/\s+/g, '').toLowerCase();
    const cleanName2 = name2.replace(/\s+/g, '').toLowerCase();

    let score = 0;
    for (let i = 0; i < cleanName1.length; i++) {
        score += cleanName1.charCodeAt(i);
    }
    for (let i = 0; i < cleanName2.length; i++) {
        score += cleanName2.charCodeAt(i);
    }

    score = score % 100; // Ensure score is between 0 and 100

    let compatibility;
    if (score > 75) {
        compatibility = 'High';
    } else if (score > 50) {
        compatibility = 'Medium';
    } else {
        compatibility = 'Low';
    }

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const formattedName1 = capitalizeFirstLetter(name1.trim());
    const formattedName2 = capitalizeFirstLetter(name2.trim());

    echo(`${formattedName1} and ${formattedName2} have ${compatibility} compatibility with a score of ${score}`);
}