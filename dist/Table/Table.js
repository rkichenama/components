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
var Fragment = React.Fragment, createContext = React.createContext, useContext = React.useContext, useState = React.useState;
import './Table.scss';
import { mergeProps } from '../library';
var TableContext = createContext({
    data: null,
    columns: null,
    rowAttrs: null,
    cellAttrs: null,
    content: null
});
var Cell = function (_a) {
    var isHeader = _a.isHeader, column = _a.column, data = _a.data;
    var _b = useContext(TableContext), _c = _b.content, content = _c === void 0 ? function (d, c, h) { return h ? c : d[c]; } : _c, cellAttrs = _b.cellAttrs;
    var className = 'table-cell';
    var attributes = mergeProps({ className: className }, (!isHeader && cellAttrs && cellAttrs(data, column)) || {}, { children: content(data, column, isHeader) });
    return React.createElement("t" + ((isHeader && 'h') || 'd'), attributes);
};
Cell.defaultProps = {
    isHeader: false,
    data: {},
    column: ''
};
var CollapsingRow = function (_a) {
    var data = _a.data, bandable = _a.className;
    var _b = useContext(TableContext), columns = _b.columns, _c = _b.collapse, content = _c.content, rowAttrs = _c.rowAttrs, cellAttrs = _c.cellAttrs;
    var className = 'collapsable';
    var rowAttributes = mergeProps({ className: bandable + " " + className }, (rowAttrs && rowAttrs(data)) || {});
    var cellAttributes = mergeProps({ className: className + "-content" }, (cellAttrs && cellAttrs(data)) || {});
    return (React.createElement("tr", __assign({}, rowAttributes),
        React.createElement("td", { colSpan: columns.length },
            React.createElement("section", __assign({}, cellAttributes), (content && content(data)) || null))));
};
CollapsingRow.defaultProps = {
    data: {}
};
var Row = function (_a) {
    var isHeader = _a.isHeader, data = _a.data, isEven = _a.isEven;
    var _b = useState(true), collapsed = _b[0], setCollapsed = _b[1];
    var onClick = function () { setCollapsed(!collapsed); };
    var className = "table-row" + (isEven ? ' banded' : '');
    var _c = useContext(TableContext), columns = _c.columns, rowAttrs = _c.rowAttrs, collapse = _c.collapse;
    var attributes = mergeProps({ className: className, onClick: onClick }, (!isHeader && rowAttrs && rowAttrs(data)) || {});
    return (React.createElement(Fragment, null,
        React.createElement("tr", __assign({}, attributes), columns.map(function (column) { return (React.createElement(Cell, __assign({ key: column }, { isHeader: isHeader, data: data, column: column }))); })),
        !isHeader && collapse && !collapsed
            ? (React.createElement(CollapsingRow, __assign({}, { data: data, className: className })))
            : null));
};
Row.defaultProps = {
    isHeader: false,
    data: {},
    isEven: false
};
var Table = function (_a) {
    var data = _a.data, columns = _a.columns, rowAttrs = _a.rowAttrs, cellAttrs = _a.cellAttrs, content = _a.content, collapse = _a.collapse, id = _a.id, className = _a.className, style = _a.style;
    var attributes = mergeProps({ className: 'table-element' }, { id: id, className: className, style: style });
    return (React.createElement(TableContext.Provider, { value: { data: data, columns: columns, rowAttrs: rowAttrs, cellAttrs: cellAttrs, content: content, collapse: collapse } },
        React.createElement("table", __assign({}, attributes),
            React.createElement("thead", null,
                React.createElement(Row, { isHeader: true })),
            React.createElement("tbody", null, data.map(function (data, v) { return (React.createElement(Row, __assign({ key: v }, { data: data, isEven: !!(v % 2) }))); })))));
};
Table.defaultProps = {
    data: [],
    columns: [],
    rowAttrs: function () { return ({}); },
    cellAttrs: function () { return ({}); },
    content: function (d, c, h) { return h ? c : d[c]; }
};
export default Table;
//# sourceMappingURL=Table.js.map