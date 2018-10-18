import React, {PureComponent} from 'react'
import {Route, Switch, Redirect, Router} from 'react-router-dom'
import Authentication from './authentication'
import history from '../../utils/history'
import Profile from './profile/index'
import Page404 from "./page-404/index"
import ProtectedRout from "../common/protected-route"


class Main extends PureComponent {
	render() {
		return (<Router basename={'/'} history={history}>
			<Switch>
				<Redirect from={'/'} to={'/auth'} exact/>
				<Route path="/auth" component={Authentication}/>
				<ProtectedRout path='/profile' component={Profile}/>
				<Route path='/404' component={Page404}/>
				<Redirect from={'*'} to={'/page-404'} exact/>
			</Switch>
		</Router>)
	}
}

export default Main