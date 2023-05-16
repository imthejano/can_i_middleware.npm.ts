export type TCanIMiddleware = {
    create: (belonging: TCanIMiddlewareGrantsBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
    read: (belonging: TCanIMiddlewareGrantsBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
    update: (belonging: TCanIMiddlewareGrantsBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
    delete: (belonging: TCanIMiddlewareGrantsBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
};
export type TCanIMiddlewareGrantsResources = Array<string>;
export type TCanIMiddlewareGrantsBelonging = {
    own: TCanIMiddlewareGrantsResources;
    any: TCanIMiddlewareGrantsResources;
};
export type TCanIMiddlewareGrantsCRUDEffect = {
    create: TCanIMiddlewareGrantsBelonging;
    update: TCanIMiddlewareGrantsBelonging;
    read: TCanIMiddlewareGrantsBelonging;
    delete: TCanIMiddlewareGrantsBelonging;
};
export type TCanIMiddlewareGrantsBelongingKey = 'own' | 'any';
export type TCanIMiddlewareGrants = Record<string, Record<'can', TCanIMiddlewareGrantsCRUDEffect>>;
export type TCanIMiddlewareGrantedRole = {
    role: string;
    canCreateOwn?: Array<string>;
    canCreateAny?: Array<string>;
    canReadOwn?: Array<string>;
    canReadAny?: Array<string>;
    canUpdateOwn?: Array<string>;
    canUpdateAny?: Array<string>;
    canDeleteOwn?: Array<string>;
    canDeleteAny?: Array<string>;
};
export type TCanIMiddlewareConfig = {
    grants: TCanIMiddlewareGrants | Array<TCanIMiddlewareGrantedRole>;
    onDenied?: (req: any, res: any, next: any) => void;
    roleLocationPath: string;
};
