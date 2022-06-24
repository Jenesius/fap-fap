import TelegramLoginButton from "react-telegram-login";

export default function TelegramButton() {
	
	function handleRequest() {}
	
	return (
		<TelegramLoginButton  dataOnauth = {handleRequest} botName={process.env.TELEGRAM_BOT_NAME} />
	)
}
