import {Record} from "immutable"

export default new Record({
	email: null,
	role: '',
	profile: {
		phone: '',
		activeSchool: false,
		emailConfirmed: false,
		personalData: {
			gender: null,
			snils: '',
			snilsPdfUploaded: false,
			lastName: '',
			firstName: '',
			middleName: '',
			birthday: '',
			region: null,
			city: '',
			school: '',
			grade: null,
			gradeLetter: '',
		},
	},

// status of profile loading request
	loading: false,
	loaded: false,
	loadError: null,

// status of profile updating request
	updating: false,
	updateError: null,
})