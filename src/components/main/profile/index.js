import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import PersonalData from "./personal-data"
import MainNavMenu from "./main-nav-menu"
import Sidebar from "react-sidebar"
import './profile.css'

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sidebarOpen: true,
		}
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
	}

	onSetSidebarOpen() {
		this.setState({sidebarOpen: !this.state.sidebarOpen})
	}

	render() {
		return (
			<Sidebar
				sidebarId="nab_menu_wrapper"
				sidebar={<MainNavMenu role={'Участник'} userId={'K0SWYXYGC1'}/>}
				onSetOpen={this.onSetSidebarOpen}
				docked={this.state.sidebarOpen}
				styles={{sidebar: {background: "white"}}}
			>
				<button type="button" id="hamburger" className="is-open"
				        onClick={(event) => {
					        event.currentTarget.classList.toggle("is-closed")
					        event.currentTarget.classList.toggle("is-open")
					        this.onSetSidebarOpen()
				        }}>
					<span className="hamb-top line">{''}</span>
					<span className="hamb-middle line">{''}</span>
					<span className="hamb-bottom line">{''}</span>
				</button>
				<Switch>
					<Redirect from={'/profile'} to={'/profile/personal-data'} exact/>
					{/*<Route path="/profile/messages" component={}/>*/}
					{/*<Route path="/profile/contests" component={}/>*/}
					{/*<Route path="/profile/recommendation" component={}/>*/}
					{/*<Route path="/profile/tickets" component={}/>*/}
					<Route path="/profile/personal-data" component={PersonalData}/>
				</Switch>
			</Sidebar>
		)
	}
}

export default Profile
