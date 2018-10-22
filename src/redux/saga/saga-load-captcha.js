import {call, put} from 'redux-saga/effects'
import generateUUID from "../../utils/generate-uuid"
import {FAIL, LOAD_CAPTCHA, SUCCESS} from "../action-types/index"
import errorParser from '../../utils/error-parser'
import {loadCaptchaAPI} from "../../constants/api-config"

export default function* sagaLoadCaptcha() {
	try {
		const uuid = yield call(generateUUID)
		const response = yield call(loadCaptchaAPI, {uuid})
		yield put({
			type: LOAD_CAPTCHA + SUCCESS,
			response: response.data
		})
	} catch (error) {
		yield put({
				type: LOAD_CAPTCHA + FAIL,
				error: errorParser(error)
			}
		)
	}
}
