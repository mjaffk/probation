import {call, put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {LOAD_PROFILE, SUCCESS, FAIL} from '../action-types'
import {loadProfileAPI} from '../../constants/api-config'

export default function* sagaLoadProfile() {
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(loadProfileAPI, {token})
		yield put({
			type: LOAD_PROFILE + SUCCESS,
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
		})
	} catch (error) {
		yield put({
			type: LOAD_PROFILE + FAIL,
			error: error
		})
	}
}