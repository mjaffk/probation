import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {SERVER} from "../constants"
import {FAIL, LOAD_DICTIONARY, SUCCESS} from "../action-types"
import errorParser from "../utils/error-parser"

export default function* sagaLoadDictionary() {
	try {
		const response = yield call(axios.get, `${SERVER}/api/directory/regions`)
		yield put({
			type: LOAD_DICTIONARY + SUCCESS,
			response: response.data
		})
	} catch (error) {
		yield put(
			{
				type: LOAD_DICTIONARY + FAIL,
				error: errorParser(error)
			}
		)
	}
}