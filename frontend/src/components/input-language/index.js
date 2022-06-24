import InputSelect from "../input-select";
import {languageValues} from "../../assets/js/application-config";

export default function InputLanguage(props) {
	return (
		<InputSelect
			options = {languageValues}
			{...props}
		/>
	)
}
