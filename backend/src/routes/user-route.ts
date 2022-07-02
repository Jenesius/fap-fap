import express from "express";
import UserController from "../controllers/user-controller";

const UserRoute = express.Router();

UserRoute.get('/:userId', UserController.getUserData);

export default UserRoute;
