import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {reduxForm, Field} from 'redux-form'
import Input from '../../input'
import Checkbox from '../../input/checkbox'
import {required, requiredConformation, email} from '../../input/validate'
import {PasswordHint} from '../../input/hints'
import Select from '../../select'
import {loadDictionary} from '../../../../action-creators'

class SignUp extends Component {
	render() {
		console.log(this.props.regions, this.props.loaded)
		return (<div className="< d-flex position-absolute h-75 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">
				<h1 className="h3 text-left font-wight-normal">Регистрация</h1>
				<form onSubmit={(values, errors) => console.log(errors)}>
					<Field
						className="form-control"
						name="password"
						type="password"
						component={Input}
						placeholder="Введите пароль"
						validate={[required]}
						prependIcon='unlock-alt'
						hint={PasswordHint}
					/>

					<Field
						className="form-control"
						name="passwordConformation"
						type="password"
						component={Input}
						placeholder="Подтвердите пароль"
						validate={[required]}
						prependIcon='unlock-alt'
					/>

					<Field
						className="form-control"
						name="email"
						type="text"
						component={Input}
						placeholder="Адрес электронной почты"
						validate={[required, email]}
						prependIcon='envelope'
						hint='Для подтверждения адреса электронной почты вам будет направлена активационная ссылка'
					/>
					<Field
						className="form-control"
						name="conformation"
						type="checkbox"
						component={Checkbox}
						label="Для успешной регистрации необходимо подтвердить согласие с правилами проекта"
						validate={[requiredConformation]}
					/>
					<Field
						name="region"
						component={Select}
						label="Регион проживания"
						options={(this.props.loaded) ? this.props.regions : 'Loading...'}
						validate={[required]}
						id="user-region"
					/>
					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block">
							Войти
						</button>
					</div>

				</form>
				<AuthMenu message='Уже зарегистрированы?'/>
			</div>
		</div>)
	}

	componentDidMount() {
		this.props.loadDictionary && this.props.loaded && this.props.loadDictionary()
	}

}

const validate = (values) => {
	const errors = {}

	if (!values.username) {
		errors.username = 'Поле обязательно'
	}

	if (!values.password) {
		errors.password = 'Поле обязательно'
	}

	return errors
}

export default connect(
	(state) => ({
		regions: ((state) => state.dictionary.regions)(state),
		loaded: ((state) => state.dictionary.loaded)(state)
	}),
	{loadDictionary}
)(reduxForm({
	form: 'signIn',
	validate,
})(SignUp))