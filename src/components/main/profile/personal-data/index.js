import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from "react-redux"
import {required} from "../../../common/validate"
import {GRADE_DICTIONARY, GRADE_LETTER_DICTIONARY, PERSONAL_DATA} from "../../../../constants"
import Loader from "../../../common/loader"
import {
	defaultPersonalDataValues,
	loadingRegionsSelector,
	profileLoadedSelector,
	profileLoadErrorSelector,
	profileLoadingSelector,
	regionsLoadErrorSelector,
	regionsSelector,
} from "../../../../redux/selectors"
import Input from "../../../common/input"
import Select from "../../../common/select"
import arrToObj from "../../../../utils/arr-to-obj"
import './personal-data.css'
import {loadDictionary, loadProfile, personalDataStatusClean, updateProfile} from "../../../../redux/action-creators"
import PropTypes from "prop-types"
import ChangePassword from "../../../common/modals/change-password"


class PersonalData extends Component {
	state = {
		changePasswordIsOpen: false,
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

		const isLoading = () => this.props.regionsLoading || this.props.profileLoading

		const openChangePassword = () => {
			this.setState({changePasswordIsOpen: true})
		}

		const onAfterClose = () => {
			this.setState({changePasswordIsOpen: false})
		}

		const getSchoolAttachStatus = () => {
			if (false) return (<div className="text-success">
				<i className="fa fa-check mr-1"/>
				Прикреплен к учебному заведению
			</div>) //todo: add conditions

			return (<div className="text-danger">
				<i className="fa fa-times-circle mr-1"/>
				Не прикреплен к учебному заведению
			</div>)

		}

		return (<div id="personal_data_form">
			{isLoading() && <Loader/>}

			<ChangePassword isOpen={this.state.changePasswordIsOpen} onAfterClose={onAfterClose}/>

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

					<Field name="sex"
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
					       id="sex"
					/>
					<label htmlFor="snils" className="required">СНИЛС</label>
					<div id='snils_section' className="d-flex justify-content-between align-items-baseline flex-wrap mb-2">
						<Field name="snils"
						       className="flex-grow-1 mr-sm-5"
						       placeholder="XXX-XXX-XXX XX"
						       component={Input}
						       validate={[required]}
						       type="text"
						       id="snils"
						/>
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
					       placeholder="+X(XXX)-XXX-XX-XX"
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
						<button type="button" className="btn btn-secondary mx-sm-5 flex-grow-0">Сменить Email</button>
					</div>
				</div>
				<button type="submit" className="btn btn-primary" disabled={this.props.invalid || this.props.pristine}>
					Сохронить изменения
				</button>
			</form>
		</div>)
	}

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
	}),
	{
		loadDictionary,
		loadProfile,
		updateProfile,
		personalDataStatusClean
	}
)(reduxForm({form: PERSONAL_DATA, enableReinitialize: true, keepDirtyOnReinitialize: true})(PersonalData))

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