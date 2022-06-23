import "./index.css"
import {Link} from "react-router-dom";
export default function Page({link, children}) {
	return (
		<div>
			<div className = "page-header">
				
				<div className = "page-header-link text_md">
					<Link to = {link} className = "page-header__link-label">Back</Link>
				</div>
				

				
			</div>
			<div className = "page-body">
				{children}
			</div>
		</div>
	)
}
