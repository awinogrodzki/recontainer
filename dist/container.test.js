"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
var config = {
    service: function () { return 'string'; },
};
describe('container', function () {
    it('should throw error if user tries to create container without config', function () {
        expect(function () { return container_1.createContainer(undefined); }).toThrowError();
    });
    it('should return value of provided factory function', function () {
        var container = container_1.createContainer(config);
        var value = container.get('service');
        expect(value).toBe('string');
    });
    it('should throw error if there is no factory under given identifier', function () {
        var container = container_1.createContainer({
            service: undefined,
        });
        expect(function () { return container.get('service'); }).toThrowError();
    });
    it('should throw error if provided factory is other type than function', function () {
        var container = container_1.createContainer({
            service: 12
        });
        expect(function () { return container.get('service'); }).toThrowError();
    });
    it('should be able to inject other defined dependencies', function () {
        var ContainerKey;
        (function (ContainerKey) {
            ContainerKey["movieService"] = "movieService";
            ContainerKey["userService"] = "userService";
        })(ContainerKey || (ContainerKey = {}));
        ;
        var config = {
            movieService: function (container) {
                return container.get(ContainerKey.userService);
            },
            userService: function () { return 'Hello from userService!'; }
        };
        var container = container_1.createContainer(config);
        expect(container.get(ContainerKey.movieService)).toBe('Hello from userService!');
    });
    it('should not create the same instance of object twice', function () {
        var ContainerKey;
        (function (ContainerKey) {
            ContainerKey["movieService"] = "movieService";
            ContainerKey["userService"] = "userService";
            ContainerKey["imageService"] = "imageService";
        })(ContainerKey || (ContainerKey = {}));
        ;
        var userServiceFactory = jest.fn(function () { return 'Hello from userService!'; });
        var config = {
            imageService: function (container) { return container.get(ContainerKey.userService); },
            movieService: function (container) { return container.get(ContainerKey.userService); },
            userService: userServiceFactory,
        };
        var container = container_1.createContainer(config);
        container.get(ContainerKey.imageService);
        container.get(ContainerKey.movieService);
        expect(userServiceFactory).not.toHaveBeenCalledTimes(2);
    });
});
