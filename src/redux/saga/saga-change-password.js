import {changePasswordAPI} from "../../constants/api-config"
import {FAIL, CHANGE_PASSWORD, SUCCESS} from "../action-types"
import {reset, stopSubmit} from "redux-form"
import {CHANGE_PASSWORD_FORM} from "../../constants"
import {call, put, all, select} from "redux-saga/effects"
import {userTokenSelector} from "../selectors"
import {logoutUser} from "../action-creators"

export default function* sagaChangePassword(action) {
	const {oldPassword, newPassword} = action.payload
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(changePasswordAPI, {
			token,
			data: {
				old_passwd: oldPassword,
				new_passwd: newPassword
			}
		})
		yield all([
			put({
				type: CHANGE_PASSWORD + SUCCESS,
				response: {
					email: response.data.email,
					userId: response.data.userid
				}
			}),
			put(reset(CHANGE_PASSWORD_FORM)),
			put(logoutUser())

		])

	} catch (error) {
		yield all([
			put({
				type: CHANGE_PASSWORD + FAIL,
				error: error
			}),
			put(stopSubmit(CHANGE_PASSWORD_FORM, {
				oldPassword: error.response.data.old_passwd,
				newPassword: error.response.data.new_passwd
			}))
		])
	}

}