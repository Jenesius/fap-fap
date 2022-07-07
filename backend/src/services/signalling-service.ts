import SignalConnection from "../models/signal-connection";

export default class signallingService {

	static addUser(userId: string, socketId: string) {
		const signalConnection = new SignalConnection({
			userId,
			socketId
		})

		return signalConnection.save();

	}

	static removeUser(userId: string, socketId: string) {
		console.log(userId, socketId);
		return SignalConnection.findOneAndRemove({
			userId,
			socketId
		})

	}

}