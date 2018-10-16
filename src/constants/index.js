// export const SERVER = 'https://fvm212.lpr.jet.msk.su'
// export const SERVER = 'https://10.31.7.109'
export const SERVER = 'https://10.31.7.111'
// export const SERVER = 'https://10.31.7.101' // некорректный сервер

export const userAuthorizeAPI = `${SERVER}/api/token/`
export const loadCaptchaAPI = `${SERVER}/api/captcha/` // + uuid
export const loadRegionsAPI = `${SERVER}/api/directory/regions`
export const userRegisterAPI = `${SERVER}/api/user/register/` // + uuid
export const recoveryPasswordAPI = `${SERVER}/api/user/reset_password/`


export const SIGN_UP = 'signUp'
export const SIGN_IN = 'signIn'
export const FORGOT = 'forgot'

export const modalStyle = {
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
	},
}