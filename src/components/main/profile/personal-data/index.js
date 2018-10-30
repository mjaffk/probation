import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from "react-redux"
import {required} from "../../../../utils/validate"
import {GRADE_DICTIONARY, GRADE_LETTER_DICTIONARY, MODAL_STYLE, PERSONAL_DATA} from "../../../../constants"
import Loader from "../../../common/loader"
import validateSnils from "../../../../utils/snils-validation"
import {createTextMask} from 'redux-form-input-masks'

import {
	defaultPersonalDataValues,
	loadingRegionsSelector,
	profileLoadedSelector,
	profileLoadErrorSelector,
	profileLoadingSelector,  profileUpdateErrorSelector, profileUpdatingSelector,
	regionsLoadErrorSelector,
	regionsSelector, userActiveSchoolSelector, userSnilsPdfUploadedSelector,
} from "../../../../redux/selectors"
import Input from "../../../common/input"
import Select from "../../../common/select"
import arrToObj from "../../../../utils/arr-to-obj"
import './personal-data.css'
import {loadDictionary, loadProfile, personalDataStatusClean, updateProfile} from "../../../../redux/action-creators"
import PropTypes from "prop-types"
import ChangePassword from "../../../common/modals/change-password"
import AlertModal from "../../../common/modals/alert-modal"
import ChangeEmail from "../../../common/modals/change-email"


class PersonalData extends Component {
	state = {
		changePasswordIsOpen: false,
		changeEmailIsOpen: false,
	}

	componentDidMount() {
		//download dictionary of regions
		this.props.loadDictionary && !this.props.regions.length && !this.props.regionsLoading &&
		this.props.loadDictionary()

		this.props.loadProfile && !this.props.profileLoading && this.props.loadProfile()
	}

