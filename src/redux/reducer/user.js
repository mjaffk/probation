import {Record} from 'immutable'
import {
	REGISTER_USER,
	AUTHORIZE_USER,
	USER_PASSWORD_RECOVERY,
	SUCCESS,
	START,
	FAIL
} from '../action-types/index'

const ReducerRecord = new Record({
	userId: null,
	email: null,
	token: null,
	duration: null,

// status of password recovery request
	registered: false,
	registering: false,
	registerError: null,

// status of password recovery request
	authorized: false,
	authorizing: false,
	authorizeError: null,

// status of password recovery request
	passwordRecovering: false,
	passwordRecovered: false,
	passwordRecoveryError: null
})

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

// User authorization
		case AUTHORIZE_USER + START:
			return state.set('authorizing', true)

		case AUTHORIZE_USER + SUCCESS:
			return state
				.set('token', response.token)
				.set('duration', response.duration)
				.set('userId', response.userId)
				.set('authorizing', false)
				.set('authorized', true)
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

// Default state
		default:
			return state
	}
}