import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {FORGOT, recoveryPasswordAPI} from "../../constants/index"
import {FAIL, SUCCESS, USER_PASSWORD_RECOVERY} from "../action-types/index"
import {reset, stopSubmit} from 'redux-form'
import errorParser from "../../utils/error-parser"

export default function* sagaRecoveryPassword(action) {
	try {
		const response = yield call(axios.post, recoveryPasswordAPI, {email: action.email})

		yield put({
			type: USER_PASSWORD_RECOVERY + SUCCESS,
			response: response.data
		})
		yield put(reset(FORGOT))

	} catch (error) {
		console.log(error)
		yield put({
				type: USER_PASSWORD_RECOVERY + FAIL,
				error: errorParser(error)
			}
		)
		yield put(stopSubmit(FORGOT, error.response.data))

	}

}