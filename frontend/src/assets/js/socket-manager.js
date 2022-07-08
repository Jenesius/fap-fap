import {Manager} from "socket.io-client";

const manager = new Manager("http://localhost:3001", {
	withCredentials: true
});

export default manager