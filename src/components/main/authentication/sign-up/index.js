import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {Field, reduxForm} from 'redux-form'
import Input from '../input'
import Checkbox from '../input/checkbox'
import {alphaNumeric, email, minLength, required, requiredConformation} from '../../validate'
import {PasswordHint} from '../input/hints'
import Select from '../select'
import {loadCaptcha, loadDictionary, registerUser} from '../../../../redux/action-creators'
import {modalStyle, SIGN_UP} from "../../../../constants"
import Loader from "../../../loader"
import InputPassword from "../input/input-password"
import AlertModal from "../../../modals/alert-modal"
import {
	captchaLoadErrorSelector,
	captchaSelector,
	loadedCaptchaSelector,
	loadedRegionsSelector,
	loadingCaptchaSelector,
	loadingRegionsSelector,
	regionsLoadErrorSelector,
	regionsSelector,
	userEmailSelector,
	userRegisteredSelector,
	userRegisteringSelector,
	userRegistrationErrorSelector,
	uuidSelector
} from "../../../../redux/selectors"
import history from '../../../../utils/history'

const validate = values => {
	const errors = {}
	if (values.password !== values.passwordConformation) {
		errors.passwordConformation = 'Пароли не совпадают'
	}
	return errors
}

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
		const formSubmitting = (data, dispatch, props) => {
			props.registerUser({
				values: data,
				uuid: props.uuid
			})
		}

		const getErrorMessage = () => (this.props.captchaLoadError && this.props.captchaLoadError.errorToUser) ||
			(this.props.regionsLoadError && this.props.regionsLoadError.errorToUser) ||
			(this.props.userRegistrationError && this.props.userRegistrationError.errorToUser)

		const isLoading = () => this.props.loadingRegions || this.props.loadingCaptcha || this.props.userRegistering

		const isRegistered = () => this.props.userRegistered

		return (<div className="< d-flex position-absolute h-100 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">

				{isLoading() && <Loader/>}

				{isRegistered() && <AlertModal
					style={modalStyle}
					message={`Для успешного завершения регистрации необходимо активировать
						учетную запись, перейдя по ссылке из активационного письма,
						отправленного на адрес электронной почты ${this.props.userEmail}`}
					buttonLabel='Закрыть'
					onAfterClose={ () => history.push( '/auth/signin')}
				/>}

				{getErrorMessage() && <AlertModal
					style={modalStyle}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<h1 className="h3 text-left font-wight-normal">Регистрация</h1>
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>
					<Field
						className="form-control"
						name="password"
						component={InputPassword}
						placeholder="Введите пароль"
						validate={[required, minLength(8), alphaNumeric]}
						prependIcon='unlock-alt'
						hint={PasswordHint}
					/>

					<Field
						className="form-control"
						name="passwordConformation"
						component={InputPassword}
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
		regions: regionsSelector(state),
		loadingRegions: loadingRegionsSelector(state),
		loadedRegions: loadedRegionsSelector(state),
		regionsLoadError: regionsLoadErrorSelector(state),
		captcha: captchaSelector(state),
		uuid: uuidSelector(state),
		loadingCaptcha: loadingCaptchaSelector(state),
		loadedCaptcha: loadedCaptchaSelector(state),
		captchaLoadError: captchaLoadErrorSelector(state),
		userEmail: userEmailSelector(state),
		userRegistering: userRegisteringSelector(state),
		userRegistered: userRegisteredSelector(state),
		userRegistrationError: userRegistrationErrorSelector(state),
	}),
	{
		loadDictionary,
		loadCaptcha,
		registerUser,
	}
)(reduxForm({
	form: SIGN_UP,
	validate
})(SignUp))