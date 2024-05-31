// Random Color
function getRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    echo(`Random Color: ${randomColor}`);
}

//Random number based on condition (max)
function getRandomDigitMax(num) {
    const min = 0;
    const max = num - 1;
    output = (Math.floor(Math.random() * (max - min + 1)) + min);
    echo('Your random ' + num + ' digit number is ' + output);
}

//Random number based on condition (max) and equal
function getRandomDigitMaxAndEqual(num) {
    const min = 0;
    const max = num;
    output = (Math.floor(Math.random() * (max - min + 1)) + min);
    echo('Your random ' + num + ' digit number is ' + output);
}

//Random number based on condition (min)
function getRandomDigitMin(num) {
    const min = num + 1;
    const max = 999999999999999;
    output = (Math.floor(Math.random() * (max - min + 1)) + min);
    echo('Your random ' + num + ' digit number is ' + output);
}

//Random number based on condition (min) and equal
function getRandomDigitMinAndEqual(num) {
    const min = num;
    const max = 999999999999999;
    output = (Math.floor(Math.random() * (max - min + 1)) + min);
    echo('Your random ' + num + ' digit number is ' + output);
}

// Random Number
function getRandomNumber() {
    const numberarray = [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1000000000000, 10000000000000, 999999999999999];//15
    const randomIndex = Math.floor(Math.random() * numberarray.length);
    const min = 0;
    const max = numberarray[randomIndex];
    echo(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Random Alphabet
function getRandomAlphabet() {
    const randomIndex = Math.floor(Math.random() * englishalphabets.length);
    echo(englishalphabets[randomIndex]);
}

// Random Weekday
function getRandomWeekday() {
    const randomIndex = Math.floor(Math.random() * weekdays.length);
    const capitalizedWeekday = weekdays[randomIndex].charAt(0).toUpperCase() + weekdays[randomIndex].slice(1);
    echo(capitalizedWeekday);
}

// Random Weekend
function getRandomWeekend() {
    const randomIndex = Math.floor(Math.random() * weekends.length);
    const capitalizedWeekend = weekends[randomIndex].charAt(0).toUpperCase() + weekends[randomIndex].slice(1);
    echo(capitalizedWeekend);
}

// Random Video Game
function getRandomVideoGame() {
    const randomIndex = Math.floor(Math.random() * videogames.length);
    const capitalizedVideoGame = videogames[randomIndex].charAt(0).toUpperCase() + videogames[randomIndex].slice(1);
    echo(capitalizedVideoGame);
}

// Random Song
function getRandomSong() {
    const randomIndex = Math.floor(Math.random() * popularsongs.length);
    const capitalizedSong = popularsongs[randomIndex].charAt(0).toUpperCase() + popularsongs[randomIndex].slice(1);
    echo(capitalizedSong);
}

// Random Song Genre
function getRandomSongGenre() {
    const randomIndex = Math.floor(Math.random() * musicgenres.length);
    const capitalizedMusicGenre = musicgenres[randomIndex].charAt(0).toUpperCase() + musicgenres[randomIndex].slice(1);
    echo(capitalizedMusicGenre);
}

// Random Movie
function getRandomMovie() {
    const randomIndex = Math.floor(Math.random() * popularmovies.length);
    const capitalizedMovie = popularmovies[randomIndex].charAt(0).toUpperCase() + popularmovies[randomIndex].slice(1);
    echo(capitalizedMovie);
}

// Random Movie Genre
function getRandomMovieGenre() {
    const randomIndex = Math.floor(Math.random() * moviegenres.length);
    const capitalizedMovieGenre = moviegenres[randomIndex].charAt(0).toUpperCase() + moviegenres[randomIndex].slice(1);
    echo(capitalizedMovieGenre);
}

// Random OS
function getRandomOperatingSystem() {
    const randomIndex = Math.floor(Math.random() * operatingsystems.length);
    const capitalizedOperatingSystem = operatingsystems[randomIndex].charAt(0).toUpperCase() + operatingsystems[randomIndex].slice(1);
    echo(capitalizedOperatingSystem);
}

// Random Programming Language
function getRandomProgrammingLanguage() {
    const randomIndex = Math.floor(Math.random() * programminglanguages.length);
    const capitalizedProgrammingLanguages = programminglanguages[randomIndex].charAt(0).toUpperCase() + programminglanguages[randomIndex].slice(1);
    echo(capitalizedProgrammingLanguages);
}

// Random Joke
function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const capitalizedJoke = jokes[randomIndex].charAt(0).toUpperCase() + jokes[randomIndex].slice(1);
    echo(capitalizedJoke);
}

// Random Pickup line
function getRandomPickupline() {
    const randomIndex = Math.floor(Math.random() * pickuplines.length);
    const capitalizedPickupline = pickuplines[randomIndex].charAt(0).toUpperCase() + pickuplines[randomIndex].slice(1);
    echo(capitalizedPickupline);
}

// Random Facts
function getRandomFacts() {
    const randomIndex = Math.floor(Math.random() * randomfacts.length);
    const capitalizedFact = randomfacts[randomIndex].charAt(0).toUpperCase() + randomfacts[randomIndex].slice(1);
    echo(capitalizedFact);
}

// Random Quotes
function getRandomQuotes() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const capitalizedQuote = quotes[randomIndex].charAt(0).toUpperCase() + quotes[randomIndex].slice(1);
    echo(capitalizedQuote);
}

