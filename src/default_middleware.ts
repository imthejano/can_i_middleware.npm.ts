import { TCanIMiddleware, TCanIMiddlewareGrantsBelongingKey } from './types'

export default {
	create: function (
		belonging: TCanIMiddlewareGrantsBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response
				.status(500)
				.json({ error: 'CanI Middleware has not been initialized' })
	},
	read: function (
		belonging: TCanIMiddlewareGrantsBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response
				.status(500)
				.json({ error: 'CanI Middleware has not been initialized' })
	},
	update: function (
		belonging: TCanIMiddlewareGrantsBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response
				.status(500)
				.json({ error: 'CanI Middleware has not been initialized' })
	},
	delete: function (
		belonging: TCanIMiddlewareGrantsBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response
				.status(500)
				.json({ error: 'CanI Middleware has not been initialized' })
	},
} as TCanIMiddleware
