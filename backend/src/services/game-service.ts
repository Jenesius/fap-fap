import GameUser from "../models/game-user-model";
import GameMatch from "../models/game-match";

export default class gameService {
	
	static async addUser(userId: string) {
		const gameUser = new GameUser({
			userId,
		})
		await gameUser.save();
	}
	static async removeUser(userId: string) {
		const a = await GameUser.findOneAndDelete({
			userId
		})
	}

	static async matchUsers(userX: string, userY: string) {
		const gameUserMatch = new GameMatch({
			userX, userY
		})
		return await gameUserMatch.save();
	}

	/**
	 * @description Return matches for user by id.
	 * */
	static getCurrentMatch(userId: string) {
		return GameMatch.find({
			$or: [
				{ userX: userId },
				{ userY: userId }
			]
		})
	}
	/**
	 * @description Search partner for provided userId.
	 * @param {String} userId User ID for which we are looking for a partner
	 * */
	static findFree(userId: string) {

		return GameUser.aggregate([
			{
				$lookup: {
					from: 'game-matches',
					let: {
						currentUserId: "$userId"
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$or: [
										{ $eq: ["$userX", "$$currentUserId"] },
										{ $eq: ["$userY", "$$currentUserId"] }
									]
								}
							}
						}
					],
					as: 'result'
				}
			},
			{
				$match: {
					$expr: {
						$eq: [ { $size: "$result" }, 0 ]
					},
					userId: {
						$ne: userId
					}
				}
			},
			{
				$limit: 1
			},
			{
				$project: {
					userId: 1,
					_id: 0,
					result: 1

				}
			}
		]).exec().then(arr => arr[0])
	}
}
