import React from 'react'
import {NavLink} from 'react-router-dom'

function MenuItem({children, ...rest}) {
	return (<div>
		<NavLink {...rest} activeStyle={{display: 'none'}}>
			{children}
		</NavLink>
	</div>)
}

export default MenuItem