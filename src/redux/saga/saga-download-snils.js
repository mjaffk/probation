import {call, select} from 'redux-saga/effects'
import {userIdSelector, userTokenSelector} from "../selectors"
import {downloadSnilsAPI} from "../../constants/api-config"
import fileDownload from 'react-file-download'


export default function* sagaDownloadSnils() {
	try {
		const token = yield select(userTokenSelector)
		const userId = yield select(userIdSelector)
		const response = yield call(downloadSnilsAPI, {
			token, userId})
		yield fileDownload(response.data, 'snils', 'application/pdf')

	} catch (error) {
	}
}