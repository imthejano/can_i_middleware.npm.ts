import getObjectInObject from 'imjano_get_object_in_object'
import {
	TCanIMiddlewareGrantsBelongingKey,
	TCanIMiddleware,
	TCanIMiddlewareConfig,
	TCanIMiddlewareGrants,
	TCanIMiddlewareGrantedRole,
} from './types'

const onDeniedDefaultFunction = (req: any, res: any, next: any) =>
	res
		.status(403)
		.json({ error: 'you do not have permissions for this resource' })

const parseRoleList = (
	grantedRoles: Array<TCanIMiddlewareGrantedRole>
): TCanIMiddlewareGrants => {
	let grants: TCanIMiddlewareGrants = {}
	grantedRoles.forEach((grantedRole) => {
		grants[grantedRole.role] = {
			can: {
				create: {
					own: grantedRole.canCreateOwn ?? [],
					any: grantedRole.canCreateAny ?? [],
				},
				read: {
					own: grantedRole.canReadOwn ?? [],
					any: grantedRole.canReadAny ?? [],
				},
				update: {
					own: grantedRole.canUpdateOwn ?? [],
					any: grantedRole.canUpdateAny ?? [],
				},
				delete: {
					own: grantedRole.canUpdateOwn ?? [],
					any: grantedRole.canUpdateAny ?? [],
				},
			},
		}
	})
	return grants
}

const buildIsGrantedFunction = (config: TCanIMiddlewareConfig) => {
	let grants: TCanIMiddlewareGrants
	if (Array.isArray(config.grants)) grants = parseRoleList(config.grants)
	else grants = config.grants
	return (role: string) => {
		role = role
		return {
			for: (
				effect: 'create' | 'update' | 'read' | 'delete',
				belonging: TCanIMiddlewareGrantsBelongingKey,
				resource: string
			) => {
				resource = resource
				if (grants[role]) {
					if (grants[role].can[effect]) {
						if (grants[role]['can'][effect][belonging]) {
							if (
								grants[role]['can'][effect][belonging].indexOf(
									resource
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

const buildMiddleware = (config: TCanIMiddlewareConfig): TCanIMiddleware => {
	const isGranted = buildIsGrantedFunction(config)
	const onDenied: (req: any, res: any, next: any) => void =
		config.onDenied ?? onDeniedDefaultFunction
	return {
		create: (
			belonging: TCanIMiddlewareGrantsBelongingKey,
			resource: string
		) => {
			return (req: any, res: any, next: any) => {
				let role =
					getObjectInObject(req, config.roleLocationPath) ?? 'GUEST'
				if (isGranted(role).for('create', belonging, resource)) next()
				else onDenied(req, res, next)
			}
		},
		read: (
			belonging: TCanIMiddlewareGrantsBelongingKey,
			resource: string
		) => {
			return (req: any, res: any, next: any) => {
				let role =
					getObjectInObject(req, config.roleLocationPath) ?? 'GUEST'
				if (isGranted(role).for('read', belonging, resource)) next()
				else onDenied(req, res, next)
			}
		},
		update: (
			belonging: TCanIMiddlewareGrantsBelongingKey,
			resource: string
		) => {
			return (req: any, res: any, next: any) => {
				let role =
					getObjectInObject(req, config.roleLocationPath) ?? 'GUEST'
				if (isGranted(role).for('update', belonging, resource)) next()
				else onDenied(req, res, next)
			}
		},
		delete: (
			belonging: TCanIMiddlewareGrantsBelongingKey,
			resource: string
		) => {
			return (req: any, res: any, next: any) => {
				let role =
					getObjectInObject(req, config.roleLocationPath) ?? 'GUEST'
				if (isGranted(role).for('delete', belonging, resource)) next()
				else onDenied(req, res, next)
			}
		},
	}
}

export default {
	buildMiddleware,
}
