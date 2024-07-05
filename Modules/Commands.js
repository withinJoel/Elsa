function runCmd(command, inMemory, fromInput) {
    if (command != undefined) {
        if (fromInput) {
            input.value = "";
            echo('\n' + prompt + command);
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
            } else if (commandName === "elsa") {
                Version();
                echo("Developed by Joel Jessie Jolly.");
                echo("Development period: May 12th, 2024 - Present");
                echo("For further information, please visit https://elsafoundation.pages.dev/");
            } else if (commandName === "easteregg") {
                const url = 'Modules/Packages/Easter Egg/Easter Egg.html';
                window.open(url, '_blank');
            } else if (commandName === "truthordare") {
                truthOrDare();
            } else if (commandName === "rolldice") {
                rollDice();
            } else if (commandName === "headsortails") {
                headsOrTails();
            } else if (commandName === "happybirthday") {
                getHappybirthday();
            } else if ((commandName === "kissme")) {
                kissMe();
            } else if ((commandName === "credits")) {
                credits();
            } else if (commandName === "emergencyalarm") {
                getEmergencyAlarm();
            } else if ((commandName === "open:calculator") || (commandName === "open:calc")) {
                openCalculator();
            } else if ((commandName === "open:files") || (commandName === "open:fileexplorer")) {
                systemExplorer();
            } else if ((commandName === "open:clock")) {
                openClock();
            } else if ((commandName === "open:calendar")) {
                openCalendar();
            } else if ((commandName === "open:maps")) {
                openMap();
            } else if (commandName === "config") {
                getConfig();
            } else if (commandName.includes("reddit:image:")) {
                const rawdata = commandName.trim().replace(/^reddit:image:\b\s*/i, '');
                redditImage(rawdata);
            } else if (commandName === "update") {
                getUpdate();
            } else if (commandName === "cpuinfo") {
                getCPUInfo();
            } else if (commandName === "gpuinfo") {
                getGPUInfo();
            } else if (commandName === "system:shutdown") {
                shutdownSystem();
            } else if (commandName === "system:restart") {
                restartSystem();
            } else if (commandName === "system:signout") {
                signoutSystem();
            } else if (commandName === "system:sleep") {
                sleepSystem();
            } else if (commandName === "system:mute") {
                systemMute();
            } else if (commandName === "system:screenshot") {
                systemScreenshot();
            } else if (commandName === "open:notepad") {
                openNotepad();
            } else if (commandName === "open:browser") {
                openBrowser();
            } else if (commandName === "open:taskmanager") {
                openTaskManager();
            } else if (commandName === "reportbug") {
                reportBug();
            } else if (commandName === "system:unmute") {
                systemUnmute();
            } else if (commandName === "system:lighttheme") {
                systemLightTheme();
            } else if (commandName === "system:darktheme") {
                systemDarkTheme();
            } else if (commandName === "screenkeyboard") {
                screenkeyboard();
            } else if ((commandName === "installedapps") || (commandName === "installedapplications")) {
                installedApplications();
            } else if (commandName === "timezone") {
                getTimeZone();
            } else if ((commandName === "check:systemupdates") || (commandName === "check:osupdates")) {
                checkSystemUpdate();
            } else if ((commandName === "open:settings") || (commandName === "open:setting")) {
                openSettings();
            } else if ((commandName === "open:cmd") || (commandName === "open:terminal") || (commandName === "open:commandprompt")) {
                openTerminal();
            } else if ((commandName === "open:envvariables") || (commandName === "open:environmentalvariables")) {
                openEnvironmentalVariables();
            } else if (commandName.includes("chat:gemini:") && commandName.includes("read")) {
                const rawdata = commandName.trim().replace(/^chat:gemini:\b\s*/i, '');
                const data = rawdata.trim().replace(/^-read\b\s*/i, '');
                let flag = 'True';
                getGeminiResponse(data, flag);
            } else if (commandName.includes("chat:gemini:")) {
                const data = commandName.trim().replace(/^chat:gemini:\b\s*/i, '');
                let flag = 'False';
                getGeminiResponse(data, flag);
            } else if (commandName.includes("download:video:")) {
                const data = commandName.trim().replace(/^download:video:\b\s*/i, '');
                downloadVideo(data);
            } else if (commandName.includes("detect:age:")) {
                const data = commandName.trim().replace(/^detect:age:\b\s*/i, '');
                detectAge(data);
            } else if (commandName.includes("detect:gender:")) {
                const data = commandName.trim().replace(/^detect:gender:\b\s*/i, '');
                detectGender(data);
            } else if (commandName.includes("detect:nudity:")) {
                const data = commandName.trim().replace(/^detect:nudity:\b\s*/i, '');
                detectNudity(data);
            } else if (commandName.includes("detect:emotion:")) {
                const data = commandName.trim().replace(/^detect:emotion:\b\s*/i, '');
                detectEmotion(data);
            } else if (commandName.includes("detect:face:")) {
                const data = commandName.trim().replace(/^detect:face:\b\s*/i, '');
                detectFaces(data);
            } else if (commandName.includes("detect:human:")) {
                const data = commandName.trim().replace(/^detect:human:\b\s*/i, '');
                detectHumans(data);
            } else if (commandName.includes("bible:")) {
                const data = commandName.trim().replace(/^bible:\b\s*/i, '');
                Bible(data);
            } else if (commandName.includes("detect:imagetype:")) {
                const data = commandName.trim().replace(/^detect:imagetype:\b\s*/i, '');
                detectImageType(data);
            } else if (commandName.includes("detect:videotype:")) {
                const data = commandName.trim().replace(/^detect:videotype:\b\s*/i, '');
                detectVideoType(data);
            } else if (commandName.includes("detect:audiotype:")) {
                const data = commandName.trim().replace(/^detect:audiotype:\b\s*/i, '');
                detectAudioType(data);
            } else if (commandName.includes("detect:scripttype:")) {
                const data = commandName.trim().replace(/^detect:scripttype:\b\s*/i, '');
                detectScriptType(data);
            } else if (commandName.includes("open:video:")) {
                openVideo(commandName);
            } else if (commandName === "close:video") {
                openVideo();
            } else if (commandName.includes("open:pdf:")) {
                openPDF(commandName);
            } else if (commandName.includes("open:txt:")) {
                openTXT(commandName);
            } else if (commandName.includes("crop:face:")) {
                const data = commandName.trim().replace(/^crop:face:\b\s*/i, '');
                removeBackgroundAndExtractFace(data);
            } else if (commandName.includes("upscale:image:")) {
                const data = commandName.trim().replace(/^upscale:image:\b\s*/i, '');
                upscaleAndDownloadImage(data);
            } else if (commandName.includes("remove:background:")) {
                const data = commandName.trim().replace(/^remove:background:\b\s*/i, '');
                removeBackground(data);
            } else if (commandName.includes("convert:jpegtowebp:")) {
                const data = commandName.trim().replace(/^convert:jpegtowebp:\b\s*/i, '');
                convertJpegtoWebP(data);
            } else if (commandName.includes("convert:webptojpeg:")) {
                const data = commandName.trim().replace(/^convert:webptojpeg:\b\s*/i, '');
                convertWebPtoJpeg(data);
            } else if (commandName.includes("convert:jpgtopng:")) {
                const data = commandName.trim().replace(/^convert:jpgtopng:\b\s*/i, '');
                convertJpegtoPng(data);
            } else if (commandName.includes("convert:jpegtopng:")) {
                const data = commandName.trim().replace(/^convert:jpegtopng:\b\s*/i, '');
                convertJpegtoPng(data);
            } else if (commandName.includes("open:image:")) {
                openImage(commandName);
            } else if (commandName === "close:image") {
                openImage();
            } else if (commandName === "open:camera") {
                openCamera();
            } else if (commandName === "theme:pinky") {
                themePinky();
            } else if (commandName === "theme:sunrise") {
                themeSunrise();
            } else if (commandName === "theme:valentine") {
                themeValentine();
            } else if (commandName === "theme:hacker") {
                themeHacker();
            } else if (commandName === "theme:energy") {
                themeEnergy();
            } else if (commandName === "theme:loversparadise") {
                themeLoversParadise();
            } else if (commandName === "theme:soft") {
                themeSoft();
            } else if (commandName === "theme:dark") {
                themeDark();
            } else if (commandName === "theme:bluescreen") {
                themeBlueScreen();
            } else if (commandName === "theme:random") {
                randomTheme();
            } else if (commandName.includes("sort:ascending:")) {
                customSort(commandName);
            } else if (commandName.includes("sort:descending:")) {
                customSort(commandName);
            } else if (commandName === "time") {
                getTime();
            } else if (commandName.includes("lovecalculator:")) {
                const data = commandName.trim().replace(/^lovecalculator:\b\s*/i, '');
                let [name1, name2] = data.split(',');
                loveCalculator(name1, name2);
            } else if (commandName.includes("generate:combination:number:")) {
                const data = commandName.trim().replace(/^generate:combination:number:\b\s*/i, '');
                generateNumberCombinations(data);
            } else if (commandName.includes("generate:combination:alphanumeric:")) {
                const data = commandName.trim().replace(/^generate:combination:alphanumeric:\b\s*/i, '');
                generateAlphanumericCombinations(data);
            } else if (commandName.includes("generate:combination:alphabet:")) {
                const data = commandName.trim().replace(/^generate:combination:alphabet:\b\s*/i, '');
                generateAlphabetCombinations(data);
            } else if (commandName.includes("generate:combination:specialcharacter:")) {
                const data = commandName.trim().replace(/^generate:combination:specialcharacter:\b\s*/i, '');
                generateSpecialCharacterCombinations(data);
            } else if (commandName.includes("generate:combination:")) {
                const data = commandName.trim().replace(/^generate:combination:\b\s*/i, '');
                generateCombinations(data);
            } else if (commandName.includes("predict:")) {
                const data = commandName.trim().replace(/^predict:\b\s*/i, '');
                predictNextNumber(data);
            } else if (commandName.includes("count:characters:")) {
                countCharacters(commandName);
            } else if (commandName.includes("count:words:")) {
                countWords(commandName);
            } else if (commandName.includes("count:")) {
                const count = commandName.trim().replace(/^count:\b\s*/i, '');
                countBackward(count);
            } else if (commandName.includes("inputcolor:")) {
                const color = commandName.trim().replace(/^inputcolor:\b\s*/i, '');
                inputColor(color);
            } else if (commandName.includes("inputcolour:")) {
                const color = commandName.trim().replace(/^inputcolour:\b\s*/i, '');
                inputColor(color);
            } else if (commandName === "day") {
                getDay();
            } else if (commandName.includes("remove:punctuation:")) {
                const data = commandName.trim().replace(/^remove:punctuation:\b\s*/i, '');
                removePunctuation(data);
            } else if (commandName === "date") {
                getDate();
            } else if (commandName.includes("numerology:")) {
                let data = commandName.trim().replace(/^numerology:\s*/i, '');
                processNumerologyInput(data);
            } else if (commandName.includes("zodiacsign:")) {
                let data = commandName.trim().replace(/^zodiacsign:\s*/i, '');
                getZodiacSign(data);
            } else if (commandName.includes("mash:")) {
                let data = commandName.trim().replace(/^mash:\s*/i, '');
                mash(data);
            } else if (commandName.includes("bfftest:")) {
                let data = commandName.trim().replace(/^bfftest:\s*/i, '');
                bffTest(data);
            } else if (commandName.includes("compatibilitytest:")) {
                let data = commandName.trim().replace(/^compatibilitytest:\s*/i, '');
                compatibilityTest(data);
            } else if (commandName.includes("flames:")) {
                let data = commandName.trim().replace(/^flames:\s*/i, '');
                flames(data);
            } else if (commandName.includes("guess:")) {
                let data = commandName.trim().replace(/^guess:\s*/i, '');
                getGuesses(data);
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
            } else if (commandName.includes("read:")) {
                const data = commandName.trim().replace(/^read:\s*/i, '');
                readOutLine(data);
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
            } else if (commandName.includes("convert:secondstominutes:")) {
                const data = commandName.trim().replace(/^convert:secondstominutes:\s*/i, '');
                secondsToMinutes(data);
            } else if (commandName.includes("convert:secondstohours:")) {
                const data = commandName.trim().replace(/^convert:secondstohours:\s*/i, '');
                secondsToHours(data);
            } else if (commandName.includes("convert:secondstodays:")) {
                const data = commandName.trim().replace(/^convert:secondstodays:\s*/i, '');
                secondsToDays(data);
            } else if (commandName.includes("convert:secondstomonths:")) {
                const data = commandName.trim().replace(/^convert:secondstomonths:\s*/i, '');
                secondsToMonths(data);
            } else if (commandName.includes("convert:secondstoyears:")) {
                const data = commandName.trim().replace(/^convert:secondstoyears:\s*/i, '');
                secondsToYears(data);
            } else if (commandName.includes("convert:minutestoseconds:")) {
                const data = commandName.trim().replace(/^convert:minutestoseconds:\s*/i, '');
                minutesToSeconds(data);
            } else if (commandName.includes("convert:minutestohours:")) {
                const data = commandName.trim().replace(/^convert:minutestohours:\s*/i, '');
                minutesToHours(data);
            } else if (commandName.includes("convert:minutestodays:")) {
                const data = commandName.trim().replace(/^convert:minutestodays:\s*/i, '');
                minutesToDays(data);
            } else if (commandName.includes("convert:minutestomonths:")) {
                const data = commandName.trim().replace(/^convert:minutestomonths:\s*/i, '');
                minutesToMonths(data);
            } else if (commandName.includes("convert:minutestoyears:")) {
                const data = commandName.trim().replace(/^convert:minutestoyears:\s*/i, '');
                minutesToYears(data);
            } else if (commandName.includes("convert:hourstoseconds:")) {
                const data = commandName.trim().replace(/^convert:hourstoseconds:\s*/i, '');
                hoursToSeconds(data);
            } else if (commandName.includes("convert:hourstominutes:")) {
                const data = commandName.trim().replace(/^convert:hourstominutes:\s*/i, '');
                hoursToMinutes(data);
            } else if (commandName.includes("convert:hourstodays:")) {
                const data = commandName.trim().replace(/^convert:hourstodays:\s*/i, '');
                hoursToDays(data);
            } else if (commandName.includes("convert:hourstomonths:")) {
                const data = commandName.trim().replace(/^convert:hoursmonths:\s*/i, '');
                hoursToMonths(data);
            } else if (commandName.includes("convert:hourstoyears:")) {
                const data = commandName.trim().replace(/^convert:hoursyears:\s*/i, '');
                hoursToYears(data);
            } else if (commandName.includes("convert:daystoseconds:")) {
                const data = commandName.trim().replace(/^convert:daystoseconds:\s*/i, '');
                daysToSeconds(data);
            } else if (commandName.includes("convert:daystominutes:")) {
                const data = commandName.trim().replace(/^convert:daystominutes:\s*/i, '');
                daysToMinutes(data);
            } else if (commandName.includes("convert:daystohours:")) {
                const data = commandName.trim().replace(/^convert:daystohours:\s*/i, '');
                daysToHours(data);
            } else if (commandName.includes("convert:daystomonths:")) {
                const data = commandName.trim().replace(/^convert:daystomonths:\s*/i, '');
                daysToMonths(data);
            } else if (commandName.includes("convert:daystoyears:")) {
                const data = commandName.trim().replace(/^convert:daystoyears:\s*/i, '');
                daysToYears(data);
            } else if (commandName.includes("convert:monthstoseconds:")) {
                const data = commandName.trim().replace(/^convert:monthstoseconds:\s*/i, '');
                monthsToSeconds(data);
            } else if (commandName.includes("convert:monthstominutes:")) {
                const data = commandName.trim().replace(/^convert:monthstominutes:\s*/i, '');
                monthsToMinutes(data);
            } else if (commandName.includes("convert:monthstohours:")) {
                const data = commandName.trim().replace(/^convert:monthstohours:\s*/i, '');
                monthsToHours(data);
            } else if (commandName.includes("convert:monthstodays:")) {
                const data = commandName.trim().replace(/^convert:monthstodays:\s*/i, '');
                monthsToDays(data);
            } else if (commandName.includes("convert:monthstoyears:")) {
                const data = commandName.trim().replace(/^convert:monthstoyears:\s*/i, '');
                monthsToYears(data);
            } else if (commandName.includes("convert:yearstoseconds:")) {
                const data = commandName.trim().replace(/^convert:yearstoseconds:\s*/i, '');
                yearsToSeconds(data);
            } else if (commandName.includes("convert:yearstominutes:")) {
                const data = commandName.trim().replace(/^convert:yearstominutes:\s*/i, '');
                yearsToMinutes(data);
            } else if (commandName.includes("convert:yearstohours:")) {
                const data = commandName.trim().replace(/^convert:yearstohours:\s*/i, '');
                yearsToHours(data);
            } else if (commandName.includes("convert:yearstodays:")) {
                const data = commandName.trim().replace(/^convert:yearstodays:\s*/i, '');
                yearsToDays(data);
            } else if (commandName.includes("convert:yearstomonths:")) {
                const data = commandName.trim().replace(/^convert:yearstomonths:\s*/i, '');
                yearsToMonths(data);
            } else if (commandName.includes("convert:spacetounderscore:")) {
                convertSpacesToUnderscores(commandName);
            } else if (commandName.includes("convert:singlequotestodoublequotes:")) {
                convertSingleToDoubleQuotes(commandName);
            } else if (commandName.includes("convert:doublequotestosinglequotes:")) {
                convertDoubleToSingleQuotes(commandName);
            } else if (commandName.includes("remove:badwords:")) {
                let data = commandName.trim().replace(/^remove:badwords:\s*/i, '');
                removeBadWords(data);
            } else if (commandName.includes("censor:badwords:")) {
                let data = commandName.trim().replace(/^censor:badwords:\s*/i, '');
                removeBadWords(data);
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
            } else if (commandName === "displayinfo") {
                getDisplayInfo();
            } else if (commandName === "batteryinfo") {
                getBatteryInfo();
            } else if (commandName === "mouseposition") {
                getMousePosition();
            } else if (commandName === "devicetype") {
                getDeviceType();
            } else if (commandName === "random:biblebook") {
                getRandomBibleBook();
            } else if (commandName === "random:religion") {
                getRandomReligion();
            } else if (commandName === "random:christiansaint") {
                getRandomChristianSaint();
            } else if ((commandName.includes("random:number:>="))) {
                let num = commandName.replace(/^random:number:>=\s*/, '');
                getRandomDigitMinAndEqual(num);
            } else if ((commandName.includes("random:number:=>"))) {
                let num = commandName.replace(/^random:number:=>\s*/, '');
                getRandomDigitMinAndEqual(num);
            } else if ((commandName.includes("random:number:<="))) {
                let num = commandName.replace(/^random:number:<=\s*/, '');
                getRandomDigitMaxAndEqual(num);
            } else if ((commandName.includes("random:number:=<"))) {
                let num = commandName.replace(/^random:number:=<\s*/, '');
                getRandomDigitMaxAndEqual(num);
            } else if ((commandName.includes("random:number:>"))) {
                let num = commandName.replace(/^random:number:>\s*/, '');
                getRandomDigitMin(num);
            } else if ((commandName.includes("random:number:<"))) {
                let num = commandName.replace(/^random:number:<\s*/, '');
                getRandomDigitMax(num);
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
            } else if (commandName === "random:yogapose") {
                getRandomYogaPoses();
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
            } else if (commandName === "random:name") {
                getRandomName();
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
            } else if (commandName === "random:sexposition") {
                getRandomSexPosition();
            } else if (commandName === "random:breasttype") {
                getRandomWomenBreat();
            } else if (commandName === "random:penistype") {
                getRandomMenPenis();
            } else if (commandName === "random:orgasm") {
                getRandomOrgasm();
            } else if ((commandName === "random:sexualidentity") || (commandName === "random:sexualorientation")) {
                getRandomSexualOrientation();
            } else if (commandName === "random:sexualfetish") {
                getRandomSexualFetish();
            } else if (commandName === "random:sextheme") {
                getRandomSexTheme();
            } else if (commandName === "random:sextoy") {
                getRandomSexToy();
            } else if (commandName === "random:case") {
                getRandomCases();
            } else if (commandName === "random:femalepornstar") {
                getRandomFemalePornstar();
            } else if (commandName === "random:malepornstar") {
                getRandomMalePornstar();
            } else if (commandName === "fortunecookie") {
                getFortuneCookie();
            } else if ((commandName === "adultstory") || (commandName === "eroticstory")) {
                getAdultStory();
            } else if (commandName === "shortstory") {
                getShortStory();
            } else if (commandName.includes("convert:decimaltobinary:")) {
                decimalToBinary(commandName);
            } else if (commandName.includes("convert:decimaltooctal:")) {
                decimalToOctal(commandName);
            } else if (commandName.includes("convert:decimaltohexadecimal:")) {
                decimalToHexadecimal(commandName);
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
            } else if (commandName.includes("convert:numbertotext:")) {
                num = commandName.trim().replace(/^convert:numbertotext:\b\s*/i, '');
                numberToWords(num);
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
            } else if (commandName.includes("open:audio:")) {
                openAudio(commandName);
            } else if (commandName.includes("close:audio")) {
                openAudio(commandName);
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
            } else if (commandName.includes("noodlemagazine:")) {
                openNoodleMagazine(commandName);
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