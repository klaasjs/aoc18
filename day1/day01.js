var fs = require('fs');

fs.readFile('frequencies.txt', 'utf8', function(err, contents) {
    const frequencies = contents.replace(/\+/g, '').split('\n');
    const sum = frequencies.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    console.log('total: ', sum);
});