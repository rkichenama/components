var Transducer = {
    map: function (transform) {
        return function (reducer) {
            return function (t, c) { return reducer(t, transform(c)); };
        };
    },
    filter: function (predicate) {
        return function (reducer) {
            return function (t, c) { return (predicate(c) ? reducer(t, c) : t); };
        };
    }
};
module.exports = Transducer;
//# sourceMappingURL=Transducer.js.map