import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from "react-redux"
import {required} from "../../../common/validate"
import {CLASS_LETTER_DICTIONARY, CLASS_NUMBER_DICTIONARY, PERSONAL_DATA} from "../../../../constants"
import Loader from "../../../common/loader"
import {
	loadedRegionsSelector,
	loadingRegionsSelector,
	regionsLoadErrorSelector,
	regionsSelector
} from "../../../../redux/selectors"
import Input from "../../../common/input"
import Select from "../../../common/select"
import arrToObj from "../../../../utils/arr-to-obj"
import './personal-data.css'
import {loadDictionary} from "../../../../redux/action-creators"

class PersonalData extends Component {
	state = {}

	componentDidMount() {
		//download dictionary of regions
		this.props.loadDictionary && !this.props.loadedRegions && !this.props.loadingRegions &&
		this.props.loadDictionary()
	}

	render() {
		const formSubmitting = (data, dispatch, props) => {
		}

		const isLoading = () => this.props.loadingRegions

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
					       options={this.props.regions.toArray()}
					       placeholder="Выберите или введите"
					       label="Регион проживания"
					       id="region"
					       required={true}
					/>

					<Field name="settlement"
					       className="required"
					       component={Input}
					       validate={[required]}
					       type="text"
					       label="Населенный пункт"
					       id="settlement"
					/>

					<Field name="school"
					       className="required"
					       component={Input}
					       validate={[required]}
					       type="text"
					       label="Наименование учебного заведения"
					       id="school"
					/>
					<div id="user_class">
						<Field name="classNumber"
						       className="required"
						       component={Select}
						       validate={[required]}
						       placeholder="Выберите класс"
						       options={arrToObj(CLASS_NUMBER_DICTIONARY)}
						       label="Класс"
						       id="class_number"
						/>
						<Field name="classLetter"
						       className="required"
						       component={Select}
						       validate={[required]}
						       placeholder="Выберите букву класса"
						       options={arrToObj(CLASS_LETTER_DICTIONARY)}
						       label="Буква"
						       id="class_letter"
						/>
					</div>
				</div>
				<h4>Контактные данные</h4>
				<div>
					<Field name="phoneNumber"
					       disabled={true}
					       component={Input}
					       type="tel"
					       label="Телефон"
					       id="phone_number"
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
				<button type="submit" className="btn btn-success" disabled={!this.props.valid}>
					Сохронить изменения
				</button>
			</form>
		</div>)
	}

}

const validate = (values) => {
	const error = {}
	console.log(values)
	return error
}

export default connect(
	(state) => ({
		regions: regionsSelector(state),
		loadingRegions: loadingRegionsSelector(state),
		loadedRegions: loadedRegionsSelector(state),
		regionsLoadError: regionsLoadErrorSelector(state),
	}),
	{
		loadDictionary,
	}
)(reduxForm({form: PERSONAL_DATA, validate})(PersonalData))