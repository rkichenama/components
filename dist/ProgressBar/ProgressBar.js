var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { mergeProps } from '../library';
import './ProgressBar.scss';
var ProgressBar = function (_a) {
    var barColor = _a.barColor, value = _a.value, text = _a.text, className = _a.className, title = _a.title, classNames = _a.classNames;
    var values = [].concat(value)
        .map(function (val) { return (-1 + Math.max(0, Math.min(val, 1))); });
    var texts = [].concat(text);
    var barColors = [].concat(barColor);
    var attributes = mergeProps({ className: 'status-progress' }, { className: className, title: title });
    var bars = values.map(function (val, i) {
        var barAttributes = mergeProps({
            className: 'status-progress-bar-value',
            style: {
                transform: "translateX(" + val * 100 + "%)",
                background: barColors[i] || barColor
            }
        }, { className: classNames[i] });
        return (React.createElement("div", { key: i, className: 'status-progress-bar' },
            React.createElement("div", __assign({}, barAttributes)),
            React.createElement("div", { className: 'status-progress-text' }, texts[i])));
    });
    return (React.createElement("section", __assign({}, attributes), bars));
};
ProgressBar.defaultProps = {
    barColor: 'green',
    classNames: [],
    value: 0
};
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map