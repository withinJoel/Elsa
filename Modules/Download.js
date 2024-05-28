//Download Video
function downloadVideo(url) {
    link = `https://www.savethevideo.com/downloader?url=` + url;
    echo(link);
    window.open(link, '_blank');
}