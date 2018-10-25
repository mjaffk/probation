import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {Field, reduxForm} from 'redux-form'
import Input from '../../../common/input'
import Checkbox from '../../../common/input/checkbox'
import {alphaNumeric, email, minLength, required, requiredConformation} from '../../../common/validate'
import {PasswordHint} from '../../../common/input/hints'
import Select from '../../../common/select'
import {loadCaptcha, loadDictionary, registerUser, signUpStatusClean} from '../../../../redux/action-creators'
import {MODAL_STYLE, SIGN_UP} from "../../../../constants"
import Loader from "../../../common/loader"
import InputPassword from "../../../common/input/input-password"
import AlertModal from "../../../common/modals/alert-modal"
import {
	captchaLoadErrorSelector,
	captchaSelector,
	loadingCaptchaSelector,
	loadingRegionsSelector,
	regionsLoadErrorSelector,
	regionsSelector,
	userEmailSelector,
	userRegisteringSelector,
	userRegisteredSelector,
	userRegistrationErrorSelector,
	uuidSelector
} from "../../../../redux/selectors"
import history from '../../../../utils/history'

class SignUp extends Component {
	componentDidMount() {
		//download dictionary of regions
		this.props.loadDictionary && !this.props.regions.length && !this.props.regionsLoading &&
		this.props.loadDictionary()

		//download captcha
		this.props.loadCaptcha && !this.props.captcha.length && !this.props.loadingCaptcha &&
		this.props.loadCaptcha()
	}

	componentWillUnmount() {
		this.props.signUpStatusClean && this.props.signUpStatusClean()
	}

	render() {
		const {captchaLoadError, regionsLoadError, userRegistrationError} = this.props

		const formSubmitting = (data, dispatch, props) => {
			props.registerUser({
				data,
				uuid: props.uuid
			})
		}

		const isRegistered = () => this.props.userRegistered

		const getErrorMessage = () =>
			(captchaLoadError && captchaLoadError.errorToUser) ||
			(regionsLoadError && regionsLoadError.errorToUser) ||
			(userRegistrationError && userRegistrationError.errorToUser)

		const isLoading = () => this.props.regionsLoading || this.props.loadingCaptcha || this.props.userRegistering

		return (<div className="< d-flex position-absolute h-100 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">

				{isLoading() && <Loader/>}

				{isRegistered() && <AlertModal
					style={MODAL_STYLE}
					message={`Для успешного завершения регистрации необходимо активировать
						учетную запись, перейдя по ссылке из активационного письма,
						отправленного на адрес электронной почты ${this.props.userEmail}`}
					buttonLabel='Закрыть'
					onAfterClose={ () => history.push( '/auth/signin')}
				/>}

				{getErrorMessage() && <AlertModal
					style={MODAL_STYLE}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<h1 className="h3 text-left font-wight-normal">Регистрация</h1>
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>
					<Field
						name="password"
						component={InputPassword}
						placeholder="Введите пароль"
						validate={[required, minLength(8), alphaNumeric]}
						prependIcon='unlock-alt'
						hint={PasswordHint}
					/>

					<Field
						name="passwordConformation"
						component={InputPassword}
						placeholder="Подтвердите пароль"
						validate={[required]}
						prependIcon='unlock-alt'
					/>

					<Field
						name="email"
						type="text"
						component={Input}
						placeholder="Адрес электронной почты"
						validate={[required, email]}
						prependIcon='envelope'
						hint='Для подтверждения адреса электронной почты вам будет направлена активационная ссылка'
					/>

					<Field
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
						options={this.props.regions}
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

const validate = values => {
	const errors = {}
	if (values.password !== values.passwordConformation) {
		errors.passwordConformation = 'Пароли не совпадают'
	}
	return errors
}

export default connect(
	(state) => ({
		regions: regionsSelector(state),
		regionsLoading: loadingRegionsSelector(state),
		regionsLoadError: regionsLoadErrorSelector(state),
		captcha: captchaSelector(state),
		uuid: uuidSelector(state),
		loadingCaptcha: loadingCaptchaSelector(state),
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
		signUpStatusClean
	}
)(reduxForm({form: SIGN_UP, validate})(SignUp))