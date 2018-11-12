import {all, call, put, select} from 'redux-saga/effects'
import {
	userActiveSchoolSelector,
	userEmailConfirmedSelector,
	userIdSelector,
	userRoleSelector,
	userTokenSelector
} from "../selectors"
import {FAIL, SUCCESS, UPDATE_PROFILE} from '../action-types'
import {updateProfileAPI} from "../../constants/api-config"
import {stopSubmit} from "redux-form"
import {PERSONAL_DATA} from "../../constants"
import sagaLoadProfile from "./saga-load-profile"
import {formatToSnils} from "../../utils/format-from-to-snills"


export default function* sagaUpdateProfile(action) {
	const {data} = action.payload
	try {
		const token = yield select(userTokenSelector)
		const role = yield select(userRoleSelector)
		const userId = yield select(userIdSelector)
		const activeSchool = yield select(userActiveSchoolSelector)
		const emailConfirmed = yield select(userEmailConfirmedSelector)
		const response = yield call(updateProfileAPI, {
			token, data: {
				active_school: activeSchool,
				birthday: data.birthday && data.birthday + ' 00:00:00.00000',
				email: data.email,
				email_confirmed: emailConfirmed,
				gender: data.gender,
				init_password: null,
				personal_data: {
					snils: formatToSnils(data.snils),
					city: data.city,
					school: data.school,
					grade: data.grade,
					grade_letter: data.gradeLetter,
				},
				phone: data.phone,
				region: parseInt(data.region, 10),
				role: role,
				school_data: [],
				user_id: userId
			}
		})
		yield all([
			put({
				type: UPDATE_PROFILE + SUCCESS,
				response
			}),
			sagaLoadProfile()
		])
	} catch (error) {
		yield all([
			put({
				type: UPDATE_PROFILE + FAIL,
				error: error
			}),
			put(stopSubmit(PERSONAL_DATA, {
				city: error.response.data.city,
				grade: error.response.data.personal_data && error.response.data.personal_data.grade,
				gradeLetter: error.response.data.personal_data && error.response.data.personal_data.grade_letter,
				school:error.response.data.personal_data && error.response.data.personal_data.school,
				snils: error.response.data.personal_data && error.response.data.personal_data.snils,
				birthday: error.response.data.birthday,
				region: error.response.data.region
			}))])
	}
}