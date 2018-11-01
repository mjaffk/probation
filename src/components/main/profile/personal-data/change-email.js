import Modal from "react-modal"
import React, {PureComponent} from "react"
import {compose} from 'redux'
import {reduxForm} from "redux-form"
import {email, required} from "../../../../utils/validate"
import Loader from "../../../common/loader/index"
import AlertModal from "../../../common/modals/alert-modal"
import {CHANGE_EMAIL_FORM, MODAL_STYLE} from "../../../../constants/index"
import {connect} from "react-redux"
import {changeEmail, emailStatusClean} from "../../../../redux/action-creators/index"
import {
	emailChangedErrorSelector,
	emailChangedSelector,
	emailChangingSelector,
	userEmailSelector
} from "../../../../redux/selectors/index"
import Input from "../../../common/input/index"

class ChangeEmail extends PureComponent {
	state = {
		isOpen: this.props.isOpen
	}

	render() {
		const {onAfterClose, ...options} = this.props
		const closeModal = () => this.setState({isOpen: false})

		const formSubmitting = (data, dispatch, props) => {
			props.changeEmail({
				newEmail: data.newEmail
			})
		}

		const isChangeRequestSuccessful = () => this.props.emailChanged

		const isLoading = () => this.props.emailChanging

		const getErrorMessage = () => this.props.emailChangeError && this.props.emailChangeError.errorToUser

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

				{isChangeRequestSuccessful() && <AlertModal
					style={MODAL_STYLE}
					message={`Запрос на смену адреса электронной почты принят. Необходимо перейти по ссылке из письма,
					отправленного на новый адрес электронной почты, для ее активации`}
					buttonLabel='Закрыть'
					onAfterClose={compose(this.props.emailStatusClean, onAfterClose, closeModal)}
				/>}

				<div className='text-justify m-auto'>
					<div className="d-flex justify-content-between align-items-start">
						<h1 className="h3">Смена Email</h1>
						<button className="border-0 input-group-text bg-transparent"
						        onClick={compose(onAfterClose, closeModal, this.props.reset)}>
							<i className="fa fa-times"/>
						</button>
					</div>

					<form onSubmit={this.props.handleSubmit(formSubmitting)}>
						<div>Для успешной смены адреса электронной почты необходимо перейти по ссылке из активационного
							письма, отправленного на <b>новый</b> адрес электронной почты
						</div>
						<Input
							name="oldEmail"
							type="text"
							validate={[required, email]}
							prependIcon='envelope'
							label="Текущий email"
							id="old_email"
							disabled={true}
						/>
						<Input
							name="newEmail"
							type="text"
							validate={[required, email]}
							prependIcon='envelope'
							label="Новый email"
							id="new_email"
						/>

						<div className="d-flex justify-content-end">
							<button type="submit" className="btn btn-primary"
							        disabled={!this.props.valid}>
								Сохранить
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
	if (values.newEmail === values.oldEmail) {
		errors.newEmail = 'Новый email не должен совпадать со старым'
	}
	return errors
}

export default connect((state) => ({
		initialValues: {oldEmail: userEmailSelector(state)},
		emailChanging: emailChangingSelector(state),
		emailChanged: emailChangedSelector(state),
		emailChangeError: emailChangedErrorSelector(state)
	}), {
		changeEmail,
		emailStatusClean
	}
)(reduxForm({form: CHANGE_EMAIL_FORM, validate, enableReinitialize: true, keepDirtyOnReinitialize: true})(ChangeEmail))

