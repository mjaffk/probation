import {combineReducers} from 'redux'
import regions from './regions'
import captcha from './captcha'
import user from './user'
import {reducer as FormReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'


export default combineReducers({
	regions,
	captcha,
	user,
	form: FormReducer,
	router: routerReducer
})