import TelegramLoginButton from "react-telegram-login";
import "./index.css";
import {useState} from "react";

export default function LoginPageForm({handleRequest}) {
	const [acceptRules, setAcceptRules] = useState(false);
	
	function handle(e) {
		const v = e.target.value === 'false'
		console.log(v);
		setAcceptRules(v)
	}
	
	return (
		<div className = "login-content__form">
			<label className= "cursor_pointer text-color_light">
				<input
					value={acceptRules}
					onChange={handle}
					type = "checkbox"
					className = "login-form__checkbox"/>
				Я согласен со всеми правилами.
			</label>
			<div className= {`${acceptRules?'' : 'login-content__button_disabled'}`}>
				<TelegramLoginButton dataAuthUrl= "/callback" botName="faptest_bot" />
			</div>
		</div>
	)
}
