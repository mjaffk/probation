import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

class Profile extends Component {
	render() {
		return (<Switch>
			<Redirect from={'/profile'} to={'/profile/personal-data'} exact/>
			{/*<Route path="/profile/messages" component={}/>*/}
			{/*<Route path="/profile/contests" component={}/>*/}
			{/*<Route path="/profile/recommendation" component={}/>*/}
			{/*<Route path="/profile/tickets" component={}/>*/}
			<Route path="/profile/personal-data" component={Persanal}/>
		</Switch>)
	}
}

export default Profile
