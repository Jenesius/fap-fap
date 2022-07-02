import User from "../models/user-model";
import tokenService from "./token-service";
import {isValidObjectId} from "mongoose";
import DataError from "../errors/data-error";

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
		
		if (!isValidObjectId(userId)) throw DataError.wrongId();
		
		const data = await User.findOne({
			_id: userId
		}, {
			id: 1,
		})
		
		if (!data) throw DataError.objectNotFoundWithId(userId);
		
		return data;
	}
	
	static async getUserData(userId: string) {
		if (!isValidObjectId(userId)) throw DataError.wrongId();
		
		return User.findById(userId, {
			id: 1,
			name: 1,
			telegramId: 1
		})
	}
	
}


interface ICreateUserData {
	telegramId?: number
}
