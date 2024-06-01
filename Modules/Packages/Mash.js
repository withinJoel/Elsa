function mash(input) {
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

    // Categories for MASH
    const mashArr = [
        ['Mansion', 'Apartment', 'Shack', 'House'], // Type of house
        ['1', '2', '3', '4'], // Number of cars
        ['0', '1', '2', '3'], // Number of kids
        ['New York', 'Los Angeles', 'Paris', 'Tokyo'], // City
        ['Dog', 'Cat', 'Bird', 'Fish'], // Pet
        ['Chef', 'Engineer', 'Doctor', 'Artist'], // Profession
        ['BMW', 'Mercedes', 'Audi', 'Tesla'], // Type of car
        ['Blue', 'Green', 'Red', 'Yellow'], // Favorite color
        ['Hawaii', 'Switzerland', 'Japan', 'Australia'], // Vacation spot
        ['Pizza', 'Sushi', 'Burgers', 'Pasta'], // Favorite food
        ['Reading', 'Traveling', 'Cooking', 'Gaming'], // Hobby
        ['Rock', 'Pop', 'Classical', 'Jazz'], // Music preference
        ['Apple', 'Samsung', 'Google', 'Microsoft'], // Tech brand
        ['Football', 'Basketball', 'Tennis', 'Soccer'], // Favorite sport
        ['Spring', 'Summer', 'Autumn', 'Winter'], // Favorite season
        ['Coffee', 'Tea', 'Juice', 'Soda'], // Favorite drink
        ['Mountains', 'Beach', 'City', 'Countryside'], // Preferred living environment
        ['Action', 'Comedy', 'Drama', 'Horror'], // Favorite movie genre
        ['Morning', 'Afternoon', 'Evening', 'Night'] // Preferred time of day
    ];

    const result = [];

    // Loop to find the MASH outcome for each category
    mashArr.forEach(category => {
        let index = 0;
        while (category.length > 1) {
            index = (count % category.length) - 1;
            if (index >= 0) {
                category.splice(index, 1);
            } else {
                category.splice(category.length - 1, 1);
            }
        }
        result.push(category[0]);
    });

    // Output the result
    echo (`You will live in a ${result[0]}, drive ${result[1]} car(s), have ${result[2]} kid(s), live in ${result[3]}, and have a ${result[4]} as a pet. You will work as a ${result[5]}, drive a ${result[6]}, your favorite color will be ${result[7]}, you will vacation in ${result[8]}, and your favorite food will be ${result[9]}. Your hobby will be ${result[10]}, you will enjoy ${result[11]} music, prefer ${result[12]} tech brand, your favorite sport will be ${result[13]}, favorite season will be ${result[14]}, favorite drink will be ${result[15]}, you will prefer living in the ${result[16]}, favorite movie genre will be ${result[17]}, and your preferred time of day will be ${result[18]}.`);
}