import {
	ACTIVATE_USER,
	AUTHORIZE_USER,
	CHANGE_EMAIL,
	CHANGE_PASSWORD,
	CONFIRM_EMAIL,
	EMAIL_STATUS_CLEAN,
	FORGOT_STATUS_CLEAN,
	LOAD_CAPTCHA,
	LOAD_DICTIONARY,
	LOAD_PROFILE,
	LOGOUT_USER,
	PERSONAL_DATA_STATUS_CLEAN,
	REGISTER_USER,
	RESET_PASSWORD,
	SET_PASSWORD,
	SIGN_IN_STATUS_CLEAN,
	SIGN_UP_STATUS_CLEAN,
	START,
	UPDATE_PROFILE
} from '../action-types/index'


export function loadDictionary() {
	return ({
		type: LOAD_DICTIONARY + START,
	})
}


export function loadCaptcha() {
	return ({
		type: LOAD_CAPTCHA + START,
	})
}


export function registerUser({data, uuid}) {
	return ({
		type: REGISTER_USER + START,
		payload: {
			data,
			uuid
		}
	})
}


export function activateUser({token}) {
	return ({
		type: ACTIVATE_USER + START,
		payload: {
			token
		}
	})
}


export function authorizeUser({userId, password}) {
	return ({
		type: AUTHORIZE_USER + START,
		payload: {
			userId,
			password
		}
	})
}


export function logoutUser() {
	return ({
		type: LOGOUT_USER + START,
	})
}


export function resetPassword({email}) {
	return ({
		type: RESET_PASSWORD + START,
		payload: {
			email
		},
	})
}


export function setPassword({token, password}) {
	return ({
		type: SET_PASSWORD + START,
		payload: {
			token,
			password
		},
	})
}


export function changePassword({oldPassword, newPassword}) {
	return ({
		type: CHANGE_PASSWORD + START,
		payload: {
			oldPassword,
			newPassword
		},
	})
}


export function changeEmail({newEmail}) {
	return ({
		type: CHANGE_EMAIL + START,
		payload: {
			newEmail
		},
	})
}

export function confirmEmail({token}) {
	return ({
		type: CONFIRM_EMAIL + START,
		payload: {
			token
		},
	})
}


export function loadProfile() {
	return ({
		type: LOAD_PROFILE + START,
	})
}


export function updateProfile({data}) {
	return ({
		type: UPDATE_PROFILE + START,
		payload: {
			data
		}
	})
}


export function signInStatusClean() {
	return ({
		type: SIGN_IN_STATUS_CLEAN
	})
}


export function signUpStatusClean() {
	return ({
		type: SIGN_UP_STATUS_CLEAN
	})
}


export function forgotStatusClean() {
	return ({
		type: FORGOT_STATUS_CLEAN
	})
}


export function personalDataStatusClean() {
	return ({
		type: PERSONAL_DATA_STATUS_CLEAN
	})
}

export function emailStatusClean() {
	return ({
		type: EMAIL_STATUS_CLEAN,
	})
}
