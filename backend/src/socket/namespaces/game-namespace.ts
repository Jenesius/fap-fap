import {Namespace} from "socket.io";
import gameService from "../../services/game-service";

/**
 * GAME LOGIC
 * */
export default ((io: Namespace) => {
	io.on('connection', (socket) => {

		const userId = socket.request.session?.userId;
		const socketId = socket.id;
		console.log('Undefined user, disconect.');
		if (!userId) return socket.disconnect();

		console.log("Connect to game", userId)


		gameService.addUser(userId, socketId);
		
		/**
		 * @description User create event 'new' when want to find a new partner.
		 * */
		socket.on('partner:new', async () => {
			console.log("Request for new.", userId)

			await gameService.closeMatch(userId);

			const freeUser = await gameService.findFree(userId)
			
			if (!freeUser) return console.log('Don`t found free');

			const partnerId = freeUser.userId;

			await gameService.matchUsers(userId, partnerId);
			const partnerSocket = await gameService.getSocketIdByUserId(partnerId);

			io.sockets.get(partnerSocket)?.emit('connect-to', {clientId: userId, polite: false});
			socket.emit('connect-to', {clientId: partnerId, polite: true});
		})

		socket.on('signalling', async () => {});

		/**
		 * 1. Перед удаленеим, отключить партнёров
		 * 2. Удаление всей инфорамции из таблицы
		 */
		socket.on('disconnect', () => {
			console.log('Disconnect ', userId);
			gameService.removeUser(userId);
		})
		
	})
})
