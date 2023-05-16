export type TCanIMiddleware = {
    create: (belonging: TCanIMiddlewareBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
    read: (belonging: TCanIMiddlewareBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
    update: (belonging: TCanIMiddlewareBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
    delete: (belonging: TCanIMiddlewareBelongingKey, resource: string) => (request: any, response: any, next: any) => void;
};
export type TCanIMiddlewareResources = Array<string>;
export type TCanIMiddlewareResourcesDict = Record<string, string>;
export type TCanIMiddlewareBelonging = {
    own: TCanIMiddlewareResources;
    any: TCanIMiddlewareResources;
};
export type TCanIMiddlewareCRUDEffect = {
    create: TCanIMiddlewareBelonging;
    update: TCanIMiddlewareBelonging;
    read: TCanIMiddlewareBelonging;
    delete: TCanIMiddlewareBelonging;
};
export type TCanIMiddlewareBelongingKey = 'own' | 'any';
export type TCanIMiddlewareGrants = Record<string, Record<'can', TCanIMiddlewareCRUDEffect>>;
export type TCanIMiddlewareConfig = {
    resources?: TCanIMiddlewareResourcesDict;
    grants: TCanIMiddlewareGrants;
    onDenied?: (req: any, res: any, next: any) => void;
    roleLocationPath: string;
};
