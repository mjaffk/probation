import {Record} from 'immutable'
import {
	RESET_PASSWORD,
	SET_PASSWORD,
	CHANGE_PASSWORD,
	SUCCESS,
	START,
	FAIL
} from '../action-types/index'


export const ReducerRecord = new Record({
// status of reset password request
	passwordResetting: false,
	passwordReset: false,
	passwordResetError: null,

// status of password
	passwordSetting: false,
	passwordSetError: null,

// status of password
	passwordChanging: false,
	passwordChanged: false,
	passwordChangeError: null,
})


export default (state = new ReducerRecord(), action) => {
	const {type, error} = action

	switch (type) {
// User reset password from auth
		case RESET_PASSWORD + START:
			return state.set('passwordResetting', true)

		case RESET_PASSWORD + SUCCESS:
			return state
				.set('passwordResetting', false)
				.set('passwordReset', true)
				.set('passwordResetError', null)

		case RESET_PASSWORD + FAIL :
			return state
				.set('passwordResetting', false)
				.set('passwordResetError', error)

// User set password after reset
		case SET_PASSWORD + START:
			return state
				.set('passwordSetting', true)

		case SET_PASSWORD + SUCCESS:
			return state
				.set('passwordSetting', false)
				.set('passwordSetError', null)

		case SET_PASSWORD + FAIL :
			return state
				.set('passwordSetting', false)
				.set('passwordSetError', error)

// User change password from profile
		case CHANGE_PASSWORD + START:
			return state.set('passwordChanging', true)

		case CHANGE_PASSWORD + SUCCESS:
			return state
				.set('passwordChanging', false)
				.set('passwordChanged', true)
				.set('passwordChangeError', null)

		case CHANGE_PASSWORD + FAIL :
			return state
				.set('passwordChanging', false)
				.set('passwordChangeError', error)


// Default state
		default:
			return state
	}
}