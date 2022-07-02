import express from "express";
import UserRoute from "./user-route";

const ApiRoute = express.Router();

ApiRoute.use('/users', UserRoute);

export default ApiRoute;
