import uuid from 'uuid/v1'

/**
 * Generate UUID like: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
 * @return {string} uuid
 */
export default function generateUUID() {
	return uuid()
}