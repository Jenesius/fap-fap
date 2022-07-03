import {Namespace} from "socket.io";
import gameService from "../../../services/game-service";

/**
 * GAME LOGIC
 * */
export default ((io: Namespace) => {
	io.on('connection', (socket) => {
	
		const userId = socket.id;
		
		gameService.addUser(userId);
		
		/**
		 * @description User create event 'new' when want to find a new partner.
		 * */
		socket.on('new', async () => {
			const freeUser = await gameService.findFree(userId)
			
			if (!freeUser) return;

			//gameService.matchUsers(userId, freeUser.userId);

		})
		
		socket.on('disconnect', () => {
			gameService.removeUser(userId);
		})
		
	})
})
