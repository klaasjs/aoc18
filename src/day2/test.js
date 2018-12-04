const assert = require('assert');
const challenge1 = require('./challenge1');

describe('char_frequency', () => {
    it('should count character frequencies', () => {
        const s = 'aabbcc';

        const r = challenge1.char_frequency(s);
        
        assert.deepEqual({ a: 2, b: 2, c: 2 }, r);
    })
})