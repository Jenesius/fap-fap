import {Schema, Document, model} from "mongoose";

interface GamePreviousMatch extends Document{
	userX: string,
	userY: string,
	createdAt: any
}

const schema = new Schema<GamePreviousMatch>({
	userX: {type: String, required: true},
	userY: {type: String, required: true},
	createdAt : { type : Date, default: Date.now }
})

const GamePreviousMatch = model<GamePreviousMatch>('game-previous-match', schema);
export default GamePreviousMatch;
