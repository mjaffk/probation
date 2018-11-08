import {LOAD, UPDATE, CLEAN_STATUS, START, SUCCESS, ERROR} from "../const"

export default function reducer(state, {type, response, error}) {
	switch (type) {
// Load user profile
		case LOAD + START:
			return state
				.set('profileLoading', true)
				.set('profileLoadError', null)
				.set('profileLoaded', false)

		case LOAD + SUCCESS:
			return state
				.set('profile', response.profile)
				.set('userId', response.userId)
				.set('email', response.email)
				.set('role', response.role)
				.set('profileLoading', false)
				.set('profileLoaded', true)
				.set('profileLoadError', null)

		case LOAD + ERROR :
			return state
				.set('profileLoading', false)
				.set('profileLoadError', error)

// Update user profile
		case UPDATE + START:
			return state
				.set('profileUpdating', true)
				.set('profileUpdateError', null)
		case UPDATE + SUCCESS:
			return state
				.set('profileUpdating', false)
				.set('profileUpdateError', null)

		case UPDATE + ERROR :
			return state
				.set('profileUpdating', false)
				.set('profileUpdateError', error)

		case CLEAN_STATUS:
			return state
				.set('profileUpdating', false)
				.set('profileUpdateError', null)
				.set('profileLoading', false)
				.set('profileLoaded', false)
				.set('profileLoadError', null)

		default:
			return state
	}
}