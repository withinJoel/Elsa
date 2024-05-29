//Check Palindrome
function isPalindrome(input) {
    let cleanedInput = input.trim().replace(/^check:palindrome:\s*/i, '');
    const reversed = cleanedInput.split('').reverse().join('');
    const palindrome = cleanedInput === reversed;
    echo('palindrome: ' + palindrome);
}

//Check Prime
function isPrimeNumber(num) {
    let n = num.trim().replace(/^check:prime:\s*/i, '');
    if (n <= 1) {
        echo(`${n} is not a prime number.`);
        return;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            echo(`${n} is not a prime number.`);
            return;
        }
    }
    echo(`${n} is a prime number.`);
}

//Check Composite
function isCompositeNumber(num) {
    let n = num.trim().replace(/^check:composite:\s*/i, '');
    if (n <= 1) {
        echo(`${n} is neither prime nor composite.`);
        return;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            echo(`${n} is a composite number.`);
            return;
        }
    }
    echo(`${n} is not a composite number.`);
}

//Check Odd
function isOddNumber(num) {
    let n = num.trim().replace(/^check:odd:\s*/i, '');
    if (n % 2 !== 0) {
        echo(`${n} is an odd number.`);
    } else {
        echo(`${n} is not an odd number.`);
    }
}

//Check Even
function isEvenNumber(num) {
    let n = num.trim().replace(/^check:even:\s*/i, '');
    if (n % 2 === 0) {
        echo(`${n} is an even number.`);
    } else {
        echo(`${n} is not an even number.`);
    }
}