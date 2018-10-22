import {call, put} from 'redux-saga/effects'
import {SIGN_UP} from "../../constants/index"
import {FAIL, REGISTER_USER, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import errorParser from "../../utils/error-parser"
import {userRegisterAPI} from "../../constants/api-config"

export default function* sagaRegisterUser(action) {
	const {uuid, data} = action.payload
	console.log(uuid, data)
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
		yield put({
			type: REGISTER_USER + SUCCESS,
			response: response.data,
		})
		yield put(reset(SIGN_UP))
	} catch (error) {
		yield put({
				type: REGISTER_USER + FAIL,
				error: errorParser(error)
			}
		)
		yield put(stopSubmit(SIGN_UP, error.response.data))
	}
}