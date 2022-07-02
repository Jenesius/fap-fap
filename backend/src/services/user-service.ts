import User from "../models/user-model";
import tokenService from "./token-service";

export default class userService{
	static findUserByTelegramId(telegramId: number) {
		return User.findOne({
			telegramId
		}).exec()
	}
	
	static async createUser(userData: ICreateUserData) {
		const user = new User(userData);
		await user.save()
		return user;
	}
	
	static async updateTokens(userId: string) {
		const tokens = tokenService.generate({
			userId: userId
		})
		
		const user = await User.findOneAndUpdate({_id: userId}, {
			refreshToken: tokens.refreshToken
		}, {
			new: true,
			upsert: true
		})
		
		return tokens;
		
	}
	static async getShortUserData(userId: string) {
		return User.findOne({
			id: userId
		}, {
			id: 1,
		})
	}
	
	static async getUserData(userId: string) {
		return User.findOne({
			id: userId
		}, {
			id: 1,
			name: 1
		})
	}
	
}


interface ICreateUserData {
	telegramId?: number
}
