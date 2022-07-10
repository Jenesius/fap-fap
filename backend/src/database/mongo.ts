import mongoose from "mongoose";

import winston from "winston";


main()
.then((url: string) => {
	const logger = 	winston.loggers.get('app')

	logger.info(`MongoDB was connected by ${url}`);
})
.catch(err => console.log(err));

async function main() {
	const url = process.env.MONGO_URL ?
		process.env.MONGO_URL :
		'mongodb://localhost:27017';

	await mongoose.connect(url + '/fapfap')

	return url
}