// Random Fooditem
function getRandomFooditem() {
    const randomIndex = Math.floor(Math.random() * fooditems.length);
    const capitalizedFooditem = fooditems[randomIndex].charAt(0).toUpperCase() + fooditems[randomIndex].slice(1);
    echo(capitalizedFooditem);
}

// Random Profession
function getRandomProfession() {
    const randomIndex = Math.floor(Math.random() * professions.length);
    const capitalizedProfession = professions[randomIndex].charAt(0).toUpperCase() + professions[randomIndex].slice(1);
    echo(capitalizedProfession);
}

// Random Festival
function getRandomFestival() {
    const randomIndex = Math.floor(Math.random() * festivals.length);
    const capitalizedFestival = festivals[randomIndex].charAt(0).toUpperCase() + festivals[randomIndex].slice(1);
    echo(capitalizedFestival);
}

// Random Brand
function getRandomBrand() {
    const randomIndex = Math.floor(Math.random() * brands.length);
    const capitalizedBrand = brands[randomIndex].charAt(0).toUpperCase() + brands[randomIndex].slice(1);
    echo(capitalizedBrand);
}

// Random Zodiac Sign
function getRandomZodiacSign() {
    const randomIndex = Math.floor(Math.random() * zodiacSigns.length);
    const randomSign = zodiacSigns[randomIndex];
    const capitalizedSign = randomSign.charAt(0).toUpperCase() + randomSign.slice(1);
    echo(capitalizedSign);
}

// Random Quotes
function getRandomPlanet() {
    const randomIndex = Math.floor(Math.random() * planet.length);
    const randomPlanet = planet[randomIndex];
    const capitalizedQuote = randomPlanet.charAt(0).toUpperCase() + randomPlanet.slice(1);
    echo(capitalizedQuote);
}

// Random Country
function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    const capitalizedCountry = randomCountry.charAt(0).toUpperCase() + randomCountry.slice(1);
    echo(capitalizedCountry);
}

// Random European Country
function getRandomEuropeanCountry() {
    const randomIndex = Math.floor(Math.random() * europeancountries.length);
    const randomEuropeanCountry = europeancountries[randomIndex];
    const capitalizedEuropeanCountry = randomEuropeanCountry.charAt(0).toUpperCase() + randomEuropeanCountry.slice(1);
    echo(capitalizedEuropeanCountry);
}

// Random North American Country
function getRandomNorthAmericanCountry() {
    const randomIndex = Math.floor(Math.random() * northamericancountries.length);
    const randomNorthAmericanCountry = northamericancountries[randomIndex];
    const capitalizedNorthAmericanCountry = randomNorthAmericanCountry.charAt(0).toUpperCase() + randomNorthAmericanCountry.slice(1);
    echo(capitalizedNorthAmericanCountry);
}

// Random South American Country
function getRandomSouthAmericanCountry() {
    const randomIndex = Math.floor(Math.random() * southamericancountries.length);
    const randomSouthAmericanCountry = southamericancountries[randomIndex];
    const capitalizedSouthAmericanCountry = randomSouthAmericanCountry.charAt(0).toUpperCase() + randomSouthAmericanCountry.slice(1);
    echo(capitalizedSouthAmericanCountry);
}

// Random Asian Country
function getRandomAsianCountry() {
    const randomIndex = Math.floor(Math.random() * asiancountries.length);
    const randomAsianCountry = asiancountries[randomIndex];
    const capitalizedAsianCountry = randomAsianCountry.charAt(0).toUpperCase() + randomAsianCountry.slice(1);
    echo(capitalizedAsianCountry);
}

// Random African Country
function getRandomAfricanCountry() {
    const randomIndex = Math.floor(Math.random() * africancountries.length);
    const randomAfricanCountry = africancountries[randomIndex];
    const capitalizedAfricanCountry = randomAfricanCountry.charAt(0).toUpperCase() + randomAfricanCountry.slice(1);
    echo(capitalizedAfricanCountry);
}

//Random Human Organ
function getRandomHumanOrgan() {
    const randomIndex = Math.floor(Math.random() * humanorgans.length);
    const randomHumanOrgan = humanorgans[randomIndex];
    const capitalizedHumanOrgan = randomHumanOrgan.charAt(0).toUpperCase() + randomHumanOrgan.slice(1);
    echo(capitalizedHumanOrgan);
}

