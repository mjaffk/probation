import Modal from "react-modal"
import React, {PureComponent} from "react"
import {compose} from 'redux'
import {reduxForm} from "redux-form"
import Loader from "../../../common/loader/index"
import AlertModal from "../../../common/modals/alert-modal"
import {MODAL_STYLE, UPLOAD_SNILS_FORM} from "../../../../constants/index"
import {connect} from "react-redux"
import {uploadSnils, uploadSnilsStatusClean} from "../../../../redux/action-creators/index"
import FileInput from "../../../common/input/file-input"
import Input from "../../../common/input/index"
import {required} from "../../../../utils/validate"
import {
	snilsUploadedSelector,
	snilsUploadErrorSelector,
	snilsUploadingSelector
} from "../../../../redux/selectors/index"


class UploadSnils extends PureComponent {
	state = {
		isOpen: this.props.isOpen,
	}

	render() {
		const {onAfterClose, ...options} = this.props

		const closeModal = () => this.setState({isOpen: false})

		const formSubmitting = (data, dispatch, props) => {
			props.uploadSnils && props.uploadSnils({file: data && data.snilsFile})
		}

		const isLoading = () => this.props.snilsUploading

		const getErrorMessage = () => this.props.snilsUploadError && this.props.snilsUploadError.errorToUser

		const isUploaded = () => this.props.snilsUploaded
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

				{isUploaded() && <AlertModal
					style={MODAL_STYLE}
					message={`СНИЛС успешно загружен. Спасибо!`}
					buttonLabel='Закрыть'
					onAfterClose={compose(this.props.uploadSnilsStatusClean, onAfterClose, closeModal)}
				/>}


				<div className='text-justify m-auto'>
					<div className="d-flex justify-content-between align-items-start">
						<h1 className="h3 mr-5">Загрузить СНИЛС</h1>
						<button className="border-0 input-group-text bg-transparent"
						        onClick={compose(onAfterClose, closeModal, this.props.reset)}>
							<i className="fa fa-times"/>
						</button>
					</div>

					<form onSubmit={this.props.handleSubmit(formSubmitting)}>

						<label htmlFor="snils" className="required">Расположение загружаемого файла</label>

						<div className="d-flex justify-content-between align-items-start flex-grow-1" id="snils">
							<Input
								name="snilsFileName"
								disabled={true}
								validate={[required]}
								id="snils_file_name"
								className="required mr-4 text-nowrap"
								hint="Для загрузки необходимо выбрать файл в формате PDF"

							/>
							<FileInput
								name="snilsFile"
								validate={[required]}
								dropzone_options={{
									multiple: false,
									accept: 'application/pdf'
								}}
							>
								<button className="btn btn-outline-secondary flex-grow-0" type="button">Выбрать</button>
							</FileInput>
						</div>
						<div className="d-flex justify-content-start">
							<button type="submit" className="btn btn-success"
							        disabled={!this.props.valid}>
								Загрузить
							</button>
						</div>
					</form>
				</div>
			</Modal>
		)
	}
}

export default connect((state) => ({
		initialValues: {
			snilsFileName: (state.form[UPLOAD_SNILS_FORM] &&
				state.form[UPLOAD_SNILS_FORM].values &&
				state.form[UPLOAD_SNILS_FORM].values.snilsFile) ?
				state.form[UPLOAD_SNILS_FORM].values.snilsFile.name : null
		},
		snilsUploading: snilsUploadingSelector(state),
		snilsUploaded: snilsUploadedSelector(state),
		snilsUploadError: snilsUploadErrorSelector(state)
	}), {
		uploadSnils,
		uploadSnilsStatusClean
	}
)(reduxForm({form: UPLOAD_SNILS_FORM, enableReinitialize: true, keepDirtyOnReinitialize: true})(UploadSnils))