const fs = require('fs'),
      assert = require('assert');

const data = fs.readFileSync('input.txt').toString().split(' ').map(i => parseInt(i));
// const data = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(i => parseInt(i));

const solve = () => {
    const c = data.shift();
    const m = data.shift();

    let sum = 0;

    if (c) {
        const cn = [];
        for (let i = 0; i < c; i++) {
            cn.push(solve());
        }

        for (let i = 0; i < m; i++) {
            let idx = data.shift();
            if (cn[idx - 1]) {
                sum += cn[idx - 1];
            } 
        }
    } else {
        for (let i = 0; i < m; i++) {
            sum += data.shift();
        }
    }

    return sum;
};

// assert.equal(solve(), 66);
console.log('sum of metadata: ', solve());