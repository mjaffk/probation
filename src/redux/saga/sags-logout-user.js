import {select, all, put} from 'redux-saga/effects'
import {userTokenSelector} from "../selectors"
import {logoutUserAPI} from '../../constants/api-config'
import {push} from "react-router-redux"

export default function* sagaLogoutUser() {
	try {
		const token = yield select(userTokenSelector)
		yield all([
			logoutUserAPI({token}),
			put(push('/auth/signin'))
		])
	} catch (error) {
	}
}