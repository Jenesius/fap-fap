import GameUser from "../models/game-user-model";

export default class gameService {
	
	static async addUser(userId: string) {
		const gameUser = new GameUser({
			userId,
			partnerId: null
		})
		await gameUser.save();
	}
	static async removeUser(userId: string) {
		const a = await GameUser.findOneAndDelete({
			userId
		})
	}
	
	static findFree(userId: string) {
		return GameUser.aggregate([
			{
				$match: {
					// @ts-ignore
					partnerId: { $eq: null },
					userId: {
						$ne: userId
					}
				},
			},
			{
				$project: {
					_id: 0,
					id: "$_id",
					userId: 1
				}
			},
			{
				$limit: 1
			}
		]);
	}
}
