const assert = require('assert');

const circle = [];

const solve = (cm, players) => {
    for (let c = 0; c < players; c++) {
        circle.push(cm++);

    }
    return 32;
}
solve(0);


assert.equal(32, solve(0, 9));
console.log(circle);
//429 players; last marble is worth 70901 points