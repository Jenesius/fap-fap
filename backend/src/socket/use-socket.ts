import {Server} from "http";
import {Server as SocketServer} from "socket.io";
import gameNamespace from "./namespaces/game-namespace";
import sessionMiddleware from "../middleware/session-middleware";
import signallingNamespace from "./namespaces/signalling-namespace";
import {Request} from "express";
import AuthError from "../errors/auth-error";

const wrap = (middleware: any) => (socket: any, next: any) => {
	return middleware(socket.request, {}, next);
}

const authSocketMiddleware = (req: Request, res: any, next: any) => {
	if (!req.session?.userId) return next(AuthError.unauthorizedAccessApi());
	next();
}


export default function useSocket(server: Server) {
	const io = new SocketServer(server, {
		cors: {
			origin: ["http://localhost", "http://192.168.137.1"],
			methods: ['GET', 'POST'],
			credentials: true
		},
	})
	

	gameNamespace(
		io.of('/game')
		.use(wrap(sessionMiddleware))
		.use(wrap(authSocketMiddleware))
	)


	const signalling = io.of('/signalling')
	signalling.use(wrap(sessionMiddleware))
	signalling.use(wrap(authSocketMiddleware))

	signallingNamespace(signalling);

	return io;
}
