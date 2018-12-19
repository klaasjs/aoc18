const assert = require('assert');

const power = (x, y, sn) => {
    const rackId = x + 10;
    const powerLevel = rackId * y;
    const withSerial = powerLevel + sn;
    const withRackId = withSerial * rackId;

    const hundred = withRackId.toString().charAt(withRackId.toString().length - 3);

    const result = parseInt(hundred) - 5;
    return result;
}

assert.equal(power(3, 5, 8), 4);
assert.equal(power(122, 79, 57), -5);
assert.equal(power(217, 196, 39), 0);
assert.equal(power(101, 153, 71), 4);