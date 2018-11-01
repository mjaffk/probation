import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from "react-redux"
import {required} from "../../../../utils/validate"
import {
	GENDER_DICTIONARY,
	GRADE_DICTIONARY,
	GRADE_LETTER_DICTIONARY,
	MODAL_STYLE,
	PERSONAL_DATA
} from "../../../../constants"
import Loader from "../../../common/loader"
import validateSnils from "../../../../utils/snils-validation"
import {createTextMask} from 'redux-form-input-masks'
import {
	defaultPersonalDataValues,
	loadingRegionsSelector,
	profileLoadedSelector,
	profileLoadErrorSelector,
	profileLoadingSelector,
	profileUpdateErrorSelector,
	profileUpdatingSelector,
	regionsLoadErrorSelector,
	regionsSelector,
	userActiveSchoolSelector,
	userIdSelector,
	userSnilsPdfUploadedSelector,
} from "../../../../redux/selectors"
import Input from "../../../common/input"
import Select from "../../../common/select"
import arrToObj from "../../../../utils/arr-to-obj"
import './personal-data.css'
import {
	downloadSnils,
	loadDictionary,
	loadProfile,
	personalDataStatusClean,
	updateProfile
} from "../../../../redux/action-creators"
import PropTypes from "prop-types"
import ChangePassword from "./change-password"
import AlertModal from "../../../common/modals/alert-modal"
import ChangeEmail from "./change-email"
import UploadSnils from "./upload-snils"


class PersonalData extends Component {
	constructor(props) {
		super(props)
		this.state = {
			changePasswordIsOpen: false,
			changeEmailIsOpen: false,
			uploadSnilsIsOpen: false,
		}
		this.isLoading.bind(this)
		this.openChangePassword.bind(this)
	}


	componentDidMount() {
		//download dictionary of regions
		this.props.loadDictionary && !this.props.regions.length && this.props.loadDictionary()

		this.props.loadProfile && this.props.loadProfile()
	}

	componentWillUnmount() {
		this.props.personalDataStatusClean && this.props.personalDataStatusClean()
	}

	static formSubmitting(data, dispatch, props) {
		props.updateProfile && props.updateProfile({data})
	}

	isLoading() {
		return this.props.regionsLoading || this.props.profileLoading || this.props.profileUpdating
	}

	openChangePassword() {
		this.setState({changePasswordIsOpen: true})
	}

	onAfterCloseChangePassword() {
		this.setState({changePasswordIsOpen: false})
	}

	openUploadSnils() {
		this.setState({uploadSnilsIsOpen: true})
	}

	onAfterCloseUploadSnils() {
		this.setState({uploadSnilsIsOpen: false})
	}

	openChangeEmail() {
		this.setState({changeEmailIsOpen: true})
	}

	onAfterCloseChangeEmail() {
		this.setState({changeEmailIsOpen: false})
	}

	getSchoolAttachStatus() {
		return (this.props.activeSchool) ?
			(<div className="text-success">
				<i className="fa fa-check-circle mr-1"/>
				Прикреплен к учебному заведению
			</div>) :
			(<div className="text-danger">
				<i className="fa fa-times-circle mr-1"/>
				Не прикреплен к учебному заведению
			</div>)
	}

	getSnilsUploadStatus() {
		return this.props.snilsPdfUploaded &&
			<div className="text-success">
				<i className="fa fa-check-circle mr-1"/>
				СНИЛС загружен
			</div>
	}

	snilsMask = createTextMask({
		pattern: "999-999-999 99",
		placeholder: 'Χ'
	})

	phoneMask = createTextMask({
		pattern: "+7(999)-999-99-99",
		placeholder: 'Χ'
	})


	getErrorMessage() {
		return (this.props.profileLoadError && this.props.profileLoadError.errorToUser) ||
			(this.props.profileUpdateError && this.props.profileUpdateError.errorToUser) ||
			(this.props.regionsLoadError && this.props.regionsLoadError.errorToUser)
	}

