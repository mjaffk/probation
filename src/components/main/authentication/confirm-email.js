import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {confirmEmail} from "../../../redux/action-creators"
import Loader from "../../common/loader"
import {emailConfirmingSelector, emailConfirmErrorSelector} from "../../../redux/selectors"
import AlertModal from "../../common/modals/alert-modal"
import {MODAL_STYLE} from "../../../constants"
import history from '../../../utils/history'


class ConfirmEmail extends Component {
	componentDidMount() {
		this.props.confirmEmail && this.props.match && this.props.match.params && this.props.match.params.token &&
		this.props.confirmEmail({token : this.props.match.params.token})
	}

	render() {
		const isLoading = () => this.props.emailConfirming
		const getErrorMessage = () => this.props.emailConfirmError && this.props.emailConfirmError.errorToUser

		return(<div>
				{isLoading() && <Loader/>}
				{getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
					onAfterClose={() => {history.push('/')}}
				/>}
			</div>
		)
	}
}

ConfirmEmail.propTypes = {
	emailConfirming: PropTypes.bool,
	emailConfirmError: PropTypes.object,
	confirmEmail: PropTypes.func
}

export default connect(
	(state) => ({
		emailConfirming: emailConfirmingSelector(state),
		emailConfirmError: emailConfirmErrorSelector(state)
	}), {
		confirmEmail
	})(ConfirmEmail)