import {AUTHORIZE_USER, FAIL} from "../action-types"
import {logoutUser} from "../action-creators"


export default (store) => (next) => (action) => {
	const {type, error, ...rest} = action
	if (!error || typeof error !== 'object') return next(action)

	const errorType = error.message
	let usefulError = error

	switch (errorType) {
		case 'Network Error':
			usefulError.errorToUser = `В настоящий момент сервер временно недоступен,
			пожалуйста, попробуйте повторить попытку позже`
			return next({...rest, type, error : usefulError})

		case 'Request failed with status code 409':
			return next({...rest, type, error : usefulError})

		case 'Request failed with status code 401':
			switch (type) {
				case AUTHORIZE_USER + FAIL :
					usefulError.errorToUser = 'Неверный логин или пароль. Прооверьте, пожалуйста, раскладку и Caps Lock'
					return next({...rest, type, error : usefulError})

				default:
					usefulError.errorToUser = 'Требуется повторная авторизация'
					next({...rest, type, error : usefulError})
					return next(logoutUser())
			}

		default:
			usefulError.errorToUser = 'Произошла ошибка, пожалуйста, попробуйте повторить попытку позже'
			return next({...rest, type, error : usefulError})
	}
}