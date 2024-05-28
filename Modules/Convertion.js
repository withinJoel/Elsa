// Convert seconds to minutes
function secondsToMinutes(seconds) {
    echo(seconds / 60);
}

// Convert seconds to hours
function secondsToHours(seconds) {
    echo(seconds / 3600); // 60 seconds * 60 minutes
}

// Convert seconds to days
function secondsToDays(seconds) {
    echo(seconds / 86400); // 60 seconds * 60 minutes * 24 hours
}

// Convert seconds to months
function secondsToMonths(seconds) {
    echo(seconds / 2592000); // 60 seconds * 60 minutes * 24 hours * 30 days
}

// Convert seconds to years
function secondsToYears(seconds) {
    echo(seconds / 31536000); // 60 seconds * 60 minutes * 24 hours * 365 days
}

// Convert minutes to seconds
function minutesToSeconds(minutes) {
    echo(minutes * 60);
}

// Convert minutes to hours
function minutesToHours(minutes) {
    echo(minutes / 60);
}

// Convert minutes to days
function minutesToDays(minutes) {
    echo(minutes / 1440); // 60 minutes * 24 hours
}

// Convert minutes to months
function minutesToMonths(minutes) {
    echo(minutes / 43200); // 60 minutes * 24 hours * 30 days
}

// Convert minutes to years
function minutesToYears(minutes) {
    echo(minutes / 525600); // 60 minutes * 24 hours * 365 days
}

// Convert hours to seconds
function hoursToSeconds(hours) {
    echo(hours * 3600); // 60 seconds * 60 minutes
}

// Convert hours to minutes
function hoursToMinutes(hours) {
    echo(hours * 60);
}

// Convert hours to days
function hoursToDays(hours) {
    echo(hours / 24);
}

// Convert hours to months
function hoursToMonths(hours) {
    echo(hours / 720); // 24 hours * 30 days
}

// Convert hours to years
function hoursToYears(hours) {
    echo(hours / 8760); // 24 hours * 365 days
}

// Convert days to seconds
function daysToSeconds(days) {
    echo(days * 86400); // 60 seconds * 60 minutes * 24 hours
}

// Convert days to minutes
function daysToMinutes(days) {
    echo(days * 1440); // 60 minutes * 24 hours
}

// Convert days to hours
function daysToHours(days) {
    echo(days * 24);
}

// Convert days to months
function daysToMonths(days) {
    echo(days / 30);
}

// Convert days to years
function daysToYears(days) {
    echo(days / 365);
}

// Convert months to seconds
function monthsToSeconds(months) {
    echo(months * 2592000); // 60 seconds * 60 minutes * 24 hours * 30 days
}

// Convert months to minutes
function monthsToMinutes(months) {
    echo(months * 43200); // 60 minutes * 24 hours * 30 days
}

// Convert months to hours
function monthsToHours(months) {
    echo(months * 720); // 24 hours * 30 days
}

// Convert months to days
function monthsToDays(months) {
    echo(months * 30);
}

// Convert months to years
function monthsToYears(months) {
    echo(months / 12);
}

// Convert years to seconds
function yearsToSeconds(years) {
    echo(years * 31536000); // 60 seconds * 60 minutes * 24 hours * 365 days
}

// Convert years to minutes
function yearsToMinutes(years) {
    echo(years * 525600); // 60 minutes * 24 hours * 365 days
}

// Convert years to hours
function yearsToHours(years) {
    echo(years * 8760); // 24 hours * 365 days
}

// Convert years to days
function yearsToDays(years) {
    echo(years * 365);
}

// Convert years to months
function yearsToMonths(years) {
    echo(years * 12);
}

// Function to convert number to text
const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function numberToWords(num) {
    if (num === 0) return 'zero';

    let result = '';

    if (num >= 1000) {
        result += ones[Math.floor(num / 1000)] + ' thousand ';
        num %= 1000;
    }

    if (num >= 100) {
        result += ones[Math.floor(num / 100)] + ' hundred ';
        num %= 100;
    }

    if (num >= 20) {
        result += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
    } else if (num >= 10) {
        result += teens[num - 10];
        num = 0;
    }

    if (num > 0) {
        result += ones[num];
    }

    let finalresult = result.trim();
    echo(finalresult);
}

// Function to convert decimal to binary
function decimalToBinary(data) {
    const decimal = data.trim().replace(/^convert:decimaltobinary:\b\s*/i, '');
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(2));
}

