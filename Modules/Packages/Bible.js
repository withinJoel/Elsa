//Bible
function Bible(input) {
    // Split input to get the book name, chapter, and verse range
    let [bookName, chapter, verseRange] = input.split(':');

    // Capitalize the book name
    bookName = bookName.charAt(0).toUpperCase() + bookName.slice(1).toLowerCase();

    // Find the index of the book name in the Bible books array
    const bookIndex = bibleBooks.indexOf(bookName);

    // If the book name is found, calculate the book number and retrieve the verses
    if (bookIndex !== -1) {
        const bookNumber = bookIndex + 1;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(bible, 'text/xml');
        const verses = [];

        const [startVerse, endVerse] = verseRange.includes('-') ? verseRange.split('-').map(Number) : [parseInt(verseRange), parseInt(verseRange)];
        const versesNodeList = xmlDoc.querySelectorAll(`book[number='${bookNumber}'] chapter[number='${chapter}'] verse[number]`);

        for (const verseNode of versesNodeList) {
            const verseNumber = parseInt(verseNode.getAttribute('number'));
            if (verseNumber >= startVerse && verseNumber <= endVerse) {
                verses.push(`Verse ${verseNumber}: ${verseNode.textContent.trim()}`);
            }
        }

        if (verses.length > 0) {
            echo(verses.join('\n'));
        } else {
            echo(`No verses found for the specified range in ${bookName} chapter ${chapter}.`);
        }
    } else {
        echo(`${bookName} is not a valid book name in the Bible.`);
    }
}