import { Record } from 'immutable'
import {
	LOAD_CAPTCHA,
	SUCCESS,
	START,
	FAIL
} from '../action-types'

const ReducerRecord = new Record({
	image: '',
	uuid: '',
	loading: false,
	loaded: false,
	error: null
})

export default (state = new ReducerRecord(), action) => {
	const {type, response, error, uuid} = action

	switch (type) {
		case LOAD_CAPTCHA + START:
			return state.set('loading', true)

		case LOAD_CAPTCHA + SUCCESS:
			return state
				.set('image', `data:image/png;base64,${response}`)
				.set('uuid', uuid)
				.set('loading', false)
				.set('loaded', true)
				.set('error', null)

		case LOAD_CAPTCHA + FAIL :
			return state
				.set('loading', false)
				.set('error', error)

		default:
			return state
	}


}