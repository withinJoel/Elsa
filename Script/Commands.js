function runCmd(command, inMemory, fromInput) {
    if (command != undefined) {
        if (fromInput) {
            input.value = "";
            echo('\n'+prompt + command);
        }
        if (inMemory && command != "") {
            if (command != memory[memory.length - 1]) {
                memory.push(command);
            }
            if (!navigatingInMemory || command != memory[memoryPos]) {
                memoryPos = memory.length - 1;
            }
            navigatingInMemory = false;
        }
        if (!toFile) {
            var commandName = command;
            
            if (commandName === "cls" || commandName === "clearscreen") {
                refreshPage();
            } else if (commandName === "exit") {
                window.open(document.URL, "about:blank", "width=977 height=455");
                window.close();
            } if (commandName.startsWith("echo:")) {
                const data = commandName.replace(/^echo:\s*/, ''); // Removes only the space after "echo:"
                echoFunction(data.trim()); // Trims any leading or trailing spaces after removing the echo command
            } else if ((commandName === "ver") || (commandName === "version")) {
                Version();
            } else if (commandName === "timezone") {
                getTimeZone();
            } else if (commandName === "open:camera") {
                openCamera();
            } else if (commandName === "time") {
                getTime();
            } else if (commandName === "day") {
                getDay();
            } else if (commandName === "date") {
                getDate();
            } else if (commandName.includes("check:palindrome:")) {
                isPalindrome(commandName);
            } else if (commandName.includes("multiplicationtable:")) {
                multiplicationTable(commandName);
            } else if (commandName.includes("bgcolor:")) {
                let userColor = commandName.trim().replace(/^bgcolor:\s*/i, '');
                changeBodyColor(userColor);
            } else if (commandName.includes("bgcolour:")) {
                let userColor = commandName.trim().replace(/^bgcolour:\s*/i, '');
                changeBodyColor(userColor);
            } else if (commandName.includes("backgroundcolor:")) {
                let userColor = commandName.trim().replace(/^backgroundcolor:\s*/i, '');
                changeBodyColor(userColor);
            } else if (commandName.includes("backgroundcolour:")) {
                let userColor = commandName.trim().replace(/^backgroundcolour:\s*/i, '');
                changeBodyColor(userColor);
            } else if (commandName.includes("color:")) {
                let userColor = commandName.trim().replace(/^color:\s*/i, '');
                changeColor(userColor);
            } else if (commandName.includes("colour:")) {
                let userColor = commandName.trim().replace(/^colour:\s*/i, '');
                changeColor(userColor);
            } else if (commandName.includes("fibonacci:")) {
                fibonacci(commandName);
            } else if (commandName.includes("squareroot:")) {
                squareRoot(commandName);
            } else if (commandName.includes("check:prime:")) {
                isPrimeNumber(commandName);
            } else if (commandName.includes("factorial:")) {
                calculateFactorial(commandName);
            } else if (commandName.includes("check:composite:")) {
                isCompositeNumber(commandName);
            } else if (commandName.includes("check:odd:")) {
                isOddNumber(commandName);
            } else if (commandName.includes("calculate:")) {
                calculate(commandName);
            } else if (commandName.includes("log:")) {
                processLogCommand(commandName);
            } else if (commandName.includes("ceil:")) {
                processCeilCommand(commandName);
            } else if (commandName.includes("gcd:")) {
                processGcd(commandName);
            } else if (commandName.includes("lcm:")) {
                processLcm(commandName);
            } else if (commandName.includes("floatabsolute:")) {
                processFloatAbsolute(commandName);
            } else if (commandName.includes("float:")) {
                processFloat(commandName);
            } else if (commandName.includes("add:")) {
                let num = commandName.trim().replace(/^add:\s*/i, 'calculate:');
                calculate(num);
            } else if (commandName.includes("subtract:")) {
                let num = commandName.trim().replace(/^subtract:\s*/i, 'calculate:');
                calculate(num);
            } else if (commandName.includes("multiply:")) {
                let num = commandName.trim().replace(/^multiply:\s*/i, 'calculate:');
                calculate(num);
            } else if (commandName.includes("convert:tolowercase:")) {
                convertToLowerCase(commandName);
            } else if (commandName.includes("convert:touppercase:")) {
                convertToUpperCase(commandName);
            } else if (commandName.includes("check:even:")) {
                isEvenNumber(commandName);
            } else if (commandName.includes("encode:")) {
                encode(commandName);
            } else if (commandName.includes("decode:")) {
                decode(commandName);
            } else if (commandName.includes("codepen:")) {
                searchCodepen(commandName);
            } else if (commandName.includes("amazon:")) {
                searchAmazon(commandName);
            } else if (commandName.includes("flipkart:")) {
                searchFlipkart(commandName);
            } else if (commandName.includes("reverse:")) {
                reverseString(commandName);
            } else if (commandName.includes("convert:spacetounderscore:")) {
                convertSpacesToUnderscores(commandName);
            } else if (commandName.includes("convert:singlequotestodoublequotes:")) {
                convertSingleToDoubleQuotes(commandName);
            } else if (commandName.includes("convert:doublequotestosinglequotes:")) {
                convertDoubleToSingleQuotes(commandName);
            } else if (commandName.includes("remove:space:")) {
                removeSpaces(commandName);
            } else if (commandName.includes("remove:specialcharacters:")) {
                removeSpecialCharacters(commandName);
            } else if (commandName.includes("remove:singlequotes:")) {
                removeSingleQuotes(commandName);
            } else if (commandName.includes("remove:doublequotes:")) {
                removeDoubleQuotes(commandName);
            } else if (commandName.includes("remove:numbers:")) {
                let str = commandName.trim().replace(/^remove:numbers:\s*/i, '');
                let data = str + '.';
                removeNumbers(data);
            } else if (commandName.includes("explode:")) {
                let delimiter = ' ';
                let sentence = commandName.trim().replace(/^explode:\s*/i, '');
                stringExplode(sentence, delimiter);
            } else if (commandName.includes("count:characters:")) {
                countCharacters(commandName);
            } else if (commandName.includes("count:words:")) {
                countWords(commandName);
            } else if (commandName === "help") {
                Help();
            } else if (commandName === "sys") {
                getSys();
            } else if (commandName === "os") {
                getOS();
            } else if (commandName === "internet") {
                getInternetInfo();
            } else if (commandName === "networkstatus") {
                getNetworkStatus();
            } else if (commandName === "connectionspeed") {
                getConnectionSpeed();
            } else if (commandName === "connectiontype") {
                getConnectionType();
            } else if (commandName === "raminfo") {
                getRamInfo();
            } else if (commandName === "screenwidth") {
                getScreenWidth();
            } else if (commandName === "screenheight") {
                getScreenHeight();
            } else if ((commandName === "colordepth") || (commandName === "colourdepth")) {
                getColorDepth();
            } else if (commandName === "screenresolution") {
                getScreenResolution();
            } else if (commandName === "useragent") {
                getUserAgent();
            } else if (commandName === "batteryinfo") {
                getBatteryInfo();
            } else if (commandName === "mouseposition") {
                getMousePosition();
            } else if (commandName === "devicetype") {
                getDeviceType();
            } else if (commandName === "random:religion") {
                getRandomReligion();
            } else if (commandName === "random:number") {
                getRandomNumber();
            } else if ((commandName === "random:musicgenre") || (commandName === "random:songgenre")) {
                getRandomSongGenre();
            } else if ((commandName === "random:moviegenre") || (commandName === "random:filmgenre")) {
                getRandomMovieGenre();
            } else if ((commandName === "random:movie") || (commandName === "random:film")) {
                getRandomMovie();
            } else if ((commandName === "random:song") || (commandName === "random:music")) {
                getRandomSong();
            } else if (commandName === "random:videogame") {
                getRandomVideoGame();
            } else if (commandName === "random:alphabet") {
                getRandomAlphabet();
            } else if ((commandName === "random:os") || (commandName === "random:operatingsystem")) {
                getRandomOperatingSystem();
            } else if (commandName === "random:programminglanguage") {
                getRandomProgrammingLanguage();
            } else if ((commandName === "random:weekday") || (commandName === "random:day")) {
                getRandomWeekday();
            } else if (commandName === "random:weekend") {
                getRandomWeekend();
            } else if (commandName === "random:joke") {
                getRandomJoke();
            } else if (commandName === "random:pickupline") {
                getRandomPickupline();
            } else if (commandName === "random:fact") {
                getRandomFacts();
            } else if (commandName === "random:quote") {
                getRandomQuotes();
            } else if (commandName === "random:humanorgan") {
                getRandomHumanOrgan();
            } else if (commandName === "random:fooditem") {
                getRandomFooditem();
            } else if (commandName === "random:profession") {
                getRandomProfession();
            } else if (commandName === "random:brand") {
                getRandomBrand();
            } else if (commandName === "random:culture") {
                getRandomCulture();
            } else if (commandName === "random:festival") {
                getRandomFestival();
            } else if (commandName === "random:hairstyle") {
                getRandomHairstyle();
            } else if ((commandName === "random:malename") || (commandName === "random:masculinename")) {
                getRandomMaleName();
            } else if ((commandName === "random:femalename") || (commandName === "random:femininename")) {
                getRandomFemaleName();
            } else if ((commandName === "random:maleclothing") || (commandName === "random:masculineclothing")) {
                getRandomMaleClothing();
            } else if ((commandName === "random:femaleclothing") || (commandName === "random:feminineclothing")) {
                getRandomFemaleClothing();
            } else if (commandName === "random:language") {
                getRandomLanguage();
            } else if (commandName === "random:planet") {
                getRandomPlanet();
            } else if (commandName === "random:vegetable") {
                getRandomVegetable();
            } else if (commandName === "random:fruit") {
                getRandomFruit();
            } else if (commandName === "random:animal") {
                getRandomAnimal();
            } else if (commandName === "random:bird") {
                getRandomBird();
            } else if (commandName === "random:flower") {
                getRandomFlower();
            } else if (commandName === "random:country") {
                getRandomCountry();
            } else if (commandName === "random:africancountry") {
                getRandomAfricanCountry();
            } else if (commandName === "random:europeancountry") {
                getRandomEuropeanCountry();
            } else if (commandName === "random:northamericancountry") {
                getRandomNorthAmericanCountry();
            } else if (commandName === "random:southamericancountry") {
                getRandomSouthAmericanCountry();
            } else if (commandName === "random:asiancountry") {
                getRandomAsianCountry();
            } else if (commandName === "random:zodiacsign") {
                getRandomZodiacSign();
            } else if (commandName === "fortunecookie") {
                getFortuneCookie();
            } else if ((commandName === "adultstory") || (commandName === "eroticstory")) {
                getAdultStory();
            } else if (commandName === "shortstory") {
                getShortStory();
            } else if (commandName.includes("convert:binarytodecimal:")) {
                binaryToDecimal(commandName);
            } else if (commandName.includes("convert:binarytodecimal:")) {
                binaryToDecimal(commandName);
            } else if (commandName.includes("convert:binarytohexadecimal:")) {
                binaryToHexadecimal(commandName);
            } else if (commandName.includes("convert:binarytooctal:")) {
                binaryToOctal(commandName);
            } else if (commandName.includes("convert:octaltobinary:")) {
                octalToBinary(commandName);
            } else if (commandName.includes("convert:octaltodecimal:")) {
                octalToDecimal(commandName);
            } else if (commandName.includes("convert:octaltohexadecimal:")) {
                octalToHexadecimal(commandName);
            } else if (commandName.includes("convert:hexadecimaltobinary:")) {
                hexadecimalToBinary(commandName);
            } else if (commandName.includes("convert:hexadecimaltodecimal:")) {
                hexadecimalToDecimal(commandName);
            } else if (commandName.includes("convert:hexadecimaltooctal:")) {
                hexadecimalToOctal(commandName);
            } else if (commandName.includes("spotify:")) {
                searchSpotify(commandName);
            } else if (commandName.includes("yts:")) {
                searchYts(commandName);
            } else if (commandName.includes("youtube:")) {
                searchYoutube(commandName);
            } else if (commandName.includes("pinterest:")) {
                searchPinterest(commandName);
            } else if (commandName.includes("godaddy:")) {
                searchGodaddy(commandName);
            } else if (commandName === "create:password") {
                createPassword();
            } else if (commandName.includes("createqr:")) {
                createQrCode(commandName);
            } else if (commandName.includes("pexels:video:")) {
                searchPexelsVid(commandName);
            } else if (commandName.includes("pexels:image:")) {
                searchPexelsImg(commandName);
            } else if (commandName.includes("pixabay:image:")) {
                searchPixabayImg(commandName);
            } else if (commandName.includes("pixabay:video:")) {
                searchPixabayVid(commandName);
            } else if (commandName.includes("pixabay:audio:")) {
                searchPixabayAud(commandName);
            } else if (commandName.includes("pixabay:gif:")) {
                searchPixabayGif(commandName);
            } else if (commandName === "webrtc") {
                getWebRTCInfo();
            } else if (commandName === "ipaddress") {
                getIPAddress();
            } else if (commandName === "dns") {
                getDNSInfo();
            } else if (commandName.includes("latency:")) {
                const data = commandName.trim().replace(/^latency:\s*/i, '');
                measureLatency(data)
                    .then(latency => {
                        echo(`Latency for ${data}: ${latency} milliseconds`);
                    })
                    .catch(error => {
                        echo('Error measuring latency:', error);
                    });
            } else if (commandName === "refresh") {
                refreshPage();
            } else if ((commandName === "random:color") || (commandName === "random:colour")) {
                getRandomColor();
            } else if (commandName === "developer" || commandName === "dev") {
                openLink(commandName);
            } else if (commandName === "") {
                errorhandling("Please enter a valid command");
            } else if (commandName.includes("open:")) {
                openLink(commandName);
            } else if (commandName.includes("url:")) {
                openUrl(commandName);
            } else if (commandName.includes("google:")) {
                searchViaGoogle(commandName);
            } else if (commandName.includes("wikipedia:")) {
                searchWiki(commandName);
            } else if (commandName.includes("duckduckgo:")) {
                searchViaDuckDuckGo(commandName);
            } else if (commandName.includes("instagram:")) {
                openInstagram(commandName);
            } else if (commandName.includes("youporn:")) {
                openYouporn(commandName);
            } else if (commandName.includes("tube8:")) {
                openTube8(commandName);
            } else if (commandName.includes("milfporn:")) {
                openMilfporn(commandName);
            } else if (commandName.includes("babespedia:")) {
                openBabespedia(commandName);
            } else if (commandName.includes("indianporn365:")) {
                openIndianporn365(commandName);
            } else if (commandName.includes("pornpics:")) {
                openPornpics(commandName);
            } else if (commandName.includes("pussyspace:")) {
                openPussyspace(commandName);
            } else if (commandName.includes("hdtube:")) {
                openHdtube(commandName);
            } else if (commandName.includes("xnxx:")) {
                openXNXX(commandName);
            } else if (commandName.includes("porn:")) {
                openPorn(commandName);
            } else if (commandName.includes("xvideos:")) {
                openXvideos(commandName);
            } else if (commandName.includes("czechvr:")) {
                openCzechvr(commandName);
            } else if (commandName.includes("porngifs:")) {
                searchPorngifs(commandName);
            } else if (commandName.includes("redgifs:")) {
                searchRedgifs(commandName);
            } else if (commandName.includes("itsex:")) {
                searchItsex(commandName);
            } else if (commandName.includes("siliconwives:")) {
                searchSiliconwives(commandName);
            } else if (commandName.includes("yourdoll:")) {
                searchYourdoll(commandName);
            } else if (commandName.includes("clips4sale:")) {
                searchClips4sale(commandName);
            } else if (commandName.includes("bellesa:")) {
                searchBellesa(commandName);
            } else if (commandName.includes("tenor:")) {
                searchTenor(commandName);
            } else if (commandName.includes("reddit:")) {
                searchReddit(commandName);
            } else if (commandName.includes("goodporn:")) {
                openGoodPorn(commandName);
            } else if (commandName.includes("xhamster:")) {
                openXhamster(commandName);
            } else if (commandName.includes("redtube:")) {
                openRedtube(commandName);
            } else if (commandName.includes("onlyfans:")) {
                openOnlyfans(commandName);
            } else if (commandName.includes("x:")) {
                openX(commandName);
            } else if (commandName.includes("linkedin:")) {
                openLinkedin(commandName);
            } else if (commandName.includes("snapchat:")) {
                openSnapchat(commandName);
            } else if (commandName.includes("clubhouse:")) {
                openClubhouse(commandName);
            } else if (commandName.includes("twitter:")) {
                openTwitter(commandName);
            } else if (commandName.includes("threads:")) {
                searchThreads(commandName);
            } else if (commandName.includes("github:")) {
                openGithub(commandName);
            } else {
                errorhandling();
            }
        } else {
            if (command != ")") {
                toExec.push(command);
            } else {
                toFile = false;
                toExec.forEach((command) => {
                    runCmd(command);
                });
                toExec = [];
            }
        }

        if (fromInput) {
            resetPrompt();
        }
    }
}