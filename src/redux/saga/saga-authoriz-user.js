import {call, put} from 'redux-saga/effects'
import {SIGN_IN} from "../../constants/index"
import {FAIL, AUTHORIZE_USER, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import errorParser from "../../utils/error-parser"
import history from '../../utils/history'
import {userAuthorizeAPI} from '../../constants/api-config'


export default function* sagaAuthorizeUser(action) {
	const {password, userId} = action.payload
	try {
		const response = yield call(userAuthorizeAPI, {userId, password})
		yield put({
			type: AUTHORIZE_USER + SUCCESS,
			response: response.data

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