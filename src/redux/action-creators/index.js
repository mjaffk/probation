import {
	AUTHORIZE_USER,
	LOAD_CAPTCHA,
	LOAD_DICTIONARY,
	LOAD_PROFILE,
	LOGOUT_USER,
	REGISTER_USER,
	START,
	UPDATE_PROFILE, ACTIVATE_USER,
	RESET_PASSWORD, SET_PASSWORD, CHANGE_PASSWORD
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
		type: ACTIVATE_USER,
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
