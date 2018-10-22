import {
	AUTHORIZE_USER,
	LOAD_CAPTCHA,
	LOAD_DICTIONARY,
	LOAD_PROFILE,
	LOGOUT_USER,
	REGISTER_USER,
	START,
	UPDATE_PROFILE,
	USER_PASSWORD_RECOVERY
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

export function registerUser({values, uuid}) {
	return ({
		type: REGISTER_USER + START,
		payload: {
			data: values,
			uuid
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

export function recoveryPassword({email}) {
	return ({
		type: USER_PASSWORD_RECOVERY + START,
		payload: {
			email
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
