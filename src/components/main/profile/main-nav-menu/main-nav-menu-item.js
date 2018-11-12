import MenuItem from "../../../common/menu/menu-item"
import React from 'react'

const activeClassName = "active_link"
const linkClassName = "link"

const MainNavMenuItem = ({to, title, ...rest}) => {
	return (
		<MenuItem className={linkClassName}
		          to={to}
		          activeClassName={activeClassName}
		          {...rest}
		>
			{title}
		</MenuItem>
	)
}

export default MainNavMenuItem