import React from 'react'

export default function Menu({children, ...rest}) {
	return (<div {...rest}>
		{children}
	</div>)
}
