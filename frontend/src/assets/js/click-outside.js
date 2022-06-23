export default function clickOutside(el, callback) {
	
	function handleClickOutside(e) {
		// Clicked outside
		if (!el.contains(e.target)) {
			callback();
			document.removeEventListener('click', handleClickOutside);
		}
	}
	
	document.addEventListener('click', handleClickOutside)
	// Return off hook
	return () => {
		document.removeEventListener('click', handleClickOutside)
	}
}
