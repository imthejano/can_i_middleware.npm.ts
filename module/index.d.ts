import { TCanIMiddleware, TCanIMiddlewareConfig, TCanIMiddlewareResourcesDict } from './types';
export default class CanIMiddleware {
    static canI: TCanIMiddleware;
    static resources: TCanIMiddlewareResourcesDict;
    static configure(config: TCanIMiddlewareConfig): TCanIMiddleware;
    constructor(config: TCanIMiddlewareConfig);
}
