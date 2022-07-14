"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainerHook = void 0;
var ContainerContext_1 = require("./ContainerContext");
var react_1 = require("react");
exports.createContainerHook = function () { return function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    var container = react_1.useContext(ContainerContext_1.ContainerContext).container;
    if (!container) {
        throw new Error("Recontainer: container hook cannot be used outside of the ContainerContext provider.");
    }
    if (keys.length === 0) {
        return container;
    }
    return keys.reduce(function (dependencies, key) {
        var _a;
        return (__assign(__assign({}, dependencies), (_a = {}, _a[key] = container.get(key), _a)));
    }, {});
}; };
