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
exports.createContainer = void 0;
exports.createContainer = function (config) {
    if (!config) {
        throw new Error('Recontainer: No config provided.');
    }
    var cache = new Map();
    var container = {
        get: function (identifier) {
            var factory = config[identifier];
            if (!factory) {
                throw new Error("Recontainer: Error while getting factory from container. No factory registered for identifier \"" + identifier + "\". Consider adding a function described by \"" + identifier + "\" property in ContainerConfig object.");
            }
            if (typeof factory !== 'function') {
                throw new Error("Recontainer: Incorrect factory provided. Check if the value provided as factory in ContainerConfig object is a function.");
            }
            var valueFromCache = cache.get(identifier);
            if (valueFromCache) {
                return valueFromCache;
            }
            var value = factory(container);
            cache.set(identifier, value);
            return value;
        },
        getAll: function () {
            return Object.keys(config).reduce(function (spec, key) {
                var _a;
                return (__assign(__assign({}, spec), (_a = {}, _a[key] = container.get(key), _a)));
            }, {});
        },
    };
    return container;
};
