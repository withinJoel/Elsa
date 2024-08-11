function getHttpStatusCode(statusCode) {
    const StatusMessages = {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        103: "Early Hints",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        208: "Already Reported",
        226: "IM Used",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        306: "Switch Proxy",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Payload Too Large",
        414: "URI Too Long",
        415: "Unsupported Media Type",
        416: "Range Not Satisfiable",
        417: "Expectation Failed",
        418: "I'm a teapot", // RFC 2324
        421: "Misdirected Request",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Too Early",
        426: "Upgrade Required",
        427: "Unassigned",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        508: "Loop Detected",
        510: "Not Extended",
        511: "Network Authentication Required",
        520: "Unknown Error", // Cloudflare
        521: "Web Server Is Down", // Cloudflare
        522: "Connection Timed Out", // Cloudflare
        523: "Origin Is Unreachable", // Cloudflare
        524: "A Timeout Occurred", // Cloudflare
        525: "SSL Handshake Failed", // Cloudflare
        526: "Invalid SSL Certificate", // Cloudflare
        527: "Railgun Error", // Cloudflare
        530: "Site is Frozen", // Cloudflare
        600: "Unparseable Response Headers", // Microsoft IIS
        601: "Unknown Error", // Microsoft IIS
        602: "Unspecified Error", // Microsoft IIS
        603: "Server Busy", // Microsoft IIS
        604: "HTTP Version Not Supported", // Microsoft IIS
        605: "Service Temporarily Overloaded", // Microsoft IIS
        606: "Network Unreachable", // Microsoft IIS
        607: "Gateway Timeout", // Microsoft IIS
        608: "Service Unavailable", // Microsoft IIS
        609: "Service Not Available", // Microsoft IIS
        610: "Gateway Not Found", // Microsoft IIS
        611: "Host Not Found", // Microsoft IIS
        612: "Invalid Request", // Microsoft IIS
        613: "Timeout", // Microsoft IIS
        614: "Connection Closed", // Microsoft IIS
        615: "Bandwidth Limit Exceeded", // Microsoft IIS
        616: "Insufficient Storage", // Microsoft IIS
        617: "Precondition Failed", // Microsoft IIS
        618: "Request Entity Too Large", // Microsoft IIS
        619: "Request URI Too Long", // Microsoft IIS
        620: "Unsupported Media Type", // Microsoft IIS
        621: "Expectation Failed", // Microsoft IIS
        622: "Internal Server Error", // Microsoft IIS
        623: "Not Implemented", // Microsoft IIS
        624: "Bad Gateway", // Microsoft IIS
        625: "Service Unavailable", // Microsoft IIS
        626: "Gateway Timeout", // Microsoft IIS
        627: "HTTP Version Not Supported", // Microsoft IIS
        628: "Variant Also Negotiates", // Microsoft IIS
        629: "Insufficient Storage", // Microsoft IIS
        630: "Loop Detected", // Microsoft IIS
        631: "Not Extended", // Microsoft IIS
        632: "Network Authentication Required", // Microsoft IIS
        633: "Unknown Error", // Microsoft IIS
        634: "Web Server Is Down", // Microsoft IIS
        635: "Connection Timed Out", // Microsoft IIS
        636: "Origin Is Unreachable", // Microsoft IIS
        637: "A Timeout Occurred", // Microsoft IIS
        638: "SSL Handshake Failed", // Microsoft IIS
        639: "Invalid SSL Certificate", // Microsoft IIS
        640: "Railgun Error", // Microsoft IIS
        641: "Site is Frozen", // Microsoft IIS
        642: "Unknown Error", // Microsoft IIS
        643: "Web Server Is Down", // Microsoft IIS
        644: "Connection Timed Out", // Microsoft IIS
        645: "Origin Is Unreachable", // Microsoft IIS
        646: "A Timeout Occurred", // Microsoft IIS
        647: "SSL Handshake Failed", // Microsoft IIS
        648: "Invalid SSL Certificate", // Microsoft IIS
        649: "Railgun Error", // Microsoft IIS
        650: "Site is Frozen" // Microsoft IIS
    };    
    const errorMessage = StatusMessages[statusCode] || "Unknown HTTP Code";
    echo ("Message: "+errorMessage);
}

