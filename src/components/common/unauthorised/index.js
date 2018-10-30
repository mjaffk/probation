import React from 'react'
import {Link} from "react-router-dom"
import logo from "../../../pictures/logo.jpg"
import './unauthorized.css'

export default function UnAuthorized() {
	return (<div id="unauthorized">
		<div>
			<img src={logo} alt="WorldSkills Russia"/>
		</div>
		<p>
			В данный моммент Вы не авторизованы на нашем сайте, пожалуйста, <Link to='/auth/signin'>войдите в свой
			аккаунт</Link>
		</p>
	</div>)
}
