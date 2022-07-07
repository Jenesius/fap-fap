import {Namespace} from "socket.io";
import gameService from "../../../services/game-service";

/**
 * GAME LOGIC
 * */
export default ((io: Namespace) => {
	io.on('connection', (socket) => {

		const userId = socket.request.session?.userId;
		const socketId = socket.id;
		if (!userId) return socket.disconnect();

		gameService.addUser(userId, socketId);
		
		/**
		 * @description User create event 'new' when want to find a new partner.
		 * */
		socket.on('partner:new', async () => {
			const freeUser = await gameService.findFree(userId)
			
			if (!freeUser) return;

			const partnerId = freeUser.userId;

			await gameService.matchUsers(userId, partnerId);
			const partnerSocket = await gameService.getSocketIdByUserId(partnerId);

			io.sockets.get(partnerSocket)?.emit('connect-to', socketId);
			socket.emit('connect-to', partnerId)
		})

		socket.on('signalling', async () => {});

		/**
		 * 1. Перед удаленеим, отключить партнёров
		 * 2. Удаление всей инфорамции из таблицы
		 */
		socket.on('disconnect', () => {
			gameService.removeUser(userId);
		})
		
	})
})
