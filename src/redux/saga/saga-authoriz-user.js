import {call, put, all} from 'redux-saga/effects'
import {SIGN_IN} from "../../constants/index"
import {FAIL, AUTHORIZE_USER, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import {userAuthorizeAPI} from '../../constants/api-config'
import {push} from "react-router-redux"


export default function* sagaAuthorizeUser(action) {
	const {password, userId} = action.payload
	try {
		const response = yield call(userAuthorizeAPI, {userId, password})
		yield all([
			put({
				type: AUTHORIZE_USER + SUCCESS,
				response: response.data

			}),
			put(reset(SIGN_IN)),
			put(push('/profile'))
		])
	} catch (error) {
		yield put({
				type: AUTHORIZE_USER + FAIL,
				error: error
			}
		)
		yield put(stopSubmit(SIGN_IN))
	}
}