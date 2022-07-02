import session from "express-session"
export default session({
	secret: '123',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
})
