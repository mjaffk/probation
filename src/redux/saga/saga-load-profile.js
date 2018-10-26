import {call, put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {LOAD_PROFILE, SUCCESS, FAIL} from '../action-types'
import {loadProfileAPI} from '../../constants/api-config'

export default function* sagaLoadProfile() {
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(loadProfileAPI, {token})
		const data = response.data.result.data
		yield put({
			type: LOAD_PROFILE + SUCCESS,
			response: {
				userId: data['user_id'],
				email: data.email,
				role: data.role,
				profile: {
					phone: data.phone,
					personalData: {
						lastName: data['personal-data'] && data['personal-data']['last-name'],
						firstName: data['personal-data'] && data['personal-data']['first-name'],
						middleName: data['personal-data'] && data['personal-data']['middle-name'],
						birthday: data.birthday,
						region: data.region,
						city: data['personal-data'] && data['personal-data'].city,
						school: data['personal-data'] && data['personal-data'].school,
						grade: data['personal-data'] && data['personal-data'].grade,
						gradeLetter: data['personal-data'] && data['personal-data']['grade-letter'],
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