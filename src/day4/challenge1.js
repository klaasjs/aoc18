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

const data = [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:55] wakes up'];

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
    switch(event.operation) {
        case 'guard': {
            currentGuardId = event.guardId;
            if (!sleep.has(event.guardId)) {
                sleep.set(event.guardId, 0);
            }
            break;
        }
        case 'wakes': {
            const asleep = (event.when.getTime() - chronologicalEvents[index - 1].when.getTime()) / 60000;
            if (sleep.has(currentGuardId)) {
                const alreadyAsleep = sleep.get(currentGuardId);
                sleep.set(currentGuardId, alreadyAsleep + asleep);
            } else {
                sleep.set(currentGuardId, asleep);
            }

            if (sleep_cycles.has(currentGuardId)) {
                const cycles = sleep_cycles.get(currentGuardId);
                cycles.push({begin: chronologicalEvents[index - 1].when, end: event.when});
            } else {
                sleep_cycles.set(currentGuardId, [{begin: chronologicalEvents[index - 1].when, end: event.when}]);
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

console.log('max guard id: ', maxGuardId);

const cycles = sleep_cycles.get('Guard #10');
cycles.forEach((cycle, index) => {
    for (let c = index + 1; c < cycles.length; c++) {
        const nextCycle = cycles[c];

        if (cycle.begin.getDay)
    }
});

// fs.readFile("input.txt", "utf8", function(err, contents) {
//     const log = contents.split('\n');
//     log.forEach(line => {

//     });
// });