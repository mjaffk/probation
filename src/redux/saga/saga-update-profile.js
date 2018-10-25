import {call, put, select, all} from 'redux-saga/effects'
import {userIdSelector, userRoleSelector, userTokenSelector} from "../selectors"
import {UPDATE_PROFILE, SUCCESS, FAIL} from '../action-types'
import {updateProfileAPI} from "../../constants/api-config"
import {stopSubmit, reset} from "redux-form"
import {PERSONAL_DATA} from "../../constants"


export default function* sagaUpdateProfile(action) {
	const {data} = action.payload
	try {
		const token = yield select(userTokenSelector)
		const role = yield select(userRoleSelector)
		const userId = yield select(userIdSelector)
		const response = yield call(updateProfileAPI, {
			token, data: {
				'active_school': null,
				birthday: data.birthday,
				email: data.email,
				'email_confirmed': true,
				'esia_id': null,
				gender: null,
				'init_password': null,
				'personal_data': {
					snils: "1231313",
					city: data.city,
					school: data.school,
					grade: parseInt(data.grade, 10),
					'grade_letter': data.gradeLetter,
				},
				city: data.city,
				grade: data.grade,
				'grade_letter': data.gradeLetter,
				school: data.school,
				snils: "",
				phone: null,
				region: parseInt(data.region, 10),
				role: role,
				'school_data': [],
				'user_id': userId
			}
		})
		yield all([
			put({
				type: UPDATE_PROFILE + SUCCESS,
				response: {
					userId: response.data['user_id'],
					email: response.data.email,
					role: response.data.role,
					profile: {
						phone: response.data.phone,
						personalData: {
							lastName: response.data['personal-data'] && response.data['personal-data']['last-name'],
							firstName: response.data['personal-data'] && response.data['personal-data']['first-name'],
							middleName: response.data['personal-data'] && response.data['personal-data']['middle-name'],
							birthday: response.data.birthday,
							region: response.data.region,
							city: response.data['personal-data'] && response.data['personal-data'].city,
							school: response.data['personal-data'] && response.data['personal-data'].school,
							grade: response.data['personal-data'] && response.data['personal-data'].grade,
							gradeLetter: response.data['personal-data'] && response.data['personal-data']['grade-letter'],
						},
					},
				}
			}),
			put(reset(PERSONAL_DATA))
		])
	} catch (error) {
		yield all([
			put({
				type: UPDATE_PROFILE + FAIL,
				error: error
			}),
			put(stopSubmit(PERSONAL_DATA, {
				city: error.response.data.city,
				grade:  error.response.data.grade,
				gradeLetter:  error.response.data.grade_letter,
				school:  error.response.data.school
			}))
		])
	}
}