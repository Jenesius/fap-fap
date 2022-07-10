import mongoose from "mongoose";
import winston from "winston";

const logger = 	winston.loggers.get('app')

main()
.catch(err => {
	logger.error(err);
});

async function main() {


	const url = (process.env.MONGO_URL ?
		process.env.MONGO_URL :
		'mongodb://localhost:27017') + '/fapfap';
	logger.info(`MongoDB connecting ${url}`);


	await mongoose.connect(url)

	logger.info(`MongoDB was connected by ${url}`);

	return url
}
