import { Record } from 'immutable'
import {
	LOAD_CAPTCHA,
	SUCCESS,
	START,
	FAIL
} from '../action-types/index'

const ReducerRecord = new Record({
	image: '',
	uuid: '',
	loading: false,
	error: null
})

export default (state = new ReducerRecord(), action) => {
	const {type, response, error} = action

	switch (type) {
		case LOAD_CAPTCHA + START:
			return state.set('loading', true)

		case LOAD_CAPTCHA + SUCCESS:
			return state
				.set('image', response.image)
				.set('uuid', response.uuid)
				.set('loading', false)
				.set('error', null)

		case LOAD_CAPTCHA + FAIL :
			return state
				.set('loading', false)
				.set('error', error)

		default:
			return state
	}


}