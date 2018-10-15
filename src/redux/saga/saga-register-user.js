import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {userRegisterAPI, SIGN_UP} from "../../constants/index"
import {FAIL, REGISTER_USER, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import errorParser from "../../utils/error-parser"

export default function* sagaRegisterUser(action) {
	const {uuid, values} = action
	try {
		const response = yield call(axios.post, userRegisterAPI + uuid, {
			email: values.email,
			password: values.password,
			captcha: values.captcha,
			role: 'Participant',
			consentPR: 'true',
			region: parseInt(values.region, 10)
		})
		yield put({
			type: REGISTER_USER + SUCCESS,
			response: {
				email: response.data.email,
				userId: response.data.userid
			},
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