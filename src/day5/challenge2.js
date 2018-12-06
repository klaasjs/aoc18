const fs = require('fs'),
      assert = require('assert');

const react = (s) => {
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

const filter = (s, c) => {
    let r = '';
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) !== c && s.charCodeAt(i) !== 65 + (c - 97)) {
            r += s[i];
        }
    }

    return r;
}

assert.equal('dbcCCBcCcD', filter('dabAcCaCBAcCcaDA', 97));
assert.equal('daAcCaCAcCcaDA', filter('dabAcCaCBAcCcaDA', 98));

const solve = (s) => {
    let min = Number.MAX_VALUE;
    for (let c = 97; c <= 123; c++) {
        const input = filter(s, c);
        const length = react(input).length;
        if (length < min) {
            min = length;
        }
    }

    return min;
}

// console.log(solve('dabAcCaCBAcCcaDA'));



//assert.equal(4, solve('dabAcCaCBAcCcaDA'));

fs.readFile("input.txt", "utf8", function (err, contents) {
     const t = solve(contents);
     console.log(t);
});