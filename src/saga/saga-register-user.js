import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {SERVER, SIGN_UP} from "../constants"
import {FAIL, REGISTER_USER, SUCCESS} from "../action-types"
import {stopSubmit, SubmissionError} from 'redux-form'

export default function* sagaRegisterUser(action) {
	const {uuid, values} = action
	const {password, email, region, captcha} = values
	try {
		const response = yield call(axios.post, `${SERVER}/api/user/register/${uuid}`, {
			email: email,
			password: password,
			captcha: captcha.toUpperCase(),
			role: 'Participant',
			consentPR: true,
			region: parseInt(region,10)
		})
		yield put({
			type: REGISTER_USER + SUCCESS,
			response: response.data,
		})
	} catch (errors) {
		yield put({
				type: REGISTER_USER + FAIL,
				error: errors
			}
		)
		yield stopSubmit( {form : SIGN_UP, errors : new SubmissionError(errors) })

	}

}