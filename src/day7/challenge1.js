
const fs = require('fs');

(function() {
    const parse = (data) => {
        const map = new Map();

        data.forEach(line => {
            const sf = line.substr(5,1);
            const sb = line.substr(36,1);

            if (map.has(sf)) {
                const v = map.get(sf);
                v.push(sb);
                v.sort();
            } else {
                map.set(sf, [sb]);
            }
        });

        return map;
    };

    const solve = (d) => {
        const m = parse(d);
        console.log('m', m);
    }

    const data = [
        'Step C must be finished before step A can begin.',
        'Step C must be finished before step F can begin.',
        'Step A must be finished before step B can begin.',
        'Step A must be finished before step D can begin.',
        'Step B must be finished before step E can begin.',
        'Step D must be finished before step E can begin.',
        'Step F must be finished before step E can begin.'
    ];

    solve(data);
})();






