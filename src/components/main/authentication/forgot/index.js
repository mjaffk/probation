import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {reduxForm} from 'redux-form'
import {email, required} from '../../../../utils/validate'
import Input from '../../../common/input'
import {forgotStatusClean, resetPassword} from '../../../../redux/action-creators'
import {FORGOT, MODAL_STYLE} from "../../../../constants"
import Loader from "../../../common/loader"
import AlertModal from "../../../common/modals/alert-modal"
import {
	passwordResetErrorSelector,
	passwordResetSelector,
	passwordResettingSelector,
	userEmailSelector,
} from "../../../../redux/selectors"
import history from "../../../../utils/history"

class Forgot extends Component {

	componentWillUnmount() {
		this.props.forgotStatusClean && this.props.forgotStatusClean()
	}

	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.resetPassword({email: data.email})
		}

		const getErrorMessage = () => (this.props.passwordResetError && this.props.passwordResetError.errorToUser)
		const isLoading = () => this.props.passwordResetting
		const isPasswordResetSuccess = () => (this.props.passwordReset && this.props.userEmail)

		return (<div className="< d-flex position-absolute h-75 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6  col-xl-4 ">

				{isLoading() && <Loader/>}

				{getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				{isPasswordResetSuccess() && <AlertModal
					style={MODAL_STYLE}
					message={` В течение минуты на адрес ${this.props.userEmail} придёт ссылка для смены пароля`}
					buttonLabel='Закрыть'
					onAfterClose={() => history.push('/auth/signin')}
				/>}

				<h1 className="h3 text-left font-wight-normal">Восстановление доступа к личному кабинету</h1>
				<p>Пожалуйста, укажите <b>адрес электронной почты</b>, который вы указали при регистрации на сайте</p>
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>

					<Input
						name="email"
						type="text"
						placeholder="Введите адрес электронной почты"
						validate={[required, email]}
						prependIcon='envelope'
					/>
					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!this.props.valid}>
							Продолжить
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
		passwordResetting: passwordResettingSelector(state),
		passwordReset: passwordResetSelector(state),
		passwordResetError: passwordResetErrorSelector(state),
		userEmail: userEmailSelector(state)
	}), {
		resetPassword,
		forgotStatusClean
	}
)(reduxForm({form: FORGOT})(Forgot))