import Page from "../page";
import InputSelect from "../input-select";
import FormSection from "../form-section";
import {useState} from "react";
import InputLanguage from "../input-language";
import WidgetTelegramConnect from "../widget-telegram-connect";
import DataService from "../../assets/js/data-service";

export default function Profile() {
	
	const arraySex = {
		man: "Мужчина",
		woman: "Женщина"
	}
	const arrayOrientation = {
		1: 'Гетеро'
	}
	
	
	const [state, setState] = useState({})
	function handleChanges(name, value) {
		setState({
			...state,
			[name]: value
		})
		DataService.updateData('profile', {
			[name]: value
		})
	}
	function wrapHandleChanges(name) {
		return (v) => handleChanges(name, v);
	}
	
	return (
		<Page link = "/auth">
			<FormSection label = "Пол">
				<InputSelect value = {state['sex']} options={arraySex}
							 setValue={wrapHandleChanges('sex')}
				/>
			</FormSection>
			
			<FormSection label = "Ориентация">
				<InputSelect value={state['orientation']} options={arrayOrientation}
					setValue={wrapHandleChanges('orientation')}
				/>
			</FormSection>
			
			<FormSection label = "Местоположение">
				<p className="text-color_light">г. Могилёв</p>
			</FormSection>
			
			<FormSection label = "Telegram">
				<WidgetTelegramConnect telegramId={111111} telegramName= {"Jenesius"}/>
			</FormSection>
			
			<FormSection label = "Язык">
				<InputLanguage value={state['language']} setValue={wrapHandleChanges('language')}/>
			</FormSection>
			<p className= "text-color_light">{JSON.stringify(state)}</p>
		</Page>
	)
}
