import {useState} from "react";
import manager from "../../assets/js/socket-manager";
import RTCConnection from "../../assets/js/webrtc/rtc-connection";
import AudioSystem from "../../assets/js/webrtc/audio-system";
import "./index.css";

const GAME_STATUSES = {
	0: 'not connected',
	1: 'connected',
	2: 'connecting',
}


export default function GamePage() {
	const [gameConnection, setGameConnection] = useState(null)
	const [gameConnectionStatus, setGameConnectionStatus] = useState(0);


	const [partnerId, setPartnerId] = useState(null);
	const [partnerConnection, setPartnerConnection] = useState(null);
	const [partnerStatus, setPartnerStatus] = useState('');



	/**
	 * @description Function update session data.
	 * */
	function updateSession() {
		return fetch('/test-api/set-session', {
			method: 'post'
		})
		.then(r => r.json())
		.then(() => window.location.reload())
	}

	/**
	 * @description Searching new partner. Close previous connection. Emit partner:new
	 * */
	function searchNewPartner() {
		cleanPartner();
		gameConnection.emit('partner:new');
	}
	function cleanPartner() {
		if (partnerConnection) partnerConnection.close();

		setPartnerConnection(null);
		setPartnerId(null);
	}

	function logPartnerConnection() {
		console.log(partnerConnection)
	}

	function initializeGame() {
		const gameSocket = manager.socket('/game');
		console.log(`
			connected ${gameSocket.connected},
			active ${gameSocket.active},
			disconnected ${gameSocket.disconnected}
		`)
		if (!gameSocket.active) gameSocket.connect()

		setGameConnection(gameSocket);
		setGameConnectionStatus(2);

		gameSocket.on('connect', () => {
			setTimeout(setGameConnectionStatus.bind(null,1), 100);
		})
		gameSocket.on('disconnect',() => {
			setGameConnectionStatus(0);
		})

		gameSocket.on('connect-to', async ({clientId, polite}) => {
			console.log(`Please connect to %c${clientId}`);

			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			setPartnerId(clientId)

			const connection = new RTCConnection({clientId, tracks: stream.getAudioTracks(), polite});
			setPartnerConnection(connection);
			setPartnerStatus(connection.state);
			connection.on(RTCConnection.EVENT_STATE_CHANGED, () => {
				setPartnerStatus(connection.state);
			});
			connection.on(RTCConnection.EVENT_TRACKS_UPDATE, () => {
				connection.tracks.forEach(track => AudioSystem.addStream(new MediaStream([track])))
			})
		})



	}

	function endGame() {
		gameConnection.disconnect();
		setGameConnection(null);
		setGameConnectionStatus(0);

		cleanPartner();

	}

	return (
		<div>
			Game page
			<div>
				<div className = "connection-status">
					{
						gameConnection
							?
							(<button onClick={endGame}>Выйти</button>)
							:
							(<button onClick={initializeGame}>Начать</button>)
					}

				</div>
				<button onClick={updateSession}>Reload session</button>
				<button onClick={logPartnerConnection}>Log connection</button>
			</div>

			{
				gameConnectionStatus === 1 &&
				<div >
					<button onClick={searchNewPartner}>Next</button>
				</div>
			}

			<div className = "container-game-information">
				<p className= "information-title">Information:</p>
				<div className = "information-list">
					<p>
						Game status: <b>{GAME_STATUSES[gameConnectionStatus]}</b>
					</p>
					{
						!!partnerId &&
						(
							<div>
								<p>
									Current partner: <b>{partnerId}</b>
								</p>
								<p>
									Partner status: <b>{partnerStatus}</b>
								</p>
							</div>
						)
					}
				</div>
			</div>
			
		</div>
	)
}
