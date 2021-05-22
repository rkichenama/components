var mergeStringKeyValues = ['className'];
export var mergeProps = function (base) {
    var attributes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        attributes[_i - 1] = arguments[_i];
    }
    if (!base || !attributes.length) {
        throw new Error('must merge at least 2 objects');
    }
    var properties = attributes[0], rest = attributes.slice(1);
    if (rest.length) {
        return rest.reduce(function (acc, curr) { return mergeProps(acc, curr); }, mergeProps(base, properties));
    }
    var result = Object.assign({}, base);
    Object.entries(properties)
        .forEach(function (_a) {
        var k = _a[0], v = _a[1];
        result[k] = mergeStringKeyValues.includes(k)
            ? [result[k], v].filter(function (i) { return !!i; }).join(' ')
            : v;
    });
    return result;
};
//# sourceMappingURL=library.js.map