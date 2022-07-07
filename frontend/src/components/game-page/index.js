import {Manager} from "socket.io-client";
import {useState} from "react";
export default function GamePage() {
	const [socket, setSocket] = useState()

	function find() {
		Promise.resolve()
		.then(() => {
			const manager = new Manager("http://localhost:3001", {
				withCredentials: true
			});
			const s = manager.socket('/signalling')
			setSocket(s);
		})
	}

	function session() {
		return fetch('/api/test-api/set-session', {
			method: 'post'
		});
	}

	function test() {
		return fetch('/api/test-api/session')
		.then(r => r.json())
		.then(console.log)
	}
	
	return (
		<div>
			Game page
			<div>
				<p>{socket?.id}</p>
				<button onClick={find}>find</button>
				<button onClick={session}>session</button>
				<button onClick={test}>Show session</button>
			</div>
			
			<div>
			
			</div>
			
			<div>
			
			</div>
			
		</div>
	)
}
