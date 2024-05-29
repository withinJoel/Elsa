//Sort
function customSort(input) {
    const parts = input.split(':');
    if (parts.length !== 3 || !['ascending', 'descending'].includes(parts[1])) {
        return 'Invalid input format. Please use the format: sort:ascending:1,2,1,4,53,2,4,5,2,... or sort:descending:apple,bay,app,bay,apend...';
    }

    const order = parts[1] === 'ascending' ? 1 : -1;
    const items = parts[2].split(',');

    if (items.every(item => !isNaN(item))) {
        // If all items are numbers, sort as numbers
        items.sort((a, b) => order * (Number(a) - Number(b)));
    } else {
        // Otherwise, sort as strings
        items.sort((a, b) => order * a.localeCompare(b));
    }

    echo(items.join(','));
}