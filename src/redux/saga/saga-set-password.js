import {call, put, all} from 'redux-saga/effects'
import {MESSAGE_DICTIONARY, SET_NEW_PASSWORD} from "../../constants/index"
import {FAIL, SET_PASSWORD, SUCCESS} from "../action-types/index"
import {stopSubmit, reset} from 'redux-form'
import {setPasswordAPI} from "../../constants/api-config"
import {push} from "react-router-redux"

export default function* sagaSetPassword(action) {
	const {password, token} = action.payload
	console.log(password, token)
	try {
		const response = yield call(setPasswordAPI, {
			data: {
				reset_password_token: token,
				password
			}
		})
		yield all([put({
			type: SET_PASSWORD + SUCCESS,
			response: {
				message: MESSAGE_DICTIONARY[response.data.message],
				userId: response.data.userid
			},
		}),
			put(reset(SET_NEW_PASSWORD)),
			put(push('/auth/signin'))
		])
	} catch (error) {
		yield all([put({
				type: SET_PASSWORD + FAIL,
				error: error
			}
		),
			put(stopSubmit(SET_NEW_PASSWORD, error.response.data))
		])
	}
}