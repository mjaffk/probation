import {put, select} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {logoutUserAPI} from '../../constants/api-config'
import history from "../../utils/history"

export default function* sagaLogoutUser() {
	try {
		const token = yield select(userTokenSelector)
		yield logoutUserAPI ({token})
		yield put(history.push('/auth'))
	} catch (error) {
	}
}