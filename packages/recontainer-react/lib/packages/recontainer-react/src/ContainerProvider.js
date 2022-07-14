"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerProvider = void 0;
var React = require("react");
var ContainerContext_1 = require("./ContainerContext");
exports.ContainerProvider = function (_a) {
    var container = _a.container, children = _a.children;
    return (React.createElement(ContainerContext_1.ContainerContext.Provider, { value: { container: container } }, children));
};
