import { TBelonging, TCanIMiddlewareConfig } from './types/types'
import getObjectInObject from 'get_object_in_object_imjano'

const buildIsGrantedFunction = (conf: TCanIMiddlewareConfig) => {
	const grants = conf.grants
	return (role: string) => {
		role = role.toUpperCase()
		return {
			for: (
				effect: 'create' | 'update' | 'read' | 'delete',
				belonging: 'own' | 'any',
				content: string
			) => {
				content = content.toUpperCase()
				if (grants[role]) {
					if (grants[role].can[effect]) {
						if (grants[role]['can'][effect][belonging]) {
							if (
								grants[role]['can'][effect][belonging].indexOf(
									content
								) != -1
							)
								return true
							else return false
						} else return false
					} else return false
				} else return false
			},
		}
	}
}
const onDeniedDefaultFunction = (req: any, res: any, next: any) =>
	res
		.status(403)
		.json({ error: 'you do not have permissions for this resource' })

export default {
	build: (config: TCanIMiddlewareConfig) => {
		const isGranted = buildIsGrantedFunction(config)
		const onDenied: (req: any, res: any, next: any) => void =
			config.onDenied ?? onDeniedDefaultFunction
		return {
			create: (belonging: TBelonging, resource: string) => {
				return (req: any, res: any, next: any) => {
					let role = (
						getObjectInObject(req, config.roleLocationPath) ??
						'GUEST'
					).toUpperCase()
					if (isGranted(role).for('create', belonging, resource))
						next()
					else onDenied(req, res, next)
				}
			},
			read: (belonging: TBelonging, resource: string) => {
				return (req: any, res: any, next: any) => {
					let role = (
						getObjectInObject(req, config.roleLocationPath) ??
						'GUEST'
					).toUpperCase()
					if (isGranted(role).for('read', belonging, resource)) next()
					else onDenied(req, res, next)
				}
			},
			update: (belonging: TBelonging, resource: string) => {
				return (req: any, res: any, next: any) => {
					let role = (
						getObjectInObject(req, config.roleLocationPath) ??
						'GUEST'
					).toUpperCase()
					if (isGranted(role).for('update', belonging, resource))
						next()
					else onDenied(req, res, next)
				}
			},
			delete: (belonging: TBelonging, resource: string) => {
				return (req: any, res: any, next: any) => {
					let role = (
						getObjectInObject(req, config.roleLocationPath) ??
						'GUEST'
					).toUpperCase()
					if (isGranted(role).for('delete', belonging, resource))
						next()
					else onDenied(req, res, next)
				}
			},
		}
	},
}
