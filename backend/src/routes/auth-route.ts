import express from "express";
import AuthController from "../controllers/auth-controller";
const AuthRoute = express.Router();

AuthRoute.post('/telegram', AuthController.telegramAuth);

export default AuthRoute;