	componentWillUnmount() {
		this.props.personalDataStatusClean && this.props.personalDataStatusClean()
	}

	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.updateProfile({data})
		}

		const isLoading = () => this.props.regionsLoading || this.props.profileLoading || this.props.profileUpdating


		const openChangePassword = () => {
			this.setState({changePasswordIsOpen: true})
		}

		const onAfterCloseChangePassword = () => {
			this.setState({changePasswordIsOpen: false})
		}

		const openChangeEmail = () => {
			this.setState({changeEmailIsOpen: true})
		}

		const onAfterCloseChangeEmail = () => {
			this.setState({changeEmailIsOpen: false})
		}

		const getSchoolAttachStatus = () => {
			if (this.props.activeSchool) return (<div className="text-success">
				<i className="fa fa-check-circle mr-1"/>
				Прикреплен к учебному заведению
			</div>)

			return (<div className="text-danger">
				<i className="fa fa-times-circle mr-1"/>
				Не прикреплен к учебному заведению
			</div>)

		}

		const getSnilsUploadStatus = () => {
			if (this.props.snilsPdfUploaded) return (<div className="text-success">
				<i className="fa fa-check-circle mr-1"/>
				СНИЛС загружен
			</div>)

			return null
		}

		const snilsMask = createTextMask({
			pattern: "999-999-999 99",
			placeholder: 'Χ'
		})

		const phoneMask = createTextMask({
			pattern: "+7(999)-999-99-99",
			placeholder: 'Χ'
		})


		const getErrorMessage = () => (this.props.profileLoadError && this.props.profileLoadError.errorToUser) ||
			(this.props.profileUpdateError && this.props.profileUpdateError.errorToUser) ||
			(this.props.regionsLoadError && this.props.regionsLoadError.errorToUser)

		return (<div id="personal_data_form">
			{isLoading() && <Loader/>}

			<ChangePassword isOpen={this.state.changePasswordIsOpen} onAfterClose={onAfterCloseChangePassword}/>
			<ChangeEmail isOpen={this.state.changeEmailIsOpen} onAfterClose={onAfterCloseChangeEmail}/>

			{getErrorMessage() && <AlertModal
				style={MODAL_STYLE}
				message={getErrorMessage()}
				buttonLabel='Закрыть'
			/>}

			<form onSubmit={this.props.handleSubmit(formSubmitting)}>
				<h4>Идентификация в системе</h4>
				<hr/>
				<label htmlFor="user_id">Логин</label>
				<div className="d-flex justify-content-between align-items-baseline flex-wrap mb-2">
					<Field name="userId"
					       disabled={true}
					       component={Input}
					       type="text"
					       id="user_id"
					       className="flex-grow-1 mr-sm-5"
					/>
					<button className="mx-sm-5 btn btn-secondary flex-grow-0"
					        type="button"
					        onClick={openChangePassword}
					>
						Сменить пароль
					</button>
				</div>
				<h4>Персональные данные</h4>
				<hr/>
				<div>
					<Field name="lastName"
					       disabled={true}
					       component={Input}
					       type="text"
					       label="Фамилия"
					       id="last_name"
					/>

					<Field name="firstName"
					       disabled={true}
					       component={Input}
					       type="text"
					       label="Имя"
					       id="firs_name"
					/>

					<Field name="middleName"
					       disabled={true}
					       component={Input}
					       type="text"
					       label="Отчество"
					       id="middle_name"
					/>

					<Field name="gender"
					       className="required"
					       component={Select}
					       validate={[required]}
					       placeholder="Выберите"
					       options={[{
						       index: 'male',
						       value: 'мужской'
					       }, {
						       index: 'female',
						       value: 'женский'
					       }]}
					       label="Пол"
					       id="gender"
					/>
					<label htmlFor="snils" className="required">СНИЛС</label>
					<div id='snils_section' className="d-flex justify-content-between align-items-start flex-wrap mb-2">
						<div>
							<Field name="snils"
							       className="flex-grow-1 mr-sm-5"
							       component={Input}
							       validate={[required]}
							       type="text"
							       id="snils"
							       {...snilsMask}
							/>
							{getSnilsUploadStatus()}
						</div>
						<div className="btn-group flex-grow-0">
							<button
								type="button"
								className="btn btn-success rounded-left mr-1"
							>
								Загрузить СНИЛС
							</button>
							<button
								type="button"
								className="btn btn-info rounded-right"
								disabled
							>
								Выгрузит СНИЛС
							</button>
						</div>
					</div>
					<Field name="birthday"
					       className="required"
					       component={Input}
					       type="date"
					       label="Дата рождения"
					       id="birthday"
					       validate={[required]}
					/>

					<Field name="region"
					       className="required"
					       component={Select}
					       validate={[required]}
					       options={this.props.regions}
					       placeholder="Выберите или введите"
					       label="Регион проживания"
					       id="region"
					       required={true}
					/>

					<Field name="city"
					       className="required"
					       component={Input}
					       validate={[required]}
					       type="text"
					       label="Населенный пункт"
					       id="city"
					/>

					<Field name="school"
					       className="required"
					       component={Input}
					       validate={[required]}
					       type="text"
					       label="Наименование учебного заведения"
					       id="school"
					/>

					<div className="mb-3">{getSchoolAttachStatus()}</div>

					<div id="user_grade">
						<Field name="grade"
						       className="required"
						       component={Select}
						       validate={[required]}
						       placeholder="Выберите класс"
						       options={arrToObj(GRADE_DICTIONARY)}
						       label="Класс"
						       id="grade"
						/>
						<Field name="gradeLetter"
						       className="required"
						       component={Select}
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
					<Field name="phone"
					       disabled={true}
					       component={Input}
					       type="tel"
					       label="Телефон"
					       id="phone"
					       {...phoneMask}
					/>

					<label htmlFor="email">Email</label>
					<div className="d-flex justify-content-between align-items-baseline mb-3 flex-wrap">
						<Field name="email"
						       disabled={true}
						       component={Input}
						       type="email"
						       id="email"
						       className="flex-grow-1 mr-sm-5"
						/>
						<button type="button" className="btn btn-secondary mx-sm-5 flex-grow-0"
						onClick={openChangeEmail}
						>
							Сменить Email
						</button>
					</div>
				</div>
				<button type="submit" className="btn btn-primary" disabled={this.props.invalid || this.props.pristine}>
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
		personalDataStatusClean
	}
)(reduxForm({form: PERSONAL_DATA, validate, enableReinitialize: true, keepDirtyOnReinitialize: true})(PersonalData))

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