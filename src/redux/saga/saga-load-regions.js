import {call, put} from 'redux-saga/effects'
import {FAIL, LOAD_DICTIONARY, SUCCESS} from "../action-types/index"
import errorParser from "../../utils/error-parser"
import {loadRegionsAPI} from "../../constants/api-config"

export default function* sagaLoadDictionary() {
	try {
		const response = yield call(loadRegionsAPI)
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