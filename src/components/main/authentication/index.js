import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Forgot from './forgot'
import SignIn from './sign-in'
import SignUp from './sign-up'

class Authentication extends Component {
	render() {
		return (<div>
			<Switch>
			<Redirect from={'/auth'} to={'/auth/signin'} exact/>
			<Redirect from={'/auth/cntstnt'} to={'/auth/cntstnt/signup'} exact/>
			<Route path="/auth/signin" component={SignIn}/>
			<Route path="/auth/cntstnt/signup" component={SignUp}/>
			<Route path="/auth/forgot" component={Forgot}/>
		</Switch>
		</div>)
	}
}

export default Authentication
