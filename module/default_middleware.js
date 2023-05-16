"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    create: function (belonging, resource) {
        return (request, response, next) => response
            .status(500)
            .json({ error: 'CanI Middleware has not been initialized' });
    },
    read: function (belonging, resource) {
        return (request, response, next) => response
            .status(500)
            .json({ error: 'CanI Middleware has not been initialized' });
    },
    update: function (belonging, resource) {
        return (request, response, next) => response
            .status(500)
            .json({ error: 'CanI Middleware has not been initialized' });
    },
    delete: function (belonging, resource) {
        return (request, response, next) => response
            .status(500)
            .json({ error: 'CanI Middleware has not been initialized' });
    },
};
