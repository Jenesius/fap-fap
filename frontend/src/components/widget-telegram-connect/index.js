import TelegramButton from "../telegram-button";
import "./index.css"

export default function WidgetTelegramConnect({telegramId, telegramName}) {
	
	return (
		<div className= "telegram-connect">
			<div>
				<p className = "telegram-user-name text_md text-color_default">@{telegramName}</p>
				<p className = "telegram-user-id text-color_light text_sm">{telegramId}</p>
			</div>
			<div>
				<span className= "text-color_light">or</span>
			</div>
			<div>
				<TelegramButton/>
			</div>
		</div>
	)
}
