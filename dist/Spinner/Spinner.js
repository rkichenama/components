var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import './Spinner.scss';
var Spinner = function (_a) {
    var component = _a.for, test = _a.test, _b = _a.blockingClass, blockingClass = _b === void 0 ? '' : _b, props = __rest(_a, ["for", "test", "blockingClass"]);
    return (React.createElement("div", { className: test(props)
            ? "rrk-spinner" + (blockingClass ? " " + blockingClass : '')
            : undefined },
        React.createElement(component, props),
        React.createElement("span", { className: 'spinner' })));
};
export default Spinner;
//# sourceMappingURL=Spinner.js.map