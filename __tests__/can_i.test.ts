import CanIMiddleware from '../src'
const grants = [
	{
		role: 'root',
		canCreateOwn: ['FOO'],
		canReadAny: ['BAR'],
	},
	{
		role: 'guest',
	},
]

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

const canI = CanIMiddleware.configure({
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
