import {Record} from 'immutable'
import {
	REGISTER_USER,
	AUTHORIZE_USER,
	USER_PASSWORD_RECOVERY,
	LOAD_PROFILE,
	LOGOUT_USER,
	SUCCESS,
	START,
	FAIL
} from '../action-types/index'


export const ReducerRecord = (userId = null, token = null)=> new Record({
	userId: userId,
	email: null,
	token: token,
	duration: null,
	role: '',

	profile: {
		personalData: {
			lastName: '',
			firstName: '',
			middleName: '',
			birthday: '',
			region: null,
			city: '',
			school: '',
			grade: null,
			gradeLetter: '',
		},
		phone: '',
		email: '',
	},

// status of user registering request
	registering: false,
	registerError: null,

// status of user authorizing request
	authorizing: false,
	authorizeError: null,

// status of password recovery request
	passwordRecovering: false,
	passwordRecovered: false,
	passwordRecoveryError: null,

// status of profile loading request
	profileLoading: false,
	profileLoaded: false,
	profileLoadError: null,

})()


export default (state = new ReducerRecord(), action) => {
	console.log(state)
	const {type, response, error} = action

	switch (type) {
// User registrations
		case REGISTER_USER + START:
			return state.set('registering', true)

		case REGISTER_USER + SUCCESS:
			return state
				.set('userId', response.userId)
				.set('email', response.email)
				.set('registering', false)
				.set('registerError', null)

		case REGISTER_USER + FAIL :
			return state
				.set('registering', false)
				.set('registerError', error)

// User authorization
		case AUTHORIZE_USER + START:
			return state.set('authorizing', true)

		case AUTHORIZE_USER + SUCCESS:
			return state
				.set('token', response.token)
				.set('duration', response.duration)
				.set('userId', response.userId)
				.set('authorizing', false)
				.set('authorizeError', null)

		case AUTHORIZE_USER + FAIL :
			return state
				.set('authorizing', false)
				.set('authorizeError', error)

// User make password recovery
		case USER_PASSWORD_RECOVERY + START:
			return state.set('passwordRecovering', true)

		case USER_PASSWORD_RECOVERY + SUCCESS:
			return state
				.set('email', response.email)
				.set('passwordRecovering', false)
				.set('passwordRecovered', true)
				.set('passwordRecoveryError', null)

		case USER_PASSWORD_RECOVERY + FAIL :
			return state
				.set('passwordRecovering', false)
				.set('passwordRecoveryError', error)

// Load user profile
		case LOAD_PROFILE + START:
			return state.set('profileLoading', true)

		case LOAD_PROFILE + SUCCESS:
			return state
				.set('profile', response.profile)
				.set('userId', response.userId)
				.set('email', response.email)
				.set('role', response.role)
				.set('profileLoading', false)
				.set('profileLoadError', null)

		case LOAD_PROFILE + FAIL :
			return state
				.set('profileLoading', false)
				.set('profileLoadError', error)


// Logout user
		case LOGOUT_USER + START :
			return state
				.set('token', null)
				.set('userId', null)

// Default state
		default:
			return state
	}
}