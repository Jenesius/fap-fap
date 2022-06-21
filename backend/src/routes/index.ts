import {Express} from "express";
import AuthRoute from "./auth-route";
import cors from "cors";
import bodyParser from "body-parser";
import  cookieParser from 'cookie-parser';
import authMiddleware from "./../middleware/auth-middleware";
import setCookies from "../utils/set-cookies";


export default function useRoute(server: Express) {
	server.use(cors({
		credentials: true,
		origin: 'http://jenesius.com',
	}))
	server.use(bodyParser.json())
	server.use(cookieParser());
	
	server.get('/test', ((req, res) => {
		res.send("Test")
	}))
	
	
	server.use('/auth', AuthRoute)
	
	server.post('/close-auth', (req, res) => {
		setCookies(res, {accessToken: '1', refreshToken: '2'});
		res.json({
			good: 'yes'
		})
	})
	server.use(authMiddleware)
	server.get('/close-route', (req, res) => {
		res.json({
			good: 'yes'
		})
	})
}
