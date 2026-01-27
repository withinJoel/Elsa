//////////////////////////////////////////////////////////////////////Hash Functions
// Hash generation module using Web Crypto API and pure JS MD5

// MD5 implementation (Web Crypto API doesn't support MD5)
function md5(string) {
    function rotateLeft(value, shift) {
        return (value << shift) | (value >>> (32 - shift));
    }

    function addUnsigned(x, y) {
        const x4 = x & 0x80000000;
        const y4 = y & 0x80000000;
        const x8 = x & 0x40000000;
        const y8 = y & 0x40000000;
        const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
        if (x8 & y8) return result ^ 0x80000000 ^ x4 ^ y4;
        if (x8 | y8) {
            if (result & 0x40000000) return result ^ 0xC0000000 ^ x4 ^ y4;
            else return result ^ 0x40000000 ^ x4 ^ y4;
        } else return result ^ x4 ^ y4;
    }

    function f(x, y, z) { return (x & y) | ((~x) & z); }
    function g(x, y, z) { return (x & z) | (y & (~z)); }
    function h(x, y, z) { return x ^ y ^ z; }
    function i(x, y, z) { return y ^ (x | (~z)); }

    function ff(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function gg(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function hh(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function ii(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(str) {
        let wordCount;
        const messageLength = str.length;
        const temp1 = messageLength + 8;
        const temp2 = (temp1 - (temp1 % 64)) / 64;
        const numberOfWords = (temp2 + 1) * 16;
        const wordArray = Array(numberOfWords - 1);
        let bytePosition = 0;
        let byteCount = 0;
        while (byteCount < messageLength) {
            wordCount = (byteCount - (byteCount % 4)) / 4;
            bytePosition = (byteCount % 4) * 8;
            wordArray[wordCount] = wordArray[wordCount] | (str.charCodeAt(byteCount) << bytePosition);
            byteCount++;
        }
        wordCount = (byteCount - (byteCount % 4)) / 4;
        bytePosition = (byteCount % 4) * 8;
        wordArray[wordCount] = wordArray[wordCount] | (0x80 << bytePosition);
        wordArray[numberOfWords - 2] = messageLength << 3;
        wordArray[numberOfWords - 1] = messageLength >>> 29;
        return wordArray;
    }

    function wordToHex(value) {
        let hex = "", temp = "", byte, count;
        for (count = 0; count <= 3; count++) {
            byte = (value >>> (count * 8)) & 255;
            temp = "0" + byte.toString(16);
            hex = hex + temp.substr(temp.length - 2, 2);
        }
        return hex;
    }

    function utf8Encode(str) {
        str = str.replace(/\r\n/g, "\n");
        let utfText = "";
        for (let n = 0; n < str.length; n++) {
            const c = str.charCodeAt(n);
            if (c < 128) {
                utfText += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utfText += String.fromCharCode((c >> 6) | 192);
                utfText += String.fromCharCode((c & 63) | 128);
            } else {
                utfText += String.fromCharCode((c >> 12) | 224);
                utfText += String.fromCharCode(((c >> 6) & 63) | 128);
                utfText += String.fromCharCode((c & 63) | 128);
            }
        }
        return utfText;
    }

    const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = utf8Encode(string);
    const x = convertToWordArray(string);
    let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;

    for (let k = 0; k < x.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d;
        a = ff(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = ff(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = ff(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = ff(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = ff(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = ff(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = ff(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = ff(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = ff(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = ff(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = ff(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = ff(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = ff(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = ff(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = ff(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = ff(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = gg(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = gg(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = gg(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = gg(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = gg(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = gg(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = gg(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = gg(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = gg(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = gg(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = gg(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = gg(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = gg(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = gg(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = gg(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = gg(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = hh(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = hh(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = hh(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = hh(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = hh(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = hh(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = hh(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = hh(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = hh(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = hh(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = hh(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = hh(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = hh(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = hh(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = hh(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = hh(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = ii(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = ii(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = ii(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = ii(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = ii(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = ii(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = ii(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = ii(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = ii(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = ii(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = ii(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = ii(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = ii(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = ii(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = ii(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = ii(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// Generate MD5 Hash
function generateMD5(text) {
    const hash = md5(text);
    echo(`MD5: ${hash}`);
}

// Generate SHA-1 Hash using Web Crypto API
async function generateSHA1(text) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        echo(`SHA-1: ${hashHex}`);
    } catch (error) {
        echo(`Error generating SHA-1 hash: ${error.message}`);
    }
}

// Generate SHA-256 Hash using Web Crypto API
async function generateSHA256(text) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        echo(`SHA-256: ${hashHex}`);
    } catch (error) {
        echo(`Error generating SHA-256 hash: ${error.message}`);
    }
}

// Generate SHA-384 Hash using Web Crypto API
async function generateSHA384(text) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-384', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        echo(`SHA-384: ${hashHex}`);
    } catch (error) {
        echo(`Error generating SHA-384 hash: ${error.message}`);
    }
}

// Generate SHA-512 Hash using Web Crypto API
async function generateSHA512(text) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        echo(`SHA-512: ${hashHex}`);
    } catch (error) {
        echo(`Error generating SHA-512 hash: ${error.message}`);
    }
}

//////////////////////////////////////////////////////////////////////System Resources
// Get system resources information
async function getResources() {
    echo('=== System Resources ===');

    // Device Memory (RAM)
    if (navigator.deviceMemory) {
        echo(`RAM: ${navigator.deviceMemory} GB`);
    } else {
        echo('RAM: Unable to detect');
    }

    // CPU Cores
    if (navigator.hardwareConcurrency) {
        echo(`CPU Cores: ${navigator.hardwareConcurrency} logical processors`);
    } else {
        echo('CPU Cores: Unable to detect');
    }

    // Platform
    echo(`Platform: ${navigator.platform}`);

    // User Agent
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    echo(`Device Type: ${isMobile ? 'Mobile' : 'Desktop'}`);

    // Network Status
    const networkStatus = navigator.onLine ? 'Online' : 'Offline';
    echo(`Network Status: ${networkStatus}`);

    // Connection Info
    if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType) {
            echo(`Connection Type: ${connection.effectiveType.toUpperCase()}`);
        }
        if (connection.downlink) {
            echo(`Download Speed: ${connection.downlink} Mbps`);
        }
    }

    // Battery Info
    if ('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();
            const level = Math.round(battery.level * 100);
            const charging = battery.charging ? 'Charging' : 'Discharging';
            echo(`Battery: ${level}% (${charging})`);
        } catch (e) {
            echo('Battery: Unable to detect');
        }
    }

    // Disk Info (via Electron IPC)
    if (window.electronAPI && window.electronAPI.getDiskInfo) {
        try {
            const diskInfo = await window.electronAPI.getDiskInfo();
            // Parse the df output for Linux/Mac
            const lines = diskInfo.trim().split('\n');
            if (lines.length >= 2) {
                const parts = lines[1].split(/\s+/);
                // df format: Filesystem, Size, Used, Avail, Use%, Mounted
                if (parts.length >= 5) {
                    echo(`Disk: ${parts[2]} used / ${parts[1]} total (${parts[4]} used)`);
                }
            }
        } catch (e) {
            echo('Disk: Unable to detect');
        }
    } else {
        echo('Disk: Run as Electron app to see disk info');
    }

    // Screen Info
    echo(`Screen Resolution: ${screen.width}x${screen.height}`);
    echo(`Color Depth: ${screen.colorDepth}-bit`);

    // Language
    echo(`Language: ${navigator.language}`);

    echo('========================');
}
