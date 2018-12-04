module.exports = {
    sum: function(arr) {
        return arr.reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        })
    }
};