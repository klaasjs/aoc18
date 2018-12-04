const fs = require("fs"),
      assert = require('assert');

const parse = (l) => {
    const c = l.substr(l.indexOf('@') + 2);
    const p = c.split(':');
    const lt = p[0].split(',');
    const wh = p[1].split('x');
    const idx = l.substr(1, l.indexOf('@') - 2)

    return {
        left: parseInt(lt[0]),
        top: parseInt(lt[1]),
        right: parseInt(lt[0]) + parseInt(wh[0]),
        bottom: parseInt(lt[1]) + parseInt(wh[1]),
        idx: idx
    };
};

const solve = (arr) => {
    let s = new Set();
    const size = 1000;
    const a = new Array(size);
    for (let c = 0; c < a.length; c++) {
        a[c] = new Array(size);
        for (let d = 0; d < a[c].length; d++) {
            a[c][d] = '.';
        }
    }

    let count = 0;
    arr.forEach((l) => {
        const p = parse(l);
        for (let t = p.top; t < p.bottom; t++) {
            for (let l = p.left; l < p.right; l++) {
                if (a[t][l] === '.') {
                    a[t][l] = p.idx;
                } else {
                    a[t][l] = 'x';
                    
                }
            }
        }
    });

    arr.forEach((l) => {
        const p = parse(l);
        let found = true;
        for (let t = p.top; t < p.bottom; t++) {
            for (let l = p.left; l < p.right; l++) {
                if (a[t][l] === 'x') {
                    found = false;
                }
            }
        }

        if (found) {
            console.log('found: ', p.idx);
        }
    });

    

    return 2;
}

const data = ['#1 @ 1,3: 4x4',
              '#2 @ 3,1: 4x4',
              '#3 @ 5,5: 2x2'];


// assert.deepEqual({left: 1, top: 3, right: 5, bottom: 7}, parse('#1 @ 1,3: 4x4'));
// assert.deepEqual({left: 3, top: 1, right: 7, bottom: 5}, parse('#2 @ 3,1: 4x4'));
// assert.deepEqual({left: 5, top: 5, right: 7, bottom: 7}, parse('#3 @ 5,5: 2x2'));

solve(data);

fs.readFile("input.txt", "utf8", function(err, contents) {
     const claims = contents.split('\n');
     const coordinates = [];
     claims.forEach(claim => {
         coordinates.push(claim);
     });

     solve(coordinates);
});