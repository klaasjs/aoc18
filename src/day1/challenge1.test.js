const assert = require('assert'),
      challenge1 = require('./challenge1.solution');

describe('challenge1', () => {
    it('should sum all elements in an array', () => {
        assert.equal(3,  challenge1.sum(['+1', '+1', '+1']));
        assert.equal(0,  challenge1.sum(['+1', '+1', '-2']));
        assert.equal(-6, challenge1.sum(['-1', '-2', '-3']));
    });
})