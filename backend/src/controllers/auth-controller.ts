import {Response, Request, NextFunction} from "express";
import authService from "../services/auth-service";

export default class AuthController {
	
	static async telegramAuth(req: Request, res: Response, next: NextFunction) {
		try {
			// add body parser
			const result = await authService.telegramAuth(req.body);
			
			req.session.userId = result.userId;
			req.session.accessToken = result.tokens.accessToken;
			req.session.refreshToken = result.tokens.refreshToken;
			
			res.json(result)
		} catch (e) {
			next(e);
		}
	}
	
}
