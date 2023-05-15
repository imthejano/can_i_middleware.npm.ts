import {
	TBelonging,
	TCanIMiddleware,
	TCanIMiddlewareConfig,
} from './types/types'
import utils from './utils/utils'

let canI: TCanIMiddleware = {
	create: function (
		belonging: TBelonging,
		resource: string
	): (request: any, response: any, next: any) => void {
		throw new Error('Function not implemented.')
	},
	read: function (
		belonging: TBelonging,
		resource: string
	): (request: any, response: any, next: any) => void {
		throw new Error('Function not implemented.')
	},
	update: function (
		belonging: TBelonging,
		resource: string
	): (request: any, response: any, next: any) => void {
		throw new Error('Function not implemented.')
	},
	delete: function (
		belonging: TBelonging,
		resource: string
	): (request: any, response: any, next: any) => void {
		throw new Error('Function not implemented.')
	},
}

export default {
	configure: (config: TCanIMiddlewareConfig): TCanIMiddleware => {
		canI = utils.buildMiddleware(config)
		return canI
	},
	canI,
}
