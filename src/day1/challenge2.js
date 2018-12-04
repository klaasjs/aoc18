const fs = require('fs'),
      challenge2 = require('./challenge2.solution');

(function() {
    fs.readFile('frequencies.txt', 'utf8', function(err, contents) {
        const frequencies = contents.split('\n');
        console.log('solution: ', challenge2.same_frequency(frequencies));
    });
})();