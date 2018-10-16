import React from 'react'
import {NavLink} from 'react-router-dom'

function MenuItem({children, ...rest}) {
	return (<NavLink {...rest} >
			{children}
		</NavLink>)
}

export default MenuItem