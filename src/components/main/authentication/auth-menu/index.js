import React from 'react'
import Menu from '../../menu'
import MenuItem from '../../menu/menu-item'

export default function AuthMenu({message}) {
	return (<Menu>
		{!message ? null : message}
		<MenuItem to="/auth/signin">Войти в аккаунт</MenuItem>
		<MenuItem to="/auth/cntstnt/signup">Регистрация</MenuItem>
		<MenuItem to="/auth/forgot">Забыли пароль?</MenuItem>
	</Menu>)
}

