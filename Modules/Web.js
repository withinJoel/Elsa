//Open Sites
function openLink(input) {
    const url = input.trim().replace(/^open:\b\s*/i, ''); // Trim spaces and replace "open"
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

function openUrl(input) {
    const url = input.trim().replace(/^url:\b\s*/i, ''); // Trim spaces and replace "open"
    if (url.includes("https://") || url.includes('www.')) {
        window.open(url, '_blank');
    } else {
        const website = 'https://www.' + url + ".com";
        window.open(website, '_blank');
    }
}

//Open Instagram ID
function openInstagram(input) {
    const username = input.trim().replace(/^instagram:\b\s*/i, ''); // Trim spaces and replace "open"
    const instagramurl = 'https://www.instagram.com/' + username;
    window.open(instagramurl, '_blank');
}

//search Codepen
function searchCodepen(input) {
    const data = input.trim().replace(/^codepen:\b\s*/i, ''); // Trim spaces and replace "open"
    const codepenurl = 'https://codepen.io/search/pens?q=' + data;
    window.open(codepenurl, '_blank');
}

//search Amazon
function searchAmazon(input) {
    const data = input.trim().replace(/^amazon:\b\s*/i, ''); // Trim spaces and replace "open"
    const amazonurl = 'https://www.amazon.com/s?k=' + data;
    window.open(amazonurl, '_blank');
}

//search Flipart
function searchFlipkart(input) {
    const data = input.trim().replace(/^flipkart:\b\s*/i, ''); // Trim spaces and replace "open"
    const amazonurl = 'https://www.flipkart.com/search?q=' + data;
    window.open(amazonurl, '_blank');
}

//Search using Google
function searchViaGoogle(input) {
    const query = input.trim().replace(/^google:\b\s*/i, ''); // Trim spaces and replace "open"
    const queryurl = 'http://www.google.com/search?q=' + query;
    window.open(queryurl, '_blank');
}

//Search using DuckDuckGo
function searchViaDuckDuckGo(input) {
    const query = input.trim().replace(/^duckduckgo:\b\s*/i, ''); // Trim spaces and replace "open"
    const queryurl = 'http://www.duckduckgo.com/?q=' + query;
    window.open(queryurl, '_blank');
}

//Open Github ID
function openGithub(input) {
    const username = input.trim().replace(/^github:\b\s*/i, ''); // Trim spaces and replace "open"
    const githuburl = 'https://www.github.com/' + username;
    window.open(githuburl, '_blank');
}

//Search Pexels Video
function searchPexelsVid(input) {
    const query = input.trim().replace(/^pexels:video:\b\s*/i, ''); // Trim spaces and replace "open"
    const pexelsvidurl = 'https://www.pexels.com/search/videos/' + query + '/';
    window.open(pexelsvidurl, '_blank');
}

//Search Pexels Image
function searchPexelsImg(input) {
    const query = input.trim().replace(/^pexels:image:\b\s*/i, ''); // Trim spaces and replace "open"
    const pexelsimgurl = 'https://www.pexels.com/search/' + query + '/';
    window.open(pexelsimgurl, '_blank');
}

//Search Pixabay Image
function searchPixabayImg(input) {
    const query = input.trim().replace(/^pixabay:image:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabayimgurl = 'https://pixabay.com/images/search/' + query + '/';
    window.open(pixabayimgurl, '_blank');
}

//Search Pixabay Video
function searchPixabayVid(input) {
    const query = input.trim().replace(/^pixabay:video:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabayvidurl = 'https://pixabay.com/videos/search/' + query + '/';
    window.open(pixabayvidurl, '_blank');
}

//Search Pixabay Audio
function searchPixabayAud(input) {
    const query = input.trim().replace(/^pixabay:audio:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabayaudurl = 'https://pixabay.com/music/search/' + query + '/';
    window.open(pixabayaudurl, '_blank');
}

//Search Pixabay Gifs
function searchPixabayGif(input) {
    const query = input.trim().replace(/^pixabay:gif:\b\s*/i, ''); // Trim spaces and replace "open"
    const pixabaygifurl = 'https://pixabay.com/gifs/search/' + query + '/';
    window.open(pixabaygifurl, '_blank');
}

//Search Spotify
function searchSpotify(input) {
    const query = input.trim().replace(/^spotify:\b\s*/i, ''); // Trim spaces and replace "open"
    const spotifyurl = 'https://open.spotify.com/search/' + query + '';
    window.open(spotifyurl, '_blank');
}

//Search Yts
function searchYts(input) {
    const query = input.trim().replace(/^yts:\b\s*/i, ''); // Trim spaces and replace "open"
    const ytsurl = 'https://yts.mx/browse-movies/' + query + '/all/all/0/latest/0/all';
    window.open(ytsurl, '_blank');
}

//Search Youtube
function searchYoutube(input) {
    const query = input.trim().replace(/^youtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const youtubeurl = 'https://www.youtube.com/results?search_query=' + query + '';
    window.open(youtubeurl, '_blank');
}

//Search Threads
function searchThreads(input) {
    const query = input.trim().replace(/^threads:\b\s*/i, ''); // Trim spaces and replace "open"
    const youtubeurl = 'https://www.threads.net/@' + query + '/';
    window.open(youtubeurl, '_blank');
}

//Search Pinterest
function searchPinterest(input) {
    const query = input.trim().replace(/^pinterest:\b\s*/i, ''); // Trim spaces and replace "open"
    const pinteresturl = 'https://pinterest.com/search/pins/?q=' + query + '&rs=typed';
    window.open(pinteresturl, '_blank');
}

//Search Godaddy
function searchGodaddy(input) {
    const query = input.trim().replace(/^godaddy:\b\s*/i, ''); // Trim spaces and replace "open"
    const godaddyurl = 'https://www.godaddy.com/en-in/domainsearch/find?domainToCheck=' + query;
    window.open(godaddyurl, '_blank');
}

//Open Twitter ID
function openTwitter(input) {
    let username = input.trim().replace(/^x:\b\s*/i, '');
    username = input.trim().replace(/^twitter:\b\s*/i, ''); // Trim spaces and replace "open"
    const twitterurl = 'https://www.twitter.com/' + username;
    window.open(twitterurl, '_blank');
}

//Open X ID
function openX(input) {
    const username = input.trim().replace(/^x:\b\s*/i, ''); // Trim spaces and replace "open"
    const xurl = 'https://www.x.com/' + username;
    window.open(xurl, '_blank');
}

//Search Wikipedia
function searchWiki(input) {
    const query = input.trim().replace(/^wikipedia:\b\s*/i, ''); // Trim spaces and replace "open"
    const wikiurl = 'https://en.wikipedia.org/wiki/' + query;
    window.open(wikiurl, '_blank');
}

//Search XNXX
function openXNXX(input) {
    const query = input.trim().replace(/^xnxx:\b\s*/i, ''); // Trim spaces and replace "open"
    const xnxxurl = 'https://xnxx.health/search/' + query;
    window.open(xnxxurl, '_blank');
}

//Search Porn
function openPorn(input) {
    const query = input.trim().replace(/^porn:\b\s*/i, ''); // Trim spaces and replace "open"
    const pornurl = 'https://www.porn.com/search?sq=' + query;
    window.open(pornurl, '_blank');
}

//Search Xvideos
function openXvideos(input) {
    const query = input.trim().replace(/^xvideos:\b\s*/i, ''); // Trim spaces and replace "open"
    const xvideosurl = 'https://www.xvideos.com/?k=' + query;
    window.open(xvideosurl, '_blank');
}

//Search Siliconwives
function searchSiliconwives(input) {
    const query = input.trim().replace(/^siliconwives:\b\s*/i, ''); // Trim spaces and replace "open"
    const siliconwivesurl = 'https://www.siliconwives.com/search?q=' + query;
    window.open(siliconwivesurl, '_blank');
}

//Search Bellesa
function searchBellesa(input) {
    const query = input.trim().replace(/^bellesa:\b\s*/i, ''); // Trim spaces and replace "open"
    const bellesaurl = 'https://www.bellesa.co/search?q=' + query;
    window.open(bellesaurl, '_blank');
}

//Search Yourdoll
function searchYourdoll(input) {
    const query = input.trim().replace(/^yourdoll:\b\s*/i, ''); // Trim spaces and replace "open"
    const yourdollurl = 'https://www.yourdoll.com/?s=' + query + '&post_type=product';
    window.open(yourdollurl, '_blank');
}

//Search Clips4sale
function searchClips4sale(input) {
    const query = input.trim().replace(/^clips4sale:\b\s*/i, ''); // Trim spaces and replace "open"
    const clips4saleurl = 'https://www.clips4sale.com/clips/search/' + query + '/category/0/storesPage/1/clipsPage/1';
    window.open(clips4saleurl, '_blank');
}

//Search Czechvr
function openCzechvr(input) {
    const query = input.trim().replace(/^czechvr:\b\s*/i, ''); // Trim spaces and replace "open"
    const czechvrurl = 'https://www.czechvr.com/vyhledavani?search=' + query;
    window.open(czechvrurl, '_blank');
}

//Search Porn gifs
function searchPorngifs(input) {
    const query = input.trim().replace(/^porngifs:\b\s*/i, ''); // Trim spaces and replace "open"
    const porngifsurl = 'https://porngifs.xxx/?s=' + query;
    window.open(porngifsurl, '_blank');
}

//Search Reddit
function searchReddit(input) {
    const query = input.trim().replace(/^reddit:\b\s*/i, ''); // Trim spaces and replace "open"
    const redditurl = 'https://www.reddit.com/r/' + query + '/';
    window.open(redditurl, '_blank');
}

//Search tenor
function searchTenor(input) {
    const query = input.trim().replace(/^tenor:\b\s*/i, ''); // Trim spaces and replace "open"
    const tenorurl = 'https://tenor.com/search/' + query + '-gifs';
    window.open(tenorurl, '_blank');
}

//Search Red gifs
function searchRedgifs(input) {
    const query = input.trim().replace(/^redgifs:\b\s*/i, ''); // Trim spaces and replace "open"
    const redgifsurl = 'https://www.redgifs.com/gifs/' + query;
    window.open(redgifsurl, '_blank');
}

//Search itsex
function searchItsex(input) {
    const query = input.trim().replace(/^itsex:\b\s*/i, ''); // Trim spaces and replace "open"
    const itsexurl = 'https://it.sex.com/search/gifs?query=' + query;
    window.open(itsexurl, '_blank');
}

//Search Hdtube
function openHdtube(input) {
    const query = input.trim().replace(/^hdtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const hdtubeurl = 'https://www.hdtube.porn/tags/' + query + '/';
    window.open(hdtubeurl, '_blank');
}

//Search Pussyspace
function openPussyspace(input) {
    const query = input.trim().replace(/^pussyspace:\b\s*/i, ''); // Trim spaces and replace "open"
    const pussyspaceurl = 'https://www.pussyspace.com/' + query + '/';
    window.open(pussyspaceurl, '_blank');
}

//Search Pornpics
function openPornpics(input) {
    const query = input.trim().replace(/^pornpics:\b\s*/i, ''); // Trim spaces and replace "open"
    const pornpicsurl = 'https://www.pornpics.com/?q=' + query;
    window.open(pornpicsurl, '_blank');
}

//Search Indianporn365
function openIndianporn365(input) {
    const query = input.trim().replace(/^indianporn365:\b\s*/i, ''); // Trim spaces and replace "open"
    const indianporn365url = 'https://www.indianporn365.net/?s=' + query;
    window.open(indianporn365url, '_blank');
}

//Search Babespedia
function openBabespedia(input) {
    const query = input.trim().replace(/^babespedia:\b\s*/i, ''); // Trim spaces and replace "open"
    const babespediaurl = 'https://www.babepedia.com/babe/' + query;
    window.open(babespediaurl, '_blank');
}

//Search Goodporn
function openGoodPorn(input) {
    const query = input.trim().replace(/^goodporn:\b\s*/i, ''); // Trim spaces and replace "open"
    const goodpornurl = 'https://goodporn.to/search/' + query + '/';
    window.open(goodpornurl, '_blank');
}

//Search NoodleMagazine
function openNoodleMagazine(input) {
    const query = input.trim().replace(/^noodlemagazine:\b\s*/i, ''); // Trim spaces and replace "open"
    const noodlemagazineurl = 'https://noodlemagazine.com/video/' + query;
    window.open(noodlemagazineurl, '_blank');
}

//Search Xhamster
function openXhamster(input) {
    const query = input.trim().replace(/^xhamster:\b\s*/i, ''); // Trim spaces and replace "open"
    const xhamsterurl = 'https://xhamster.desi/search/' + query;
    window.open(xhamsterurl, '_blank');
}

//Search Redtube
function openRedtube(input) {
    const query = input.trim().replace(/^redtube:\b\s*/i, ''); // Trim spaces and replace "open"
    const redtubeurl = 'https://www.redtube.net/?search=' + query;
    window.open(redtubeurl, '_blank');
}

//Search YouPorn
function openYouporn(input) {
    const query = input.trim().replace(/^youporn:\b\s*/i, ''); // Trim spaces and replace "open"
    const youpornurl = 'https://www.you-porn.com/search/?search-btn=&query=' + query;
    window.open(youpornurl, '_blank');
}

//Search Tube8
function openTube8(input) {
    const query = input.trim().replace(/^tube8:\b\s*/i, ''); // Trim spaces and replace "open"
    const tube8url = 'https://www.tube8.es/searches.html?q=' + query;
    window.open(tube8url, '_blank');
}

//Search Milfporn
function openMilfporn(input) {
    const query = input.trim().replace(/^milfporn:\b\s*/i, ''); // Trim spaces and replace "open"
    const milfpornurl = 'https://www.milfporn.tv/tags/milf-' + query + '/';
    window.open(milfpornurl, '_blank');
}

//Open Snapchat ID
function openSnapchat(input) {
    const username = input.trim().replace(/^snapchat:\b\s*/i, ''); // Trim spaces and replace "open"
    const snapchaturl = 'https://www.snapchat.com/add/' + username;
    window.open(snapchaturl, '_blank');
}

//Open Linkedin ID
function openLinkedin(input) {
    const username = input.trim().replace(/^linkedin:\b\s*/i, ''); // Trim spaces and replace "open"
    const linkedinurl = 'https://www.linkedin.com/in/' + username;
    window.open(linkedinurl, '_blank');
}

//Open Clubhouse ID
function openClubhouse(input) {
    const username = input.trim().replace(/^clubhouse:\b\s*/i, ''); // Trim spaces and replace "open"
    const clubhouseurl = 'https://www.clubhouse.com/@' + username;
    window.open(clubhouseurl, '_blank');
}

//Open OnlyFans ID
function openOnlyfans(input) {
    const username = input.trim().replace(/^onlyfans:\b\s*/i, ''); // Trim spaces and replace "open"
    const onlyfansurl = 'https://www.onlyfans.com/' + username;
    window.open(onlyfansurl, '_blank');
}