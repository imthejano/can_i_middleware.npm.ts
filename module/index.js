"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
let defaultResources = {
    FOO: 'FOO',
};
let defaultCanI = {
    create: function (belonging, resource) {
        return (request, response, next) => response.status(500).json({ error: 'Function not implemented' });
    },
    read: function (belonging, resource) {
        return (request, response, next) => response.status(500).json({ error: 'Function not implemented' });
    },
    update: function (belonging, resource) {
        return (request, response, next) => response.status(500).json({ error: 'Function not implemented' });
    },
    delete: function (belonging, resource) {
        return (request, response, next) => response.status(500).json({ error: 'Function not implemented' });
    },
};
class CanIMiddleware {
    static configure(config) {
        var _a;
        CanIMiddleware.resources = (_a = config.resources) !== null && _a !== void 0 ? _a : defaultResources;
        CanIMiddleware.canI = utils_1.default.buildMiddleware(config);
        return CanIMiddleware.canI;
    }
    constructor(config) {
        var _a;
        CanIMiddleware.resources = (_a = config.resources) !== null && _a !== void 0 ? _a : defaultResources;
        CanIMiddleware.canI = utils_1.default.buildMiddleware(config);
    }
}
CanIMiddleware.canI = defaultCanI;
CanIMiddleware.resources = defaultResources;
exports.default = CanIMiddleware;
