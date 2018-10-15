import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Forgot from './forgot'
import SignIn from './sign-in'
import SignUp from './sign-up'

class Authentication extends Component {
	render() {
		return (<Switch>
			<Redirect from={'/auth'} to={'/auth/signin'} exact/>
			<Route path="/auth/signin" component={SignIn}/>
			<Route path="/auth/cntstnt/signup" component={SignUp}/>
			<Route path="/auth/forgot" component={Forgot}/>
		</Switch>)
	}
}

export default Authentication
