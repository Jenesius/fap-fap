import {Namespace} from "socket.io";
import signallingService from "../../../services/signalling-service";

export default ((io: Namespace) => {

	io.on("connection", async (socket) => {
		console.log(socket.request.session);

		if (!socket.request.session?.userId) return socket.disconnect();

		// @ts-ignore


		const userId = socket.request.session.userId;

		try {
			await signallingService.addUser(userId, socket.id);
		} catch (e ){
			console.log(e)
		}

		socket.on("disconnect", async () => {
			try {
				console.log('Disconnect user', userId);
				await signallingService.removeUser(userId, socket.id);
			} catch (e) {}
		})

	})

})