import { io } from "socket.io-client";
import {useState} from "react";
export default function GamePage() {
	
	const [socket, setSocket] = useState()
	
	function find() {
		setSocket(io("http://localhost:3001/game"));
	}
	function neww() {
		socket.emit('new');
	}
	
	return (
		<div>
			Game page
			<div>
				<p>{socket?.id}</p>
				<button onClick={find}>find</button>
				<button onClick={neww}>new</button>
			</div>
			
			<div>
			
			</div>
			
			<div>
			
			</div>
			
		</div>
	)
}
