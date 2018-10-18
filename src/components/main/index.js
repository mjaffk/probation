import React, {PureComponent} from 'react'
import {Route, Switch, Redirect, Router} from 'react-router-dom'
import Authentication from './authentication'
import history from '../../utils/history'
import Profile from './profile/index'
import Page404 from "./page-404/index"
import ProtectedRout from "../common/protected-route"

const isAuthorized = !!JSON.parse(localStorage.getItem('reduxState')).token.length // todo: make real function

class Main extends PureComponent {
	render() {
		return (<Router basename={'/'} history={history}>
			<Switch>
				<Route exact path="/" render={() => (
					isAuthorized ? (
						<Redirect to="/profile"/>
					) : (
						<Redirect to="/auth"/>
					)
				)}/>
				<Route path="/auth" component={Authentication}/>
				<ProtectedRout path='/profile' component={Profile}/>
				<Route path='/404' component={Page404}/>
				<Redirect from={'*'} to={'/page-404'} exact/>
			</Switch>
		</Router>)
	}
}


export default Main