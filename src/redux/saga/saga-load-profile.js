import {call, put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {LOAD_PROFILE, SUCCESS, FAIL} from '../action-types'
import {loadProfileAPI} from '../../constants/api-config'
import {formatFromSnils} from "../../utils/format-from-to-snills"

export default function* sagaLoadProfile() {
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(loadProfileAPI, {token})
		const data = response.data.result.data
		yield put({
			type: LOAD_PROFILE + SUCCESS,
			response: {
				userId: data.user_id,
				email: data.email,
				role: data.role,
				profile: {
					phone: data.phone,
					activeSchool: data.active_school,
					emailConfirmed: data.email_confirmed,
					personalData: {
						gender: data.gender,
						snils: data.personal_data && data.personal_data.snils &&
							formatFromSnils(data.personal_data.snils),
						snilsPdfUploaded: data.personal_data && data.personal_data.snils_pdf_uploaded,
						lastName: data.personal_data && data.personal_data.last_name,
						firstName: data.personal_data && data.personal_data.first_name,
						middleName: data.personal_data && data.personal_data.middle_name,
						birthday: data.birthday && data.birthday.slice(0,10),
						region: data.region,
						city: data.personal_data && data.personal_data.city,
						school: data.personal_data && data.personal_data.school,
						grade: data.personal_data && data.personal_data.grade,
						gradeLetter: data.personal_data && data.personal_data.grade_letter,
					},
				},
			}
		})
	} catch (error) {
		yield put({
			type: LOAD_PROFILE + FAIL,
			error: error
		})
	}
}