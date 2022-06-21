import express from "express";
import 'dotenv/config'
import useRoute from "./routes";
import './database/mongo';

const app = express();
useRoute(app)

app.listen(process.env.PORT, () => {
	console.log(`Server running on ${process.env.PORT} port.`);
})
