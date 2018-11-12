import React from 'react'
import './loader.css'

function Loader() {
	return (<div id="wrapper">
		<div id="loader">
			<div id="box">{''}</div>
			<div id="hill">{''}</div>
		</div>
	</div>)
}

export default (...isLoadings) => (isLoadings.some((isLoading) => isLoading) || !isLoadings.length) && <Loader/>