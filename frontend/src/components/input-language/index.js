import InputSelect from "../input-select";

export default function InputLanguage(props) {
	const languages = {
		ru: 'Русский',
		en: 'English'
	}
	
	return (
		<InputSelect
			options = {languages}
			{...props}
		/>
	)
}
