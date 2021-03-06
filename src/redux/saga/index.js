import {takeEvery} from 'redux-saga/effects'
import {
	ACTIVATE_USER,
	AUTHORIZE_USER,
	CHANGE_EMAIL,
	CHANGE_PASSWORD,
	CONFIRM_EMAIL, DOWNLOAD_SNILS,
	LOAD_CAPTCHA,
	LOAD_DICTIONARY,
	LOAD_PROFILE,
	LOGOUT_USER,
	REGISTER_USER,
	RESET_PASSWORD,
	SET_PASSWORD,
	START,
	UPDATE_PROFILE,
	UPLOAD_SNILS
} from '../action-types/index'
import sagaLoadCaptcha from "./saga-load-captcha"
import sagaLoadDictionary from "./saga-load-regions"
import sagaRegisterUser from "./saga-register-user"
import sagaAuthorizeUser from "./saga-authoriz-user"
import sagaResetPassword from "./saga-reset-password"
import sagaLoadProfile from "./saga-load-profile"
import sagaLogoutUser from "./sags-logout-user"
import sagaUpdateProfile from "./saga-update-profile"
import sagaSetPassword from "./saga-set-password"
import sagaActivateUser from "./saga-avtivate-user"
import sagaChangePassword from "./saga-change-password"
import sagaChangeEmail from "./saga-change-email"
import sagaConfirmEmail from "./saga-confirm-email"
import sagaUploadSnils from "./saga-upload-snils"
import sagaDownloadSnils from "./saga-download-snils"

export default function* saga() {
	yield takeEvery(LOAD_CAPTCHA + START, sagaLoadCaptcha)
	yield takeEvery(LOAD_DICTIONARY + START, sagaLoadDictionary)

	yield takeEvery(REGISTER_USER + START, sagaRegisterUser)
	yield takeEvery(ACTIVATE_USER + START, sagaActivateUser)
	yield takeEvery(AUTHORIZE_USER + START, sagaAuthorizeUser)
	yield takeEvery(LOGOUT_USER + START, sagaLogoutUser)

	yield takeEvery(RESET_PASSWORD + START, sagaResetPassword)
	yield takeEvery(SET_PASSWORD + START, sagaSetPassword)
	yield takeEvery(CHANGE_PASSWORD + START, sagaChangePassword)

	yield takeEvery(CHANGE_EMAIL + START, sagaChangeEmail)
	yield takeEvery(CONFIRM_EMAIL + START, sagaConfirmEmail)

	yield takeEvery(LOAD_PROFILE + START, sagaLoadProfile)
	yield takeEvery(UPDATE_PROFILE + START, sagaUpdateProfile)

	yield takeEvery(UPLOAD_SNILS+START, sagaUploadSnils)
	yield takeEvery(DOWNLOAD_SNILS, sagaDownloadSnils)
}