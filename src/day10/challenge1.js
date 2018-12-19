const fs = require('fs'),
      assert = require('assert');

const coordinates = fs.readFileSync('input.txt').toString().split('\n').map(l => l.match(/-?\d+/g).map(Number));

const closest = (timespan) => {
    let minWidth = Number.MAX_VALUE, minHeight = Number.MAX_VALUE;
    const X = 0, Y = 1, DX = 2, DY = 3;

    for (let second = 0; second < timespan; second++) {
        let minLeft = Number.MAX_VALUE, minTop = Number.MAX_VALUE, minRight = 0, minBottom = 0;

        for (let c = 0; c < coordinates.length; c++) {
            const coordinate = coordinates[c];
            coordinate[X] += coordinate[DX];
            coordinate[Y] += coordinate[DY];

            if (coordinate[X] < minLeft) {
                minLeft = coordinate[X];
            }

            if (coordinate[Y] < minTop) {
                minTop = coordinate[Y];
            }

            if (coordinate[X] >= minRight) {
                minRight = coordinate[X];
            }

            if (coordinate[Y] >= minBottom) {
                minBottom = coordinate[Y];
            }
        }

        if (minWidth > (minRight - minLeft)) {
            minWidth = minRight - minLeft;
        } else {
            for (let t = 0; t < coordinates.length; t++) {
                const coordinate2 = coordinates[t];
                coordinate2[X] -= coordinate2[DX];
                coordinate2[Y] -= coordinate2[DY];
            }

            return second;
        }
    }

    return -1;
}

const second = closest(12000);

const hasPointAt = (x,y) => {
    for (let c = 0; c < coordinates.length; c++) {
        const coordinate = coordinates[c];
        if (coordinate[0]-100 === x && coordinate[1]-100 === y) {
            return true;
        } 
    }

    return false;
}


const plot = () => {
    for (let y = 0; y < 90; y++) {
        const line = [];
        for (let x = 0; x < 170; x++) {
            if (hasPointAt(x,y)) {
                line.push('#')
            } else {
                line.push('.');
            }
        }

        console.log(line.join(''));
    }
}
plot();

console.log('The coordinates were at ', second, ' the closest to each other.');