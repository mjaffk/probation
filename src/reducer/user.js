import {Record} from 'immutable'
import {
	REGISTER_USER,
	SUCCESS,
	START,
	FAIL
} from '../action-types'

const ReducerRecord = new Record({
	userId: null,
	email: null,
	registered: false,
	registering: false,
	error: null
})

export default (state = new ReducerRecord(), action) => {
	const {type, response, error} = action

	switch (type) {
		case REGISTER_USER + START:
			return state.set('registering', true)

		case REGISTER_USER + SUCCESS:
			const {email, userid} = response
			return state
				.set('userId', userid)
				.set('email', email)
				.set('registering', false)
				.set('registered', true)
				.set('error', null)

		case REGISTER_USER + FAIL :
			return state
				.set('registering', false)
				.set('error', error)

		default:
			return state
	}
}