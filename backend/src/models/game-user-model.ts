import {Document, model, Schema} from "mongoose";

interface GameUserModel{
	userId: string,
}

const gameUserScheme = new Schema<GameUserModel>({
	userId: {type: String, require: true},
})

const GameUser = model<GameUserModel>('game-user', gameUserScheme);
export default GameUser
