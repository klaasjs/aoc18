const fs = require("fs");

fs.readFile("ids.txt", "utf8", function(err, contents) {
    const ids = contents.split('\n');
    ids.forEach((id, index) => {
        for (let y = index; y < ids.length; y++) {
            const nextId = ids[y];
            let difference = 0;
            for (let i = 0; i < id.length; i++) {
                const c = id.charAt(i);
                const d = nextId.charAt(i);
                if (c !== d) {
                    difference++;
                }
            }
    
            if (difference === 1) {
                let solution = '';
                for (let i = 0; i < id.length; i++) {
                    const c = id.charAt(i);
                    const d = nextId.charAt(i);
                    if (c === d) {
                        solution += c;
                    }
                }

                console.log(id, ' - ', nextId, ' - ', solution);
            }
        }
    });
});
