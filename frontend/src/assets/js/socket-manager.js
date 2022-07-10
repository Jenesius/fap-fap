import {Manager} from "socket.io-client";

const manager = new Manager(process.env.NODE_ENV === 'development' ? "http://localhost:3001": '/', {
	withCredentials: true
});

export default manager