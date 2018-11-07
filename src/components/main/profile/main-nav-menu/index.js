import React from 'react'
import Menu from "../../../common/menu"
import './main-nav-menu.css'
import MainNavMenuItem from "./main-nav-menu-item"

export default function MainNavMenu({userId, role}) {
	return (<Menu className="main_nav">
		<span className="sidebar-brand">Билет в будущее</span>
		<ul>
			<li>{userId}</li>
			<li>{role}</li>
		</ul>
		<MainNavMenuItem to={"/profile/messages"} title={'Сообщения'}/>
		<MainNavMenuItem to={"/profile/contests"} title={'Конкурсы'}/>
		<MainNavMenuItem to={"/profile/recommendation"} title={'Рекомендации'}/>
		<MainNavMenuItem to={"/profile/tickets"} title={'Билеты'}/>
		<MainNavMenuItem to={"/profile/personal-data"} title={'Личные данные'}/>
		<MainNavMenuItem to={"/profile/new-personal-data"} title={'Новые личные данные'}/>
		<MainNavMenuItem to={"/auth/signout"} title={'Выход'}/>

	</Menu>)

}

