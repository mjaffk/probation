import React from 'react'
import Menu from "../../menu"
import MenuItem from "../../menu/menu-item"
import './main-nav-menu.css'

const activeClassName = "active_link"
const linkClassName = "link"

export default function MainNavMenu({userId, role}) {
	return (<Menu className="main_nav">
		<span className="sidebar-brand">Билет в будущее</span>
		<ul>
			<li>{userId}</li>
			<li>{role}</li>
		</ul>
		<MenuItem className={linkClassName}
		          to="/profile/messages"
		          activeClassName={activeClassName}>
			Сообщения
		</MenuItem>
		<MenuItem className={linkClassName}
		          to="/profile/contests"
		          activeClassName={activeClassName}>
			Конкурсы
		</MenuItem>
		<MenuItem className={linkClassName}
		          to="/profile/recommendation"
		          activeClassName={activeClassName}>
			Рекомендации
		</MenuItem>
		<MenuItem className={linkClassName}
		          to="/profile/tickets"
		          activeClassName={activeClassName}>
			Билеты
		</MenuItem>
		<MenuItem className={linkClassName}
		          to="/profile/personal-data"
		          activeClassName={activeClassName}>
			Личные данные
		</MenuItem>
		<MenuItem className={linkClassName} aria-current="page"
		          to="/auth/signout"
		          activeClassName={activeClassName}>
			Выход
		</MenuItem>
	</Menu>)

}

