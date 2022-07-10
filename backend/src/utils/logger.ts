import {format, transports, loggers} from "winston";
import path from "path";



loggers.add('signal', {
	format: format.combine(
		format.timestamp(),
		format.prettyPrint()
	),
	transports: [
		new transports.File({filename: getFileName('signal')})
	]
})

loggers.add('game', {
	format: format.combine(
		format.timestamp(),
		format.prettyPrint()
	),
	transports: [
		new transports.File({filename: getFileName('game')})
	]
})

loggers.add('app', {
	format: format.combine(
		format.timestamp(),
		format.prettyPrint()
	),
	transports: [
		new transports.File({filename: getFileName('app')})
	]
})



/**
 * @description method for generate full fileName to Log`s file.
 * */
function getFileName(name: string) {
	const uri = path.join(__dirname, '..', '..', 'Logs', `${name}.log`);
	return uri;
}