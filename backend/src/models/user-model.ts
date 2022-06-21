import {Schema, model, Document} from "mongoose";

interface IUser extends Document {
	telegramId?: number,
	username: string,
	refreshToken?: string
}

const userSchema = new Schema<IUser>({
	telegramId: { type: String, unique: true},
	username: {type: String},
	refreshToken: {type: String}
})

const User = model<IUser>('user', userSchema);
export default User;
