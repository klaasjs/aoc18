var exports = module.exports = {};

const fs = require("fs");
const seen = new Map();

exports.char_frequency = (s) => {
    const result = {};
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (result[c]) {
            result[c] = result[c] + 1;
        } else {
            result[c] = 1;
        }
    }

    return result;
}

fs.readFile("ids.txt", "utf8", function(err, contents) {
    let count2 = 0, count3 = 0;
    const ids = contents.split("\n");

    ids.forEach(id => {
        seen.clear();
        for (let i = 0; i < id.length; i++) {
            const c = id.charAt(i);
            seen.set(c, seen.has(c) ? seen.get(c) + 1 : 1)
        }

        let found2 = false, found3 = false;
        for (let c of seen.keys()) {
            switch(seen.get(c)) {
                case 2:
                    if (!found2) {
                        found2 = true;
                        count2++;
                    }
                break;
                case 3:
                    if(!found3) {
                        found3 = true;
                        count3++;
                    }
                    break;
            }
        }
    });

    console.log ('amount 2: ', count2, ' amount 3: ', count3, ' solution: ', count2 * count3);
});
