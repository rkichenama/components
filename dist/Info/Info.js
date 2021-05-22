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
var useState = React.useState, useEffect = React.useEffect;
import { mergeProps } from '../library';
import './Info.scss';
var Info = function (_a) {
    var title = _a.title, children = _a.children, right = _a.right, className = _a.className, style = _a.style, onStateChanged = _a.onStateChanged, initiallyOpen = _a.open;
    var _b = useState(initiallyOpen), open = _b[0], setOpen = _b[1];
    useEffect(function () {
        setOpen(initiallyOpen);
    }, [initiallyOpen]);
    var attributes = mergeProps({ className: 'information' }, open ? { className: 'open' } : {}, { className: className, style: style });
    var onClick = function (evt) {
        evt.preventDefault();
        setOpen(onStateChanged(open));
    };
    var headAttributes = { className: right ? 'right' : 'left', onClick: onClick };
    return (React.createElement("article", __assign({}, attributes),
        React.createElement("header", __assign({}, headAttributes), title),
        open ? (React.createElement("section", null, children)) : null));
};
Info.defaultProps = {
    right: false,
    open: false,
    title: 'Info',
    onStateChanged: function (v) { return !v; },
};
export default Info;
//# sourceMappingURL=Info.js.map