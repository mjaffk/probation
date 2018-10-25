import React, {Component} from 'react'
import {Redirect} from "react-router-dom"

class Activate extends Component {
	render() {

		return (<Redirect to={{
			pathname: '/auth/signin',
			state: {token: this.props.match.params.token}
		}}/>)

	}
}

Activate.propTypes = {}

export default Activate