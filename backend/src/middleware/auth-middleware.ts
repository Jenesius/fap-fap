import {NextFunction, Request, Response} from "express";
import AuthError from "../errors/auth-error";

export default function (req: Request, res: Response, next: NextFunction) {
	if (req.session['userId']) return next();
	
	next(AuthError.unauthorizedAccessApi());
}
