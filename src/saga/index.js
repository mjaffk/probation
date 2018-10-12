import { takeEvery } from 'redux-saga/effects'
import {LOAD_CAPTCHA, LOAD_DICTIONARY, REGISTER_USER, START} from '../action-types'
import sagaLoadCaptcha from "./saga-load-captcha"
import sagaLoadDictionary from "./saga-load-dictionary"
import sagaRegisterUser from "./saga-register-user"


export default function * saga() {
	yield takeEvery(LOAD_CAPTCHA+START, sagaLoadCaptcha)
	yield takeEvery(LOAD_DICTIONARY+START, sagaLoadDictionary)
	yield takeEvery(REGISTER_USER+START, sagaRegisterUser)
}