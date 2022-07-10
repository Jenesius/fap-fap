import  "./utils/logger";

import express from "express";
import 'dotenv/config'
import useRoute from "./routes";
import './database/mongo';
import http from 'http';
import useSocket from "./socket/use-socket";


const app = express();
const server = http.createServer(app);

useRoute(app)
useSocket(server);

server.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT} port.`);
})
