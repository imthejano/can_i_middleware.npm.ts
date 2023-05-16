# Can I Middleware

CanIMiddleware is a custom middleware for Express.js applications
that grants access to resources based on user roles.
It provides a simple and flexible way to manage authorization
and control access to different parts of your application.

## Installation

```bash
npm install imjano_can_i_mw
```

## Usage

import canIMiddleware

```javascript
const canIMiddleware = require('imjano_can_i_mw')
```

Create a grants object.

```javascript
const grants = [
	{
		role: 'admin',
		canCreateAny: ['foo'],
		canReadAny: ['foo'],
		canUpdateAny: ['foo'],
		canDeleteAny: ['foo'],
	},
	{
		role: 'editor',
		canUpdateAny: ['foo'],
	},
	{
		role: 'viewer',
		canReadOwn: ['foo'],
	},
]
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
app.get('foo/', canI.create('own', 'foo'), (req, res, next) => {
	res.status(200).json({ foo: 'bar' })
})
```
