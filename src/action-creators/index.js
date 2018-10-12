import {
	LOAD_DICTIONARY,
	LOAD_CAPTCHA,
	REGISTER_USER,
	START
} from '../action-types'

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
		values,
		uuid
	})
}