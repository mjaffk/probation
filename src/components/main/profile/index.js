import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import PersonalData from "./personal-data"
import MainNavMenu from "./main-nav-menu"
import Sidebar from "react-sidebar"
import './profile.css'

const mql = window.matchMedia(`(min-width: 800px)`)

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sidebarOpen: true,
		}

		this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged)
	}

	componentWillUnmount() {
		mql.removeListener(this.mediaQueryChanged)
	}

	onSetSidebarOpen() {
		this.setState({sidebarOpen: !this.state.sidebarOpen})
	}

	mediaQueryChanged() {
		this.setState({sidebarDocked: mql.matches, sidebarOpen: false})
	}

	render() {
		return (
			<Sidebar
				sidebarId="nab_menu_wrapper"
				sidebar={<MainNavMenu/>}
				onSetOpen={this.onSetSidebarOpen}
				docked={this.state.sidebarOpen}
				styles={{sidebar: {background: "white"}}}
			>
				<button type="button" className="hamburger is-closed" data-toggle="offcanvas" >
					<span className="hamb-top"></span>
					<span className="hamb-middle"></span>
					<span className="hamb-bottom"></span>
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
