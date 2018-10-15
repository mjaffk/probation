import {call, put} from 'redux-saga/effects'
import generateUUID from "../../utils/generate-uuid"
import axios from "axios"
import {loadCaptchaAPI} from "../../constants/index"
import {FAIL, LOAD_CAPTCHA, SUCCESS} from "../action-types/index"
import errorParser from '../../utils/error-parser'

export default function* sagaLoadCaptcha() {
	try {
		const uuid = yield call(generateUUID)
		const response = yield call(axios.get, loadCaptchaAPI+uuid, {
			headers: {
				'Content-Type': 'image/png',
				'Accept': 'image/png'
			},
			responseType: 'arraybuffer'
		})
		yield put({
			type: LOAD_CAPTCHA + SUCCESS,
			response: new Buffer(response.data).toString('base64'),
			uuid: response.config.url.slice(loadCaptchaAPI.length)
		})
	} catch (error) {
		yield put({
				type: LOAD_CAPTCHA + FAIL,
				error: errorParser(error)
			}
		)
	}
}
