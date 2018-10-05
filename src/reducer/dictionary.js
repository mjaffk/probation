import { Record } from 'immutable'
import {arrToMap} from "./utils"
import {
	LOAD_DICTIONARY,
	SUCCESS,
	START,
	FAIL
} from '../action-types'

const RegionRecord = Record({
	index: null,
	value: null
})

const ReducerRecord = new Record({
	regions: arrToMap([], RegionRecord),
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
			console.log(response)
			return state
				.update('regions', (regions) =>
					arrToMap(response, RegionRecord).merge(regions)
				)
				.set('loading', false)
				.set('loaded', true)

		case LOAD_DICTIONARY + FAIL :
			console.log(error)
			return state
				.set('loading', false)
				.set('loaded', false)
				.set('error', error)

		default:
			return state
	}




}