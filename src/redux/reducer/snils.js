import {Record} from 'immutable'
import {UPLOAD_SNILS, FAIL, START, SUCCESS, SNILS_STATUS_CLEAN} from '../action-types'


export const ReducerRecord = new Record({
// status of snils uploading
	snilsUploading: false,
	snilsUploaded: false,
	snilsUploadError: null,

})


export default (state = new ReducerRecord(), {type, error}) => {
	switch (type) {
// User upload snils
		case UPLOAD_SNILS + START:
			return state
				.set('snilsUploading', true)
				.set('snilsUploaded', false)
				.set('snilsUploadError', null)

		case UPLOAD_SNILS + SUCCESS:
			return state
				.set('snilsUploading', false)
				.set('snilsUploaded', true)
				.set('snilsUploadError', null)

		case UPLOAD_SNILS + FAIL :
			return state
				.set('snilsUploading', false)
				.set('snilsUploaded', false)
				.set('snilsUploadError', error)

// Clean status after succeed upload
		case SNILS_STATUS_CLEAN :
			return state
				.set('snilsUploading', false)
				.set('snilsUploaded', false)
				.set('snilsUploadError', null)

// Default state
		default:
			return state
	}
}