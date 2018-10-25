import {Record} from 'immutable'
import {
	ACTIVATE_USER,
	AUTHORIZE_USER,
	FAIL,
	LOAD_PROFILE,
	LOGOUT_USER,
	REGISTER_USER,
	RESET_PASSWORD,
	SET_PASSWORD,
	START,
	SUCCESS,
	UPDATE_PROFILE,
	SIGN_UP_STATUS_CLEAN,
	SIGN_IN_STATUS_CLEAN,
	PERSONAL_DATA_STATUS_CLEAN,
} from '../action-types/index'


export const ReducerRecord = (userId = null, token = null) => new Record({
	userId: userId,
	email: null,
	token: token,
	duration: null,
	role: '',
	message: null,
	profile: {
		phone: '',
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
	},

// status of user registering request
	registering: false,
	registered: false,
	registerError: null,

// status of user authorizing request
	authorizing: false,
	authorizeError: null,

// status of user activation request
	activating: false,
	activated: false,
	activateError: null,

// status of profile loading request
	profileLoading: false,
	profileLoaded: false,
	profileLoadError: null,

// status of profile updating request
	profileUpdating: false,
	profileUpdated: false,
	profileUpdateError: null,

})()


export default (state = new ReducerRecord(), action) => {
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
				.set('registered', true)
				.set('registerError', null)

		case REGISTER_USER + FAIL :
			return state
				.set('registering', false)
				.set('registerError', error)

// User activation
		case ACTIVATE_USER + START:
			return state
				.set('activating', true)
				.set('message', null)

		case ACTIVATE_USER + SUCCESS:
			return state
				.set('message', response.message)
				.set('userId', response.userId)
				.set('activating', false)
				.set('activated', true)
				.set('activateError', null)

		case ACTIVATE_USER + FAIL :
			return state
				.set('activating', false)
				.set('activateError', error)

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
				.set('profileLoaded', true)
				.set('profileLoadError', null)

		case LOAD_PROFILE + FAIL :
			return state
				.set('profileLoading', false)
				.set('profileLoadError', error)

// Update user profile
		case UPDATE_PROFILE + START:
			return state
				.set('profileUpdating', true)
				.set('profileUpdated', false)
				.set('message', null)
		case UPDATE_PROFILE + SUCCESS:
			return state
				.set('profile', response.profile)
				.set('userId', response.userId)
				.set('email', response.email)
				.set('role', response.role)
				.set('profileUpdating', false)
				.set('profileUpdated', true)
				.set('profileUpdateError', null)

		case UPDATE_PROFILE + FAIL :
			return state
				.set('profileUpdating', false)
				.set('profileUpdateError', error)

//Reset password passed
		case RESET_PASSWORD + SUCCESS:
			return state
				.set('email', response.email)
				.set('userId', response.userId)

// User set password after reset
		case SET_PASSWORD + START:
			return state
				.set('message', null)

		case SET_PASSWORD + SUCCESS:
			return state
				.set('message', response.message)
				.set('userId', response.userId)

// Logout user
		case LOGOUT_USER + START :
			return state
				.set('token', null)


//Clean statuses
		case SIGN_UP_STATUS_CLEAN:
			return state
				.set('registering', false)
				.set('registered', false)
				.set('registerError', null)

		case SIGN_IN_STATUS_CLEAN:
			return state
				.set('message', null)
				.set('authorizing', false)
				.set('authorizeError', null)
				.set('activating', false)
				.set('activated', false)
				.set('activateError', null)

		case PERSONAL_DATA_STATUS_CLEAN:
			return state
				.set('profileUpdating', false)
				.set('profileUpdated', false)
				.set('profileUpdateError', null)
				.set('profileLoading', false)
				.set('profileLoaded', false)
				.set('profileLoadError', null)

// Default state
		default:
			return state
	}
}