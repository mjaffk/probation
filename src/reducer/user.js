import {Record} from 'immutable'
import {
	REGISTER_USER,
	SUCCESS,
	START,
	FAIL
} from '../action-types'

const ReducerRecord = new Record({
	user_id: null,
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
			console.log(response)
			return state
				.set('user_id', response)
				.set('registering', false)
				.set('registered', true)

		case REGISTER_USER + FAIL :
			console.log(error)
			return state
				.set('registering', false)
				.set('error', error)

		default:
			return state
	}
}