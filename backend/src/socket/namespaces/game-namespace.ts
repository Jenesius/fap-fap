import {Namespace} from "socket.io";
import gameService from "../../services/game-service";
import winston from "winston";


/**
 * GAME LOGIC
 * */
export default ((io: Namespace) => {
	const logger = winston.loggers.get('game')
	io.on('connection', async(socket) => {

		const userId = socket.request.session?.userId;
		const socketId = socket.id;

		logger.info(`User${userId} connected to the game.`)

		try {
			await gameService.addUser(userId, socketId);
		} catch (e) {
			logger.error(e);
			socket.disconnect();
		}

		/**
		 * @description User create event 'new' when want to find a new partner.
		 * */
		socket.on('partner:new', async () => {

			logger.info(`[user:${userId}] request for new partner.`);

			await gameService.closeMatch(userId);

			const freeUser = await gameService.findFree(userId)
			
			if (!freeUser) return logger.info(`[user:${userId}] partner not founded.`);

			const partnerId = freeUser.userId;

			await gameService.matchUsers(userId, partnerId);
			const partnerSocket = await gameService.getSocketIdByUserId(partnerId);

			io.sockets.get(partnerSocket)?.emit('connect-to', {clientId: userId, polite: false});
			socket.emit('connect-to', {clientId: partnerId, polite: true});
		})

		/**
		 * 1. Перед удаленеим, отключить партнёров
		 * 2. Удаление всей инфорамции из таблицы
		 */
		socket.on('disconnect', () => {
			logger.info(`[user:${userId}] disconnected.`);
			try {
				gameService.removeUser(userId);
			} catch (e) {
				logger.error(e);
			}
		})
		
	})
})
