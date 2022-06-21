import AuthError from "../errors/auth-error";
import {createHmac, createHash} from "crypto";
import userService from "./user-service";
import tokenService from "./token-service";

export default class authService {

	static async telegramAuth(data: TelegramData) {
		if (!authService.checkSignature(process.env.TELEGRAM_BOT_TOKEN, data))
			throw AuthError.incorrectTelegramData();
		
		let user = await userService.findUserByTelegramId(data.id);
		
		if (!user) {
			// Creation
			user = await userService.createUser({
				telegramId: data.id
			})
		}

		// getting tokens
		
		const tokens =  await userService.updateTokens(user.id);
		
		return {
			tokens
		}
	}

	private static checkSignature(secretToken: any, {hash, ...data}: TelegramData ) {
		if (!secretToken) throw AuthError.telegramKeyNotFounded();
		
		const dataCheckString = Object.keys(data)
		.sort()
		// @ts-ignore
		.map(k => `${k}=${data[k]}`)
		.join('\n');
		
		const secret = createHash('sha256')
		.update(secretToken)
		.digest()
		
		const hmac = createHmac('sha256', secret)
		.update(dataCheckString)
		.digest('hex')
		
		return ( hmac === hash )
	}
	
}

interface TelegramData {
	auth_date: number,
	first_name: string,
	last_name: string,
	hash: string,
	id: number,
	username: string
}
