import CanIMiddleware from '../src/main'
const grants = {
	ROOT: {
		can: {
			create: {
				own: ['FOO'],
				any: ['BAR'],
			},
			read: {
				own: [],
				any: [],
			},
			update: {
				own: [],
				any: [],
			},
			delete: {
				own: [],
				any: [],
			},
		},
	},
	GUEST: {
		can: {
			create: {
				own: [],
				any: [],
			},
			read: {
				own: [],
				any: [],
			},
			update: {
				own: [],
				any: [],
			},
			delete: {
				own: [],
				any: [],
			},
		},
	},
}

const reqRoot = {
	auth: {
		user: {
			role: 'root',
		},
	},
}
const reqGuest = {}
const onDenied = (req: any, res: any, next: any) => {
	console.log('access denied')
}

const canI = CanIMiddleware.build({
	grants: grants,
	roleLocationPath: 'auth.user.role',
	onDenied: onDenied,
})

const handler = canI.create('own', 'FOO')

describe('There is an incoming request with root role', () => {
	let access: boolean = false
	handler(reqRoot, {}, () => (access = true))
	it('should grant access to the resource', () => {
		expect(access).toBe(true)
	})
})
describe('There is an incoming request with not role', () => {
	let access: boolean = false
	handler(reqGuest, {}, () => (access = true))
	it('should deny access to the resource', () => {
		expect(access).toBe(false)
	})
})
