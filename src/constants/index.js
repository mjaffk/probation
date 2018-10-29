// export const SERVER = 'https://10.31.7.111/'
// export const SERVER = 'https://10.31.7.112/'
export const SERVER = 'https://10.31.7.109/'
// export const SERVER = 'https://10.31.7.101/' //некорректный
// export const SERVER = 'https://fvm212.lpr.jet.msk.su/'

export const SIGN_UP = 'signUp'
export const SIGN_IN = 'signIn'
export const FORGOT = 'forgot'
export const SET_NEW_PASSWORD = 'setNewPassword'
export const PERSONAL_DATA = 'personalData'
export const CHANGE_PASSWORD_FORM = 'changePassword'
export const CHANGE_EMAIL_FORM = 'changeEmail'

export const MODAL_STYLE = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '30px',
		maxWidth: '500px',
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		zIndex: '1000',
	},
}

export const GRADE_DICTIONARY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const GRADE_LETTER_DICTIONARY = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н',
	'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы',
	'Э', 'Ю', 'Я']

// todo: update dictionary
export const ROLE_DICTIONARY = {
	'Participant': 'Участник',
}


export const LOCATION_DICTIONARY = {
	'/profile/messages': 'Сообщения',
	'/profile/contests': 'Конкурсы',
	'/profile/recommendation': 'Рекомендации',
	'/profile/tickets': 'Билеты',
	'/profile/personal-data': 'Персональные данные',
}

export const MESSAGE_DICTIONARY = {
	"new password is set" : "Вы успешно сменили пароль",
	"activated" : "Спасибо! Ваша учётная запись активирована"
}