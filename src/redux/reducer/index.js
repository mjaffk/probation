import {combineReducers} from 'redux'
import regions from './regions'
import captcha from './captcha'
import user from './user'
import {reducer as FormReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import password from "./password"
import email from "./email"
import snils from "./snils"



export default combineReducers({
	regions,
	captcha,
	user,
	password,
	email,
	snils,
	form: FormReducer,
	router: routerReducer
})