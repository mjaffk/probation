import React, {Component} from 'react'
import {connect} from "react-redux"
import Loader from "../../../common/loader"
import AlertModal from "../../../common/modals/alert-modal"
import {MODAL_STYLE, SET_NEW_PASSWORD} from "../../../../constants"
import {Field, reduxForm} from "redux-form"
import {required, minLength, alphaNumeric} from "../../../common/validate"
import InputPassword from "../../../common/input/input-password"
import AuthMenu from "../auth-menu"
import {PasswordHint} from "../../../common/input/hints"
import {setPassword} from "../../../../redux/action-creators"
import {passwordSetErrorSelector, passwordSettingSelector} from "../../../../redux/selectors"


class SetPassword extends Component {
	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.setPassword({
				token: props.match.params.token,
				password: data.password
			})
		}

		const getErrorMessage = () => this.passwordSetError && this.passwordSetError.errorToUser

		const isLoading = () => this.props.passwordSetting

		return (<div className="< d-flex position-absolute h-75 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">

				{isLoading() && <Loader/>}

				{getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<h1 className="h3 text-left font-wight-normal">Восстановление доступа к личному кабинету</h1>
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>

					<Field
						name="password"
						component={InputPassword}
						placeholder="Новый пароль"
						validate={[required, minLength(8), alphaNumeric]}
						prependIcon='unlock-alt'
						hint={PasswordHint}
						id="password"
						label="Пожалуйста, укажите новый пароль"
					/>
					<Field
						name="passwordConformation"
						component={InputPassword}
						placeholder="Подтвердите новый пароль"
						validate={[required]}
						prependIcon='unlock-alt'
					/>
					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block"
						        disabled={!this.props.valid}>
							Сохранить
						</button>
					</div>
				</form>
				<AuthMenu/>
			</div>
		</div>)
	}
}

SetPassword.propTypes = {}

const validate = values => {
	const errors = {}
	if (values.password !== values.passwordConformation) {
		errors.passwordConformation = 'Пароли не совпадают'
	}
	return errors
}

export default connect((state) => ({
		passwordSetting: passwordSettingSelector(state),
		passwordSetError: passwordSetErrorSelector(state)
	}),
	{
		setPassword,
	}
)(reduxForm({form: SET_NEW_PASSWORD, validate})(SetPassword))