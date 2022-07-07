import {model, Schema} from "mongoose";

interface GameUserModel{
	userId: string,
	socketId: string
}

const gameUserScheme = new Schema<GameUserModel>({
	userId: {type: String, required: true, unique: true},
	socketId: {type: String, required: true, unique: true}
})

const GameUser = model<GameUserModel>('game-user', gameUserScheme);
export default GameUser
