var escapeRegExp = function (s) { return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); };
var _regexp = function (flags, strings) {
    var values = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        values[_i - 2] = arguments[_i];
    }
    var pattern = strings[0] + values.map(function (v, i) { return escapeRegExp(v) + strings[i + 1]; }).join('');
    return RegExp(pattern, flags);
};
var regexp = new Proxy(_regexp.bind(undefined, ''), {
    get: function (ignored, property) { return _regexp.bind(undefined, property); }
});
export default regexp;
//# sourceMappingURL=RegExFactory.js.map