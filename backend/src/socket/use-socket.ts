import {Server} from "http";
import {Server as SocketServer} from "socket.io";
import gameNamespace from "./namespaces/game-namespace";
import sessionMiddleware from "../middleware/session-middleware";
import signallingNamespace from "./namespaces/signalling-namespace";

const wrap = (middleware: any) => (socket: any, next: any) => {
	return middleware(socket.request, {}, next);
}



export default function useSocket(server: Server) {
	const io = new SocketServer(server, {
		cors: {
			origin: ["http://localhost", "http://192.168.137.1"],
			methods: ['GET', 'POST'],
			credentials: true
		},
	})
	

	gameNamespace(io.of('/game').use(wrap(sessionMiddleware)))


	signallingNamespace(
		io.of('/signalling')
		.use(wrap(sessionMiddleware))
	);

	return io;
}
