import axios from 'axios'
import {SERVER} from "./index"

/**
 * Default config for API
 * @type {AxiosInstance}
 */
const apiConfig = axios.create({
	baseURL: `${SERVER}/api/`,
	timeout: 1000,
})


/**
 * API to authorize user in app (request token)
 * @param {string} userId - user ID that we get from sever during registration
 * @param {string} password
 * @returns {AxiosPromise<any>}
 */
export const userAuthorizeAPI = ({userId, password}) => {
	return apiConfig.get('token/', {
		auth: {
			username: userId,
			password
		},
		transformResponse: (data) => ({
			...JSON.parse(data),
			userId
		})
	})
}


/**
 * API to authorize user in app
 * @param {string} token
 * @returns {AxiosPromise<any>}
 */
export const loadProfileAPI = ({token}) => {
	return apiConfig.get('user/current', {
		headers: {
			'Authorization': 'Bearer '+ token
		},
		transformResponse: (data) => {
			data = JSON.parse(data).result.data
			console.log('---axios',data)
			return {
				profile: {
					personalData: {
						lastName: data['personal-data'] && data['personal-data']['last-name'],
						firstName: data['personal-data'] && data['personal-data']['first-name'],
						middleName: data['personal-data'] && data['personal-data']['middle-name'],
						birthday: data.birthday,
						region: data.region,
						city: data['personal-data'] && data['personal-data'].city,
						school: data['personal-data'] && data['personal-data'].school,
						grade: data['personal-data'] && data['personal-data'].grade,
						gradeLetter: data['personal-data'] && data['personal-data']['grade-letter'],
					},
					phone: data.phone,
				},
				userId: data['user_id'],
				email: data.email,
				role: data.role,
			}
		}
	})
}


/**
 * API to request captcha by uuid from server, and its response to base64
 * @param {string} uuid
 * @returns {AxiosPromise<any>}
 */
export const loadCaptchaAPI = ({uuid}) => {
	return apiConfig.get('captcha/' + uuid, {
		headers: {
			'Content-Type': 'image/png',
			'Accept': 'image/png'
		},
		responseType: 'arraybuffer',
		transformResponse: (data) => {
			console.log(data)
			return {
				image: `data:image/png;base64,${new Buffer(data).toString('base64')}`,
				uuid
			}
		}
	})
}


/**
 * API to load dictionary of regions
 * @returns {AxiosPromise<any>}
 */
export const loadRegionsAPI = () => {
	return apiConfig.get('directory/regions')
}


/**
 * API to register new user
 * @param {string} uuid - from captcha
 * @param {Object} data
 * @returns {AxiosPromise<any>}
 */
export const userRegisterAPI = ({uuid, data}) => {
	return apiConfig.post('user/register/' + uuid, data, {
		transformResponse: (data) => {
			data = JSON.parse(data)
			return {
				email: data.email,
				userId: data.userid
			}
		}
	})
}


/**
 * API to recovery password by email
 * @param {string} email
 * @returns {AxiosPromise<any>}
 */
export const recoveryPasswordAPI = ({email}) => {
	return apiConfig.post(`user/reset_password/`, email)
}


/**
 * API to logout user by token
 * @param token
 * @returns {AxiosPromise<any>}
 */
export const logoutUserAPI = ({token}) => {
	return apiConfig.get('logout/',{
		headers: {
			'Authorization': 'Bearer '+ token
		}
	})
}