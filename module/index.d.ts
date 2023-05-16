import { TCanIMiddleware, TCanIMiddlewareConfig } from './types';
export default class CanIMiddleware {
    /**
     * @description CanI Middleware is a custom middleware for Express.js applications that grants access to resources based on user roles. It provides a simple and flexible way to manage authorization and control access to different parts of your application.
     * @example
     * app.get(
     * 	'foo',
     * 	canI.read('any', 'foo'),
     * 	(req, res, next)=> res.status(200).json({foo: 'bar'})
     * )
     * app.post(
     * 	'foo',
     * 	canI.create('any', 'foo'),
     * 	(req, res, next)=> res.status(200).json({foo: 'foo was created'})
     * )
     */
    static canI: TCanIMiddleware;
    /**
     *
     * @param config: TCanIMiddlewareConfig
     * @returns canI
     * @example
     * const grants = {
     * 	USER: {
     * 		can: {
     * 			create: {
     * 				own: ['FOO']
     * 				any: []
     * 			}
     * 		}
     * 	}
     * }
     * const onDenied = (req, res, next) => res.status(403).json({error: 'forbiden'})
     * const roleLocationPath = 'auth.user.role'
     * const config = { grants, onDenied, roleLocationPath }
     * const canI = TCanIMiddleware.configure( config )
     */
    static configure(config: TCanIMiddlewareConfig): TCanIMiddleware;
    /**
     *
     * @param config: TCanIMiddlewareConfig
     * @returns canI
     * @example
     * const grants = {
     * 	USER: {
     * 		can: {
     * 			create: {
     * 				own: ['FOO']
     * 				any: []
     * 			}
     * 		}
     * 	}
     * }
     * const onDenied = (req, res, next) => res.status(403).json({error: 'forbiden'})
     * const roleLocationPath = 'auth.user.role'
     * const config = { grants, onDenied, roleLocationPath }
     * const canIMd = new CanIMiddleware( config )
     */
    constructor(config: TCanIMiddlewareConfig);
}
