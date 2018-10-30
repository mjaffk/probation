import {changeEmailAPI} from "../../constants/api-config"
import {FAIL, CHANGE_EMAIL, SUCCESS} from "../action-types"
import {reset, stopSubmit} from "redux-form"
import {CHANGE_EMAIL_FORM} from "../../constants"
import {call, put, all, select} from "redux-saga/effects"
import {userTokenSelector} from "../selectors"

export default function* sagaChangeEmail(action) {
	const {newEmail} = action.payload
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(changeEmailAPI, {
			token,
			data: {
				new_email: newEmail
			}
		})
		yield all([
			put({
				type: CHANGE_EMAIL + SUCCESS,
				response
			}),
			put(reset(CHANGE_EMAIL_FORM)),
		])

	} catch (error) {
		yield all([
			put({
				type: CHANGE_EMAIL + FAIL,
				error: error
			}),
			put(stopSubmit(CHANGE_EMAIL_FORM, {
				newEmail: error.response.data.new_email
			}))
		])
	}

}