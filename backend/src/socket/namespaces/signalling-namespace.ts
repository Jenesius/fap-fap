import {Namespace} from "socket.io";
import signallingService from "../../services/signalling-service";
import winston from "winston";


export default ((io: Namespace) => {
	const logger = winston.loggers.get('signal');

	io.on("connection", async (socket) => {

		const userId = socket.request.session.userId;
		logger.info(`User(${userId}) connected.`)

		try {
			await signallingService.addUser(userId, socket.id);
		} catch (e ){
			logger.error(e);
			return socket.disconnect();
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
				logger.info(`User(${userId}) disconnected.`)
				await signallingService.removeUser(userId, socket.id);
			} catch (e) {
				logger.error(e);
			}
		})

	})

})