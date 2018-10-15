import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {loadRegionsAPI} from "../../constants/index"
import {FAIL, LOAD_DICTIONARY, SUCCESS} from "../action-types/index"
import errorParser from "../../utils/error-parser"

export default function* sagaLoadDictionary() {
	try {
		const response = yield call(axios.get, loadRegionsAPI)
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