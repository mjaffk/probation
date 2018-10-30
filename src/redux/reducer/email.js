import {Record} from 'immutable'
import {
	CHANGE_EMAIL,
	SUCCESS,
	EMAIL_STATUS_CLEAN,
	START,
	FAIL
} from '../action-types'


export const ReducerRecord = new Record({
// status of password
	emailChanging: false,
	emailChanged: false,
	emailChangeError: null,
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