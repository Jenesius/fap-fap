import {Server} from "http";
import {Server as SocketServer} from "socket.io";

export default function useSocket(server: Server) {
	const io = new SocketServer(server)
	
	io.on('connection', socket => {
		
		socket.on('entity:update', () => {
		
		})
		
	})
	
	return io;
}
