import "express-session";
import "socket.io";
import {Session, SessionData} from "express-session";
import "http";

declare module 'express-session' {
	interface SessionData {
		userId: string,
		accessToken: string,
		refreshToken: string,
	}
}

declare module "http" {
	interface IncomingMessage {
		session: Session & SessionData
	}
}