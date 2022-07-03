import GameUser from "../models/game-user-model";
import GameMatch from "../models/game-match";
import GamePreviousMatch from "../models/game-previous-match";

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
	 * @description Find the active match, delete it and crate new document on collection game-previous-match.
	 * */
	static async closeMatch(userId: string) {

		const match = await GameMatch.findOneAndDelete({
			$or: [
				{ userX: userId },
				{ userY: userId }
			]
		});

		if (!match) return false;

		const gamePreviousMatch = new GamePreviousMatch({
			userX: match.userX,
			userY: match.userY,
		})
		return gamePreviousMatch.save();
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
				$lookup: {
					from: 'game-previous-matches',
					let : {
						currentUserId: "$userId"
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$or: [
										{ $eq: ["$userX", "$$currentUserId"]},
										{ $eq: ["$userY", "$$currentUserId"]}
									]
								},
							}
						},
						{
							$project: {
								"userX": 1,
								"userY": 1,
								"createdAt": 1,
								diff: {
									$subtract: ["$$NOW","$createdAt"]
								}
							}
						},
						{
							$match: {
								diff: {
									$lt: 1000 * 60 * ( Number(process.env.TIMEOUT_MINUTES_MATCH) || 1)
								}
							}
						}
					],
					as: 'previousMatches'
				}
			},
			{
				$match: {
					$expr: {
						$and: [
							{ $eq: [ { $size: "$result" }, 0 ] },
							{ $eq: [ { $size: "$previousMatches" }, 0 ] }
						]
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
				}
			}
		]).exec().then(arr => arr[0])
	}
}
