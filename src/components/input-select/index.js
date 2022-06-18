import "./index.css"
import {useEffect, useState} from "react";
export default function InputSelect({options, value, setValue}) {
	
	const [languageTitle, setLanguageTitle] = useState('');
	
	const [active, setActive] = useState(false);
	
	useEffect(() => {
		const title = Object.entries(options).find(([v]) => v === value)?.[1];
		setLanguageTitle(title)
	}, [options, value]);
	
	return (
		<div className= "input-select-wrap">
			<div className = "input-container-select">
				<div className = "input-select" onClick={() => setActive(!active)}>
					<p className= "input-select-title text-color_default">{languageTitle}</p>
					<div>
						<i
							className = {'arrow text-color_default ' + (active? 'arrow_up': 'arrow_down')}
						/>
					</div>
				</div>
				{
					active && (
						<div className = "input-select-list">
							{
								Object.entries(options).map(([value, title]) =>
									(
										<p
											className = "text-color_default"
											key = {value}
											onClick = {() => setValue(value)}
										>{title}</p>
									)
								)
							}
						</div>
					)
				}
			
			</div>
		</div>
	)
	
}
