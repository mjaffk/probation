import {
	LOAD_DICTIONARY,
	SUCCESS,
	FAIL,
	START
} from '../action-types'
import {SERVER} from '../constants'
import axios  from 'axios'


export function loadDictionary() {
	return (dispatch) => {
		dispatch({
			type: LOAD_DICTIONARY + START,
		})

		axios.get(`${SERVER}/api/directory/regions`)
			.then((response) => {
				console.log(response)
				dispatch({
					type: LOAD_DICTIONARY + SUCCESS,
					response: response.data
				})
			})
			.catch((error) => {
				console.log(error)
				dispatch({
					type: LOAD_DICTIONARY + FAIL,
					error: error
				})
			})
	}
}
