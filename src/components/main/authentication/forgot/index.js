import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {Field, reduxForm} from 'redux-form'
import {required, email} from '../../../details/validate'
import Input from '../../../details/input'
import {recoveryPassword} from '../../../../redux/action-creators'
import {modalStyle, FORGOT} from "../../../../constants"
import Loader from "../../../details/loader"
import AlertModal from "../../../details/modals/alert-modal"
import {
	passwordRecoveredSelector,
	passwordRecoveringSelector,
	passwordRecoveryErrorSelector,
	userEmailSelector,
} from "../../../../redux/selectors"
import history from "../../../../utils/history"

class Forgot extends Component {
	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.recoveryPassword({email: data.email})
		}

		const getErrorMessage = () => (this.props.passwordRecoveryError && this.props.passwordRecoveryError.errorToUser)
		const isLoading = () => this.props.passwordRecovering
		const isPasswordRecoverySuccess = () => (this.props.passwordRecovered && this.props.userEmail)

		return (<div className="< d-flex position-absolute h-75 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6  col-xl-4 ">

				{isLoading() && <Loader/>}

				{getErrorMessage() && <AlertModal
					style={modalStyle}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				{(isPasswordRecoverySuccess()) && <AlertModal
					style={modalStyle}
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
		passwordRecovering: passwordRecoveringSelector(state),
		passwordRecovered: passwordRecoveredSelector(state),
		passwordRecoveryError: passwordRecoveryErrorSelector(state),
		userEmail: userEmailSelector(state)
	}), {
		recoveryPassword
	}
)(reduxForm({
	form: FORGOT,
})(Forgot))