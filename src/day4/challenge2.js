const fs = require('fs');

const parse = (line) => {
    let g = '';
    let raw_dt = line.substr(1, 16);
    const d = new Date(raw_dt);
    const l = line.substr(19);
    const o = l.substr(0, 5).toLowerCase();
    if (o === 'guard') {
        g = l.substr(0, l.indexOf('begins')).trim();
    }

    return {
        when: d,
        operation: o,
        guardId: g
    };
}

fs.readFile("input.txt", "utf8", function (err, contents) {
    const data = contents.split('\n');

    const events = data.map((line) => {
        return parse(line);
    });

    const chronologicalEvents = events.sort((a, b) => {
        return (a.when.getTime() - b.when.getTime());
    });

    const sleep_cycles = new Map();

    const sleep = new Map();
    let currentGuardId = '';
    chronologicalEvents.forEach((event, index) => {
        switch (event.operation) {
            case 'guard':
                {
                    currentGuardId = event.guardId;
                    if (!sleep.has(event.guardId)) {
                        sleep.set(event.guardId, 0);
                    }
                    break;
                }
            case 'wakes':
                {
                    const asleep = (event.when.getTime() - chronologicalEvents[index - 1].when.getTime()) / 60000;
                    if (sleep.has(currentGuardId)) {
                        const alreadyAsleep = sleep.get(currentGuardId);
                        sleep.set(currentGuardId, alreadyAsleep + asleep);
                    } else {
                        sleep.set(currentGuardId, asleep);
                    }

                    if (sleep_cycles.has(currentGuardId)) {
                        const cycles = sleep_cycles.get(currentGuardId);
                        cycles.push({
                            begin: chronologicalEvents[index - 1].when,
                            end: event.when
                        });
                    } else {
                        sleep_cycles.set(currentGuardId, [{
                            begin: chronologicalEvents[index - 1].when,
                            end: event.when
                        }]);
                    }
                }
        }
    });

    let max = 0;
    let maxGuardId = '';

    sleep.forEach((value, key) => {
        if (value > max) {
            max = value;
            maxGuardId = key;
        }
    });

    const span_minutes = (b, e) => {
        return {
            begin: b.getHours() === 23 ? b.getMinutes() : 60 + b.getMinutes(),
            end: e.getHours() === 23 ? e.getMinutes() : 60 + e.getMinutes()
        };
    };

    
    let maxMinutes = 0;
    let maxMinute = 0;
    let guardId2 = ''

    sleep_cycles.forEach((value, key) => {
        const cycles = value;

        const rows = new Array(cycles.length);
        for (let c = 0; c < rows.length; c++) {
            rows[c] = new Array(180);
            for (let t = 0; t < 180; t++) {
                rows[c][t] = '.';
            }
        }

        cycles.forEach((cycle, index) => {
            span = span_minutes(cycle.begin, cycle.end);
            
            for (let t = span.begin; t < span.end; t++) {
                rows[index][t] = '#';
            }
        });

        const most_asleep = new Map();

        rows.forEach((row, index) => {
            for (let m = 0; m < row.length; m++) {
                if (row[m] === '#') {
                    for (let n = index + 1; n < rows.length; n++) {
                        if (rows[n][m] === '#') {
                            if (most_asleep.has(m)) {
                                const count = most_asleep.get(m);
                                most_asleep.set(m, count + 1);
                            } else {
                                most_asleep.set(m, 1);
                            }
                        }
                    }
                }
            }
        })

        most_asleep.forEach((v,k) => {
            if (v > maxMinutes) {
                maxMinutes = v;
                maxMinute = k;
                guardId2 = key;
            }
        })
    })

    console.log('guard with id: ', guardId2, ' was at minute ' + maxMinute + ' ' + maxMinutes + ' asleep');
});