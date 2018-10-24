import {call, put, all} from 'redux-saga/effects'
import {SET_NEW_PASSWORD} from "../../constants/index"
import {FAIL, REGISTER_USER, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import {userRegisterAPI} from "../../constants/api-config"

export default function* sagaRegisterUser(action) {
	const {uuid, data} = action.payload
	try {
		const response = yield call(userRegisterAPI, {
			uuid, data: {
				email: data.email,
				password: data.password,
				captcha: data.captcha,
				role: 'Participant',
				consentPR: 'true',
				region: parseInt(data.region, 10)
			}
		})
		yield all([
			put({
				type: REGISTER_USER + SUCCESS,
				response: response.data,
			}),
			put(reset(SET_NEW_PASSWORD))
		])
	} catch (error) {
		yield all([
			put({
					type: REGISTER_USER + FAIL,
					error: error
				}
			),
			put(stopSubmit(SET_NEW_PASSWORD, error.response.data))
		])
	}
}