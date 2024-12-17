//Generate QR Code
function createQrCode(input) {
    const qr = input.trim().replace(/^createqr:\b\s*/i, '');
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}&size=100x100`;

    const newTab = window.open(qrImageUrl, '_blank');
    if (newTab) {
        newTab.focus();
    } else {

        alert('Please allow pop-ups for this website to view the QR code.');
    }
}

//Generate a password
function createPassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    let password = '';
    for (let i = 0; i < length; i++) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        const randomIndex = array[0] % charset.length;
        password += charset[randomIndex];
    }
    echo(`Password: ${password}`);
}

//Generate All Possible Combinations
function generateCombinations(length) {
    let characters = '~!@#$%^&*()_-+=[]{}:<>,.0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function generate(current, length) {
        if (length === 0) {
            echo(current);
            return;
        }
        for (let i = 0; i < characters.length; i++) {
            generate(current + characters[i], length - 1);
        }
    }

    generate('', length);
}

//Generate All Numerical Combinations
function generateNumberCombinations(length) {
    let characters = '0123456789';

    function generate(current, length) {
        if (length === 0) {
            echo(current);
            return;
        }
        for (let i = 0; i < characters.length; i++) {
            generate(current + characters[i], length - 1);
        }
    }

    generate('', length);
}

//Generate All Alphabet Combinations
function generateAlphabetCombinations(length) {
    let characters = 'abcdefghijklmnopqrstuvwxyz';

    function generate(current, length) {
        if (length === 0) {
            echo(current);
            return;
        }
        for (let i = 0; i < characters.length; i++) {
            generate(current + characters[i], length - 1);
        }
    }

    generate('', length);
}

//Generate All Alphabet And Number Combinations
function generateAlphanumericCombinations(length) {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyz';

    function generate(current, length) {
        if (length === 0) {
            echo(current);
            return;
        }
        for (let i = 0; i < characters.length; i++) {
            generate(current + characters[i], length - 1);
        }
    }

    generate('', length);
}

//Generate All Special Characters Combinations
function generateSpecialCharacterCombinations(length) {
    let characters = '~!@#$%^&*()_-+=[]{}:<>,.';

    function generate(current, length) {
        if (length === 0) {
            echo(current);
            return;
        }
        for (let i = 0; i < characters.length; i++) {
            generate(current + characters[i], length - 1);
        }
    }

    generate('', length);
}