import "./index.css"
export default function FormSection({label, children}) {
	
	return (
		<div className= "form-section">
			<p className = "form-section-title text_sm">{label}</p>
			<div className=  "form-section-content">
				{children}
			</div>
		</div>
	)
}
