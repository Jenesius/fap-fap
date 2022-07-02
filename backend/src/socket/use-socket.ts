import {Server} from "http";
import {Server as SocketServer} from "socket.io";
import gameNamespace from "./namespaces/game/game-namespace";

export default function useSocket(server: Server) {
	const io = new SocketServer(server, {
		cors: {
			origin: "http://localhost",
			methods: ['GET', 'POST']
		}
	})
	

	
	gameNamespace(io.of('/game'))
	
	return io;
}
