import {Schema, Document, model} from "mongoose";

interface GameMatch extends Document{
	userX: string,
	userY: string,
}

const schema = new Schema<GameMatch>({
	userX: {type: String, required: true},
	userY: {type: String, required: true},
})

const GameMatch = model<GameMatch>('game-previous-match', schema);
export default GameMatch;
