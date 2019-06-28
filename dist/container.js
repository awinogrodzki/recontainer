"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainer = function (config) {
    if (!config) {
        throw new Error('Recontainer: No config provided.');
    }
    var cache = new Map();
    var container = {
        get: function (identifier) {
            var factory = config[identifier];
            if (!factory) {
                throw new Error("Recontainer: Error while getting factory from container. No factory registered for identifier \"" + identifier + "\". Consider adding a function described by \"" + identifier + "\" property in ContainerConfig object");
            }
            if (typeof factory !== 'function') {
                throw new Error("Recontainer: Incorrect factory provided. Check the value provided as factory in ContainerConfig object. It should be of type");
            }
            var valueFromCache = cache.get(identifier);
            if (valueFromCache) {
                return valueFromCache;
            }
            var value = factory(container);
            cache.set(identifier, value);
            return value;
        },
    };
    return container;
};
