import React from 'react'
import Menu from '../../menu'
import MenuItem from '../../menu/menu-item'

export default function AuthMenu({message}) {
	return (<Menu className = "card w-100 text-center mt-3 card-body">
		{!message ? null : message}
		<MenuItem to="/auth/signin" activeStyle = {{display: 'none'}}>Войти в аккаунт</MenuItem>
		<MenuItem to="/auth/cntstnt/signup" activeStyle = {{display: 'none'}}>Регистрация</MenuItem>
		<MenuItem to="/auth/forgot" activeStyle = {{display: 'none'}}>Забыли пароль?</MenuItem>
	</Menu>)
}

