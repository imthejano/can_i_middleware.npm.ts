export type TCanIMiddleware = {
	create: (
		belonging: TBelonging,
		resource: string
	) => (request: any, response: any, next: any) => void
	read: (
		belonging: TBelonging,
		resource: string
	) => (request: any, response: any, next: any) => void
	update: (
		belonging: TBelonging,
		resource: string
	) => (request: any, response: any, next: any) => void
	delete: (
		belonging: TBelonging,
		resource: string
	) => (request: any, response: any, next: any) => void
}
type TCanIMiddlewareResources = Array<string>
type TCanIMiddlewareBelonging = {
	own: TCanIMiddlewareResources
	any: TCanIMiddlewareResources
}
type TCanIMiddlewareEffect = {
	create: TCanIMiddlewareBelonging
	update: TCanIMiddlewareBelonging
	read: TCanIMiddlewareBelonging
	delete: TCanIMiddlewareBelonging
}

export type TBelonging = 'own' | 'any'

export type TCanIMiddlewareGrants = Record<
	string,
	Record<'can', TCanIMiddlewareEffect>
>

export type TCanIMiddlewareConfig = {
	grants: TCanIMiddlewareGrants
	onDenied?: (req: any, res: any, next: any) => void
	roleLocationPath: string
}
