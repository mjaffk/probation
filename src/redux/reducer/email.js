import {Record} from 'immutable'
import {
	CHANGE_EMAIL,
	SUCCESS,
	START,
	FAIL
} from '../action-types/index'


export const ReducerRecord = new Record({
// status of password
	emailChanging: false,
	emailChangeError: null,
})


export default (state = new ReducerRecord(), action) => {
	const {type, error} = action

	switch (type) {

// User change password from profile
		case CHANGE_EMAIL + START:
			return state
				.set('emailChanging', true)
				.set('emailChangeError', null)

		case CHANGE_EMAIL + SUCCESS:
			return state
				.set('emailChanging', false)
				.set('emailChangeError', null)

		case CHANGE_EMAIL + FAIL :
			return state
				.set('emailChanging', false)
				.set('emailChangeError', error)

// Default state
		default:
			return state
	}
}