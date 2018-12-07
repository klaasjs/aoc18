
const fs = require('fs');

(function() {
    const parse = (line) => {
        return {
            finished: line.substr(5, 1),
            begin: line.substr(36, 1)
        };
    }

    const add_or_append = (map, key, value) => {
        if (map.has(key)) {
            const map_value = map.get(key);
            map_value.push(value);
            map_value.sort();
        } else {
            map.set(key, [value]);
        }
    }

    const solve = (data) => {
        const map_finished_begin = new Map();
        const map_begin_finished = new Map();

        data.forEach(line => {
            const rule = parse(line);
            add_or_append(map_finished_begin, rule.finished, rule.begin);
            add_or_append(map_begin_finished, rule.begin, rule.finished);
        });

        console.log(map_finished_begin);
        console.log(map_begin_finished);
    };

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

    // fs.readFile("input.txt", "utf8", function (err, contents) {
    //     const data = contents.split('\n');
    //     solve(data);
    // });
})();






