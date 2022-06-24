import "./index.css";
import ManImage from "./../../assets/images/boy-07.svg";
import GirlImage from "./../../assets/images/girl-06.svg";
import InputSelect from "../input-select";
import {useState} from "react";
import LoginPageForm from "../login-page-form";
import authService from "../../assets/js/auth-service";
import InputLanguage from "../input-language";

export default function LoginPage() {
	
	function handleTelegramResponse(a) {
		return authService.telegramAuth(a)
		.then(res => {
			console.log(res);
			// document.location.replace('/');
		})
		.catch(err => {
			console.log(err);
		})
	}

	
	const [language, setLanguage] = useState('ru');
	
	return (
		<div className = "login-page">
			<div className = "login-body">
				
				<div className = "login-body__image">
					<img alt = "man-lines" src = {ManImage} className = "login-illustration"/>
				</div>
				<div className = "login-content">
					<h1 className = "text-color_default login-title">Добро пожаловать в мир <span className = "text-color_primary">влечения</span>.</h1>
					<LoginPageForm handleRequest={handleTelegramResponse.bind(null)}/>
				</div>
				<div className = "login-body__image">
					<img alt = "girl-lines" src = {GirlImage} className = "login-illustration"/>
				</div>
				
			</div>
			<div className = "login-foot">
				<InputLanguage value={language} setValue={setLanguage}/>
				<p className = "text-color_default">Правила</p>
				<p className = "text-color_default">О Нас</p>
			</div>
		</div>
	)
}
