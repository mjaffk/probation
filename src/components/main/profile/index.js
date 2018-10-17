import React, {Component} from 'react'
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import PersonalData from "./personal-data/index"
import MainNavMenu from "./main-nav-menu"
import Sidebar from "react-sidebar"
import './profile.css'
import ProfileBreadCrumb from "./breadcrumb"
import Hamburger from "./hamburger"
import logo from "./logo.jpg"

class Profile extends Component {
	state = {
		sidebarOpen: true,
	}

	onSetSidebarOpen() {
		this.setState({sidebarOpen: !this.state.sidebarOpen})
	}

	render() {
		return (
			<Sidebar
				sidebarId="nab_menu_wrapper"
				contentClassName="d-flex flex-column justify-content-between"
				sidebar={<MainNavMenu role={'Участник'} userId={'K0SWYXYGC1'}/>}
				docked={this.state.sidebarOpen}
				styles={{sidebar: {background: "white"}}}
			>
				<Hamburger onClick={(event) => {
					event.currentTarget.classList.toggle("is-closed")
					event.currentTarget.classList.toggle("is-open")
					this.onSetSidebarOpen()
				}}/>

				<div className="flex-grow-1" id="content_wrapper">
					<header>
						<div id='header_top'>
							<div id="logo">
								<Link to="/">
									<img className="img-thumbnail logo"
									     src={logo}
									     alt="WorldSkills Russia"
									     border="0"/>
								</Link>
							</div>

							<div id="title">
								<div className=" title text-justify h3">Билет в будущее</div>
							</div>
						</div>

						<ProfileBreadCrumb location='Личные данные'/>
					</header>
					<Switch>
						<Redirect from={'/profile'} to={'/profile/personal-data'} exact/>
						{/*<Route path="/profile/messages" component={}/>*/}
						{/*<Route path="/profile/contests" component={}/>*/}
						{/*<Route path="/profile/recommendation" component={}/>*/}
						{/*<Route path="/profile/tickets" component={}/>*/}
						<Route path="/profile/personal-data" component={PersonalData}/>
					</Switch>
				</div>
				<footer id="footer" className="bg-light footer d-flex flex-grow-0">
				</footer>
			</Sidebar>
		)
	}
}

export default Profile