const CountryData = {
    '+93': 'Afghanistan',
    '+355': 'Albania',
    '+213': 'Algeria',
    '+1-684': 'American Samoa',
    '+376': 'Andorra',
    '+244': 'Angola',
    '+1-264': 'Anguilla',
    '+672': 'Antarctica',
    '+1-268': 'Antigua and Barbuda',
    '+54': 'Argentina',
    '+374': 'Armenia',
    '+297': 'Aruba',
    '+61': 'Australia',
    '+43': 'Austria',
    '+994': 'Azerbaijan',
    '+1-242': 'Bahamas',
    '+973': 'Bahrain',
    '+880': 'Bangladesh',
    '+1-246': 'Barbados',
    '+375': 'Belarus',
    '+32': 'Belgium',
    '+501': 'Belize',
    '+229': 'Benin',
    '+1-441': 'Bermuda',
    '+975': 'Bhutan',
    '+591': 'Bolivia',
    '+387': 'Bosnia and Herzegovina',
    '+267': 'Botswana',
    '+55': 'Brazil',
    '+673': 'Brunei',
    '+359': 'Bulgaria',
    '+226': 'Burkina Faso',
    '+257': 'Burundi',
    '+238': 'Cabo Verde',
    '+855': 'Cambodia',
    '+237': 'Cameroon',
    '+1': 'Canada',
    '+1-345': 'Cayman Islands',
    '+236': 'Central African Republic',
    '+235': 'Chad',
    '+56': 'Chile',
    '+86': 'China',
    '+61': 'Christmas Island',
    '+61': 'Cocos (Keeling) Islands',
    '+57': 'Colombia',
    '+269': 'Comoros',
    '+242': 'Congo (Congo-Brazzaville)',
    '+243': 'Congo (Congo-Kinshasa)',
    '+682': 'Cook Islands',
    '+506': 'Costa Rica',
    '+225': 'Côte d\'Ivoire',
    '+385': 'Croatia',
    '+53': 'Cuba',
    '+599': 'Curaçao',
    '+357': 'Cyprus',
    '+420': 'Czechia',
    '+45': 'Denmark',
    '+253': 'Djibouti',
    '+1-767': 'Dominica',
    '+1-809': 'Dominican Republic',
    '+670': 'East Timor',
    '+593': 'Ecuador',
    '+20': 'Egypt',
    '+503': 'El Salvador',
    '+240': 'Equatorial Guinea',
    '+291': 'Eritrea',
    '+372': 'Estonia',
    '+268': 'Eswatini',
    '+1-649': 'Turks and Caicos Islands',
    '+216': 'Tunisia',
    '+90': 'Turkey',
    '+993': 'Turkmenistan',
    '+1-868': 'Trinidad and Tobago',
    '+688': 'Tuvalu',
    '+256': 'Uganda',
    '+380': 'Ukraine',
    '+971': 'United Arab Emirates',
    '+44': 'United Kingdom',
    '+1': 'United States',
    '+598': 'Uruguay',
    '+998': 'Uzbekistan',
    '+678': 'Vanuatu',
    '+39': 'Vatican City',
    '+58': 'Venezuela',
    '+84': 'Vietnam',
    '+681': 'Wallis and Futuna',
    '+967': 'Yemen',
    '+260': 'Zambia',
    '+263': 'Zimbabwe',
    '+1-284': 'British Virgin Islands',
    '+1-345': 'Cayman Islands',
    '+41': 'Switzerland',
    '+963': 'Syria',
    '+677': 'Solomon Islands',
    '+350': 'Gibraltar',
    '+1-649': 'Turks and Caicos Islands',
    '+248': 'Seychelles',
    '+242': 'Republic of the Congo',
    '+235': 'Chad',
    '+690': 'Tokelau',
    '+222': 'Mauritania',
    '+230': 'Mauritius',
    '+262': 'Réunion',
    '+262': 'Mayotte'
};

