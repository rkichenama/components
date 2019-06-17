/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"Table": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/Table/Table.scss":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--9-2!./src/Table/Table.scss ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".table-element{width:100%}.table-element .collapsable-content{padding:4px 8px}.table-row.banded{background-color:rgba(128,128,128,0.2)}.table-cell{padding:2px 4px}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/Table/Table.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js??ref--9-2");

/***/ }),

/***/ "./src/Table/Table.scss":
/*!******************************!*\
  !*** ./src/Table/Table.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js??ref--9-2!./Table.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?!./src/Table/Table.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/Table/Table.scss?");

/***/ }),

/***/ "./src/Table/Table.tsx":
/*!*****************************!*\
  !*** ./src/Table/Table.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Table_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table.scss */ \"./src/Table/Table.scss\");\n/* harmony import */ var _Table_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Table_scss__WEBPACK_IMPORTED_MODULE_1__);\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nvar Fragment = react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], createContext = react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"], useContext = react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"], useState = react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"];\n\nvar mergeProps = function (base) {\n    var props = [];\n    for (var _i = 1; _i < arguments.length; _i++) {\n        props[_i - 1] = arguments[_i];\n    }\n    return props.reduce(function (t, c) {\n        Object.entries(c)\n            .forEach(function (_a) {\n            var k = _a[0], v = _a[1];\n            if (['className'].includes(k) && /string/.test(typeof k)) {\n                t[k] = [t[k], v].filter(function (i) { return !!i; }).join(' ');\n            }\n            else {\n                t[k] = v;\n            }\n        });\n        return t;\n    }, base);\n};\nvar TableContext = createContext({\n    data: null,\n    columns: null,\n    rowAttrs: null,\n    cellAttrs: null,\n    content: null\n});\nvar Cell = function (_a) {\n    var isHeader = _a.isHeader, column = _a.column, data = _a.data;\n    var TagName = \"t\" + ((isHeader && 'h') || 'd');\n    var _b = useContext(TableContext), _c = _b.content, content = _c === void 0 ? function (d, c, h) { return h ? c : d[c]; } : _c, cellAttrs = _b.cellAttrs;\n    var className = 'table-cell';\n    var attributes = mergeProps({ className: className }, (!isHeader && cellAttrs && cellAttrs(data, column)) || {});\n    var value = content(data, column, isHeader);\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](TagName, __assign({}, attributes), value));\n};\nCell.defaultProps = {\n    isHeader: false,\n    data: {},\n    column: ''\n};\nvar CollapsingRow = function (_a) {\n    var data = _a.data, bandable = _a.className;\n    var _b = useContext(TableContext), columns = _b.columns, _c = _b.collapse, content = _c.content, rowAttrs = _c.rowAttrs, cellAttrs = _c.cellAttrs;\n    var className = 'collapsable';\n    var rowAttributes = mergeProps({ className: bandable + \" \" + className }, (rowAttrs && rowAttrs(data)) || {});\n    var cellAttributes = mergeProps({ className: className + \"-content\" }, (cellAttrs && cellAttrs(data)) || {});\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"tr\", __assign({}, rowAttributes),\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"td\", { colSpan: columns.length },\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"section\", __assign({}, cellAttributes), (content && content(data)) || null))));\n};\nCollapsingRow.defaultProps = {\n    data: {}\n};\nvar Row = function (_a) {\n    var isHeader = _a.isHeader, data = _a.data, isEven = _a.isEven;\n    var _b = useState(true), collapsed = _b[0], setCollapsed = _b[1];\n    var onClick = function () { setCollapsed(!collapsed); };\n    var className = \"table-row\" + (isEven ? ' banded' : '');\n    var _c = useContext(TableContext), columns = _c.columns, rowAttrs = _c.rowAttrs, collapse = _c.collapse;\n    var attributes = mergeProps({ className: className, onClick: onClick }, (!isHeader && rowAttrs && rowAttrs(data)) || {});\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](Fragment, null,\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"tr\", __assign({}, attributes), columns.map(function (column) { return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](Cell, __assign({ key: column }, { isHeader: isHeader, data: data, column: column }))); })),\n        !isHeader && collapse && !collapsed\n            ? (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](CollapsingRow, __assign({}, { data: data, className: className })))\n            : null));\n};\nRow.defaultProps = {\n    isHeader: false,\n    data: {},\n    isEven: false\n};\nvar Table = function (_a) {\n    var data = _a.data, columns = _a.columns, rowAttrs = _a.rowAttrs, cellAttrs = _a.cellAttrs, content = _a.content, collapse = _a.collapse, id = _a.id, className = _a.className, style = _a.style;\n    var attributes = mergeProps({ className: 'table-element' }, { id: id, className: className, style: style });\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](TableContext.Provider, { value: { data: data, columns: columns, rowAttrs: rowAttrs, cellAttrs: cellAttrs, content: content, collapse: collapse } },\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"table\", __assign({}, attributes),\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"thead\", null,\n                react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](Row, { isHeader: true })),\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"tbody\", null, data.map(function (data, v) { return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](Row, __assign({ key: v }, { data: data, isEven: !!(v % 2) }))); })))));\n};\nTable.defaultProps = {\n    data: [],\n    columns: [],\n    rowAttrs: function () { return ({}); },\n    cellAttrs: function () { return ({}); },\n    content: function (d, c, h) { return h ? c : d[c]; }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Table);\n\n\n//# sourceURL=webpack:///./src/Table/Table.tsx?");

/***/ }),

/***/ 1:
/*!***********************************!*\
  !*** multi ./src/Table/Table.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/Table/Table.tsx */\"./src/Table/Table.tsx\");\n\n\n//# sourceURL=webpack:///multi_./src/Table/Table.tsx?");

/***/ })

/******/ });
//# sourceMappingURL=Table.js.map