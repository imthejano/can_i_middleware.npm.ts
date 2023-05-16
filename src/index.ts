import {
	TCanIMiddlewareBelongingKey,
	TCanIMiddleware,
	TCanIMiddlewareConfig,
	TCanIMiddlewareResourcesDict,
} from './types'

import utils from './utils'

let defaultResources: TCanIMiddlewareResourcesDict = {
	FOO: 'FOO',
}

let defaultCanI: TCanIMiddleware = {
	create: function (
		belonging: TCanIMiddlewareBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response.status(500).json({ error: 'Function not implemented' })
	},
	read: function (
		belonging: TCanIMiddlewareBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response.status(500).json({ error: 'Function not implemented' })
	},
	update: function (
		belonging: TCanIMiddlewareBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response.status(500).json({ error: 'Function not implemented' })
	},
	delete: function (
		belonging: TCanIMiddlewareBelongingKey,
		resource: string
	): (request: any, response: any, next: any) => void {
		return (request: any, response: any, next: any) =>
			response.status(500).json({ error: 'Function not implemented' })
	},
}

export default class CanIMiddleware {
	static canI: TCanIMiddleware = defaultCanI
	static resources: TCanIMiddlewareResourcesDict = defaultResources
	static configure(config: TCanIMiddlewareConfig): TCanIMiddleware {
		CanIMiddleware.resources = config.resources ?? defaultResources
		CanIMiddleware.canI = utils.buildMiddleware(config)
		return CanIMiddleware.canI
	}

	constructor(config: TCanIMiddlewareConfig) {
		CanIMiddleware.resources = config.resources ?? defaultResources
		CanIMiddleware.canI = utils.buildMiddleware(config)
	}
}
