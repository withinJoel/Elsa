//Input color
function inputColor(input) {
    document.getElementById('input').style.color = input;
}

//Theme Pinky
function themePinky() {
    userBgColor = 'pink';
    userColor = 'black';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Hacker
function themeHacker() {
    userBgColor = 'black';
    userColor = 'green';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme True Dark
function themeDark() {
    userBgColor = 'black';
    userColor = 'white';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Valentine
function themeValentine() {
    userBgColor = '#fe5757';
    userColor = 'black';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//custom background
function randomTheme () {
    const randomThemeColors = ['red','green','black','blue','yellow','brown','grey','pink','violet','purple','#fe5757','orange','#101820','#F96167','#F98866'];
    const randomIndex = Math.floor(Math.random() * randomThemeColors.length);
    const capitalizedcolors = randomThemeColors[randomIndex].charAt(0).toUpperCase() + randomThemeColors[randomIndex].slice(1);
    userBgColor = capitalizedcolors;
    userColor = 'white';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Bluescreen
function themeBlueScreen() {
    userBgColor = 'blue';
    userColor = 'white';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Sunrise
function themeSunrise() {
    userBgColor = 'orange';
    userColor = 'black';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Energy
function themeEnergy() {
    userBgColor = '#101820';
    userColor = '#FEE715';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Vibrant
function themeLoversParadise() {
    userBgColor = '#F96167';
    userColor = '#F9E795';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Theme Soft
function themeSoft() {
    userBgColor = '#F98866';
    userColor = '#FFF2D7';
    document.body.style.color = userColor;
    document.body.style.backgroundColor = userBgColor;
}

//Change Background Color
function changeBodyColor(userColor) {

    // Check if the input is a valid color
    var isValidColor = /^#[0-9A-F]{6}$/i.test(userColor) || /^[a-z]+$/i.test(userColor);

    if (isValidColor) {
        // Set the body background color
        document.body.style.backgroundColor = userColor;
    } else {

        echo("Invalid color!");
    }
}


//Change Color
function changeColor(userColor) {

    // Check if the input is a valid color
    var isValidColor = /^#[0-9A-F]{6}$/i.test(userColor) || /^[a-z]+$/i.test(userColor);

    if (isValidColor) {
        // Set the body background color
        document.body.style.color = userColor;
    } else {

        echo("Invalid color!");
    }
}