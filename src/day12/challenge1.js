const assert = require('assert'),
      fs = require('fs');

(function() {
    const ty = new Set();
    const data = fs.readFileSync('input2.txt').toString().split('\n');
    let state = data[0].substr(15);
    const notes = [];

    for (let l = 2; l < data.length; l++) {
        notes.push({
            find: data[l].substr(0, 5),
            replace: data[l].substr(9,1)
        });
    }

    const isMatch = (s) => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].find === s) {
                return notes[i].replace;
            }
        }

        return '';
    }

    const t1 = new Date();
    state = '.....' + state + '....................';
    for (let iteration = 0; iteration < 20; iteration++) {
        //console.log(state);
        const positions = [];
        const replace = [];
        
        for(let cf = 2; cf < state.length - 2; cf++) {
            const pattern = state.substr(cf - 2, 5);
            const m = isMatch(pattern);
            if (m !== '') {
                positions.push(cf);
                replace.push(m);
            }
        }

        // console.log(positions);

       for (let c = 0; c < positions.length; c++) {
            let offsetleft = 2
            const right = state.substr(positions[c] + 3);
            if (c > 0 && (positions[c] - positions[c-1]) <= 2) {
                offsetleft = positions[c] - positions[c-1];
                switch(offsetleft) {
                    case 1: {
                        const left = state.substr(0, positions[c]);
                        state = left + replace[c] + '..' + right;
                        break;
                    }
                    case 2: {
                        const left = state.substr(0, positions[c] - 1);
                        state = left + '.' + replace[c] + '..' + right;
                        break;
                    }
                }
            } else {
                const left = state.substr(0, positions[c] - 2);
                state = left + '..' + replace[c] + '..' + right;
            }
        }

        if (iteration > 1990) {
            let sum = 0;
            for (let c = 0; c < state.length; c++) {
                if (state[c] === '#') {
                    sum += (c - 5);
                }
            }
            console.log(iteration, ' - ', sum);
        }
    }

    


   // console.log(state);

    const t3 = new Date();
    console.log(t3.getTime() - t1.getTime());

})();