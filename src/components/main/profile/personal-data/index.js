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
import {loadDictionary, loadProfile, updateProfile} from "../../../../redux/action-creators"
import PropTypes from "prop-types"


class PersonalData extends Component {
	state = {}

	componentDidMount() {
		//download dictionary of regions
		this.props.loadDictionary && !this.props.regions.length && !this.props.regionsLoading &&
		this.props.loadDictionary()

		this.props.loadProfile && !this.props.profileLoading && this.props.loadProfile()
	}

	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.updateProfile({data})
		}

		const isLoading = () => this.props.regionsLoading || this.props.profileLoading

		return (<div id="personal_data_form">
			{isLoading() && <Loader/>}
			<form onSubmit={this.props.handleSubmit(formSubmitting)}>
				<h4>Идентификация в системе</h4>
				<hr/>
				<div className="d-flex flex-row justify-content-between ">
					<Field name="userId"
					       disabled={true}
					       component={Input}
					       type="text"
					       label="Логин"
					       id="user_id"
					/>
					<button className="m-4 btn btn-secondary btn-lg align-self-center">Сменить пароль</button>
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

					<Field name="email"
					       disabled={true}
					       component={Input}
					       type="email"
					       label="Email"
					       id="email"
					/>
				</div>
				<button type="submit" className="btn btn-success" disabled={this.props.invalid || this.props.pristine}>
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
	}
)(reduxForm({form: PERSONAL_DATA})(PersonalData))

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