//Random Culture
function getRandomCulture() {
    const randomIndex = Math.floor(Math.random() * cultures.length);
    const randomCulture = cultures[randomIndex];
    const capitalizedCulture = randomCulture.charAt(0).toUpperCase() + randomCulture.slice(1);
    echo(capitalizedCulture);
}

//Random Hairstyle
function getRandomHairstyle() {
    const randomIndex = Math.floor(Math.random() * hairstyles.length);
    const randomHairstyle = hairstyles[randomIndex];
    const capitalizedHairstyle = randomHairstyle.charAt(0).toUpperCase() + randomHairstyle.slice(1);
    echo(capitalizedHairstyle);
}

//Random Language
function getRandomLanguage() {
    const randomIndex = Math.floor(Math.random() * humanlanguages.length);
    const randomLanguage = humanlanguages[randomIndex];
    const capitalizedLanguage = randomLanguage.charAt(0).toUpperCase() + randomLanguage.slice(1);
    echo(capitalizedLanguage);
}

//Random Religion
function getRandomReligion() {
    const randomIndex = Math.floor(Math.random() * religions.length);
    const randomReligion = religions[randomIndex];
    const capitalizedReligion = randomReligion.charAt(0).toUpperCase() + randomReligion.slice(1);
    echo(capitalizedReligion);
}

//Random Name
function getRandomName() {
    randomarray = ['masculinenames', 'femininenames'];
    const randomArrayIndex = Math.floor(Math.random() * randomarray.length);
    const randomArrayOutput = randomarray[randomArrayIndex];
    if (randomArrayOutput === 'masculinenames') {
        getRandomMaleName();
    } else {
        getRandomFemaleName();
    }
}

//Random Male Name
function getRandomMaleName() {
    const randomIndex = Math.floor(Math.random() * masculinenames.length);
    const randomMasculineNames = masculinenames[randomIndex];
    const capitalizedMasculinename = randomMasculineNames.charAt(0).toUpperCase() + randomMasculineNames.slice(1);
    echo(capitalizedMasculinename);
}

//Random Female Name
function getRandomFemaleName() {
    const randomIndex = Math.floor(Math.random() * femininenames.length);
    const randomFeminineName = femininenames[randomIndex];
    const capitalizedFemininename = randomFeminineName.charAt(0).toUpperCase() + randomFeminineName.slice(1);
    echo(capitalizedFemininename);
}

//Random Bible Book
function getRandomBibleBook() {
    const randomIndex = Math.floor(Math.random() * bibleBooks.length);
    const randombibleBook = bibleBooks[randomIndex];
    const capitalizedbibleBook = randombibleBook.charAt(0).toUpperCase() + randombibleBook.slice(1);
    echo(capitalizedbibleBook);
}

//Random Male Clothing
function getRandomMaleClothing() {
    const randomIndex = Math.floor(Math.random() * masculineclothing.length);
    const randomMasculineClothing = masculineclothing[randomIndex];
    const capitalizedMasculineclothing = randomMasculineClothing.charAt(0).toUpperCase() + randomMasculineClothing.slice(1);
    echo(capitalizedMasculineclothing);
}

//Random Female Clothing
function getRandomFemaleClothing() {
    const randomIndex = Math.floor(Math.random() * feminineclothing.length);
    const randomFeminineClothing = feminineclothing[randomIndex];
    const capitalizedFeminineclothing = randomFeminineClothing.charAt(0).toUpperCase() + randomFeminineClothing.slice(1);
    echo(capitalizedFeminineclothing);
}

// Random Fruit
function getRandomFruit() {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    const randomFruit = fruits[randomIndex];
    const capitalizedFruit = randomFruit.charAt(0).toUpperCase() + randomFruit.slice(1);
    echo(capitalizedFruit);
}

// Random Vegetable
function getRandomVegetable() {
    const randomIndex = Math.floor(Math.random() * vegetables.length);
    const randomVegetable = vegetables[randomIndex];
    const capitalizedVegetable = randomVegetable.charAt(0).toUpperCase() + randomVegetable.slice(1);
    echo(capitalizedVegetable);
}

// Random Animal
function getRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const randomAnimal = animals[randomIndex];
    const capitalizedAnimal = randomAnimal.charAt(0).toUpperCase() + randomAnimal.slice(1);
    echo(capitalizedAnimal);
}

// Random Bird
function getRandomBird() {
    const randomIndex = Math.floor(Math.random() * birds.length);
    const randomBird = birds[randomIndex];
    const capitalizedBird = randomBird.charAt(0).toUpperCase() + randomBird.slice(1);
    echo(capitalizedBird);
}

