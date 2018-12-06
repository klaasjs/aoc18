const fs = require('fs'),
      assert = require('assert');

const solve = (s) => {
    let i = 0;
    while(i < s.length) {
        const cc = s.charCodeAt(i);
        const cn = (i < s.length - 1) ? s.charCodeAt(i+1) : '';
        
        if (cc >= 97) {
            const offsetLC = cc - 97;
            const offsetUC = 65 + offsetLC;

            if (cn === offsetUC) {
                const l = s.substr(0, i);
                const r = s.substr(i + 2);
                s = l + r;
                i -= 2;
            }
        } else {
            const offsetUC = cc - 65;
            const offsetLC = 97 + offsetUC;

            if (cn === offsetLC) {
                const l = s.substr(0, i);
                const r = s.substr(i + 2);
                s = l + r;
                i -= 2;
            }
        }

        i++;
    }
    
    return s;
};

assert.equal('dabCBAcaDA', solve('dabAcCaCBAcCcaDA'));

fs.readFile("input.txt", "utf8", function (err, contents) {
    const t = solve(contents);
    console.log(t.length);
});