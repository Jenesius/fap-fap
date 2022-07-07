import {model, Schema} from "mongoose";

interface ISignalConnection {
	userId: string,
	socketId: string
}

const schema = new Schema<ISignalConnection>({
	userId: {type: String, required: true},
	socketId: {type: String, required: true, unique: true},
})

const SignalConnection = model<ISignalConnection>('signal-connection', schema);
export default SignalConnection