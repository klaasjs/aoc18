const assert = require('assert');

const power = (x, y, sn) => {
    const result = ((((x + 10) * y) + sn) * (x + 10)).toString();
    return parseInt(result.charAt(result.length - 3)) - 5;
}

const square = (x, y, sn) => {
    let total = 0;
    for (let y1 = 0; y1 < 3; y1++) {
        for (let x1 = 0; x1 < 3; x1++) {
            total += power(x + x1, y + y1, sn);
        }
    }

    return total;
}

const solve = () => {
    const SERIAL = 3999;
    let max = 0, maxx = 0, maxy = 0, p = 0;

    for (let y = 0; y < 297; y++) {
        for (let x = 0; x < 297; x++) {
            p = square(x, y, SERIAL);
            if (p > max) {
                max = p;
                maxx = x;
                maxy = y;
            }            
        }
    }

    console.log('found the most power, ', p, ' at ', maxx, ', ', maxy);
}
solve();

// assert.equal(power(3, 5, 8), 4);
// assert.equal(power(122, 79, 57), -5);
// assert.equal(power(217, 196, 39), 0);
// assert.equal(power(101, 153, 71), 4);
// assert.equal(power(33, 45, 18), 4);
// assert.equal(power(34, 45, 18), 4);
// assert.equal(power(35, 45, 18), 4);
// assert.equal(power(33, 46, 18), 3);
// assert.equal(power(34, 46, 18), 3);
// assert.equal(power(35, 46, 18), 4);
// assert.equal(power(33, 47, 18), 1);
// assert.equal(power(34, 47, 18), 2);
// assert.equal(power(35, 47, 18), 4);