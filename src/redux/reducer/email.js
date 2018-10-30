import {Record} from 'immutable'
import {CHANGE_EMAIL, CONFIRM_EMAIL, EMAIL_STATUS_CLEAN, FAIL, START, SUCCESS} from '../action-types'


export const ReducerRecord = new Record({
// status of email changing
	emailChanging: false,
	emailChanged: false,
	emailChangeError: null,

// status of confirmation email
	emailConfirming: false,
	emailConfirmError: null,

})


export default (state = new ReducerRecord(), action) => {
	const {type, error} = action

	switch (type) {
// User change password from profile
		case CHANGE_EMAIL + START:
			return state
				.set('emailChanging', true)
				.set('emailChanged', false)
				.set('emailChangeError', null)

		case CHANGE_EMAIL + SUCCESS:
			return state
				.set('emailChanging', false)
				.set('emailChanged', true)
				.set('emailChangeError', null)

		case CHANGE_EMAIL + FAIL :
			return state
				.set('emailChanging', false)
				.set('emailChanged', false)
				.set('emailChangeError', error)

// Confirm changing email
		case CONFIRM_EMAIL + START:
			return state
				.set('emailConfirming', true)
				.set('emailConfirmError', null)
		case CONFIRM_EMAIL + SUCCESS:
			return state
				.set('emailConfirming', false)
				.set('emailConfirmError', null)
		case CONFIRM_EMAIL + FAIL:
			return state
				.set('emailConfirming', false)
				.set('emailConfirmError', error)


// Clean status after form closing
		case EMAIL_STATUS_CLEAN:
			return state
				.set('emailChanging', false)
				.set('emailChanged', false)
				.set('emailChangeError', null)

// Default state
		default:
			return state
	}
}