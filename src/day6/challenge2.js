const fs = require('fs');

const count = (needle, haystack, bb) => {
    let c = 0;

    for (let y = 0; y < haystack.length; y++) {
        for (let x = 0; x < haystack[y].length; x++) {
            if (haystack[y][x] === needle) {
                c++;
            }
        }
    }

    return c;
}

const distance = (p, q) => {
    return Math.abs(p.x - q.x) + Math.abs(p.y - q.y); 
}

const is_region = (candidate, coordinates, max) => {
    let sum = 0;
    coordinates.forEach((coordinate) => {
        sum += distance(candidate, coordinate);
    });

    return sum < max;
}


const solve = (coordinates) => {
    const SIZE = 1000;
    const map = [];
    for (let y = 0; y < SIZE; y++) {
        map.push(new Array(SIZE));
        for (let x = 0; x < SIZE; x++) {
            if (is_region({x: x, y: y}, coordinates, 10000)) {
                map[y][x] = '#';
            } else {
                map[y][x] = '.'
            }
        }
    }

    console.log('it occured ', count('#', map), ' times.');
};

// solve([
//       {x: 1, y: 1}, 
//       {x: 1, y: 6}, 
//       {x: 8, y: 3}, 
//       {x: 3, y: 4}, 
//       {x: 5, y: 5}, 
//       {x: 8, y: 9}  
// ]);

fs.readFile("input.txt", "utf8", function (err, contents) {
    const data = contents.split('\n');
    const coordinates = data.map(line => {
        const t = line.split(',');
        return {
            x: parseInt(t[0]),
            y: parseInt(t[1])
        };
    });

    solve(coordinates);
});
