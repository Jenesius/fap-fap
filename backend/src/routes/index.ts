import express, {Express} from "express";
import AuthRoute from "./auth-route";
import cors from "cors";
import bodyParser from "body-parser";
import  cookieParser from 'cookie-parser';
import authMiddleware from "./../middleware/auth-middleware";
import sessionMiddleware from "./../middleware/session-middleware";
import ApiRoute from "./api-route";
import TestRoute from "./test-route";
import path from "path";

export default function useRoute(server: Express) {
	server.use(cors({
		credentials: true,
		origin: ['http://localhost', 'http://localhost:3001', 'https://jenesius.com', 'http://62.109.17.203:3001'],
	}))
	server.use(bodyParser.json())
	server.use(cookieParser());
	server.use(sessionMiddleware);

	server.use(express.static(
		path.join(
			__dirname, '..', '..', 'frontend'
		)
	))

	server.get('/close-auth', (req, res) => {
		req.session.userId = "62b22cd668c09cdf2d01df38";
		
		res.json(req.session)
	})
	
	
	server.use('/auth', AuthRoute)

	server.use('/test-api', TestRoute);
	server.use('/api', authMiddleware, ApiRoute);



	server.get('/close-route', (req, res) => {
		res.json({
			good: 'yes'
		})
	})
	server.get("*", (req, res) => {
		res.sendFile(
			path.join(
				__dirname, '..', '..', 'frontend', 'index.html'
			)
		)
	})

}
