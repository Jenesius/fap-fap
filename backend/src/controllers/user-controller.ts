import {NextFunction, Request, Response} from "express";
import tokenService from "../services/token-service";
import AccessError from "../errors/access-error";
import userService from "../services/user-service";

export default class UserController {
	
	static async getCurrentUserData() {
	
	}
	
	static async getUserData(req: Request, res: Response, next: NextFunction) {
		try {
			const {code} = req.query;
			const {userId} = req.params;
			
			if (code) {
				const payload = tokenService.verifyTokenData(String(code));
				
				if (!payload?.userId) throw AccessError.TokenPayloadNotInformative(code)
				
				if (payload.userId !== userId) throw AccessError.InvalidToken(code);
				const data = await userService.getUserData(userId);
				return res.json(data);
			}
			
			if (req.userId === userId)
				return res.json(await userService.getUserData(userId))
			
			return res.json(await userService.getShortUserData(userId))
			
		} catch (e) {
			next(e);
		}
	}
	
}
