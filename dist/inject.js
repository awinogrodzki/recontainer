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
var React = require("react");
var ContainerContext_1 = require("./ContainerContext");
exports.createInject = function () { return function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (Component) { return function (props) {
        var container = React.useContext(ContainerContext_1.ContainerContext).container;
        if (!container) {
            throw new Error("Recontainer: inject higher order component used outside of the ContainerContext provider. Please make sure that you have wrapped " + Component.name + " component with ContainerProvider.");
        }
        var values = keys.reduce(function (keyValues, key) {
            var _a;
            return (__assign({}, keyValues, (_a = {}, _a[key] = container.get(key), _a)));
        }, {});
        return React.createElement(Component, __assign({}, props, values));
    }; };
}; };
