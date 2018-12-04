const assert = require('assert'),
      challenge2 = require('./challenge2.solution');

describe('challenge2', () => {
    it('should find the same frequency', () => {
        assert.equal(2, challenge2.same_frequency(['+1', '-2', '+3', '+1', '+1', '-2']))
    });
})