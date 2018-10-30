import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Redirect, Router} from 'react-router-dom'
import Authentication from './authentication'
import history from '../../utils/history'
import Profile from './profile/index'
import Page404 from "../common/page-404/index"
import ProtectedRout from "../common/protected-route"
import {userTokenSelector} from "../../redux/selectors"
import PropTypes from "prop-types"


class Main extends PureComponent {
	render() {
		const isAuthorized = !!this.props.token
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


export default connect(
	state => ({
		token : userTokenSelector(state)
	})
)(Main)

Main.propTypes = {
	token: PropTypes.string,
}