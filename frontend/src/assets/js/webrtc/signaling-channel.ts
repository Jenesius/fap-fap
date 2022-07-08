import EventEmitter, {Callback} from "jenesius-event-emitter";
import manger from "./../socket-manager";
import {Socket} from "socket.io-client";

/**
 * Singleton class. Используется для взаимодействия между подключениями.
 * */

class _SignalingChannel extends EventEmitter{

	static EVENT_MESSAGE = 'message';
	static GET_EVENT_NAME(clientId: string) {
		return _SignalingChannel.EVENT_MESSAGE + ':' + clientId;
	}

	socket: Socket


	constructor() {
		super();



		this.socket = manger.socket('/signalling');

		this.socket.on('connect', () => {
			this.msg(`Connected with ${this.socket.id}`);

		})
		this.socket.on('message', (data: IMessage) => {

			if (!data.sender) return console.log('sender not included.');
			const strConnect = data.sender;

			this.emit('message', data);
		})
	}

	onmessage(strConnect: string, callback: Callback) {

		return this.on('message', callback);
	}

	send(params: IMessage) {
		this.socket.emit('message', params);
	}

	msg(msg: string) {
		console.log(`[%csignaling-channel%c] ${msg}`, 'color: green', 'color:black');
	}

}
interface IMessage {
	description?: RTCSessionDescription | null,
	recipient: string, // Получатель, кому отправили,
	sender?: string,
	candidate?: RTCIceCandidate | null
}

const SignalingChannel = new _SignalingChannel();
export default SignalingChannel