	render() {
		return (
			<div id="personal_data_form">
				{this.isLoading() && <Loader/>}

				<ChangePassword isOpen={this.state.changePasswordIsOpen}
				                onAfterClose={this.onAfterCloseChangePassword}/>
				<UploadSnils isOpen={this.state.uploadSnilsIsOpen} onAfterClose={this.onAfterCloseUploadSnils}/>
				<ChangeEmail isOpen={this.state.changeEmailIsOpen} onAfterClose={this.onAfterCloseChangeEmail}/>

				{this.getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={this.getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<form onSubmit={this.props.handleSubmit(PersonalData.formSubmitting)}>
					<h4>Идентификация в системе</h4>
					<hr/>
					<label htmlFor="user_id">Логин</label>
					<div className="d-flex justify-content-between align-items-baseline flex-wrap mb-2">
						<Input name="userId"
						       disabled={true}
						       id="user_id"
						       className="flex-grow-1 mr-sm-5"/>

						<button className="mx-sm-5 btn btn-secondary flex-grow-0"
						        type="button"
						        onClick={this.openChangePassword}
						>
							Сменить пароль
						</button>
					</div>
					<h4>Персональные данные</h4>
					<hr/>
					<div>
						<Input
							name="lastName"
							disabled={true}
							label="Фамилия"
							id="last_name"/>

						<Input name="firstName"
						       disabled={true}
						       label="Имя"
						       id="firs_name"/>

						<Input name="middleName"
						       disabled={true}
						       label="Отчество"
						       id="middle_name"/>

						<Select name="gender"
						        className="required"
						        validate={[required]}
						        placeholder="Выберите"
						        options={GENDER_DICTIONARY}
						        label="Пол"
						        id="gender"
						/>
						<label htmlFor="snils" className="required">СНИЛС</label>
						<div id='snils_section'
						     className="d-flex justify-content-between align-items-start flex-wrap mb-2">
							<div>
								<Input name="snils"
								       className="flex-grow-1 mr-sm-5"
								       validate={[required]}
								       id="snils"
								       {...this.snilsMask}
								/>
								{this.getSnilsUploadStatus()}
							</div>
							<div className="btn-group flex-grow-0">
								<button
									type="button"
									className="btn btn-success rounded-left mr-1"
									onClick={this.openUploadSnils}
								>
									Загрузить СНИЛС
								</button>
								<button
									type="button"
									className="btn btn-info rounded-right"
									disabled={!this.props.snilsPdfUploaded}
									onClick={this.props.downloadSnils}
								>
									Выгрузить СНИЛС
								</button>
							</div>
						</div>
						<Input name="birthday"
						       className="required"
						       type="date"
						       label="Дата рождения"
						       id="birthday"
						       validate={[required]}
						/>

						<Select name="region"
						        className="required"
						        validate={[required]}
						        options={this.props.regions}
						        placeholder="Выберите или введите"
						        label="Регион проживания"
						        id="region"
						        required={true}
						/>

						<Input name="city"
						       className="required"
						       validate={[required]}
						       label="Населенный пункт"
						       id="city"
						/>

						<Input name="school" className="required"
						       validate={[required]}
						       label="Наименование учебного заведения"
						       id="school"
						/>

						<div className="mb-3">{this.getSchoolAttachStatus()}</div>

						<div id="user_grade">
							<Select name="grade"
							        className="required"
							        validate={[required]}
							        placeholder="Выберите класс"
							        options={arrToObj(GRADE_DICTIONARY)}
							        label="Класс"
							        id="grade"
							/>
							<Select name="gradeLetter"
							        className="required"
							        validate={[required]}
							        placeholder="Выберите букву класса"
							        options={arrToObj(GRADE_LETTER_DICTIONARY)}
							        label="Буква"
							        id="grade_letter"
							/>
						</div>
					</div>
					<h4>Контактные данные</h4>
					<div>
						<Input name="phone"
						       disabled={true}
						       type="tel"
						       label="Телефон"
						       id="phone"
						       {...this.phoneMask}
						/>

						<label htmlFor="email">Email</label>
						<div className="d-flex justify-content-between align-items-baseline mb-3 flex-wrap">
							<Input name="email"
							       disabled={true}
							       type="email"
							       id="email"
							       className="flex-grow-1 mr-sm-5"
							/>
							<button type="button" className="btn btn-secondary mx-sm-5 flex-grow-0"
							        onClick={this.openChangeEmail}
							>
								Сменить Email
							</button>
						</div>
					</div>
					<button type="submit" className="btn btn-primary"
					        disabled={this.props.invalid || this.props.pristine}>
						Сохронить изменения
					</button>
				</form>
			</div>)
	}

}

const validate = values => {
	const errors = {}
	const error = {}
	if (!validateSnils(values.snils, error)) {
		errors.snils = error.message
	}
	return errors
}


export default connect(
	(state) => ({
		initialValues: defaultPersonalDataValues(state),
		userId: userIdSelector(state),
		regions: regionsSelector(state),
		regionsLoading: loadingRegionsSelector(state),
		regionsLoadError: regionsLoadErrorSelector(state),
		profileLoading: profileLoadingSelector(state),
		profileLoaded: profileLoadedSelector(state),
		profileLoadError: profileLoadErrorSelector(state),
		activeSchool: userActiveSchoolSelector(state),
		snilsPdfUploaded: userSnilsPdfUploadedSelector(state),
		profileUpdating: profileUpdatingSelector(state),
		profileUpdateError: profileUpdateErrorSelector(state)
	}),
	{
		loadDictionary,
		loadProfile,
		updateProfile,
		personalDataStatusClean,
		downloadSnils
	}
)(reduxForm({
	form: PERSONAL_DATA,
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})
(PersonalData))

PersonalData.propTypes = {
	initialValues: PropTypes.object,
	userId: PropTypes.string,
	regions: PropTypes.array,
	regionsLoading: PropTypes.bool,
	regionsLoadError: PropTypes.object,
	profileLoading: PropTypes.bool,
	profileLoaded: PropTypes.bool,
	profileLoadError: PropTypes.object,
	loadDictionary: PropTypes.func,
	loadProfile: PropTypes.func
}