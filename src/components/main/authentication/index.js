import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Forgot from './forgot'
import SignIn from './sign-in'
import SignUp from './sign-up'
import SignOut from './sign-out'
import SetPassword from "./set-password/index"
import Activate from "./activate"
import ConfirmEmail from "./confirm-email"

class Authentication extends Component {
	render() {
		return (<div>
			<Switch>
				<Redirect from={'/auth'} to={'/auth/signin'} exact/>
				<Redirect from={'/auth/cntstnt'} to={'/auth/cntstnt/signup'} exact/>
				<Route path="/auth/activate/:token" component={Activate}/>
				<Route path="/auth/signin" component={SignIn}/>
				<Route path="/auth/cntstnt/signup" component={SignUp}/>
				<Route path="/auth/forgot/:token" component={SetPassword} />
				<Route path="/auth/forgot" component={Forgot}/>
				<Route path="/auth/signout" component={SignOut}/>
				<Route path="/auth/confirm_email/:token" component={ConfirmEmail}/>
			</Switch>
		</div>)
	}
}

export default Authentication