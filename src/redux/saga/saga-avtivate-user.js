import {call, put} from "redux-saga/effects"
import {ACTIVATE_USER, SUCCESS, FAIL} from "../action-types"

import {activateUserAPI} from "../../constants/api-config"
import {MESSAGE_DICTIONARY} from "../../constants"


export default function* sagaActivateUser(action) {
	const {token} = action.payload
	try {
		const response = yield call(activateUserAPI, {token})
		yield put({
			type: ACTIVATE_USER + SUCCESS,
			response: {
				message: MESSAGE_DICTIONARY[response.data.message],
				userId: response.data.userid}
		})
	} catch (error) {
		yield put({
			type: ACTIVATE_USER + FAIL,
			error
		})
	}
}