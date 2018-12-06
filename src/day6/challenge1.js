const fs = require('fs');

const count = (needle, haystack, bb) => {
    let first = false;
    let c = 0;

    for (let y = bb.top; y < bb.bottom; y++) {
        for (let x = bb.left; x < bb.right; x++) {
            if (haystack[y][x] === needle) {
                c++;
            }
        }
    }

    return c;
}

const withinBox = (box, coordinates) => {
    const result = [];
    coordinates.forEach((c, i) => {
        if (c.x > box.left && c.x < box.right && c.y > box.top && c.y < box.bottom) {
            result.push(i);
        }
    });

    return result;
}

const boundingBox = (coordinates) => {
    const result = {
        left: Number.MAX_VALUE,
        top: Number.MAX_VALUE,
        right: 0,
        bottom: 0
    };

    coordinates.forEach(coordinate => {
        if (coordinate.x < result.left) {
            result.left = coordinate.x;
        }

        if (coordinate.y < result.top) {
            result.top = coordinate.y;
        }

        if (coordinate.x > result.right) {
            result.right = coordinate.x;
        }

        if (coordinate.y > result.bottom) {
            result.bottom = coordinate.y;
        }
    })

    return result;
};

const distance = (p, q) => {
    return Math.abs(p.x - q.x) + Math.abs(p.y - q.y); 
}

const closest = (candidate, coordinates) => {
    let min = Number.MAX_VALUE;
    let index = 0, same = 0;

    for (let i = 0; i < coordinates.length; i++) {
        const coordinate = coordinates[i];
        const d = distance(candidate, coordinate);
        if (d === min) {
            same = min;
        } else if (d < min) {
            min = d;
            index = i;
        }
    }

    return {index: (same === min && min > 0) ? -1 : index, min: min};
}

const solve = (coordinates) => {
    const bb = boundingBox(coordinates);
    const map = [];

    for (let y = 0; y < bb.bottom + 1; y++) {
        map.push(new Array());
        for (let x = 0; x < bb.right + 1; x++) {
            const c = closest({x: x, y: y}, coordinates);
            map[y].push(c.index);
        }
    }

    const pp = withinBox(bb, coordinates);
    let max = {
        count: 0,
        candidate: ''
    };
    
    pp.forEach(candidate => {
        let m = count(candidate, map, bb);
        if (m > max.count) {
            max.count = m;
            max.candidate = candidate;
        }
    });

    console.log('found ', max.candidate, ' with ', max.count, ' occurences');
};

// solve([
//      {x: 1, y: 1}, 
//      {x: 1, y: 6}, 
//      {x: 8, y: 3}, 
//      {x: 3, y: 4}, 
//      {x: 5, y: 5}, 
//      {x: 8, y: 9}  
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
