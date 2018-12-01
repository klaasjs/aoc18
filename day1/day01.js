var fs = require('fs');

fs.readFile('frequencies.txt', 'utf8', function(err, contents) {
    const seen = new Set();
    
    const frequencies = contents.replace(/\+/g, '').split('\n');
    let found = false;
    let sum = 0;
    while(!found) {
        sum = frequencies.reduce((a, b) => {
            const result =  parseInt(a) + parseInt(b);
            if (!seen.has(result)) {
                seen.add(result);
            } else {
                console.log('already seen: ', result);
                found = true;
            }
            return result;
        }, sum);
    }
    
    console.log('total: ', sum);
});