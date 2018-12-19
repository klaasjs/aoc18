const fs = require('fs'),
      assert = require('assert');

/*const data = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;*/

//const coordinates = data.split('\n').map(l => l.match(/-?\d+/g).map(Number));

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
            console.log('it seems its getting bigger: ', second, minWidth, minRight - minLeft);

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

//console.log(coordinates);

console.log('The coordinates were at ', second, ' the closest to each other.');