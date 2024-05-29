//FLAMES Game
function flames(input) {
    // Split the input into two names
    const [name1, name2] = input.split(',');

    // Remove spaces and convert to lowercase
    const cleanName1 = name1.replace(/\s+/g, '').toLowerCase();
    const cleanName2 = name2.replace(/\s+/g, '').toLowerCase();

    // Function to count and remove common characters
    function getCommonCharactersCount(name1, name2) {
        let name1Arr = name1.split('');
        let name2Arr = name2.split('');

        name1Arr.forEach(char => {
            const index = name2Arr.indexOf(char);
            if (index !== -1) {
                name2Arr.splice(index, 1);
            }
        });

        return name1Arr.length + name2Arr.length;
    }

    const count = getCommonCharactersCount(cleanName1, cleanName2);

    const flamesArr = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
    let index = 0;

    // Loop to find the FLAMES outcome
    while (flamesArr.length > 1) {
        index = (count % flamesArr.length) - 1;
        if (index >= 0) {
            flamesArr.splice(index, 1);
        } else {
            flamesArr.splice(flamesArr.length - 1, 1);
        }
    }

    echo(flamesArr[0]);
}