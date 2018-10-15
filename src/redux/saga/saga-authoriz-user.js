import {call, put} from 'redux-saga/effects'
import axios from "axios"
import {SIGN_IN, userAuthorizeAPI} from "../../constants/index"
import {FAIL, AUTHORIZE_USER, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import errorParser from "../../utils/error-parser"
import history from '../../utils/history'


export default function* sagaAuthorizeUser(action) {
	console.log(action)
	const {password, userId} = action
	try {
		const response = yield call(axios.get, userAuthorizeAPI, {
			auth: {
				username: userId,
				password: password
			}
		})
		yield put({
			type: AUTHORIZE_USER + SUCCESS,
			response: {...response.data, userid : userId}

		})
		yield put(reset(SIGN_IN))
		yield put(history.push('/profile'))

	} catch (error) {
		yield put({
				type: AUTHORIZE_USER + FAIL,
				error: errorParser(error)
			}
		)
		yield put(stopSubmit(SIGN_IN))
	}
}