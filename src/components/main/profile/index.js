import React, {Component} from 'react'
import {connect} from "react-redux"
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import PersonalData from "./personal-data/index"
import MainNavMenu from "./main-nav-menu"
import Sidebar from "react-sidebar"
import './profile.css'
import ProfileBreadCrumb from "../../common/breadcrumb"
import Hamburger from "../../common/hamburger"
import logo from "../../../pictures/logo.jpg"
import {userIdSelector, userRoleNameSelector} from "../../../redux/selectors"
import {loadProfile} from "../../../redux/action-creators"
import Messages from "./messages"
import Contests from "./contests"
import Recommendation from "./recommendation"
import NewPersonalData from "./new-personal-data"
import Tickets from "./ticket"

class Profile extends Component {
	state = {
		sidebarOpen: true,
	}

	onSetSidebarOpen() {
		this.setState({sidebarOpen: !this.state.sidebarOpen})
	}

	componentDidMount() {
		this.props.loadProfile && this.props.loadProfile()
	}

	render() {
		return (
			<Sidebar
				sidebarId="nav_menu_wrapper"
				contentId="profile"
				sidebar={<MainNavMenu role={this.props.role} userId={this.props.userId}/>}
				docked={this.state.sidebarOpen}
			>
				<Hamburger onClick={(event) => {
					event.currentTarget.classList.toggle("is-closed")
					event.currentTarget.classList.toggle("is-open")
					this.onSetSidebarOpen()
				}}/>
				<div id="content_wrapper">
					<div>
						<header>
							<div id='header_top'>
								<div id="logo">
									<Link to="/">
										<img className="img-thumbnail logo"
										     src={logo}
										     alt="WorldSkills Russia"
										     style={{borderStyle: "none"}}/>
									</Link>
								</div>

								<div id="title">
									<div className=" title text-justify h3">Билет в будущее</div>
								</div>
							</div>

							<ProfileBreadCrumb location={this.props.location.pathname}/>
						</header>
						<Switch>
							<Redirect from={'/profile'} to={'/profile/personal-data'} exact/>
							<Route path="/profile/messages" component={Messages}/>
							<Route path="/profile/contests" component={Contests}/>
							<Route path="/profile/recommendation" component={Recommendation}/>
							<Route path="/profile/tickets" component={Tickets}/>
							<Route path="/profile/personal-data" component={PersonalData}/>
							<Route path={'/profile/new-personal-data'} component={NewPersonalData}/>
						</Switch>
					</div>
				</div>
				<footer id="footer"/>
			</Sidebar>
		)
	}
}

export default connect(
	(state) => ({
		userId: userIdSelector(state),
		role: userRoleNameSelector(state)
	}),
	{
		loadProfile
	}
)(Profile)
