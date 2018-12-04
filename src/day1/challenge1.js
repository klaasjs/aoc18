const fs = require('fs'),
      challenge1 = require('./challenge1.solution');

(function() {
    fs.readFile('frequencies.txt', 'utf8', function(err, contents) {
        const frequencies = contents.split('\n');
        console.log('solution: ', challenge1.sum(frequencies));
    });
})();