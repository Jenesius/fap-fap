import "./index.css"
import {useEffect, useState, useRef} from "react";
import clickOutside from "../../assets/js/click-outside";
export default function InputSelect({options, value, setValue}) {
	
	const wrapperRef = useRef(null);
	
	const [languageTitle, setLanguageTitle] = useState('');
	
	const [active, setActive] = useState(false);
	
	useEffect(() => {
		const title = Object.entries(options).find(([v]) => v === value)?.[1];
		setLanguageTitle(title)
	}, [options, value]);
	
	function selectAndClose(v) {
		setValue(v);
		setActive(false);
	}
	

	
	useEffect(() => {
		
		// console.log( wrapperRef.current.getBoundingClientRect());
		
		let offOutsideClick = null;
		if (active) offOutsideClick = clickOutside(wrapperRef.current, setActive.bind(null, false));
		else offOutsideClick?.();
		
		return () => {
			offOutsideClick?.();
		}
		
	}, [active]);
	
	
	return (
		<div
			ref={wrapperRef}
			className = {'input-select-wrap ' + ( active? 'input-select_active': '')}
		>
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
									<p
										className = "text-color_default"
										key = {value}
										onClick = {() => selectAndClose(value)}
									>{title}</p>
								)
							}
						</div>
					)
				}
			
			</div>
		</div>
	)
	
}
