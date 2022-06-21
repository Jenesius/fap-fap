import {Response, Request, NextFunction} from "express";
import authService from "../services/auth-service";
import setCookies from "../utils/set-cookies";

export default class AuthController {
	
	static async telegramAuth(req: Request, res: Response, next: NextFunction) {
		try {
			// add body parser
			const result = await authService.telegramAuth(req.body);
			setCookies(res, result.tokens);
			res.json(result)
		} catch (e) {
			next(e);
		}
	}
	
}
