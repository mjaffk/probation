import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import { reduxForm} from 'redux-form'
import {required} from '../../../../utils/validate'
import Input from '../../../common/input'
import {activateUser, authorizeUser, signInStatusClean} from '../../../../redux/action-creators'
import {MODAL_STYLE, SIGN_IN} from "../../../../constants"
import Loader from "../../../common/loader"
import InputPassword from "../../../common/input/input-password"
import AlertModal from "../../../common/modals/alert-modal"
import {
	userActivateErrorSelector,
	userActivatingSelector,
	userAuthorizeErrorSelector,
	userAuthorizingSelector,
	userIdSelector,
	userMessageSelector
} from "../../../../redux/selectors"

class SignIn extends Component {

	componentDidMount() {
		this.props.location.state && this.props.location.state.token && this.props.activateUser &&
		this.props.activateUser({token: this.props.location.state.token})
	}

	componentWillUnmount() {
		this.props.signInStatusClean && this.props.signInStatusClean()
	}


	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.authorizeUser(data)
		}

		const getErrorMessage = () => (this.props.userAuthorizeError && this.props.userAuthorizeError.errorToUser) ||
			(this.props.userActivateError && this.props.userActivateError.errorToUser)
		const isLoading = () => this.props.userAuthorizing || this.props.userActivating


		return (<div className="< d-flex position-absolute h-75 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">

				{isLoading() && <Loader/>}

				{getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<h1 className="h3 text-left font-wight-normal">Войти в аккаунт</h1>
				{this.props.message && <div className='my-2'>{this.props.message}</div>}
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>

					<Input
						name="userId"
						placeholder="Введите идентификационный номер"
						validate={[required]}
						prependIcon='user'
					/>
					<InputPassword
						className="form-control"
						name="password"
						placeholder="Введите пароль"
						validate={[required]}
						prependIcon='unlock-alt'
					/>
					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!this.props.valid}>
							Войти
						</button>
					</div>
				</form>
				<AuthMenu/>
			</div>
		</div>)
	}
}

export default connect(
	(state) => ({
		initialValues: {userId: userIdSelector(state)},
		userAuthorizing: userAuthorizingSelector(state),
		userAuthorizeError: userAuthorizeErrorSelector(state),
		message: userMessageSelector(state),
		userActivating: userActivatingSelector(state),
		userActivateError: userActivateErrorSelector(state),
	}), {
		authorizeUser,
		activateUser,
		signInStatusClean
	}
)(reduxForm({form: SIGN_IN})(SignIn))