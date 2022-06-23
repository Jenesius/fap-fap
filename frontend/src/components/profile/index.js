import Page from "../page";
import InputSelect from "../input-select";
import FormSection from "../form-section";
import {useState} from "react";

export default function Profile() {
	
	const [sex, setSex] = useState();
	const arraySex = {
		man: "Мужчина",
		woman: "Женщина"
	}
	
	const [orientation, setOrientation] = useState();
	const arrayOrientation = {
		1: 'Гетеро'
	}
	
	return (
		<Page link = "/auth">
			<FormSection label = "Пол">
				<InputSelect value = {sex} options={arraySex} setValue={setSex}/>
			</FormSection>
			
			<FormSection label = "Ориентация">
				<InputSelect value={orientation} options={arrayOrientation} setValue={setOrientation}/>
			</FormSection>
			
			<FormSection label = "Местоположение">
				<p>г. Могилёв</p>
			
			</FormSection>
			
			<FormSection label = "Telegram">
			
			</FormSection>
			
			<FormSection label = "Язык">
			
			</FormSection>
		</Page>
	)
}
