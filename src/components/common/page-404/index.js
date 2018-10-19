import React from 'react'
import logo from '../../../pictures/logo.jpg'
import './page-404.css'

export default function Page404 () {
	return (<div id='page_404'>
		<div><img src={logo} alt="WorldSkills Russia" /></div>
		<p>К сожалению, такая страница не найдена на нашем сайте</p>
	</div>)

}