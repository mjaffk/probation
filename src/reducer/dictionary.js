import {Record, List} from 'immutable'
import {
	LOAD_DICTIONARY,
	SUCCESS,
	START,
	FAIL
} from '../action-types'

const ReducerRecord = new Record({
	regions: List(),
	loading: false,
	loaded: false,
	error: null
})

export default (state = new ReducerRecord(), action) => {
	const {type, response, error} = action

	switch (type) {
		case LOAD_DICTIONARY + START:
			return state.set('loading', true)

		case LOAD_DICTIONARY + SUCCESS:
			return state
				.update('regions', (regions) =>
					List(response.result.region.options).merge(regions)
				)
				.set('loading', false)
				.set('loaded', true)
				.set('error', null)

		case LOAD_DICTIONARY + FAIL :
			return state
				.set('loading', false)
				.set('error', error)

		default:
			return state
	}
}