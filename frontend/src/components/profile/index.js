import Page from "../page";
import InputSelect from "../input-select";
import FormSection from "../form-section";
import {useState} from "react";
import InputLanguage from "../input-language";
import WidgetTelegramConnect from "../widget-telegram-connect";
import DataService from "../../assets/js/data-service";
import {orientationValues, sexValues} from "../../assets/js/application-config";

export default function Profile() {
	
	const [state, setState] = useState({})
	function handleChanges(name, value) {
		setState({...state,
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
			<FormSection label = "Sex">
				<InputSelect value = {state['sex']} options={sexValues}
							 setValue={wrapHandleChanges('sex')}
				/>
			</FormSection>
			
			<FormSection label = "Orientation">
				<InputSelect value={state['orientation']} options={orientationValues}
					setValue={wrapHandleChanges('orientation')}
				/>
			</FormSection>
			
			<FormSection label = "Location">
				<p className="text-color_light">г. Могилёв</p>
			</FormSection>
			
			<FormSection label = "Telegram">
				<WidgetTelegramConnect telegramId={111111} telegramName= {"Jenesius"}/>
			</FormSection>
			
			<FormSection label = "Language">
				<InputLanguage value={state['language']} setValue={wrapHandleChanges('language')}/>
			</FormSection>
		</Page>
	)
}
