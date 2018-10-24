import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {Field, reduxForm} from 'redux-form'
import {required, email} from '../../../common/validate'
import Input from '../../../common/input'
import {resetPassword} from '../../../../redux/action-creators'
import {MODAL_STYLE, FORGOT} from "../../../../constants"
import Loader from "../../../common/loader"
import AlertModal from "../../../common/modals/alert-modal"
import {
	passwordResetSelector,
	passwordResettingSelector,
	passwordResetErrorSelector,
	userEmailSelector,
} from "../../../../redux/selectors"
import history from "../../../../utils/history"

class Forgot extends Component {
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

					<Field
						name="email"
						type="text"
						component={Input}
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
		resetPassword
	}
)(reduxForm({form: FORGOT})(Forgot))