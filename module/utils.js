"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_object_in_object_imjano_1 = require("get_object_in_object_imjano");
const onDeniedDefaultFunction = (req, res, next) => res
    .status(403)
    .json({ error: 'you do not have permissions for this resource' });
const buildIsGrantedFunction = (config) => {
    const grants = config.grants;
    return (role) => {
        role = role.toUpperCase();
        return {
            for: (effect, belonging, resource) => {
                resource = resource.toUpperCase();
                if (grants[role]) {
                    if (grants[role].can[effect]) {
                        if (grants[role]['can'][effect][belonging]) {
                            if (grants[role]['can'][effect][belonging].indexOf(resource) != -1)
                                return true;
                            else
                                return false;
                        }
                        else
                            return false;
                    }
                    else
                        return false;
                }
                else
                    return false;
            },
        };
    };
};
const buildMiddleware = (config) => {
    var _a;
    const isGranted = buildIsGrantedFunction(config);
    const onDenied = (_a = config.onDenied) !== null && _a !== void 0 ? _a : onDeniedDefaultFunction;
    return {
        create: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = ((_a = (0, get_object_in_object_imjano_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST').toUpperCase();
                if (isGranted(role).for('create', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
        read: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = ((_a = (0, get_object_in_object_imjano_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST').toUpperCase();
                if (isGranted(role).for('read', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
        update: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = ((_a = (0, get_object_in_object_imjano_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST').toUpperCase();
                if (isGranted(role).for('update', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
        delete: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = ((_a = (0, get_object_in_object_imjano_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST').toUpperCase();
                if (isGranted(role).for('delete', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
    };
};
exports.default = {
    buildMiddleware,
};
