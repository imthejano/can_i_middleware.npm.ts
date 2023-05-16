# Can I Middleware

CanIMiddleware is a custom middleware for Express.js applications
that grants access to resources based on user roles.
It provides a simple and flexible way to manage authorization
and control access to different parts of your application.

## Installation

```bash
npm install imjano_can_i_middleware
```

## Usage

import canIMiddleware

```javascript
const canIMiddleware = require('imjano_can_i_middleware')
```

Create a grants object, in this example ROOT and GUEST are roles

```javascript
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
```

Create a onDeny function, it will be called if the request is not authorized

```javascript
const onDenied = (req: any, res: any, next: any) => {
	res.status(401).json({ access: denied })
}
```

Create a path string to find the role into the request object

```javascript
const roleLocationPath = 'req.auth.user.role'
```

Now you can build the middleware and implement in your app

```javascript
const canI = canIMiddleware.configure({
	grants: grants,
	roleLocationPath: roleLocationPath,
	onDenied: onDenied,
})
app.get('foo/', canI.create('own', 'FOO'), (req, res, next) => {
	res.status(200).json({ res: 'foo' })
})
```
