import React from "react"
import './hamburger.css'

export default function Hamburger ({onClick}) {
	return (
		<button type="button" id="hamburger" className="is-open"
		        onClick={onClick}>
			<span className="hamb-top line">{''}</span>
			<span className="hamb-middle line">{''}</span>
			<span className="hamb-bottom line">{''}</span>
		</button>
	)
}

