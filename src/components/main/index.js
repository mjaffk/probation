import React, {PureComponent} from 'react'
import {Route, Switch, Redirect, Router} from 'react-router-dom'
import Authentication from './authentication'
import history from '../../utils/history'
import Profile from './profile/index'


class Main extends PureComponent {
	render() {
		return (<Router basename={'/'} history={history}>
			<Switch>
				<Redirect from={'/'} to={'/auth'} exact/>
				<Route path="/auth" component={Authentication}/>
				<Route path='/profile' component={Profile}/>
			</Switch>
		</Router>)
	}
}

export default Main