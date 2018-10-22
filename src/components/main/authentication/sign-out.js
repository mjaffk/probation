import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {logoutUser} from "../../../redux/action-creators"
import {Redirect} from "react-router-dom"


class SignOut extends Component {
	render() {
		this.props.logoutUser()
		return (<Redirect to='/auth'/>)
	}
}

SignOut.propTypes = {
	logoutUser: PropTypes.func
}

export default connect(
	null,
	{
		logoutUser
	}
)(SignOut)