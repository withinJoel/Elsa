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

//Check Password Strength
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];

    // Length checks
    if (password.length < 6) {
        feedback.push('❌ Too short (min 6 characters)');
    } else if (password.length >= 6 && password.length < 8) {
        strength += 1;
        feedback.push('⚠️ Length: Fair (6-7 chars)');
    } else if (password.length >= 8 && password.length < 12) {
        strength += 2;
        feedback.push('✓ Length: Good (8-11 chars)');
    } else if (password.length >= 12) {
        strength += 3;
        feedback.push('✓ Length: Excellent (12+ chars)');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 1;
        feedback.push('✓ Has uppercase letters');
    } else {
        feedback.push('❌ Missing uppercase letters');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 1;
        feedback.push('✓ Has lowercase letters');
    } else {
        feedback.push('❌ Missing lowercase letters');
    }

    // Number check
    if (/[0-9]/.test(password)) {
        strength += 1;
        feedback.push('✓ Has numbers');
    } else {
        feedback.push('❌ Missing numbers');
    }

    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
        strength += 2;
        feedback.push('✓ Has special characters');
    } else {
        feedback.push('❌ Missing special characters');
    }

    // Common password patterns check
    const commonPatterns = ['password', '123456', 'qwerty', 'abc123', 'letmein', 'welcome', 'admin', 'login'];
    const lowerPassword = password.toLowerCase();
    if (commonPatterns.some(pattern => lowerPassword.includes(pattern))) {
        strength = Math.max(0, strength - 3);
        feedback.push('⚠️ Contains common password pattern');
    }

    // Determine rating
    let rating, emoji;
    if (strength <= 2) {
        rating = 'Very Weak';
    } else if (strength <= 4) {
        rating = 'Weak';
    } else if (strength <= 6) {
        rating = 'Fair';
    } else if (strength <= 8) {
        rating = 'Strong';
    } else {
        rating = 'Very Strong';
    }

    // Output results
    echo('=== Password Strength Analysis ===');
    echo(`Rating: ${rating} (Score: ${strength}/10)`);
    echo('Details:');
    feedback.forEach(item => echo(`  ${item}`));
    echo('==================================');
}