//To get the time
function getTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    log.innerHTML = `Current time is ${timeString}`;
}

//Open Sites
function openLink(input) {
    const url = input.trim().replace(/^open\b\s*/i, ''); // Trim spaces and replace "open"
    if ((url === "developer") || (url === "dev")) {
        const website = 'https://joeljolly.pages.dev';
        window.open(website, '_blank');
    } else if (url.includes("https://") || url.includes('www.')) {
        window.open(url, '_blank');
    } else {
        const website = 'https://www.' + url + ".com";
        window.open(website, '_blank');
    }
}

//Network Speed
function getNetworkStatus() {
    const userAgent = navigator.userAgent; // User agent string
  const language = navigator.language; // Browser language
  const cookiesEnabled = navigator.cookieEnabled; // Cookies enabled or not
  const onlineStatus = navigator.onLine ? 'Online' : 'Offline'; // Online status

  // Return an object with all the details
  return {
    userAgent,
    language,
    cookiesEnabled,
    onlineStatus
  };
}

//error
function errorhandling (error){
    log.innerHTML = `${error}`;
}