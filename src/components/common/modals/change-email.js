import Modal from "react-modal"
import React, {PureComponent} from "react"
import {compose} from 'redux'
import {Field, reduxForm} from "redux-form"
import {email, required} from "../../../utils/validate"
import Loader from "../loader"
import AlertModal from "./alert-modal"
import {MODAL_STYLE} from "../../../constants"
import {connect} from "react-redux"
import {CHANGE_EMAIL_FORM} from "../../../constants"
import {changeEmail} from "../../../redux/action-creators"
import {
	emailChangedErrorSelector,
	emailChangingSelector, userEmailSelector,
} from "../../../redux/selectors"
import Input from "../input"


class ChangeEmail extends PureComponent {
	state = {
		isOpen: this.props.isOpen
	}

	render() {
		const {onAfterClose, ...options} = this.props
		const closeModal = () => this.setState({isOpen: false})

		const formSubmitting = (data, dispatch, props) => {
			props.changeEmail({
				oldEmail: data.oldEmail,
				newEmail: data.newEmail
			})
		}

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
						<Field
							name="oldEmail"
							type="text"
							component={Input}
							validate={[required, email]}
							prependIcon='envelope'
							label="Текущий email"
							id="old_email"
							disabled={true}
						/>
						<Field
							name="newEmail"
							type="text"
							component={Input}
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
		emailChangeError: emailChangedErrorSelector(state)
	}), {
		changeEmail
	}
)(reduxForm({form: CHANGE_EMAIL_FORM, validate, enableReinitialize: true, keepDirtyOnReinitialize: true})(ChangeEmail))