// Function to convert decimal to octal
function decimalToOctal(data) {
    const decimal = data.trim().replace(/^convert:decimaltooctal:\b\s*/i, '');
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(8));
}

// Function to convert decimal to hexadecimal
function decimalToHexadecimal(data) {
    const decimal = data.trim().replace(/^convert:decimaltohexadecimal:\b\s*/i, '');
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }
    echo(Number(decimal).toString(16).toUpperCase());
}

//Convert Binary to Decimal
function binaryToDecimal(number) {
    const binary = number.trim().replace(/^convert:binarytodecimal:\b\s*/i, '');
    // Check if the input is a valid binary number
    if (!/^[01]+$/.test(binary)) {

        echo('Invalid binary number');
    }

    let decimal = 0;
    for (let i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        decimal += parseInt(binary[i]) * Math.pow(2, j);
    }

    echo(decimal);
}

//Convert Decimal to binary
function decimalToBinary(number) {
    const decimal = parseInt(number.trim().replace(/^convert:decimaltobinary:\b\s*/i, ''), 10);
    if (isNaN(decimal)) {

        echo('Invalid decimal number');
        return;
    }

    const binary = decimal.toString(2);
    echo(binary);
}

//Convert Binary to Octal
function binaryToOctal(number) {
    const binary = number.trim().replace(/^convert:binarytooctal:\b\s*/i, '');
    if (!/^[01]+$/.test(binary)) {

        echo('Invalid binary number');
        return;
    }

    const decimal = parseInt(binary, 2);
    const octal = decimal.toString(8);
    echo(octal);
}

//Convert Octal to Binary
function octalToBinary(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltobinary:\b\s*/i, ''), 8);
    if (isNaN(octal)) {

        echo('Invalid octal number');
        return;
    }

    const binary = octal.toString(2);
    echo(binary);
}

//Convert Octal to Decimal
function octalToDecimal(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltodecimal:\b\s*/i, ''), 8);
    if (isNaN(octal)) {

        echo('Invalid octal number');
        return;
    }

    echo(octal);
}

//Convert Octal to Hexadecimal
function octalToHexadecimal(number) {
    const octal = parseInt(number.trim().replace(/^convert:octaltohexadecimal:\b\s*/i, ''), 8);
    if (isNaN(octal)) {

        echo('Invalid octal number');
        return;
    }

    const hexadecimal = octal.toString(16).toUpperCase();
    echo(hexadecimal);
}

//Convert Hexadecimal to Binary
function hexadecimalToBinary(number) {
    const hexadecimal = number.trim().replace(/^convert:hexadecimaltobinary:\b\s*/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {

        echo('Invalid hexadecimal number');
        return;
    }

    const decimal = parseInt(hexadecimal, 16);
    const binary = decimal.toString(2);
    echo(binary);
}

//Convert Hexadecimal to Decimal
function hexadecimalToDecimal(number) {
    const hexadecimal = number.trim().replace(/^convert:hexadecimaltodecimal:\b\s*/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {

        echo('Invalid hexadecimal number');
        return;
    }

    const decimal = parseInt(hexadecimal, 16);
    echo(decimal);
}

//Convert Hexadecimal to Octal
function hexadecimalToOctal(number) {
    const hexadecimal = number.trim().replace(/^convert:hexadecimaltooctal:\b\s*/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {

        echo('Invalid hexadecimal number');
        return;
    }

    const decimal = parseInt(hexadecimal, 16);
    const octal = decimal.toString(8);
    echo(octal);
}

//Convert Binary to Hexadecimal
function binaryToHexadecimal(number) {
    const binary = number.trim().replace(/^convert:binarytohexadecimal:\b\s*/i, '');
    if (!/^[01]+$/.test(binary)) {

        echo('Invalid binary number');
        return;
    }

    const decimal = parseInt(binary, 2);
    const hexadecimal = decimal.toString(16).toUpperCase();
    echo(hexadecimal);
}

// Convert to lowercase
function convertToLowerCase(data) {
    let input = data.trim().replace(/^convert:tolowercase:\s*/i, '');
    if (typeof input === 'string') {
        echo(input.toLowerCase());
    } else {

        echo('Input must be a string.');
    }
}

// Convert to uppercase
function convertToUpperCase(data) {
    let input = data.trim().replace(/^convert:touppercase:\s*/i, '');
    if (typeof input === 'string') {
        echo(input.toUpperCase());
    } else {

        echo('Input must be a string.');
    }
}