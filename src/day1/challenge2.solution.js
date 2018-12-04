module.exports = {
    same_frequency: (arr) => {
        const seen = new Set();
        const sum = arr.reduce((a, b) => {
            const s = parseInt(a) + parseInt(b);
            if (seen.has(s)) {
                console.log('found!', s);
            } else {
                seen.add(s);
            }

            return s;
        }, 0);

        return sum;
    }
};