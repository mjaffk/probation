import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {logoutUser} from "../../../redux/action-creators"
import {Redirect} from "react-router-dom"


class SignOut extends Component {
	componentDidMount(){
		this.props.logoutUser()
	}

	render() {
		return (<Redirect to='/auth/signin'/>)
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