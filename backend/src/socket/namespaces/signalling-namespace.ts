import {Namespace} from "socket.io";
import signallingService from "../../services/signalling-service";

export default ((io: Namespace) => {

	io.on("connection", async (socket) => {

		if (!socket.request.session?.userId) return socket.disconnect();

		// @ts-ignore


		const userId = socket.request.session.userId;
		console.log('[signal] Connect user', userId);
		try {
			await signallingService.addUser(userId, socket.id);
		} catch (e ){
			console.log(e)
		}

		// recipient - userId
		socket.on('message', async (payload: {recipient: string}) => {


			// Запомнили, кому отправляет сообщение
			const clientId = payload.recipient;
			const recipient = await signallingService.findByUserId(clientId);

			if (!recipient) return new Error(`Undefined client ${clientId}`);

			io.sockets.get(recipient.socketId)?.emit('message', {
				...payload,
				sender: userId // указываем, от кого пришло сообщение
			})

		})

		socket.on("disconnect", async () => {
			try {
				console.log('[signal] Disconnect user', userId);
				await signallingService.removeUser(userId, socket.id);
			} catch (e) {}
		})

	})

})