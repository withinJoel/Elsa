function bffTest(input) {
    const [name1, name2] = input.split(',');
    const cleanName1 = name1.replace(/\s+/g, '').toLowerCase();
    const cleanName2 = name2.replace(/\s+/g, '').toLowerCase();

    let commonLetters = 0;
    const letters = {};

    for (let i = 0; i < cleanName1.length; i++) {
        letters[cleanName1[i]] = true;
    }

    for (let i = 0; i < cleanName2.length; i++) {
        if (letters[cleanName2[i]]) {
            commonLetters++;
        }
    }

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const formattedName1 = capitalizeFirstLetter(name1.trim());
    const formattedName2 = capitalizeFirstLetter(name2.trim());

    if (commonLetters > 3) {
        echo (`${formattedName1} and ${formattedName2} are BFFs!`);
    } else {
        echo (`${formattedName1} and ${formattedName2} are not BFFs.`);
    }
}