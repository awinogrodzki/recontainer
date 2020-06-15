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
exports.withContainer = void 0;
var React = require("react");
var ContainerContext_1 = require("./ContainerContext");
exports.withContainer = function (Component) {
    return React.forwardRef(function (props, ref) {
        var container = React.useContext(ContainerContext_1.ContainerContext).container;
        if (!container) {
            throw new Error("Recontainer: withContainer higher order component used outside of the ContainerContext provider. Please make sure that you have wrapped " + Component.name + " component with ContainerProvider.");
        }
        return React.createElement(Component, __assign({}, props, { container: container, ref: ref }));
    });
};