function getCountryNameByDialingCode(data) {
    // Trim whitespace and remove the 'find:countrybydialingcode:' prefix, case-insensitively
    const dialingCode = data.trim().replace(/^find:\s*countrybydialingcode:\s*/i, '');
    
    // Check the cleaned dialing code in the CountryData map
    const countryName = CountryData[dialingCode] || "Unknown Country";
    
    // Output the results
    echo("Dialing Code: " + dialingCode);
    echo("Country: " + countryName);
}

function getDialingCodeByCountryName(countryName) {
    // Convert the input country name to lowercase for case-insensitive comparison
    const lowerCaseCountryName = countryName.toLowerCase();
    
    // Find the dialing code by comparing the lowercase version of the country names
    const dialingCode = Object.keys(CountryData).find(code => CountryData[code].toLowerCase() === lowerCaseCountryName);
    
    echo("Dialing Code: " + (dialingCode || "Unknown Code"));
}

//Latency
function measureLatency(url) {
    const startTime = performance.now(); // Get the current time before sending the request

    return fetch(url)
        .then(response => {
            const endTime = performance.now(); // Get the current time after receiving the response
            const latency = endTime - startTime; // Calculate the latency by subtracting start time from end time
            return Promise.resolve(latency); // Resolve the promise with the calculated latency
        })
        .catch(error => {
            const audio = new Audio('Effects/Wrong Input.mp3');
            audio.play();
            console.error('Error measuring latency:', error);
            return Promise.reject(error); // Reject the promise if there's an error
        });
}

//Fetch Internet Information
function getInternetInfo() {
    fetch('https://jsonip.com/').then(res => {
        return res.json()
    }).then(data => {
        getInternetData(data.ip)
    }).catch(err => {
        echo(`There was an error ${err}`)
    })
}

//Internet Information
function getInternetData(ip) {
    let ipAddress = ip;
    let output = "";
    const connectionType = navigator.connection.effectiveType;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlinkSpeed = connection.downlink + " Mbps";
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => echo(`IP address: ${data.ip}`))
        .catch(error => echo('Error fetching IP address:', error));
    fetch(`http://ip-api.com/json/${ipAddress}`).then(res => {
        return res.json()
    }).then(data => {
        echo('Country: ' + data.country);
        echo('Country code: ' + data.countryCode);
        echo('Region: ' + data.regionName);
        echo('City: ' + data.city);
        echo('Timezone: ' + data.timezone);
        echo('Internet organization: ' + data.org);
        echo('AS: ' + data.as);
        echo('Zip code: ' + data.zip);
        echo('ISP: ' + data.isp);
        echo('Connection Type: ' + connectionType);
        echo('Connection Speed: ' + downlinkSpeed);
        echo('Round-trip time (RTT): ' + navigator.connection.rtt); // Estimated round-trip time in milliseconds
        echo('Save data mode: ' + navigator.connection.saveData);
    }).catch(err => {
        echo(`There was an error: ${err}`);
    })
}

//Network Speed
function getNetworkStatus() {
    const onlineStatus = navigator.onLine ? 'Online' : 'Offline'; // Online status
    echo(onlineStatus);
}

//IP Address
function getIPAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => echo(`Your IP address is: ${data.ip}`))
        .catch(error => echo('Error fetching IP address:', error));
}

//Connection Type
function getConnectionType() {
    const connectionType = navigator.connection.effectiveType; // Effective network connection type (e.g., "4g", "3g")
    echo(connectionType);
}

//Connection Speed
function getConnectionSpeed() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const downlinkSpeed = connection.downlink + " Mbps"; // Downlink speed in Mbps
    echo(downlinkSpeed);
}