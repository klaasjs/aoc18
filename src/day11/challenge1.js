const assert = require('assert');

const power = (x, y, sn) => {
    const result = (((x + 10) * y) + sn * (x + 10)).toString();
    return parseInt(result.charAt(result.length - 3)) - 5;
}

assert.equal(power(3, 5, 8), 4);
assert.equal(power(122, 79, 57), -5);
assert.equal(power(217, 196, 39), 0);
assert.equal(power(101, 153, 71), 4);