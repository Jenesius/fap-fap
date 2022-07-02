import {Document, model, Schema} from "mongoose";

interface GameUserModel{
	userId: string,
	partnerId: string | null
}

const gameUserScheme = new Schema<GameUserModel>({
	userId: {type: String, require: true},
	partnerId: {type: String, default: null}
})

const GameUser = model<GameUserModel>('game-user', gameUserScheme);
export default GameUser
