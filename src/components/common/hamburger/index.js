import React from "react"
import './hamburger.css'
import PropTypes from "prop-types"

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

Hamburger.propTypes = {
	onClick: PropTypes.func
}