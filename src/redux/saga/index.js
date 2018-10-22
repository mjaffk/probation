import {takeEvery} from 'redux-saga/effects'
import {
	LOAD_CAPTCHA,
	LOAD_DICTIONARY,
	REGISTER_USER,
	AUTHORIZE_USER,
	USER_PASSWORD_RECOVERY,
	LOAD_PROFILE,
	LOGOUT_USER,
	START
} from '../action-types/index'
import sagaLoadCaptcha from "./saga-load-captcha"
import sagaLoadDictionary from "./saga-load-regions"
import sagaRegisterUser from "./saga-register-user"
import sagaAuthorizeUser from "./saga-authoriz-user"
import sagaRecoveryPassword from "./saga-recovery-password"
import sagaLoadProfile from "./saga-load-profile"
import sagaLogoutUser from "./sags-logout-user"


export default function* saga() {
	yield takeEvery(LOAD_CAPTCHA + START, sagaLoadCaptcha)
	yield takeEvery(LOAD_DICTIONARY + START, sagaLoadDictionary)
	yield takeEvery(REGISTER_USER + START, sagaRegisterUser)
	yield takeEvery(AUTHORIZE_USER + START, sagaAuthorizeUser)
	yield takeEvery(USER_PASSWORD_RECOVERY + START, sagaRecoveryPassword)
	yield takeEvery(LOAD_PROFILE + START, sagaLoadProfile)
	yield takeEvery(LOGOUT_USER + START, sagaLogoutUser)
}