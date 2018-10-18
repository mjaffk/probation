import React, {Component} from 'react'
import {Route} from "react-router-dom"
import {connect} from "react-redux"
import UnAuthorized from "./unauthorised/index"


class ProtectedRout extends Component {
	render() {
		// Route should not take component as attribute.
		// Component uses in renderProtected as ProtectedComponent
		const {component, ...rest} = this.props
		return (<div>
			<Route {...rest} render={this.renderProtected}/>
		</div>)
	}

	renderProtected = (roteProps) => {
		const {component: ProtectedComponent, authorized} = this.props
		return authorized ? <ProtectedComponent {...roteProps}/> : <UnAuthorized/>
	}
}

export default connect(
	state => ({
		authorized: !!state.user.token
	}),
)(ProtectedRout)