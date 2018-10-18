import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthMenu from '../auth-menu'
import {Field, reduxForm} from 'redux-form'
import {required} from '../../../common/validate'
import Input from '../../../common/input'
import {authorizeUser} from '../../../../redux/action-creators'
import {modalStyle, SIGN_IN} from "../../../../constants"
import Loader from "../../../common/loader"
import InputPassword from "../../../common/input/input-password"
import AlertModal from "../../../common/modals/alert-modal"
import {userAuthorizedSelector, userAuthorizeErrorSelector, userAuthorizingSelector} from "../../../../redux/selectors"

class SignIn extends Component {
	render() {
		const formSubmitting = (data, dispatch, props) => {
			props.authorizeUser(data)
		}

		const getErrorMessage = () => (this.props.userAuthorizeError && this.props.userAuthorizeError.errorToUser)
		const isLoading = () => this.props.userAuthorizing


		return (<div className="< d-flex position-absolute h-75 w-100">
			<div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">

				{isLoading() && <Loader/>}

				{getErrorMessage() && <AlertModal
					style={modalStyle}
					message={getErrorMessage()}
					buttonLabel='Закрыть'
				/>}

				<h1 className="h3 text-left font-wight-normal">Войти в аккаунт</h1>
				<form onSubmit={this.props.handleSubmit(formSubmitting)}>

					<Field
						name="userId"
						type="text"
						component={Input}
						placeholder="Введите идентификационный номер"
						validate={[required]}
						prependIcon='user'
					/>
					<Field
						className="form-control"
						name="password"
						component={InputPassword}
						placeholder="Введите пароль"
						validate={[required]}
						prependIcon='unlock-alt'
					/>
					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!this.props.valid}>
							Войти
						</button>
					</div>
				</form>
				<AuthMenu/>
			</div>
		</div>)
	}
}

export default connect(
	(state) => ({
		initialValues: {userId: state.user.userId},
		userAuthorized: userAuthorizedSelector(state),
		userAuthorizing: userAuthorizingSelector(state),
		userAuthorizeError: userAuthorizeErrorSelector(state),
	}), {
		authorizeUser
	}
)(reduxForm({
	form: SIGN_IN,
})(SignIn))