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
        const randomIndex = Math.floor(Math.random() * charset.length);
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