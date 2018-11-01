import Modal from "react-modal"
import React, {PureComponent} from "react"
import {compose} from 'redux'
import {reduxForm} from "redux-form"
import InputPassword from "../../../common/input/input-password"
import {alphaNumeric, minLength, required} from "../../../../utils/validate"
import {PasswordHint} from "../../../common/input/hints"
import Loader from "../../../common/loader/index"
import AlertModal from "../../../common/modals/alert-modal"
import {MODAL_STYLE} from "../../../../constants/index"
import {connect} from "react-redux"
import {CHANGE_PASSWORD_FORM} from "../../../../constants/index"
import {changePassword} from "../../../../redux/action-creators/index"
import {passwordChangedErrorSelector, passwordChangingSelector} from "../../../../redux/selectors/index"


class ChangePassword extends PureComponent {
	state = {
		isOpen: this.props.isOpen
	}

	render() {
		const {onAfterClose, ...options} = this.props

		const closeModal = () => this.setState({isOpen: false})

		const formSubmitting = (data, dispatch, props) => {
			props.changePassword({
				oldPassword: data.oldPassword,
				newPassword: data.newPassword
			})
		}

		const isLoading = () => this.props.passwordChanging

		const getErrorMessage = () => this.props.passwordChangeError && this.props.passwordChangeError.errorToUser

		return (
			<Modal
				shouldCloseOnOverlayClick={false}
				isOpen={this.state.isOpen}
				onRequestClose={closeModal}
				style={MODAL_STYLE}
				{...options}
			>
				{isLoading() && <Loader/>}

				{getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<div className='text-justify m-auto'>
					<div className="d-flex justify-content-between align-items-start">
						<h1 className="h3">Смена пароля</h1>
						<button className="border-0 input-group-text bg-transparent"
						        onClick={compose(onAfterClose, closeModal, this.props.reset)}>
							<i className="fa fa-times"/>
						</button>
					</div>

					<form onSubmit={this.props.handleSubmit(formSubmitting)}>

						<InputPassword
							name="oldPassword"
							validate={[required]}
							prependIcon='unlock-alt'
							id="old_password"
							label="Старый пароль"
						/>
						<InputPassword
							name="newPassword"
							validate={[required, minLength(8), alphaNumeric]}
							prependIcon='unlock-alt'
							hint={PasswordHint}
							id="new_password"
							label="Новый пароль"
						/>
						<InputPassword
							name="newPasswordConformation"
							validate={[required]}
							prependIcon='unlock-alt'
							id="new_password_conformation"
							label="Повторите пароль"
						/>
						<div className="d-flex justify-content-end">
							<button type="submit" className="btn btn-primary"
							        disabled={!this.props.valid}>
								Сохранить изменения
							</button>
						</div>
					</form>
				</div>
			</Modal>
		)
	}
}

const validate = values => {
	const errors = {}
	if (values.newPassword !== values.newPasswordConformation) {
		errors.newPasswordConformation = 'Пароли не совпадают'
	}

	if (values.newPassword === values.oldPassword) {
		errors.newPassword = 'Новый пароль не должен совпадать со старым'
	}
	return errors
}

export default connect((state) => ({
		passwordChanging: passwordChangingSelector(state),
		passwordChangeError: passwordChangedErrorSelector(state)
	}), {
		changePassword
	}
)(reduxForm({form: CHANGE_PASSWORD_FORM, validate})(ChangePassword))