// Random Flower
function getRandomFlower() {
    const randomIndex = Math.floor(Math.random() * flowers.length);
    const randomFlower = flowers[randomIndex];
    const capitalizedFlower = randomFlower.charAt(0).toUpperCase() + randomFlower.slice(1);
    echo(capitalizedFlower);
}

// Random Sex Position
function getRandomSexPosition() {
    const randomIndex = Math.floor(Math.random() * sexPositions.length);
    const randomsexPositions = sexPositions[randomIndex];
    const capitalizedsexPositions = randomsexPositions.charAt(0).toUpperCase() + randomsexPositions.slice(1);
    echo(capitalizedsexPositions);
}

// Short Adult Story
function getAdultStory() {
    const randomIndex = Math.floor(Math.random() * eroticstories.length);
    const randomEroticStory = eroticstories[randomIndex];
    const capitalizedEroticStory = randomEroticStory.charAt(0).toUpperCase() + randomEroticStory.slice(1);
    echo(capitalizedEroticStory);
}

// Short Story
function getShortStory() {
    const randomIndex = Math.floor(Math.random() * shortstories.length);
    const randomStory = shortstories[randomIndex];
    const capitalizedStory = randomStory.charAt(0).toUpperCase() + randomStory.slice(1);
    echo(capitalizedStory);
}

// random women breast
function getRandomWomenBreat() {
    const randomIndex = Math.floor(Math.random() * womenBreastTypes.length);
    const randomBreast = womenBreastTypes[randomIndex];
    const capitalizedBreast = randomBreast.charAt(0).toUpperCase() + randomBreast.slice(1);
    echo(capitalizedBreast);
}

// random Men Penis
function getRandomMenPenis() {
    const randomIndex = Math.floor(Math.random() * malePenisTypes.length);
    const randomPenis = malePenisTypes[randomIndex];
    const capitalizedPenis = randomPenis.charAt(0).toUpperCase() + randomPenis.slice(1);
    echo(capitalizedPenis);
}

//random Orgasm
function getRandomOrgasm() {
    const randomIndex = Math.floor(Math.random() * orgasmTypes.length);
    const randomOrgasm = orgasmTypes[randomIndex];
    const capitalizedOrgasm = randomOrgasm.charAt(0).toUpperCase() + randomOrgasm.slice(1);
    echo(capitalizedOrgasm);
}

//random male pornstars
function getRandomMalePornstar() {
    const randomIndex = Math.floor(Math.random() * malePornstars.length);
    const randomMalePornstar = malePornstars[randomIndex];
    const capitalizedMalePornstar = randomMalePornstar.charAt(0).toUpperCase() + randomMalePornstar.slice(1);
    echo(capitalizedMalePornstar);
}

//random female pornstars
function getRandomFemalePornstar() {
    const randomIndex = Math.floor(Math.random() * femalePornstars.length);
    const randomFemalePornstar = femalePornstars[randomIndex];
    const capitalizedFemalePornstar = randomFemalePornstar.charAt(0).toUpperCase() + randomFemalePornstar.slice(1);
    echo(capitalizedFemalePornstar);
}

//random sexual orientation
function getRandomSexualOrientation() {
    const randomIndex = Math.floor(Math.random() * sexualIdentities.length);
    const randomsexualIdentitie = sexualIdentities[randomIndex];
    const capitalizedsexualIdentitie = randomsexualIdentitie.charAt(0).toUpperCase() + randomsexualIdentitie.slice(1);
    echo(capitalizedsexualIdentitie);
}

//random sexual fetish
function getRandomSexualFetish() {
    const randomIndex = Math.floor(Math.random() * sexualFetish.length);
    const randomsexualFetish = sexualFetish[randomIndex];
    const capitalizedsexualFetish = randomsexualFetish.charAt(0).toUpperCase() + randomsexualFetish.slice(1);
    echo(capitalizedsexualFetish);
}

//random sex theme
function getRandomSexTheme() {
    const randomIndex = Math.floor(Math.random() * sexThemes.length);
    const randomsexTheme = sexThemes[randomIndex];
    const capitalizedsexTheme = randomsexTheme.charAt(0).toUpperCase() + randomsexTheme.slice(1);
    echo(capitalizedsexTheme);
}

//random sex toy
function getRandomSexToy() {
    const randomIndex = Math.floor(Math.random() * sexToys.length);
    const randomsexToy = sexToys[randomIndex];
    const capitalizedsexToy = randomsexToy.charAt(0).toUpperCase() + randomsexToy.slice(1);
    echo(capitalizedsexToy);
}

//random cases
function getRandomCases() {
    const randomIndex = Math.floor(Math.random() * notableCases.length);
    const randomnotableCase = notableCases[randomIndex];
    const capitalizednotableCase = randomnotableCase.charAt(0).toUpperCase() + randomnotableCase.slice(1);
    echo(capitalizednotableCase);
}