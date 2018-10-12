import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {SERVER, SIGN_IN} from "../constants"
import {FAIL, AUTHORIZE_USER, SUCCESS} from "../action-types"
import {stopSubmit, reset} from 'redux-form'
import errorParser from "../utils/error-parser"

export default function* sagaAuthorizeUser(action) {
	console.log(action)
	const {password, userId} = action
	try {
		const response = yield call(axios.get, `${SERVER}/api/token/`, {
			auth: {
				username: userId,
				password: password
			}
		})
		yield put({
			type: AUTHORIZE_USER + SUCCESS,
			response: {...response.data, userId}

		})
		yield put(reset(SIGN_IN))

	} catch (error) {
		yield put({
				type: AUTHORIZE_USER + FAIL,
				error: errorParser(error)
			}
		)
		yield put(stopSubmit(SIGN_IN))
	}
}