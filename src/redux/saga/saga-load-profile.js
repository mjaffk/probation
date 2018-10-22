import {call, put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {LOAD_PROFILE, SUCCESS, FAIL} from '../action-types'
import errorParser from '../../utils/error-parser'
import {loadProfileAPI} from '../../constants/api-config'

export default function* sagaLoadProfile() {
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(loadProfileAPI, {token})
		yield put({
			type: LOAD_PROFILE + SUCCESS,
			response: response.data
		})
	} catch (error) {
		yield put({
			type: LOAD_PROFILE + FAIL,
			error: errorParser(error)
		})
	}
}