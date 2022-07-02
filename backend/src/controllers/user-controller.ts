import {NextFunction, Request, Response} from "express";
import tokenService from "../services/token-service";
import AccessError from "../errors/access-error";
import userService from "../services/user-service";

export default class UserController {
	
	/**
	 * @return userData If current user get data about himself or provide valid
	 * code(AccessDataToken) will be returned FullUserData, otherwise ShortUserData
	 * */
	static async getUserData(req: Request, res: Response, next: NextFunction) {
		try {
			const {code} = req.query;
			const {userId} = req.params;
			
			// If current user get information about himself
			if (req.session.userId === userId)
				return res.json(await userService.getUserData(userId))
			
			// Checking payload.userId if code provided
			if (code) {
				const payload = tokenService.verifyTokenData(String(code));
				
				if (typeof payload !== 'object' || !Object.hasOwn(payload, 'userId'))
					throw AccessError.TokenPayloadNotInformative(code)
				
				if (payload.userId !== userId) throw AccessError.InvalidToken(code);
				return res.json(await userService.getUserData(userId));
			}

			return res.json(await userService.getShortUserData(userId))
			
		} catch (e) {
			next(e);
		}
	}
	
}
