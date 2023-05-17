"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imjano_get_object_in_object_1 = require("imjano_get_object_in_object");
const onDeniedDefaultFunction = (req, res, next) => res
    .status(403)
    .json({ error: 'you do not have permissions for this resource' });
const parseRoleList = (grantedRoles) => {
    let grants = {};
    grantedRoles.forEach((grantedRole) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        grants[grantedRole.role] = {
            can: {
                create: {
                    own: (_a = grantedRole.canCreateOwn) !== null && _a !== void 0 ? _a : [],
                    any: (_b = grantedRole.canCreateAny) !== null && _b !== void 0 ? _b : [],
                },
                read: {
                    own: (_c = grantedRole.canReadOwn) !== null && _c !== void 0 ? _c : [],
                    any: (_d = grantedRole.canReadAny) !== null && _d !== void 0 ? _d : [],
                },
                update: {
                    own: (_e = grantedRole.canUpdateOwn) !== null && _e !== void 0 ? _e : [],
                    any: (_f = grantedRole.canUpdateAny) !== null && _f !== void 0 ? _f : [],
                },
                delete: {
                    own: (_g = grantedRole.canUpdateOwn) !== null && _g !== void 0 ? _g : [],
                    any: (_h = grantedRole.canUpdateAny) !== null && _h !== void 0 ? _h : [],
                },
            },
        };
    });
    return grants;
};
const buildIsGrantedFunction = (config) => {
    let grants;
    if (Array.isArray(config.grants))
        grants = parseRoleList(config.grants);
    else
        grants = config.grants;
    return (role) => {
        role = role;
        return {
            for: (effect, belonging, resource) => {
                resource = resource;
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
                let role = (_a = (0, imjano_get_object_in_object_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST';
                if (isGranted(role).for('create', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
        read: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = (_a = (0, imjano_get_object_in_object_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST';
                if (isGranted(role).for('read', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
        update: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = (_a = (0, imjano_get_object_in_object_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST';
                if (isGranted(role).for('update', belonging, resource))
                    next();
                else
                    onDenied(req, res, next);
            };
        },
        delete: (belonging, resource) => {
            return (req, res, next) => {
                var _a;
                let role = (_a = (0, imjano_get_object_in_object_1.default)(req, config.roleLocationPath)) !== null && _a !== void 0 ? _a : 'GUEST';
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
