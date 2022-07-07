import session from "express-session"
export default session({
	secret: '123',
	resave: false,
	saveUninitialized: false,
	// cookie: { secure: true }
})
