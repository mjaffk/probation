import {call, put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import axios from 'axios'
import {ProfileAPI} from '../../constants'
import {LOAD_PROFILE, SUCCESS, FAIL} from '../action-types'
import errorParser from '../../utils/error-parser'

export default function* sagaLoadProfile() {
	try {
		const token = select(userTokenSelector)
		const response = yield call(axios.post, ProfileAPI, data, {
			headers: {
				'token': token
			},
		})
		yield put({
			type: LOAD_PROFILE + SUCCESS,
			response: response.data //todo: map data to user.profile
		})
	} catch (error) {
		yield put({
			type: LOAD_PROFILE + FAIL,
			error: errorParser(error)
		})
	}
}