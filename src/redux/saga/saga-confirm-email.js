import {confirmEmailAPI} from "../../constants/api-config"
import {FAIL, CONFIRM_EMAIL, SUCCESS} from "../action-types"
import {call, put, all} from "redux-saga/effects"
import {push} from "react-router-redux"


export default function* sagaConfirmEmail(action) {
	const {token} = action.payload
	try {
		const response = yield call(confirmEmailAPI, {
			data: {
				token
			}
		})
		yield all([
			put({
				type: CONFIRM_EMAIL + SUCCESS,
				response
			}),
			put(push('/'))
		])

	} catch (error) {
		yield all([
			put({
				type: CONFIRM_EMAIL + FAIL,
				error: error
			})
		])
	}

}