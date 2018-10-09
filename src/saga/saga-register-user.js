import {call, put } from 'redux-saga/effects'
import axios from "axios"
import {SERVER} from "../constants"
import {FAIL, REGISTER_USER, SUCCESS} from "../action-types"

export default function * sagaRegisterUser (action) {
	const {values, uuid} = action
	console.log(action)
	debugger
	try {
		const response = yield call(axios.post, `${SERVER}/api/user/register/${uuid}`, values)
		yield put({
			type: REGISTER_USER+SUCCESS,
			response: response,
		})
	} catch (error) {
		yield put({
				type: REGISTER_USER+FAIL,
				error: error
			}
		)

	}

}