import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {reduxForm, Field} from 'redux-form'
import Input from '../../input'
import Checkbox from '../../input/checkbox'
import {required, requiredConformation, email} from '../../input/validate'
import {PasswordHint} from '../../input/hints'
import Select from '../../select'
import {loadDictionary, loadCaptcha, registerUser} from '../../../../action-creators'
import {SIGN_UP} from "../../../../constants"
import Loader from "../../loader"

class SignUp extends Component {

	componentDidMount() {
		//download dictionary of regions
		this.props.loadDictionary && !this.props.loadedRegions && !this.props.loadingRegions &&
		this.props.loadDictionary()

		//download captcha
		this.props.loadCaptcha && !this.props.loadedCaptcha && !this.props.loadingCaptcha &&
		this.props.loadCaptcha()
	}

	render() {
		/**
		 * Action for form submitting
		 * @param data - object of values from Redux Form
		 * @param dispatch
		 * @param props - object of all props from component
		 */
		const formSubmitting = (data, dispatch, props) => {
			props.registerUser({
				values: data,
				uuid: props.uuid
			})
		}

		return (<div className="< d-flex position-absolute h-100 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">

				{(!this.props.loadedRegions || !this.props.loadedCaptcha || this.props.loadingRegions ||
					this.props.loadingCaptcha || this.props.userRegistering) && <Loader/>}

				<h1 className="h3 text-left font-wight-normal">Регистрация</h1>
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>
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
						validate={[requiredConformation]}
					/>

					<Field
						name="region"
						component={Select}
						placeholder="Выберите"
						label="Регион проживания"
						options={this.props.regions.toArray()}
						validate={[required]}
						id="user-region"
					/>

					<div className="captcha-img d-flex mb-3">
						<img
							src={this.props.captcha}
							alt="капча">
						</img>
						<button type="button"
						        className="captcha-button btn btn-outline-primary px-4 ml-3"
						        onClick={this.props.loadCaptcha}>
							<i className={`fa fa-repeat`}/>
						</button>
					</div>

					<Field
						name="captcha"
						type="text"
						component={Input}
						placeholder="Введите текст, который вы видете на экране"
						validate={[required]}
					/>

					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!this.props.valid}>
							Зарегистрироваться
						</button>
					</div>
				</form>
				<AuthMenu message='Уже зарегистрированы?'/>
			</div>
		</div>)
	}
}

export default connect(
	(state) => ({
		regions: ((state) => state.dictionary.regions)(state),
		loadedRegions: ((state) => state.dictionary.loaded)(state),
		loadingRegions: ((state) => state.dictionary.loading)(state),
		captcha: ((state) => state.captcha.image)(state),
		uuid: ((state) => state.captcha.uuid)(state),
		loadedCaptcha: ((state) => state.captcha.loaded)(state),
		loadingCaptcha: ((state) => state.captcha.loading)(state),
		userRegistered: ((state) => state.user.registered)(state),
		userRegistrationError: ((state) => state.user.error)(state),
		userRegistering: ((state) => state.user.registering)(state),
	}),
	{
		loadDictionary,
		loadCaptcha,
		registerUser
	}
)(reduxForm({
	form: SIGN_UP,
})(SignUp))