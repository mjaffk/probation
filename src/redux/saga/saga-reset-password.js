import {call, put, all} from 'redux-saga/effects'
import {FORGOT} from "../../constants/index"
import {FAIL, SUCCESS, RESET_PASSWORD} from "../action-types/index"
import {reset, stopSubmit} from 'redux-form'
import {resetPasswordAPI} from "../../constants/api-config"

export default function* sagaResetPassword(action) {
	const {email} = action.payload
	try {
		const response = yield call(resetPasswordAPI, {email})
		yield all
		([
			put({
				type: RESET_PASSWORD + SUCCESS,
				response: {
					email: response.data.email,
					userId: response.data.userid
				}
			}),
			put(reset(FORGOT))
		])

	} catch (error) {
		yield all([
			put({
				type: RESET_PASSWORD + FAIL,
				error: error
			}),
			put(stopSubmit(FORGOT, error.response.data))
		])
	}

}