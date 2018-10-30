import {combineReducers} from 'redux'
import regions from './regions'
import captcha from './captcha'
import user from './user'
import {reducer as FormReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import password from "./password"



export default combineReducers({
	regions,
	captcha,
	user,
	password,
	form: FormReducer,
	router: routerReducer
})