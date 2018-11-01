import {all, call, put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {FAIL, SUCCESS, UPLOAD_SNILS} from '../action-types'
import {uploadSnilsAPI} from "../../constants/api-config"
import {stopSubmit} from "redux-form"
import {UPLOAD_SNILS_FORM} from "../../constants"
import sagaLoadProfile from "./saga-load-profile"


export default function* sagaUploadSnils(action) {
	const {file} = action.payload
	const data = new FormData()
	data.append('file_obj', file)
	try {
		const token = yield select(userTokenSelector)
		const response = yield call(uploadSnilsAPI, {
			token, data})
		yield all([
			put({
				type: UPLOAD_SNILS + SUCCESS,
				response
			}),
			sagaLoadProfile()
		])
	} catch (error) {
		yield all([
			put({
				type: UPLOAD_SNILS + FAIL,
				error: error
			}),
			put(stopSubmit(UPLOAD_SNILS_FORM, {
				snilsFileName: error.response.data[Object.keys(error.response.data)[0]],
			}))])
	}
}