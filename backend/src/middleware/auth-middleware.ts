import {NextFunction, Request, Response} from "express";
import {Error} from "mongoose";

export default function (req: Request, res: Response, next: NextFunction) {
	console.log(req.cookies['accessToken'])
	if (req.cookies['accessToken']) next();
	
	next(new Error('t'));
}
