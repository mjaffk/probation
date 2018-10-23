import {call, put} from 'redux-saga/effects'
import {FORGOT} from "../../constants/index"
import {FAIL, SUCCESS, USER_PASSWORD_RECOVERY} from "../action-types/index"
import {reset, stopSubmit} from 'redux-form'
import {recoveryPasswordAPI} from "../../constants/api-config"

export default function* sagaRecoveryPassword(action) {
	const {email} = action.payload
	try {
		const response = yield call(recoveryPasswordAPI,{email})
		yield put({
			type: USER_PASSWORD_RECOVERY + SUCCESS,
			response: response.data
		})
		yield put(reset(FORGOT))

	} catch (error) {
		console.log(error)
		yield put({
				type: USER_PASSWORD_RECOVERY + FAIL,
				error: error
			}
		)
		yield put(stopSubmit(FORGOT, error.response.data))

	}

}