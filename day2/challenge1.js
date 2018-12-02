const fs = require("fs");

fs.readFile("ids.txt", "utf8", function(err, contents) {
    let count2 = 0, count3 = 0;
    const ids = contents.split("\n");

    ids.forEach(id => {
        const seen = new Map();
        for (let i = 0; i < id.length; i++) {
            const c = id.charAt(i);
            if (seen.has(c)) {
              seen.set(c, seen.get(c) + 1)
            } else {
              seen.set(c, 1);
            }
        }

        let found2 = false, found3 = false;
        for (let c of seen.keys()) {
            switch(seen.get(c)) {
                case 2:
                    if (!found2) {
                        found2 = true;
                        count2++;
                    }
                break;
                case 3:
                    if(!found3) {
                        found3 = true;
                        count3++;
                    }
                    break;
            }
        }
    });

    console.log ('amount 2: ', count2, ' amount 3: ', count3, ' solution: ', count2 * count3);
});
