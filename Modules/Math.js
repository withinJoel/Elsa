//Math remove numbers
function removeNumbers(str) {
    let result = '';
    let start = 0;
    let end = 0;
    for (let i = 0; i <= str.length; i++) {
        if (/\d/.test(str[i]) || i === str.length) {
            if (start !== end) {
                result += str.slice(start, end);
            }
            start = i + 1;
            end = i + 1;
        } else {
            end++;
        }
    }
    echo(result);
}

// Factorial
function calculateFactorial(n) {
    let num = n.trim().replace(/^factorial:\s*/i, '');
    if (num < 0) {
        echo('Factorial is not defined for negative numbers.');
        return;
    }
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
        factorial *= i;
    }
    echo(`Factorial of ${num}: ${factorial}`);
}

//Fibonacci
function fibonacci(num) {
    let n = num.trim().replace(/^fibonacci:\s*/i, '');
    const sequence = [0, 1];
    for (let i = 2; i <= n; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    echo(`Fibonacci sequence up to ${n}: ${sequence.slice(0, n + 1).join(', ')}`);
}

//Multiplication Table
function multiplicationTable(num) {
    let n = num.trim().replace(/^multiplicationtable:\s*/i, '');
    echo(`Multiplication table for ${n}:`);
    for (let i = 1; i <= 10; i++) {
        echo(`${n} x ${i} = ${n * i}`);
    }
}

//Square Root
function squareRoot(num) {
    let n = num.trim().replace(/^squareroot:\s*/i, '');
    const result = Math.sqrt(n);
    echo(`Square root of ${n} is ${result}`);
}

//Calculate
function calculate(num) {
    const parts = num.split('calculate:');
    if (parts.length !== 2) {

        echo('Invalid input format');
    }

    expression = parts[1].trim();
    try {
        // Replace 'x' with '*' for multiplication to work correctly
        const formattedExpression = expression.replace(/x/g, '*');
        // Using eval to evaluate the expression
        echo('The answer is ' + eval(formattedExpression));
    } catch (error) {

        // Handle any errors in the expression
        echo('Error: Invalid expression');
    }
}

//Calculate Log
function processLogCommand(input) {
    const parts = input.split(':');
    const command = parts[0].trim();
    const value = parseFloat(parts[1]);

    if (command.toLowerCase() === 'log' && !isNaN(value)) {
        const result = Math.log10(value);
        echo(`The logarithm base 10 of ${value} is ${result}`);
    } else {

        echo('Invalid log command or value');
    }
}

// Ceil
function processCeilCommand(input) {
    const parts = input.split(':');
    const command = parts[0].trim();
    const value = parseFloat(parts[1]);

    if (command.toLowerCase() === 'ceil' && !isNaN(value)) {
        const result = ceil(value);
        echo(`The ceiling value of ${value} is ${result}`);
    } else {

        echo('Invalid ceil command or value');
    }
}

function ceil(x) {
    if (Number.isInteger(x)) {
        return x;
    } else {
        return Math.ceil(x);
    }
}

//Float Absolute
function processFloatAbsolute(num) {
    let x = parseFloat(num.trim().replace(/^floatabsolute:\s*/i, ''));
    if (!isNaN(x)) {
        echo('The float absolute for ' + x + ' is ' + Math.abs(x));
    } else {

        echo('Invalid value'); // Return NaN for unsupported types or invalid input
    }
}

//Float
function processFloat(num) {
    let x = parseFloat(num.trim().replace(/^float:\s*/i, ''));
    if (!isNaN(x)) {
        echo('The float value is ' + x);
    } else {

        echo('Invalid value'); // Return NaN for unsupported types or invalid input
    }
}

// Function to calculate the Greatest Common Divisor (GCD) of two numbers
function processGcd(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {

        echo('Invalid input format. Please use "gcd:a,b" where a and b are numbers.');
        return;
    }

    // Euclidean algorithm to find GCD
    let a = Math.abs(numbers[0]);
    let b = Math.abs(numbers[1]);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    echo('GCD of ' + numbers[0] + ' and ' + numbers[1] + ' is ' + a);
}

// This is different from processGcd
function processGcdForLcm(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {

        echo('Invalid input format. Please use "gcd:a,b" where a and b are numbers.');
        return;
    }

    // Euclidean algorithm to find GCD
    let a = Math.abs(numbers[0]);
    let b = Math.abs(numbers[1]);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return (a);
}

// Function to calculate the Least Common Multiple (LCM) of two numbers
function processLcm(input) {
    // Extract numbers from the input string
    const numbers = input.split(':')[1].split(',').map(Number);

    // Ensure there are two numbers in the input
    if (numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1])) {

        echo('Invalid input format. Please use "lcm:a,b" where a and b are numbers.');
        return;
    }

    // LCM is calculated using the formula: LCM(a, b) = (a * b) / GCD(a, b)
    const a = Math.abs(numbers[0]);
    const b = Math.abs(numbers[1]);
    const gcdValue = processGcdForLcm(input.split(':')[0] + ':' + numbers[0] + ',' + numbers[1]); // Calculate GCD first
    const lcmValue = (a * b) / gcdValue;
    echo('LCM of ' + numbers[0] + ' and ' + numbers[1] + ' is ' + lcmValue);
}

//Count
function countBackward(number) {
    // Check if the input is a valid number
    if (isNaN(number)) {

        echo('Please provide a valid number after "count:".');  // Assuming echo is a function that displays a message
        return;  // Exit the function if the input is not a valid number
    }

    // Check if the number is positive
    if (number <= 0) {

        echo('Please provide a positive number greater than zero.');
        return;  // Exit the function if the input is not a positive number
    }

    // Start counting backward in real-time
    let count = number;

    // Define a function to update the count in real-time
    function updateCount() {
        if (count >= 1) {
            echo(count + '\n');  // Append '\n' for a new line
            count--;
            setTimeout(updateCount, 1000);  // Update the count every 1000ms (1 second)
        }
    }

    updateCount();  // Start updating the count in real-time
}

// Function to calculate the next number in the sequence using linear regression
function predictNextNumber(sequence) {
    const numbers = sequence.split(',').map(Number);
    const n = numbers.length;

    if (n < 2) {
        throw new Error("At least two numbers are required to predict the next number.");
    }

    const x = Array.from({ length: n }, (_, i) => i + 1);
    const y = numbers;

    const meanX = mean(x);
    const meanY = mean(y);

    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
        numerator += (x[i] - meanX) * (y[i] - meanY);
        denominator += (x[i] - meanX) * (x[i] - meanX);
    }

    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;

    const nextX = n + 1;
    const nextY = slope * nextX + intercept;

    echo(nextY);
}